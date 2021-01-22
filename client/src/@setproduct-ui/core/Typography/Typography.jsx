import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import Type from "./_type.module.css";
import View from "./_view.module.css";
import Color from "../../styles/color.module.css";

import { ThemeContext } from "../ThemeContext";

const Typography = React.forwardRef(function Typography(props, ref) {
  const {
    type = "body",
    color = "default",
    tagName = "div",
    font = "inter",
    colorStep = "100",
    large = false,
    small = false,
    className,
    ...restProps
  } = props;

  const Tag = tagName;

  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <Tag
          {...restProps}
          ref={ref}
          className={cx(
            Type[type],
            Type[font],
            large && Type["large"],
            small && Type["small"],
            dark
              ? View["color" + colorStep + "-dark"]
              : View["color" + colorStep],
            Color[color],
            className
          )}
        />
      )}
    </ThemeContext.Consumer>
  );
});

Typography.propTypes = {
  /**
   `The type of the component text.
   * Variants: `body` `button` `overline` `caption` `h1` `h2` `h3` `h4` `h5` `h6`
   * Default value (if undefined): `body` `
   */
  type: PropTypes.oneOf([
    "body",
    "body_bold",
    "button",
    "overline",
    "caption",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6"
  ]),
  /**
   ` The step of the component color from "0" to "100".
   * Default value (if undefined): `100` `
   */
  colorStep: PropTypes.oneOf([0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]),
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
   * Dense size
   */
  dense: PropTypes.bool
};

export default Typography;
