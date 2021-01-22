import React from "react";
import { Link } from "react-router-dom";

/**Import core component (variable)*/
/**Import NAVBAR components parts */
import NavbarGroup from "../../core/Navbar/Group.jsx";
import NavbarHeading from "../../core/Navbar/Heading.jsx";
import Navbar from "../../core/Navbar";
import { CustomButton } from "../components/CustomButton";
/** */

/*SetProduct components*/
import Button from "../../core/Button";
/** */

export const DEMO = props => {
  const { type, view, color, setShape, location } = props;

  /**Get and store window width */
  const [sizeW, setW] = React.useState(window.innerWidth);

  React.useEffect(() => {
    window.addEventListener("resize", () => setW(window.innerWidth));
    sizeW <= 920
      ? setShape("mobile")
      : sizeW <= 1440
      ? setShape("tablet")
      : setShape("desktop");
  }, [setShape, sizeW]);

  const maxWidth =
    type === "mobile" ? "360px" : type === "tablet" ? "1024px" : "100%";

  return (
    <div style={{ maxWidth: maxWidth }}>
      {/*APPBAR*/}
      <Navbar type={type} view={view} color={color} style={{ zIndex: "0" }}>
        {/**LOGO */}
        <NavbarGroup align="left">
          <NavbarHeading>
            <Button
              type={type === "mobile" ? "icon" : "circle"}
              view="smooth"
              color={color}
              icon="menu"
              active={true}
              dense
            />
          </NavbarHeading>
        </NavbarGroup>

        {/**BOTTONS GROUP */}
        <NavbarGroup align="center">
          {/**BUTTON HOME*/}
          <Link
            to="/components/navbar/dashboard"
            style={{ textDecoration: "none" }}
          >
            {view === "filled" ? (
              <CustomButton
                view="flat"
                color={color}
                text="Dashboard"
                device={type}
                active={location.pathname.match("dashboard") && true}
                dense={type === "desktop" ? false : true}
              />
            ) : (
              <Button
                type="default"
                view={view === "smooth" ? view : "flat"}
                color={color}
                text="Dashboard"
                active={location.pathname.match("dashboard") && true}
                dense={type === "desktop" ? false : true}
              />
            )}
          </Link>
          {/**BUTTON MESSAGES*/}
          <Link
            to="/components/navbar/messages"
            style={{ textDecoration: "none" }}
          >
            {view === "filled" ? (
              <CustomButton
                view="flat"
                color={color}
                text="Messages"
                device={type}
                active={location.pathname.match("messages") && true}
                dense={type === "desktop" ? false : true}
              />
            ) : (
              <Button
                type="default"
                view={view === "smooth" ? view : "flat"}
                color={color}
                text="Messages"
                active={location.pathname.match("messages") && true}
                dense={type === "desktop" ? false : true}
              />
            )}
          </Link>

          {/**BUY NOW BUTTON*/}
          <Link
            to="/components/navbar/notifications"
            style={{ textDecoration: "none" }}
          >
            {view === "filled" ? (
              <CustomButton
                view="flat"
                color={color}
                text="Notifications"
                device={type}
                active={location.pathname.match("notifications") && true}
                dense={type === "desktop" ? false : true}
              />
            ) : (
              <Button
                type="default"
                view={view === "smooth" ? view : "flat"}
                color={color}
                text="Notifications"
                active={location.pathname.match("notifications") && true}
                dense={type === "desktop" ? false : true}
              />
            )}
          </Link>
          {/** */}
        </NavbarGroup>
        {/**ICON-BUTTONS GROUP */}
        <NavbarGroup align="right">
          <Link
            to="/components/navbar/sign-in"
            style={{
              textDecoration: "none"
            }}
          >
            <Button
              type="default"
              view={view === "filled" ? "smooth" : "outlined"}
              color={color}
              text="Sign In"
              style={{ marginLeft: "6px" }}
              active={location.pathname.match("sign-in") && true}
              dense={type === "desktop" ? false : true}
            />
          </Link>
          <Link
            to="/components/navbar/register"
            style={{
              textDecoration: "none"
            }}
          >
            <Button
              type="default"
              view="filled"
              color={color}
              text="Register"
              style={{ marginLeft: "1rem" }}
              active={location.pathname.match("register") && true}
              dense={type === "desktop" ? false : true}
            />
          </Link>
        </NavbarGroup>
        {/** */}
      </Navbar>
      {/*** END OF DEMO *************** */}
    </div>
  );
};
