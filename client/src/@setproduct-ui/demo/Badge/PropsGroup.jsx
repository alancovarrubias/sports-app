import React from "react";

import { Label } from "@blueprintjs/core";
import Checkbox from "../../core/CheckBox";

import StyleGrid from "../styles/style.module.css";

const PropsGroup = props => {
  const {
    isDense,
    setDense,
    isLeft,
    setLeft,
    isBottom,
    setBottom,
    isHide,
    setHide,
    isDot,
    setDot,
    margin
  } = props;

  return (
    <div className={StyleGrid["demo-props"]}>
      <Label>Props:</Label>
      <div className="demo-props">
        <Checkbox
          type="dense"
          color={isDense ? "primary" : "default"}
          checked={isDense}
          label="Dense badge"
          onChange={() => setDense(!isDense)}
          fill
          margin={margin}
        />
        <Checkbox
          type="dense"
          color={isDot ? "primary" : "default"}
          checked={isDot}
          label="Dot badge"
          onChange={() => setDot(!isDot)}
          fill
          margin={margin}
        />
        <Checkbox
          type="dense"
          color={isLeft ? "primary" : "default"}
          checked={isLeft}
          label="Left position"
          onChange={() => setLeft(!isLeft)}
          fill
          margin={margin}
        />
        <Checkbox
          type="dense"
          color={isBottom ? "primary" : "default"}
          checked={isBottom}
          label="Bottom position"
          onChange={() => setBottom(!isBottom)}
          fill
          margin={margin}
        />
        <Checkbox
          type="dense"
          color={isHide ? "primary" : "default"}
          checked={isHide}
          label="Hide badge"
          onChange={() => setHide(!isHide)}
          fill
          margin={margin}
        />
      </div>
    </div>
  );
};

export default PropsGroup;
