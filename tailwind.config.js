// tailwind.config.js
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        yellow: {
          500: '#facc15', // Replace oklch
        },
        blue: {
          700: '#1d4ed8',
          800: '#1e40af',
        },
        green: {
          700: '#15803d',
          800: '#166534',
        },
        red: {
          500: '#ef4444',
        },
        gray: {
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          500: '#6b7280',
          700: '#374151',
        },
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
