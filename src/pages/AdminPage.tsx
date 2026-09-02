import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut,
  Mail,
  Phone,
  Calendar,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Send,
  Filter,
  ArrowLeft,
  CalendarHeart,
  AlertCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

type BookingStatus = 'pending' | 'confirmed' | 'contacted' | 'cancelled';

interface Booking {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  treatment: string;
  preferred_date: string;
  notes: string | null;
  status: BookingStatus;
  email_sent: boolean;
  created_at: string;
}

const statusConfig: Record<BookingStatus, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: 'Pending', color: 'bg-champagne/15 text-champagne-dark border-champagne/20', icon: Clock },
  confirmed: { label: 'Confirmed', color: 'bg-sage/15 text-sage-dark border-sage/20', icon: CheckCircle2 },
  contacted: { label: 'Contacted', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Mail },
  cancelled: { label: 'Cancelled', color: 'bg-red-50 text-red-700 border-red-200', icon: XCircle },
};

const statusOptions: BookingStatus[] = ['pending', 'confirmed', 'contacted', 'cancelled'];

export default function AdminPage() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<BookingStatus | 'all'>('all');
  const [selected, setSelected] = useState<Booking | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [sendNote, setSendNote] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const loadBookings = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to load bookings:', error);
    } else {
      setBookings((data as Booking[]) || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate('/admin/login', { replace: true });
      } else {
        loadBookings();
      }
    });
  }, [navigate, loadBookings]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login', { replace: true });
  };

  const updateStatus = async (id: string, newStatus: BookingStatus) => {
    setActionLoading(`status-${id}`);
    const { error } = await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      setSendNote({ type: 'error', msg: 'Failed to update status' });
    } else {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
      if (selected?.id === id) {
        setSelected({ ...selected, status: newStatus });
      }
    }
    setActionLoading(null);
    setTimeout(() => setSendNote(null), 3000);
  };

  const sendEmail = async (booking: Booking) => {
    setActionLoading(`email-${booking.id}`);
    setSendNote(null);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-booking-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            bookingId: booking.id,
          }),
        }
      );

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        throw new Error(errBody.error || `Request failed (${response.status})`);
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Email service returned an error');
      }

      setBookings((prev) =>
        prev.map((b) => (b.id === booking.id ? { ...b, email_sent: true } : b))
      );
      if (selected?.id === booking.id) {
        setSelected({ ...selected, email_sent: true });
      }
      setSendNote({ type: 'success', msg: `Confirmation email sent to ${booking.email}` });
    } catch (err) {
      setSendNote({
        type: 'error',
        msg: err instanceof Error ? err.message : 'Failed to send email',
      });
    }
    setActionLoading(null);
    setTimeout(() => setSendNote(null), 5000);
  };

  const filtered = bookings.filter((b) => {
    const matchesSearch =
      !search ||
      b.full_name.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase()) ||
      b.treatment.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'all' || b.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    contacted: bookings.filter((b) => b.status === 'contacted').length,
  };

  return (
    <div className="min-h-screen bg-alabaster">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-charcoal/8 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-charcoal text-white">
              <CalendarHeart className="h-4 w-4" strokeWidth={1.5} />
            </span>
            <div>
              <span className="font-serif text-lg font-semibold text-charcoal">
                Lumière Admin
              </span>
              <span className="ml-2 hidden text-xs text-charcoal-muted sm:inline">
                Booking Management
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-sm font-medium text-charcoal-soft transition-colors hover:text-charcoal"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-full border border-charcoal/10 px-4 py-2 text-sm font-medium text-charcoal-soft transition-all hover:border-charcoal/20 hover:bg-white"
            >
              <LogOut className="h-4 w-4" strokeWidth={1.5} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: 'Total Requests', value: stats.total, icon: Mail },
            { label: 'Pending', value: stats.pending, icon: Clock },
            { label: 'Confirmed', value: stats.confirmed, icon: CheckCircle2 },
            { label: 'Contacted', value: stats.contacted, icon: Phone },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-charcoal/8 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted">
                  {s.label}
                </span>
                <s.icon className="h-4 w-4 text-charcoal-muted" strokeWidth={1.5} />
              </div>
              <div className="mt-2 font-serif text-3xl font-semibold text-charcoal">
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-muted" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search by name, email, or treatment..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-11"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-charcoal-muted" strokeWidth={1.5} />
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  filterStatus === 'all'
                    ? 'bg-charcoal text-white'
                    : 'border border-charcoal/10 bg-white text-charcoal-soft hover:border-charcoal/20'
                }`}
              >
                All
              </button>
              {statusOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-all ${
                    filterStatus === s
                      ? 'bg-charcoal text-white'
                      : 'border border-charcoal/10 bg-white text-charcoal-soft hover:border-charcoal/20'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notification */}
        {sendNote && (
          <div
            className={`mt-4 flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm ${
              sendNote.type === 'success'
                ? 'border border-sage/20 bg-sage/10 text-sage-dark'
                : 'border border-red-200 bg-red-50 text-red-700'
            }`}
          >
            {sendNote.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0" />
            )}
            <span>{sendNote.msg}</span>
          </div>
        )}

        {/* Table / List */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-charcoal/8 bg-white shadow-sm">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-charcoal-muted" strokeWidth={1.5} />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Mail className="h-8 w-8 text-charcoal-muted" strokeWidth={1.5} />
              <p className="mt-4 text-sm text-charcoal-muted">
                No booking requests found.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-charcoal/8 bg-alabaster/50">
                  <tr className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted">
                    <th className="px-5 py-4">Patient</th>
                    <th className="hidden px-5 py-4 md:table-cell">Treatment</th>
                    <th className="hidden px-5 py-4 lg:table-cell">Date</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="hidden px-5 py-4 lg:table-cell">Submitted</th>
                    <th className="px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal/5">
                  {filtered.map((b) => {
                    const sc = statusConfig[b.status];
                    return (
                      <tr key={b.id} className="transition-colors hover:bg-alabaster/30">
                        <td className="px-5 py-4">
                          <div className="font-semibold text-charcoal">{b.full_name}</div>
                          <div className="mt-0.5 flex items-center gap-1 text-xs text-charcoal-muted">
                            <Mail className="h-3 w-3" />
                            {b.email}
                          </div>
                          <div className="mt-0.5 flex items-center gap-1 text-xs text-charcoal-muted">
                            <Phone className="h-3 w-3" />
                            {b.phone}
                          </div>
                        </td>
                        <td className="hidden px-5 py-4 md:table-cell">
                          <span className="text-charcoal-soft">{b.treatment}</span>
                        </td>
                        <td className="hidden px-5 py-4 lg:table-cell">
                          <div className="flex items-center gap-1.5 text-charcoal-soft">
                            <Calendar className="h-3.5 w-3.5 text-charcoal-muted" />
                            {new Date(b.preferred_date).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${sc.color}`}
                          >
                            <sc.icon className="h-3 w-3" />
                            {sc.label}
                          </span>
                        </td>
                        <td className="hidden px-5 py-4 text-xs text-charcoal-muted lg:table-cell">
                          {new Date(b.created_at).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelected(b)}
                              className="rounded-lg border border-charcoal/10 px-3 py-1.5 text-xs font-semibold text-charcoal-soft transition-all hover:border-charcoal/20 hover:bg-white"
                            >
                              Details
                            </button>
                            <button
                              onClick={() => sendEmail(b)}
                              disabled={actionLoading === `email-${b.id}` || b.email_sent}
                              className="flex items-center gap-1.5 rounded-lg bg-sage px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-sage-dark disabled:opacity-50"
                              title={b.email_sent ? 'Email already sent' : 'Send confirmation email'}
                            >
                              {actionLoading === `email-${b.id}` ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <Send className="h-3.5 w-3.5" />
                              )}
                              {b.email_sent ? 'Sent' : 'Email'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-charcoal/40 backdrop-blur-sm animate-fade-in sm:items-center"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-lg animate-slide-up overflow-y-auto rounded-t-[2rem] bg-white p-6 shadow-ambient-lg sm:rounded-[2rem] sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-charcoal">
                  {selected.full_name}
                </h3>
                <p className="mt-1 text-sm text-charcoal-muted">
                  Submitted {new Date(selected.created_at).toLocaleString('en-GB')}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/10 text-charcoal-soft transition-all hover:bg-alabaster"
              >
                <XCircle className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <DetailRow icon={Mail} label="Email" value={selected.email} />
              <DetailRow icon={Phone} label="Phone" value={selected.phone} />
              <DetailRow icon={CalendarHeart} label="Treatment" value={selected.treatment} />
              <DetailRow
                icon={Calendar}
                label="Preferred Date"
                value={new Date(selected.preferred_date).toLocaleDateString('en-GB', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              />
              {selected.notes && (
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted">
                    Notes
                  </span>
                  <p className="mt-1.5 rounded-xl bg-alabaster/60 p-4 text-sm leading-relaxed text-charcoal-soft">
                    {selected.notes}
                  </p>
                </div>
              )}
            </div>

            {/* Status changer */}
            <div className="mt-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted">
                Update Status
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {statusOptions.map((s) => {
                  const sc = statusConfig[s];
                  const isActive = selected.status === s;
                  return (
                    <button
                      key={s}
                      onClick={() => updateStatus(selected.id, s)}
                      disabled={actionLoading === `status-${selected.id}`}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold capitalize transition-all ${
                        isActive
                          ? sc.color
                          : 'border-charcoal/10 bg-white text-charcoal-soft hover:border-charcoal/20'
                      }`}
                    >
                      <sc.icon className="h-3.5 w-3.5" />
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Email action */}
            <button
              onClick={() => sendEmail(selected)}
              disabled={actionLoading === `email-${selected.id}` || selected.email_sent}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-sage px-6 py-3.5 text-base font-semibold text-white shadow-ambient transition-all hover:bg-sage-dark disabled:opacity-50"
            >
              {actionLoading === `email-${selected.id}` ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" strokeWidth={1.5} />
                  Sending...
                </>
              ) : selected.email_sent ? (
                <>
                  <CheckCircle2 className="h-5 w-5" strokeWidth={1.5} />
                  Email Sent
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" strokeWidth={1.5} />
                  Send Confirmation Email
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-alabaster text-charcoal-soft">
        <Icon className="h-4 w-4" strokeWidth={1.5} />
      </span>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted">
          {label}
        </div>
        <div className="mt-0.5 text-sm font-medium text-charcoal">{value}</div>
      </div>
    </div>
  );
}
