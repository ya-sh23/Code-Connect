import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "droughtier-impracticable-vanessa.ngrok-free.dev", // 👈 your ngrok host
    ],
  },
});
