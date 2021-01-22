import React from "react";
import { Overview } from "../OverviewComponent";
import { OverviewTemplate } from "../OverviewText";

export const API = props => {
  const { type, view, color, isCheckbox, isPagination } = props;

  /**Overview */
  const OverviewText = <OverviewTemplate name={"Table"} folder="Table/" />;

  /**API */
  const APIData = [
    {
      prop: "type",
      type: <>string</>,
      desc: (
        <>
          This prop set the shape of the component. Possible states:{" "}
          <b> def | dense </b>.
        </>
      )
    },
    {
      prop: "view",
      type: <>string</>,
      desc: (
        <>
          {" "}
          This prop set the view of the component. Possible states:{" "}
          <b> filled | flat | smooth | raised </b>.
        </>
      )
    },
    {
      prop: "color",
      type: <>string</>,
      desc: (
        <>
          {" "}
          This prop set the color of the component. Possible states:{" "}
          <b>
            {" "}
            default | primary | warning | danger | success | primary_alt |
            warning_alt | danger_alt | success_alt{" "}
          </b>
          .
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
      prop: "name",
      type: <>array</>,
      desc: <>Array of Head names. See an example in the demo folder.</>
    },
    {
      prop: "data",
      type: <>array</>,
      desc: <>Array of data. See an example in the demo folder.</>
    },
    {
      prop: "position",
      type: <>string</>,
      desc: (
        <>
          Set the text-align on the table cell content. Possible states:{" "}
          <b> left | right | center</b>
        </>
      )
    },
    {
      prop: "pages",
      type: <>boolean</>,
      desc: <>Use or not pagination.</>
    },
    {
      prop: "checkboxes",
      type: <>boolean</>,
      desc: <>Use or not checkboxes.</>
    },
    {
      prop: "labelRowsPerPage",
      type: <>string</>,
      desc: <>Customize the rows per page label.</>
    },
    {
      prop: "rowsPerPageOptions",
      type: <>array</>,
      desc: (
        <>
          Customizes the options of the rows per page select field. If less than
          two options are available, no select field will be displayed.
        </>
      )
    },
    {
      prop: "defRows",
      type: <>number</>,
      desc: <>A Default value of the rows per page select field.</>
    }
  ];

  /** Code source */
  const Code = `  
  < Table
      <i>type</i> = '${type}' 
      <i>view</i> = '${view}' 
      <i>color</i> = '${color}' 
      <i>name</i> = { array_Head }
      <i>data</i> = { array_Data }
      <i>position</i> = 'left'
      <i>pages</i> = {${isPagination ? "true" : "false"}}
      <i>labelRowsPerPage</i> = 'Show rows:'
      <i>rowsPerPageOptions</i> = {[5, 8, 20]}
      <i>defRows</i> = {8}
      <i>checkboxes</i> = {${isCheckbox ? "true" : "false"}}
  / >
 `;

  return <Overview overview={OverviewText} apidata={APIData} code={Code} />;
};
