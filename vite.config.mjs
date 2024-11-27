import { fileURLToPath, URL } from "node:url";
import autoprefixer from "autoprefixer";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "~uswds": path.resolve(__dirname, "./node_modules/@uswds/uswds"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ["./node_modules/@uswds/uswds/packages"],
      },
    },
    postcss: {
      plugins: [autoprefixer],
    },
  },
});
