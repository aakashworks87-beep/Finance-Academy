/**
 * Client-side RSS loading for the official RBI and SEBI feeds.
 *
 * The site is fully static (GitHub Pages). The feeds used to be proxied by an
 * AI Studio dev backend, which now sits behind a cookie check and cannot
 * answer API calls. The browser cannot fetch rbi.org.in or sebi.gov.in
 * directly either, because those servers send no CORS headers. So the XML is
 * fetched through public CORS proxies, with several routes tried in order,
 * and parsed in the browser.
 */
import { RBI_NOTIFICATIONS_RSS, RBI_PRESS_RELEASES_RSS, SEBI_RSS } from '../config/api';

export interface FeedItem {
  title: string;
  date: string;
  link: string;
  label?: string;
  timestamp: number;
}

export interface FeedResult {
  items: FeedItem[];
  /** true when a feed document was fetched and parsed (even if it has no items). */
  ok: boolean;
}

const PROXY_ROUTES: Array<(url: string) => string> = [
  (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
  (u) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`,
  (u) => `https://corsproxy.io/?url=${encodeURIComponent(u)}`,
];

async function fetchWithTimeout(url: string, timeoutMs: number): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

async function fetchFeedXml(url: string): Promise<string> {
  let lastError: unknown = null;
  for (const route of PROXY_ROUTES) {
    try {
      const text = await fetchWithTimeout(route(url), 12000);
      if (text && text.includes('<item')) return text;
      // A response without items can still be a valid empty feed (SEBI does
      // this). Accept it if it at least looks like an RSS document.
      if (text && text.includes('<rss')) return text;
      throw new Error('Unexpected feed response');
    } catch (err) {
      lastError = err;
    }
  }
  // Last resort: allorigins JSON wrapper.
  try {
    const raw = await fetchWithTimeout(
      `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
      15000,
    );
    const data = JSON.parse(raw) as { contents?: string };
    if (data && typeof data.contents === 'string' && data.contents.includes('<rss')) {
      return data.contents;
    }
    throw new Error('Unexpected feed response');
  } catch (err) {
    lastError = err;
  }
  throw lastError instanceof Error ? lastError : new Error('All feed routes failed');
}

function parseRssXml(xml: string, label: string | undefined, fallbackLink: string): FeedItem[] {
  const doc = new DOMParser().parseFromString(xml, 'text/xml');
  if (doc.querySelector('parsererror')) {
    throw new Error('Feed XML could not be parsed');
  }
  const items: FeedItem[] = [];
  doc.querySelectorAll('item').forEach((node) => {
    const read = (tag: string): string =>
      node.getElementsByTagName(tag)[0]?.textContent?.trim() ?? '';
    const title = read('title') || 'Official Update';
    let link = read('link');
    if (!link) link = read('guid');
    const dateStr = read('pubDate') || read('date');
    const parsed = new Date(dateStr);
    const valid = !Number.isNaN(parsed.getTime());
    items.push({
      title,
      date: valid
        ? parsed.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
        : dateStr,
      link: link || fallbackLink,
      ...(label ? { label } : {}),
      timestamp: valid ? parsed.getTime() : Date.now(),
    });
  });
  return items;
}

async function fetchOneFeed(
  url: string,
  label: string | undefined,
  fallbackLink: string,
): Promise<FeedResult> {
  try {
    const xml = await fetchFeedXml(url);
    return { items: parseRssXml(xml, label, fallbackLink), ok: true };
  } catch {
    return { items: [], ok: false };
  }
}

export async function fetchRbiItems(): Promise<FeedResult> {
  const [pressReleases, notifications] = await Promise.all([
    fetchOneFeed(RBI_PRESS_RELEASES_RSS, 'Press Release', 'https://rbi.org.in'),
    fetchOneFeed(RBI_NOTIFICATIONS_RSS, 'Notification', 'https://rbi.org.in'),
  ]);
  const items = [...pressReleases.items, ...notifications.items]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 8);
  return { items, ok: pressReleases.ok || notifications.ok };
}

export async function fetchSebiItems(): Promise<FeedResult> {
  const result = await fetchOneFeed(SEBI_RSS, undefined, 'https://www.sebi.gov.in');
  const items = [...result.items].sort((a, b) => b.timestamp - a.timestamp).slice(0, 8);
  return { items, ok: result.ok };
}
