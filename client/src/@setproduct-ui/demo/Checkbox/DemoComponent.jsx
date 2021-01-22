import React from "react";

/**Import core component (variable)*/
import Checkbox from "../../core/CheckBox";

export const DEMO = props => {
  const {
    type,
    view,
    color,
    isDemo,
    rtl,
    setDemo,
    dis,
    indet,
    help,
    right,
    fill
  } = props;
  return (
    <Checkbox
      type={type}
      view={view}
      color={color}
      checked={isDemo}
      label={rtl ? "خانة اختيار" : "Checkbox"}
      onChange={() => setDemo(!isDemo)}
      disabled={dis}
      indeterminate={indet}
      helperText={
        help
          ? rtl
            ? "التسمية الفرعية الاختيارية"
            : "Optional subcaption"
          : null
      }
      rtl={rtl}
      right={right}
      fill={fill}
    />
  );
};
