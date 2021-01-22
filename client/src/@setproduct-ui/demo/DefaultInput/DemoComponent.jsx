import React from "react";

/**Import core component (variable)*/
import InputGroup from "../../core/Inputs/DefaultInput";

export const DEMO = props => {
  const {
    view,
    color,
    isClear,
    isSuccess,
    isError,
    isFill,
    isDense,
    isPass
  } = props;
  return (
    <InputGroup
      type={isPass ? "password" : "text"}
      view={view}
      color={color}
      placeholder="e.g. John Doe"
      label="First Name"
      value="John Dow"
      clearButton={isClear}
      //clearIcon="cross" //variable
      success={isSuccess}
      error={isError}
      fill={isFill}
      errorHelperText={isError ? "This person does not exist" : null}
      /**Possible variables*/
      //successIcon={"tick"}
      //errorIcon={"tick"}
      //rightElement={<Icon icon="cross" />}
      //required
      dense={isDense}
    />
  );
};
