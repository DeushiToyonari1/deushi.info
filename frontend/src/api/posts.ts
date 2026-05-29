import { apiFetch, resolveWpUrl } from './client';
import type { WPPost, WPMediaItem } from '../types/post';

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
 * _embedded に source_url が取れなかった記事に対して
 * /media?include=... で一括フォールバック取得し、_embedded に注入する。
 * API が認証エラー等で失敗した場合はそのまま返す。
 */
async function enrichWithMedia(posts: WPPost[]): Promise<WPPost[]> {
  const missing = posts.filter(p => !getEmbeddedSrc(p) && p.featured_media > 0);
  if (missing.length === 0) return posts;

  try {
    const ids = missing.map(p => p.featured_media);
    const { data: mediaItems } = await apiFetch<WPMediaItem[]>('/media', {
      include: ids.join(','),
      _fields: 'id,source_url,alt_text',
      per_page: String(ids.length),
    });

    if (!mediaItems.length) return posts;

    const mediaMap = new Map(mediaItems.map(m => [m.id, m]));

    return posts.map(post => {
      if (getEmbeddedSrc(post)) return post;
      const m = mediaMap.get(post.featured_media);
      if (!m) return post;
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
    });
  } catch {
    return posts;
  }
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
