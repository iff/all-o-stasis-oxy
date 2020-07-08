module.exports = {
  typescript: {
    ignoreDevErrors: true,
    ignoreBuildErrors: true,
  },

  env: {
    DATABASE_URL: process.env.DATABASE_URL || "http://localhost:8000",
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@boulder.app",
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

    return config;
  },
};
