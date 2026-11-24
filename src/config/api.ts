/**
 * Site data configuration.
 *
 * This site is fully static (GitHub Pages) and no longer depends on the old
 * AI Studio dev backend. That backend URL now sits behind a cookie check
 * page and cannot answer API calls, which is what broke the live feeds and
 * the AI tutor. Instead:
 * - Live RBI and SEBI headlines are read from the official RSS feeds in the
 *   browser (see src/lib/feeds.ts).
 * - The AI tutor talks to Gemini directly from the browser (see
 *   src/lib/tutor.ts).
 */
export const RBI_PRESS_RELEASES_RSS = 'https://www.rbi.org.in/pressreleases_rss.xml';
export const RBI_NOTIFICATIONS_RSS = 'https://www.rbi.org.in/notifications_rss.xml';
export const SEBI_RSS = 'https://www.sebi.gov.in/sebirss.xml';
