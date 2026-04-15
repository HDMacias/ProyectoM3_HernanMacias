import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  server: {
    historyApiFallback: true,
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
