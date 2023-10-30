import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import RubyPlugin from 'vite-plugin-ruby'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path'

function pathResolve(dir: string) {
  return resolve(__dirname, dir);
}

export default defineConfig({
  plugins: [
    RubyPlugin(),
    vue(),
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
      '@': pathResolve('app/frontend'),
      '#': pathResolve('app/frontend/types')
    }
  }
})

