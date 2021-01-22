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
  name: "Chips",
  desc:
    "Chips are compact elements that represent an input, attribute, or action.",
  /**default value*/
  type: "def",
  view: "smooth",
  color: "success"
};
/**Available variants of TYPES & VIEWS (variables)*/
const shapes = [["Default", "def"], ["Dense", "dense"]];
const views = [["Smooth", "smooth"], ["Outlined", "outlined"]];

/**END OF SETTINGS*/

/**Demo template*/
const Content = props => {
  /*Set states of props*/
  const [isSelect, setSelect] = React.useState(false);
  const [dis, setDis] = React.useState(false);
  const [isIcon, setIcon] = React.useState(true);
  const [isRIcon, setRIcon] = React.useState(false);
  const [isRound, setRound] = React.useState(true);
  const [isRemovable, setRemovable] = React.useState(false);

  const [isNumber, setNumber] = React.useState(false);
  const [isAva, setAva] = React.useState(false);
  const [remove, setRemove] = React.useState([]);

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
            dis={dis}
            remove={remove}
            isIcon={isIcon}
            isSelect={isSelect}
            isRIcon={isRIcon}
            isRemovable={isRemovable}
            setRemove={setRemove}
            isRound={isRound}
            isNumber={isNumber}
            isAva={isAva}
            margin="4px"
          />
        </div>
        <div className="BodyBig demo-api">
          <API
            name={Props.name}
            type={shape}
            view={view}
            color={color}
            dis={dis}
            remove={remove}
            isIcon={isIcon}
            isSelect={isSelect}
            isRIcon={isRIcon}
            isRemovable={isRemovable}
            setRemove={setRemove}
            isRound={isRound}
            isNumber={isNumber}
            isAva={isAva}
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
                shape={shape}
                dis={dis}
                setDis={setDis}
                isIcon={isIcon}
                setIcon={setIcon}
                isSelect={isSelect}
                setSelect={setSelect}
                isRIcon={isRIcon}
                setRIcon={setRIcon}
                isRemovable={isRemovable}
                setRemovable={setRemovable}
                isRound={isRound}
                setRound={setRound}
                isNumber={isNumber}
                setNumber={setNumber}
                isAva={isAva}
                setAva={setAva}
                margin="2px"
                clear={() => setRemove({ ...remove, a: null, b: null })}
              />
              <SelectShapeGroup
                shape={shape}
                setShape={setShape}
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
