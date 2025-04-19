import type { KnipConfig } from "knip";

const config: KnipConfig = {
  // Too many issues with these rules to have them enabled at this time
  exclude: ["exports", "types", "duplicates"],

  ignore: [
    // These files are treated as static assets.
    "static/**/*",
  ],

  ignoreDependencies: [
    // next.config.js
    "@babel/core",

    // tslint.json
    "tslint-config-prettier",

    // vega
    "react-vega",
    "react-vega-lite",
    "vega",
    "vega-lite",
  ],
};

export default config;
