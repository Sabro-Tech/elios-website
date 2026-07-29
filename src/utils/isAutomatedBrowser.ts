// Used to skip real-user-only reporting (Core Web Vitals, GA4 page views) when running
// under Puppeteer during the build's prerender step (scripts/prerender.mjs visits every
// route in a real headless browser to snapshot rendered HTML) - without this guard,
// every build would send synthetic "visits" into GA4 and mrp.seo_rum_events. Puppeteer
// (via the Chrome DevTools Protocol) sets navigator.webdriver = true by default; a real
// visitor's browser does not.
export function isAutomatedBrowser(): boolean {
  return typeof navigator !== "undefined" && navigator.webdriver === true
}
