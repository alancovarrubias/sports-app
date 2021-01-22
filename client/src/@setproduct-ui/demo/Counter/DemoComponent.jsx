import React from "react";

/**Import core component (variable)*/
import Counter from "../../core/Counter";

export const DEMO = props => {
  const { type, view, color, dis, vertical, dense } = props;

  return (
    <Counter
      type={type}
      view={view}
      leftColor={color}
      value={199}
      leftIcon={vertical ? "chevron-up" : "plus"}
      rightIcon={vertical ? "chevron-down" : "minus"}
      disabled={dis}
      dense={dense}
      vertical={vertical}
    />
  );
};
