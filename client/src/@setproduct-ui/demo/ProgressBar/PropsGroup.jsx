import React from "react";

import { Label } from "@blueprintjs/core";
import Checkbox from "../../core/CheckBox";
import Slider from "../../core/Slider";

const PropsGroup = props => {
  const {
    animate,
    setAnimate,
    stripes,
    setStripes,
    value,
    setValue,
    margin
  } = props;

  return (
    <div>
      <Label>Props:</Label>
      <div className="demo-props">
        <Checkbox
          type="dense"
          color={animate ? "primary" : "default"}
          checked={stripes && animate}
          label="Animate"
          onChange={() => setAnimate(!animate)}
          margin={margin}
          fill
          disabled={!stripes ? true : false}
        />

        <Checkbox
          type="dense"
          color={stripes ? "primary" : "default"}
          checked={stripes}
          label="Stripes"
          onChange={() => setStripes(!stripes)}
          margin={margin}
          fill
        />
        <Slider
          view="filled"
          color={"default"}
          labelStepSize={50}
          min={0}
          max={100}
          onChange={value => setValue(value)}
          stepSize={10}
          showTrackFill={true}
          value={value}
          className="demo-slider"
        />
      </div>
    </div>
  );
};

export default PropsGroup;
