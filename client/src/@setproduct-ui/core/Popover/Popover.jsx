import React from "react";
import cx from "classnames";

import { Popover as PopoverSource } from "@blueprintjs/core";

import Type from "./_type.module.css";
import { ThemeContext } from "../ThemeContext";

/** 
  __Component 'Popover'__
**/

const Popover = React.forwardRef(function Popover(props, ref) {
  const { menu, popoverClassName, ...restProps } = props;

  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <PopoverSource
          {...restProps}
          ref={ref}
          popoverClassName={cx(menu && Type["menu"], popoverClassName)}
        />
      )}
    </ThemeContext.Consumer>
  );
});

export default Popover;
