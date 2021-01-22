import React from "react";
import Burger from "./BaseBurger";

const Spin = React.forwardRef(function Spin(props, ref) {
  const { size, barHeight, offset, isOpen, ...rest } = props;

  const transformBarBottom = {
    height: barHeight,
    bottom: isOpen ? size / 2 - barHeight / 2 : offset,
    transform: isOpen ? "rotate(135deg)" : "none",
    transition: isOpen
      ? "bottom 0.1s ease-out, transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s"
      : "bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19)"
  };
  const transformBarTop = {
    height: barHeight,
    top: isOpen ? size / 2 - barHeight / 2 : offset,
    transform: isOpen ? "rotate(225deg)" : "none",
    transition: isOpen
      ? "top 0.1s ease-out, transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s"
      : "top 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19)"
  };

  return (
    <Burger
      {...rest}
      ref={ref}
      transformBarBottom={transformBarBottom}
      transformBarTop={transformBarTop}
      size={size}
      offset={offset}
      barHeight={barHeight}
      variant="spin"
      isOpen={isOpen}
    />
  );
});
export default Spin;
