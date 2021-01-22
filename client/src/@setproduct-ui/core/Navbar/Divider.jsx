import React from "react";
import cx from "classnames";

import { NavbarDivider as NavbarDividerSource } from "@blueprintjs/core";

import { ThemeContext } from "../ThemeContext";

/** 
  __Component 'NavbarDivider'__
**/

export default function NavbarDivider(props) {
  const { className, ...restProps } = props;

  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <NavbarDividerSource {...restProps} className={cx(className)} />
      )}
    </ThemeContext.Consumer>
  );
}
