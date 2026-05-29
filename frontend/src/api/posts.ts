import { apiFetch, resolveWpUrl } from './client';
import type { WPPost, WPMediaItem } from '../types/post';

const WP_BASE = import.meta.env.VITE_WP_URL || '';

/**
 * 本番 WordPress DB にメディアレコードが存在しない場合の静的フォールバック。
 * ファイルはサーバー上に存在するが wp_posts に未登録のもの。
 * 本番 DB にメディアを正式に登録した際は該当エントリを削除する。
 */
const MEDIA_STATIC_FALLBACK: Record<number, string> = {
  6:  '/wp-content/uploads/2025/03/AdobeStock_157518018_Preview-1.jpg',
  11: '/wp-content/uploads/2026/05/AdobeStock_157518018_Preview-1.jpg',
  13: '/wp-content/uploads/2026/05/mv-prologue.jpg',
  14: '/wp-content/uploads/2026/05/image-prologue_01.jpg',
  15: '/wp-content/uploads/2026/05/image-prologue_02.jpg',
  16: '/wp-content/uploads/2026/05/image-prologue_03.jpg',
};

/**
 * _embedded['wp:featuredmedia'][0].source_url を取得する。
 * rest_forbidden 等でエラーオブジェクトが入っている場合は null を返す。
 */
function getEmbeddedSrc(post: WPPost): string | null {
  const item = post._embedded?.['wp:featuredmedia']?.[0];
  if (item && 'source_url' in item) {
    return resolveWpUrl(item.source_url) || null;
  }
  return null;
}

/**
 * メディア ID から source_url を解決する（3段階フォールバック）。
 * 1. _embedded['wp:featuredmedia'][0].source_url（_embed=1 で取得済み）
 * 2. /media?include=ID API（DB にレコードがある場合）
 * 3. MEDIA_STATIC_FALLBACK（DB に未登録だがファイルが存在するケース）
 */
async function enrichWithMedia(posts: WPPost[]): Promise<WPPost[]> {
  const missing = posts.filter(p => !getEmbeddedSrc(p) && p.featured_media > 0);
  if (missing.length === 0) return posts;

  let mediaMap = new Map<number, WPMediaItem>();

  try {
    const ids = missing.map(p => p.featured_media);
    const { data: mediaItems } = await apiFetch<WPMediaItem[]>('/media', {
      include: ids.join(','),
      _fields: 'id,source_url,alt_text',
      per_page: String(ids.length),
    });
    mediaMap = new Map(mediaItems.map(m => [m.id, m]));
  } catch {
    // メディア API が失敗しても静的フォールバックで続行する
  }

  return posts.map(post => {
    if (getEmbeddedSrc(post)) return post;

    // API から取得できた場合
    const m = mediaMap.get(post.featured_media);
    if (m) {
      return {
        ...post,
        _embedded: {
          ...post._embedded,
          'wp:featuredmedia': [{
            source_url: resolveWpUrl(m.source_url),
            alt_text: m.alt_text,
          }],
        },
      };
    }

    // 静的フォールバック（DB 未登録だがファイルは存在する）
    const fallbackPath = MEDIA_STATIC_FALLBACK[post.featured_media];
    if (fallbackPath && WP_BASE) {
      return {
        ...post,
        _embedded: {
          ...post._embedded,
          'wp:featuredmedia': [{
            source_url: WP_BASE + fallbackPath,
            alt_text: '',
          }],
        },
      };
    }

    return post;
  });
}

export const getPosts = async (page = 1, perPage = 10) => {
  const result = await apiFetch<WPPost[]>('/posts', {
    _embed: '1',
    per_page: String(perPage),
    page: String(page),
  });
  return { ...result, data: await enrichWithMedia(result.data) };
};

export const getRecentPosts = async () => {
  const result = await apiFetch<WPPost[]>('/posts', {
    _embed: '1',
    per_page: '5',
    orderby: 'date',
  });
  return { ...result, data: await enrichWithMedia(result.data) };
};

export const getPost = async (slug: string) => {
  const result = await apiFetch<WPPost[]>('/posts', { slug, _embed: '1' });
  return { ...result, data: await enrichWithMedia(result.data) };
};

export const getPostsByCategory = async (categoryId: number, page = 1, perPage = 10) => {
  const result = await apiFetch<WPPost[]>('/posts', {
    _embed: '1',
    categories: String(categoryId),
    per_page: String(perPage),
    page: String(page),
  });
  return { ...result, data: await enrichWithMedia(result.data) };
};
