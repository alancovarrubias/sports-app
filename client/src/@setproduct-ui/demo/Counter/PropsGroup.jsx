import React from "react";

import { Label } from "@blueprintjs/core";
import Checkbox from "../../core/CheckBox";

const PropsGroup = props => {
  const { dis, setDis, dense, setDense, vertical, setVertical, margin } = props;
  return (
    <div>
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
        <Checkbox
          type="dense"
          color={vertical ? "primary" : "default"}
          checked={vertical}
          label="Vertical"
          onChange={() => setVertical(!vertical)}
          fill
          margin={margin}
        />
        <Checkbox
          type="dense"
          color={dis ? "primary" : "default"}
          checked={dis}
          label="Disabled"
          onChange={() => setDis(!dis)}
          fill
          margin={margin}
        />
      </div>
    </div>
  );
};

export default PropsGroup;
