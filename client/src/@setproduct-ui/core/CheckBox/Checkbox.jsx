import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import { Checkbox as CheckboxSource } from "@blueprintjs/core";

import Type from "./_type.module.css";
import View from "./_view.module.css";
import Color from "../../styles/color.module.css";
import { ThemeContext } from "../ThemeContext";

/** 
  __Component 'Checkbox'__
**/

const Checkbox = React.forwardRef(function Checkbox(props, ref) {
  const {
    type = "def",
    view = "flat",
    color = "default",
    checked,
    indeterminate,
    label,
    margin,
    disabled,
    helperText,
    fill = false,
    rtl,
    right = false,
    className,
    ...restProps
  } = props;

  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <div
          className={cx(
            Type["container"],
            View["container"],
            checked && View["checked"],
            disabled && View["disabled"],
            fill && Type["fill"],
            Color[color]
          )}
          style={margin && { margin: margin }}
        >
          <CheckboxSource
            {...restProps}
            ref={ref}
            className={cx(
              Type[type],
              View[view],
              Color[color],
              checked && Type["checked"],
              checked && View["checked"],
              disabled && View["disabled"],
              helperText && Type["with_helper"],
              rtl && Type["rtl"],
              right && Type["right"],
              indeterminate && View["indeterminate"],
              type === "def" && Type["large"],
              className
            )}
            checked={checked ? true : false}
            indeterminate={indeterminate ? true : false}
            disabled={disabled}
            alignIndicator={right && "right"}
          >
            <div className={cx(Type["box_layout"], View["box_layout"])} />
            <div
              className={cx(
                helperText && Type["helperBox"],
                disabled && View["disabled"],
                Type["text"]
              )}
            >
              {label}
              {helperText && (
                <div className={cx(Type["helperText"], View["helperText"])}>
                  {helperText}
                </div>
              )}
            </div>
          </CheckboxSource>
        </div>
      )}
    </ThemeContext.Consumer>
  );
});

Checkbox.propTypes = {
  /**
   `The type of the component.
   * Variants: `dense`
   * Default value (if undefined): `def` `
   */
  type: PropTypes.oneOf(["def", "dense"]),
  /**
   ` The view of the component.
   * Variants: `flat` `smooth` `outlined` `raised`
   * Default value (if undefined): `flat` `
   */
  view: PropTypes.oneOf(["flat", "smooth", "outlined", "raised"]),
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
   * Whether the control is checked.
   */
  checked: PropTypes.bool,
  /**
   * Text label for the control. This prop actually supports JSX elements.
   */
  label: PropTypes.string,
  /**
   * If `true`, the component will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Whether this checkbox is indeterminate
   */
  indeterminate: PropTypes.bool,
  /**
   * Second line text
   */
  helperText: PropTypes.string,
  /**
   * RTL text
   */
  rtl: PropTypes.bool,
  /**
   * Alignment of the indicator within container.
   */
  right: PropTypes.bool,
  /**
   * Whether this component should expand to fill its container.
   */
  fill: PropTypes.bool,
  /**
   * Event handler invoked when input value is changed.
   */
  onChange: PropTypes.func
};

export default Checkbox;
