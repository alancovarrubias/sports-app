import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import Type from "./_type.module.css";
import View from "./_view.module.css";
import Color from "../../styles/color.module.css";

import { ThemeContext } from "../ThemeContext";

/** 
  __Component 'Divider'__
**/

const Divider = React.forwardRef(function Divider(
  {
    color = "default",
    size = 2,
    colorStep = 5,
    className,
    vertical = false,
    style
  },
  ref
) {
  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <div
          ref={ref}
          className={cx(
            Type["default"],
            vertical && Type["vertical"],
            dark
              ? View["color" + colorStep + "-dark"]
              : View["color" + colorStep],
            Color[color],
            className && className
          )}
          style={
            !vertical
              ? { height: size + "px", ...style }
              : { width: size + "px", ...style }
          }
        />
      )}
    </ThemeContext.Consumer>
  );
});

Divider.propTypes = {
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
   ` The step of the component color from "0" to "100".
   * Default value (if undefined): `100` `
   */
  colorStep: PropTypes.oneOf([0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]),
  /**
   * Height of divider in px.
   */
  size: PropTypes.number,
  /**
   * Inline CSS style
   */
  style: PropTypes.object
};

export default Divider;
