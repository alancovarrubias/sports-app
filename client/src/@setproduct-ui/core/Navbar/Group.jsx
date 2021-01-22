import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import { NavbarGroup as NavbarGroupSource } from "@blueprintjs/core";

import Type from "./_type.module.css";
import { ThemeContext } from "../ThemeContext";

/** 
  __Component 'NavbarGroup'__
**/

export default function NavbarGroup(props) {
  const { className, align, ...restProps } = props;

  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <NavbarGroupSource
          {...restProps}
          align={align}
          className={cx(align === "center" && Type["center"], className)}
        />
      )}
    </ThemeContext.Consumer>
  );
}
NavbarGroup.propTypes = {
  /**
   * The side of the navbar on which the group should appear.
   */
  align: PropTypes.oneOf(["left", "center", "right"])
};
