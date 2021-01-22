import React from "react";
import { Icon } from "@blueprintjs/core";
import Toaster from "../../core/Toast/Toaster.jsx";

/**Import core component (variable)*/
import InputGroup from "../../core/Inputs/SearchInput";

export const DEMO = props => {
  const { type, view, color, isFill } = props;

  var isRef;
  function setRef(ref) {
    isRef = ref;
  }

  const onSearch = val => {
    const DemoToast = {
      message: `Sorry, we can't found anything about "${val}". Maybe better ask Google?`,
      icon: <Icon icon="error" iconSize={24} />
    };
    isRef.show(DemoToast);
  };

  return (
    <>
      <InputGroup
        type={type}
        view={view}
        color={color}
        placeholder="Placeholder"
        value="Enter search query"
        fill={isFill}
        onSearch={onSearch}
        /**API */
        //clearIcon="cross" //variable
        // onSearch={onSearch} //search function
        /**Possible variables*/
        //successIcon={"tick"}
        //errorIcon={"tick"}
        //rightElement={<Icon icon="cross" />}
      />
      <Toaster
        type="def"
        view="smooth"
        color="danger"
        usePortal={false}
        position="top"
        setRef={setRef}
      />
    </>
  );
};
