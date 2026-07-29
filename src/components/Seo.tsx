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

interface OrgProfile {
  legal_name: string | null; brand_name: string | null; logo_url: string | null
  street_address: string | null; locality: string | null; region: string | null
  postal_code: string | null; country: string | null; phone_numbers: string[]
  email: string | null; opening_hours: { days: string; opens: string; closes: string }[]
  same_as: string[]; price_range: string | null
}

// S5 (E-E-A-T): fetched once and reused across every route's Seo instance — this is
// sitewide data, not per-page — rather than one call per page mount.
let orgProfileCache: Promise<OrgProfile | null> | null = null
function loadOrgProfile(): Promise<OrgProfile | null> {
  if (!orgProfileCache) {
    orgProfileCache = fetch(`${ERP_API}/api/seo/public/organization`)
      .then((res) => (res.ok ? res.json() : null))
      .catch(() => null)
  }
  return orgProfileCache
}

function daysToSchema(days: string): string[] {
  // "Mo-Fr" -> ["Monday", ..., "Friday"]; "Sa" -> ["Saturday"]. Good enough for the
  // simple day-ranges this profile actually stores (no multi-range parsing needed).
  const order = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
  const names: Record<string, string> = {
    Su: "Sunday", Mo: "Monday", Tu: "Tuesday", We: "Wednesday", Th: "Thursday", Fr: "Friday", Sa: "Saturday",
  }
  const parts = days.split("-").map((s) => s.trim())
  if (parts.length === 1) return [names[parts[0]]].filter(Boolean)
  const [start, end] = parts
  const startIdx = order.indexOf(start)
  const endIdx = order.indexOf(end)
  if (startIdx === -1 || endIdx === -1) return []
  const out: string[] = []
  for (let i = startIdx; ; i = (i + 1) % 7) {
    out.push(names[order[i]])
    if (i === endIdx) break
  }
  return out
}

function buildOrganizationJsonLd(org: OrgProfile) {
  const address = org.street_address ? {
    "@type": "PostalAddress",
    streetAddress: org.street_address,
    addressLocality: org.locality || undefined,
    addressRegion: org.region || undefined,
    postalCode: org.postal_code || undefined,
    addressCountry: org.country || undefined,
  } : undefined

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: org.brand_name || org.legal_name || SITE_NAME,
    legalName: org.legal_name || undefined,
    url: SITE_URL,
    logo: org.logo_url || undefined,
    image: org.logo_url || undefined,
    email: org.email || undefined,
    telephone: org.phone_numbers?.[0] || undefined,
    address,
    sameAs: org.same_as && org.same_as.length ? org.same_as : undefined,
    priceRange: org.price_range || undefined,
    openingHoursSpecification: (org.opening_hours || []).map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: daysToSchema(h.days),
      opens: h.opens,
      closes: h.closes,
    })),
  }
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
  const [org, setOrg] = useState<OrgProfile | null>(null)
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
    let cancelled = false
    loadOrgProfile().then((data) => { if (!cancelled) setOrg(data) })
    return () => { cancelled = true }
  }, [])

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

  // Organization/LocalBusiness JSON-LD (S5, E-E-A-T) — rendered directly in the JSX
  // (not via document.head manipulation like the meta tags above) since structured
  // data doesn't need to live in <head>; the prerender step still captures it either
  // way. Renders on every page once the org profile has loaded.
  if (!org) return null
  return (
    <script type="application/ld+json">
      {JSON.stringify(buildOrganizationJsonLd(org))}
    </script>
  )
}
