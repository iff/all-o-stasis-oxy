export default {
  shape: {
    borderRadius: 4,
  },

  palette: {
    primary: {
      main: process.env.THEME_COLOR_PRIMARY!,
    },
    secondary: {
      main: process.env.THEME_COLOR_SECONDARY!,
    },
  },

  props: {
    MuiButton: {
      disableElevation: true,
    },
  },
};
