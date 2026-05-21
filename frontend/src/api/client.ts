const BASE = `${import.meta.env.VITE_WP_URL}/wp-json/wp/v2`;

export async function apiFetch<T>(
  path: string,
  params?: Record<string, string>
): Promise<{ data: T; total: number; totalPages: number }> {
  const url = new URL(`${BASE}${path}`);
  params && Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`WP API ${res.status}`);
  return {
    data: await res.json(),
    total: Number(res.headers.get('X-WP-Total') ?? 0),
    totalPages: Number(res.headers.get('X-WP-TotalPages') ?? 0),
  };
}
