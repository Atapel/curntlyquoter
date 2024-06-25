import { defineConfig } from "vitest/config";
import path from "path";
export default defineConfig({
//   test: {
//     coverage: {
//       reporter: ['text', 'lcov'],
//       reportsDirectory: './coverage', // Specify the directory for coverage reports
//     },
//   },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app/"),
    },
  },
});
