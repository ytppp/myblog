module.exports = {
  content: [
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/components/*.html.erb',
    './app/views/**/*.html.erb',
    './app/admin/**/*.{vue,ts,js,tsx}',
    './app/javascript/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false, // 禁止 tailwindcss 的默认样式
  },
}

