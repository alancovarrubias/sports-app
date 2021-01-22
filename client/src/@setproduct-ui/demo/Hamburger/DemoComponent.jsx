import React from "react";

/**Import core component (variable)*/
import Hamburger from "../../core/Hamburger";

export const DEMO = props => {
  const {
    type = "default",
    variant,
    view = "filled",
    color = "default",
    size,
    rounded,
    active = false
  } = props;
  const [isOpen, setOpen] = React.useState(active);

  return (
    <Hamburger
      isOpen={isOpen}
      setOpen={setOpen}
      size={size}
      rounded={rounded}
      variant={variant}
      type={type}
      view={view}
      color={color}
    />
  );
};
