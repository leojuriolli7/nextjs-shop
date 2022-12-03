import { styled } from "..";

export const ProductContainer = styled("main", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "stretch",
  gap: "4rem",
  maxWidth: 1180,
  margin: "0 auto",
  width: "95%",

  "@mobile": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
    gap: "1rem",
    margin: 0,
    width: "100%",
  },
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

  "@mobile": {
    width: 300,
    height: 300,

    img: {
      width: "100%",
      height: "auto",
    },
  },
});

export const ProductDetails = styled("div", {
  display: "flex",
  flexDirection: "column",

  "@mobile": {
    width: "clamp(300px, 60%, 530px)",
  },
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

  "@mobile": {
    marginTop: 10,
  },
});

export const ProductDescription = styled("p", {
  marginTop: "2.5rem",
  fontSize: "$md",
  lineHeight: 1.6,
  color: "$grey300",

  "@mobile": {
    marginTop: 10,
  },
});

export const BottomSectionContainer = styled("div", {
  marginTop: "auto",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-end",
  gap: 10,

  "@mobile": {
    order: -1,
    marginBottom: 20,
    alignItems: "flex-start",
  },
});

export const BuyButton = styled("button", {
  backgroundColor: "$green500",
  border: 0,
  color: "$white",
  borderRadius: 8,
  padding: "1.25rem",
  fontWeight: "bold",
  fontSize: "$md",
  width: "100%",

  "&:hover": {
    filter: "brightness(1.1)",
  },

  "&:disabled": {
    filter: "opacity(0.6)",
    cursor: "not-allowed",
  },
});
