import FAQ from '@/components/FAQ';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { Link } from 'react-router-dom';
import { CalendarHeart } from 'lucide-react';

export default function FAQPage() {
  return (
    <>
      <PageHeader
        eyebrow="Questions, Answered"
        title="Everything you want to know"
        subtitle="From consultations and pricing to downtime and skin-type suitability, here are the answers to the questions we hear most."
      />
      <FAQ embedded />
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal animation="animate-reveal-up">
            <div className="flex flex-col items-center gap-4 rounded-3xl bg-charcoal px-6 py-12 text-center">
              <h2 className="font-serif text-3xl font-semibold text-white sm:text-4xl text-balance">
                Still have questions?
              </h2>
              <p className="max-w-lg text-white/60">
                Our team is happy to help. Book a free consultation or use the chat
                in the corner of your screen.
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
