import React from "react";

import { Label } from "@blueprintjs/core";
import Checkbox from "../../core/CheckBox";

const PropsGroup = props => {
  const {
    dis,
    setDis,
    help,
    setHelp,
    fill,
    setFill,
    rtl,
    setRtl,
    left,
    setLeft,
    iOS,
    setIOS,
    margin
  } = props;
  return (
    <div>
      <Label>Props:</Label>
      <div className="demo-props">
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
          color={iOS ? "primary" : "default"}
          checked={iOS}
          label="iOS style"
          onChange={() => setIOS(!iOS)}
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
          color={left ? "primary" : "default"}
          checked={left}
          label="Left position"
          onChange={() => setLeft(!left)}
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
