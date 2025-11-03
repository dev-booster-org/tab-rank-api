import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/server.ts'],
  outDir: 'dist',
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: false,
  target: 'node18',
  format: ['esm', 'cjs'],
  dts: true,
  shims: false,
  watch: process.env.NODE_ENV === 'development',
})
