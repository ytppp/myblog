import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import RubyPlugin from 'vite-plugin-ruby'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    RubyPlugin(),
    vue(),
    // 配置自动按需加载
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false,
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './app/admin'),
      '#': resolve(__dirname, './types')
    }
  }
})
