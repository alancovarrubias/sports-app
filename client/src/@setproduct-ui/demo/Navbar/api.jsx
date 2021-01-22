import React from "react";
import { Overview } from "../OverviewComponent";
import { OverviewTemplate } from "../OverviewText";

export const API = props => {
  const { name, type, view, color } = props;

  const optionalText = (
    <>
      The Navbar API includes three stateless React components:{" "}
      <b>NavbarGroup NavbarHeading NavbarDivider</b>
      <pre>
        import NavbarGroup from "../../core/Navbar/group.jsx"; <br />
        import NavbarHeading from "../../core/Navbar/heading.jsx";
        <br />
        import NavbarDivider from "../../core/Navbar/divider.jsx";
      </pre>
      These components are simple containers for their children. Each of them
      supports the full range of HTML <b>div</b> props.
      <br />
      <b>NavbarGroup, NavbarHeading & NavbarDivider</b> components API contains
      only <b>className</b> prop.
      <br />
      <b>NavbarGroup</b> API additional contains <b>align</b> - the side of the
      navbar on which the group should appear (string, can be left, right,
      center ).
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
          string = <i>desktop</i>
        </>
      ),
      desc: (
        <>
          This prop set the shape of the component. Possible states:{" "}
          <b> desktop | tablet | mobile </b>. The default state is{" "}
          <b>desktop</b>.
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
          <b> filled | raised </b>. The default state is <b>filled</b>.
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
      prop: "fixedToTop",
      type: <>boolean</>,
      desc: (
        <>
          Whether this navbar should be fixed to the top of the viewport (using
          CSS position: fixed).
        </>
      )
    }
  ];

  /** Code source */
  const Code = ` 
  < Navbar <i>type</i> = '${type}' <i>view</i> = '${view}' <i>color</i> = '${color}'>
         < NavbarGroup <i>align</i> = 'left' >
               < NavbarHeading > Logo < NavbarHeading / >
         < / NavbarGroup >
         < NavbarDivider />
         < NavbarGroup <i>align</i> = 'right' > Links < / NavbarGroup >
  < / Navbar >
 `;

  return <Overview overview={OverviewText} apidata={APIData} code={Code} />;
};
