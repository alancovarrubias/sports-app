import React from "react";
import { Overview } from "../../OverviewComponent";
import { OverviewTemplate } from "../../OverviewText";

export const API = props => {
  const { name, view, color, bar, curDay } = props;

  /**Overview */
  const OverviewText = <OverviewTemplate name={name} />;

  /**API */
  const APIData = [
    {
      prop: "view",
      type: (
        <>
          tring = <i>flat</i>
        </>
      ),
      desc: (
        <>
          {" "}
          This prop set the view of the component. Possible states:{" "}
          <b> flat | smooth | raised </b>. The default state is <b>filled</b>.
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
      prop: "highlightCurrentDay",
      type: (
        <>
          boolean = <i>false</i>
        </>
      ),
      desc: "Whether the current day should be highlighted in the calendar."
    },

    {
      prop: "showActionsBar",
      type: (
        <>
          boolean = <i>false</i>
        </>
      ),
      desc: (
        <>
          Whether the bottom bar displaying "Today" and "Clear" buttons should
          be shown.
        </>
      )
    }
  ];

  /** Code source */
  const Code = `  
  < DatePicker
      <i>view</i> = '${view}' 
      <i>color</i> = '${color}' 
      <i>highlightCurrentDay</i> = {${curDay ? "true" : "false"}}
      <i>showActionsBar</i> = {${bar ? "true" : "false"}}
  />
 `;

  return <Overview overview={OverviewText} apidata={APIData} code={Code} />;
};
