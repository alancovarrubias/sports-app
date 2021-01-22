import React from "react";
import { Overview } from "../OverviewComponent";
import { OverviewTemplate } from "../OverviewText";

export const API = props => {
  const { name, type, color, inline, dis, help, rtl, left, os } = props;

  const optionalText = (
    <>
      Also you can use the <b>RadioGroup</b> component with a series of Radio
      children.
      <br />
      You need import component to your code (сheck component path is right):
      <pre>{`import { RadioGroup } from "../../core/RadioGroup";`}</pre>
    </>
  );

  /**Overview */
  const OverviewText = <OverviewTemplate name={name} text={optionalText} />;

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
          This prop set the shape of the component. Possible states:
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
          This prop set the view of the component. Possible states:{" "}
          <b> flat | smooth | outlined | raised</b>. The default state is{" "}
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
      type: <>string</>,
      desc:
        "A space-delimited list of class names to pass along to a child element."
    },
    {
      prop: "label",
      type: <>string</>,
      desc: "Text label for the control."
    },
    {
      prop: "value",
      type: <>string</>,
      desc: "Value of this radio."
    },
    {
      prop: "helperText",
      type: <>string</>,
      desc: "Second line text."
    },
    {
      prop: "inline",
      type: (
        <>
          boolean = <i>false</i>
        </>
      ),
      desc: (
        <>
          Whether the radio buttons are to be displayed inline horizontally. The
          default state is <b>false</b>.
        </>
      )
    },
    {
      prop: "checked",
      type: <>boolean</>,
      desc: "Whether the control is checked."
    },
    {
      prop: "leftPosition",
      type: (
        <>
          boolean = <i>false</i>
        </>
      ),
      desc: "Alignment of the indicator within container."
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
          If set to true, the component will be disabled. The default state is
          <b>false</b>
        </>
      )
    },
    {
      prop: "onChange",
      type: <>func</>,
      desc: "Event handler invoked when input value is changed."
    },
    {
      prop: "rtl",
      type: (
        <>
          boolean = <i>false</i>
        </>
      ),
      desc: 'Set the text direction to "right-to-left".'
    }
  ];

  /** Code source */
  const Code = `  
  < RadioGroup 
      <i>label</i> = "Select platform:" 
      <i>name</i> = "Demo group"
  >      
      < Radio          
          <i>type</i> = '${type}' 
          <i>color</i> = '${color}' 
          <i>value</i> = 'win'
          <i>checked</i> = ${os === "win" ? "{true}" : "{false}"}
          <i>onClick</i> = {() => setOS("win")}
          <i>label</i> = "'Windows'"
          <i>inline</i>='${inline ? "{true}" : "{false}"}'
          <i>rtl</i>='${rtl ? "{true}" : "{false}"}'
          <i>leftPosition</i>='${left ? "{true}" : "{false}"}'
          <i>disabled</i> = ${dis ? "{true}" : "{false}"}
          <i>helperText</i> = ${help ? "'Optional subcaption'" : "''"}
          <i>onChange</i>={() => ()}
      / > 
  < / RadioGroup > 
  `;

  return <Overview overview={OverviewText} apidata={APIData} code={Code} />;
};
