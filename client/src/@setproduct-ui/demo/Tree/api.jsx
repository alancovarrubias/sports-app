import React from "react";
import { Overview } from "../OverviewComponent";
import { OverviewTemplate } from "../OverviewText";
import OverviewAPI from "../OverviewAPI.jsx";

export const API = props => {
  const { name, color } = props;

  const TreeNodeApi = [
    {
      prop: "id",
      type: <>string | number</>,
      desc: <>An unique identifier for the node. Required.</>
    },
    {
      prop: "label",
      type: <>string | element</>,
      desc: <>The main label for the node. Required.</>
    },
    {
      prop: "hasCaret",
      type: <>boolean</>,
      desc: (
        <>
          Whether the caret to expand/collapse a node should be shown. If not
          specified, this will be true if the node has children and false
          otherwise.
        </>
      )
    },
    {
      prop: "icon",
      type: <>name | element</>,
      desc: (
        <>
          The name of a Blueprint icon (or an icon element) to render next to
          the node's label.
        </>
      )
    },
    {
      prop: "isExpanded",
      type: <>boolean</>,
      desc: <>A Default state of node.</>
    },
    {
      prop: "secondaryLabel",
      type: <>string | element</>,
      desc: (
        <>
          A secondary label/component that is displayed at the right side of the
          node.
        </>
      )
    },
    {
      prop: "isSelected",
      type: (
        <>
          boolean = <i>false</i>
        </>
      ),
      desc: (
        <>
          Whether this node is selected. The default state is <b>false</b>.
        </>
      )
    },
    {
      prop: "disabled",
      type: <>boolean</>,
      desc: (
        <>
          Whether this tree node is non-interactive. Enabling this prop will
          ignore mouse event handlers (in particular click, down, enter, leave).
        </>
      )
    },
    {
      prop: "childNodes",
      type: <>array</>,
      desc: <>Child tree nodes of this node.</>
    }
  ];

  const optionalText = (
    <>
      Tree node objects determine the contents, appearance, and state of each
      node in the tree.
      <br />
      For example, <b>icon</b> controls the icon displayed for the node, and{" "}
      <b>isExpanded</b> determines whether the node's children are shown.
      <br />
      <b>TreeNode API description:</b>
      <OverviewAPI data={TreeNodeApi} />
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
          <b> def | dense</b>. The default state is <b>def</b>.
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
          {" "}
          This prop set the view of the component. Possible states:{" "}
          <b> smooth </b>. The default state is <b>smooth</b>.
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
      prop: "contents",
      type: <>array</>,
      desc: (
        <>
          The data specifying the contents and appearance of the tree. Required.
        </>
      )
    }
  ];

  /** Code source */
  const Code = `  
  < Tree
      color = '${color}' 
      contents = { treeNode }
  / >
 `;

  return <Overview overview={OverviewText} apidata={APIData} code={Code} />;
};
