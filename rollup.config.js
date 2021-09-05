import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: "src/index.js",
  output: {
    file: "build/build.js",
    format: "es"
  },
  plugins: [nodeResolve()]
};
