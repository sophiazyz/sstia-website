"""
fetch_wechat.py - 抓取微信公众号文章并生成项目所需的文件夹结构。

用法:
    python fetch_wechat.py <url> [--output <dir>] [--date <YYYY-MM-DD>]

每个文章文件夹包含:
    - meta.json      (元数据)
    - content.md     (Markdown 内容 + frontmatter)
    - index.html     (完整 HTML 页面)
    - cover.jpg      (封面图片)
    - images/        (文章内图片)
"""

import argparse
import hashlib
import json
import os
import re
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup, NavigableString

# ---------------------------------------------------------------------------
# 配置
# ---------------------------------------------------------------------------

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/125.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
}

TIMEOUT = 30  # seconds

# ---------------------------------------------------------------------------
# 工具函数
# ---------------------------------------------------------------------------


def sanitize_filename(name: str) -> str:
    """移除文件名中的非法字符。"""
    # Windows 非法字符: < > : " / \ | ? *
    name = re.sub(r'[<>:"/\\|?*]', "", name)
    # 移除控制字符
    name = re.sub(r"[\x00-\x1f\x7f]", "", name)
    return name.strip()


def generate_id(html_content: str) -> str:
    """根据文章内容生成一个稳定的 hash id。"""
    h = hashlib.md5(html_content.encode("utf-8")).hexdigest()[:16]
    return f"h_{h}"


def download_image(url: str, save_path: Path, session: requests.Session) -> bool:
    """下载图片并保存，返回是否成功。"""
    try:
        resp = session.get(url, timeout=TIMEOUT, stream=True)
        resp.raise_for_status()
        save_path.parent.mkdir(parents=True, exist_ok=True)
        with open(save_path, "wb") as f:
            for chunk in resp.iter_content(chunk_size=8192):
                f.write(chunk)
        return True
    except Exception as e:
        print(f"  [WARN] 图片下载失败 {url}: {e}")
        return False


def guess_ext(url: str, content_type: str = "") -> str:
    """根据 URL 或 Content-Type 猜测图片扩展名。"""
    # 从 URL 参数中获取
    m = re.search(r"wx_fmt=(\w+)", url)
    if m:
        fmt = m.group(1).lower()
        mapping = {"jpeg": "jpg", "png": "png", "gif": "gif", "webp": "webp", "svg": "svg"}
        return mapping.get(fmt, "jpg")
    # 从 content-type
    if "png" in content_type:
        return "png"
    if "gif" in content_type:
        return "gif"
    if "webp" in content_type:
        return "webp"
    return "jpg"


# ---------------------------------------------------------------------------
# HTML -> Markdown 转换 (简化版)
# ---------------------------------------------------------------------------


def html_to_markdown(element) -> str:
    """将微信文章的 HTML 转换为简洁的 Markdown。"""
    lines = []
    _convert_node(element, lines)
    # 清理多余空行
    text = "\n".join(lines)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def _convert_node(node, lines: list):
    """递归转换节点。"""
    if isinstance(node, NavigableString):
        text = str(node)
        if text.strip():
            lines.append(text)
        return

    tag = getattr(node, "name", None)
    if tag is None:
        return

    # 跳过隐藏元素和脚本
    if tag in ("script", "style", "mpvoice", "mp-miniprogram"):
        return
    if tag == "p" and node.get("style", "") and "display: none" in node.get("style", ""):
        return

    # 图片处理
    if tag == "img":
        src = node.get("data-src") or node.get("src") or ""
        if src and not src.startswith("data:"):
            lines.append(f"\n![]({src})\n")
        return

    # 标题
    if tag in ("h1", "h2", "h3", "h4", "h5", "h6"):
        level = int(tag[1])
        prefix = "#" * level
        text = node.get_text(strip=True)
        if text:
            lines.append(f"\n{prefix} {text}\n")
        return

    # 段落
    if tag == "p":
        text = node.get_text(strip=True)
        if text:
            lines.append(f"\n{text}\n")
        else:
            # 检查是否有图片子节点
            has_img = node.find("img")
            if has_img:
                for child in node.children:
                    _convert_node(child, lines)
        return

    # 列表
    if tag in ("ul", "ol"):
        for i, li in enumerate(node.find_all("li", recursive=False)):
            prefix = f"{i+1}." if tag == "ol" else "-"
            text = li.get_text(strip=True)
            lines.append(f"{prefix} {text}")
        lines.append("")
        return

    # 引用
    if tag == "blockquote":
        text = node.get_text(strip=True)
        if text:
            quoted = "\n".join(f"> {line}" for line in text.split("\n"))
            lines.append(f"\n{quoted}\n")
        return

    # section/div 等容器 - 递归处理子节点
    for child in node.children:
        _convert_node(child, lines)


