import React, { useCallback } from "react";

import { RadioGroup } from "@blueprintjs/core";
import { Label } from "@blueprintjs/core";
import Radio from "../../core/Radio";
import Checkbox from "../../core/CheckBox";

import StyleGrid from "../styles/style.module.css";

const PropsGroup = props => {
  const { position, setPosition, backdrop, setBackdrop, margin } = props;
  const handleClick = useCallback(e => setPosition(e.target.value), [
    setPosition
  ]);
  return (
    <div className={StyleGrid["demo-props"]}>
      <Label>Props:</Label>
      <div className="demo-props">
        <Checkbox
          type="dense"
          color={backdrop ? "primary" : "default"}
          checked={backdrop}
          label="Backdrop"
          onChange={() => setBackdrop(!backdrop)}
          margin={margin}
          fill
        />
        <div style={{ paddingTop: "0.5rem" }}>
          <RadioGroup
            inline={false}
            label="Position:"
            name="Type group"
            onChange={() => null}
            selectedValue={position}
            className="demo-type-group"
          >
            <Radio
              type="dense"
              color={"right" === position ? "primary" : "default"}
              label="Right"
              value="right"
              onClick={handleClick}
              alignIndicator="left"
              checked={"right" === position && true}
              style={{ margin: "2px" }}
              onChange={() => null}
              fill
            />
            <Radio
              type="dense"
              color={"left" === position ? "primary" : "default"}
              label={"Left"}
              value="left"
              onClick={handleClick}
              alignIndicator="left"
              checked={"left" === position && true}
              style={{ margin: "2px" }}
              onChange={() => null}
              fill
            />
            <Radio
              type="dense"
              color={"top" === position ? "primary" : "default"}
              label="Top"
              value="top"
              onClick={handleClick}
              alignIndicator="left"
              checked={"top" === position && true}
              style={{ margin: "2px" }}
              onChange={() => null}
              fill
            />
            <Radio
              type="dense"
              color={"bottom" === position ? "primary" : "default"}
              label={"Bottom"}
              value="bottom"
              onClick={handleClick}
              alignIndicator="left"
              checked={"bottom" === position && true}
              style={{ margin: "2px" }}
              onChange={() => null}
              fill
            />
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default PropsGroup;
