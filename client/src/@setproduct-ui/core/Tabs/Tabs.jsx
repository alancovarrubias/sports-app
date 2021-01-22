import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import { Tabs } from "@blueprintjs/core";

import Type from "./_type.module.css";
import View from "./_view.module.css";
import Color from "../../styles/color.module.css";

import { ThemeContext } from "../ThemeContext";

const SP_Tabs = React.forwardRef(function SP_Tabs(props, ref) {
  const {
    type = "def",
    view = "filled",
    color = "default",
    fill,
    className,
    children,
    ...restProps
  } = props;

  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <Tabs
          {...restProps}
          ref={ref}
          className={cx(
            Type[type],
            Type[view],
            fill && Type["fill"],
            View[type],
            dark ? View[view + "-dark"] : View[view],
            Color[color],
            className
          )}
        >
          {children}
        </Tabs>
      )}
    </ThemeContext.Consumer>
  );
});

SP_Tabs.propTypes = {
  /**
   `The type of the component.
   * Variants: `def` `dense` `segmented`
   * Default value (if undefined): `def` `
   */
  type: PropTypes.oneOf(["def", "dense", "segmented"]),
  /**
   ` The view of the component.
   * Variants: `filled` `flat` `smooth` `outlined` `raised`
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
   * Whether this component should expand to fill its container.
   */
  fill: PropTypes.bool
};

export default SP_Tabs;