# ---------------------------------------------------------------------------
# 核心抓取逻辑
# ---------------------------------------------------------------------------


def fetch_wechat_article(url: str, session: requests.Session) -> dict:
    """
    抓取微信公众号文章，返回解析后的元数据和内容。

    返回 dict:
        title, author, account, publishTime, sourceUrl,
        digest, coverUrl, contentHtml, contentMarkdown
    """
    print(f"[INFO] 正在抓取文章: {url}")
    resp = session.get(url, timeout=TIMEOUT)
    resp.raise_for_status()
    resp.encoding = "utf-8"
    html = resp.text

    soup = BeautifulSoup(html, "html.parser")

    # --- 提取元数据 ---

    # 标题
    title_el = soup.find("h1", id="activity-name")
    if not title_el:
        title_el = soup.find("meta", property="og:title")
        title = title_el["content"] if title_el else ""
    else:
        title = title_el.get_text(strip=True)

    # 公众号名称 (account)
    account_el = soup.find("a", id="js_name")
    if not account_el:
        account_el = soup.find("span", class_="rich_media_meta_nickname")
    account = account_el.get_text(strip=True) if account_el else ""

    # 作者
    author_el = soup.find("span", class_="rich_media_meta_text")
    author = ""
    if author_el:
        # 尝试找到 author 元数据
        author_meta = soup.find("meta", {"name": "author"})
        if author_meta:
            author = author_meta.get("content", "")
    if not author:
        author_meta = soup.find("meta", {"name": "author"})
        if author_meta:
            author = author_meta.get("content", "")
    # 如果还是没找到，使用公众号名
    if not author:
        author = account

    # 发布时间 - 微信文章的发布时间通常在 JS 变量中
    publish_time = ""
    # 尝试从 script 中提取
    scripts = soup.find_all("script")
    for script in scripts:
        text = script.string or ""
        # var ct = "1234567890"  (Unix timestamp)
        m = re.search(r'var\s+ct\s*=\s*"(\d+)"', text)
        if m:
            ts = int(m.group(1))
            publish_time = datetime.fromtimestamp(ts).strftime("%Y-%m-%d %H:%M")
            break
        # var create_time = "1234567890"
        m = re.search(r'var\s+create_time\s*=\s*"(\d+)"', text)
        if m:
            ts = int(m.group(1))
            publish_time = datetime.fromtimestamp(ts).strftime("%Y-%m-%d %H:%M")
            break

    # 如果 JS 中没找到，尝试页面元素
    if not publish_time:
        time_el = soup.find("em", id="publish_time")
        if time_el:
            publish_time = time_el.get_text(strip=True)

    # 摘要 (digest)
    digest = ""
    digest_meta = soup.find("meta", property="og:description")
    if digest_meta:
        digest = digest_meta.get("content", "")
    if not digest:
        desc_el = soup.find("p", id="js_article_summary")
        if desc_el:
            digest = desc_el.get_text(strip=True)

    # 封面图
    cover_url = ""
    cover_meta = soup.find("meta", property="og:image")
    if cover_meta:
        cover_url = cover_meta.get("content", "")
    if not cover_url:
        cover_meta = soup.find("meta", {"name": "twitter:image"})
        if cover_meta:
            cover_url = cover_meta.get("content", "")

    # --- 提取正文 ---
    content_el = soup.find("div", id="js_content")
    if not content_el:
        content_el = soup.find("div", class_="rich_media_content")

    content_html = str(content_el) if content_el else ""

    # 提取正文中的所有图片 URL
    image_urls = []
    if content_el:
        for img in content_el.find_all("img"):
            # 尝试多个属性获取图片 URL
            src = (
                img.get("data-src") 
                or img.get("src") 
                or img.get("data-original")
                or ""
            )
            if src and not src.startswith("data:") and "mmbiz.qpic.cn" in src:
                # 规范化 URL
                if src.startswith("//"):
                    src = "https:" + src
                image_urls.append(src)
    
    # 如果从 img 标签没找到图片，尝试从原始 HTML 中提取
    if not image_urls:
        # 从 raw HTML 中匹配 mmbiz 图片 URL
        pattern = r'(?:data-src|src)=["\']?(https?://mmbiz\.qpic\.cn/[^"\'\s>]+)'
        found = re.findall(pattern, html)
        image_urls = list(dict.fromkeys(found))  # 去重保序
    
    # 如果还是没找到，尝试更宽泛的匹配
    if not image_urls:
        pattern = r'https?://mmbiz\.qpic\.cn/[^"\'\s<>]+'
        found = re.findall(pattern, html)
        # 过滤掉封面图等，只保留文章内容图
        image_urls = list(dict.fromkeys(found))

    # 生成 Markdown
    content_md = html_to_markdown(content_el) if content_el else ""

    return {
        "title": title,
        "author": author,
        "account": account,
        "publishTime": publish_time,
        "sourceUrl": url,
        "digest": digest,
        "coverUrl": cover_url,
        "contentHtml": content_html,
        "contentMarkdown": content_md,
        "imageUrls": image_urls,
        "rawHtml": html,
    }


