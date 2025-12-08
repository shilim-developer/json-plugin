import { defineConfig } from "@rspack/cli";
import { DefinePlugin, ProgressPlugin } from "@rspack/core";
import { resolve } from "path";

export default defineConfig({
  context: __dirname,
  entry: {
    index: "./src/index.ts",
  },
  output: {
    path: resolve(__dirname, "../../dist/backend"),
    module: true,
    chunkFormat: "module",
    library: {
      type: "modern-module",
    },
    chunkLoading: "import",
    workerChunkLoading: "import",
  },
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  resolve: {
    extensions: ["...", ".ts", ".tsx", ".jsx"],
  },
  devtool: "source-map",
  externalsType: "module-import",
  externalsPresets: {
    node: true,
  },
  optimization: {
    concatenateModules: true,
    avoidEntryIife: true,
    minimize: false,
  },
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            parser: {
              syntax: "typescript",
            },
          },
        },
        type: "javascript/auto",
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    new ProgressPlugin({
      prefix: "Naily",
    }),
  ],
});
