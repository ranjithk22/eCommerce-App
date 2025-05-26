import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // This code is accessing server without Cors issue
  server: {
    proxy: {
      api: "locoslhost:3000",
    },
  },
});
