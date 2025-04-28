import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/se_project_react/wtwr/",
  plugins: [react()],
  server: {
    port: 3000
  }
});
