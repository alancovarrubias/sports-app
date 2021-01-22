import React from "react";

/**Import core component (variable)*/
import Typography from "../../core/Typography";
import StyleGrid from "../styles/style.module.css";
import "./style.css";

export const DEMO = props => {
  const { type, color, view, colorStep, small, large } = props;

  return (
    <>
      <div className="demo-content-component" style={{ overflowX: "hidden" }}>
        <div className="section">
          <Typography
            type="body"
            font={"inter"}
            color={color}
            colorStep={60}
            className={"marginTag"}
            small={small}
            large={large}
          >
            {large ? "Large" : small ? "Small" : "Default"} text block
          </Typography>
          <div className={StyleGrid["nowrap"] + " margin"}>
            <Typography
              type={"overline"}
              color={color}
              colorStep={40}
              small={small}
              //style={{ marginBottom: "0.25rem" }}
            >
              {large ? "Large" : small ? "Small" : "Medium"} typography preview
            </Typography>
            <Typography
              type={large ? "h4" : small ? "h6" : "h5"}
              font={view}
              color={color}
              colorStep={colorStep}
              style={{ marginBottom: "0.25rem", whiteSpace: "normal" }}
            >
              The sample of {large ? "large" : small ? "small" : "medium"} text
              block
            </Typography>
            <Typography
              type={type}
              color={color}
              colorStep={colorStep}
              tagName={"div"}
              font={view}
              small={small}
              large={large}
              style={{ whiteSpace: "normal" }}
            >
              One morning, when Gregor Samsa woke from troubled dreams, he found
              himself transformed in his bed into a horrible vermin. He lay on
              his armour-like back, and if he lifted his head a little he could
              see his brown belly, slightly domed and divided by arches into
              stiff sections
            </Typography>
          </div>
        </div>
        <div className="section">
          <Typography
            type="h1"
            font={view}
            color={color}
            colorStep={70}
            className={StyleGrid["nowrap"] + " marginTag"}
          >
            H1 Head
          </Typography>
          <Typography
            type="h1"
            font={view}
            color={color}
            colorStep={colorStep}
            className={StyleGrid["nowrap"] + " margin"}
          >
            Almost before we knew it, we had left the ground
          </Typography>
        </div>
        <div className="section">
          <Typography
            type="h2"
            font={view}
            color={color}
            colorStep={70}
            className={StyleGrid["nowrap"] + " marginTag"}
          >
            H2 Headline
          </Typography>
          <Typography
            type="h2"
            font={view}
            color={color}
            colorStep={colorStep}
            className={StyleGrid["nowrap"] + " margin"}
          >
            Almost before we knew it, we had left the ground, but more lines to
            be shown
          </Typography>
        </div>
        <div className="section">
          <Typography
            type="h3"
            font={view}
            color={color}
            colorStep={70}
            className={"marginTag"}
          >
            H3 Headline
          </Typography>
          <Typography
            type="h3"
            font={view}
            color={color}
            colorStep={colorStep}
            className={StyleGrid["nowrap"] + " margin"}
          >
            Almost before we knew it, we had left the ground, but more lines to
            be shown
          </Typography>
        </div>
        <div className="section">
          <Typography
            type="h4"
            font={view}
            color={color}
            colorStep={70}
            className={"marginTag"}
          >
            H4 Headline
          </Typography>
          <Typography
            type="h4"
            font={view}
            color={color}
            colorStep={colorStep}
            className={StyleGrid["nowrap"] + " margin"}
          >
            Almost before we knew it, we had left the ground, but more lines to
            be shown
          </Typography>
        </div>
        <div className="section">
          <Typography
            type="h5"
            font={view}
            color={color}
            colorStep={70}
            className={"marginTag"}
          >
            H5 Headline
          </Typography>
          <Typography
            type="h5"
            font={view}
            color={color}
            colorStep={colorStep}
            className={StyleGrid["nowrap"] + " margin"}
          >
            Almost before we knew it, we had left the ground, but more lines to
            be shown
          </Typography>
        </div>
        <div className="section">
          <Typography
            type="h6"
            font={view}
            color={color}
            colorStep={70}
            className={"marginTag"}
          >
            H6 Headline
          </Typography>
          <Typography
            type="h6"
            font={view}
            color={color}
            colorStep={colorStep}
            className={StyleGrid["nowrap"] + " margin"}
          >
            Almost before we knew it, we had left the ground, but more lines to
            be shown
          </Typography>
        </div>
      </div>
    </>
  );
};
