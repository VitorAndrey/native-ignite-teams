import "styled-components";
import theme from "src/theme/theme";

declare module "styled-components" {
  type ThemeType = typeof theme;

  export interface DefaultTheme extends ThemeType {}
}
