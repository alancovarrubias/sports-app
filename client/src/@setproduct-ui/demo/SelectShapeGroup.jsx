import React, { useCallback } from "react";

import { RadioGroup } from "@blueprintjs/core";
import Radio from "../core/Radio";

const SelectShapeGroup = props => {
  const { shape, setShape, shapes } = props;
  const handleClick = useCallback(e => setShape(e.target.value), [setShape]);

  return (
    <RadioGroup
      inline={false}
      label="Select type:"
      name="Type group"
      onChange={() => null}
      selectedValue={shape}
      className="demo-type-group"
    >
      {shapes.map(([label, value], i) => (
        <Radio
          type="dense"
          color={value === shape ? "primary" : "default"}
          label={label}
          value={value}
          onClick={handleClick}
          alignIndicator="left"
          //large
          key={i}
          checked={value === shape && true} //important
          style={{ margin: "2px" }}
          onChange={() => null}
          fill
        />
      ))}
    </RadioGroup>
  );
};

export default SelectShapeGroup;
