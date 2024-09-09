import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: false,
  plugins: [
    react({
      babelrc: false,
      configFile: false,
      babel: {
        plugins: [
          "@babel/plugin-syntax-jsx",
          "@babel/plugin-transform-react-jsx",
          ["@babel/plugin-proposal-decorators", { version: "2023-11" }],
        ],
      },
    }),
  ],
});
