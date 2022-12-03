import { styled } from "..";
import { FiShoppingCart } from "react-icons/fi";

export const Container = styled("div", {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  minHeight: "100vh",
  overflowX: "hidden",

  "@mobile": {
    justifyContent: "flex-start",
  },
});

export const Header = styled("header", {
  padding: "2rem 1rem",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  "@mobile": {
    width: "90%",
  },
});

export const CartIconContainer = styled("button", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 52,
  height: 52,
  background: "$gray800",
  borderRadius: 6,
  cursor: "pointer",

  "&:hover": {
    filter: "brightness(1.2)",
  },
});

export const CartIcon = styled(FiShoppingCart, {});
