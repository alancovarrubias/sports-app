import React from "react";

import { Label } from "@blueprintjs/core";
import Checkbox from "../../core/CheckBox";

import StyleGrid from "../styles/style.module.css";

const PropsGroup = props => {
  const { fill, setFill, right, setRight, margin } = props;
  return (
    <div className={StyleGrid["demo-props"]}>
      <Label>Props:</Label>
      <div className="demo-props">
        <Checkbox
          type="dense"
          color={fill ? "primary" : "default"}
          checked={fill}
          label="Fill"
          onChange={() => setFill(!fill)}
          fill
          margin={margin}
        />
        <Checkbox
          type="dense"
          color={right ? "primary" : "default"}
          checked={right}
          label="Right"
          onChange={() => setRight(!right)}
          fill
          margin={margin}
        />
      </div>
    </div>
  );
};

export default PropsGroup;
