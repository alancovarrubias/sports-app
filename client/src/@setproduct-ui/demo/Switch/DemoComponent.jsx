import React from "react";

/**Import core component (variable)*/
import Switch from "../../core/Switch";

export const DEMO = props => {
  const {
    type,
    view,
    color,
    isDemo,
    rtl,
    setDemo,
    dis,
    help,
    left,
    fill,
    iOS
  } = props;
  return (
    <Switch
      type={type}
      view={view}
      color={color}
      checked={isDemo}
      label={rtl ? "الخريف" : "Spring"}
      onChange={() => setDemo(!isDemo)}
      disabled={dis}
      helperText={
        help ? (rtl ? "الطبيعة تأتي في الحياة" : "Nature comes to life") : null
      }
      rtl={rtl}
      leftPosition={left}
      fill={fill}
      iStyle={iOS}
    />
  );
};
