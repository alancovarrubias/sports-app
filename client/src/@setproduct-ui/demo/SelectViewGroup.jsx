import React, { useCallback } from "react";

import { RadioGroup } from "@blueprintjs/core";
import Radio from "../core/Radio";

const SelectViewGroup = props => {
  const { view, setView, views } = props;
  const handleClick = useCallback(e => setView(e.target.value), [setView]);

  return (
    <RadioGroup
      inline={false}
      label="Select view:"
      name="View group"
      onChange={() => null}
      selectedValue={view}
      className="demo-view-group"
    >
      {views.map(([label, value], i) => (
        <Radio
          type="dense"
          color={value === view ? "primary" : "default"}
          label={label}
          value={value}
          onClick={handleClick}
          alignIndicator="left"
          //large
          key={i}
          checked={value === view && true} //important
          style={{ margin: "2px" }}
          onChange={() => null}
          fill
        />
      ))}
    </RadioGroup>
  );
};

export default SelectViewGroup;
