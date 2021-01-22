import React from "react";

import { Label } from "@blueprintjs/core";
import Checkbox from "../../../core/CheckBox";

import StyleGrid from "../../styles/style.module.css";

const PropsGroup = props => {
  const { isShorts, setShorts, single, setSingle, margin } = props;
  return (
    <div className={StyleGrid["demo-props"]}>
      <Label>Props:</Label>
      <div className="demo-props">
        <Checkbox
          type="dense"
          color={isShorts ? "primary" : "default"}
          checked={isShorts}
          label="Shortcuts"
          onChange={() => setShorts(!isShorts)}
          fill
          margin={margin}
        />
        <Checkbox
          type="dense"
          color={single ? "primary" : "default"}
          checked={single}
          label="Single month"
          onChange={() => setSingle(!single)}
          fill
          margin={margin}
        />
      </div>
    </div>
  );
};

export default PropsGroup;