# ---------------------------------------------------------------------------
# 生成输出文件
# ---------------------------------------------------------------------------


def build_meta_json(article: dict, post_id: str) -> dict:
    """构建 meta.json 内容。"""
    now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.000Z")
    return {
        "id": generate_id(article["rawHtml"]),
        "title": article["title"],
        "author": article["author"],
        "account": article["account"],
        "publishTime": article["publishTime"],
        "sourceUrl": article["sourceUrl"],
        "digest": article["digest"],
        "coverUrl": article["coverUrl"],
        "downloadTime": now,
        "formats": ["md", "html", "meta", "cover"],
        "itemShowType": 0,
    }


def build_content_md(article: dict) -> str:
    """构建 content.md，带 YAML frontmatter。"""
    now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.000Z")
    frontmatter = (
        f'---\n'
        f'title: "{article["title"]}"\n'
        f'account: "{article["account"]}"\n'
        f'author: "{article["author"]}"\n'
        f'publishTime: "{article["publishTime"]}"\n'
        f'source: "{article["sourceUrl"]}"\n'
        f'downloadTime: "{now}"\n'
        f'---\n'
    )

    # 在 markdown 中将远程图片 URL 替换为本地 images/ 引用
    md = article["contentMarkdown"]
    img_map = {}  # remote_url -> local_path
    for i, url in enumerate(article["imageUrls"], 1):
        ext = guess_ext(url)
        local_name = f"img-{i}.{ext}"
        img_map[url] = f"images/{local_name}"

    for remote, local in img_map.items():
        md = md.replace(remote, local)

    return frontmatter + f"# {article['title']}\n\n" + md


