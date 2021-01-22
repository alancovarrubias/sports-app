import React from "react";
import { Overview } from "../../OverviewComponent";
import { OverviewTemplate } from "../../OverviewText";

export const API = props => {
  const { name, color, useAmPm, isArrow } = props;

  /**Overview */
  const OverviewText = <OverviewTemplate name={name} />;

  /**API */
  const APIData = [
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
      prop: "precision",
      type: (
        <>
          string = <i>MINUTE</i>
        </>
      ),
      desc: (
        <>
          The precision of time the user can set. Possible states:
          <b>MINUTE | SECOND | MILLISECOND</b>. The default state is{" "}
          <b>MINUTE</b>.
        </>
      )
    },
    {
      prop: "showArrowButtons",
      type: (
        <>
          boolean = <i>false</i>
        </>
      ),
      desc: <>Whether to show arrows buttons for changing the time.</>
    },
    {
      prop: "useAmPm",
      type: (
        <>
          boolean = <i>false</i>
        </>
      ),
      desc: <>Whether to use a 12 hour format with an AM/PM dropdown.</>
    },
    {
      prop: "value",
      type: <>Date</>,
      desc: (
        <>
          The currently set time. If this prop is provided, the component acts
          in a controlled manner.
        </>
      )
    }
  ];

  /** Code source */
  const Code = `  
  < TimePicker
      <i>color</i> = '${color}' 
      <i>precision</i> = 'MINUTE'
      <i>showArrowButtons</i> = '${isArrow}'
      <i>useAmPm</i> = '${useAmPm}'
     
  />
 `;

  return <Overview overview={OverviewText} apidata={APIData} code={Code} />;
};
