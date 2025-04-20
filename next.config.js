/*
 * Patch crypto createHash to not crash in modern Node.js environments, by
 * silently upgrading MD4 to MD5.
 *
 * This patch will no longer be needed once we upgrade Next.js and/or Webpack
 * to a sufficiently modern version.
 *
 * https://stackoverflow.com/a/72219174
 */
const crypto = require("crypto");
try {
  crypto.createHash("md4");
} catch (e) {
  const origCreateHash = crypto.createHash;
  crypto.createHash = (alg, opts) => {
    return origCreateHash(alg === "md4" ? "md5" : alg, opts);
  };
}

module.exports = {
  typescript: {
    ignoreDevErrors: true,
    ignoreBuildErrors: true,
  },

  env: {
    LOGO_URL: process.env.LOGO_URL || "/static/logo.svg",
    DATABASE_URL: process.env.DATABASE_URL || "http://localhost:8000",
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@boulder.app",

    // Theming
    THEME_COLOR_PRIMARY: process.env.THEME_COLOR_PRIMARY || "#a5d6a7",
    THEME_COLOR_PRIMARY_TEXT: process.env.THEME_COLOR_PRIMARY_TEXT || "#333333",
    THEME_COLOR_SECONDARY: process.env.THEME_COLOR_SECONDARY || "#424242",

  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    })

    return config;
  },
};
