import React from "react";

import { Label } from "@blueprintjs/core";
import Checkbox from "../../core/CheckBox";

const PropsGroup = props => {
  const { isIcon, setIcon, isLink, setLink, isClose, setClose, margin } = props;
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
          color={isLink ? "primary" : "default"}
          checked={isLink}
          label="Link"
          onChange={() => setLink(!isLink)}
          fill
          margin={margin}
        />
        <Checkbox
          type="dense"
          color={isClose ? "primary" : "default"}
          checked={isClose}
          label="Close button"
          onChange={() => setClose(!isClose)}
          fill
          margin={margin}
        />
      </div>
    </div>
  );
};

export default PropsGroup;
