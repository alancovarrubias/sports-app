import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import { Slider as SliderSource } from "@blueprintjs/core";

import Type from "./_type.module.css";
import View from "./_view.module.css";
import Color from "../../styles/color.module.css";

import { ThemeContext } from "../ThemeContext";

const Slider = React.forwardRef(function Slider(props, ref) {
  const {
    type = "def",
    view = "filled",
    color = "primary",
    className,
    ...restProps
  } = props;

  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <SliderSource
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
Slider.propTypes = {
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
   * Whether to show the slider in a vertical orientation.
   */
  vertical: PropTypes.bool,
  /**
   * Initial value of the slider. This determines the other end of the track fill: from initialValue to value.
   */
  initialValue: PropTypes.number,
  /**
   * Number of decimal places to use when rendering label value.
   */
  labelPrecision: PropTypes.number,
  /**
   * Increment between successive labels. Must be greater than zero.
   */
  labelStepSize: PropTypes.number,
  /**
   * Increment between successive values; amount by which the handle moves. Must be greater than zero.
   */
  stepSize: PropTypes.number,
  /**
   * Minimum value of the slider.
   */
  min: PropTypes.number,
  /**
   * Maximum value of the slider.
   */
  max: PropTypes.number,
  /**
   * Whether a solid bar should be rendered on the track between current and initial values, or between handles for RangeSlider.
   */
  showTrackFill: PropTypes.bool,
  /**
   * Callback to render a single label. Useful for formatting numbers as currency or percentages.
   * If true, labels will use number value formatted to labelPrecision decimal places.
   * If false, labels will not be shown.
   */
  labelRenderer: PropTypes.func,
  /**
   * Value of slider.
   */
  value: PropTypes.number,
  /**
   * Callback invoked when the value changes.
   */
  onChange: PropTypes.func
};

export default Slider;
