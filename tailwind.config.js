/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        alabaster: '#FBF9F6',
        white: '#FFFFFF',
        charcoal: {
          DEFAULT: '#1A1A1A',
          soft: '#2B2B2B',
          muted: '#6B6B6B',
        },
        sage: {
          DEFAULT: '#8A9A86',
          light: '#A8B5A4',
          dark: '#6B7B68',
          50: '#F2F5F1',
          100: '#E4EAE2',
          200: '#C9D4C6',
          300: '#A8B5A4',
          400: '#8A9A86',
          500: '#6B7B68',
          600: '#56624F',
          700: '#424D3C',
          800: '#2F3829',
          900: '#1E241B',
        },
        champagne: {
          DEFAULT: '#D4AF37',
          light: '#E6C75A',
          dark: '#B8932A',
          50: '#FBF6E6',
          100: '#F7ECCB',
          200: '#EFD98C',
          300: '#E6C75A',
          400: '#D4AF37',
          500: '#B8932A',
          600: '#937521',
        },
        cream: {
          DEFAULT: '#F4F0E8',
          dark: '#E8E1D3',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        ambient: '0 20px 60px -20px rgba(26, 26, 26, 0.12)',
        'ambient-lg': '0 40px 90px -30px rgba(26, 26, 26, 0.18)',
        glass: '0 8px 32px rgba(26, 26, 26, 0.08)',
        'glass-hover': '0 16px 48px rgba(26, 26, 26, 0.14)',
        gold: '0 8px 30px rgba(212, 175, 55, 0.25)',
      },
      backgroundImage: {
        'noise-grain':
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-right': {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-left': {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-fade': {
          '0%': { opacity: '0', transform: 'scale(0.92) translateY(12px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'reveal-up': {
          '0%': { opacity: '0', transform: 'translateY(40px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'shimmer-text': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'hero-img': {
          '0%': { opacity: '0', transform: 'scale(1.1)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'badge-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-30px) scale(0.9)' },
          '100%': { opacity: '1', transform: 'translateX(0) scale(1)' },
        },
        'badge-in-right': {
          '0%': { opacity: '0', transform: 'translateX(30px) scale(0.9)' },
          '100%': { opacity: '1', transform: 'translateX(0) scale(1)' },
        },
        'badge-in-bottom': {
          '0%': { opacity: '0', transform: 'translateY(30px) scale(0.9)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'word-rise': {
          '0%': { opacity: '0', transform: 'translateY(40px) rotate(2deg)' },
          '100%': { opacity: '1', transform: 'translateY(0) rotate(0)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.6' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        'drift-slow': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(30px, -20px)' },
          '66%': { transform: 'translate(-20px, 20px)' },
        },
        'drift-slower': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-40px, 30px)' },
        },
        'scroll-hint': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '30%': { opacity: '1' },
          '70%': { opacity: '1' },
          '100%': { transform: 'translateY(14px)', opacity: '0' },
        },
        'count-glow': {
          '0%, 100%': { textShadow: '0 0 0 rgba(212,175,55,0)' },
          '50%': { textShadow: '0 0 20px rgba(212,175,55,0.3)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.6s ease both',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'slide-up': 'slide-up 0.4s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-right': 'fade-right 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-left': 'fade-left 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'scale-fade': 'scale-fade 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'slide-down': 'slide-down 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'reveal-up': 'reveal-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        'shimmer-text': 'shimmer-text 3s linear infinite',
        'hero-img': 'hero-img 1.4s cubic-bezier(0.22, 1, 0.36, 1) both',
        'badge-in-left': 'badge-in-left 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'badge-in-right': 'badge-in-right 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'badge-in-bottom': 'badge-in-bottom 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'word-rise': 'word-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
        'drift-slow': 'drift-slow 18s ease-in-out infinite',
        'drift-slower': 'drift-slower 22s ease-in-out infinite',
        'scroll-hint': 'scroll-hint 2s ease-in-out infinite',
        'count-glow': 'count-glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
