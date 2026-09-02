import { GraduationCap, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { doctors } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';

export default function Doctors() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="doctors" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div
          ref={ref}
          className={`max-w-2xl ${visible ? 'animate-fade-up' : 'reveal-hidden'}`}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-champagne" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-champagne-dark">
              Your Specialists
            </span>
          </div>
          <h2 className="font-serif text-4xl leading-tight tracking-tight text-charcoal sm:text-5xl text-balance">
            Led by dermatologists with
            <span className="italic text-sage-dark"> an artist&rsquo;s eye</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-charcoal-muted text-pretty">
            Each clinician is board-certified and fellowship-trained. They
            combine medical precision with aesthetic judgment for results that
            look like you &mdash; only more radiant.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {doctors.map((doc, i) => (
            <Link
              key={doc.id}
              to={`/doctors/${doc.slug}`}
              className="group animate-fade-up overflow-hidden rounded-3xl bg-white shadow-glass transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glass-hover"
              style={{ animationDelay: `${0.08 * i}s` }}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="image-zoom h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <h3 className="font-serif text-2xl font-semibold text-white">
                    {doc.name}
                  </h3>
                  <p className="mt-0.5 text-sm text-white/85">{doc.title}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-xs font-medium text-champagne-dark">
                  <GraduationCap className="h-4 w-4" strokeWidth={1.5} />
                  {doc.credentials}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-muted">
                  {doc.bio}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {doc.specialties.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center gap-1 rounded-full bg-sage-50 px-3 py-1.5 text-xs font-semibold text-sage-dark"
                    >
                      <Sparkles className="h-3 w-3" strokeWidth={2} />
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-charcoal/8 pt-4">
                  <span className="text-sm font-semibold text-charcoal">
                    View profile
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage/10 text-sage-dark transition-all duration-300 group-hover:bg-sage group-hover:text-white">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
