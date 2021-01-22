import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import { Navbar as NavbarSource } from "@blueprintjs/core";

import Type from "./_type.module.css";
import View from "./_view.module.css";
import Color from "../../styles/color.module.css";

import { ThemeContext } from "../ThemeContext";

/** 
  __Component 'Navbar'__
**/

const Navbar = React.forwardRef(function Navbar(props, ref) {
  const {
    type = "desktop",
    view = "filled",
    color = "primary",
    children,
    className,
    ...restProps
  } = props;

  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <NavbarSource
          {...restProps}
          ref={ref}
          className={cx(
            Type[type],
            dark ? View[view + "-dark"] : View[view],
            Color[color],
            className
          )}
        >
          {children}
        </NavbarSource>
      )}
    </ThemeContext.Consumer>
  );
});

Navbar.propTypes = {
  /**
   `The type of the component.
   * Variants: `dense` `mobile`
   * Default value (if undefined): `desktop` `
   */
  type: PropTypes.oneOf(["desktop", "tablet", "mobile"]),
  /**
   ` The view of the component.
   * Variants: `raised`
   * Default value (if undefined): `filled` `flat` `smooth`
   */
  view: PropTypes.oneOf(["flat", "filled", "smooth", "raised"]),
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
  children: PropTypes.any.isRequired
};

export default Navbar;
