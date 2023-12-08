module.exports = {
  content: [
    './public/*.html',
    './app/components/*.html.erb',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,haml,html,slim}'
  ],
  theme: {
    extend: {
    },
  },
  plugins: [
  ],
  corePlugins: {
    preflight: false, // 禁止 tailwindcss 的默认样式
  }
}
