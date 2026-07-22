/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6', // teal-500
          600: '#0d9488', // teal-600
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        accent: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // sky-500
          600: '#0284c7', // sky-600
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        navy: {
          850: '#11182c',
          900: '#0f172a', // slate-900
          950: '#0b0f19',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 8px 30px rgba(0, 0, 0, 0.08)',
        'premium-hover': '0 20px 40px rgba(0, 0, 0, 0.12)',
        glass: '0 8px 32px 0 rgba(15, 23, 42, 0.1)',
      },
    },
  },
  plugins: [],
}
