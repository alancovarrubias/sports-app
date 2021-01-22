import React from "react";
import Drawer from "../../core/Drawer";
import { SidebarStateContext } from "../context/SidebarContext";
import { useDevice } from "./customHooks";
import demoAppStyle from "../styles/style.module.css";

export const SidebarContainer = ({ children, left, position }) => {
  let device = useDevice();

  return device === "mobile" || (device !== "desktop" && left) ? (
    <SidebarStateContext.Consumer>
      {({ leftSidebarState, rightSidebarState, setSidebarState }) => (
        <Drawer
          isOpen={left ? leftSidebarState : rightSidebarState}
          size={"240px"}
          onClose={() =>
            setSidebarState({
              left: left ? !leftSidebarState : leftSidebarState,
              right: left ? rightSidebarState : !rightSidebarState
            })
          }
          style={{ padding: 0, overflowY: "auto" }}
          position={position}
          backdropClassName={!left && demoAppStyle.right_sidebar_backdrop}
        >
          {children}
        </Drawer>
      )}
    </SidebarStateContext.Consumer>
  ) : (
    <>{children}</>
  );
};