def build_index_html(article: dict) -> str:
    """构建 index.html 完整页面。"""
    title = article["title"]
    account = article["account"]
    pub_time = article["publishTime"]
    source_url = article["sourceUrl"]

    # 替换正文中的远程图片 URL 为本地路径
    content_html = article["contentHtml"]
    
    # 1. 移除微信反爬机制: visibility: hidden; opacity: 0;
    content_html = re.sub(
        r'style="[^"]*visibility:\s*hidden[^"]*"',
        '',
        content_html
    )
    content_html = re.sub(
        r'style="[^"]*opacity:\s*0[^"]*"',
        '',
        content_html
    )
    # 清理空 style 属性
    content_html = re.sub(r'\s+style=""', '', content_html)
    
    # 2. 移除包裹内容的 rich_media_content div (微信反爬容器)
    content_html = re.sub(
        r'<div[^>]*class="[^"]*rich_media_content[^"]*"[^>]*>',
        '',
        content_html,
        count=1
    )
    # 移除对应的关闭标签 (简单处理: 移除最后一个 </div>)
    if '</div>' in content_html:
        content_html = content_html.rsplit('</div>', 1)[0]

    # 3. 处理图片: 替换远程 URL 或为无 src 的图片添加本地路径
    img_index = 0
    for i, url in enumerate(article["imageUrls"], 1):
        ext = guess_ext(url)
        local_name = f"img-{i}.{ext}"
        local_path = f"images/{local_name}"
        
        # 替换 data-src 为 src
        content_html = content_html.replace(
            f'data-src="{url}"',
            f'src="{local_path}"'
        )
        # 替换已有的 src
        content_html = content_html.replace(
            f'src="{url}"',
            f'src="{local_path}"'
        )
    
    # 4. 处理没有 src 属性的图片 (微信懒加载)
    # 按顺序为它们分配本地图片路径
    def add_img_src(match):
        nonlocal img_index
        img_index += 1
        if img_index <= len(article["imageUrls"]):
            ext = guess_ext(article["imageUrls"][img_index - 1])
            tag = match.group(0)
            # 处理自闭合标签 <img ... /> 和普通标签 <img ... >
            if tag.endswith('/>'):
                return tag[:-2].rstrip() + f' src="images/img-{img_index}.{ext}"/>'
            elif tag.endswith('>'):
                return tag[:-1].rstrip() + f' src="images/img-{img_index}.{ext}">'
            return tag
        return match.group(0)
    
    # 匹配没有 src 的 img 标签
    content_html = re.sub(
        r'<img(?![^>]*\bsrc=)[^>]*>',
        add_img_src,
        content_html
    )

    # 5. 清理残留的 data-src 属性
    content_html = re.sub(r'\s+data-src="[^"]*"', '', content_html)

    html = (
        "<!doctype html>\n"
        '<html lang="zh-CN"><head>\n'
        '<meta charset="utf-8" />\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1" />\n'
        f"<title>{title}</title>\n"
        "<style>\n"
        '  body{max-width:720px;margin:0 auto;padding:24px;'
        'font-family:-apple-system,system-ui,"PingFang SC",sans-serif;'
        "line-height:1.75;color:#222}\n"
        "  img{max-width:100%;height:auto}\n"
        '  .wxk-header{border-bottom:1px solid #eee;padding-bottom:12px;'
        "margin-bottom:24px;color:#888;font-size:14px}\n"
        "  h1{font-size:22px;line-height:1.4}\n"
        "  @media print {\n"
        "    img { break-inside: avoid; page-break-inside: avoid; "
        "display: block; max-width: 100%; height: auto; margin: 0 auto }\n"
        "    figure, table, pre, blockquote "
        "{ break-inside: avoid; page-break-inside: avoid }\n"
        "    h1, h2, h3, h4 { break-after: avoid; page-break-after: avoid }\n"
        "    p { orphans: 3; widows: 3 }\n"
        "  }\n"
        "</style>\n"
        "</head><body>\n"
        f"<h1>{title}</h1>\n"
        f'<div class="wxk-header">{account} &middot; {pub_time} &middot; '
        f'<a href="{source_url}">原文</a></div>\n'
        f"<article>{content_html}</article>\n"
        "</body></html>\n"
    )
    return html


# ---------------------------------------------------------------------------
# 确定文件夹名
# ---------------------------------------------------------------------------


def resolve_post_dir(output_dir: Path, date_str: str, title: str) -> Path:
    """
    根据日期和标题确定文件夹路径。
    格式: post-YYYY-MM-DD，同日多篇时追加 -2, -3 ...
    """
    base_name = f"post-{date_str}"
    candidate = output_dir / base_name

    if not candidate.exists():
        return candidate

    # 已存在则添加序号
    suffix = 2
    while True:
        candidate = output_dir / f"{base_name}-{suffix}"
        if not candidate.exists():
            return candidate
        suffix += 1


# ---------------------------------------------------------------------------
# 主流程
# ---------------------------------------------------------------------------


