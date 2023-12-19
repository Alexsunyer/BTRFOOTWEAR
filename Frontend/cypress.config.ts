import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1536,
  viewportHeight: 703,
  scrollBehavior: false,
  e2e: {
    baseUrl: "http://localhost:3000",
  },
});
