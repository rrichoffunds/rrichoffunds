import { Phone } from 'lucide-react'
import { company, fullAddress, services } from '../data/company'
import { Logo } from './Header'
import { CallButton, QuoteButton } from './ui'

export function CTABand() {
  return (
    <section className="relative overflow-hidden bg-brand-700">
      <svg className="wave-move absolute -bottom-2 left-0 h-24 w-[200%] text-brand-600/50" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden>
        <path fill="currentColor" d="M0 50 Q 180 0 360 50 T 720 50 T 1080 50 T 1440 50 V100 H0Z" />
      </svg>
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-20 text-center sm:px-6 lg:flex-row lg:justify-between lg:text-left lg:px-8">
        <div>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Ready for a pool you will love?</h2>
          <p className="mt-3 text-lg text-brand-100">Get a free estimate today. It only takes a minute.</p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <QuoteButton size="lg" className="bg-white !text-brand-800 hover:!bg-brand-50" />
          <CallButton size="lg" />
        </div>
      </div>
    </section>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-brand-950 pb-28 text-brand-200 lg:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <Logo light />
          <p className="mt-4 text-sm leading-relaxed">Building, fixing, and remodeling pools for homes and businesses since {company.since}.</p>
        </div>
        <div>
          <p className="font-display font-bold text-white">Services</p>
          <ul className="mt-4 space-y-2 text-sm">
            {services.filter((s) => s.offered).map((s) => (
              <li key={s.id}><a href="#services" className="hover:text-white">{s.title}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-display font-bold text-white">Where We Work</p>
          <ul className="mt-4 space-y-2 text-sm">
            {company.serviceAreas.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </div>
        <div>
          <p className="font-display font-bold text-white">Contact</p>
          <address className="mt-4 space-y-2 text-sm not-italic">
            <a href={company.phoneHref} className="flex items-center gap-2 font-semibold text-white hover:text-aqua"><Phone className="size-4" aria-hidden />{company.phone}</a>
            <p>{fullAddress}</p>
            {company.email && <a href={`mailto:${company.email}`} className="block hover:text-white">{company.email}</a>}
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs sm:flex-row sm:px-6 lg:px-8">
          <p>© {year} {company.legalName}. All rights reserved.</p>
          <a href="#top" className="hover:text-white">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}

// Sticky bar on phones and tablets so "Call Now" is always one tap away.
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur lg:hidden">
      <a href={company.phoneHref} className="flex items-center justify-center gap-2 rounded-full bg-green-600 py-3.5 font-semibold text-white active:scale-95">
        <Phone className="size-5" aria-hidden /> Call Now
      </a>
      <a href="#contact" className="flex items-center justify-center rounded-full bg-brand-600 py-3.5 font-semibold text-white active:scale-95">
        Free Estimate
      </a>
    </div>
  )
}
