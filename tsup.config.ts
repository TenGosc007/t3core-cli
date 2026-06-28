import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["index.ts"],
  format: ["esm"],
  target: "node16",
  clean: true,
  dts: false,
  minify: true,
  splitting: false,
  sourcemap: false,
  loader: { ".tsx": "tsx" },
});
