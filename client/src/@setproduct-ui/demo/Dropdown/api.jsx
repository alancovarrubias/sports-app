import React from "react";
import { Overview } from "../OverviewComponent";
import { OverviewTemplate } from "../OverviewText";

export const API = props => {
  const { name, view, color, dense } = props;

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
          <b> filled | smooth | outlined | raised </b>. The default state is{" "}
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
      prop: "text",
      type: "string",
      desc: <>Dropdown button text.</>
    },
    {
      prop: "dense",
      type: "boolean",
      desc: <>Whether this button should use minimal styles.</>
    },
    {
      prop: "position = 'bottom-left'",
      type: "string ",
      desc: (
        <>
          The position (relative to the target) at which the popover should
          appear. The default value is <b>bottom-left</b>. Possible values:{" "}
          <b>
            "bottom-left" | "auto" | "auto-end" | "auto-start" | "bottom" |
            "bottom-right" | "left" | "left-bottom" | "left-top" | "right" |
            "right-bottom" | "right-top" | "top" | "top-left" | "top-right"
          </b>
        </>
      )
    },
    {
      prop: "content",
      type: <>string | Element</>,
      desc: (
        <>
          The content displayed inside the popover. This can instead be provided
          as the second element in children (first is target).
        </>
      )
    }
  ];

  /** Code source */
  const Code = `  
  < Button
      <i>view</i> = '${view}' 
      <i>color</i> = '${color}' 
      <i>text</i> = "Dropdown"
      <i>position</i> = "bottom-left"
      <i>content</i> = {<ExampleMenu view='${view}' color='${color}' dense='${dense}' />}
      <i>dense</i> = '${dense}'
  />
 `;

  return <Overview overview={OverviewText} apidata={APIData} code={Code} />;
};
