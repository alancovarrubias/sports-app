import React from "react";
import cx from "classnames";

import { Popover } from "@blueprintjs/core";

import Type from "./_type.module.css";
import View from "./_view.module.css";
import Color from "../../styles/color.module.css";

const Dropdown = React.forwardRef(function Dropdown(
  {
    content,
    position = "bottom-left",
    view,
    dense = false,
    text,
    color = "default",
    ...props
  },
  ref
) {
  return (
    <Popover
      content={content}
      position={position}
      minimal
      popoverClassName={cx(View["popover"])}
    >
      <button
        {...props}
        ref={ref}
        type="button"
        className={cx(
          dense ? Type["dropdown--dense"] : Type["dropdown"],
          View[view],
          Color[color]
        )}
      >
        {text}
      </button>
    </Popover>
  );
});

export default Dropdown;
