import React from "react";
import { Overview } from "../OverviewComponent";
import { OverviewTemplate } from "../OverviewText";

export const API = props => {
  const { color, animate, stripes, value } = props;

  /**Overview */
  const OverviewText = <OverviewTemplate name={"ProgressBar"} />;

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
          / The default state is <b>default</b>.
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
      prop: "animate",
      type: (
        <>
          boolean = <i>true</i>
        </>
      ),
      desc: <>Whether the background should animate.</>
    },
    {
      prop: "stripes",
      type: (
        <>
          boolean = <i>true</i>
        </>
      ),
      desc: <>Whether the background should be striped.</>
    },
    {
      prop: "value",
      type: <>number</>,
      desc: (
        <>
          A value between 0 and 1 (inclusive) representing how far along the
          operation is. Values below 0 or above 1 will be interpreted as 0 or 1,
          respectively. Omitting this prop will result in an "indeterminate"
          progress meter that fills the entire bar.
        </>
      )
    }
  ];

  /** Code source */
  const Code = `  
  < ProgressBar
          <i>type</i> = 'def'
          <i>view</i> = 'filled'
          <i>color</i> = '${color}' 
          <i>animate</i> = ${animate ? "{true}" : "{false}"}
          <i>stripes</i> = ${stripes ? "{true}" : "{false}"}
          <i>value</i> = '${value / 100}'
  / >           
 `;

  return <Overview overview={OverviewText} apidata={APIData} code={Code} />;
};
