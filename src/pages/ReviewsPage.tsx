import Testimonials from '@/components/Testimonials';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { Link } from 'react-router-dom';
import { CalendarHeart } from 'lucide-react';

export default function ReviewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Patient Stories"
        title={
          <>
            Real people.
            <span className="italic text-sage-dark"> Real results.</span>
          </>
        }
        subtitle="Watch video testimonials from our patients and read verified Google reviews from those who trusted Lumière with their skin."
      />
      <div className="pb-20 lg:pb-28">
        <Testimonials embedded />
      </div>
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal animation="animate-reveal-up">
            <div className="flex flex-col items-center gap-4 rounded-3xl bg-charcoal px-6 py-12 text-center">
              <h2 className="font-serif text-3xl font-semibold text-white sm:text-4xl text-balance">
                Join our happy patients
              </h2>
              <p className="max-w-lg text-white/60">
                Book a free consultation and start your journey to radiant,
                healthy skin.
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
