/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f5ff',
          100: '#e0ebfe',
          500: '#4361ee',
          600: '#3a4be0',
          700: '#3a0ca3',
          800: '#2f0682',
          900: '#1f0454',
        },
      },
      fontFamily: {
        sans: ['Noto Sans SC', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 