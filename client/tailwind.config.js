/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')
    , require('@tailwindcss/typography')
  ],
  darkMode: 'class',
};
