/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './login.html',
    './pages/**/*.html',
    './js/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      colors: {
        brand: {
          DEFAULT: '#f97316',
          dark:    '#ea580c',
        }
      }
    }
  },
  plugins: [],
}
