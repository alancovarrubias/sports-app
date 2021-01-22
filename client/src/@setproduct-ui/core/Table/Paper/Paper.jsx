import React from "react";
import cx from "classnames";

import Paper from "@material-ui/core/Paper";

import Type from "./paper.module.css";
import View from "./_view.module.css";
import Color from "../../../styles/color.module.css";

const SP_Paper = ({
  type = "def",
  view = "filled",
  color = "default",
  children,
  ...props
}) => (
  <Paper className={cx(Type[type], View[view], Color[color])} {...props}>
    {children}
  </Paper>
);

export default SP_Paper;
