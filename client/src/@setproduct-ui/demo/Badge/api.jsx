import React from "react";
import { Overview } from "../OverviewComponent";
import { OverviewTemplate } from "../OverviewText";

export const API = props => {
  const { name, view, isHide, isDot, left, bottom, dense } = props;
  /**Overview */
  const OverviewText = <OverviewTemplate name={name} />;

  /**API */
  const APIData = [
    {
      prop: "view",
      type: (
        <>
          string = <i>filled</i>
        </>
      ),
      desc: (
        <>
          {" "}
          This prop set the view of the component. Possible states:{" "}
          <b> filled | smooth | outlined </b>. The default state is{" "}
          <b>filled</b>.
        </>
      )
    },
    {
      prop: "color",
      type: (
        <>
          string = <i>default</i>
        </>
      ),
      desc: (
        <>
          {" "}
          This prop set the color of the component. Possible states:{" "}
          <b>
            {" "}
            default | primary | warning | danger | success | primary_alt |
            warning_alt | danger_alt | success_alt{" "}
          </b>
          . The default state is <b>default</b>.
        </>
      )
    },
    {
      prop: "className",
      type: "string",
      desc:
        "A space-delimited list of class names to pass along to a child element."
    },
    {
      prop: "value",
      type: "string",
      desc: <>Badge value. Haven't default state.</>
    },
    {
      prop: "dense",
      type: (
        <>
          boolean = <i>false</i>
        </>
      ),
      desc: <>Whether this badge should use minimal styles.</>
    },
    {
      prop: "hide",
      type: (
        <>
          boolean = <i>false</i>
        </>
      ),
      desc: (
        <>
          If set to true, the badge will be hidden. The default state is{" "}
          <b>false</b>
        </>
      )
    },
    {
      prop: "dot",
      type: (
        <>
          boolean = <i>false</i>
        </>
      ),
      desc: (
        <>
          If set to true, the badge form will be "dot". The default state is{" "}
          <b>false</b>
        </>
      )
    },
    {
      prop: "left",
      type: (
        <>
          boolean = <i>false</i>
        </>
      ),
      desc: (
        <>
          If set to true, the badge position will be "left". The default
          position of badge is on the right. The default state is <b>false</b>
        </>
      )
    },
    {
      prop: "bottom",
      type: (
        <>
          boolean = <i>false</i>
        </>
      ),
      desc: (
        <>
          If set to true, the badge position will be "bottom". The default
          position of badge is on the top. The default state is <b>false</b>
        </>
      )
    }
  ];

  /** Code source */
  const Code = `  
  < Badge
    <i>view</i> = '${view}' 
    <i>value</i> = "New"
    <i>hide</i> = { ${isHide ? "true" : "false"} }
    <i>dot</i> = { ${isDot ? "true" : "false"} }
    <i>dense</i> = { ${dense ? "true" : "false"} }
    <i>left</i> = { ${left ? "true" : "false"} }
    <i>bottom</i> = { ${bottom ? "true" : "false"} }
  >
    < Button text="Button" view="outlined" />
  < / Badge >
 `;

  return <Overview overview={OverviewText} apidata={APIData} code={Code} />;
};
