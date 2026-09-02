import Hero from '@/components/Hero';
import Treatments from '@/components/Treatments';
import BeforeAfterGallery from '@/components/BeforeAfterGallery';
import Doctors from '@/components/Doctors';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Treatments />
      <BeforeAfterGallery />
      <Doctors />
      <Testimonials />
      <FAQ />
    </>
  );
}
