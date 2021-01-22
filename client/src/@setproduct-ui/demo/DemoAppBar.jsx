import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import Logo from "../assets/setproduct-logo.svg";

import Button from "../core/Button";
import { CustomButton } from "./components/CustomButton";
import { LicenseButton } from "./components/LicenseButton";
import Navbar from "../core/Navbar";
import NavbarGroup from "../core/Navbar/Group.jsx";
import NavbarHeading from "../core/Navbar/Heading.jsx";

import DemoAppStyle from "./styles/style.module.css";
import * as LINKS from "./constants/Constants";

import { ThemeContext } from "../core/ThemeContext";
import { SidebarStateContext } from "./context/SidebarContext";

const AppBar = props => {
  const { device, location } = props;

  let showFabButton =
    location.pathname === "/docs/colors"
      ? false
      : location.pathname === "/docs/installation"
      ? false
      : location.pathname === "/docs/introduction"
      ? false
      : location.pathname === "/docs/implementation"
      ? false
      : location.pathname === "/docs/principles"
      ? false
      : location.pathname === "/"
      ? false
      : true;

  return (
    <ThemeContext.Consumer>
      {({ isDark, setDark }) => (
        <SidebarStateContext.Consumer>
          {({ leftSidebarState, rightSidebarState, setSidebarState }) => (
            <React.Fragment>
              {showFabButton && (
                <div className={DemoAppStyle.props_button}>
                  <Button
                    type="circle"
                    view="filled"
                    icon={"cog"}
                    color="primary"
                    onClick={() =>
                      setSidebarState({
                        left: leftSidebarState,
                        right: !rightSidebarState
                      })
                    }
                  />
                </div>
              )}

              <Navbar type={device} view="filled" color="primary" fixedToTop>
                <NavbarGroup align="left">
                  <NavbarHeading>
                    <img
                      src={Logo}
                      alt="SetProduct design"
                      style={{ height: "24px" }}
                    />
                  </NavbarHeading>
                </NavbarGroup>
                {/**BOTTONS GROUP */}
                <NavbarGroup align="center" style={{ marginRight: "0.75rem" }}>
                  <Link to={device === "desktop" ? "/components/button" : "#"}>
                    <CustomButton
                      dense={device === "mobile" && true}
                      view="flat"
                      color="primary"
                      text="Components"
                      device={device}
                      /*  active={
                        device !== "mobile" &&
                        location.pathname.match("/components") &&
                        true
                      }*/
                      onClick={() =>
                        setSidebarState({
                          left: !leftSidebarState,
                          right: rightSidebarState
                        })
                      }
                    />
                  </Link>
                  <Link to={device === "desktop" ? "/docs/installation" : "#"}>
                    <CustomButton
                      dense={device === "mobile" && true}
                      view="flat"
                      color="primary"
                      text="How It Works"
                      device={device}
                      /* active={location.pathname === "/docs"}*/
                      onClick={() =>
                        setSidebarState({
                          left: !leftSidebarState,
                          right: rightSidebarState
                        })
                      }
                    />
                  </Link>
                  <a
                    href={LINKS.FIGMA_DEMO_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CustomButton
                      dense={device === "mobile" && true}
                      view="flat"
                      color="primary"
                      text="Figma Preview"
                      device={device}
                    />
                  </a>
                </NavbarGroup>
                {/**ICON-BUTTONS GROUP */}
                <NavbarGroup align="right">
                  <LicenseButton
                    linkTo={LINKS.BUY_LINK}
                    icon="shopping-cart"
                    device={device}
                  />
                </NavbarGroup>
              </Navbar>
            </React.Fragment>
          )}
        </SidebarStateContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
};

export default withRouter(AppBar);
