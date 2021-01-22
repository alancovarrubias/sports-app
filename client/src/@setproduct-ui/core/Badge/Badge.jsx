import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import Type from "./badge.module.css";
import View from "./view.module.css";
import Color from "../../styles/color.module.css";

const Badge = React.forwardRef(function Badge(props, ref) {
  const {
    Component = "span",
    value = "",
    view = "filled",
    color = "primary",
    dense = false,
    dot = false,
    hide = false,
    left = false,
    bottom = false,
    children,
    className,
    ...rest
  } = props;

  const badgeClasses = cx(
    dot ? Type["dot"] : dense ? Type["dense"] : Type["default"],
    left ? Type["left"] : Type["right"],
    bottom ? Type["bottom"] : Type["top"],
    hide ? Type["hide"] : Type["show"],
    View[view],
    Color[color]
  );

  return (
    <Component {...rest} className={cx(Type["container"], className)}>
      {children}
      <span ref={ref} className={badgeClasses}>
        {!dot && value}
      </span>
    </Component>
  );
});

Badge.propTypes = {
  Component: PropTypes.string,
  value: PropTypes.string,
  /**
   ` The view of the component.
   * Variants: `flat` `smooth` `outlined` `raised`
   * Default value (if undefined): `filled` `
   */
  view: PropTypes.oneOf(["filled", "smooth", "outlined"]),
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
   * Dense size
   */
  dense: PropTypes.bool,
  /**
   * Dot
   */
  dot: PropTypes.bool,
  /**
   * Hide badge
   */
  hide: PropTypes.bool,
  left: PropTypes.bool,
  botoom: PropTypes.bool
};

export default Badge;
