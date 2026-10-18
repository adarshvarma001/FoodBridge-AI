/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Emerald Green Tokens
        emerald: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        // Warm Amber Gold Tokens
        amber: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        brand: {
          darkest: '#0F172A',
          darker: '#1E293B',
          dark: '#059669',
          medium: '#10B981',
          light: '#34D399',
          fresh: '#10B981',
          accent: '#F59E0B',
          warm: '#F97316',
        },
        cream: {
          DEFAULT: '#FFFFFF',
          warm: '#F8FAFC',
          card: '#FFFFFF',
        },
        charcoal: {
          darkest: '#0F172A',
          darker: '#1E293B',
          dark: '#334155',
          medium: '#64748B',
          light: '#94A3B8',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(5, 150, 105, 0.12)',
        'emerald-glow': '0 10px 30px -10px rgba(16, 185, 129, 0.3)',
        'amber-glow': '0 10px 30px -10px rgba(245, 158, 11, 0.3)',
      }
    },
  },
  plugins: [],
}
