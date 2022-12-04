import Link from "next/link";
import { styled } from "..";

export const SuccessContainer = styled("main", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: 656,
  margin: "0 auto",

  "@mobile": {
    justifyContent: "flex-start",
    height: "auto",
    paddingBottom: "2rem",
  },
});

export const Title = styled("h1", {
  fontSize: "$xxl",
  color: "$gray100",
});

export const ProductsList = styled("div", {
  width: "100%",
  maxHeight: "420px",
  overflowY: "auto",
  background: "$gray800",
  padding: "2rem",
  borderRadius: 20,
  marginTop: "2rem",

  "@mobile": {
    width: "auto",
  },

  variants: {
    numberOfItems: {
      single: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      multiple: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 24,

        "@mobile": {
          gridTemplateColumns: "1fr",
        },
      },
    },
  },

  "&::-webkit-scrollbar": {
    width: 6,
  },

  "&::-webkit-scrollbar-thumb": {
    borderRadius: 5,
    background: "$green500",
  },

  "&::-webkit-scrollbar-track": {
    background: "$gray800",
    borderRadius: 10,
  },
});

export const ImageContainer = styled("div", {
  width: "100%",
  maxWidth: 130,
  height: 130,
  background: "linear-gradient(180deg, $green500 0%, $purple500 100%)",
  borderRadius: 8,
  padding: "0.25rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },
});

export const Product = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: 20,
});

export const Name = styled("p", {
  fontSize: "$md",
  color: "$gray300",
});

export const Quantity = styled("span", {
  fontSize: "$sm",
  color: "$green300",
  fontWeight: "bold",
});

export const Description = styled("p", {
  fontSize: "$xl",
  color: "$gray300",
  maxWidth: 560,
  textAlign: "center",
  lineHeight: 1.4,
  marginTop: "2rem",

  "@mobile": {
    margin: "2rem 1rem 0 1rem",
    fontSize: "$lg",
  },
});

export const Highlight = styled("strong", {});

export const BackToHome = styled(Link, {
  marginTop: "5rem",
  color: "$green500",
  fontSize: "$lg",
  textDecoration: "none",
  display: "block",
  fontWeight: "bold",

  "&:hover": {
    color: "$green300",
  },
});
