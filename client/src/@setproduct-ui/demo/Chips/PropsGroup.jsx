import React from "react";

import { Label } from "@blueprintjs/core";
import Checkbox from "../../core/CheckBox";
import Button from "../../core/Button";
import StyleGrid from "../styles/style.module.css";

const PropsGroup = props => {
  const {
    dis,
    setDis,
    isIcon,
    setIcon,
    isRIcon,
    setRIcon,
    isRemovable,
    setRemovable,
    isSelect,
    setSelect,
    isRound,
    setRound,
    isNumber,
    setNumber,
    isAva,
    setAva,
    margin,
    clear
  } = props;
  return (
    <div className={StyleGrid["demo-props"]}>
      <Label>Props:</Label>
      <div className="demo-props">
        <Checkbox
          type="dense"
          color={isIcon ? "primary" : "default"}
          checked={isIcon}
          label="Left Icon"
          onChange={() => setIcon(!isIcon)}
          margin={margin}
          fill
          disabled={isNumber || isSelect || isAva ? true : false}
        />
        <Checkbox
          type="dense"
          color={isRIcon ? "primary" : "default"}
          checked={isRIcon}
          label="Right Icon"
          onChange={() => setRIcon(!isRIcon)}
          margin={margin}
          fill
        />
        <Checkbox
          type="dense"
          color={isNumber ? "primary" : "default"}
          checked={isNumber}
          label="With Number"
          onChange={() => setNumber(!isNumber)}
          margin={margin}
          disabled={isIcon || isSelect || isAva ? true : false}
        />
        <Checkbox
          type="dense"
          color={isAva ? "primary" : "default"}
          checked={isAva}
          label="With Avatar"
          onChange={() => setAva(!isAva)}
          margin={margin}
          disabled={isIcon || isSelect || isNumber ? true : false}
        />
        <Checkbox
          type="dense"
          color={isRound ? "primary" : "default"}
          checked={isRound}
          label="Rounded"
          onChange={() => setRound(!isRound)}
          margin={margin}
          fill
        />
        <Checkbox
          type="dense"
          color={isRemovable ? "primary" : "default"}
          checked={isRemovable}
          label="Removable"
          onChange={() => setRemovable(!isRemovable)}
          margin={margin}
          fill
          disabled={isSelect ? true : false}
        />
        <Checkbox
          type="dense"
          color={isSelect ? "primary" : "default"}
          checked={isSelect}
          label="Selection Tick"
          onChange={() => setSelect(!isSelect)}
          margin={margin}
          fill
          disabled={isRemovable || isNumber || isAva ? true : false}
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
        <Button
          dense
          view="outlined"
          color={clear ? "primary" : "default"}
          text="Reset Chips"
          onClick={clear}
          style={{ margin: "4px" }}
          fill
        />
      </div>
    </div>
  );
};

export default PropsGroup;
