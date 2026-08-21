// =========================================================
// GC Science post registry
//
// Every post lives in its own folder under
// src/assets/gs_science/<post-id>/ with:
//   - meta.json      (title, author, publishTime, sourceUrl, ...)
//   - cover.jpg      (preview cover)
//   - index.html     (saved article HTML)
//   - images/        (article images)
//
// The registry auto-discovers every post folder, so adding a
// new post only requires dropping its folder into assets.
// =========================================================

export interface GSPostMeta {
  id: string;
  title: string;
  author: string;
  account: string;
  publishTime: string; // "2025-12-05 12:30"
  sourceUrl?: string;
  coverUrl?: string;
  /** Always shown first, regardless of publishTime. */
  pinned?: boolean;
}

export interface GSPost extends GSPostMeta {
  cover: string;
}

const metaModules = import.meta.glob<GSPostMeta>(
  "../../assets/gs_science/*/meta.json",
  {
    eager: true,
    import: "default",
  },
);

const coverModules = import.meta.glob(
  "../../assets/gs_science/*/cover.{jpg,jpeg,png,webp}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

const htmlModules = import.meta.glob(
  "../../assets/gs_science/*/index.html",
  {
    eager: true,
    query: "?raw",
    import: "default",
  },
) as Record<string, string>;

const imageModules = import.meta.glob(
  "../../assets/gs_science/*/images/*.{png,jpg,jpeg,gif,webp}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

/** Drop the "../../assets/gs_science/" prefix from a glob key. */
function relativePath(key: string): string {
  const marker = "assets/gs_science/";
  return key.slice(key.indexOf(marker) + marker.length);
}

const imageUrls: Record<string, string> = Object.fromEntries(
  Object.entries(imageModules).map(([key, url]) => [relativePath(key), url]),
);

const posts: GSPost[] = Object.entries(metaModules)
  .map(([key, meta]) => {
    const rel = relativePath(key); // "<post-id>/meta.json"
    const id = rel.split("/")[0];

    return {
      ...meta,
      id,
      pinned: meta.pinned === true || id === "post-pinned",
      cover:
        coverModules[`../../assets/gs_science/${id}/cover.jpg`] ??
        coverModules[`../../assets/gs_science/${id}/cover.png`] ??
        meta.coverUrl ??
        "",
    };
  })
  .sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;

    return (
      b.publishTime.localeCompare(a.publishTime) || a.id.localeCompare(b.id)
    );
  });

/** All posts: pinned first, then newest first. */
export function getPosts(): GSPost[] {
  return posts;
}

export function getPost(id: string): GSPost | undefined {
  return posts.find((post) => post.id === id);
}

/** "2025-12-05 12:30" -> "2025.12.05" */
export function formatPostDate(publishTime: string): string {
  return publishTime.slice(0, 10).replaceAll("-", ".");
}

/** Extract the article body from the saved HTML and rewrite image srcs. */
function extractArticle(html: string, postId: string): string {
  const match = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);

  if (!match) return "";

  return (
    match[1]
      // WeChat video placeholders carry no usable src — drop them
      .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
      // Hidden WeChat style metadata
      .replace(/<p\s+style="display:\s*none"[\s\S]*?<\/p>/gi, "")
      // Local image paths -> hashed asset URLs
      .replace(/src="images\/([^"]+)"/gi, (m, name: string) => {
        const url = imageUrls[`${postId}/images/${name}`];
        return url ? `src="${url}"` : m;
      })
      // Lazy-load the long image lists
      .replace(/<img(?![^>]*\bloading=)/gi, '<img loading="lazy"')
  );
}

/** Article HTML ready for dangerouslySetInnerHTML. */
export function getPostContent(postId: string): string {
  const html = htmlModules[`../../assets/gs_science/${postId}/index.html`];
  return html ? extractArticle(html, postId) : "";
}
