import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import { Callout as CalloutSource } from "@blueprintjs/core";
import { Icon } from "@blueprintjs/core";

import Type from "./_type.module.css";
import View from "./_view.module.css";
import Color from "../../styles/color.module.css";

import { ThemeContext } from "../ThemeContext";

/** 
  __Component 'Callout'__
**/

const Callout = React.forwardRef(function Callout(props, ref) {
  const {
    type = "def",
    view = "filled",
    color = "default",
    children,
    className,
    icon,
    dense = false,
    ...restProps
  } = props;

  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <CalloutSource
          {...restProps}
          ref={ref}
          className={cx(
            dense ? Type["dense"] : Type[type],
            dark ? View[view + "-dark"] : View[view],
            Color[color],
            className
          )}
          icon={icon && <Icon icon={icon} iconSize={dense ? 16 : 24} />}
        >
          {children}
        </CalloutSource>
      )}
    </ThemeContext.Consumer>
  );
});

Callout.propTypes = {
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
   * String content of optional title element.
   */
  title: PropTypes.string,
  /**
   * Name of a Blueprint UI icon (or an icon element) to render on the left side.
   */
  icon: PropTypes.any,
  dense: PropTypes.bool,
  children: PropTypes.any.isRequired
};

export default Callout;
