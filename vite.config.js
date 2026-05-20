import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/cardapio/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        index:      resolve(__dirname, 'index.html'),
        login:      resolve(__dirname, 'login.html'),
        dashboard:  resolve(__dirname, 'pages/dashboard.html'),
        categorias: resolve(__dirname, 'pages/categorias.html'),
        pratos:     resolve(__dirname, 'pages/pratos.html'),
        cardapio:   resolve(__dirname, 'pages/cardapio.html'),
      }
    }
  }
})
