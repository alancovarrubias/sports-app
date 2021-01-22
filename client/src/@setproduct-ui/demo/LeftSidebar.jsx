import React from "react";
import { withRouter } from "react-router";
import TreeLink from "../core/Tree/TreeLink.jsx";
import { Data } from "./LeftSidebarData";
import style from "./styles/demo.module.css";
//import styled from "styled-components";
import { SidebarStateContext } from "./context/SidebarContext";

const LeftSidebar = props => {
  let data = Data;

  data.map(i =>
    i.childNodes.map(
      child =>
        child.link === props.location.pathname
          ? (child.isSelected = true) & !!i.isExpanded
          : (child.isSelected = false) /* & (i.icon = "folder-close")*/
    )
  );

  return (
    <SidebarStateContext.Consumer>
      {({ leftSidebarState, rightSidebarState, setSidebarState }) => (
        <div onClick={() => setSidebarState({ left: false, right: false })}>
          <TreeLink
            contents={data}
            color="primary"
            className={style["leftSidebar"]}
          />
        </div>
      )}
    </SidebarStateContext.Consumer>
  );
};

export default withRouter(LeftSidebar);
