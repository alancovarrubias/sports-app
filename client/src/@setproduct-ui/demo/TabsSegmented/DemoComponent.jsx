import React from "react";

/**Import core component (variable)*/
import { TabsData } from "./DemoData.jsx";
import { Icon, Tab } from "@blueprintjs/core";
import Tabs from "../../core/Tabs/Segmented";

export const DEMO = props => {
  const { type, view, color, isIcon, right } = props;
  const data = TabsData;
  return (
    <Tabs type={type} view={view} color={color} id="DemoTabs" right={right}>
      {data.map(
        i =>
          i.visible && (
            <Tab
              key={i.id}
              id={i.id}
              title={isIcon ? <Icon icon={i.icon} /> : <>{i.title}</>}
              panel={i.panel}
            />
          )
      )}
    </Tabs>
  );
};
