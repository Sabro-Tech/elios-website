// Post-build static prerender step. Serves the freshly-built dist/ locally, visits
// each public route in a real (headless) browser so React (and Seo.tsx's useEffect)
// fully render, then overwrites that route's HTML on disk with the rendered output.
// Crawlers hitting these paths now get real HTML immediately; browsers still get the
// same file and hydrate over it exactly as before. New route with real content?
// Add its path to ROUTES below — nothing else changes.
import { createServer } from 'node:http'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import puppeteer from 'puppeteer'

const DIST = path.resolve(process.cwd(), 'dist')
const PORT = 4173
const ROUTES = ['/', '/products']

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
}

main().catch((err) => {
  console.error('prerender failed:', err)
  process.exit(1)
})
