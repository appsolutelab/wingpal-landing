import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/wingpal-landing/", // GitHub Pages
  plugins: [react()],
  build: { rollupOptions: { input: { it: "index.html", en: "en/index.html", privacy: "privacy/index.html", enPrivacy: "en/privacy/index.html" } } },
});
