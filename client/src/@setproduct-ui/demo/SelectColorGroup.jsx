import React, { useCallback } from "react";

import { RadioGroup } from "@blueprintjs/core";
import Radio from "../core/Radio";

const SelectColorGroup = props => {
  const { color, setColor, colors } = props;
  const defColors = !colors
    ? [
        ["Default", "default"],
        ["Primary", "primary"],
        ["Warning", "warning"],
        ["Danger", "danger"],
        ["Success", "success"],
        ["Primary Alt", "primary_alt"],
        ["Warning Alt", "warning_alt"],
        ["Danger Alt", "danger_alt"],
        ["Success Alt", "success_alt"]
      ]
    : colors;

  const handleClick = useCallback(e => setColor(e.target.value), [setColor]);

  return (
    <RadioGroup
      inline={false}
      label="Select color:"
      name="Color group"
      onChange={() => null}
      selectedValue={color}
      style={{ float: "left" }}
      className="demo-color-group"
    >
      {defColors.map(([label, value], i) => (
        <Radio
          type="dense"
          color={value === color ? "primary" : "default"}
          label={label}
          value={value}
          onClick={handleClick}
          alignIndicator="left"
          //large
          key={i}
          checked={value === color && true} //important
          style={{ margin: "2px" }}
          onChange={() => null}
          fill
        />
      ))}
    </RadioGroup>
  );
};

export default SelectColorGroup;
