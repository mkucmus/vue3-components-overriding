import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": "./src",
      "@shopware/components": "./src",
    },
  },
  plugins: [vue()],
  build: {
    minify: false,
    lib: {
      formats: ["es"],
      entry: "src/index.ts",
      name: "components",
      fileName: (format) => `components.${format}.js`,
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
