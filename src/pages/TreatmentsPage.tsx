import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  Activity,
  ArrowRight,
  CalendarHeart,
} from 'lucide-react';
import {
  treatments,
  type TreatmentCategory,
} from '@/data/content';
import { useReveal } from '@/hooks/useReveal';
import Reveal from '@/components/Reveal';
import PageHeader from '@/components/PageHeader';

const filters: ('All' | TreatmentCategory)[] = [
  'All',
  'Anti-Aging',
  'Acne & Scars',
  'Laser & Glow',
  'Hair Restoration',
];

export default function TreatmentsPage() {
  const [active, setActive] = useState<'All' | TreatmentCategory>('All');
  const { ref, visible } = useReveal<HTMLDivElement>();

  const filtered = useMemo(
    () =>
      active === 'All'
        ? treatments
        : treatments.filter((t) => t.category === active),
    [active]
  );

  return (
    <>
      <PageHeader
        eyebrow="The Treatment Directory"
        title={
          <>
            A complete spectrum of
            <span className="italic text-sage-dark"> clinical skin care</span>
          </>
        }
        subtitle="Every protocol is personalized. Browse by concern, then click through to a full detail page with how-it-works, downtime, expected results, and pricing."
      />

      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          {/* Filter tabs */}
          <div ref={ref} className={`flex flex-wrap gap-2.5 ${visible ? 'animate-fade-up' : 'reveal-hidden'}`}>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  active === f
                    ? 'bg-charcoal text-white shadow-ambient'
                    : 'border border-charcoal/10 bg-white/50 text-charcoal-soft backdrop-blur hover:border-charcoal/25 hover:bg-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t, i) => (
              <Link
                key={t.id}
                to={`/treatments/${t.slug}`}
                className="group glass animate-fade-up overflow-hidden rounded-3xl shadow-glass transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glass-hover"
                style={{ animationDelay: `${0.06 * i}s` }}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={t.image}
                    alt={t.title}
                    className="image-zoom h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/10 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-charcoal backdrop-blur">
                    {t.category}
                  </span>
                  <span className="absolute right-4 top-4 rounded-full bg-charcoal/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                    {t.price}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-semibold leading-tight text-charcoal">
                    {t.title}
                  </h3>
                  <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-charcoal-muted">
                    {t.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-charcoal-soft">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-sage" strokeWidth={2} />
                      {t.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Activity className="h-3.5 w-3.5 text-champagne-dark" strokeWidth={2} />
                      {t.downtime} downtime
                    </span>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-charcoal/8 pt-4">
                    <span className="text-sm font-semibold text-charcoal">
                      Learn More
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage/10 text-sage-dark transition-all duration-300 group-hover:bg-sage group-hover:text-white">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <Reveal animation="animate-reveal-up">
            <div className="mt-14 flex flex-col items-center gap-4 rounded-3xl bg-charcoal px-6 py-12 text-center">
              <h2 className="font-serif text-3xl font-semibold text-white sm:text-4xl text-balance">
                Not sure which treatment is right for you?
              </h2>
              <p className="max-w-lg text-white/60">
                Book a free 30-minute consultation. We&rsquo;ll assess your skin
                and recommend a personalized plan.
              </p>
              <Link
                to="/booking"
                className="mt-2 inline-flex items-center gap-2 rounded-full bg-sage px-7 py-4 text-base font-semibold text-white shadow-ambient transition-all hover:bg-sage-light hover:shadow-ambient-lg"
              >
                <CalendarHeart className="h-5 w-5" strokeWidth={1.5} />
                Book Free Consultation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
