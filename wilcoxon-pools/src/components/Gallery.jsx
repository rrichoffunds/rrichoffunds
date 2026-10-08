import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, MoveHorizontal, X, ZoomIn } from 'lucide-react'
import { beforeAfter, gallery, SHOW_PLACEHOLDER_NOTES } from '../data/company'
import { PlaceholderTag, Reveal, SafeImage, SectionHeading } from './ui'

function Lightbox({ index, onClose, onMove }) {
  const item = gallery[index]
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onMove(1)
      if (e.key === 'ArrowLeft') onMove(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onMove])

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-950/95 p-4 backdrop-blur" role="dialog" aria-modal="true" aria-label={item.alt} onClick={onClose}>
      <button className="absolute top-4 right-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20" onClick={onClose} aria-label="Close">
        <X className="size-6" />
      </button>
      <button className="absolute left-2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:left-6" onClick={(e) => { e.stopPropagation(); onMove(-1) }} aria-label="Previous photo">
        <ChevronLeft className="size-6" />
      </button>
      <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <SafeImage src={item.src.replace('w=1200', 'w=1800')} alt={item.alt} className="max-h-[80vh] w-full rounded-2xl object-contain" />
        <figcaption className="mt-4 text-center text-brand-100">{item.alt}</figcaption>
      </figure>
      <button className="absolute right-2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:right-6" onClick={(e) => { e.stopPropagation(); onMove(1) }} aria-label="Next photo">
        <ChevronRight className="size-6" />
      </button>
    </div>
  )
}

function BeforeAfterSlider() {
  const [pos, setPos] = useState(50)
  const box = useRef(null)
  const dragging = useRef(false)

  const update = useCallback((clientX) => {
    const r = box.current.getBoundingClientRect()
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)))
  }, [])

  return (
    <div
      ref={box}
      className="relative aspect-[16/10] w-full cursor-ew-resize touch-pan-y overflow-hidden rounded-3xl shadow-2xl shadow-brand-900/20 select-none sm:aspect-[16/8]"
      onPointerDown={(e) => { dragging.current = true; update(e.clientX) }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerLeave={() => (dragging.current = false)}
    >
      <SafeImage src={beforeAfter.after} alt="After the work" className="absolute inset-0 size-full object-cover" loading="lazy" draggable="false" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <SafeImage src={beforeAfter.before} alt="Before the work" className="absolute inset-0 size-full object-cover grayscale-[40%] sepia-[25%]" loading="lazy" draggable="false" />
      </div>
      <span className="absolute top-4 left-4 rounded-full bg-slate-900/70 px-3 py-1 text-sm font-semibold text-white">Before</span>
      <span className="absolute top-4 right-4 rounded-full bg-brand-600 px-3 py-1 text-sm font-semibold text-white">After</span>
      <div className="absolute inset-y-0 w-1 -translate-x-1/2 bg-white shadow" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-800 shadow-lg">
          <MoveHorizontal className="size-6" aria-hidden />
        </div>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="sr-only"
        aria-label="Slide to compare before and after"
      />
    </div>
  )
}

export default function Gallery() {
  const [open, setOpen] = useState(null)
  const move = useCallback((d) => setOpen((i) => (i + d + gallery.length) % gallery.length), [])
  const close = useCallback(() => setOpen(null), [])
  const anyStock = gallery.some((g) => g.stock)

  return (
    <section id="work" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Our Work" title="Pools that make you smile." text="Take a look at the kind of pools we build and fix. Tap any photo to see it bigger." />
        {SHOW_PLACEHOLDER_NOTES && anyStock && (
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-amber-700">
            Note: These are sample photos. Swap them for real Wilcoxon project photos before launch.
          </p>
        )}

        <div className="mt-14 grid auto-rows-[220px] grid-cols-2 gap-4 md:auto-rows-[260px] md:grid-cols-4">
          {gallery.map((g, i) => {
            const span = [
              'col-span-2 row-span-2',
              'col-span-1 row-span-1',
              'col-span-1 row-span-1',
              'col-span-1 row-span-1 md:row-span-2',
              'col-span-1 row-span-1',
              'col-span-2 row-span-1',
            ][i % 6]
            return (
              <Reveal key={g.src} delay={(i % 3) * 80} className={span}>
                <button onClick={() => setOpen(i)} className="group relative block size-full overflow-hidden rounded-2xl bg-brand-100 focus-visible:outline-4 focus-visible:outline-brand-400">
                  <SafeImage src={g.src} alt={g.alt} className="size-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-950/0 to-transparent opacity-80 transition group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-800">{g.tag}</span>
                    <ZoomIn className="size-6 text-white opacity-0 transition group-hover:opacity-100" aria-hidden />
                  </div>
                  {g.stock && <PlaceholderTag className="absolute top-3 left-3">Sample</PlaceholderTag>}
                </button>
              </Reveal>
            )
          })}
        </div>

        <div className="mt-24">
          <SectionHeading eyebrow="Before & After" title="See the change." text="Drag the slider to see how a tired old pool can look brand new." />
          <Reveal className="mt-12">
            <BeforeAfterSlider />
            {beforeAfter.stock && SHOW_PLACEHOLDER_NOTES && (
              <p className="mt-4 text-center text-sm text-amber-700">{beforeAfter.caption}</p>
            )}
          </Reveal>
        </div>
      </div>
      {open !== null && <Lightbox index={open} onClose={close} onMove={move} />}
    </section>
  )
}
