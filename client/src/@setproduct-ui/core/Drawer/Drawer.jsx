import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import { Drawer as DrawerSource } from "@blueprintjs/core";

import Type from "./_type.module.css";
import View from "./_view.module.css";
import Color from "../../styles/color.module.css";

import { ThemeContext } from "../ThemeContext";
import { useDevice } from "../hooks/customHooks";

const Drawer = React.forwardRef(function Drawer(props, ref) {
  const {
    type = "default",
    view = "smooth",
    color = "default",
    position = "right",
    className,
    size,
    ...restProps
  } = props;

  let device = useDevice();
  let _size = !size
    ? device === "mobile"
      ? position === "bottom"
        ? "50%"
        : "80%"
      : device === "tablet"
      ? "32%"
      : position === "bottom"
      ? " 32%"
      : "16%"
    : size;

  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <DrawerSource
          {...restProps}
          ref={ref}
          className={cx(
            Type[type],
            Type[position],
            dark ? View[view + "-dark"] : View[view],
            Color[color],
            className
          )}
          position={position}
          size={_size}
        />
      )}
    </ThemeContext.Consumer>
  );
});

Drawer.propTypes = {
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

export default Drawer;
