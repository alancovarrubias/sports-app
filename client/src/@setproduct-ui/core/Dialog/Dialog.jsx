import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import { Dialog as DialogSource, Icon } from "@blueprintjs/core";
import Typography from "../Typography";

import Type from "./_type.module.css";
import View from "./_view.module.css";
import Color from "../../styles/color.module.css";

import { ThemeContext } from "../ThemeContext";

/** 
  __Component 'Dialog'__
**/

const Dialog = React.forwardRef(function Dialog(props, ref) {
  const {
    type = "default",
    view = "filled",
    color = "default",
    icon,
    title,
    text,
    leftButton,
    rightButton,
    backdropOpacity = "20",
    onClose,
    className,
    ...restProps
  } = props;

  return (
    <ThemeContext.Consumer>
      {({ isDark }) => (
        <DialogSource
          {...restProps}
          ref={ref}
          className={cx(
            Type[type],
            isDark ? View[view + "-dark"] : View[view],
            Color[color],
            className
          )}
          backdropClassName={View["backdrop-" + backdropOpacity]}
          onClose={onClose}
        >
          <div className={Type["header"]}>
            <Icon icon={icon} iconSize={type === "dense" ? 20 : 24} />
            <Typography type={type === "dense" ? "h6" : "h5"} colorStep={100}>
              {title}
            </Typography>
            <div className={Type["close-button"]} onClick={onClose}>
              <Icon icon={"cross"} iconSize={type === "dense" ? 20 : 24} />
            </div>
          </div>
          <Typography
            type="body"
            small={type === "dense" ? true : false}
            colorStep={100}
          >
            {text}
          </Typography>
          <div className={Type["footer"]}>
            <div className={Type["left-button"]}>{leftButton}</div>
            <div className={Type["right-button"]}>{rightButton}</div>
          </div>
        </DialogSource>
      )}
    </ThemeContext.Consumer>
  );
});

Dialog.propTypes = {
  /**
   `The type of the component.
   * Variants: `dense` `default` 
   * Default value (if undefined): `default` `
   */
  type: PropTypes.oneOf(["default", "dense"]),
  /**
   ` The view of the component.
   * Variants: `smooth` `raised`
   * Default value (if undefined): `filled` `
   */
  view: PropTypes.oneOf(["filled", "smooth", "raised"]),
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
   * Click event handler.
   */
  onClick: PropTypes.func,
  /**
   * Name of a icon to render in the dialog's header. Note that the header
   *      will only be rendered if title is provided.
   */
  icon: PropTypes.string,
  /**
   * Title of the dialog.
   */
  title: PropTypes.string,
  /**
   * Action text. Havn't default state.
   */
  text: PropTypes.string,
  /**
   * Opacity of backdrop. From 0 to 100 with step 10.
   */
  backdropOpacity: PropTypes.oneOf([
    0,
    10,
    20,
    30,
    40,
    50,
    60,
    70,
    80,
    90,
    100
  ]),
  /**
   * Left button of dialog.
   */
  leftButton: PropTypes.element,
  /**
   * Right button of dialog.
   */
  rightButton: PropTypes.element,
  /**
   * Toggles the visibility of the overlay and its children. This prop is required because the component is controlled.
   */
  isOpen: PropTypes.bool,
  /**
   * A callback that is invoked when user interaction causes the overlay to close, such as clicking on the overlay or pressing the esc key.
   */
  onClose: PropTypes.func
};

export default Dialog;
