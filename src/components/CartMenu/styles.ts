import { keyframes, styled } from "@styles/index";
import { IoCloseSharp } from "react-icons/io5";

const open = keyframes({
  "0%": { width: 0 },
  "100%": { width: 500 },
});

const mobileOpen = keyframes({
  "0%": { width: 0 },
  "100%": { width: "100vw" },
});

const close = keyframes({
  "0%": { width: 500 },
  "100%": { width: 0, display: "none" },
});

const mobileClose = keyframes({
  "0%": { width: "100vw" },
  "100%": { width: 0, display: "none" },
});

export const Container = styled("div", {
  position: "absolute",
  right: 0,
  width: 0,
  height: "100%",
  background: "$gray800",
  zIndex: 100,
  overflowX: "hidden",
  boxShadow: "-4px 0px 30px rgba(0, 0, 0, 0.8)",

  variants: {
    isVisible: {
      open: {
        animation: `${open} 600ms`,
        width: 500,

        "@media(max-width: 650px)": {
          animation: `${mobileOpen} 600ms`,
          width: "100vw",
        },
      },

      closed: {
        animation: `${close} 600ms`,
        width: 0,

        "@media(max-width: 650px)": {
          animation: `${mobileClose} 600ms`,
        },
      },
    },
  },
});

export const ImageContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 100,
  height: 93,
  background: "linear-gradient(180deg, $green500 0%, $purple500 100%)",
  borderRadius: 8,
});

export const Content = styled("div", {
  position: "relative",
  padding: "5rem 3rem 2rem 3rem",
  minWidth: 500,

  "@media(max-width: 650px)": {
    minWidth: "100vw",
  },
});

export const CloseIcon = styled(IoCloseSharp, {
  position: "absolute",
  top: 25,
  right: 25,
  cursor: "pointer",
});

export const Title = styled("h2", {
  fontSize: "$xxl",
  color: "$gray300",
  fontWeight: "bold",
});

export const ProductsList = styled("div", {
  marginTop: 32,
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 24,
  maxHeight: "calc(100vh - 8rem - 245px)",
  overflowY: "auto",
  overflowX: "hidden",

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

export const Product = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 20,
});

export const TextSection = styled("div", {
  display: "flex",
  flexDirection: "column",
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

export const Price = styled("p", {
  fontSize: "lg",
  color: "$gray100",
  fontWeight: "bold",
  marginTop: 10,
});

export const Remove = styled("p", {
  fontSize: "md",
  color: "$green500",
  fontWeight: "bold",
  marginTop: 10,
  cursor: "pointer",

  "&:hover": {
    color: "$green300",
  },
});

export const TotalContainer = styled("div", {
  width: "100%",
  marginTop: 40,
});

export const TotalTextContainer = styled("div", {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const TotalQuantity = styled("p", {
  fontSize: "$md",
  color: "$gray100",
});

export const FullPriceLabel = styled("p", {
  color: "$gray100",
  fontWeight: "bold",
  fontSize: "$lg",
});

export const FullPrice = styled("p", {
  color: "$gray100",
  fontWeight: "bold",
  fontSize: "$xxl",
});

export const NoItemsMessage = styled("p", {
  marginTop: 10,
  color: "$gray100",
  fontSize: "$md",
});

export const BuyButton = styled("button", {
  marginTop: 40,
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
