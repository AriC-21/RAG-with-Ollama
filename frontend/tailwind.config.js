/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'header-blue': 'rgb(37, 150, 190)',
      },
    },
  },
  variants: {},
  plugins: [],
};
