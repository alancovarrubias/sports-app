import React from "react";
import Burger from "./BaseBurger";

const Elastic = React.forwardRef(function Elastic(props, ref) {
  const { size, barHeight, offset, isOpen, ...rest } = props;

  const transformBarBottom = {
    height: barHeight,
    bottom: isOpen ? size / 2 - barHeight / 2 : offset,
    transform: isOpen ? "rotate(-135deg)" : "none",
    transitionDelay: "0.075s"
  };
  const transformBarTop = {
    height: barHeight,
    top: isOpen ? size / 2 - barHeight / 2 : offset,
    transform: isOpen ? "rotate(135deg)" : "none",
    transitionDelay: "0.075s"
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
      variant="elastic"
      isOpen={isOpen}
    />
  );
});
export default Elastic;
