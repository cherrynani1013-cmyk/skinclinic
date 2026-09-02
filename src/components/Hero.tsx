import { CalendarHeart, ArrowRight, Star, ShieldCheck, Award, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const headlineLines = [
  ['Advanced', 'Clinical'],
  ['Dermatology.'],
];

const stats = [
  { n: '12,000+', l: 'Treatments delivered' },
  { n: '98%', l: 'Patient satisfaction' },
  { n: '15+', l: 'Advanced laser systems' },
  { n: '4.9★', l: 'Average rating' },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-16 sm:pt-40 lg:pb-28"
    >
      {/* Ambient drifting background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-32 -top-32 h-[460px] w-[460px] rounded-full bg-sage-100 blur-3xl opacity-60 animate-drift-slow" />
        <div className="absolute -left-24 top-1/3 h-96 w-96 rounded-full bg-champagne-50 blur-3xl opacity-70 animate-drift-slower" />
        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-sage-50 blur-3xl opacity-50 animate-drift-slow" style={{ animationDelay: '4s' }} />
      </div>

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Left: copy */}
          <div>
            {/* Eyebrow badge */}
            <div
              className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-charcoal/10 bg-white/60 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-charcoal-muted backdrop-blur"
              style={{ animationDelay: '0.1s' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-champagne" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-champagne" />
              </span>
              Luxury Clinical Dermatology
            </div>

            {/* Headline with word-by-word rise */}
            <h1 className="font-serif text-[2.75rem] leading-[1.04] tracking-tight text-charcoal sm:text-6xl lg:text-[4.25rem] text-balance">
              {headlineLines.map((line, li) => (
                <span key={li} className="block">
                  {line.map((word, wi) => (
                    <span
                      key={wi}
                      className="inline-block animate-word-rise"
                      style={{ animationDelay: `${0.25 + li * 0.15 + wi * 0.08}s` }}
                    >
                      {word}
                      {wi < line.length - 1 ? '\u00A0' : ''}
                    </span>
                  ))}
                </span>
              ))}
              <span
                className="block italic animate-word-rise"
                style={{ animationDelay: '0.6s' }}
              >
                <span className="shimmer-text animate-shimmer-text">Tailored to Your Skin.</span>
              </span>
            </h1>

            {/* Description */}
            <p
              className="animate-fade-up mt-7 max-w-xl text-lg leading-relaxed text-charcoal-muted text-pretty"
              style={{ animationDelay: '0.7s' }}
            >
              Board-certified expertise meets state-of-the-art laser science. We
              craft precise, personalized treatment plans that reveal your
              healthiest skin — naturally, never overdone.
            </p>

            {/* CTAs */}
            <div
              className="animate-fade-up mt-9 flex flex-wrap items-center gap-3.5"
              style={{ animationDelay: '0.8s' }}
            >
              <Link
                to="/booking"
                className="group inline-flex items-center gap-2 rounded-full bg-sage px-7 py-4 text-base font-semibold text-white shadow-ambient transition-all duration-300 hover:bg-sage-dark hover:shadow-ambient-lg hover:scale-[1.02]"
              >
                <CalendarHeart className="h-5 w-5" strokeWidth={1.5} />
                Schedule Appointment
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/treatments"
                className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-white/50 px-7 py-4 text-base font-semibold text-charcoal backdrop-blur transition-all duration-300 hover:border-charcoal/30 hover:bg-white hover:shadow-glass"
              >
                Explore Treatments
              </Link>
            </div>

            {/* Trust row */}
            <div
              className="animate-fade-up mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-charcoal-muted"
              style={{ animationDelay: '0.95s' }}
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-sage" strokeWidth={1.5} />
                Board-certified dermatologists
              </span>
              <span className="hidden h-4 w-px bg-charcoal/10 sm:block" />
              <span className="flex items-center gap-2">
                <Award className="h-4 w-4 text-sage" strokeWidth={1.5} />
                FDA-cleared technology
              </span>
            </div>
          </div>

          {/* Right: floating image frame with badges */}
          <div className="relative lg:pl-6">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative offset frame */}
              <div
                className="animate-scale-in absolute -inset-3 rounded-[2.5rem] border border-champagne/20"
                style={{ animationDelay: '0.3s' }}
              />

              {/* Main image with Ken Burns reveal */}
              <div className="group relative overflow-hidden rounded-[2rem] shadow-ambient-lg">
                <img
                  src="/images/hero-main.jpg"
                  alt="Patient with radiant, healthy skin at Lumière dermatology clinic"
                  className="animate-hero-img h-[520px] w-full object-cover sm:h-[600px]"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" />
                {/* gold frame */}
                <div className="pointer-events-none absolute inset-3 rounded-[1.5rem] border border-white/30" />
              </div>

              {/* Floating stat badge — left */}
              <div
                className="absolute -left-3 top-10 animate-badge-in-left sm:-left-6"
                style={{ animationDelay: '0.9s' }}
              >
                <div className="glass animate-float flex items-center gap-3 rounded-2xl px-4 py-3 shadow-glass" style={{ animationDelay: '1.5s' }}>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage/15 text-sage-dark">
                    <Award className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold text-charcoal">
                      10+ Yrs Experience
                    </span>
                    <span className="text-xs text-charcoal-muted">
                      Board-certified
                    </span>
                  </span>
                </div>
              </div>

              {/* Floating stat badge — right */}
              <div
                className="absolute -right-3 top-1/3 animate-badge-in-right sm:-right-6"
                style={{ animationDelay: '1.1s' }}
              >
                <div className="glass animate-float flex items-center gap-3 rounded-2xl px-4 py-3 shadow-glass" style={{ animationDelay: '2s' }}>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-champagne/15 text-champagne-dark">
                    <ShieldCheck className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold text-charcoal">
                      FDA Approved
                    </span>
                    <span className="text-xs text-charcoal-muted">
                      All devices
                    </span>
                  </span>
                </div>
              </div>

              {/* Floating stat badge — bottom */}
              <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 animate-badge-in-bottom"
                style={{ animationDelay: '1.3s' }}
              >
                <div className="glass animate-float flex items-center gap-3 rounded-2xl px-5 py-3.5 shadow-glass" style={{ animationDelay: '2.5s' }}>
                  <span className="flex items-center gap-1 text-champagne-dark">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold text-charcoal">
                      4.9 ★ (500+ Reviews)
                    </span>
                    <span className="text-xs text-charcoal-muted">
                      Verified patients
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stat strip */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:mt-20">
          {stats.map((s, i) => (
            <div
              key={s.l}
              className="animate-fade-up group rounded-2xl border border-charcoal/8 bg-white/60 px-5 py-5 text-center backdrop-blur transition-all duration-300 hover:border-sage/20 hover:shadow-glass sm:text-left"
              style={{ animationDelay: `${0.1 * i + 1.1}s` }}
            >
              <div className="font-serif text-3xl font-semibold text-charcoal sm:text-4xl">
                {s.n}
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-charcoal-muted">
                {s.l}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="mt-12 flex justify-center">
          <div className="flex flex-col items-center gap-2 text-charcoal-muted">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em]">Scroll to explore</span>
            <div className="flex h-9 w-5 items-start justify-center rounded-full border border-charcoal/20 pt-1.5">
              <span className="h-2 w-0.5 rounded-full bg-champagne animate-scroll-hint" />
            </div>
            <ChevronDown className="h-3 w-3 animate-scroll-hint" />
          </div>
        </div>
      </div>
    </section>
  );
}
