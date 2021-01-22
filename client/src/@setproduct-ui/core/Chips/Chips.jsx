import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import { Tag } from "@blueprintjs/core";

import { ThemeContext } from "../ThemeContext";

import Type from "./_type.module.css";
import View from "./_view.module.css";
import Color from "../../styles/color.module.css";

/** 
  __Component 'Chips'__
**/

const Chips = React.forwardRef(function Chips(props, ref) {
  const {
    type = "def",
    view = "smooth",
    color = "default",
    icon,
    rightIcon,
    tag,
    removable,
    onRemove,
    round = true,
    active,
    disabled,
    onClick,
    withTick,
    children,
    withNumber,
    withAvatar,
    className,
    ...rest
  } = props;

  const [isActive, setActive] = React.useState(active);

  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <Tag
          {...rest}
          ref={ref}
          className={cx(
            Type[type],
            Type[view],
            type === "dense" && View[type],
            View[view],
            Color[color],
            round && Type["round"],
            isActive && !removable && Type["active"],
            isActive && !removable ? View["active"] : View["not-active"],
            disabled && View["disabled"],
            withNumber && Type["number"],
            withNumber && View["number"],
            withAvatar && Type["avatar"],
            className
          )}
          key={tag}
          interactive={removable ? false : true}
          onRemove={removable ? (!disabled ? onRemove : () => {}) : null}
          onClick={() => !removable && !disabled && setActive(!isActive)}
          icon={withTick && !removable ? "tick" : icon && icon}
          rightIcon={rightIcon && rightIcon}
          large={true}
        >
          {withNumber && <div>{withNumber}</div>}
          {withAvatar && (
            <div>
              <img src={withAvatar} alt="" />
            </div>
          )}
          {withAvatar ? <div>{tag}</div> : tag}
        </Tag>
      )}
    </ThemeContext.Consumer>
  );
});

Chips.propTypes = {
  /**
   `The type of the component.
   * Variants: `dense` 
   * Default value (if undefined): `def` `
   */
  type: PropTypes.oneOf(["def", "dense"]),
  /**
   ` The view of the component.
   * Variants: `outlined`
   * Default value (if undefined): `smooth` `
   */
  view: PropTypes.oneOf(["smooth", "outlined"]),
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
   * Text
   */
  tag: PropTypes.string,
  /**
   * Whether this tag should have rounded ends.
   */
  round: PropTypes.bool,
  /**
   * Show remove button
   */
  removable: PropTypes.bool,
  /**
   * Click handler for remove button.
   */
  onRemove: PropTypes.func,
  /**
   * Name of a Blueprint UI icon (or an icon element) to render before the text.
   */
  icon: PropTypes.string,
  /**
   * Name of a Blueprint UI icon (or an icon element) to render after the text.
   */
  rightIcon: PropTypes.string,
  /**
   * Render Tick animation
   */
  withTick: PropTypes.bool,
  /**
   * Render image before the text
   */
  withAvatar: PropTypes.string,
  /**
   * Render number before the text
   */
  withNumber: PropTypes.string,
  /**
   * If `true`, the button will be disabled.
   */
  disabled: PropTypes.bool
};

export default Chips;
