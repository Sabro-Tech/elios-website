// Runs a single Lighthouse lab pass against a live URL and prints the scores this
// project cares about as JSON on stdout — called by the ERP backend's
// POST /api/seo/lighthouse/run (mrp_full/brain/api/seo_routes.py), which shells out
// to this script via `node scripts/lighthouse-run.mjs <url>`. Reuses puppeteer's
// bundled Chromium (already installed for scripts/prerender.mjs) via chrome-launcher,
// so no separate Chrome install is needed on the server.
import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';

const url = process.argv[2];
if (!url) {
  console.error('usage: node lighthouse-run.mjs <url>');
  process.exit(1);
}

async function main() {
  const chrome = await launch({ chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'] });
  try {
    const result = await lighthouse(url, {
      port: chrome.port,
      output: 'json',
      onlyCategories: ['performance', 'seo', 'accessibility', 'best-practices'],
    });
    const lhr = result.lhr;
    const audits = lhr.audits;
    const out = {
      performance_score: Math.round((lhr.categories.performance?.score ?? 0) * 100),
      seo_score: Math.round((lhr.categories.seo?.score ?? 0) * 100),
      accessibility_score: Math.round((lhr.categories.accessibility?.score ?? 0) * 100),
      best_practices_score: Math.round((lhr.categories['best-practices']?.score ?? 0) * 100),
      lcp_ms: audits['largest-contentful-paint']?.numericValue != null
        ? Math.round(audits['largest-contentful-paint'].numericValue) : null,
      cls: audits['cumulative-layout-shift']?.numericValue ?? null,
      tbt_ms: audits['total-blocking-time']?.numericValue != null
        ? Math.round(audits['total-blocking-time'].numericValue) : null,
    };
    console.log(JSON.stringify(out));
  } finally {
    await chrome.kill();
  }
}

main().catch((err) => {
  console.error(err.message || String(err));
  process.exit(1);
});
