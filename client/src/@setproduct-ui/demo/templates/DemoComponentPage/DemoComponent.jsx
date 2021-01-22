import React from "react";
import { Icon } from "@blueprintjs/core";

/**Import core component (variable)*/
import Button from "../../core/Button";

export const DEMO = props => {
  const { mdc_style, fill, icon, rightIcon, dis, isLoad } = props;
  return (
    <Button
      /*style={{ margin: "auto" }}*/
      mdc_style={mdc_style}
      //onClick={() => setOpen(true)}
      fill={mdc_style[0] !== "square" && fill}
      text={mdc_style[0] !== "fab" && mdc_style[0] !== "icon" && "Show code"}
      icon={
        (mdc_style[0] === "fab" ||
          mdc_style[0] === "icon" ||
          icon === true) && <Icon icon="plus" iconSize={24} />
      }
      rightIcon={
        mdc_style[0] !== "fab" &&
        mdc_style[0] !== "square" &&
        mdc_style[0] !== "icon" &&
        rightIcon === true &&
        "history"
      }
      disabled={dis}
      loading={isLoad}
    />
  );
};
