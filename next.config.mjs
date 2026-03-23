import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const emptyMod = path.join(__dirname, "lib", "webpack-stubs", "empty-module.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(/^node:fs$/, emptyMod),
        new webpack.NormalModuleReplacementPlugin(/^node:https$/, emptyMod)
      );
    }
    return config;
  },
};

export default nextConfig;
