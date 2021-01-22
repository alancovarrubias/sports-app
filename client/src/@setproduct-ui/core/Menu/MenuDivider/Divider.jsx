import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import { MenuDivider as MenuDividerSource } from "@blueprintjs/core";

import Type from "./_type.module.css";
import View from "./_view.module.css";
import Color from "../../../styles/color.module.css";
import { ThemeContext } from "../../ThemeContext";

/** 
  __Component 'MenuDivider'__
**/

export default function MenuDivider(props) {
  const {
    type = "def",
    view = "smooth",
    color = "default",
    className,
    ...restProps
  } = props;

  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <MenuDividerSource
          {...restProps}
          className={cx(Type[type], View[view], Color[color], className)}
        />
      )}
    </ThemeContext.Consumer>
  );
}

MenuDivider.propTypes = {
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
  /**
   * Optional header title.
   */
  title: PropTypes.string
};
