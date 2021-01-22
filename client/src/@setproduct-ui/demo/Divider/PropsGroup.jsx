import React from "react";

import { Label } from "@blueprintjs/core";
import Slider from "../../core/Slider";
import Checkbox from "../../core/CheckBox";

import StyleGrid from "../styles/style.module.css";

const PropsGroup = props => {
  const {
    size,
    setSize,
    colorStep,
    setColorStep,
    isVert,
    setVert,
    margin
  } = props;
  return (
    <div className={StyleGrid["demo-props"]}>
      <Label>Props:</Label>
      <div className="demo-props">
        <Slider
          view="filled"
          color="default"
          labelStepSize={9}
          min={1}
          max={12}
          onChange={value => setSize(value)}
          stepSize={1}
          showTrackFill={true}
          value={size}
          labelRenderer={value => value + "px"}
          className="demo-slider"
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
            labelRenderer={value => value}
            className="demo-slider"
          />
        </Label>
        <Checkbox
          type="dense"
          color={isVert ? "primary" : "default"}
          checked={isVert}
          label="Vertical"
          onChange={() => setVert(!isVert)}
          margin={margin}
          fill
        />
      </div>
    </div>
  );
};

export default PropsGroup;
