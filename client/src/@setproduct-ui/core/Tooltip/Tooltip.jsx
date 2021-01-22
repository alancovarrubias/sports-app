import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import { Tooltip as TooltipSource } from "@blueprintjs/core";

import Type from "./_type.module.css";
import View from "./_view.module.css";
import Color from "../../styles/color.module.css";

import { ThemeContext } from "../ThemeContext";

const Tooltip = React.forwardRef(function Tooltip(props, ref) {
  const {
    type = "def",
    view = "filled",
    color = "default",
    content,
    position,
    children,
    className,
    ...restProps
  } = props;

  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <TooltipSource
          {...restProps}
          ref={ref}
          popoverClassName={cx(
            Type[type],
            dark ? View[view + "-dark"] : View[view],
            Color[color],
            className
          )}
          content={content}
          position={position}
        >
          {children}
        </TooltipSource>
      )}
    </ThemeContext.Consumer>
  );
});

Tooltip.propTypes = {
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
   * The position (relative to the target) at which the popover should appear.
   * Variants: "auto", "top", "left", "right", "bottom"
   */
  position: PropTypes.oneOf(["auto", "top", "left", "right", "bottom"]),
  /**
   * The content that will be displayed inside of the tooltip.
   */
  content: PropTypes.string.isRequired,
  /**
   * Whether the popover is visible.
   * Passing this prop puts the popover in controlled mode, where the only way to change visibility is by updating this property.
   * If disabled={true}, this prop will be ignored, and the popover will remain closed.
   */
  isOpen: PropTypes.bool,
  /**
   * Prevents the popover from appearing when true.
   */
  disabled: PropTypes.bool
};

export default Tooltip;
