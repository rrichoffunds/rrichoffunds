import { useEffect, useState } from 'react'
import { Menu, Phone, X } from 'lucide-react'
import { company } from '../data/company'

const links = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Our Work' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
]

export function Logo({ light }) {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label={`${company.name} home`}>
      <svg viewBox="0 0 64 64" className="size-10" aria-hidden>
        <rect width="64" height="64" rx="14" fill="#0b4a8b" />
        <path d="M10 38c6 0 6-4 11-4s5 4 11 4 6-4 11-4 5 4 11 4" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        <path d="M10 48c6 0 6-4 11-4s5 4 11 4 6-4 11-4 5 4 11 4" fill="none" stroke="#7cc4ff" strokeWidth="4" strokeLinecap="round" />
        <path d="M22 30V16m20 14V16M22 20h20M22 26h20" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
      <span className="leading-tight">
        <span className={`block font-display text-lg font-extrabold tracking-tight ${light ? 'text-white' : 'text-brand-900'}`}>Wilcoxon</span>
        <span className={`block text-[11px] font-semibold tracking-[0.2em] uppercase ${light ? 'text-brand-200' : 'text-brand-600'}`}>Construction</span>
      </span>
    </a>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const solid = scrolled || open

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${solid ? 'bg-white/95 shadow-md backdrop-blur' : 'bg-transparent'}`}>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo light={!solid} />

        <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`rounded-full px-4 py-2 text-[15px] font-medium transition ${solid ? 'text-slate-700 hover:bg-brand-50 hover:text-brand-700' : 'text-white/90 hover:bg-white/10 hover:text-white'}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href={company.phoneHref} className={`flex items-center gap-2 font-semibold ${solid ? 'text-brand-800' : 'text-white'}`}>
            <Phone className="size-4" aria-hidden /> {company.phone}
          </a>
          <a href="#contact" className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-brand-700">
            Free Estimate
          </a>
        </div>

        <button
          type="button"
          className={`lg:hidden rounded-lg p-2 ${solid ? 'text-brand-900' : 'text-white'}`}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="size-7" /> : <Menu className="size-7" />}
        </button>
      </div>

      <div id="mobile-menu" className={`lg:hidden overflow-hidden bg-white transition-[max-height] duration-300 ${open ? 'max-h-[100svh] border-t border-slate-100' : 'max-h-0'}`}>
        <nav className="flex flex-col px-4 py-4" aria-label="Mobile">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-lg font-medium text-slate-800 hover:bg-brand-50">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="mt-3 rounded-full bg-brand-600 px-5 py-3.5 text-center font-semibold text-white">
            Get a Free Estimate
          </a>
          <a href={company.phoneHref} className="mt-2 flex items-center justify-center gap-2 rounded-full border-2 border-brand-200 px-5 py-3 font-semibold text-brand-800">
            <Phone className="size-5" aria-hidden /> Call {company.phone}
          </a>
        </nav>
      </div>
    </header>
  )
}
