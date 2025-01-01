import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { projectMetaPlugin } from 'vite-plugin-meta-data/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    projectMetaPlugin({
      path: 'src/pages',
      pattern: '**/*.{jsx,tsx}',
      output: 'src/project-meta/project-meta.ts'
    })
  ]
})

