import React from "react";
import Burger from "./BaseBurger";

const Slider = React.forwardRef(function Slider(props, ref) {
  const { size, barHeight, offset, isOpen, ...rest } = props;

  const transformBarBottom = {
    height: barHeight,
    bottom: offset,
    transform: isOpen
      ? "translate(0, -" +
        (size / 2 - offset - barHeight / 2) +
        "px) rotate(-45deg)"
      : "none"
  };
  const transformBarTop = {
    height: barHeight,
    top: offset,
    transform: isOpen
      ? "translate(0, " +
        (size / 2 - offset - barHeight / 2) +
        "px) rotate(45deg)"
      : "none"
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
      variant="slider"
      isOpen={isOpen}
    />
  );
});
export default Slider;
