import { useState } from 'react'
import { Plus } from 'lucide-react'
import { faqs } from '../data/company'
import { CallButton, QuoteButton, Reveal, SectionHeading } from './ui'

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:px-8">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading center={false} eyebrow="FAQ" title="Questions? We have answers." text="Here are some things people often ask us. Don't see your question? Just give us a call." />
          <Reveal className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <QuoteButton />
            <CallButton variant="ghost" />
          </Reveal>
        </div>

        <div className="space-y-4">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <Reveal key={f.q} delay={i * 50}>
                <div className={`rounded-2xl bg-white ring-1 transition ${isOpen ? 'shadow-lg ring-brand-200' : 'ring-slate-200'}`}>
                  <h3>
                    <button
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-lg font-semibold text-slate-900"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                    >
                      {f.q}
                      <span className={`flex size-8 shrink-0 items-center justify-center rounded-full transition ${isOpen ? 'rotate-45 bg-brand-600 text-white' : 'bg-brand-50 text-brand-700'}`}>
                        <Plus className="size-5" aria-hidden />
                      </span>
                    </button>
                  </h3>
                  <div id={`faq-${i}`} className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-lg leading-relaxed text-slate-600">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
          }),
        }}
      />
    </section>
  )
}
