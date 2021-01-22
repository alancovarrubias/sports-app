import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import { Button } from "@blueprintjs/core";

import Type from "./_type.module.css";
import View from "./_view.module.css";
import Color from "../../styles/color.module.css";

import { ThemeContext } from "../ThemeContext";

/** 
  __Component 'Counter'__
**/

const Counter = React.forwardRef(function Counter(props, ref) {
  const {
    type = "default",
    view = "filled",
    leftColor = "default",
    rightColor = "default",
    leftIcon,
    rightIcon,
    value,
    active,
    dense,
    vertical,
    className,
    ...restProps
  } = props;

  const [newValue, setNewValue] = React.useState(value);

  function Increment() {
    setNewValue(newValue + 1);
  }

  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <div className={vertical ? Type["vertical"] : Type["horizontal"]}>
          <Button
            {...restProps}
            ref={ref}
            className={cx(
              Type[type],
              dense && Type["dense"],
              dark ? View[view + "-dark"] : View[view],
              Color[leftColor],
              active && View["focused"],
              className
            )}
            icon={leftIcon}
            onClick={() => Increment()}
          />
          <div
            className={cx(
              Type["value"],
              dense && Type["denseValue"],
              vertical && Type["verticalValue"]
            )}
          >
            {newValue}
          </div>
          <Button
            {...restProps}
            className={cx(
              Type[type],
              dense && Type["dense"],
              dark ? View[view + "-dark"] : View[view],
              Color[rightColor],
              active && View["focused"],
              className
            )}
            icon={rightIcon}
            onClick={() => setNewValue(newValue - 1)}
          />
        </div>
      )}
    </ThemeContext.Consumer>
  );
});

Counter.propTypes = {
  /**
   `The type of the component.
   * Variants: `square` `action` `fab` `icon`
   * Default value (if undefined): `default` `
   */
  type: PropTypes.oneOf(["default", "square", "action", "fab", "icon"]),
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
  rightIcon: PropTypes.any,
  /**
   * If set to `true`, the button will display a centered loading spinner instead of its contents.
   * The width of the button is not affected by the value of this prop.
   */
  loading: PropTypes.bool,
  /**
   * If `true`, the button will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Dense size
   */
  dense: PropTypes.bool
};

export default Counter;
