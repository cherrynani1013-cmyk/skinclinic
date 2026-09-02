import { useState, type FormEvent } from 'react';
import {
  CalendarHeart,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Mail,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { treatments } from '@/data/content';
import { supabase } from '@/lib/supabase';

const hours = [
  { day: 'Mon &ndash; Fri', time: '9:00 AM &ndash; 7:00 PM' },
  { day: 'Saturday', time: '10:00 AM &ndash; 5:00 PM' },
  { day: 'Sunday', time: 'Closed' },
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function Booking({ embedded = false }: { embedded?: boolean }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const fullName = formData.get('full_name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const treatment = formData.get('treatment') as string;
    const preferredDate = formData.get('preferred_date') as string;
    const notes = (formData.get('notes') as string) || null;

    setStatus('submitting');
    setErrorMsg('');

    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          full_name: fullName,
          phone,
          email,
          treatment,
          preferred_date: preferredDate,
          notes,
        })
        .select('id')
        .single();

      if (error) throw error;

      // Auto-send confirmation email to the customer (fire and forget)
      const bookingId = data?.id;
      if (bookingId) {
        fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-booking-email`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({ bookingId }),
          }
        ).catch((emailErr) => {
          console.error('Auto-email failed:', emailErr);
        });
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again or call us.'
      );
    }
  };

  return (
    <section id="booking" className={embedded ? 'relative py-4' : 'relative py-20 lg:py-28'}>
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div
          ref={ref}
          className={`overflow-hidden rounded-[2.5rem] bg-charcoal shadow-ambient-lg ${
            visible ? 'animate-fade-up' : 'reveal-hidden'
          }`}
        >
          <div className="grid lg:grid-cols-2">
            {/* Left: info */}
            <div className="relative p-8 sm:p-12 lg:p-14">
              <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-sage/20 blur-3xl" />
              <div className="relative">
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-10 bg-champagne" />
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-champagne">
                    Begin Your Journey
                  </span>
                </div>
                <h2 className="font-serif text-4xl leading-tight tracking-tight text-white sm:text-5xl text-balance">
                  Book your free consultation
                </h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-white/70 text-pretty">
                  A 30-minute assessment with a Lumière specialist. We&rsquo;ll
                  evaluate your skin, discuss your goals, and craft a plan
                  tailored to you &mdash; with no obligation.
                </p>

                <div className="mt-10 space-y-4">
                  <InfoRow icon={MapPin}>
                    <span className="font-semibold text-white">
                      128 Harley Street, London W1G 7JR
                    </span>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-sm text-champagne underline-offset-4 hover:underline"
                    >
                      View map
                    </a>
                  </InfoRow>
                  <InfoRow icon={Phone}>
                    <a
                      href="tel:+442071234567"
                      className="font-semibold text-white hover:text-champagne"
                    >
                      +44 20 7123 4567
                    </a>
                  </InfoRow>
                  <InfoRow icon={Mail}>
                    <a
                      href="mailto:care@lumiere.derm"
                      className="font-semibold text-white hover:text-champagne"
                    >
                      care@lumiere.derm
                    </a>
                  </InfoRow>
                  <InfoRow icon={Clock}>
                    <div className="flex flex-col gap-1">
                      {hours.map((h) => (
                        <div
                          key={h.day}
                          className="flex items-center justify-between text-sm"
                          dangerouslySetInnerHTML={{
                            __html: `<span class="font-semibold text-white">${h.day}</span><span class="text-white/60">${h.time}</span>`,
                          }}
                        />
                      ))}
                    </div>
                  </InfoRow>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="bg-white p-8 sm:p-12 lg:p-14">
              {status === 'success' ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage/15 text-sage-dark">
                    <CheckCircle2 className="h-8 w-8" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-5 font-serif text-3xl font-semibold text-charcoal">
                    Request received
                  </h3>
                  <p className="mt-3 max-w-sm text-charcoal-muted">
                    Thank you. Our team will reach out within one business day to
                    confirm your consultation time.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-sm font-semibold text-sage-dark underline-offset-4 hover:underline"
                  >
                    Book another appointment
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <h3 className="font-serif text-2xl font-semibold text-charcoal">
                    Request your appointment
                  </h3>

                  {status === 'error' && (
                    <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full name">
                      <input
                        required
                        name="full_name"
                        type="text"
                        placeholder="Jane Doe"
                        className="input"
                      />
                    </Field>
                    <Field label="Phone">
                      <input
                        required
                        name="phone"
                        type="tel"
                        placeholder="+44 ..."
                        className="input"
                      />
                    </Field>
                  </div>

                  <Field label="Email">
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="jane@email.com"
                      className="input"
                    />
                  </Field>

                  <Field label="Treatment of interest">
                    <select required name="treatment" defaultValue="" className="input">
                      <option value="" disabled>
                        Select a treatment
                      </option>
                      {treatments.map((t) => (
                        <option key={t.id} value={t.title}>
                          {t.title}
                        </option>
                      ))}
                      <option value="General consultation">General consultation</option>
                    </select>
                  </Field>

                  <Field label="Preferred date">
                    <input required name="preferred_date" type="date" className="input" />
                  </Field>

                  <Field label="Anything we should know? (optional)">
                    <textarea
                      name="notes"
                      rows={3}
                      placeholder="Tell us about your skin goals..."
                      className="input resize-none"
                    />
                  </Field>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-sage px-6 py-4 text-base font-semibold text-white shadow-ambient transition-all duration-300 hover:bg-sage-dark hover:shadow-ambient-lg disabled:opacity-60"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" strokeWidth={1.5} />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CalendarHeart className="h-5 w-5" strokeWidth={1.5} />
                        Request Consultation
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-charcoal-muted">
                    No charge. We&rsquo;ll confirm by phone or email within one
                    business day.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon: Icon,
  children,
}: {
  icon: typeof MapPin;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-champagne">
        <Icon className="h-5 w-5" strokeWidth={1.5} />
      </span>
      <div className="pt-1.5">{children}</div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal-muted">
        {label}
      </span>
      {children}
    </label>
  );
}
