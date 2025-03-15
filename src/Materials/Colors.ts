export const primary = process.env.THEME_COLOR_PRIMARY!;
export const primaryText = process.env.THEME_COLOR_PRIMARY_TEXT!;

export const secondary = process.env.THEME_COLOR_SECONDARY!;
export const secondaryText = "#FFFFFF";

// ----------------------------------------------------------------------------
export const white = "#FFFFFF";
export const lightGrey = "#999999";
export const darkGrey = "#444444";
export const text = "#222222";
export const black = "#000000";

// ----------------------------------------------------------------------------
export const yellow100 = "#F3D53F";
export const yellowColors = [{ name: "100", value: yellow100 }];

// ----------------------------------------------------------------------------
export const green100 = "#27AE60";
export const greenColors = [{ name: "100", value: green100 }];

// ----------------------------------------------------------------------------
export const orange100 = "#E89C2F";
export const orangeColors = [{ name: "100", value: orange100 }];

// ----------------------------------------------------------------------------
export const blue100 = "#1B69D2";
export const blueColors = [{ name: "100", value: blue100 }];

// ----------------------------------------------------------------------------
export const red100 = "#FF0000";
export const redColors = [{ name: "100", value: red100 }];

// ----------------------------------------------------------------------------

export const gradeBackgroundColor = (grade: string) => {
  switch (grade) {
    case "yellow":
      return yellow100;
    case "green":
      return green100;
    case "orange":
      return orange100;
    case "blue":
      return blue100;
    case "red":
      return red100;
    case "white":
      return "white";
    case "black":
      return "black";
  }

  return "magenta";
};

export const gradeBorderColor = (grade: string) => {
  switch (grade) {
    case "yellow":
      return yellow100;
    case "green":
      return green100;
    case "orange":
      return orange100;
    case "blue":
      return blue100;
    case "red":
      return red100;
    case "white":
      return "black";
    case "black":
      return "black";
  }

  return "magenta";
};

export const gradeColor = (grade: string) => {
  switch (grade) {
    case "yellow":
      return "black";
    case "green":
      return "white";
    case "orange":
      return "black";
    case "blue":
      return "white";
    case "red":
      return "white";
    case "white":
      return "black";
    case "black":
      return "white";
  }

  return "magenta";
};
