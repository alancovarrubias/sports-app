import React from "react";

import { Label } from "@blueprintjs/core";
import Checkbox from "../../core/CheckBox";

const PropsGroup = props => {
  const { isLogo, setLogo, isMenu, setMenu, margin } = props;
  return (
    <div>
      <Label>Props:</Label>
      <div className="demo-props">
        <Checkbox
          type="dense"
          color={isLogo ? "primary" : "default"}
          checked={isLogo}
          label="Logo"
          onChange={() => setLogo(!isLogo) & setMenu(false)}
          fill
          margin={margin}
        />
        <Checkbox
          type="dense"
          color={isMenu ? "primary" : "default"}
          checked={isMenu}
          label="Menu"
          onChange={() => setMenu(!isMenu) & setLogo(false)}
          fill
          margin={margin}
        />
      </div>
    </div>
  );
};

export default PropsGroup;
