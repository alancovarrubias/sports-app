import React from "react";

/* Import component props */
import PropsGroup from "./PropsGroup.jsx";
import SelectShapeGroup from "../SelectShapeGroup.jsx";
import SelectColorGroup from "../SelectColorGroup.jsx";
import SelectViewGroup from "../SelectViewGroup.jsx";
import styleGrid from "../../styles/style.module.css";

/**Import demo component body*/
import { DEMO } from "./DemoComponent.jsx";
/**Import usage & API  of component*/
import { API } from "./api.jsx";

/**SETTINGS OF THIS DEMO*/
/*Set component data (variables)*/
const Props = {
  name: "Button",
  desc: "Buttons trigger actions when clicked.",
  /**default value*/
  type: "def",
  view: "filled",
  color: "primary"
};
/**Available variants of TYPES & VIEWS (variables)*/
const shapes = [
  ["Default", "def"],
  ["Square", "square"],
  ["FAB", "fab"],
  ["Action", "action"],
  ["Icon", "icon"]
];
const views = [
  ["Flat", "flat"],
  ["Filled", "filled"],
  ["Smooth", "smooth"],
  ["Outlined", "outlined"],
  ["Raised", "raised"]
];
/**END OF SETTINGS*/

/**Demo template*/
const Content = props => {
  /*Set states of props*/
  const [fill, setFill] = React.useState(false);
  const [dis, setDis] = React.useState(false);
  const [icon, setIcon] = React.useState(false);
  const [rightIcon, setRightIcon] = React.useState(false);
  const [isLoad, setLoad] = React.useState(false);

  const [shape, setShape] = React.useState(Props.type);
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
      <div className={styleGrid["content-component"]}>
        {/*COMPONENT*/}
        {/*NAME*/}
        <div className="H4 demo-name">{Props.name}</div>
        {/*Description */}
        <div className="H5 demo-desc">{Props.desc}</div>
        {/*Content*/}
        <div className="demo-content-component">
          <DEMO
            mdc_style={[shape, view, color]}
            fill={fill}
            dis={dis}
            icon={icon}
            rightIcon={rightIcon}
            isLoad={isLoad}
          />
        </div>
        <div className="BodyBig demo-api">
          <API />
        </div>
      </div>
      {/* Props*/}
      <div className={styleGrid["content-props"]}>
        {/**Set this Props component */}
        <PropsGroup
          shape={shape}
          fill={fill}
          setFill={setFill}
          dis={dis}
          setDis={setDis}
          icon={icon}
          setIcon={setIcon}
          rightIcon={rightIcon}
          setRightIcon={setRightIcon}
          isLoad={isLoad}
          setLoad={setLoad}
          margin="2px"
        />
        <SelectShapeGroup shape={shape} setShape={setShape} shapes={shapes} />
        <SelectViewGroup view={view} setView={setView} views={views} />
        <SelectColorGroup color={color} setColor={setColor} />
      </div>
      {/***** */}
    </div>
  );
};

export default Content;
