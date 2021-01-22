import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import { MenuItem as MenuItemSource } from "@blueprintjs/core";

import Type from "./_type.module.css";
import View from "./_view.module.css";
import Color from "../../../styles/color.module.css";
import { ThemeContext } from "../../ThemeContext";

/** 
  __Component 'MenuItem'__
**/

export default function MenuItem(props) {
  const {
    type = "def",
    view = "smooth",
    color = "default",
    className,
    note,
    ...restProps
  } = props;

  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <MenuItemSource
          {...restProps}
          className={cx(
            Type[type],
            View[view],
            note && View["note"],
            Color[color],
            className
          )}
        />
      )}
    </ThemeContext.Consumer>
  );
}

MenuItem.propTypes = {
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
   * Name of a Blueprint UI icon (or an icon element) to render before the text.
   */
  icon: PropTypes.string,
  /**
   * Right-aligned label text content, useful for displaying hotkeys.
   */
  label: PropTypes.string,
  /**
   * Item text, required for usability.
   */
  text: PropTypes.string.isRequired,
  /**
   * Children of this component will be rendered in a submenu that appears when hovering or clicking on this menu item.
   */
  children: PropTypes.array
};
