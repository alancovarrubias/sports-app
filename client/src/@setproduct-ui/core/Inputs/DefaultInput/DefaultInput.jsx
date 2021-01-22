import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import { InputGroup, Icon, Button } from "@blueprintjs/core";

import Type from "./_type.module.css";
import View from "./_view.module.css";
import Color from "../../../styles/color.module.css";

import { ThemeContext } from "../../ThemeContext";

/** 
  __Component 'Default Input'__
**/

const TextInput = React.forwardRef(function TextInput(props, ref) {
  const {
    view = "smooth",
    color = "primary",
    dense,
    className,
    placeholder,
    label,
    id,
    clearButton,
    clearIcon,
    value,
    rightElement,
    success,
    error,
    full,
    errorHelperText,
    fixed,
    ...restProps
  } = props;

  const [isVal, setVal] = React.useState(value); //component value
  const [isActive, setActive] = React.useState(isVal ? true : false); //component active state (focused)
  const [isFilled, setFilled] = React.useState(isVal ? true : false); //component filled state (unfocused and has value)

  const successIcon = (
    <Icon icon={restProps.successIcon || "tick"} iconSize={dense ? 16 : 20} />
  );
  const errorIcon = (
    <Icon icon={restProps.errorIcon || "error"} iconSize={dense ? 16 : 20} />
  );

  let resultIcon = success ? successIcon : error ? errorIcon : rightElement;

  // add active class and placeholder
  const handleFocus = e => {
    setActive(true);
    setFilled(false);
  };

  // remove active class and placeholder
  const handleBlur = e => {
    !e.target.value && setActive(false);
    setFilled(isActive ? true : false);
  };

  const handleClear = e => {
    setVal("");
    setActive(false);
  };

  const handleChange = e => {
    setVal(e.target.value);
  };

  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <InputGroup
          {...restProps}
          ref={ref}
          value={isVal || ``}
          className={cx(
            fixed ? Type["fixed"] : dense ? Type["dense"] : Type["def"],
            full && Type["full"],
            dense ? View[dense] : View["def"],
            isActive && View["active"],
            clearButton && Type["clearButton"],
            clearButton && View["clearButton"],
            !success && !error && isFilled && View["isFilled"],
            /**SUCCESS STYLE*/
            success && View["success"],
            /*ERROR STYLE */
            Color[color],
            error && View["error-helper-text"],
            resultIcon && Type["right-icon"],
            /*Dark mode*/
            dark ? View[view + "-dark"] : fixed ? View["fixed"] : View[view],
            className
          )}
          placeholder={placeholder}
          leftIcon={
            label && (
              <>
                <label>{label}</label>
                {errorHelperText && error && (
                  <div
                    className={cx(
                      Type["error-helper-text"],
                      View["error-helper-text"]
                    )}
                  >
                    {errorHelperText}
                  </div>
                )}
              </>
            )
          }
          onFocus={e => handleFocus(e)}
          onBlur={e => handleBlur(e)}
          onChange={e => handleChange(e)}
          rightElement={
            clearButton && isVal ? (
              <Button
                icon={<Icon icon={clearIcon || "cross"} iconSize="20" />}
                minimal={true}
                onClick={e => handleClear(e)}
              />
            ) : (
              resultIcon
            )
          }
        />
      )}
    </ThemeContext.Consumer>
  );
});

TextInput.propTypes = {
  /**
   ` The view of the component.
   * Variants: `outlined`
   * Default value (if undefined): `smooth` `
   */
  view: PropTypes.oneOf(["smooth", "outlined", "raised", "filled"]),
  /**
   * Placeholder text in the absence of any value.
   */
  placeholder: PropTypes.string,
  /**
   * Label text
   */
  label: PropTypes.string,
  /**
   * Form value of the input
   */
  value: PropTypes.string,
  /**
   * If `true`, the component will take up the full width of its container.
   */
  fill: PropTypes.bool,
  /**
   * Under input helper text
   */
  helperText: PropTypes.string,
  /**
   * Set Clear button
   */
  clearButton: PropTypes.bool,
  /**
   * Set Success style for input
   */
  succes: PropTypes.bool,
  /**
   * Set Error style for input
   */
  error: PropTypes.bool,
  /**
   * Set Fixed label for input
   */
  fixed: PropTypes.bool,
  /**
   * Element to render on right side of input.
   */
  rightElement: PropTypes.element,
  /**
   * Custom right icon for Success style
   */
  successIcon: PropTypes.string,
  /**
   * Custom right icon for Error style
   */
  errorIcon: PropTypes.string,
  /**
   * Set custom icon for "Clear button" element
   */
  clearIcon: PropTypes.string
};

export default TextInput;
