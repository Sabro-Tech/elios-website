import { useEffect, useState } from "react"

const ERP_API = "https://erp.eliospk.com"

interface FaqItem { question: string; answer: string }

// Renders a visible accordion AND the matching FAQPage JSON-LD in one place (S5,
// GEO/E-E-A-T) — structured data must match visible content, so both live together
// rather than the schema being generated separately from what a user actually sees.
// Optional per-route content, edited from the ERP's SEO -> Pages tab; renders nothing
// if the route has no FAQ configured.
export default function Faq({ route }: { route?: string }) {
  const [items, setItems] = useState<FaqItem[] | null>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const effRoute = route ?? window.location.pathname

  useEffect(() => {
    let cancelled = false
    fetch(`${ERP_API}/api/seo/public/page?route=${encodeURIComponent(effRoute)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => { if (!cancelled) setItems(data?.faq_items?.length ? data.faq_items : null) })
      .catch(() => { if (!cancelled) setItems(null) })
    return () => { cancelled = true }
  }, [effRoute])

  if (!items) return null

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  }

  return (
    <section id="faq" className="w-full bg-white py-24 px-6">
      <div className="max-w-[900px] mx-auto">
        <h2 className="font-heading font-bold text-[36px] md:text-[48px] text-brand-blue uppercase leading-tight tracking-tight text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col gap-4">
          {items.map((item, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-questrial font-bold text-brand-blue text-lg bg-[#f8fafc] hover:bg-[#f0f4f8] transition-colors"
                aria-expanded={openIndex === i}
              >
                <span>{item.question}</span>
                <span className="shrink-0 text-2xl leading-none">{openIndex === i ? "−" : "+"}</span>
              </button>
              {openIndex === i && (
                <div className="px-6 py-5 font-questrial text-gray-600 leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </section>
  )
}
