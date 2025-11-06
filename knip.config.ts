import type { KnipConfig } from "knip";

const config: KnipConfig = {
  // Too many issues with these rules to have them enabled at this time
  exclude: ["exports", "types", "duplicates"],

  ignore: [
    // These files are treated as static assets.
    "static/**/*",
  ],

  ignoreBinaries: ["biome"],

  ignoreDependencies: ["prop-types"],
};

export default config;
