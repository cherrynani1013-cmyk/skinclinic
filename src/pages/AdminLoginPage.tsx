import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Loader2, AlertCircle, CalendarHeart } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate('/admin', { replace: true });
    });
  }, [navigate]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setStatus('error');
      setErrorMsg(error.message);
    } else {
      navigate('/admin', { replace: true });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-alabaster px-5">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-charcoal text-white">
            <CalendarHeart className="h-6 w-6" strokeWidth={1.5} />
          </span>
          <h1 className="mt-4 font-serif text-3xl font-semibold text-charcoal">
            Admin Panel
          </h1>
          <p className="mt-2 text-sm text-charcoal-muted">
            Sign in to manage booking requests
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="space-y-5 rounded-3xl border border-charcoal/8 bg-white p-8 shadow-glass"
        >
          {status === 'error' && (
            <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal-muted">
              Email
            </span>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-muted" strokeWidth={1.5} />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@lumiere.derm"
                className="input pl-11"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal-muted">
              Password
            </span>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-muted" strokeWidth={1.5} />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input pl-11"
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-charcoal px-6 py-3.5 text-base font-semibold text-white shadow-ambient transition-all duration-300 hover:bg-charcoal/90 disabled:opacity-60"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" strokeWidth={1.5} />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-charcoal-muted">
          Authorized personnel only. Contact your administrator for credentials.
        </p>
      </div>
    </div>
  );
}
