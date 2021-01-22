import React from "react";

import { Label } from "@blueprintjs/core";
import Checkbox from "../../core/CheckBox";

const PropsGroup = props => {
  const { isFill, setFill, margin } = props;
  return (
    <div>
      <Label>Props:</Label>
      <div className="demo-props">
        <Checkbox
          type="dense"
          color={isFill ? "primary" : "default"}
          checked={isFill}
          label="Fill"
          onChange={() => setFill(!isFill)}
          fill
          margin={margin}
        />
      </div>
    </div>
  );
};

export default PropsGroup;
