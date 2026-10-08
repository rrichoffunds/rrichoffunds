import { Check, Hammer, LayoutGrid, PencilRuler, Sparkles, Trees, Wrench } from 'lucide-react'
import { services } from '../data/company'
import { QuoteButton, Reveal, SectionHeading } from './ui'

const icons = { Hammer, LayoutGrid, PencilRuler, Sparkles, Trees, Wrench }

const steps = [
  { n: '01', title: 'Call or write to us', text: 'Tell us what you want. It is free to ask.' },
  { n: '02', title: 'Get your quote', text: 'We look at your pool or yard and give you a clear price.' },
  { n: '03', title: 'We do the work', text: 'Our team builds or fixes your pool with care.' },
  { n: '04', title: 'Jump in!', text: 'Your pool is ready. Time to swim and have fun.' },
]

export default function Services() {
  const offered = services.filter((s) => s.offered)
  return (
    <section id="services" className="relative bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Services"
          title="Everything your pool needs."
          text="From a brand new pool to a quick fix, we can help. Here is what we do."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {offered.map((s, i) => {
            const Icon = icons[s.icon] ?? Wrench
            return (
              <Reveal key={s.id} delay={(i % 2) * 120}>
                <article className="group relative h-full overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-brand-200 sm:p-10">
                  <div className="absolute -top-16 -right-16 size-48 rounded-full bg-brand-50 transition duration-500 group-hover:scale-125" aria-hidden />
                  <div className="relative">
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-lg shadow-brand-600/30">
                      <Icon className="size-7" aria-hidden />
                    </div>
                    <h3 className="mt-6 text-2xl font-bold">{s.title}</h3>
                    <p className="mt-3 text-lg leading-relaxed text-slate-600">{s.text}</p>
                    <ul className="mt-6 space-y-2">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-center gap-3 text-slate-700">
                          <span className="flex size-6 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                            <Check className="size-4" aria-hidden />
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>

        {/* How it works */}
        <div className="mt-24 overflow-hidden rounded-3xl bg-brand-900 px-6 py-14 sm:px-12">
          <SectionHeading light eyebrow="How It Works" title="Four easy steps." />
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 100} className="relative">
                <p className="font-display text-5xl font-extrabold text-brand-400/40">{s.n}</p>
                <h3 className="mt-2 text-xl font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-brand-100">{s.text}</p>
              </Reveal>
            ))}
          </ol>
          <div className="mt-12 text-center">
            <QuoteButton size="lg" className="bg-white !text-brand-800 hover:!bg-brand-50" />
          </div>
        </div>
      </div>
    </section>
  )
}
