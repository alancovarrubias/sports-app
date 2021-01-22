import React from "react";

/**Import core component (variable)*/
import DatePicker from "../../../core/DateTime/DatePicker";

export const DEMO = props => {
  const { view, color, bar, curDay } = props;
  return (
    <DatePicker
      view={view}
      color={color}
      highlightCurrentDay={curDay}
      showActionsBar={bar}
    />
  );
};
