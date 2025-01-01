import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['esm'],
    dts: true,
    clean: true,
    target: 'node16',
    outDir: 'dist',
    platform: 'node',
    treeshake: true,
    noExternal: [],
    bundle: true,
    sourcemap: false,
  },
  {
    entry: {
      plugin: 'src/plugin.ts',
    },
    format: ['esm'],
    external: ['vite', 'typescript', 'fs', 'path'],
    dts: true,
    clean: false,
    target: 'es2020',
    outDir: 'dist',
    platform: 'browser',
    treeshake: true,
    noExternal: [],
    bundle: true,
    sourcemap: false,
  }
])