/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        whitegrad: "#f1f1f1",
      }
    },
  },
  plugins: [],
  important: true
}
