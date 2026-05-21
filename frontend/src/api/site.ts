const BASE = import.meta.env.VITE_WP_URL;

export interface WPSiteInfo {
  name: string;
  description: string;
  url: string;
}

export async function getSiteInfo(): Promise<WPSiteInfo> {
  const res = await fetch(`${BASE}/wp-json`);
  if (!res.ok) throw new Error(`WP API ${res.status}`);
  const json = await res.json();
  return { name: json.name, description: json.description, url: json.url };
}
