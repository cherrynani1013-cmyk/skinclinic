import Booking from '@/components/Booking';
import PageHeader from '@/components/PageHeader';

export default function BookingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Begin Your Journey"
        title={
          <>
            Book your
            <span className="italic text-sage-dark"> free consultation</span>
          </>
        }
        subtitle="A 30-minute assessment with a Lumière specialist. We'll evaluate your skin, discuss your goals, and craft a plan tailored to you — with no obligation."
      />
      <div className="pb-20 lg:pb-28">
        <Booking embedded />
      </div>
    </>
  );
}
