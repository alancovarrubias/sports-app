import React from "react";

/**Import core component (variable)*/
import TimePicker from "../../../core/DateTime/TimePicker";

export const DEMO = props => {
  const { color, isArrow, useAmPm, isSec, isMsec } = props;
  return (
    <TimePicker
      color={color}
      showArrowButtons={isArrow}
      precision={isSec ? "SECOND" : isMsec && "MILLISECOND"}
      useAmPm={useAmPm}
    />
  );
};
