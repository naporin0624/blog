import path from "path";

import alias from "@rollup/plugin-alias";
import dotenv from "rollup-plugin-dotenv";
import esbuild from "rollup-plugin-esbuild";
import resolve from "rollup-plugin-node-resolve";

const outDir = "dist";
const rootDir = "src";

const config = {
  treeshake: {
    preset: "smallest",
    propertyReadSideEffects: true,
  },
  plugins: [
    alias({
      customResolver: resolve({ extensions: [".ts"] }),
      entries: [
        {
          find: /~/,
          replacement: path.resolve(__dirname, "./src/"),
        },
      ],
    }),
    esbuild(),
    dotenv(),
  ],
  input: {
    index: path.join(__dirname, rootDir, "index.ts"),
  },
  output: [{ dir: outDir, format: "cjs", sourcemap: false }],
};

export default config;
