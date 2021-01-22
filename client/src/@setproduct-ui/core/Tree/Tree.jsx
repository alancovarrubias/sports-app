import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import { Tree as TreeSource } from "@blueprintjs/core";

import Type from "./_type.module.css";
import View from "./_view.module.css";
import Color from "../../styles/color.module.css";

import { ThemeContext } from "../ThemeContext";

const Tree = React.forwardRef(function Tree(props, ref) {
  const {
    type = "def",
    view = "flat",
    color = "default",
    contents,
    className,
    ...restProps
  } = props;
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  /**This is Demo functions for Tree component.
   * If you need, you can use this for your application */

  const handleNodeExpand = nodeData => {
    nodeData.isExpanded = true;
    setExpanded({ ...expanded, [nodeData.id]: true });
  };
  const forEach = nodes => {
    nodes.map(i =>
      !i.childNodes ? (i.isSelected = false) : forEach(i.childNodes)
    );
  };

  const handleNodeCollapse = nodeData => {
    nodeData.isExpanded = false;
    setExpanded({ ...expanded, [nodeData.id]: false });
  };
  const handleNodeClick = nodeData => {
    !nodeData.childNodes && forEach(contents);

    !nodeData.childNodes && (nodeData.isSelected = true);
    !nodeData.childNodes && setSelected({ ...selected, [nodeData.id]: true });

    /**/
    nodeData.isExpanded
      ? nodeData.childNodes && (nodeData.isExpanded = false)
      : nodeData.childNodes && (nodeData.isExpanded = true);
    nodeData.childNodes &&
      setExpanded({ ...expanded, [nodeData.id]: nodeData.isExpanded });
  };

  /**END of Demo functions */

  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <TreeSource
          {...restProps}
          ref={ref}
          contents={contents}
          onNodeClick={handleNodeClick}
          onNodeCollapse={handleNodeCollapse}
          onNodeExpand={handleNodeExpand}
          className={cx(
            Type[type],
            dark ? View[view + "-dark"] : View[view],
            Color[color],
            className
          )}
        />
      )}
    </ThemeContext.Consumer>
  );
});

Tree.propTypes = {
  /**
   `The type of the component.
   * Variants: `dense`
   * Default value (if undefined): `def` `
   */
  type: PropTypes.oneOf(["def", "dense"]),
  /**
  ` The view of the component.
  * Variants: `flat`  
  * Default value (if undefined): `flat` `
  */
  view: PropTypes.oneOf(["flat"]),
  /**
  ` The color of the component.
   * Variants: `primary` `warning` `danger` `success` `primaryAlt` `warningAlt` `dangerAlt` `successAlt`
   * Default value (if undefined): `default` `
   */
  color: PropTypes.oneOf([
    "default",
    "primary",
    "warning",
    "danger",
    "success",
    "primary_alt",
    "warning_alt",
    "danger_alt",
    "success_alt"
  ]),
  /**
   * The data specifying the contents and appearance of the tree.
   */
  contents: PropTypes.array.isRequired,
  /**
   * Invoked when a node is clicked anywhere other than the caret for expanding/collapsing the node.
   */
  onNodeClick: PropTypes.func,
  /**
   * Invoked when caret of an expanded node is clicked.
   */
  onNodeCollapse: PropTypes.func,
  /**
   * Invoked when the caret of a collapsed node is clicked.
   */
  onNodeExpand: PropTypes.func
};

export default Tree;
