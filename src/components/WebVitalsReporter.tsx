import { useEffect } from "react"
import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from "web-vitals"

// Real-user Core Web Vitals -> ERP SEO module (S2). Mounted once at the app root
// (not per-page) since these are whole-page-load metrics, not per-route-component
// ones. No auth (see mrp_full/brain/api/seo_routes.py::/rum) - a failed post here
// must never affect the visitor's actual page, so every call is fire-and-forget.
const ERP_API = "https://erp.eliospk.com"

function deviceType() {
  return window.innerWidth < 768 ? "mobile" : "desktop"
}

function report(metric: Metric) {
  const body = JSON.stringify({
    route: window.location.pathname,
    metric: metric.name,
    value: metric.value,
    rating: metric.rating,
    device_type: deviceType(),
  })
  // sendBeacon survives page unload (LCP/CLS often finalize right as the user
  // navigates away) - falls back to fetch with keepalive where unavailable.
  //
  // Content-Type is deliberately "text/plain", not "application/json": a JSON
  // content-type makes this a non-simple cross-origin request, which requires a CORS
  // preflight. Found 2026-07-28 in a live browser: the preflight succeeds, but the
  // browser then silently drops the actual POST rather than sending it - sendBeacon()
  // still returns true, no error anywhere, the event just never arrives. text/plain
  // is CORS-simple (no preflight), which is what actually gets it delivered. The
  // body is still JSON - the backend parses it by hand rather than relying on the
  // Content-Type header (see seo_routes.py::ingest_rum).
  const url = `${ERP_API}/api/seo/rum`
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, new Blob([body], { type: "text/plain" }))
  } else {
    fetch(url, { method: "POST", headers: { "Content-Type": "text/plain" }, body, keepalive: true }).catch(() => {})
  }
}

export default function WebVitalsReporter() {
  useEffect(() => {
    onCLS(report)
    onFCP(report)
    onINP(report)
    onLCP(report)
    onTTFB(report)
  }, [])

  return null
}
