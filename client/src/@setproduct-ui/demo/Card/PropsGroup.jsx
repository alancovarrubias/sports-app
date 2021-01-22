import React from "react";

import { Label } from "@blueprintjs/core";
import Checkbox from "../../core/CheckBox";

const PropsGroup = props => {
  const { isInter, setInter, margin } = props;
  return (
    <div>
      <Label>Props:</Label>
      <div className="demo-props">
        <Checkbox
          type="dense"
          color={isInter ? "primary" : "default"}
          checked={isInter}
          label="Interactive"
          onChange={() => setInter(!isInter)}
          fill
          margin={margin}
        />
      </div>
    </div>
  );
};

export default PropsGroup;
