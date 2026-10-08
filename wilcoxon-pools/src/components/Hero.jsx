import { BadgeCheck, Building2, MapPin } from 'lucide-react'
import { company, heroImage, yearsInBusiness } from '../data/company'
import { CallButton, QuoteButton, SafeImage } from './ui'

export default function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-brand-950">
      <SafeImage
        src={heroImage}
        alt="A luxury backyard swimming pool with clear blue water"
        className="hero-zoom absolute inset-0 -z-20 size-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950/90 via-brand-900/70 to-brand-900/20" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-brand-950/60 to-transparent" />

      <div className="mx-auto flex w-full max-w-7xl flex-1 items-center px-4 pt-28 pb-12 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="fade-up inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur">
            <MapPin className="size-4 text-aqua" aria-hidden />
            Rockville, MD · Building pools since {company.since}
          </p>
          <h1 className="fade-up mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl" style={{ animationDelay: '120ms' }}>
            Your Dream Pool <span className="bg-gradient-to-r from-aqua to-brand-300 bg-clip-text text-transparent">Starts Here.</span>
          </h1>
          <p className="fade-up mt-6 max-w-xl text-lg leading-relaxed text-brand-50 sm:text-xl" style={{ animationDelay: '240ms' }}>
            We build, fix, and remodel swimming pools. We work on pools for homes and businesses. Our team does the job right, so you can relax and enjoy the water.
          </p>
          <div className="fade-up mt-10 flex flex-col gap-4 sm:flex-row" style={{ animationDelay: '360ms' }}>
            <QuoteButton size="lg">Get a Free Quote</QuoteButton>
            <CallButton size="lg" />
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-t-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur-md sm:grid-cols-3">
            {[
              { icon: BadgeCheck, big: `${yearsInBusiness}+ Years`, small: 'Of pool work' },
              { icon: Building2, big: 'Homes & Businesses', small: 'We do both' },
              { icon: MapPin, big: 'MD · VA · DC', small: 'Plus WV and DE' },
            ].map(({ icon: Icon, big, small }) => (
              <div key={big} className="flex items-center gap-3 bg-brand-950/40 px-5 py-4">
                <Icon className="size-7 shrink-0 text-aqua" aria-hidden />
                <div>
                  <p className="font-display font-bold text-white">{big}</p>
                  <p className="text-sm text-brand-200">{small}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
