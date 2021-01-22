import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import { Switch as SwitchSource } from "@blueprintjs/core";

import Type from "./_type.module.css";
import View from "./_view.module.css";
import Color from "../../styles/color.module.css";
import { ThemeContext } from "../ThemeContext";

const Switch = React.forwardRef(function Switch(props, ref) {
  const {
    type = "def",
    view = "flat",
    color = "default",
    checked,
    inline,
    helperText,
    disabled,
    margin,
    label,
    rtl,
    leftPosition,
    fill,
    className,
    iStyle,
    ...rest
  } = props;
  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <div
          className={cx(
            Type["container"],
            inline && Type["inline"],
            helperText && Type["helperText"],
            fill && Type["fill"],
            View["container"],
            checked && View["checked"],
            Type[type],
            iStyle && Type["i-style"],
            View[view],
            Color[color],
            helperText && Type["with_helper"],
            leftPosition && Type["leftPosition"],
            disabled && View["disabled"]
          )}
          style={margin && { margin: margin }}
        >
          <SwitchSource
            {...rest}
            ref={ref}
            className={cx(Color[color], rtl && Type["rtl"], className)}
            defaultChecked={checked}
            large={type === "def" ? true : false}
            disabled={disabled}
          >
            <div className={cx(helperText && Type["helperBox"], Type["text"])}>
              {label}
              {helperText && (
                <div
                  className={cx(
                    type === "def"
                      ? Type["helperText"]
                      : Type["helperText--dense"],
                    View["helperText"]
                  )}
                >
                  {helperText}
                </div>
              )}
            </div>
          </SwitchSource>
        </div>
      )}
    </ThemeContext.Consumer>
  );
});

Switch.propTypes = {
  /**
   `The type of the component.
   * Variants: `dense`
   * Default value (if undefined): `def` `
   */
  type: PropTypes.oneOf(["def", "dense"]),
  /**
   ` The view of the component.
   * Variants: `flat` `smooth` `outlined` 
   * Default value (if undefined): `flat` `
   */
  view: PropTypes.oneOf(["flat", "smooth", "outlined"]),
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
   *Whether the control is checked.
   */
  checked: PropTypes.bool,
  /**
   * Text label for the control.
   */
  label: PropTypes.string,
  /**
   * Whether the control is non-interactive.
   */
  disabled: PropTypes.bool,
  /**
   * Second line Helper Text
   */
  helperText: PropTypes.string,
  /**
   * RTL text style
   */
  rtl: PropTypes.bool,
  /**
   * Whether this component should expand to fill its container.
   */
  fill: PropTypes.bool,
  /**
   * Set left text position
   */
  leftPosition: PropTypes.bool,
  /**
   * Event handler invoked when input value is changed.
   */
  onChange: PropTypes.func
};

export default Switch;
