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
    THEME_COLOR_SECONDARY: process.env.THEME_COLOR_SECONDARY || "#424242",

  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      loader: "svg-react-loader",
    });
    config.module.rules.push({
      test: /\.md$/,
      use: ["@catalog/loader", "raw-loader"],
    });

    config.node = {
      fs: "empty",
    };

    return config;
  },
};