def process_article(
    url: str,
    output_dir: Path,
    date_override: str | None = None,
):
    """处理单篇文章。"""
    session = requests.Session()
    session.headers.update(HEADERS)

    # 1. 抓取文章
    article = fetch_wechat_article(url, session)

    if not article["title"]:
        print("[ERROR] 无法提取文章标题，请检查链接是否有效。")
        sys.exit(1)

    print(f"  标题: {article['title']}")
    print(f"  公众号: {article['account']}")
    print(f"  作者: {article['author']}")
    print(f"  发布时间: {article['publishTime']}")
    print(f"  摘要: {article['digest'][:60]}...")
    print(f"  图片数量: {len(article['imageUrls'])}")

    # 2. 确定日期
    if date_override:
        date_str = date_override
    elif article["publishTime"]:
        date_str = article["publishTime"][:10]  # "2024-02-26"
    else:
        date_str = datetime.now().strftime("%Y-%m-%d")

    # 3. 创建文件夹
    post_dir = resolve_post_dir(output_dir, date_str, article["title"])
    images_dir = post_dir / "images"
    post_dir.mkdir(parents=True, exist_ok=True)
    images_dir.mkdir(parents=True, exist_ok=True)

    print(f"\n[INFO] 输出目录: {post_dir}")

    # 4. 下载封面图
    if article["coverUrl"]:
        cover_url = article["coverUrl"]
        if cover_url.startswith("//"):
            cover_url = "https:" + cover_url
        cover_ext = guess_ext(cover_url)
        cover_path = post_dir / f"cover.{cover_ext}"
        print(f"  下载封面: cover.{cover_ext}")
        download_image(cover_url, cover_path, session)

    # 5. 下载文章图片
    print(f"  下载文章图片 ({len(article['imageUrls'])} 张)...")
    for i, img_url in enumerate(article["imageUrls"], 1):
        ext = guess_ext(img_url)
        img_name = f"img-{i}.{ext}"
        img_path = images_dir / img_name
        print(f"    [{i}/{len(article['imageUrls'])}] {img_name}")
        download_image(img_url, img_path, session)
        time.sleep(0.3)  # 避免请求过快

    # 6. 生成 meta.json
    meta = build_meta_json(article, post_dir.name)
    meta["dir"] = str(post_dir.resolve())
    meta_path = post_dir / "meta.json"
    with open(meta_path, "w", encoding="utf-8") as f:
        json.dump(meta, f, ensure_ascii=False, indent=2)
    print(f"  已生成: meta.json")

    # 7. 生成 content.md
    md_content = build_content_md(article)
    md_path = post_dir / "content.md"
    with open(md_path, "w", encoding="utf-8") as f:
        f.write(md_content)
    print(f"  已生成: content.md")

    # 8. 生成 index.html
    html_content = build_index_html(article)
    html_path = post_dir / "index.html"
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"  已生成: index.html")

    print(f"\n[DONE] 文章已保存到: {post_dir}")
    return post_dir


def main():
    parser = argparse.ArgumentParser(
        description="抓取微信公众号文章并生成项目文件夹结构"
    )
    parser.add_argument("url", help="微信公众号文章 URL")
    parser.add_argument(
        "--output",
        "-o",
        default=None,
        help="输出目录 (默认: src/assets/inno_events)",
    )
    parser.add_argument(
        "--date",
        "-d",
        default=None,
        help="手动指定发布日期 (YYYY-MM-DD)，覆盖文章自带日期",
    )
    parser.add_argument(
        "--category",
        "-c",
        choices=["inno_events", "gs_science"],
        default="inno_events",
        help="文章分类 (默认: inno_events)",
    )

    args = parser.parse_args()

    # 确定输出目录
    if args.output:
        output_dir = Path(args.output)
    else:
        project_root = Path(__file__).resolve().parent
        output_dir = project_root / "src" / "assets" / args.category

    output_dir.mkdir(parents=True, exist_ok=True)

    print(f"=" * 60)
    print(f"微信公众号文章抓取工具")
    print(f"=" * 60)
    print(f"URL: {args.url}")
    print(f"输出: {output_dir}")
    print(f"分类: {args.category}")
    print()

    process_article(args.url, output_dir, args.date)


if __name__ == "__main__":
    main()
