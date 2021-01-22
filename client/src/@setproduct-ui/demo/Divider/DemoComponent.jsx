import React from "react";

/**Import core component (variable)*/
import Divider from "../../core/Divider";

export const DEMO = props => {
  const { color, size, colorStep, vertical } = props;
  return (
    <div
      style={
        vertical
          ? { display: "flex" }
          : { display: "block", textAlign: "center", width: "fit-content" }
      }
    >
      Component 1
      <Divider
        color={color}
        size={size}
        colorStep={colorStep}
        vertical={vertical}
      />
      Component 2
      <Divider
        color={color}
        size={size}
        colorStep={colorStep}
        vertical={vertical}
      />
      Component 3
    </div>
  );
};
