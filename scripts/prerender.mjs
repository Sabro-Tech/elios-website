// Post-build static prerender step. Serves the freshly-built dist/ locally, visits
// each public route in a real (headless) browser so React (and Seo.tsx's useEffect)
// fully render, then overwrites that route's HTML on disk with the rendered output.
// Crawlers hitting these paths now get real HTML immediately; browsers still get the
// same file and hydrate over it exactly as before. New route with real content?
// Add its path to ROUTES below — nothing else changes.
import { createServer } from 'node:http'
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import puppeteer from 'puppeteer'

const DIST = path.resolve(process.cwd(), 'dist')
const PORT = 4173
const ROUTES = ['/', '/products', '/privacy-policy']

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json',
  '.woff2': 'font/woff2', '.ico': 'image/x-icon',
}

function startServer() {
  const server = createServer(async (req, res) => {
    let urlPath = decodeURIComponent(req.url.split('?')[0])
    let filePath = path.join(DIST, urlPath)
    if (!existsSync(filePath) || filePath.endsWith(path.sep)) {
      filePath = path.join(DIST, 'index.html') // SPA fallback, mirrors nginx try_files
    }
    try {
      const data = await readFile(filePath)
      res.setHeader('Content-Type', MIME[path.extname(filePath)] || 'application/octet-stream')
      res.end(data)
    } catch {
      res.statusCode = 404
      res.end('not found')
    }
  })
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)))
}

// S5 (Visual/Multimodal SEO): image sitemap. Product/hero photos get content-hashed
// filenames from Vite, so this regenerates sitemap.xml post-build against whatever
// dist/assets actually contains, rather than hand-maintaining stale hashed URLs.
const PRODUCT_IMAGE_BASENAMES = [
  '1ton-flower-nobg-hero', '1ton-grey-nobg-hero', '1_5ton-black-nobg-hero',
  '1_5ton-silver-nobg-hero', '1_5ton-white-nobg-hero', 'Geyser-transparent-hero',
]

async function regenerateSitemap() {
  const assetFiles = await readdir(path.join(DIST, 'assets'))
  const imageUrls = PRODUCT_IMAGE_BASENAMES
    .map((base) => assetFiles.find((f) => f.startsWith(base + '-') && f.endsWith('.webp')))
    .filter(Boolean)
    .map((f) => 'https://eliospk.com/assets/' + f)

  const imageTags = imageUrls
    .map((url) => '    <image:image>\n      <image:loc>' + url + '</image:loc>\n    </image:image>')
    .join('\n')

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    '  <url>',
    '    <loc>https://eliospk.com/</loc>',
    '    <changefreq>weekly</changefreq>',
    '    <priority>1.0</priority>',
    '  </url>',
    '  <url>',
    '    <loc>https://eliospk.com/products</loc>',
    '    <changefreq>weekly</changefreq>',
    '    <priority>0.9</priority>',
    imageTags,
    '  </url>',
    '  <url>',
    '    <loc>https://eliospk.com/privacy-policy</loc>',
    '    <changefreq>yearly</changefreq>',
    '    <priority>0.3</priority>',
    '  </url>',
    '</urlset>',
    '',
  ].join('\n')

  await writeFile(path.join(DIST, 'sitemap.xml'), xml)
  console.log(`regenerated sitemap.xml with ${imageUrls.length} image entries`)
}

async function main() {
  const server = await startServer()
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
  try {
    for (const route of ROUTES) {
      const page = await browser.newPage()
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0' })
      // Seo.tsx sets tags in a useEffect (runs after paint) — a tick of headroom
      // beyond networkidle0 to be sure it's landed before we snapshot.
      await new Promise((r) => setTimeout(r, 300))
      const html = await page.content()
      await page.close()

      // Flat "<route>.html" files, not "<route>/index.html" directories — nginx's
      // try_files ($uri $uri.html $uri/ /index.html) serves these directly with no
      // trailing-slash redirect, so the crawled URL and the canonical tag match exactly.
      const outFile = route === '/' ? path.join(DIST, 'index.html') : path.join(DIST, `${route.replace(/^\//, '')}.html`)
      await mkdir(path.dirname(outFile), { recursive: true })
      await writeFile(outFile, html)
      console.log(`prerendered ${route} -> ${path.relative(process.cwd(), outFile)}`)
    }
  } finally {
    await browser.close()
    server.close()
  }
  await regenerateSitemap()
}

main().catch((err) => {
  console.error('prerender failed:', err)
  process.exit(1)
})
