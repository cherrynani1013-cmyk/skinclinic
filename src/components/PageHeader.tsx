import { useReveal } from '@/hooks/useReveal';

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section className="relative overflow-hidden pt-32 pb-10 sm:pt-40 lg:pb-14">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-32 -top-20 h-[400px] w-[400px] rounded-full bg-sage-100 blur-3xl opacity-50" />
        <div className="absolute -left-20 top-1/2 h-80 w-80 rounded-full bg-champagne-50 blur-3xl opacity-60" />
      </div>
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div
          ref={ref}
          className={`max-w-3xl ${visible ? 'animate-fade-up' : 'reveal-hidden'}`}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-champagne" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-champagne-dark">
              {eyebrow}
            </span>
          </div>
          <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-charcoal sm:text-5xl lg:text-6xl text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-charcoal-muted text-pretty">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
