import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { isAutomatedBrowser } from "../utils/isAutomatedBrowser"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

// gtag.js itself is loaded in index.html with send_page_view:false — this component
// fires the page_view event by hand on every route change. Without this, GA4 would
// only ever see the single page_view gtag('config') fires on initial script load,
// since React Router doesn't do a full page reload between routes.
export default function GoogleAnalytics() {
  const location = useLocation()

  useEffect(() => {
    if (!window.gtag || isAutomatedBrowser()) return
    window.gtag("event", "page_view", {
      page_path: location.pathname,
      page_title: document.title,
      page_location: window.location.href,
    })
  }, [location.pathname])

  return null
}
