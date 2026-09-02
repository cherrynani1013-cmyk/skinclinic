import BeforeAfterGallery from '@/components/BeforeAfterGallery';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { Link } from 'react-router-dom';
import { CalendarHeart } from 'lucide-react';

export default function BeforeAfterPage() {
  return (
    <>
      <PageHeader
        eyebrow="Real Patient Results"
        title={
          <>
            Before &amp; after,
            <span className="italic text-sage-dark"> drag to reveal</span>
          </>
        }
        subtitle="Slide any image to compare. Every result is a real Lumière patient, with full treatment details noted below each comparison."
      />
      <BeforeAfterGallery embedded />
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal animation="animate-reveal-up">
            <div className="flex flex-col items-center gap-4 rounded-3xl bg-charcoal px-6 py-12 text-center">
              <h2 className="font-serif text-3xl font-semibold text-white sm:text-4xl text-balance">
                Your results could be next
              </h2>
              <p className="max-w-lg text-white/60">
                Book a free consultation to see how our specialists can tailor a
                plan to your skin.
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
