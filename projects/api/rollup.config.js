import path from "path";

import alias from "@rollup/plugin-alias";
import typescript from "@rollup/plugin-typescript";
import resolve from "rollup-plugin-node-resolve";

const rootDir = "src";
const outDir = "dist";

const config = {
  treeshake: {
    preset: "smallest",
    propertyReadSideEffects: true,
  },
  plugins: [
    resolve(),
    alias({ entries: { "~": path.resolve(__dirname, rootDir) } }),
    typescript({ tsconfig: "./tsconfig.json" }),
  ],
  input: path.join(__dirname, rootDir, "index.ts"),
  output: [
    {
      dir: outDir,
    },
  ],
};

export default config;
