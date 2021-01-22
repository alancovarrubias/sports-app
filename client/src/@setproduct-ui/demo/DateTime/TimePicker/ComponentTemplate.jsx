import React from "react";

/* Import component props */
import PropsGroup from "./PropsGroup.jsx";
import SelectColorGroup from "../../SelectColorGroup.jsx";
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
  name: "Time Picker",
  desc: "A TimePicker allows the user to specify a time.",
  /**default value*/
  type: "default",
  view: "outlined",
  color: "primary"
};
/**END OF SETTINGS*/

/**Demo template*/
const Content = props => {
  /*Set states of props*/
  const [isArrow, setArrow] = React.useState(false);
  const [useAmPm, setAmPm] = React.useState(false);
  const [isSec, setSec] = React.useState(false);
  const [isMsec, setMsec] = React.useState(false);
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
            color={color}
            isArrow={isArrow}
            useAmPm={useAmPm}
            isSec={isSec}
            isMsec={isMsec}
          />
        </div>
        <div className="BodyBig demo-api">
          <API
            name={Props.name}
            color={color}
            isArrow={isArrow}
            useAmPm={useAmPm}
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
              // shape={shape}
              isArrow={isArrow}
              setArrow={setArrow}
              useAmPm={useAmPm}
              setAmPm={setAmPm}
              isSec={isSec}
              isMsec={isMsec}
              setSec={setSec}
              setMsec={setMsec}
              margin="2px"
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
