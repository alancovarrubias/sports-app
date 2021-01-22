import React from "react";
import { Overview } from "../OverviewComponent";
import { OverviewTemplate } from "../OverviewText";

export const API = props => {
  const { name, type, view, color, fill } = props;

  /**Overview */
  const OverviewText = <OverviewTemplate name={name} />;

  /**API */
  const APIData = [
    {
      prop: "type",
      type: (
        <>
          string = <i>default</i>
        </>
      ),
      desc: (
        <>
          This prop set the shape of the component. Possible states:{" "}
          <b> default | dense </b>. The default state is <b>default</b>.
        </>
      )
    },
    {
      prop: "view",
      type: (
        <>
          tring = <i>filled</i>
        </>
      ),
      desc: (
        <>
          This prop set the view of the component. Possible states:{" "}
          <b> filled | flat | smooth | outlined | raised </b>. The default state
          is <b>flat</b>.
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
      prop: "data",
      type: "object",
      desc: (
        <>
          {" "}
          Data object can have next keys:
          {`{ 
        id:  number,  
        text: string,
        icon: string | element,
        rightIcon: string | element,
        isActive: boolean,
        onClick: function
        }`}
          .
        </>
      )
    },
    {
      prop: "fill",
      type: (
        <>
          boolean = <i>false</i>
        </>
      ),
      desc: (
        <>
          Whether this ButtonGroup should expand to fill its container. The
          default state is <b>false</b>.
        </>
      )
    },
    {
      prop: "right",
      type: (
        <>
          boolean = <i>false</i>
        </>
      ),
      desc: <>Right position of ButtonGroup in a container.</>
    }
  ];

  /** Code source */
  const Code = `  
  < ButtonGroup
      <i>type</i> = '${type}' 
      <i>view</i> = '${view}' 
      <i>color</i> = '${color}' 
      <i>data</i> = { data }
      <i>fill</i> = ${fill ? "{true}" : "{false}"}
  />
 `;

  return <Overview overview={OverviewText} apidata={APIData} code={Code} />;
};
