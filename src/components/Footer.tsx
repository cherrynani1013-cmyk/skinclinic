import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  Instagram,
  Youtube,
  Facebook,
  MapPin,
  Phone,
  Mail,
  Clock,
  CalendarHeart,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  const onSubscribe = (e: FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer className="relative bg-charcoal text-white">
      {/* Newsletter band */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8">
          <div className="flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">
            <div className="max-w-md">
              <h3 className="font-serif text-3xl font-semibold text-balance">
                Skin wisdom, delivered monthly
              </h3>
              <p className="mt-2 text-sm text-white/60">
                Expert guidance, seasonal treatment picks, and members-only
                offers. No spam, ever.
              </p>
            </div>
            {subscribed ? (
              <span className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-3.5 text-sm font-semibold text-champagne">
                <CheckCircle2 className="h-5 w-5" />
                You&rsquo;re subscribed. Welcome.
              </span>
            ) : (
              <form
                onSubmit={onSubscribe}
                className="flex w-full max-w-md items-center gap-2"
              >
                <input
                  required
                  type="email"
                  placeholder="Your email address"
                  className="w-full rounded-full border border-white/15 bg-white/5 px-5 py-3.5 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-champagne/60"
                />
                <button
                  type="submit"
                  className="flex shrink-0 items-center gap-1.5 rounded-full bg-champagne px-5 py-3.5 text-sm font-semibold text-charcoal transition-all hover:bg-champagne-light hover:shadow-gold"
                >
                  Subscribe
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-charcoal">
                <CalendarHeart className="h-4.5 w-4.5" strokeWidth={1.5} />
              </span>
              <span className="font-serif text-xl font-semibold tracking-tight">
                Lumi&egrave;re
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/55">
              Advanced clinical dermatology &amp; aesthetics, tailored to your
              skin. Board-certified care in the heart of London.
            </p>
            <div className="mt-5 flex gap-2.5">
              {[
                { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
                { icon: Youtube, label: 'YouTube', href: 'https://youtube.com' },
                { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-champagne/50 hover:bg-white/5 hover:text-champagne"
                >
                  <s.icon className="h-4.5 w-4.5" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Explore
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { l: 'Treatments', h: '/treatments' },
                { l: 'Before / After', h: '/before-after' },
                { l: 'Doctors', h: '/doctors' },
                { l: 'Reviews', h: '/reviews' },
                { l: 'FAQ', h: '/faq' },
              ].map((i) => (
                <li key={i.h}>
                  <Link
                    to={i.h}
                    className="text-white/65 transition-colors hover:text-champagne"
                  >
                    {i.l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Contact
            </h4>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li className="flex items-start gap-2.5 text-white/65">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-champagne" strokeWidth={1.5} />
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-champagne"
                >
                  128 Harley Street,
                  <br />
                  London W1G 7JR
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-white/65">
                <Phone className="h-4 w-4 shrink-0 text-champagne" strokeWidth={1.5} />
                <a href="tel:+442071234567" className="hover:text-champagne">
                  +44 20 7123 4567
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-white/65">
                <Mail className="h-4 w-4 shrink-0 text-champagne" strokeWidth={1.5} />
                <a href="mailto:care@lumiere.derm" className="hover:text-champagne">
                  care@lumiere.derm
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Clinic Hours
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li className="flex items-center gap-2.5 text-white/65">
                <Clock className="h-4 w-4 shrink-0 text-champagne" strokeWidth={1.5} />
                <span>Mon &ndash; Fri: 9&ndash;7</span>
              </li>
              <li className="flex items-center gap-2.5 pl-6.5 text-white/65">
                <span>Saturday: 10&ndash;5</span>
              </li>
              <li className="flex items-center gap-2.5 pl-6.5 text-white/65">
                <span>Sunday: Closed</span>
              </li>
            </ul>
            <Link
              to="/booking"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-sage px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-sage-light"
            >
              <CalendarHeart className="h-4 w-4" strokeWidth={1.5} />
              Book consultation
            </Link>
          </div>
        </div>

        {/* Disclaimer + bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-xs leading-relaxed text-white/40">
            <strong className="font-semibold text-white/55">
              Medical disclaimer:
            </strong>{' '}
            The information on this site is for educational purposes and is not a
            substitute for professional medical advice. Results vary by
            individual. Always consult a qualified dermatologist before beginning
            any treatment. &copy; {new Date().getFullYear()} Lumi&egrave;re
            Dermatology &amp; Aesthetics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
