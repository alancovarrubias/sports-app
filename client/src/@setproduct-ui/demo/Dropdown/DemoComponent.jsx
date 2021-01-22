import React from "react";

/**Import core component (variable)*/
import Dropdown from "../../core/Dropdown";
import ExampleMenu from "./Menu";

export const DEMO = ({ view, color, dense }) => {
  return (
    <Dropdown
      view={view}
      color={color}
      text="Dropdown"
      position="bottom-left"
      content={<ExampleMenu view={view} color={color} dense={dense} />}
      dense={dense}
    />
  );
};
