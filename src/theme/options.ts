import { ThemeColorPrimary, ThemeColorSecondary } from "../../static/index";

export default {
  shape: {
    borderRadius: 4,
  },

  palette: {
    primary: {
      main: ThemeColorPrimary,
    },
    secondary: {
      main: ThemeColorSecondary,
    },
  },

  props: {
    MuiButton: {
      disableElevation: true,
    },
  },
};
