import React from "react";

/**Import core component (variable)*/
import { TabsData } from "./DemoData.jsx";
import DemoTabs from "./DemoTabs.jsx";

export const DEMO = props => {
  const { type, view, color, isIcon, fill } = props;
  return (
    <DemoTabs
      type={type}
      view={view}
      color={color}
      data={TabsData}
      isIcon={isIcon}
      fill={fill}
    />
  );
};
