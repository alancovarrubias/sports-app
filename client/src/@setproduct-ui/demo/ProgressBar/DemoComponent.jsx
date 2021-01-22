import React from "react";

/**Import core component (variable)*/
import ProgressBar from "../../core/ProgressBar";

export const DEMO = props => {
  const { color, animate, stripes, value } = props;
  return (
    <ProgressBar
      color={color}
      animate={animate}
      stripes={stripes}
      value={value / 100}
    />
  );
};
