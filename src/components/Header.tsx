import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Instagram, Menu, X, CalendarHeart } from 'lucide-react';

const links = [
  { label: 'Treatments', to: '/treatments' },
  { label: 'Before / After', to: '/before-after' },
  { label: 'Doctors', to: '/doctors' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'FAQ', to: '/faq' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div
          className={`flex items-center justify-between rounded-full transition-all duration-500 ${
            scrolled
              ? 'glass shadow-glass px-5 py-3'
              : 'bg-transparent px-4 py-2.5'
          }`}
        >
          {/* Brand */}
          <Link to="/" className="group flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-charcoal text-white transition-transform duration-500 group-hover:rotate-12">
              <CalendarHeart className="h-4.5 w-4.5" strokeWidth={1.5} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-serif text-xl font-semibold tracking-tight text-charcoal">
                Lumi&egrave;re
              </span>
              <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-charcoal-muted">
                Dermatology
              </span>
            </span>
          </Link>

          {/* Center nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => {
              const active = location.pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`group relative px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? 'text-charcoal'
                      : 'text-charcoal-soft hover:text-charcoal'
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 h-px origin-left bg-champagne transition-transform duration-300 ${
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-charcoal/10 text-charcoal-soft transition-all duration-300 hover:border-charcoal/20 hover:bg-white hover:shadow-glass sm:flex"
            >
              <Instagram className="h-4.5 w-4.5" strokeWidth={1.5} />
            </a>
            <Link
              to="/booking"
              className="hidden items-center gap-2 rounded-full bg-sage px-5 py-2.5 text-sm font-semibold text-white shadow-ambient transition-all duration-300 hover:bg-sage-dark hover:shadow-ambient-lg hover:scale-[1.02] sm:flex"
            >
              Book Consultation
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/10 text-charcoal lg:hidden"
            >
              {open ? (
                <X className="h-5 w-5" strokeWidth={1.5} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="mt-2 animate-fade-up rounded-3xl glass p-4 shadow-glass lg:hidden">
            <nav className="flex flex-col">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium text-charcoal-soft transition-colors hover:bg-white/60"
                >
                  {l.label}
                  <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
                </Link>
              ))}
              <Link
                to="/booking"
                className="mt-2 flex items-center justify-center rounded-2xl bg-sage px-4 py-3.5 text-base font-semibold text-white"
              >
                Book Consultation
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
