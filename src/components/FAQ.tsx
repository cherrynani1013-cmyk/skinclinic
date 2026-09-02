import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { faqs } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';

export default function FAQ({ embedded = false }: { embedded?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="faq" className={embedded ? 'relative py-6' : 'relative py-20 lg:py-28'}>
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        {!embedded && (
        <div
          ref={ref}
          className={`text-center ${visible ? 'animate-fade-up' : 'reveal-hidden'}`}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-champagne" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-champagne-dark">
              Questions, Answered
            </span>
            <span className="h-px w-10 bg-champagne" />
          </div>
          <h2 className="font-serif text-4xl leading-tight tracking-tight text-charcoal sm:text-5xl text-balance">
            Everything you want to know
          </h2>
        </div>
        )}

        <div className={embedded ? 'mt-2 space-y-3' : 'mt-10 space-y-3'}>
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-sage/30 bg-white shadow-glass'
                    : 'border-charcoal/8 bg-white/50 backdrop-blur'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                >
                  <span className="font-serif text-lg font-semibold text-charcoal">
                    {item.q}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      isOpen
                        ? 'bg-sage text-white rotate-0'
                        : 'bg-sage/10 text-sage-dark'
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </span>
                </button>
                <div
                  className="grid transition-all duration-400 ease-out"
                  style={{
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-charcoal-muted">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
