import React from "react";

import { Label } from "@blueprintjs/core";
import Checkbox from "../../core/CheckBox";

const PropsGroup = props => {
  const { pos, setPos, isOpen, setOpen, margin } = props;
  return (
    <div>
      <Label>Props:</Label>
      <div className="demo-props">
        <Checkbox
          type="dense"
          color={pos === "auto" ? "primary" : "default"}
          checked={pos === "auto"}
          label="Auto position"
          onChange={() => setPos("auto")}
          fill
          margin={margin}
        />

        <Checkbox
          type="dense"
          color={pos === "left" ? "primary" : "default"}
          checked={pos === "left"}
          label="Left "
          onChange={() => setPos("left")}
          fill
          margin={margin}
        />
        <Checkbox
          type="dense"
          color={pos === "right" ? "primary" : "default"}
          checked={pos === "right"}
          label="Right "
          onChange={() => setPos("right")}
          fill
          margin={margin}
        />
        <Checkbox
          type="dense"
          color={pos === "top" ? "primary" : "default"}
          checked={pos === "top"}
          label="Top "
          onChange={() => setPos("top")}
          fill
          margin={margin}
        />
        <Checkbox
          type="dense"
          color={pos === "bottom" ? "primary" : "default"}
          checked={pos === "bottom"}
          label="Bottom "
          onChange={() => setPos("bottom")}
          fill
          margin={margin}
        />
        <Checkbox
          type="dense"
          color={isOpen ? "primary" : "default"}
          checked={isOpen}
          label="Open"
          onChange={() => setOpen(!isOpen)}
          fill
          margin={margin}
        />
      </div>
    </div>
  );
};

export default PropsGroup;
