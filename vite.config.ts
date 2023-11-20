import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

export default ({ mode }) => {
  console.log('mode', loadEnv(mode, process.cwd()).VITE_BASE_URL)

  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          {
            axios: [['default', 'axios']],
          },
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 8080,
      open: true,
      https: false,
      proxy: {
        '/api': {
          target: '',
          changeOrigin: true,
          ws: true,
          rewrite: (path: string) => path.replace(/^\/api/, ''),
        },
      },
    },
    // 打包配置
    build: {
      rollupOptions: {
        output: {
          // ()=>import()形式加载的组件会自动分包，第三方插件需要手动分包
          manualChunks: {
            vue: ['vue', 'vue-router'],
            // 第三方组件库
          },
          // js css文件分离
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
  })
}
