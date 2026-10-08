import { CheckCircle2, HardHat, Handshake, ShieldCheck } from 'lucide-react'
import { aboutImage, company, yearsInBusiness } from '../data/company'
import { PlaceholderTag, QuoteButton, Reveal, SafeImage } from './ui'

const reasons = [
  { icon: HardHat, title: 'Lots of experience', text: `We have worked on pools since ${company.since}. That is over ${yearsInBusiness} years.` },
  { icon: ShieldCheck, title: 'Work that lasts', text: 'We use strong materials and careful work, so your pool stays nice for years.' },
  { icon: Handshake, title: 'Trusted by other pros', text: 'Other pool companies hire us for plaster, tile, and coping work.' },
]

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal className="relative">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-brand-900/20">
            <SafeImage src={aboutImage} alt="A modern home with a backyard pool" className="aspect-[4/5] w-full object-cover sm:aspect-[4/3] lg:aspect-[4/5]" loading="lazy" />
            <PlaceholderTag className="absolute top-4 left-4">Sample photo</PlaceholderTag>
          </div>
          <div className="absolute -right-4 -bottom-8 rounded-2xl bg-brand-800 p-6 text-white shadow-xl sm:-right-8">
            <p className="font-display text-5xl font-extrabold">{yearsInBusiness}+</p>
            <p className="mt-1 text-sm font-medium text-brand-200">Years of pool work</p>
          </div>
          <div className="absolute -top-6 -left-6 -z-10 size-40 rounded-full bg-brand-100 blur-2xl" aria-hidden />
        </Reveal>

        <div>
          <Reveal>
            <p className="text-sm font-semibold tracking-widest text-brand-600 uppercase">About Us</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">A pool team you can count on.</h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              {company.name} is a pool company in {company.city}, Maryland. We have been building and fixing pools since {company.since}.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              We work on pools at homes, swim clubs, and other businesses. We build new pools. We also fix and remodel old ones with new plaster, tile, coping, and decks.
            </p>
          </Reveal>

          <div className="mt-10 space-y-6">
            {reasons.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 100} className="flex gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                  <Icon className="size-6" aria-hidden />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{title}</h3>
                  <p className="mt-1 text-slate-600">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {company.memberships.length > 0 && (
            <Reveal className="mt-10 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-900">Proud member of:</p>
              <ul className="mt-2 space-y-1">
                {company.memberships.map((m) => (
                  <li key={m} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="size-4 text-brand-600" aria-hidden /> {m}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          <Reveal className="mt-10">
            <QuoteButton />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
