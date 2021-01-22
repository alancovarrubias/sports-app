import React from "react";
import Burger from "./BaseBurger";

const Emphatic = React.forwardRef(function Emphatic(props, ref) {
  const { size, barHeight, offset, isOpen, ...rest } = props;

  const isOpenOffset = 80 - size / 2 + barHeight / 2;

  const transformBarBottom = {
    height: barHeight,
    bottom: isOpen ? "unset" : offset,
    top: isOpen ? "-" + isOpenOffset + "px" : size - barHeight - offset,
    right: isOpen ? "-80px" : "0",
    transform: isOpen ? "translate3d(-80px, 80px, 0) rotate(-45deg)" : "none",
    transition: isOpen
      ? "right 0.125s ease-out, top 0.05s 0.125s linear, bottom 0.05s 0.125s linear, transform 0.125s 0.175s cubic-bezier(0.075, 0.82, 0.165, 1)"
      : "transform 0.125s cubic-bezier(0.6, 0.04, 0.98, 0.335), top 0.05s 0.125s linear, bottom 0.05s 0.125s linear,  right 0.125s 0.175s ease-in"
  };

  const transformBarTop = {
    height: barHeight,
    top: isOpen ? "-" + isOpenOffset + "px" : offset,
    left: isOpen ? "-80px" : "0",
    transform: isOpen ? "translate3d(80px, 80px, 0) rotate(45deg)" : "none",
    transition: isOpen
      ? "left 0.125s ease-out, top 0.05s 0.125s linear,transform 0.125s 0.175s cubic-bezier(0.075, 0.82, 0.165, 1)"
      : "transform 0.125s cubic-bezier(0.6, 0.04, 0.98, 0.335), top 0.05s 0.125s linear, left 0.125s 0.175s ease-in"
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
      variant="emphatic"
      isOpen={isOpen}
    />
  );
});
export default Emphatic;
