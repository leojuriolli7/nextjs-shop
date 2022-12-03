import { styled } from "@styles/index";

export const Container = styled("div", {
  width: 90,
  height: 50,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "$gray800",
  color: "$white",
  borderRadius: 5,
});

export const Increment = styled("button", {
  width: 30,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  background: "$gray800",
  fontSize: "$md",
  color: "$white",
  borderTopRightRadius: 5,
  borderBottomRightRadius: 5,

  "&:disabled": {
    cursor: "not-allowed",
    opacity: "0.5",
  },
});

export const Decrement = styled(Increment, {
  border: 0,
  borderRadius: 0,
  borderTopLeftRadius: 5,
  borderBottomLeftRadius: 5,
});

export const Center = styled("div", {
  width: 30,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const ValueText = styled("p", {
  fontSize: "$md",
  userSelect: "none",
});
