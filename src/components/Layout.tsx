import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';

export default function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-alabaster">
      <ScrollToTop />
      <Header />
      <main key={pathname}>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
