import React from "react";
import cx from "classnames";

import Type from "./_type.module.css";
import View from "./_view.module.css";
import Color from "../../../styles/color.module.css";

const Burger = React.forwardRef(function Burger(props, ref) {
  const {
    type = "default",
    view = "flat",
    color = "default",
    size,
    rounded = true,
    variant,
    transformBarBottom,
    transformBarTop,
    barHeight,
    isOpen = false,
    setOpen,
    className
  } = props;

  return (
    <div
      ref={ref}
      className={cx(
        Type["wrapper"],
        rounded && Type["round"],
        Type[type],
        View[view],
        Color[color],
        className
      )}
      onClick={setOpen && (() => setOpen(!isOpen))}
    >
      <div
        className={cx(
          Type["hamburger"],
          isOpen && Type["is-active"],
          Type["hamburger--" + variant]
        )}
        style={{ height: size + "px", width: size + "px" }}
      >
        <div className={Type["hamburger-bar"]} style={{ height: barHeight }} />
        <div className={Type["hamburger-bar--top"]} style={transformBarTop} />
        <div
          className={Type["hamburger-bar--bottom"]}
          style={transformBarBottom}
        />
      </div>
    </div>
  );
});

export default Burger;
