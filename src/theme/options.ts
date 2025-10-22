import gym from "../../static/index";

export default {
  shape: {
    borderRadius: 4,
  },

  palette: {
    primary: {
      main: gym.ThemeColorPrimary,
    },
    secondary: {
      main: gym.ThemeColorSecondary,
    },
  },

  props: {
    MuiButton: {
      disableElevation: true,
    },
  },
};
