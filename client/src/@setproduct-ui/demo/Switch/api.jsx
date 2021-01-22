import React from "react";
import { Overview } from "../OverviewComponent";
import { OverviewTemplate } from "../OverviewText";

export const API = props => {
  const { name, type, color, isDemo, dis, help, left, fill, rtl } = props;

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
          <b> def | dense </b>. The default state is <b>def</b>.
        </>
      )
    },
    {
      prop: "view",
      type: (
        <>
          string = <i>flat</i>
        </>
      ),
      desc: (
        <>
          {" "}
          This prop set the view of the component. Possible states:{" "}
          <b> flat </b>. The default state is <b>flat</b>.
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
      prop: "label",
      type: <>string</>,
      desc: <>Text label for the control.</>
    },
    {
      prop: "helperText",
      type: <>string</>,
      desc: <>A Second line text</>
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
          Whether this button should expand to fill its container. Default state
          is <b>false</b>.
        </>
      )
    },
    {
      prop: "checked",
      type: <>boolean</>,
      desc: <>Whether the control is checked.</>
    },
    {
      prop: "leftPosition",
      type: (
        <>
          boolean = <i>false</i>
        </>
      ),
      desc: <>Alignment of the indicator within container.</>
    },
    {
      prop: "disabled",
      type: (
        <>
          boolean = <i>false</i>
        </>
      ),
      desc: (
        <>
          If set to true, the component will be disabled. Default state is{" "}
          <b>false</b>
        </>
      )
    },
    {
      prop: "onChange",
      type: <>func</>,
      desc: <>Event handler invoked when input value is changed.</>
    },
    {
      prop: "rtl",
      type: (
        <>
          boolean = <i>false</i>
        </>
      ),
      desc: <>Set the text direction to "right-to-left".</>
    }
  ];

  /** Code source */
  const Code = `  
  < Switch
      <i>type</i> = '${type}' 
      <i>color</i> = '${color}' 
      <i>checked</i> = ${isDemo ? "{true}" : "{false}"}
      <i>label</i> = ${rtl ? '"الخريف"' : "'Spring'"}
      <i>disabled</i> = ${dis ? "{true}" : "{false}"}
      <i>fill</i> = ${fill ? "{true}" : "{false}"}
      <i>helperText</i> = ${help &&
        (rtl ? '"الطبيعة تأتي في الحياة"' : "'Nature comes to life'")}
      <i>rtl</i> = ${rtl ? "{true}" : "{false}"}
      <i>leftPosition</i> = ${left ? "{true}" : "{false}"}
      <i>onChange</i>={() => someFunc()}
  / >
 `;

  return <Overview overview={OverviewText} apidata={APIData} code={Code} />;
};
