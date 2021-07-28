import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
        '/api': {
            // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
            target: 'http://localhost:1234/',
            // 允许跨域
            
            changeOrigin: true,
            rewrite: path => path.replace(/^\/api/, '')
        }
    }
  }
})
