import "styled-components";
import { colorTypes, fontTypes } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: colorTypes;
    fonts: fontTypes;
  }
}
