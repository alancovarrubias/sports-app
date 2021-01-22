import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import { InputGroup, Icon, Button } from "@blueprintjs/core";

import Type from "./_type.module.css";
import View from "./_view.module.css";
import Color from "../../../styles/color.module.css";

import { ThemeContext } from "../../ThemeContext";

/** 
  __Component 'SearchInput'__
**/

const SearchInput = React.forwardRef(function SearchInput(props, ref) {
  const {
    type = "def",
    view = "smooth",
    color = "primary",
    className,
    placeholder,
    clearButton,
    clearIcon,
    value,
    fill,
    onSearch,
    ...restProps
  } = props;

  const [isVal, setVal] = React.useState(value); //component value
  const [isActive, setActive] = React.useState(false); //component active state (focused)
  const [isFilled, setFilled] = React.useState(isVal ? true : false); //component filled state (unfocused and has value)

  // add active class and placeholder
  const handleFocus = e => {
    setActive(true);
    setFilled(false);
  };

  // remove active class and placeholder
  const handleBlur = e => {
    setActive(false);
    setFilled(e.target.value ? true : false);
  };

  const handleClear = e => {
    setVal("");
    setActive(false);
    setFilled(false);
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
          type={"text"}
          value={isVal || ``}
          className={cx(
            Type[type],
            fill && Type["fill"],
            View[type],
            isActive && View["active"],
            isFilled && View["isFilled"],
            Color[color],
            /*Dark mode*/
            dark ? View[view + "-dark"] : View[view],
            className
          )}
          placeholder={isActive ? null : placeholder}
          leftIcon={
            <Button
              icon={
                <Icon icon={"search"} iconSize={type === "dense" ? 16 : 20} />
              }
              minimal={true}
              className={View["searchButton"]}
              onClick={() =>
                onSearch && isVal
                  ? onSearch(isVal)
                  : !isVal
                  ? setVal("")
                  : setVal("On search ...")
              }
            />
          }
          onKeyPress={e =>
            e.key === "Enter" &&
            (onSearch && e.target.value
              ? onSearch(e.target.value)
              : !e.target.value
              ? setVal("")
              : setVal("On search ..."))
          }
          onFocus={e => handleFocus(e)}
          onBlur={e => handleBlur(e)}
          onChange={e => handleChange(e)}
          rightElement={
            <Button
              icon={
                isVal && (
                  <Icon
                    icon={clearIcon || "cross"}
                    iconSize={type === "dense" ? 16 : 20}
                  />
                )
              }
              minimal={true}
              className={cx(
                isVal
                  ? View["clearButton"]
                  : type === "def" && View["voiceSearch"]
              )}
              onClick={e => handleClear(e)}
            />
          }
        />
      )}
    </ThemeContext.Consumer>
  );
});

SearchInput.propTypes = {
  /**
   `The type of the component.
   * Variants: `dense` 
   * Default value (if undefined): `def` `
   */
  type: PropTypes.oneOf(["def", "dense"]),
  /**
   ` The view of the component.
   * Variants: `outlined` `raised`
   * Default value (if undefined): `smooth` `
   */
  view: PropTypes.oneOf(["smooth", "outlined", "raised", "filled"]),
  /**
   * Placeholder text in the absence of any value.
   */
  placeholder: PropTypes.string,
  /**
   * Form value of the input
   */
  value: PropTypes.string,
  /**Your custom search function */
  onSearch: PropTypes.func,
  /**If `true`, the component will take up the full width of its container. */
  fill: PropTypes.bool
};

export default SearchInput;
