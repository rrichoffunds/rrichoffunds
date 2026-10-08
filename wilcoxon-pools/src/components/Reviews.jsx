import { ExternalLink, Quote, Star } from 'lucide-react'
import { company, reviews, SHOW_PLACEHOLDER_NOTES } from '../data/company'
import { Reveal, SectionHeading } from './ui'

function Stars({ n = 5 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`size-5 ${i < n ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} aria-hidden />
      ))}
    </div>
  )
}

function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" className="size-6" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  )
}

export default function Reviews() {
  const hasReviews = reviews.length > 0
  return (
    <section id="reviews" className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Customer Reviews" title="What our customers say." text="We are proud of our work. But don't just take our word for it. See what real customers say on Google." />

        <Reveal className="mt-10 flex justify-center">
          <a
            href={company.googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 font-semibold text-slate-800 shadow-md ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <GoogleG /> Read our reviews on Google <ExternalLink className="size-4 text-slate-500" aria-hidden />
          </a>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {hasReviews
            ? reviews.map((r, i) => (
                <Reveal key={r.name + i} delay={(i % 3) * 100}>
                  <figure className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                    <div className="flex items-center justify-between">
                      <Stars n={r.stars} />
                      <GoogleG />
                    </div>
                    <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-slate-700">“{r.text}”</blockquote>
                    <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                      <span className="flex size-11 items-center justify-center rounded-full bg-brand-100 font-display font-bold text-brand-800">{r.name[0]}</span>
                      <span>
                        <span className="block font-semibold text-slate-900">{r.name}</span>
                        {r.date && <span className="block text-sm text-slate-500">{r.date} · Google review</span>}
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))
            : SHOW_PLACEHOLDER_NOTES &&
              [1, 2, 3].map((n) => (
                <Reveal key={n} delay={(n - 1) * 100}>
                  <div className="flex h-full flex-col items-center justify-center rounded-3xl border-2 border-dashed border-brand-200 bg-white/60 p-8 text-center">
                    <Quote className="size-10 text-brand-200" aria-hidden />
                    <p className="mt-4 font-semibold text-slate-700">Review spot #{n}</p>
                    <p className="mt-2 text-sm text-slate-500">
                      PLACEHOLDER: Copy a real Google review here, word for word, in <code className="rounded bg-slate-100 px-1">src/data/company.js</code>.
                    </p>
                  </div>
                </Reveal>
              ))}
        </div>
      </div>
    </section>
  )
}
