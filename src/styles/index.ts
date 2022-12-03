import { createStitches } from "@stitches/react";

export const {
  config,
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
} = createStitches({
  theme: {
    colors: {
      white: "#FFF",

      gray900: "#121214",
      gray800: "#202024",
      gray300: "#c4c4cc",
      gray100: "#e1e1e6",

      green500: "#00875F",
      green300: "#00b37e",
      green100: "#1ea483",

      purple500: "#7465d4",
    },
    fontSizes: {
      md: "1.125rem",
      lg: "1.25rem",
      xl: "1.5rem",
      xxl: "2rem",
    },
  },

  media: {
    mobile: "(max-width: 965px)",
  },
});
