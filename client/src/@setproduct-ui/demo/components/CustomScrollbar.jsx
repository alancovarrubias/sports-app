import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { useDevice } from "./customHooks";

export const CustomScrollbar = ({ children, left, ...props }) => {
  let device = useDevice();

  return device === "mobile" || (device !== "desktop" && left) ? (
    <>{children}</>
  ) : (
    <Scrollbars {...props}>{children}</Scrollbars>
  );
};
