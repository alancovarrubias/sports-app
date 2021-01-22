import React from "react";
import { Overview } from "../OverviewComponent";
import { OverviewTemplate } from "../OverviewText";

export const API = props => {
  const { name, color } = props;

  const optionalText = (
    <>
      The Menu API includes three stateless React components:{" "}
      <b>Menu, MenuItem, MenuDivider.</b>
      <pre>
        import MenuItem from "../../core/Menu/MenuItem"; <br />
        import MenuDivider from "../../core/Menu/MenuDivider";
      </pre>
      To add a submenu to a Menu, simply nest <b>MenuItem</b>'s within another{" "}
      <b>MenuItem</b>. The submenu opens to the right of it's parent by default,
      but will adjust and flip to the left if there is not enough room to the
      right.
      <br />
      <b>MenuItem</b> API look at the API tab. <b>Menu & MenuDivider</b>{" "}
      components API contains only <b>type, view, color</b> props. Type & View
      props can be omitted. <br />
      <b>MenuDivider</b> API additional contains <b>title</b> - an optional
      header title (string).
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
          string = <i>smooth</i>
        </>
      ),
      desc: (
        <>
          This prop set the view of the component. Possible states:{" "}
          <b> filled | smooth | outlined | raised </b>. The default state is{" "}
          <b>smooth</b>.
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
      prop: "text",
      type: <>string</>,
      desc: <>An Item text, required for usability.</>
    },
    {
      prop: "disabled",
      type: <>boolean</>,
      desc: <>Whether this menu item is non-interactive.</>
    },
    {
      prop: "href",
      type: <>string</>,
      desc: <>A Link URL.</>
    },
    {
      prop: "target",
      type: <>string</>,
      desc: <>Link target attribute. Use "_blank" to open in a new window.</>
    },
    {
      prop: "icon",
      type: <>string | element</>,
      desc: (
        <>
          Name of a Blueprint UI icon (or an icon element) to render before the
          text.
        </>
      )
    },
    {
      prop: "label",
      type: <>string</>,
      desc: (
        <>Right-aligned label text content, useful for displaying hotkeys.</>
      )
    },
    {
      prop: "labelElement",
      type: <>element</>,
      desc:
        "Right-aligned label content, useful for displaying hotkeys. For example, labelElement={<Icon icon='share' />}"
    },
    {
      prop: "onClick",
      type: <>func</>,
      desc: <>Click event handler</>
    },
    {
      prop: "children",
      type: <>array</>,
      desc: (
        <>
          Children of this component will be rendered in a submenu that appears
          when hovering or clicking on this menu item.
        </>
      )
    }
  ];

  /** Code source */
  const Code = `  
  < Menu <i>type</i> = 'def' <i>view</i> = 'smooth' <i>color</i> = '${color}' >      
      < MenuItem
        <i>type</i> = 'def'
        <i>view</i> = 'smooth'
        <i>color</i> = '${color}'
        <i>icon</i> = 'cog'
        <i>text</i> = 'Custom SVG icon'
        <i>label</i> = 'Label'
      />      
      < MenuDivider <i>type</i> = 'def' <i>view</i> = 'smooth' <i>color</i> = '${color}' />      
      < MenuItem
        <i>type</i> = 'def'
        <i>view</i> = 'smooth'
        <i>color</i> = '${color}'
        <i>icon</i> = 'new-text-box'
        <i>text</i> = 'New text box'
        />      
      < MenuItem <i>type</i> = 'def' <i>view</i> = 'smooth' <i>color</i> = '${color}' <i>text</i>="New object" />      
      < MenuItem
        <i>type</i> = 'def'
        <i>view</i> = 'smooth'
        <i>color</i> = '${color}'
        <i>text</i> = 'New link'
        <i>labelElement</i> = { < Icon <i>icon</i>='new-link' /> }
      />      
      < MenuDivider <i>type</i> = 'def' <i>view</i> = 'smooth' <i>color</i> = '${color}' />      
      < MenuItem
        <i>type</i> = 'def'
        <i>view</i> = 'smooth'
        <i>color</i> = '${color}'
        <i>icon</i> = 'cog'
        <i>labelElement</i> = { < Icon <i>icon</i>='share' /> }
        <i>text</i> = 'Settings...'
      />
    </ Menu >
     `;

  return <Overview overview={OverviewText} apidata={APIData} code={Code} />;
};
