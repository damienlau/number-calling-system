import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import VueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [Vue(), VueJsx()],
  server: {
    // hmr: { overlay: false },
    proxy: {
      "/dev-api": {
        target: "https://emergency-admin-dev.dottmed.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev-api/, ""),
      },
    },
  },
});
