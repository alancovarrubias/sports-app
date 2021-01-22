import React from "react";

import { Label } from "@blueprintjs/core";
import Checkbox from "../../core/CheckBox";

import StyleGrid from "../styles/style.module.css";

const PropsGroup = props => {
  const {
    fill,
    setFill,
    dis,
    setDis,
    icon,
    setIcon,
    rightIcon,
    setRightIcon,
    isLoad,
    setLoad,
    shape,
    dense,
    setDense,
    margin
  } = props;
  return (
    <div className={StyleGrid["demo-props"]}>
      <Label>Props:</Label>
      <div className="demo-props">
        <Checkbox
          type="dense"
          color={dense ? "primary" : "default"}
          checked={dense}
          label="Dense"
          onChange={() => setDense(!dense)}
          fill
          margin={margin}
        />
        <Checkbox
          type="dense"
          color={fill ? "primary" : "default"}
          checked={fill}
          label="Fill"
          onChange={() => setFill(!fill)}
          disabled={
            (shape === "square" || shape === "icon" || shape === "fab") && true
          }
          fill
          margin={margin}
        />

        <Checkbox
          type="dense"
          color={icon ? "primary" : "default"}
          checked={icon}
          label="Icon"
          onChange={() => setIcon(!icon)}
          disabled={(shape === "fab" || shape === "icon") && true}
          fill
          margin={margin}
        />
        <Checkbox
          type="dense"
          color={rightIcon ? "primary" : "default"}
          checked={rightIcon}
          label="Right Icon"
          onChange={() => setRightIcon(!rightIcon)}
          disabled={
            (shape === "fab" || shape === "square" || shape === "icon") && true
          }
          fill
          margin={margin}
        />
        <Checkbox
          type="dense"
          color={isLoad ? "primary" : "default"}
          checked={isLoad}
          label="Loading"
          onChange={() => setLoad(!isLoad)}
          fill
          margin={margin}
        />
        <Checkbox
          type="dense"
          color={dis ? "primary" : "default"}
          checked={dis}
          label="Disabled"
          onChange={() => setDis(!dis)}
          fill
          margin={margin}
        />
      </div>
    </div>
  );
};

export default PropsGroup;
