import React from "react";
import { Overview } from "../OverviewComponent";
import { OverviewTemplate } from "../OverviewText";

export const API = props => {
  const { name, color, from } = props;

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
          This prop set the color of the component. Possible states:
          <b>
            default | primary | warning | danger | success | primary_alt |
            warning_alt | danger_alt | success_alt
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
      prop: "collapseFrom",
      type: (
        <>
          string = <i>start</i>
        </>
      ),
      desc: (
        <>
          Which direction the breadcrumbs should collapse from: start or end.
          Possible states: <b>start | end</b>
        </>
      )
    },
    {
      prop: "items",
      type: <>array</>,
      desc: (
        <>
          All breadcrumbs to display. Breadcrumbs that do not fit in the
          container will be rendered in an overflow menu instead.
        </>
      )
    }
  ];

  /** Code source */
  const Code = `  
  < Breadcrumbs
      <i>color</i> = '${color}' 
      <i>collapseFrom</i> = { ${from} }
      <i>items</i> = { items }
  />
 `;

  return <Overview overview={OverviewText} apidata={APIData} code={Code} />;
};
