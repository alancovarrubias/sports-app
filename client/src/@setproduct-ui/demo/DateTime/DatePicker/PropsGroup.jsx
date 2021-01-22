import React from "react";

import { Label } from "@blueprintjs/core";
import Checkbox from "../../../core/CheckBox";

import StyleGrid from "../../styles/style.module.css";

const PropsGroup = props => {
  const { bar, setBar, curDay, setCurDay, margin } = props;
  return (
    <div className={StyleGrid["demo-props"]}>
      <Label>Props:</Label>
      <div className="demo-props">
        <Checkbox
          type="dense"
          color={bar ? "primary" : "default"}
          checked={bar}
          label="Action Bar"
          onChange={() => setBar(!bar)}
          fill
          margin={margin}
        />
        <Checkbox
          type="dense"
          color={curDay ? "primary" : "default"}
          checked={curDay}
          label="Current Day"
          onChange={() => setCurDay(!curDay)}
          fill
          margin={margin}
        />
      </div>
    </div>
  );
};

export default PropsGroup;
