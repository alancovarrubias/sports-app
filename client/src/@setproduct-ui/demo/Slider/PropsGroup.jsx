import React from "react";

import { Label } from "@blueprintjs/core";
import Checkbox from "../../core/CheckBox";

const PropsGroup = props => {
  const { vertical, setVertical, margin } = props;
  return (
    <div>
      <Label>Props:</Label>
      <div className="demo-props">
        <Checkbox
          type="dense"
          color={vertical ? "primary" : "default"}
          checked={vertical}
          label="Vertical"
          onChange={() => setVertical(!vertical)}
          margin={margin}
          fill
        />
      </div>
    </div>
  );
};

export default PropsGroup;
