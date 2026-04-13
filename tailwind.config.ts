import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

export default {
  content: ['./index.html', './src/**/*.{vue,ts,tsx}', './tests/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#fff7ed',
        surface: '#ffffff',
        accent: '#ea580c',
        accentSoft: '#fff1e6',
        cardWarm: '#fb923c',
        cardHot: '#ef4444',
      },
      boxShadow: {
        soft: '0 24px 60px rgba(234, 88, 12, 0.12)',
      },
    },
  },
  plugins: [forms],
} satisfies Config;
