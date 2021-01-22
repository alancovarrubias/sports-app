import React from "react";
import cx from "classnames";

import { NavbarHeading as NavbarHeadingSource } from "@blueprintjs/core";
import { ThemeContext } from "../ThemeContext";

/** 
  __Component 'NavbarHeading'__
**/

export default function NavbarHeading(props) {
  const { className, ...restProps } = props;

  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <NavbarHeadingSource {...restProps} className={cx(className)} />
      )}
    </ThemeContext.Consumer>
  );
}
