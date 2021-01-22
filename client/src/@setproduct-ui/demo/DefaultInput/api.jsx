import React from "react";
import { Overview } from "../OverviewComponent";
import { OverviewTemplate } from "../OverviewText";

export const API = props => {
  const { isDense, isPass, view, isClear, isSuccess, isError, isFill } = props;

  /**Overview */
  const OverviewText = (
    <OverviewTemplate name={"DefaultInput"} folder="Inputs/" />
  );

  /**API */
  const APIData = [
    {
      prop: "view",
      type: (
        <>
          string = <i>smooth</i>
        </>
      ),
      desc: (
        <>
          This prop set the view of the component. Possible states:
          <b> smooth | outlined | raised | filled </b>. The default state is{" "}
          <b>smooth</b>.
        </>
      )
    },
    {
      prop: "color",
      type: (
        <>
          string = <i>primary</i>
        </>
      ),
      desc: (
        <>
          This prop set the color of the component. Possible states:
          <b> primary | default</b>. The default state is <b>primary</b>.
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
      prop: "label",
      type: <>string</>,
      desc: <>Label text.</>
    },
    {
      prop: "value",
      type: <>string</>,
      desc: <>Form value of the input, for controlled usage.</>
    },
    {
      prop: "placeholder",
      type: <>string</>,
      desc: <>Placeholder text in the absence of any value.</>
    },
    {
      prop: "errorHelperText",
      type: <>string</>,
      desc: <>Helper text.</>
    },
    {
      prop: "clearButton",
      type: (
        <>
          boolean = <i>false</i>
        </>
      ),
      desc: <>Use or not clear button (cross icon) to clear value.</>
    },
    {
      prop: "success",
      type: (
        <>
          boolean = <i>false</i>
        </>
      ),
      desc: <>Component success state.</>
    },
    {
      prop: "error",
      type: (
        <>
          boolean = <i>false</i>
        </>
      ),
      desc: <>Component error state.</>
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
          Whether this button should expand to fill its container. The default
          state is <b>false</b>.
        </>
      )
    }
  ];

  /** Code source */
  const Code = ` 
  < Input
      <i>type</i> = '${isPass ? "password" : "text"}' 
      <i>view</i> = '${view}' 
      <i>dense</i> = { ${isDense ? "true" : "false"} }
      <i>color</i> = 'primary' 
      <i>label</i> = 'Label'
      <i>value</i> = 'Value'
      <i>placeholder</i> = 'Placeholder'
      <i>clearButton</i> = { ${isClear ? "true" : "false"} }
      <i>success</i> = { ${isSuccess ? "true" : "false"} }
      <i>error</i> = { ${isError ? "true" : "false"} }
      <i>fill</i> = { ${isFill ? "true" : "false"} }
      <i>errorHelperText</i> = ${
        isError ? "'This person does not exist'" : "{ null }"
      }
  / >
 `;

  return <Overview overview={OverviewText} apidata={APIData} code={Code} />;
};
