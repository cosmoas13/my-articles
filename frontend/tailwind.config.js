/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        green: {
          50: '#e0f2e9',
          100: '#c1e3d2',
          200: '#a3d4bb',
          300: '#75b798',
          400: '#4a9d76',
          500: '#2c8259',
          600: '#1e6a45',
          700: '#155239',
          800: '#0e3b29',
          900: '#09241a',
          950: '#051a12',
        },
        primary: {
          50: '#e0f2e9',
          100: '#c1e3d2',
          200: '#a3d4bb',
          300: '#75b798',
          400: '#4a9d76',
          500: '#2c8259',
          600: '#1e6a45',
          700: '#155239',
          800: '#0e3b29',
          900: '#09241a',
          950: '#051a12',
        },
      },
      backgroundColor: {
        dark: '#1a1a1a',
        'dark-card': '#2a2a2a',
      },
    },
  },
  plugins: [typography],
}