import React from "react";
import PropTypes from "prop-types";

import Slider from "./types/Slider";
import Squeeze from "./types/Squeeze";
import Elastic from "./types/Elastic";
import Emphatic from "./types/Emphatic";
import Spin from "./types/Spin";

const Hamburger = React.forwardRef(function Hamburger(props, ref) {
  const { variant, size = 48, ...rest } = props;

  const barHeight = Math.round(size / 12);
  const offset = barHeight * 1.5; //top and bottom bars offset

  const newProps = {
    size: size,
    offset: offset,
    barHeight: barHeight,
    ...rest
  };

  const Burger =
    variant === "squeeze" ? (
      <Squeeze {...newProps} ref={ref} />
    ) : variant === "elastic" ? (
      <Elastic {...newProps} ref={ref} />
    ) : variant === "emphatic" ? (
      <Emphatic {...newProps} ref={ref} />
    ) : variant === "spin" ? (
      <Spin {...newProps} ref={ref} />
    ) : (
      <Slider {...newProps} ref={ref} />
    );

  return Burger;
});

Hamburger.propTypes = {
  /**
   `The type of the component.
   * Variants:  `circle` 
   * Default value (if undefined): `default` `
   */
  type: PropTypes.oneOf(["default", "circle"]),
  /**
   ` The view of the component.
   * Variants: `flat` `smooth` `outlined` 
   * Default value (if undefined): `flat` `
   */
  view: PropTypes.oneOf(["filled", "flat", "smooth", "outlined"]),
  /**
  ` The color of the component.
   * Variants: `primary` `warning` `danger` `success` `primaryAlt` `warningAlt` `dangerAlt` `successAlt`
   * Default value (if undefined): `default` `
   */
  color: PropTypes.oneOf([
    "default",
    "primary",
    "warning",
    "danger",
    "success",
    "primary_alt",
    "warning_alt",
    "danger_alt",
    "success_alt"
  ]),
  /**
   * Open state
   */
  isOpen: PropTypes.bool,
  /**
   * Click event handler.
   */
  setOpen: PropTypes.func,
  /**
   * Size of the component in px.
   */
  size: PropTypes.number,
  rounded: PropTypes.bool,
  /**
   * This prop set animation variant of the component. Possible states:
   * squeeze | elastic | emphatic | spin | slider . Default state is `slider`.
   */
  variant: PropTypes.string,
  /**
   * If `true`, the button will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Dense size
   */
  dense: PropTypes.bool
};

export default Hamburger;
