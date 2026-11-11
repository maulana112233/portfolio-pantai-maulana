/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#FDFCF7',
          100: '#FAF6EB',
          200: '#F4ECD4',
          300: '#EBDCB4',
          400: '#DFCA90',
          500: '#D2B466',
        },
        ocean: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
        coral: {
          500: '#FF6B6B',
          600: '#EE5253',
        },
        palm: {
          500: '#10B981',
          600: '#059669',
        }
      },
      boxShadow: {
        'brutal-sm': '3px 3px 0px #000000',
        'brutal': '5px 5px 0px #000000',
        'brutal-lg': '8px 8px 0px #000000',
        'brutal-xl': '12px 12px 0px #000000',
        'brutal-cyan': '5px 5px 0px #0891B2',
        'brutal-amber': '5px 5px 0px #D97706',
        'brutal-coral': '5px 5px 0px #DC2626',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
}
