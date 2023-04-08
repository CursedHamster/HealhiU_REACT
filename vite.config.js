import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    server: {
      proxy: {
        '/chat-messaging': {
          target: 'http://localhost:8080',
          ws: true
        }
      }
    }
  },
});
