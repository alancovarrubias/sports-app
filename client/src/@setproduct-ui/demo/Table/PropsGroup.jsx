import React from "react";

import { Label } from "@blueprintjs/core";
import Checkbox from "../../core/CheckBox";

const PropsGroup = props => {
  const {
    isCheckbox,
    setCheckbox,
    isPagination,
    setPagination,
    margin
  } = props;
  return (
    <div>
      <Label>Props:</Label>
      <div className="demo-props">
        <Checkbox
          type="dense"
          color={isCheckbox ? "primary" : "default"}
          checked={isCheckbox}
          label="Checkboxes"
          onChange={() => setCheckbox(!isCheckbox)}
          fill
          margin={margin}
        />

        <Checkbox
          type="dense"
          color={isPagination ? "primary" : "default"}
          checked={isPagination}
          label="Pagination"
          onChange={() => setPagination(!isPagination)}
          fill
          margin={margin}
        />
      </div>
    </div>
  );
};

export default PropsGroup;
