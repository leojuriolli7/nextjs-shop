import { globalCss } from ".";

export const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
  body: {
    backgroundColor: "$gray900",
    color: "$gray100",
    "-webkit-font-smoothing": "antialiased",
  },

  html: {
    "@media(max-width: 1080px)": {
      fontSize: "93.75%", // 15px
    },

    "@media(max-width: 720px)": {
      fontSize: "87.5%", // 14px
    },
  },

  "body, input, textarea, button": {
    fontFamily: "Roboto",
    fontWeight: 400,
  },

  button: {
    cursor: "pointer",
    border: 0,
  },
});
