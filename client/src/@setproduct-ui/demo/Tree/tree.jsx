import React from "react";

//import { Icon, Tooltip } from "@blueprintjs/core";

import Tree from "../../core/Tree";

import SelectColorGroup from "../SelectColorGroup.jsx";
import SelectViewGroup from "../SelectViewGroup.jsx";
import SelectShapeGroup from "../SelectShapeGroup.jsx";
//import ComponentsMenu from "../ComponentsMenuItems.jsx";
//import PropsGroup from "./PropsGroup.jsx";

import Data from "./data.jsx";

const DemoTree = () => {
  const [shape, setShape] = React.useState("def");
  const [view, setView] = React.useState("smooth");
  const [color, setColor] = React.useState("primary");
  const shapes = [["Default", "def"]];
  const views = [["Smooth", "smooth"]];

  return (
    <div
      style={{
        display: "flex",
        margin: "1rem"
      }}
    >
      {/*}  <ComponentsMenu />*/}
      <div
        style={{
          paddingLeft: "1rem",
          width: "100%"
        }}
      >
        <div
          style={{
            minHeight: "96px",
            width: "340px",
            borderBottom: "1px solid var(--grey10)",
            marginBottom: "1rem"
            //display: "flex"
          }}
        >
          <Tree contents={Data} color={color} />
        </div>
        <div>
          {/* Props*/}
          {/*}   <PropsGroup isDis={isDis} setDis={setDis} margin="4px" />*/}
          {/*MDC_STYLE OPTIONS */}
          <div
            style={{
              display: "flex",
              //borderBottom: "1px solid var(--grey10)",
              marginBottom: "16px"
            }}
          >
            {/**Shape */}
            <div
              style={{
                marginRight: "20px",
                paddingRight: "20px",
                borderRight: "1px solid var(--grey10)"
              }}
            >
              <SelectShapeGroup
                shape={shape}
                setShape={setShape}
                shapes={shapes}
              />
            </div>
            {/*View*/}
            <div
              style={{
                marginRight: "20px",
                paddingRight: "20px",
                borderRight: "1px solid var(--grey10)"
              }}
            >
              <SelectViewGroup view={view} setView={setView} views={views} />
            </div>
            {/*Color*/}
            <div>
              <SelectColorGroup color={color} setColor={setColor} />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              borderBottom: "1px solid var(--grey10)",
              marginBottom: "16px"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DemoTree;
