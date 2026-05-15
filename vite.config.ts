import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Client-side SPA configured for GitHub Pages deployment under /shader-glow/.
export default defineConfig({
  base: process.env.GITHUB_PAGES ? "/shader-glow/" : "/",
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  server: {
    host: "::",
    port: 8080,
  },
});
