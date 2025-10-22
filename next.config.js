module.exports = {
  compiler: {
    styledComponents: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  env: {
    DATABASE_URL: process.env.DATABASE_URL || "http://localhost:8000",
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@boulder.app",
  },
};
