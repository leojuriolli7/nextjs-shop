import Link from "next/link";
import { styled } from "..";

export const SuccessContainer = styled("main", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: 656,
  margin: "0 auto",
});

export const ImageContainer = styled("div", {
  width: "100%",
  maxWidth: 130,
  height: 145,
  background: "linear-gradient(180deg, $green500 0%, $purple500 100%)",
  borderRadius: 8,
  padding: "0.25rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "4rem",

  img: {
    objectFit: "cover",
  },
});

export const Title = styled("h1", {
  fontSize: "$xxl",
  color: "$gray100",
});

export const Description = styled("p", {
  fontSize: "$xl",
  color: "$gray300",
  maxWidth: 560,
  textAlign: "center",
  lineHeight: 1.4,
  marginTop: "2rem",
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
