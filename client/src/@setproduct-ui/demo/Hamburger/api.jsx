import React from "react";
import { Overview } from "../OverviewComponent";
import { OverviewTemplate } from "../OverviewText";

export const API = props => {
  const { name, type, view, color, size, isOpen, variant, rounded } = props;

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
          This prop set the shape of the component. Possible states:
          <b> default | circle </b>. The default state is <b>default</b>.
        </>
      )
    },
    {
      prop: "view",
      type: (
        <>
          tring = <i>flat</i>
        </>
      ),
      desc: (
        <>
          This prop set the view of the component. Possible states:
          <b> filled | flat | smooth | outlined </b>. The default state is
          <b>flat</b>.
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
      prop: "size",
      type: <>number = 32</>,
      desc: <>A Size of the component in px.</>
    },
    {
      prop: "rounded",
      type: (
        <>
          boolean = <i>true</i>
        </>
      ),
      desc: <>Rounded style.</>
    },
    {
      prop: "isOpen",
      type: (
        <>
          boolean = <i>false</i>
        </>
      ),
      desc: (
        <>
          An Open state. The default state is <b>false</b>.
        </>
      )
    },
    {
      prop: "setOpen",
      type: "func",
      desc: <>Click event handler.</>
    },
    {
      prop: "variant",
      type: (
        <>
          string = <i>slider</i>{" "}
        </>
      ),
      desc: (
        <>
          This prop set animation variant of the component. Possible states:
          <b> squeeze | elastic | emphatic | spin | slider </b>. The default
          state is <b>slider</b>.
        </>
      )
    }
  ];

  /** Code source */
  const Code = `  
  < Hamburger
      <i>type</i> = '${type}' 
      <i>view</i> = '${view}' 
      <i>color</i> = '${color}' 
      <i>size</i> = { ${size} }
      <i>isOpen</i> = { ${isOpen ? "true" : "false"} }
      <i>setOpen</i> = { func }
      <i>variant</i> = { ${variant} }
      <i>rounded</i> = { ${rounded ? "true" : "false"} }
  />
 `;

  return <Overview overview={OverviewText} apidata={APIData} code={Code} />;
};
