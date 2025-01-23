import { defineConfig } from 'vite';
import dynamicImport from 'vite-plugin-dynamic-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dynamicImport({
      filter(id) {
        // Do not mess with showcase!
        if (id.includes('/assets')) {
          return false
        }
      }
    })
  ],
  build: {
    // Disables the preload.
    modulePreload: false,
  },
});