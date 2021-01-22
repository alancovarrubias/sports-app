import React from "react";

import { Label } from "@blueprintjs/core";
import Checkbox from "../../core/CheckBox";

import StyleGrid from "../styles/style.module.css";

const PropsGroup = props => {
  const { dense, setDense, margin } = props;
  return (
    <div className={StyleGrid["demo-props"]}>
      <Label>Props:</Label>
      <div className="demo-props">
        <Checkbox
          type="dense"
          color={dense ? "primary" : "default"}
          checked={dense}
          label="Dense"
          onChange={() => setDense(!dense)}
          fill
          margin={margin}
        />
      </div>
    </div>
  );
};

export default PropsGroup;
