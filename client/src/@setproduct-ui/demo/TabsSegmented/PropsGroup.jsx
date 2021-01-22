import React from "react";

import { Label } from "@blueprintjs/core";
import Checkbox from "../../core/CheckBox";

const PropsGroup = props => {
  const {
    //isVert, setVert,
    isRem,
    setRem,
    isIcon,
    setIcon,
    right,
    setRight,
    margin
  } = props;
  return (
    <div>
      <Label>Props:</Label>
      <div className="demo-props">
        <Checkbox
          type="dense"
          color={isIcon ? "primary" : "default"}
          checked={isIcon}
          label="Icon"
          onChange={() => setIcon(!isIcon)}
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
        {isRem && (
          <Checkbox
            type="dense"
            color={isRem ? "primary" : "default"}
            checked={isRem}
            label="Removable"
            onChange={() => setRem(!isRem)}
            fill
            margin={margin}
          />
        )}
      </div>
    </div>
  );
};

export default PropsGroup;
