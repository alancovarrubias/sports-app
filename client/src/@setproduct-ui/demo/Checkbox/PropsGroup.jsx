import React from "react";

import { Label } from "@blueprintjs/core";
import Checkbox from "../../core/CheckBox";

const PropsGroup = props => {
  const {
    indet,
    setIndet,
    dis,
    setDis,
    help,
    setHelp,
    rtl,
    setRtl,
    right,
    setRight,
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
          color={indet ? "primary" : "default"}
          checked={indet}
          label="Indeterminate"
          onChange={() => setIndet(!indet)}
          margin={margin}
          //indeterminate
          fill
        />
        <Checkbox
          type="dense"
          color={help ? "primary" : "default"}
          checked={help}
          label="Helper Text"
          onChange={() => setHelp(!help)}
          margin={margin}
          fill
        />
        <Checkbox
          type="dense"
          color={rtl ? "primary" : "default"}
          checked={rtl}
          label="RTL"
          onChange={() => setRtl(!rtl)}
          margin={margin}
          fill
        />
        <Checkbox
          type="dense"
          color={right ? "primary" : "default"}
          checked={right}
          label="Right position"
          onChange={() => setRight(!right)}
          margin={margin}
          fill
        />
        <Checkbox
          type="dense"
          color={fill ? "primary" : "default"}
          checked={fill}
          label="Fill"
          onChange={() => setFill(!fill)}
          margin={margin}
          fill
        />
        <Checkbox
          type="dense"
          color={dis ? "primary" : "default"}
          checked={dis}
          label="Disabled"
          onChange={() => setDis(!dis)}
          margin={margin}
          fill
        />
      </div>
    </div>
  );
};

export default PropsGroup;
