import { styled } from "..";

export const ProductContainer = styled("main", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "stretch",
  gap: "4rem",
  maxWidth: 1180,
  margin: "0 auto",
});

export const ImageContainer = styled("div", {
  width: "100%",
  maxWidth: 576,
  height: 656,
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

export const ProductDetails = styled("div", {
  display: "flex",
  flexDirection: "column",
});

export const ProductTitle = styled("h1", {
  fontSize: "$xxl",
  color: "$gray300",
});

export const ProductPrice = styled("span", {
  marginTop: "1rem",
  display: "block",
  fontSize: "$xxl",
  color: "$green300",
});

export const ProductDescription = styled("p", {
  marginTop: "2.5rem",
  fontSize: "$md",
  lineHeight: 1.6,
  color: "$grey300",
});

export const BuyButton = styled("button", {
  marginTop: "auto",
  backgroundColor: "$green500",
  border: 0,
  color: "$white",
  borderRadius: 8,
  padding: "1.25rem",
  fontWeight: "bold",
  fontSize: "$md",

  "&:hover": {
    filter: "brightness(0.8)",
  },

  "&:disabled": {
    filter: "opacity(0.6)",
    cursor: "not-allowed",
  },
});
