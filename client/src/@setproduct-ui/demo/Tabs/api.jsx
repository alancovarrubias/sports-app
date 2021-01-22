import React from "react";
import { Overview } from "../OverviewComponent";
import { OverviewTemplate } from "../OverviewText";
import OverviewAPI from "../OverviewAPI.jsx";

export const API = props => {
  const { name, type, view, color, fill } = props;

  const OptionalApi = [
    {
      prop: "id",
      type: <>string | number</>,
      desc: (
        <>
          Unique identifier for this Tabs container. This will be combined with
          the id of each Tab child to generate ARIA accessibility attributes.
          IDs are required and should be unique on the page to support
          server-side rendering.Required.
        </>
      )
    },
    {
      prop: "title",
      type: <>string | element</>,
      desc: (
        <>
          Content of tab title element, rendered in a list above the active
          panel.
        </>
      )
    },
    {
      prop: "panel",
      type: <>element</>,
      desc: (
        <>
          Panel content, rendered by the parent Tabs when this tab is active. If
          omitted, no panel will be rendered for this tab.
        </>
      )
    }
  ];

  const optionalText = (
    <>
      Tabs is the top-level component responsible for rendering the tab list and
      coordinating selection.
      <br />
      Children of the <b>Tabs</b> are rendered in order in the tab list, which
      is a flex container.
      <br />
      <b>Tab</b> children are managed by the component; clicking one will change
      selection.
      <br />
      <pre>import {"{ Tab }"} from "@blueprintjs/core";</pre>
      <b>Tab API description:</b>
      <OverviewAPI data={OptionalApi} />
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
      prop: "id",
      type: <>string | number</>,
      desc: (
        <>
          Unique identifier for this Tabs container. This will be combined with
          the id of each Tab child to generate ARIA accessibility attributes.
          IDs are required and should be unique on the page to support
          server-side rendering.Required.
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
      desc: <>Whether this component should expand to fill its container.</>
    }
  ];

  /** Code source */
  const Code = `  
  < Tabs
      <i>type</i> = '${type}'
      <i>view</i> = '${view}'
      <i>color</i> = '${color}' 
      <i>id</i> = 'DemoTabs
      <i>fill</i> = ${fill ? "'true'" : "'false'"}
  > 
      < Tab 
        <i>id</i> = '1'
        <i>title</i> = 'React'
        <i>panel</i> = 'Text'
      / >
      < Tab 
        <i>id</i> = '2'
        <i>title</i> = 'Angular'
        <i>panel</i> = 'Text'
      / >
  < / Tabs >           
 `;

  return <Overview overview={OverviewText} apidata={APIData} code={Code} />;
};
