/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  mode: 'jit',
  purge: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        bgPrimary: '#f8fafc', //slate-50
        bgSecondary: '#f1f5f9', //slate-100
        bgAccent: '#d1fae5', //emerald-100
        primary: '#94a3b8', //slate-400
        secondary: '#64748b', //slate-500
        accent: '#10b981' //emerald-500
      },
    }
  },
  plugins: [],
}