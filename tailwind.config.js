module.exports = {
  content: [
    './app/admin/**/*.{vue,ts,js,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false, // 禁止 tailwindcss 的默认样式
  },
}

