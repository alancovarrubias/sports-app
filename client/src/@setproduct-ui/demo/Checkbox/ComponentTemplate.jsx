import React from "react";

/* Import component props */
import PropsGroup from "./PropsGroup.jsx";
import SelectShapeGroup from "../SelectShapeGroup.jsx";
import SelectColorGroup from "../SelectColorGroup.jsx";
import SelectViewGroup from "../SelectViewGroup.jsx";
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
  name: "Checkbox",
  desc:
    "A checkbox allows the user to toggle between checked, unchecked, and (rarely) indeterminate states.",
  /**default value*/
  type: "def",
  view: "flat",
  color: "primary"
};
/**Available variants of TYPES & VIEWS (variables)*/
const shapes = [["Default", "def"], ["Dense", "dense"]];
const views = [
  ["Flat", "flat"],
  ["Smooth", "smooth"],
  ["Outlined", "outlined"],
  ["Raised", "raised"]
];
/**END OF SETTINGS*/

/**Demo template*/
const Content = props => {
  /*Set states of props*/
  const [indet, setIndet] = React.useState(false);
  const [dis, setDis] = React.useState(false);
  const [help, setHelp] = React.useState(false);
  const [rtl, setRtl] = React.useState(false);
  const [right, setRight] = React.useState(false);
  const [fill, setFill] = React.useState(false);
  const [isDemo, setDemo] = React.useState(true);

  const [type, setType] = React.useState(Props.type);
  const [view, setView] = React.useState(Props.view);
  const [color, setColor] = React.useState(Props.color);

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
            type={type}
            view={view}
            color={color}
            isDemo={isDemo}
            setDemo={setDemo}
            indet={indet}
            help={help}
            right={right}
            dis={dis}
            rtl={rtl}
            fill={fill}
          />
        </div>
        <div className="BodyBig demo-api">
          <API
            type={type}
            color={color}
            isDemo={isDemo}
            setDemo={setDemo}
            indet={indet}
            help={help}
            right={right}
            dis={dis}
            rtl={rtl}
            fill={fill}
            name={Props.name}
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
            <div className={DemoAppStyle["demo-props"]}>
              <PropsGroup
                shape={type}
                indet={indet}
                setIndet={setIndet}
                dis={dis}
                setDis={setDis}
                help={help}
                setHelp={setHelp}
                rtl={rtl}
                setRtl={setRtl}
                right={right}
                setRight={setRight}
                fill={fill}
                setFill={setFill}
                margin="4px"
              />
              <SelectShapeGroup
                shape={type}
                setShape={setType}
                shapes={shapes}
              />
              <SelectViewGroup view={view} setView={setView} views={views} />
              <SelectColorGroup color={color} setColor={setColor} />
            </div>
          </CustomScrollbar>
        </div>
      </SidebarContainer>
      {/***** */}
    </div>
  );
};

export default Content;
