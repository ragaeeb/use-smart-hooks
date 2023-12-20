import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  base: "/use-smart-hooks/", // This should match the name of your GitHub repo.
});
