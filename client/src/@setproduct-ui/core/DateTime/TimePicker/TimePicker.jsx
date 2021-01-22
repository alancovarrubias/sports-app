import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

//import { Button as ButtonSource, Icon } from "@blueprintjs/core";
import {
  TimePicker as TimePickerSource,
  TimePrecision
} from "@blueprintjs/datetime";

import Type from "./_type.module.css";
import View from "./_view.module.css";
import Color from "../../../styles/color.module.css";

import { ThemeContext } from "../../ThemeContext";

const TimePicker = React.forwardRef(function TimePicker(props, ref) {
  const {
    type = "default",
    view = "outlined",
    color = "default",
    precision,
    active,
    dense,
    className,
    icon,
    ...restProps
  } = props;

  return (
    <ThemeContext.Consumer>
      {({ isDark }) => (
        <TimePickerSource
          {...restProps}
          ref={ref}
          className={cx(
            Type[type],
            dense && Type["dense"],
            isDark ? View[view + "-dark"] : View[view],
            Color[color],
            active && View["focused"],
            className
          )}
          precision={
            precision === "SECOND"
              ? TimePrecision.SECOND
              : precision === "MILLISECOND" && TimePrecision.MILLISECOND
          }
        />
      )}
    </ThemeContext.Consumer>
  );
});

TimePicker.propTypes = {
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
  ])
};

export default TimePicker;
