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
  name: "Hamburger",
  desc: "A Hamburger opens to reveal a navigation menu.",
  /**default value*/
  type: "default",
  view: "outlined",
  color: "primary"
};
/**Available variants of TYPES & VIEWS (variables)*/
const shapes = [["Default", "default"], ["Circle", "circle"]];
const views = [
  ["Flat", "flat"],
  ["Filled", "filled"],
  ["Smooth", "smooth"],
  ["Outlined", "outlined"]
];
/**END OF SETTINGS*/

const variants = [
  ["Slider", "slider"],
  ["Elastic", "elastic"],
  ["Emphatic", "emphatic"],
  ["Squeeze", "squeeze"],
  ["Spin", "spin"]
];

/**Demo template*/
const Content = props => {
  /*Set states of props*/

  const [rounded, setRounded] = React.useState(true);
  const [burgerSize, setBurgerSize] = React.useState(32);
  const [variant, setVariant] = React.useState("slider");

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
            type={shape}
            view={view}
            color={color}
            variant={variant}
            rounded={rounded}
            size={burgerSize}
          />
        </div>
        <div className="BodyBig demo-api">
          <API
            name={Props.name}
            type={shape}
            view={view}
            color={color}
            rounded={rounded}
            size={burgerSize}
            variant={variant}
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
              rounded={rounded}
              setRounded={setRounded}
              burgerSize={burgerSize}
              setBurgerSize={setBurgerSize}
              variants={variants}
              variant={variant}
              setVariant={setVariant}
              margin="2px"
            />
            <SelectShapeGroup
              shape={shape}
              setShape={setShape}
              shapes={shapes}
            />
            <SelectViewGroup view={view} setView={setView} views={views} />
            <SelectColorGroup color={color} setColor={setColor} />
          </CustomScrollbar>
        </div>
      </SidebarContainer>
      {/***** */}
    </div>
  );
};

export default Content;
