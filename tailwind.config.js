/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './assets/styles/**/*.css',
    './src/*.{js,jsx,ts,tsx}',
    "./dist/**/*.{html,js}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
