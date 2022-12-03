import { styled } from "..";

export const HomeContainer = styled("main", {
  display: "flex",
  width: "100%",
  maxWidth: "calc(100vw - ((100vw - 1180px)/2))",
  marginLeft: "auto",
  minHeight: "656px",
  paddingRight: 20,

  "@media(max-width: 1215px)": {
    paddingLeft: 20,
  },

  "@media(max-width: 965px)": {
    padding: 0,
    width: "90%",
    margin: "0 auto",
  },

  "@media(max-width: 400px)": {
    minHeight: "initial",
    height: "fit-content",
    maxHeight: "-webkit-fill-available",
  },
});

export const SliderContainer = styled("div", {
  width: "100%",
});

export const Product = styled("div", {
  background: "linear-gradient(180deg, $green500 0%, $purple500 100%)",
  borderRadius: 8,
  cursor: "pointer",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  height: "100%",

  img: {
    objectFit: "cover",
  },

  "&:hover": {
    footer: {
      transform: "translateY(0%)",
      opacity: 1,
    },
  },

  "@media(max-width: 965px)": {
    footer: {
      transform: "translateY(0%)",
      opacity: 1,
    },
  },
});

export const Footer = styled("footer", {
  position: "absolute",
  bottom: "0.25rem",
  left: "0.25rem",
  right: "0.25rem",
  padding: "2rem",
  borderRadius: 6,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "rgba(0,0,0,0.6)",
  transform: "translateY(110%)",
  opacity: 0,
  transition: "all 0.2s ease-in-out",
  maxHeight: 89,
});

export const ProductName = styled("strong", {
  fontSize: "$lg",
  color: "$gray100",
  marginRight: 5,
});

export const ProductPrice = styled("span", {
  fontSize: "$xxl",
  fontWeight: "bold",
  color: "$green300",
});
