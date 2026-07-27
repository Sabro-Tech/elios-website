import { useEffect } from "react"

const SITE_NAME = "Elios"
const SITE_URL = "https://eliospk.com"

interface SeoProps {
  title: string
  description: string
  canonicalPath?: string
  noindex?: boolean
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement("link")
    el.setAttribute("rel", rel)
    document.head.appendChild(el)
  }
  el.setAttribute("href", href)
}

// Sets document.title + meta description/OG/Twitter/canonical/robots for the current
// route. Prerendering (scripts/prerender.mjs) waits for the page to settle before
// snapshotting, so tags set here land in the static HTML crawlers see, not just the
// live DOM. Deliberately dependency-free (no react-helmet) — small surface, easy to
// swap later for a DB-driven version editable from the ERP (see SEO module plan).
export default function Seo({ title, description, canonicalPath, noindex }: SeoProps) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`
    const url = `${SITE_URL}${canonicalPath ?? window.location.pathname}`
    document.title = fullTitle
    setMeta("name", "description", description)
    setMeta("property", "og:site_name", SITE_NAME)
    setMeta("property", "og:title", fullTitle)
    setMeta("property", "og:description", description)
    setMeta("property", "og:type", "website")
    setMeta("property", "og:url", url)
    setMeta("name", "twitter:card", "summary_large_image")
    setMeta("name", "twitter:title", fullTitle)
    setMeta("name", "twitter:description", description)
    setLink("canonical", url)
    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow")
  }, [title, description, canonicalPath, noindex])

  return null
}
