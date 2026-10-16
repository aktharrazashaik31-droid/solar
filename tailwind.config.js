/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Prata', 'serif'],
        sans: ['"Hanken Grotesk"', 'sans-serif'],
        accent: ['Poppins', 'sans-serif'],
      },
      colors: {
        space: {
          950: '#030509',
          900: '#05070d',
          850: '#080c16',
          800: '#0a0f1a',
          750: '#0d1424',
          700: '#111b30',
          600: '#1a2744',
          500: '#26385f',
          400: '#3a538c',
          300: '#647ea8',
          200: '#94a7c5',
          100: '#cbd7e8',
        },
        cyanGlow: {
          DEFAULT: '#00f0ff',
          muted: 'rgba(0, 240, 255, 0.15)',
          border: 'rgba(0, 240, 255, 0.25)',
        },
        earth: {
          blue: '#0284c7',
          cyan: '#38bdf8',
          glow: 'rgba(56, 189, 248, 0.35)',
        },
        venus: {
          gold: '#eab308',
          amber: '#d97706',
          glow: 'rgba(234, 179, 8, 0.35)',
        },
        mars: {
          rust: '#ea580c',
          red: '#c2410c',
          glow: 'rgba(234, 88, 12, 0.35)',
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-very-slow': 'spin 60s linear infinite',
      }
    },
  },
  plugins: [],
}
