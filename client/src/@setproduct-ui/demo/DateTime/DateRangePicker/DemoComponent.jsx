import React from "react";

/**Import core component (variable)*/
import DateRangePicker from "../../../core/DateTime/DateRangePicker";

export const DEMO = props => {
  const { view, color, shortcuts, single } = props;
  return (
    <DateRangePicker
      view={view}
      color={color}
      allowSingleDayRange={true}
      shortcuts={shortcuts}
      singleMonthOnly={single}
    />
  );
};
