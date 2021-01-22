import React from "react";

/* Import component props */
import PropsGroup from "./PropsGroup.jsx";
import SelectShapeGroup from "../SelectShapeGroup.jsx";
import SelectColorGroup from "../SelectColorGroup.jsx";
import SelectViewGroup from "../SelectViewGroup.jsx";
import DemoAppStyle from "../styles/style.module.css";
import { Icon } from "@blueprintjs/core";

import Typography from "../../core/Typography";
import { SidebarContainer } from "../components/SidebarContainer";

/**Import demo component body*/
import { DEMO } from "./DemoComponent.jsx";
/**Import usage & API  of component*/
import { API } from "./api.jsx";

/**SETTINGS OF THIS DEMO*/
/*Set component data (variables)*/
const Props = {
  name: "Toaster",
  desc:
    "A toast is a lightweight, ephemeral notice from an application in direct response to a user's action.",
  /**default value*/
  type: "def",
  view: "outlined",
  color: "primary"
};
/**Available variants of TYPES & VIEWS (variables)*/
const shapes = [["Default", "def"]];
const views = [
  ["Filled", "filled"],
  ["Smooth", "smooth"],
  ["Outlined", "outlined"],
  ["Raised", "raised"]
];
/**END OF SETTINGS*/

/**Demo template*/
const Content = props => {
  /*Set states of props*/
  const [isIcon, setIcon] = React.useState(true);
  const [isLink, setLink] = React.useState(false);
  const [isClose, setClose] = React.useState(true);

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

  const DemoToast = {
    message: "Just a toast!",
    icon: isIcon ? <Icon icon="info-sign" iconSize={24} /> : null,
    action: isLink
      ? {
          href: "https://gum.co/figma2react",
          target: "_blank",
          text: <strong>Yum.</strong>
        }
      : null
    /** API
     * message:
     * Message to display in the body of the toast. Required
     *
     * icon:
     * Name of a Blueprint UI icon (or an icon element) to render before the message.
     *
     * action:
     * Action rendered as a minimal AnchorButton.
     * The toast is dismissed automatically when the user clicks the action button.
     * Omit this prop to omit the action button.
     *
     * timeout:
     * Milliseconds to wait before automatically dismissing toast.
     * Providing a value less than or equal to 0 will disable the timeout (this is discouraged).
     * Default timeout is a 5 seconds
     *
     * onDismiss:
     * Callback invoked when the toast is dismissed, either by the user or by the timeout.
     * The value of the argument indicates whether the toast was closed because the timeout expired.
     *
     */
  };

  /** */
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
            isIcon={isIcon}
            DemoToast={DemoToast}
            isClose={isClose}
          />
        </div>
        <div className="BodyBig demo-api">
          <API
            name={Props.name}
            view={view}
            color={color}
            isIcon={isIcon}
            DemoToast={DemoToast}
            isClose={isClose}
          />
        </div>
      </div>
      {/* Props*/}
      <SidebarContainer>
        <div className={DemoAppStyle["right_sidebar"]}>
          {/**Set this Props component */}
          <div className={DemoAppStyle["demo-props"]}>
            <PropsGroup
              isIcon={isIcon}
              setIcon={setIcon}
              isLink={isLink}
              setLink={setLink}
              isClose={isClose}
              setClose={setClose}
              margin="4px"
            />
            <SelectShapeGroup
              shape={shape}
              setShape={setShape}
              shapes={shapes}
            />
            <SelectViewGroup view={view} setView={setView} views={views} />
            <SelectColorGroup color={color} setColor={setColor} />
          </div>
        </div>
      </SidebarContainer>
      {/***** */}
    </div>
  );
};

export default Content;
