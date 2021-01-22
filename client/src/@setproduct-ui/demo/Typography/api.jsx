import React from "react";
import { Overview } from "../OverviewComponent";
import { OverviewTemplate } from "../OverviewText";

export const API = props => {
  const { name, type, font, color, tagName, small, large, colorStep } = props;

  /**Overview */
  const OverviewText = <OverviewTemplate name={name} />;

  /**API */
  const APIData = [
    {
      prop: "type",
      type: (
        <>
          string = <i>body</i>
        </>
      ),
      desc: (
        <>
          This prop set the shape of the component. Possible states:{" "}
          <b>
            body | button | overline | caption | h1 | h2 | h3 | h4 | h5 | h6
          </b>
          . The default state is <b>body</b>.
        </>
      )
    },
    {
      prop: "font",
      type: (
        <>
          string = <i>inter</i>
        </>
      ),
      desc: (
        <>
          This prop set the view of the component. Possible states:
          <b> filled | flat | smooth | outlined | raised </b>. The default state
          is <b>filled</b>.
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
      prop: "tagName",
      type: (
        <>
          string = <i>div</i>
        </>
      ),
      desc: <>A Name of HTML tag</>
    },
    {
      prop: "colorStep",
      type: (
        <>
          integer = <i>100</i>
        </>
      ),
      desc: <>A Color depth. Step is 10. Min value is 0, max value is 100. </>
    },
    {
      prop: "small",
      type: (
        <>
          boolean = <i>false</i>
        </>
      ),
      desc: (
        <>
          Whether this button should use minimal styles. The default state is{" "}
          <b>false</b>.
        </>
      )
    },
    {
      prop: "large",
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
  < Typography
      <i>type</i> = '${type}'
      <i>font</i> = '${font}' 
      <i>color</i> = '${color}' 
      <i>colorStep</i> = ${colorStep}
      <i>tagName</i> = '${tagName}'
      <i>small</i> = { ${small ? "true" : "false"} }
      <i>large</i> = { ${large ? "true" : "false"} }
  > 
      Children
  < Typography / >
 `;

  return <Overview overview={OverviewText} apidata={APIData} code={Code} />;
};
