import React from "react";

/* Import component props */
import PropsGroup from "./PropsGroup.jsx";
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
  name: "Typography",
  desc:
    "Use typography component to adjust body text, captions and paragraphs.",
  /**default value*/
  type: "body",
  view: "inter",
  color: "default"
};
/**Available variants of TYPES & VIEWS (variables)*/

const views = [
  ["Inter", "inter"],
  ["Plex", "plex"],
  ["Manrope", "manrope"],
  ["Roboto", "roboto"],
  ["Lato", "lato"]
];
/**END OF SETTINGS*/

/**Demo template*/
const Content = props => {
  /*Set states of props*/
  const [large, setLarge] = React.useState(false);
  const [small, setSmall] = React.useState(false);
  const [colorStep, setColorStep] = React.useState(100);

  /*const [shape, setShape] = React.useState(Props.type);*/
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
    <>
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

        <DEMO
          type={Props.type}
          view={view}
          color={color}
          small={small}
          large={large}
          colorStep={colorStep}
        />

        <div className="BodyBig demo-api">
          <API
            name={Props.name}
            type={Props.type}
            color={color}
            small={small}
            large={large}
            colorStep={colorStep}
            font={view}
            tagName={"div"}
          />
        </div>
      </div>

      {/* Props*/}
      <SidebarContainer>
        <div className={DemoAppStyle.right_sidebar}>
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
                colorStep={colorStep}
                setColorStep={setColorStep}
                large={large}
                setLarge={setLarge}
                small={small}
                setSmall={setSmall}
                margin="2px"
              />
              <SelectViewGroup view={view} setView={setView} views={views} />
              <SelectColorGroup color={color} setColor={setColor} />
            </div>
          </CustomScrollbar>
        </div>
      </SidebarContainer>
    </>
  );
};

export default Content;
