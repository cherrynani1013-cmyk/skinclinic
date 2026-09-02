import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import TreatmentsPage from '@/pages/TreatmentsPage';
import TreatmentDetailPage from '@/pages/TreatmentDetailPage';
import BeforeAfterPage from '@/pages/BeforeAfterPage';
import DoctorsPage from '@/pages/DoctorsPage';
import DoctorDetailPage from '@/pages/DoctorDetailPage';
import ReviewsPage from '@/pages/ReviewsPage';
import FAQPage from '@/pages/FAQPage';
import BookingPage from '@/pages/BookingPage';
import AdminLoginPage from '@/pages/AdminLoginPage';
import AdminPage from '@/pages/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin routes — standalone, no site header/footer */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminPage />} />

        {/* Public site routes */}
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="treatments" element={<TreatmentsPage />} />
          <Route path="treatments/:slug" element={<TreatmentDetailPage />} />
          <Route path="before-after" element={<BeforeAfterPage />} />
          <Route path="doctors" element={<DoctorsPage />} />
          <Route path="doctors/:slug" element={<DoctorDetailPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="booking" element={<BookingPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
