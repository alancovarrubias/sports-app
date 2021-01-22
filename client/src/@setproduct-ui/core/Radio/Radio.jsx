import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import { Radio as RadioSource } from "@blueprintjs/core";

import Type from "./_type.module.css";
import View from "./_view.module.css";
import Color from "../../styles/color.module.css";
import { ThemeContext } from "../ThemeContext";

const Radio = React.forwardRef(function Radio(props, ref) {
  const {
    type = "def",
    view = "flat",
    color = "default",
    large,
    checked,
    inline,
    disabled,
    helperText,
    leftPosition,
    rtl,
    fill,
    style,
    label,
    className,
    ...restProps
  } = props;

  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <div
          className={cx(
            Type["container"],
            Type[type],
            inline && Type["inline"],
            View[view],
            checked && View["checked"],
            Color[color],
            helperText && Type["with_helper"],
            leftPosition && Type["leftPosition"],
            disabled && View["disabled"],
            fill && Type["fill"]
          )}
          style={style && style}
        >
          <RadioSource
            {...restProps}
            ref={ref}
            className={cx(
              Color[color],
              helperText && Type["helperText"],
              rtl && Type["rtl"],
              className
            )}
            checked={checked ? true : false}
            large={type === "def" ? true : false}
            disabled={disabled}
          >
            <div className={cx(helperText && Type["helperBox"], Type["text"])}>
              {label}
              {helperText && (
                <div className={cx(Type["helperText"], View["helperText"])}>
                  {helperText}
                </div>
              )}
            </div>
          </RadioSource>
        </div>
      )}
    </ThemeContext.Consumer>
  );
});

Radio.propTypes = {
  /**
   `The type of the component.
   * Variants: `def` `dense` 
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
   * Variants: `default` `primary` `warning` `danger` `success` `primaryAlt` `warningAlt` `dangerAlt` `successAlt`
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
   * Value of this option.
   */
  value: PropTypes.string,
  /**
   * Label text for this option. If omitted, value is used as the label.
   */
  label: PropTypes.string,
  /**
   * Whether this option is non-interactive.
   */
  disabled: PropTypes.bool,
  /**
   * Whether the radio buttons are to be displayed inline horizontally.
   */
  inline: PropTypes.bool,
  /**
   * Second line Helper Text
   */
  helperText: PropTypes.string,
  /**
   * RTL text
   */
  rtl: PropTypes.bool,
  /**
   * Fill container
   */
  fill: PropTypes.bool,
  /**
   * Left text position
   */
  left: PropTypes.bool,
  /**
   * Whether the control is checked.
   */
  checked: PropTypes.bool,
  /**
   * Event handler invoked when input value is changed.
   */
  onChange: PropTypes.func,
  /**
   * Event handler invoked when input is clicked
   */
  onClick: PropTypes.func
};

export default Radio;
