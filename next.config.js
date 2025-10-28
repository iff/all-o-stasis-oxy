module.exports = {
  compiler: {
    styledComponents: true,
  },

env: {
    DATABASE_URL: process.env.DATABASE_URL || "http://localhost:8000",
  },
};
