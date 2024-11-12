import { DefaultTheme } from "styled-components";

const colors = {
  header: "#54473f",
  brown: "#9b7d6f",
  fontGray: "#8d8d8d",
  fontLightGray: "#aaacb0",
  fontBrown: "#9c847a",
  lightGreen: "#cad1a3",
  buttonGray: "#e0e2e5",
};
const fonts = {
  xl: "2rem",
  lg: "1.5rem",
  md: "1.2rem",
  sm: "1rem",
};

export type colorTypes = typeof colors;
export type fontTypes = typeof fonts;

export const theme: DefaultTheme = {
  colors,
  fonts,
};

