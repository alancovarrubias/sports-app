import React from "react";

/**Import core component (variable)*/
import Button from "../../core/Button";
import Badge from "../../core/Badge";

export const DEMO = ({ view, dense, isHide, isDot, ...props }) => {
  return (
    <>
      <Badge
        {...props}
        view={view}
        value="New"
        hide={isHide}
        dot={isDot}
        dense={dense}
      >
        <Button text="Button" view="outlined" />
      </Badge>
      <Badge
        {...props}
        view={view}
        value={"9"}
        hide={isHide}
        dot={isDot}
        dense={dense}
        style={{ marginLeft: "4rem" }}
      >
        <Button text="A" type="circle" dense view="filled" />
      </Badge>
    </>
  );
};
