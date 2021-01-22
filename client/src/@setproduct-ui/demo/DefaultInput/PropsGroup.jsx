import React from "react";

import { Label } from "@blueprintjs/core";
import Checkbox from "../../core/CheckBox";

const PropsGroup = props => {
  const {
    isError,
    setError,
    isSuccess,
    setSuccess,
    isClear,
    setClear,
    isFill,
    setFill,
    isDense,
    setDense,
    isPass,
    setPass,
    margin
  } = props;
  return (
    <div>
      <Label>Props:</Label>
      <div className="demo-props">
        <Checkbox
          type="dense"
          color={isDense ? "primary" : "default"}
          checked={isDense}
          label="Dense"
          onChange={() => setDense(!isDense)}
          fill
          margin={margin}
        />
        <Checkbox
          type="dense"
          color={isPass ? "primary" : "default"}
          checked={isPass}
          label="Password"
          onChange={() => setPass(!isPass)}
          fill
          margin={margin}
        />
        <Checkbox
          type="dense"
          color={isFill ? "primary" : "default"}
          checked={isFill}
          label="Fill"
          onChange={() => setFill(!isFill)}
          fill
          margin={margin}
        />
        <Checkbox
          type="dense"
          color={isClear ? "primary" : "default"}
          checked={isClear}
          label="Clear Button"
          onChange={() => setClear(!isClear)}
          fill
          margin={margin}
          disabled={(isSuccess || isError) && true}
        />
        <Checkbox
          type="dense"
          color={isSuccess ? "primary" : "default"}
          checked={isSuccess}
          label="Success"
          onChange={() => setSuccess(!isSuccess)}
          fill
          margin={margin}
          disabled={(isError || isClear) && true}
        />
        <Checkbox
          type="dense"
          color={isError ? "primary" : "default"}
          checked={isError}
          label="Error"
          onChange={() => setError(!isError)}
          fill
          margin={margin}
          disabled={(isSuccess || isClear) && true}
        />
      </div>
    </div>
  );
};

export default PropsGroup;
