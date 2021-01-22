import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import { ButtonGroup as ButtonGroupSource } from "@blueprintjs/core";
import Button from "../Button";

import Type from "./_type.module.css";
import View from "./_view.module.css";
import Color from "../../styles/color.module.css";

import { ThemeContext } from "../ThemeContext";

/** 
  __Component 'ButtonGroup'__
**/

const ButtonGroup = React.forwardRef(function ButtonGroup(props, ref) {
  const {
    type = "default",
    view = "flat",
    color = "default",
    className,
    right,
    data,
    ...restProps
  } = props;

  return (
    <ThemeContext.Consumer>
      {({ isDark }) => (
        <ButtonGroupSource
          ref={ref}
          {...restProps}
          className={cx(
            Type[type],
            right && Type["right"],
            isDark ? View[view + "-dark"] : View[view],
            Color[color],
            className
          )}
        >
          {data.map((item, i) => (
            <Button
              dense={type === "dense"}
              color={color}
              key={item.id}
              text={item.text && item.text}
              icon={item.icon && item.icon}
              rightIcon={item.rightIcon && item.rightIcon}
              active={item.isActive}
              onClick={item.onClick}
            />
          ))}
        </ButtonGroupSource>
      )}
    </ThemeContext.Consumer>
  );
});

ButtonGroup.propTypes = {
  /**
   `The type of the component.
   * Variants: `default` `dense`
   * Default value (if undefined): `default` `
   */
  type: PropTypes.oneOf(["default", "dense"]),
  /**
   ` The view of the component.
   * Variants: `flat` `smooth` `outlined` `raised`
   * Default value (if undefined): `filled` `
   */
  view: PropTypes.oneOf(["filled", "flat", "smooth", "outlined", "raised"]),
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
   * Click event handler.
   */
  onClick: PropTypes.func,
  /**
   * Whether this component should expand to fill its container.
   */
  fill: PropTypes.bool,
  /**
   * Name of a Blueprint UI icon (or an icon element) to render before the text.
   */
  icon: PropTypes.any,
  /**
   * Name of a Blueprint UI icon (or an icon element) to render after the text.
   */
  rightIcon: PropTypes.any
};

export default ButtonGroup;
