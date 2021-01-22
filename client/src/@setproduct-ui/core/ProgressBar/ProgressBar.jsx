import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import { ProgressBar as ProgressBarSource } from "@blueprintjs/core";

import Type from "./_type.module.css";
import View from "./_view.module.css";
import Color from "../../styles/color.module.css";
import { ThemeContext } from "../ThemeContext";

/** 
  __Component 'ProgressBar'__
**/

const ProgressBar = React.forwardRef(function ProgressBar(props, ref) {
  const {
    type = "def",
    view = "filled",
    color = "default",
    className,
    ...restProps
  } = props;

  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <ProgressBarSource
          {...restProps}
          ref={ref}
          className={cx(
            Type[type],
            dark ? View[view + "-dark"] : View[view],
            Color[color],
            className
          )}
        />
      )}
    </ThemeContext.Consumer>
  );
});

ProgressBar.propTypes = {
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
   * Whether the background should be striped.
   */
  stripes: PropTypes.bool,
  /**
   * Whether the background should animate.
   */
  animate: PropTypes.bool,
  /**
   * A value between 0 and 1 (inclusive) representing how far along the operation is.
   * Values below 0 or above 1 will be interpreted as 0 or 1, respectively.
   * Omitting this prop will result in an "indeterminate" progress meter that fills the entire bar.
   */
  value: PropTypes.number
};

export default ProgressBar;
