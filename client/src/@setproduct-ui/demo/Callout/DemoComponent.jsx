import React from "react";

/**Import core component (variable)*/
import Callout from "../../core/Callout";

export const DEMO = props => {
  const { type, view, color, isTitle, isIcon } = props;
  return (
    <Callout
      dense={type === "dense" ? true : false}
      view={view}
      color={color}
      title={isTitle ? "Visually important content" : null}
      icon={isIcon && "info-sign"}
      style={{ maxWidth: "480px" }}
    >
      The component is a simple wrapper around the CSS API that provides props
      for modifiers and optional title element. Any additional HTML props will
      be spread to the rendered {`<div/>`} element.
    </Callout>
  );
};
