import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import { Breadcrumbs as BreadcrumbsSource } from "@blueprintjs/core";

import Type from "./_type.module.css";
import View from "./_view.module.css";
import Color from "../../styles/color.module.css";

import { ThemeContext } from "../ThemeContext";

/** 
  __Component 'Breadcrumbs'__
**/

const Breadcrumbs = React.forwardRef(function Breadcrumbs(props, ref) {
  const {
    type = "default",
    view = "smooth",
    color = "default",
    dense,
    className,
    ...restProps
  } = props;

  return (
    <ThemeContext.Consumer>
      {({ isDark }) => (
        <>
          <BreadcrumbsSource
            {...restProps}
            className={cx(
              Type[type],
              dense && Type["dense"],
              isDark ? View[view + "-dark"] : View[view],
              View[color],
              Color[color],
              className
            )}
            popoverProps={{
              popoverClassName: cx(View["popover"], Color[color])
            }}
            ref={ref}
          />
        </>
      )}
    </ThemeContext.Consumer>
  );
});

Breadcrumbs.propTypes = {
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
   * All breadcrumbs to display. Breadcrumbs that do not fit in the container will be rendered in an overflow menu instead.
   */
  items: PropTypes.array.isRequired,
  /**
   * Which direction the breadcrumbs should collapse from: start or end.
   */
  collapseFrom: PropTypes.string
};

export default Breadcrumbs;
