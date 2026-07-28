import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["index.ts"],
  format: ["esm"],
  target: "node20",
  clean: true,
  dts: false,
  minify: true,
  splitting: false,
  sourcemap: false,
  treeshake: true,
  loader: { ".tsx": "tsx" },
  external: ["conf"],
});
