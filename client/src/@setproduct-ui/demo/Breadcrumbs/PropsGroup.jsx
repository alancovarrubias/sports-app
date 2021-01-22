import React from "react";

import { Label } from "@blueprintjs/core";
import Checkbox from "../../core/CheckBox";
import Slider from "../../core/Slider";

import StyleGrid from "../styles/style.module.css";

const PropsGroup = props => {
  const { width, setWidth, from, setFrom, margin } = props;
  return (
    <div className={StyleGrid["demo-props"]}>
      <Label>Props:</Label>
      <div className="demo-props">
        <Checkbox
          type="dense"
          color={from === "end" ? "primary" : "default"}
          checked={from === "end"}
          label="From End"
          onChange={() => setFrom(from === "start" ? "end" : "start")}
          fill
          margin={margin}
        />
        <Slider
          view="filled"
          color="default"
          labelStepSize={40}
          min={20}
          max={100}
          onChange={value => setWidth(value)}
          stepSize={20}
          showTrackFill={true}
          value={width}
          labelRenderer={value => value + "%"}
          className="demo-slider"
        />
      </div>
    </div>
  );
};

export default PropsGroup;
