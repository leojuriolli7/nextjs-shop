import { styled } from "..";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  minHeight: "100vh",

  "@media(max-width: 965px)": {
    justifyContent: "flex-start",
  },
});

export const Header = styled("header", {
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",
  paddingLeft: 5,

  "@media(max-width: 965px)": {
    width: "90%",
  },
});
