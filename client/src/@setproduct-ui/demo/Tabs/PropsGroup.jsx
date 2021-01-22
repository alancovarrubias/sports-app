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
    fill,
    setFill,
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
          color={fill ? "primary" : "default"}
          checked={fill}
          label="Fill"
          onChange={() => setFill(!fill)}
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
