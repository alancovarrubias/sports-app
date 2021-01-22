import React from "react";
import cx from "classnames";
import { withRouter } from "react-router";

import { Tree } from "@blueprintjs/core";

import Type from "./_type.module.css";
import View from "./_view.module.css";
import Color from "../../styles/color.module.css";

import { ThemeContext } from "../ThemeContext";

/**This is Demo Tree component for example use in own application*/

const SP_Tree = withRouter(props => {
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

    /*this modification for redirection ( open components url) */
    props.history.push(nodeData.link && nodeData.link);
    /** */

    !nodeData.childNodes &&
      (nodeData.isSelected = true) &&
      setSelected({ ...selected, [nodeData.id]: true });

    nodeData.isExpanded
      ? nodeData.childNodes && (nodeData.isExpanded = false)
      : nodeData.childNodes && (nodeData.isExpanded = true);
    nodeData.childNodes &&
      setExpanded({ ...expanded, [nodeData.id]: nodeData.isExpanded });
  };

  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <Tree
          {...restProps}
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

export default SP_Tree;
