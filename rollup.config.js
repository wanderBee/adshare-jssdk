import typescript from "rollup-plugin-typescript";

export default {
  input: "./src/App.ts",
  output: {
    file: "dist/launchAd.js",
    name: "LaunchAd",
    format: "umd"
  },
  watch: {
    exclude: "node_modules/**"
  },
  plugins: [typescript()]
};
