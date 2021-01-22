import React from "react";

/* Import component props */
import PropsGroup from "./PropsGroup.jsx";
import SelectColorGroup from "../../SelectColorGroup.jsx";
import SelectViewGroup from "../../SelectViewGroup.jsx";
import DemoAppStyle from "../../styles/style.module.css";

import Typography from "../../../core/Typography";
import { SidebarContainer } from "../../components/SidebarContainer";
import { CustomScrollbar } from "../../components/CustomScrollbar";

/**Import demo component body*/
import { DEMO } from "./DemoComponent.jsx";
/**Import usage & API  of component*/
import { API } from "./api.jsx";

/**SETTINGS OF THIS DEMO*/
/*Set component data (variables)*/
const Props = {
  name: "Date Picker",
  desc:
    "A DatePicker shows a monthly calendar and allows the user to choose a single date.",
  /**default value*/
  type: "default",
  view: "flat",
  color: "primary"
};
/**Available variants of TYPES & VIEWS (variables)*/
const views = [
  ["Flat", "flat"],
  ["Smooth", "smooth"],
  // ["Outlined", "outlined"],
  ["Raised", "raised"]
];
/**END OF SETTINGS*/

/**Demo template*/
const Content = props => {
  /*Set states of props*/
  const [curDay, setCurDay] = React.useState(true);
  const [bar, setBar] = React.useState(false);

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
        <div className="demo-content-component" style={{ paddingLeft: "2rem" }}>
          <DEMO view={view} color={color} curDay={curDay} bar={bar} />
        </div>
        <div className="BodyBig demo-api">
          <API
            name={"DatePicker"}
            view={view}
            color={color}
            curDay={curDay}
            bar={bar}
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
              curDay={curDay}
              bar={bar}
              setCurDay={setCurDay}
              setBar={setBar}
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
