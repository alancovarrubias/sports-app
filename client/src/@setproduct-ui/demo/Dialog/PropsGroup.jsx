import React from "react";

import { Label } from "@blueprintjs/core";
import Slider from "../../core/Slider";

import StyleGrid from "../styles/style.module.css";

const PropsGroup = props => {
  const { opacity, setOpacity } = props;
  return (
    <div className={StyleGrid["demo-props"]}>
      <div className="demo-props">
        <Label>Backdrop Opacity</Label>
        <Slider
          view="filled"
          color={"default"}
          labelStepSize={50}
          min={0}
          max={100}
          onChange={value => setOpacity(value)}
          stepSize={10}
          showTrackFill={true}
          value={opacity}
          className="demo-slider"
        />
      </div>
    </div>
  );
};

export default PropsGroup;
