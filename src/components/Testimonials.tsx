import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, BadgeCheck, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials, reviews } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';

export default function Testimonials({ embedded = false }: { embedded?: boolean }) {
  const [index, setIndex] = useState(0);
  const { ref, visible } = useReveal<HTMLDivElement>();

  const prev = () =>
    setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () =>
    setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  return (
    <section id="reviews" className={embedded ? 'relative py-4' : 'relative bg-cream/50 py-20 lg:py-28'}>
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        {!embedded && (
        <div
          ref={ref}
          className={`max-w-2xl ${visible ? 'animate-fade-up' : 'reveal-hidden'}`}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-champagne" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-champagne-dark">
              Patient Stories
            </span>
          </div>
          <h2 className="font-serif text-4xl leading-tight tracking-tight text-charcoal sm:text-5xl text-balance">
            Real people.
            <span className="italic text-sage-dark"> Real results.</span>
          </h2>
        </div>
        )}

        {/* Video reel carousel */}
        <div className={embedded ? '' : 'mt-12'}>
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-serif text-2xl font-semibold text-charcoal">
              Video testimonials
            </h3>
            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="Previous"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/10 bg-white text-charcoal transition-all hover:border-charcoal/25 hover:shadow-glass"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                aria-label="Next"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/10 bg-white text-charcoal transition-all hover:border-charcoal/25 hover:shadow-glass"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-6 overflow-hidden">
            <div
              className="flex gap-4 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${index * (280 + 16)}px)` }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={t.id}
                  className="relative h-[420px] w-[280px] shrink-0 overflow-hidden rounded-3xl bg-charcoal shadow-ambient transition-opacity duration-500 sm:w-[320px]"
                  style={{ opacity: i === index ? 1 : 0.5 }}
                >
                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-charcoal/20" />
                  <button
                    aria-label="Play video"
                    className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-charcoal shadow-ambient transition-transform hover:scale-110"
                  >
                    <Play className="h-7 w-7 fill-current" />
                  </button>
                  <div className="absolute bottom-5 left-5 right-5">
                    <span className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                      {t.procedure}
                    </span>
                    <p className="mt-3 font-serif text-lg italic leading-snug text-white">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">
                        {t.name}
                      </span>
                      <span className="text-xs text-white/70">
                        {t.duration}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Google reviews */}
        <div className="mt-16 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Rating summary card */}
          <div className="flex flex-col justify-center rounded-3xl bg-white p-8 shadow-glass">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-ambient">
                <GoogleG />
              </span>
              <div>
                <div className="text-sm font-semibold text-charcoal">
                  Google Reviews
                </div>
                <div className="text-xs text-charcoal-muted">
                  Verified by Google
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-end gap-3">
              <span className="font-serif text-6xl font-semibold text-charcoal">
                4.9
              </span>
              <div className="mb-2 flex flex-col">
                <div className="flex gap-0.5 text-champagne">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="mt-1 text-xs text-charcoal-muted">
                  500+ reviews
                </span>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-charcoal-muted">
              We are proud to be one of the highest-rated dermatology clinics in
              the region, with verified reviews from real, treated patients.
            </p>
            <Link
              to="/booking"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-sage px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-sage-dark hover:shadow-ambient"
            >
              Book your visit
            </Link>
          </div>

          {/* Review cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {reviews.map((r, i) => (
              <div
                key={r.id}
                className="animate-fade-up rounded-3xl border border-charcoal/8 bg-white/70 p-5 backdrop-blur transition-shadow hover:shadow-glass"
                style={{ animationDelay: `${0.08 * i}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5 text-champagne">
                    {[...Array(r.rating)].map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-sage-dark">
                    <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2} />
                    Verified
                  </span>
                </div>
                <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-charcoal-soft">
                  <Quote className="mr-1 inline h-3.5 w-3.5 text-champagne/60" />
                  {r.text}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-charcoal/8 pt-3">
                  <div>
                    <div className="text-sm font-semibold text-charcoal">
                      {r.name}
                    </div>
                    <div className="text-xs text-charcoal-muted">
                      {r.procedure}
                    </div>
                  </div>
                  <span className="text-xs text-charcoal-muted">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}
