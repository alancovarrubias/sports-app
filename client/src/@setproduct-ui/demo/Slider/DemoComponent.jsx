import React from "react";

/**Import core component (variable)*/
import Slider from "../../core/Slider";

export const DEMO = props => {
  const { color, value, setValue, vertical } = props;
  return (
    <Slider
      color={color}
      initialValue={0}
      labelPrecision={5}
      labelStepSize={25}
      stepSize={5}
      min={0}
      max={100}
      //showTrackFill={false}
      vertical={vertical}
      onChange={value => setValue(value)}
      labelRenderer={value => value + "%"}
      value={value}
    />
  );
};
