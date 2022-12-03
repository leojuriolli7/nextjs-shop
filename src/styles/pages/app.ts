import { styled } from "..";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  minHeight: "100vh",

  "@mobile": {
    justifyContent: "flex-start",
    minHeight: "auto",
  },
});

export const Header = styled("header", {
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",
  paddingLeft: 5,

  "@mobile": {
    width: "90%",
  },
});
