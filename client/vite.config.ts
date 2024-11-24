import path from "path"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  test: { 
    environment : 'jsdom' , 
    globals : true , 
    setupFiles : './src/tests/setup.ts' ,
   } ,
  server: {
    watch: {
      usePolling: true,
    },
    port: 80,
    host: '0.0.0.0',
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
