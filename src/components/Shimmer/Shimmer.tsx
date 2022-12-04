import { keyframes, styled } from "@styles/index";

const shimmer = keyframes({
  "0%": { backgroundPosition: "0% 0%" },
  "100%": { backgroundPosition: "-135% 0%" },
});

export default styled("div", {
  backgroundImage:
    "linear-gradient(-90deg,#333637 0%,#1c1e1f 50%,#333637 100%)",
  backgroundSize: "400% 400%",
  animation: `${shimmer} 1.2s ease-in-out infinite`,
});
