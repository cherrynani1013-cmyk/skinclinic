import { useCallback, useMemo, useRef, useState, type PointerEvent } from 'react';
import { MoveHorizontal, Clock, Layers, Zap } from 'lucide-react';
import { beforeAfters, type BeforeAfter } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';

const concerns = ['All', 'Pigmentation', 'Acne Scars', 'Wrinkles'] as const;

export default function BeforeAfterGallery({ embedded = false }: { embedded?: boolean }) {
  const [filter, setFilter] = useState<(typeof concerns)[number]>('All');
  const { ref, visible } = useReveal<HTMLDivElement>();

  const items = useMemo(
    () =>
      filter === 'All'
        ? beforeAfters
        : beforeAfters.filter((b) => b.concern === filter),
    [filter]
  );

  return (
    <section id="gallery" className={embedded ? 'relative py-10 lg:py-14' : 'relative bg-cream/50 py-20 lg:py-28'}>
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        {!embedded && (
        <div
          ref={ref}
          className={`flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end ${
            visible ? 'animate-fade-up' : 'reveal-hidden'
          }`}
        >
          <div className="max-w-xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-champagne" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-champagne-dark">
                Real Patient Results
              </span>
            </div>
            <h2 className="font-serif text-4xl leading-tight tracking-tight text-charcoal sm:text-5xl text-balance">
              Before &amp; after,
              <span className="italic text-sage-dark"> drag to reveal</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-charcoal-muted">
              Slide any image to compare. Every result is a real Lumi&egrave;re patient,
              with full treatment details noted below.
            </p>
          </div>
        </div>
        )}

        {/* Filter tabs */}
        <div className={`flex flex-wrap gap-2.5 ${embedded ? 'mb-8' : 'mb-6 mt-6'}`}>
          {concerns.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                filter === c
                  ? 'bg-charcoal text-white shadow-ambient'
                  : 'border border-charcoal/10 bg-white/60 text-charcoal-soft backdrop-blur hover:border-charcoal/25'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {items.map((item, i) => (
            <BeforeAfterCard key={item.id} item={item} index={i} />
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-charcoal-muted">
          Images shown with patient consent. Individual results vary.
        </p>
      </div>
    </section>
  );
}

function BeforeAfterCard({ item, index }: { item: BeforeAfter; index: number }) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  const onPointerDown = (e: PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: PointerEvent) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <div
      className="group animate-fade-up overflow-hidden rounded-3xl bg-white shadow-glass transition-shadow duration-500 hover:shadow-glass-hover"
      style={{ animationDelay: `${0.08 * index}s` }}
    >
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        className="relative aspect-[4/3] cursor-ew-resize select-none overflow-hidden touch-none"
      >
        {/* After (base) */}
        <img
          src={item.after}
          alt="After treatment"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          draggable={false}
        />
        <span className="absolute right-3 top-3 z-10 rounded-full bg-white/85 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-sage-dark backdrop-blur">
          After
        </span>

        {/* Before (clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${pos}%` }}
        >
          <img
            src={item.before}
            alt="Before treatment"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ width: pos > 0 ? `${(100 / pos) * 100}%` : '100%', maxWidth: 'none' }}
            loading="lazy"
            draggable={false}
          />
          <span className="absolute left-3 top-3 z-10 rounded-full bg-charcoal/70 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur">
            Before
          </span>
        </div>

        {/* Handle */}
        <div
          className="absolute inset-y-0 z-20 flex w-0.5 items-center justify-center bg-white shadow-[0_0_12px_rgba(0,0,0,0.25)]"
          style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-charcoal shadow-ambient">
            <MoveHorizontal className="h-5 w-5" strokeWidth={1.5} />
          </span>
        </div>

        {/* Metadata chip */}
        <div className="absolute bottom-3 left-3 z-10 flex flex-wrap gap-1.5">
          <Chip icon={Layers}>{`Sessions: ${item.sessions}`}</Chip>
          <Chip icon={Clock}>{item.timeframe}</Chip>
          <Chip icon={Zap}>{item.procedure}</Chip>
        </div>
      </div>

      <div className="flex items-center justify-between px-5 py-4">
        <span className="text-sm font-semibold text-charcoal">
          {item.concern}
        </span>
        <span className="text-xs text-charcoal-muted">
          Drag the handle to compare
        </span>
      </div>
    </div>
  );
}

function Chip({
  icon: Icon,
  children,
}: {
  icon: typeof Layers;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-charcoal/65 px-2.5 py-1.5 text-[11px] font-semibold text-white backdrop-blur">
      <Icon className="h-3 w-3" strokeWidth={2} />
      {children}
    </span>
  );
}
