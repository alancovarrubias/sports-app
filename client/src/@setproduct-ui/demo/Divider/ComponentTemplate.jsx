import React from "react";

/* Import component props */
import PropsGroup from "./PropsGroup.jsx";

import SelectColorGroup from "../SelectColorGroup.jsx";

import DemoAppStyle from "../styles/style.module.css";

import Typography from "../../core/Typography";
import { SidebarContainer } from "../components/SidebarContainer";
import { CustomScrollbar } from "../components/CustomScrollbar";

/**Import demo component body*/
import { DEMO } from "./DemoComponent.jsx";
/**Import usage & API  of component*/
import { API } from "./api.jsx";

/**SETTINGS OF THIS DEMO*/
/*Set component data (variables)*/
const Props = {
  name: "Divider",
  desc:
    "Use dividers to add a vertical or horizontal separation to the content.",
  /**default value*/
  type: "default",
  view: "smooth",
  color: "primary"
};
/**Available variants of TYPES & VIEWS (variables)*/
/**END OF SETTINGS*/

/**Demo template*/
const Content = props => {
  /*Set states of props*/
  const [color, setColor] = React.useState(Props.color);
  const [colorStep, setColorStep] = React.useState(10);
  const [size, setSize] = React.useState(2);
  const [isVert, setVert] = React.useState(false);

  React.useEffect(() => {
    document.title = `React Design System: component ${Props.name}`;
    document.getElementsByTagName("META")["description"].content = `Demo ${
      Props.name
    } component for React Setproduct Design System with possible props. ${
      Props.desc
    }`;
  });

  return (
    <div>
      <div className={DemoAppStyle["content-component"]}>
        {/*COMPONENT*/}
        {/*NAME*/}
        <Typography type="h4" className="demo-name">
          {Props.name}
        </Typography>
        {/*Description */}
        <Typography type="h6" colorStep={60} className="demo-desc">
          {Props.desc}
        </Typography>
        {/*Content*/}
        <div className="demo-content-component">
          <DEMO
            color={color}
            size={size}
            colorStep={colorStep}
            vertical={isVert}
          />
        </div>
        <div className="BodyBig demo-api">
          <API
            name={Props.name}
            color={color}
            size={size}
            colorStep={colorStep}
          />
        </div>
      </div>
      {/* Props*/}
      <SidebarContainer>
        <div className={DemoAppStyle["right_sidebar"]}>
          <CustomScrollbar
            autoHide
            autoHideTimeout={2000}
            hideTracksWhenNotNeeded
            renderThumbHorizontal={() => {
              return <div />;
            }}
            renderTrackHorizontal={() => <div />}
          >
            {/**Set this Props component */}
            <PropsGroup
              size={size}
              setSize={setSize}
              colorStep={colorStep}
              setColorStep={setColorStep}
              isVert={isVert}
              setVert={setVert}
            />

            <SelectColorGroup color={color} setColor={setColor} />
          </CustomScrollbar>
        </div>
      </SidebarContainer>
      {/***** */}
    </div>
  );
};

export default Content;
