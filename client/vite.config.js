import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    allowedHosts: [".trycloudflare.com"],
    hmr: {
      protocol: "wss",
      host: "junction-gratis-transmitted-audio.trycloudflare.com",
      clientPort: 443,
    },
  },
});
