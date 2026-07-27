import { useEffect, useState } from "react"

const SITE_NAME = "Elios"
const SITE_URL = "https://eliospk.com"
// Public, unauthenticated endpoint (see mrp_full/brain/api/seo_routes.py) — CORS is
// wide open on the ERP (allow_origins=["*"]), so this cross-origin fetch just works.
const ERP_API = "https://erp.eliospk.com"

interface SeoProps {
  title: string
  description: string
  canonicalPath?: string
  noindex?: boolean
}

interface SeoOverride {
  title: string | null
  meta_description: string | null
  robots_directive: string | null
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
// route. Prerendering (scripts/prerender.mjs) waits for network-idle before
// snapshotting, so both this component's DOM writes AND the override fetch below land
// in the static HTML crawlers see, not just the live DOM.
//
// Checks the ERP's SEO module (Marketing -> SEO -> Pages) for a live override of
// title/description/robots for this route first; falls back to the hardcoded props
// below if the ERP has nothing configured for it (404) or is unreachable. This is what
// makes the ERP's meta-tag manager actually reach the live site with no code deploy.
export default function Seo({ title, description, canonicalPath, noindex }: SeoProps) {
  const [override, setOverride] = useState<SeoOverride | null>(null)
  const route = canonicalPath ?? window.location.pathname

  useEffect(() => {
    let cancelled = false
    fetch(`${ERP_API}/api/seo/public/page?route=${encodeURIComponent(route)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => { if (!cancelled) setOverride(data) })
      .catch(() => { if (!cancelled) setOverride(null) })
    return () => { cancelled = true }
  }, [route])

  useEffect(() => {
    const effTitle = override?.title || title
    const effDescription = override?.meta_description || description
    const effRobots = override?.robots_directive || (noindex ? "noindex, nofollow" : "index, follow")
    const fullTitle = `${effTitle} | ${SITE_NAME}`
    const url = `${SITE_URL}${route}`

    document.title = fullTitle
    setMeta("name", "description", effDescription)
    setMeta("property", "og:site_name", SITE_NAME)
    setMeta("property", "og:title", fullTitle)
    setMeta("property", "og:description", effDescription)
    setMeta("property", "og:type", "website")
    setMeta("property", "og:url", url)
    setMeta("name", "twitter:card", "summary_large_image")
    setMeta("name", "twitter:title", fullTitle)
    setMeta("name", "twitter:description", effDescription)
    setLink("canonical", url)
    setMeta("name", "robots", effRobots)
  }, [title, description, noindex, route, override])

  return null
}
