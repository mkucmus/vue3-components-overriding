import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    lib: {
      formats: ["es"],
      entry: "src/index.ts",
      name: "vue-cms-base-plugin",
      fileName: (format) => `vue-cms-base-plugin.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // Add external deps here
        globals: {
          vue: "Vue",
        },
      },
    },
    emptyOutDir: false,
  },
});
