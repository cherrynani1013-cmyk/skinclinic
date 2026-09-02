import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  Activity,
  ArrowRight,
  X,
  Sparkles,
  CalendarHeart,
  CheckCircle2,
} from 'lucide-react';
import { treatments, type Treatment, type TreatmentCategory } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';

const filters: ('All' | TreatmentCategory)[] = [
  'All',
  'Anti-Aging',
  'Acne & Scars',
  'Laser & Glow',
  'Hair Restoration',
];

export default function Treatments() {
  const [active, setActive] = useState<'All' | TreatmentCategory>('All');
  const [selected, setSelected] = useState<Treatment | null>(null);
  const { ref, visible } = useReveal<HTMLDivElement>();

  const filtered = useMemo(
    () =>
      active === 'All'
        ? treatments
        : treatments.filter((t) => t.category === active),
    [active]
  );

  return (
    <section id="treatments" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        {/* Heading */}
        <div
          ref={ref}
          className={`max-w-2xl ${visible ? 'animate-fade-up' : 'reveal-hidden'}`}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-champagne" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-champagne-dark">
              The Treatment Directory
            </span>
          </div>
          <h2 className="font-serif text-4xl leading-tight tracking-tight text-charcoal sm:text-5xl text-balance">
            A complete spectrum of
            <span className="italic text-sage-dark"> clinical skin care</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-charcoal-muted text-pretty">
            Every protocol is personalized. Browse by concern, then explore the
            details — downtime, expected results, and pricing — to find
            your starting point.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="mt-10 flex flex-wrap gap-2.5">
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
            <button
              key={t.id}
              onClick={() => setSelected(t)}
              className="group glass animate-fade-up overflow-hidden rounded-3xl text-left shadow-glass transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glass-hover cursor-pointer"
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
            </button>
          ))}
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <TreatmentModal treatment={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

function TreatmentModal({
  treatment,
  onClose,
}: {
  treatment: Treatment;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-charcoal/40 backdrop-blur-sm animate-fade-in sm:items-center"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-2xl animate-slide-up overflow-y-auto rounded-t-[2rem] bg-alabaster shadow-ambient-lg sm:rounded-[2rem]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image header */}
        <div className="relative h-60 overflow-hidden sm:h-72">
          <img
            src={treatment.image}
            alt={treatment.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-charcoal backdrop-blur transition-transform hover:scale-110"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <div className="absolute bottom-5 left-6 right-6">
            <span className="rounded-full bg-white/85 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-charcoal backdrop-blur">
              {treatment.category}
            </span>
            <h3 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">
              {treatment.title}
            </h3>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          <p className="text-base leading-relaxed text-charcoal-muted">
            {treatment.summary}
          </p>

          {/* quick facts */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Clock, label: 'Duration', value: treatment.duration },
              { icon: Activity, label: 'Downtime', value: treatment.downtime },
              { icon: Sparkles, label: 'Sessions', value: treatment.sessions },
              { icon: CheckCircle2, label: 'From', value: treatment.price },
            ].map((f) => (
              <div
                key={f.label}
                className="rounded-2xl border border-charcoal/8 bg-white px-4 py-3.5"
              >
                <f.icon className="h-4 w-4 text-sage" strokeWidth={1.5} />
                <div className="mt-2 text-[11px] font-medium uppercase tracking-wider text-charcoal-muted">
                  {f.label}
                </div>
                <div className="text-sm font-semibold text-charcoal">
                  {f.value}
                </div>
              </div>
            ))}
          </div>

          {/* detail blocks */}
          <div className="mt-6 space-y-5">
            <DetailBlock title="How It Works" body={treatment.howItWorks} />
            <DetailBlock title="Expected Results" body={treatment.expectedResults} />
            <DetailBlock
              title="Downtime"
              body={`Expect ${treatment.downtime.toLowerCase()} of recovery. You'll receive a personalized aftercare kit and a day-by-day guide so you know exactly what to expect.`}
            />
          </div>

          {/* CTA */}
          <Link
            to={`/treatments/${treatment.slug}`}
            onClick={onClose}
            className="mb-3 flex w-full items-center justify-center gap-2 rounded-full border border-charcoal/15 px-6 py-3.5 text-base font-semibold text-charcoal transition-all hover:bg-white hover:shadow-glass"
          >
            View Full Details
          </Link>
          <Link
            to="/booking"
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-sage px-6 py-4 text-base font-semibold text-white shadow-ambient transition-all duration-300 hover:bg-sage-dark hover:shadow-ambient-lg"
          >
            <CalendarHeart className="h-5 w-5" strokeWidth={1.5} />
            Book This Treatment
          </Link>
        </div>
      </div>
    </div>
  );
}

function DetailBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-charcoal/8 bg-white/60 p-5 backdrop-blur">
      <h4 className="font-serif text-lg font-semibold text-charcoal">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-charcoal-muted">{body}</p>
    </div>
  );
}
