import { useState } from 'react'
import { CheckCircle2, Clock, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react'
import { company, fullAddress, SHOW_PLACEHOLDER_NOTES } from '../data/company'
import { Reveal, SectionHeading } from './ui'

/*
 * HOW THE FORM WORKS
 * Set VITE_FORM_ENDPOINT in a .env file (see .env.example), for example a
 * free Formspree form URL. The form sends a JSON POST to that address.
 * If no endpoint is set, the form tells the visitor to call instead, so
 * no message is ever lost without them knowing.
 */
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT

const projectTypes = ['New pool', 'Pool remodel', 'Pool repair', 'Pool deck', 'Something else']

const input =
  'block w-full rounded-xl border-0 bg-slate-50 px-4 py-3.5 text-base text-slate-900 ring-1 ring-slate-200 transition placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error | offline
  const [errors, setErrors] = useState({})

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    if (data.company_website) return // spam trap filled in by bots

    const errs = {}
    if (!data.name?.trim()) errs.name = 'Please add your name.'
    if (!/^[\d\s()+.-]{7,}$/.test(data.phone ?? '')) errs.phone = 'Please add a phone number we can call.'
    if (!/^\S+@\S+\.\S+$/.test(data.email ?? '')) errs.email = 'Please add a real email address.'
    if (!data.details?.trim()) errs.details = 'Please tell us a little about your project.'
    setErrors(errs)
    if (Object.keys(errs).length) return

    if (!ENDPOINT) {
      setStatus('offline')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _subject: `New quote request from ${data.name}` }),
      })
      if (!res.ok) throw new Error('Bad response')
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const err = (k) => errors[k] && <p className="mt-1.5 text-sm text-red-600">{errors[k]}</p>

  return (
    <section id="contact" className="relative overflow-hidden bg-brand-950 py-24 sm:py-32">
      <div className="absolute inset-0 opacity-30" aria-hidden style={{ background: 'radial-gradient(60rem 30rem at 10% 0%, #1d65eb 0%, transparent 60%), radial-gradient(40rem 30rem at 100% 100%, #38bdf8 0%, transparent 60%)' }} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading light eyebrow="Contact Us" title="Get your free estimate." text="Fill out the form or give us a call. Tell us about your pool, and we will get back to you." />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          {/* Info */}
          <Reveal className="space-y-6">
            <a href={company.phoneHref} className="group flex items-center gap-5 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:bg-white/10">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg"><Phone className="size-7" aria-hidden /></span>
              <span>
                <span className="block text-sm text-brand-200">Call us</span>
                <span className="block font-display text-2xl font-bold text-white group-hover:text-aqua">{company.phone}</span>
              </span>
            </a>

            {company.email && (
              <a href={`mailto:${company.email}`} className="flex items-center gap-5 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:bg-white/10">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white"><Mail className="size-7" aria-hidden /></span>
                <span>
                  <span className="block text-sm text-brand-200">Email us</span>
                  <span className="block text-lg font-semibold text-white">{company.email}</span>
                </span>
              </a>
            )}

            <div className="flex items-center gap-5 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white"><MapPin className="size-7" aria-hidden /></span>
              <span>
                <span className="block text-sm text-brand-200">Our office</span>
                <span className="block text-lg font-semibold text-white">{fullAddress}</span>
              </span>
            </div>

            {(SHOW_PLACEHOLDER_NOTES || !company.hours.startsWith('PLACEHOLDER')) && (
              <div className="flex items-center gap-5 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white"><Clock className="size-7" aria-hidden /></span>
                <span>
                  <span className="block text-sm text-brand-200">Hours</span>
                  <span className={`block font-semibold ${company.hours.startsWith('PLACEHOLDER') ? 'text-amber-300' : 'text-lg text-white'}`}>{company.hours}</span>
                </span>
              </div>
            )}

            <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
              <p className="font-display text-lg font-bold text-white">Where we work</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {company.serviceAreas.map((a) => (
                  <li key={a} className="rounded-full bg-brand-600/30 px-4 py-2 text-sm font-medium text-white ring-1 ring-brand-400/40">{a}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={120}>
            <div className="rounded-3xl bg-white p-6 shadow-2xl sm:p-10">
              {status === 'sent' ? (
                <div className="flex min-h-[28rem] flex-col items-center justify-center text-center" role="status">
                  <CheckCircle2 className="size-16 text-green-500" aria-hidden />
                  <h3 className="mt-4 text-2xl font-bold">Thank you!</h3>
                  <p className="mt-2 max-w-sm text-lg text-slate-600">We got your message. We will reach out to you soon.</p>
                  <button className="mt-6 font-semibold text-brand-700 hover:underline" onClick={() => setStatus('idle')}>Send another message</button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-5">
                  <h3 className="text-2xl font-bold">Tell us about your project</h3>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-slate-800">Your name</label>
                      <input id="name" name="name" autoComplete="name" className={input} placeholder="Jane Smith" aria-invalid={!!errors.name} />
                      {err('name')}
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-slate-800">Phone number</label>
                      <input id="phone" name="phone" type="tel" autoComplete="tel" className={input} placeholder="(301) 555-0123" aria-invalid={!!errors.phone} />
                      {err('phone')}
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-slate-800">Email</label>
                      <input id="email" name="email" type="email" autoComplete="email" className={input} placeholder="you@email.com" aria-invalid={!!errors.email} />
                      {err('email')}
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="type" className="mb-1.5 block text-sm font-semibold text-slate-800">What do you need?</label>
                      <select id="type" name="type" className={input} defaultValue={projectTypes[0]}>
                        {projectTypes.map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="details" className="mb-1.5 block text-sm font-semibold text-slate-800">Project details</label>
                      <textarea id="details" name="details" rows={5} className={input} placeholder="Tell us about your pool or your plans. Where is it? What would you like done?" aria-invalid={!!errors.details} />
                      {err('details')}
                    </div>
                    {/* Hidden spam trap */}
                    <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                  </div>

                  {status === 'offline' && (
                    <div className="rounded-xl bg-amber-50 p-4 text-amber-900 ring-1 ring-amber-200" role="alert">
                      Our online form is not turned on yet. Please call us at{' '}
                      <a href={company.phoneHref} className="font-bold underline">{company.phone}</a> and we will be glad to help.
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="rounded-xl bg-red-50 p-4 text-red-800 ring-1 ring-red-200" role="alert">
                      Sorry, something went wrong. Please try again, or call us at{' '}
                      <a href={company.phoneHref} className="font-bold underline">{company.phone}</a>.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-700 disabled:opacity-60"
                  >
                    {status === 'sending' ? <Loader2 className="size-5 animate-spin" aria-hidden /> : <Send className="size-5" aria-hidden />}
                    {status === 'sending' ? 'Sending...' : 'Get My Free Estimate'}
                  </button>
                  <p className="text-center text-sm text-slate-500">It's free. No pressure. We will never share your info.</p>
                </form>
              )}
            </div>
          </Reveal>
        </div>

        {/* Map */}
        <Reveal className="mt-10">
          <div className="overflow-hidden rounded-3xl ring-1 ring-white/10">
            <iframe
              title={`Map to ${company.name}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(`${company.name}, ${fullAddress}`)}&output=embed`}
              className="img-fallback h-80 w-full border-0 sm:h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <p className="mt-4 text-center">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${company.name}, ${fullAddress}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-brand-200 hover:text-white"
            >
              <MapPin className="size-4" aria-hidden /> Open in Google Maps
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
