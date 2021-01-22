import React from "react";
import { Overview } from "../OverviewComponent";
import { OverviewTemplate } from "../OverviewText";

export const API = props => {
  const { name, color, pos, isOpen } = props;

  /**Overview */
  const OverviewText = <OverviewTemplate name={name} />;

  /**API */
  const APIData = [
    {
      prop: "type",
      type: (
        <>
          string = <i>def</i>
        </>
      ),
      desc: (
        <>
          This prop set the shape of the component. Possible states:{" "}
          <b> def </b>. The default state is <b>def</b>.
        </>
      )
    },
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
          <b> filled </b>. The default state is <b>filled</b>.
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
      type: <>string</>,
      desc:
        "A space-delimited list of class names to pass along to a child element."
    },
    {
      prop: "contents",
      type: <>array</>,
      desc: (
        <>
          The data specifying the contents and appearance of the tree. Required.
        </>
      )
    },
    {
      prop: "position",
      type: (
        <>
          string = <i>auto</i>
        </>
      ),
      desc: (
        <>
          The position (relative to the target) at which the popover should
          appear. The default value of "auto" will choose the best position when
          opened and will allow the popover to reposition itself to remain
          onscreen as the user scrolls around.
        </>
      )
    },
    {
      prop: "isOpen",
      type: <>boolean</>,
      desc: (
        <>
          Whether the popover is visible. Passing this prop puts the popover in
          controlled mode, where the only way to change visibility is by
          updating this property.
        </>
      )
    },
    {
      prop: "disabled",
      type: (
        <>
          boolean = <i>false</i>
        </>
      ),
      desc: <>Prevents the popover from appearing when true.</>
    }
  ];

  /** Code source */
  const Code = `  
  < Tooltip
      <i>color</i> = '${color}' 
      <i>contents</i> = 'Tooltip example'
      <i>position</i> = '${pos}'
      <i>isOpen</i> = ${isOpen ? "{true}" : "{false}"}
      disab<i></i>led = {false}
  > 
      < Button <i>view</i>="outlined" <i>color</i>="primary" <i>text</i>="Hover me" / >
  < / Tooltip >
 `;

  return <Overview overview={OverviewText} apidata={APIData} code={Code} />;
};
