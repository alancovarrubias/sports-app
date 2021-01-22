import React from "react";

import { Label } from "@blueprintjs/core";
import Slider from "../../../core/Slider";

const PropsGroup = props => {
  const { iconSize, setIconSize } = props;

  return (
    <>
      <div className="demo-props">
        <Label>Props:</Label>
        <Slider
          view="filled"
          color={"default"}
          labelStepSize={24}
          min={16}
          max={64}
          onChange={value => setIconSize(value)}
          stepSize={2}
          showTrackFill={true}
          value={iconSize}
          className="demo-slider"
        />
      </div>
    </>
  );
};

export default PropsGroup;
