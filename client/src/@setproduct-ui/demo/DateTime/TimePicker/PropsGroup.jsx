import React from "react";

import { Label } from "@blueprintjs/core";
import Checkbox from "../../../core/CheckBox";

import StyleGrid from "../../styles/style.module.css";

const PropsGroup = props => {
  const {
    isArrow,
    setArrow,
    useAmPm,
    setAmPm,
    isSec,
    setSec,
    isMsec,
    setMsec,
    margin
  } = props;
  return (
    <div className={StyleGrid["demo-props"]}>
      <Label>Props:</Label>
      <div className="demo-props">
        <Checkbox
          type="dense"
          color={isArrow ? "primary" : "default"}
          checked={isArrow}
          label="Arrow Button"
          onChange={() => setArrow(!isArrow)}
          fill
          margin={margin}
        />
        <Checkbox
          type="dense"
          color={useAmPm ? "primary" : "default"}
          checked={useAmPm}
          label="Use AM/PM"
          onChange={() => setAmPm(!useAmPm)}
          fill
          margin={margin}
        />
        <Checkbox
          type="dense"
          color={isSec ? "primary" : "default"}
          checked={isSec}
          label="Seconds"
          onChange={() => setSec(isMsec ? false : !isSec)}
          fill
          disabled={isMsec && true}
          margin={margin}
        />
        <Checkbox
          type="dense"
          color={isMsec ? "primary" : "default"}
          checked={isMsec}
          label="Milliseconds"
          onChange={() => setMsec(isSec ? false : !isMsec)}
          fill
          disabled={isSec && true}
          margin={margin}
        />
      </div>
    </div>
  );
};

export default PropsGroup;
