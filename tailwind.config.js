/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/views/**/*.{html,html.erb,erb}',
    './app/frontend/**/*.{vue,ts,js,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

