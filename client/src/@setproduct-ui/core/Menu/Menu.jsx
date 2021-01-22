import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import { Menu as MenuSource } from "@blueprintjs/core";

import Type from "./_type.module.css";
import View from "./_view.module.css";
import Color from "../../styles/color.module.css";
import { ThemeContext } from "../ThemeContext";

/** 
  __Component 'Menu'__
**/

const Menu = React.forwardRef(function Menu(props, ref) {
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
        <MenuSource
          {...restProps}
          className={cx(Type[type], View[view], Color[color], className)}
        >
          {children}
        </MenuSource>
      )}
    </ThemeContext.Consumer>
  );
});

Menu.propTypes = {
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
   * A space-delimited list of class names to pass along to a child element.
   */
  className: PropTypes.string,
  children: PropTypes.array
};

export default Menu;
