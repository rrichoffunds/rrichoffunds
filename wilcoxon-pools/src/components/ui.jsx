import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Phone } from 'lucide-react'
import { company, SHOW_PLACEHOLDER_NOTES } from '../data/company'

// Fades children in when they scroll into view.
export function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} className={`reveal ${shown ? 'is-visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  )
}

// Image that falls back to a water-blue gradient if it can't load.
export function SafeImage({ src, alt, className = '', ...rest }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <div role="img" aria-label={alt} className={`img-fallback ${className}`} />
  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} {...rest} />
}

export function SectionHeading({ eyebrow, title, text, light = false, center = true }) {
  return (
    <Reveal className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className={`text-sm font-semibold tracking-widest uppercase ${light ? 'text-brand-300' : 'text-brand-600'}`}>{eyebrow}</p>
      )}
      <h2 className={`mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${light ? 'text-white' : ''}`}>{title}</h2>
      {text && <p className={`mt-4 text-lg leading-relaxed ${light ? 'text-brand-100' : 'text-slate-600'}`}>{text}</p>}
    </Reveal>
  )
}

export function QuoteButton({ children = 'Get a Free Estimate', size = 'md', className = '' }) {
  const sizes = { md: 'px-6 py-3 text-base', lg: 'px-8 py-4 text-lg' }
  return (
    <a
      href="#contact"
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 ${sizes[size]} ${className}`}
    >
      {children}
      <ArrowRight className="size-5 transition group-hover:translate-x-1" aria-hidden />
    </a>
  )
}

export function CallButton({ variant = 'outline', size = 'md', className = '' }) {
  const sizes = { md: 'px-6 py-3 text-base', lg: 'px-8 py-4 text-lg' }
  const variants = {
    outline: 'border-2 border-white/70 text-white hover:bg-white hover:text-brand-900',
    light: 'bg-white text-brand-800 hover:bg-brand-50 shadow-lg',
    ghost: 'border-2 border-brand-200 text-brand-800 hover:border-brand-600 hover:bg-brand-50',
  }
  return (
    <a
      href={company.phoneHref}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition hover:-translate-y-0.5 ${sizes[size]} ${variants[variant]} ${className}`}
    >
      <Phone className="size-5" aria-hidden />
      Call {company.phone}
    </a>
  )
}

// Small tag that marks stock photos or missing info. Hidden when notes are off.
export function PlaceholderTag({ children = 'Sample photo', className = '' }) {
  if (!SHOW_PLACEHOLDER_NOTES) return null
  return (
    <span className={`inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800 ring-1 ring-amber-300 ${className}`}>
      {children}
    </span>
  )
}
