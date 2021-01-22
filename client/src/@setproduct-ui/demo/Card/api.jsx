import React from "react";
import { Overview } from "../OverviewComponent";
import { OverviewTemplate } from "../OverviewText";

export const API = props => {
  const { name, view, color, isInter } = props;

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
          string = <i>smooth</i>
        </>
      ),
      desc: (
        <>
          This prop set the view of the component. Possible states:{" "}
          <b> filled | smooth | outlined| raised </b>. The default state is{" "}
          <b>smooth</b>.
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
          This prop set the color of the component. Possible states:{" "}
          <b>
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
      prop: "interactive",
      type: (
        <>
          boolean = <i>false</i>
        </>
      ),
      desc: (
        <>
          Whether the card should respond to user interactions. If set to true,
          hovering over the card will increase the card's elevation and change
          the mouse cursor to a pointer.
        </>
      )
    },
    {
      prop: "onClick",
      type: <>func</>,
      desc: (
        <>
          Callback invoked when the card is clicked. Recommended when
          interactive is true.
        </>
      )
    },
    {
      prop: "children",
      type: <>any</>,
      desc: <>Card content.</>
    }
  ];

  /** Code source */
  const Code = `  
  < Card
    <i>type</i> = 'def'
    <i>view</i> = '${view}'
    <i>color</i> = '${color}' 
    <i>interactive</i> = '${isInter ? "true" : "false"}'
  > 
      Card component example
  < / Card >           
 `;

  return <Overview overview={OverviewText} apidata={APIData} code={Code} />;
};
