import { DUMMY_POSTS, DUMMY_CATEGORIES } from '../mocks/dummyData';

// VITE_WP_URL が空なら相対パス（Vite dev proxy 経由）
const WP_BASE = import.meta.env.VITE_WP_URL || '';
const BASE = `${WP_BASE}/wp-json/wp/v2`;

// WordPress が返す絶対 URL を Vite proxy 経由の相対パスに正規化
// 例: http://localhost:8888/wp/wp-content/... → /wp-content/...
const WP_ORIGIN = import.meta.env.VITE_WP_ORIGIN || '';
function normalizeWpUrls(json: string): string {
  if (!WP_ORIGIN) return json;
  return json.replaceAll(WP_ORIGIN, '');
}

function getDummyResponse<T>(
  path: string,
  params?: Record<string, string>
): { data: T; total: number; totalPages: number } {
  if (path.startsWith('/categories')) {
    const slug = params?.slug;
    const result = slug
      ? DUMMY_CATEGORIES.filter((c) => c.slug === slug)
      : DUMMY_CATEGORIES;
    return { data: result as T, total: result.length, totalPages: 1 };
  }

  const slug = params?.slug;
  const categoryId = params?.categories ? Number(params.categories) : undefined;
  const page = Number(params?.page ?? '1');
  const perPage = Number(params?.per_page ?? '10');

  let posts = DUMMY_POSTS;
  if (slug) {
    posts = posts.filter((p) => p.slug === slug);
  } else if (categoryId !== undefined) {
    posts = posts.filter((p) => p.categories.includes(categoryId));
  }

  const start = (page - 1) * perPage;
  const paginated = posts.slice(start, start + perPage);
  const totalPages = Math.ceil(posts.length / perPage) || 1;

  return { data: paginated as T, total: posts.length, totalPages };
}

export async function apiFetch<T>(
  path: string,
  params?: Record<string, string>
): Promise<{ data: T; total: number; totalPages: number }> {
  try {
    const urlStr = `${BASE}${path}`;
    const url = WP_BASE ? new URL(urlStr) : new URL(urlStr, window.location.origin);
    params && Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`WP API ${res.status}`);
    const text = normalizeWpUrls(await res.text());
    return {
      data: JSON.parse(text),
      total: Number(res.headers.get('X-WP-Total') ?? 0),
      totalPages: Number(res.headers.get('X-WP-TotalPages') ?? 0),
    };
  } catch {
    return getDummyResponse<T>(path, params);
  }
}
