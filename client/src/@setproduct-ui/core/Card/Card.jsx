import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import { Card as CardSource } from "@blueprintjs/core";

import Type from "./_type.module.css";
import View from "./_view.module.css";
import Color from "../../styles/color.module.css";

import { ThemeContext } from "../ThemeContext";

/** 
  __Component 'Card'__
**/

const Card = React.forwardRef(function Card(props, ref) {
  const {
    type = "def",
    view = "smooth",
    color = "default",
    children,
    className,
    ...restProps
  } = props;

  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <CardSource
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
        </CardSource>
      )}
    </ThemeContext.Consumer>
  );
});

Card.propTypes = {
  /**
   ` The view of the component.
   * Variants: `filled` smooth` `outlined` `raised`
   * Default value (if undefined): `smooth` `
   */
  view: PropTypes.oneOf(["filled", "smooth", "outlined", "raised"]),
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
   * Whether the card should respond to user interactions.
   * If set to true, hovering over the card will increase the card's elevation and change the mouse cursor to a pointer.
   */
  interactive: PropTypes.bool,
  /**
   * Callback invoked when the card is clicked.
   */
  onClick: PropTypes.func,

  children: PropTypes.any.isRequired
};

export default Card;
