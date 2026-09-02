import { useParams, Link, Navigate } from 'react-router-dom';
import {
  Clock,
  Activity,
  Sparkles,
  CheckCircle2,
  CalendarHeart,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { getTreatmentBySlug, treatments } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';
import Reveal from '@/components/Reveal';

export default function TreatmentDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const treatment = slug ? getTreatmentBySlug(slug) : undefined;
  const { ref, visible } = useReveal<HTMLDivElement>();

  if (!treatment) {
    return <Navigate to="/treatments" replace />;
  }

  const related = treatments
    .filter((t) => t.category === treatment.category && t.id !== treatment.id)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 sm:pt-36">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Link
            to="/treatments"
            className="inline-flex items-center gap-2 text-sm font-medium text-charcoal-muted transition-colors hover:text-charcoal"
          >
            <ArrowLeft className="h-4 w-4" />
            All treatments
          </Link>

          <div className="mt-6 grid items-center gap-8 lg:grid-cols-2">
            <div className="animate-fade-up">
              <span className="rounded-full bg-sage-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-sage-dark">
                {treatment.category}
              </span>
              <h1 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight text-charcoal sm:text-5xl text-balance">
                {treatment.title}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-charcoal-muted text-pretty">
                {treatment.summary}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3.5 text-base font-semibold text-white shadow-ambient transition-all hover:bg-sage-dark hover:shadow-ambient-lg"
                >
                  <CalendarHeart className="h-5 w-5" strokeWidth={1.5} />
                  Book This Treatment
                </Link>
                <span className="rounded-full bg-charcoal/5 px-4 py-3.5 text-sm font-semibold text-charcoal">
                  {treatment.price}
                </span>
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="overflow-hidden rounded-[2rem] shadow-ambient-lg">
                <img
                  src={treatment.image}
                  alt={treatment.title}
                  className="h-[380px] w-full object-cover sm:h-[460px]"
                />
              </div>
              <div className="pointer-events-none absolute inset-3 rounded-[1.5rem] border border-white/30" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick facts */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Clock, label: 'Duration', value: treatment.duration },
              { icon: Activity, label: 'Downtime', value: treatment.downtime },
              { icon: Sparkles, label: 'Sessions', value: treatment.sessions },
              { icon: CheckCircle2, label: 'Starting at', value: treatment.price },
            ].map((f, i) => (
              <Reveal
                key={f.label}
                animation="animate-scale-fade"
                delay={i * 0.08}
                className="rounded-2xl border border-charcoal/8 bg-white px-5 py-5 text-center sm:text-left"
              >
                <f.icon className="h-5 w-5 text-sage" strokeWidth={1.5} />
                <div className="mt-2 text-[11px] font-medium uppercase tracking-wider text-charcoal-muted">
                  {f.label}
                </div>
                <div className="mt-0.5 text-sm font-semibold text-charcoal">
                  {f.value}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div ref={ref} className={`space-y-6 ${visible ? 'animate-fade-up' : 'reveal-hidden'}`}>
            <DetailBlock title="How It Works" body={treatment.howItWorks} />
            <DetailBlock title="Expected Results" body={treatment.expectedResults} />
            <DetailBlock
              title="Downtime & Recovery"
              body={`Expect ${treatment.downtime.toLowerCase()} of recovery. You'll receive a personalized aftercare kit and a day-by-day guide so you know exactly what to expect at every stage.`}
            />
          </div>

          <Reveal animation="animate-reveal-up">
            <div className="mt-10 rounded-3xl bg-charcoal p-8 text-center">
              <h3 className="font-serif text-2xl font-semibold text-white">
                Ready to begin?
              </h3>
              <p className="mt-2 text-sm text-white/60">
                Book your free consultation with a Lumière specialist today.
              </p>
              <Link
                to="/booking"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3.5 text-base font-semibold text-white shadow-ambient transition-all hover:bg-sage-light"
              >
                <CalendarHeart className="h-5 w-5" strokeWidth={1.5} />
                Book Consultation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-charcoal/8 bg-cream/40 py-16 lg:py-20">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <h2 className="font-serif text-3xl font-semibold text-charcoal">
              Related treatments
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {related.map((t) => (
                <Link
                  key={t.id}
                  to={`/treatments/${t.slug}`}
                  className="group overflow-hidden rounded-3xl bg-white shadow-glass transition-all hover:-translate-y-1 hover:shadow-glass-hover"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={t.image}
                      alt={t.title}
                      className="image-zoom h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-xl font-semibold text-charcoal">
                      {t.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-charcoal-muted">
                      {t.summary}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-sage-dark">
                      Learn More
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function DetailBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-charcoal/8 bg-white/60 p-6 backdrop-blur">
      <h3 className="font-serif text-xl font-semibold text-charcoal">{title}</h3>
      <p className="mt-3 text-base leading-relaxed text-charcoal-muted">{body}</p>
    </div>
  );
}
