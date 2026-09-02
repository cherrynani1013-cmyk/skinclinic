import { useParams, Link, Navigate } from 'react-router-dom';
import { GraduationCap, Sparkles, CalendarHeart, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { getDoctorBySlug } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';
import Reveal from '@/components/Reveal';

export default function DoctorDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const doctor = slug ? getDoctorBySlug(slug) : undefined;
  const { ref, visible } = useReveal<HTMLDivElement>();

  if (!doctor) {
    return <Navigate to="/doctors" replace />;
  }

  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-36">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-32 -top-20 h-[400px] w-[400px] rounded-full bg-sage-100 blur-3xl opacity-50" />
        </div>
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 text-sm font-medium text-charcoal-muted transition-colors hover:text-charcoal"
          >
            <ArrowLeft className="h-4 w-4" />
            All doctors
          </Link>

          <div className="mt-6 grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="animate-scale-in">
              <div className="overflow-hidden rounded-[2rem] shadow-ambient-lg">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="h-[420px] w-full object-cover sm:h-[500px]"
                />
              </div>
              <div className="pointer-events-none absolute" />
            </div>

            <div className="animate-fade-up">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-champagne-dark">
                {doctor.title}
              </span>
              <h1 className="mt-3 font-serif text-4xl leading-tight tracking-tight text-charcoal sm:text-5xl text-balance">
                {doctor.name}
              </h1>
              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-charcoal-muted">
                <GraduationCap className="h-5 w-5 text-sage" strokeWidth={1.5} />
                {doctor.credentials}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {doctor.specialties.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1 rounded-full bg-sage-50 px-3 py-1.5 text-sm font-semibold text-sage-dark"
                  >
                    <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
                    {s}
                  </span>
                ))}
              </div>

              <div ref={ref} className={`mt-8 ${visible ? 'animate-fade-up' : 'reveal-hidden'}`}>
                <h2 className="font-serif text-2xl font-semibold text-charcoal">
                  About
                </h2>
                <p className="mt-3 text-base leading-relaxed text-charcoal-muted text-pretty">
                  {doctor.longBio}
                </p>
              </div>

              <div className="mt-8 space-y-3">
                {[
                  'Board-certified and fellowship-trained',
                  'Personalized treatment planning',
                  'Expertise across all skin types and tones',
                ].map((item, i) => (
                  <Reveal
                    key={item}
                    animation="animate-fade-right"
                    delay={i * 0.1}
                    className="flex items-center gap-2.5 text-sm text-charcoal-soft"
                  >
                    <CheckCircle2 className="h-5 w-5 text-sage" strokeWidth={1.5} />
                    {item}
                  </Reveal>
                ))}
              </div>

              <Link
                to="/booking"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3.5 text-base font-semibold text-white shadow-ambient transition-all hover:bg-sage-dark hover:shadow-ambient-lg"
              >
                <CalendarHeart className="h-5 w-5" strokeWidth={1.5} />
                Book with {doctor.name.split(' ').slice(-1)[0]}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="h-20" />
    </>
  );
}
