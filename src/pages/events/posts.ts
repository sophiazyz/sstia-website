// =========================================================
// Innovation Events post registry
//
// Every post lives in its own folder under
// src/assets/inno_events/<post-id>/ with:
//   - meta.json      (title, author, publishTime, sourceUrl, ...)
//   - cover.jpg      (preview cover)
//   - index.html     (saved article HTML)
//   - images/        (article images)
//
// The registry auto-discovers every post folder, so adding a
// new post only requires dropping its folder into assets.
// =========================================================

export interface EventPostMeta {
  id: string;
  title: string;
  author: string;
  account: string;
  publishTime: string; // "2024-02-26 11:19"
  sourceUrl?: string;
  coverUrl?: string;
  /** Always shown first, regardless of publishTime. */
  pinned?: boolean;
}

export interface EventPost extends EventPostMeta {
  cover: string;
}

const metaModules = import.meta.glob<EventPostMeta>(
  "../../assets/inno_events/*/meta.json",
  {
    eager: true,
    import: "default",
  },
);

const coverModules = import.meta.glob(
  "../../assets/inno_events/*/cover.{jpg,jpeg,png,webp}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

const htmlModules = import.meta.glob(
  "../../assets/inno_events/*/index.html",
  {
    eager: true,
    query: "?raw",
    import: "default",
  },
) as Record<string, string>;

const imageModules = import.meta.glob(
  "../../assets/inno_events/*/images/*.{png,jpg,jpeg,gif,webp,svg}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

// GIFs identical across posts are stored once in src/assets/shared/
// and resolved through manifest.json (see relativePath keys below).
const sharedModules = import.meta.glob(
  "../../assets/shared/*.{png,jpg,jpeg,gif,webp,svg}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

const sharedUrls: Record<string, string> = Object.fromEntries(
  Object.entries(sharedModules).map(([key, url]) => [
    key.slice(key.lastIndexOf("/") + 1),
    url,
  ]),
);

const manifestModules = import.meta.glob<Record<string, string>>(
  "../../assets/shared/manifest.json",
  { eager: true, import: "default" },
);

const sharedManifest: Record<string, string> =
  manifestModules["../../assets/shared/manifest.json"] ?? {};

/** Drop the "../../assets/inno_events/" prefix from a glob key. */
function relativePath(key: string): string {
  const marker = "assets/inno_events/";
  return key.slice(key.indexOf(marker) + marker.length);
}

const imageUrls: Record<string, string> = Object.fromEntries(
  Object.entries(imageModules).map(([key, url]) => [relativePath(key), url]),
);

/** WeChat exports sometimes carry UI artifacts instead of an author. */
function normalizeAuthor(meta: EventPostMeta): string {
  return meta.author === "请关注" || meta.author === "请收藏"
    ? meta.account || meta.author
    : meta.author;
}

const posts: EventPost[] = Object.entries(metaModules)
  .map(([key, meta]) => {
    const rel = relativePath(key); // "<post-id>/meta.json"
    const id = rel.split("/")[0];

    return {
      ...meta,
      id,
      author: normalizeAuthor(meta),
      pinned: meta.pinned === true || id === "post-pinned",
      cover:
        coverModules[`../../assets/inno_events/${id}/cover.jpg`] ??
        coverModules[`../../assets/inno_events/${id}/cover.png`] ??
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
export function getEvents(): EventPost[] {
  return posts;
}

export function getEvent(id: string): EventPost | undefined {
  return posts.find((post) => post.id === id);
}

export interface EventYear {
  year: string;
  count: number;
}

/** Unique publish years, newest first, with post counts. */
export function getEventYears(): EventYear[] {
  const counts = new Map<string, number>();

  for (const post of posts) {
    const year = post.publishTime.slice(0, 4);
    counts.set(year, (counts.get(year) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => b.year.localeCompare(a.year));
}

/** Posts published in a given year, keeping the global order. */
export function getEventsByYear(year: string): EventPost[] {
  return posts.filter((post) => post.publishTime.startsWith(year));
}

/** "2024-02-26 11:19" -> "2024.02.26" */
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
      // Local image paths -> hashed asset URLs (shared copies first)
      .replace(/src="images\/([^"]+)"/gi, (m, name: string) => {
        const key = `${postId}/images/${name}`;
        const url =
          imageUrls[key] ??
          sharedUrls[sharedManifest[`inno_events/${key}`] ?? ""];
        return url ? `src="${url}"` : m;
      })
      // Lazy-load the long image lists
      .replace(/<img(?![^>]*\bloading=)/gi, '<img loading="lazy"')
  );
}

/** Article HTML ready for dangerouslySetInnerHTML. */
export function getEventContent(postId: string): string {
  const html = htmlModules[`../../assets/inno_events/${postId}/index.html`];
  return html ? extractArticle(html, postId) : "";
}
