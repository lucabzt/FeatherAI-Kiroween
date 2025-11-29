/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'feather-blue': '#0357c1',
        'feather-cyan': '#22c4e0',
        'feather-pink': '#be3389',
        'feather-orange': '#dfa987',
      },
    },
  },
  plugins: [],
}
