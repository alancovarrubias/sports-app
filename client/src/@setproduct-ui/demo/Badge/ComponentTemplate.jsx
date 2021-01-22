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
  name: "Badge",
  desc:
    "Notification badge conveys summary or status information specific to your app",
  /**default value*/
  view: "filled",
  color: "danger"
};
/**Available variants of TYPES & VIEWS (variables)*/
const views = [
  ["Filled", "filled"],
  ["Smooth", "smooth"],
  ["Outlined", "outlined"]
];
/**END OF SETTINGS*/

/**Demo template*/
const Content = props => {
  /*Set states of props*/
  const [isDot, setDot] = React.useState(false);
  const [isHide, setHide] = React.useState(false);
  const [isDense, setDense] = React.useState(false);
  const [isLeft, setLeft] = React.useState(false);
  const [isBottom, setBottom] = React.useState(false);

  const [view, setView] = React.useState(Props.view);
  const [color, setColor] = React.useState(Props.color);

  React.useEffect(() => {
    document.title = `React Design System: component ${Props.name}`;
    document.getElementsByTagName("META")[
      "description"
    ].content = `Demo ${Props.name} component for React Setproduct Design System with possible props. ${Props.desc}`;
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
            view={view}
            color={color}
            isHide={isHide}
            isDot={isDot}
            dense={isDense}
            left={isLeft}
            bottom={isBottom}
          />
        </div>
        <div className="BodyBig demo-api">
          <API
            name={Props.name}
            view={view}
            color={color}
            isHide={isHide}
            isDot={isDot}
            dense={isDense}
            left={isLeft}
            bottom={isBottom}
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
              isDense={isDense}
              setDense={setDense}
              isHide={isHide}
              setHide={setHide}
              isDot={isDot}
              setDot={setDot}
              isLeft={isLeft}
              setLeft={setLeft}
              isBottom={isBottom}
              setBottom={setBottom}
              margin="2px"
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
