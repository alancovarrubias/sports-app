import React from "react";

import { Label } from "@blueprintjs/core";
import Checkbox from "../../core/CheckBox";
import Slider from "../../core/Slider";

const PropsGroup = props => {
  const {
    small,
    setSmall,
    large,
    setLarge,
    setColorStep,
    colorStep,
    margin
  } = props;
  return (
    <div>
      <Label>Props:</Label>
      <div className="demo-props">
        <Checkbox
          type="dense"
          color={small ? "primary" : "default"}
          checked={small}
          label="Small"
          onChange={() => setSmall(!small)}
          disabled={large && true}
          fill
          margin={margin}
        />
        <Checkbox
          type="dense"
          color={large ? "primary" : "default"}
          checked={large}
          label="Large"
          onChange={() => setLarge(!large)}
          disabled={small && true}
          fill
          margin={margin}
        />
        <Label>
          Color depth
          <Slider
            view="filled"
            color="default"
            labelStepSize={50}
            min={0}
            max={100}
            onChange={value => setColorStep(value)}
            stepSize={10}
            showTrackFill={true}
            value={colorStep}
            className="demo-slider"
          />
        </Label>
      </div>
    </div>
  );
};

export default PropsGroup;
