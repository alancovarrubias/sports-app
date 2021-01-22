import React from "react";

/**Import core component (variable)*/
import Dialog from "../../core/Dialog";
import Button from "../../core/Button";

export const DEMO = props => {
  const { type, view, color, isOpen, setOpen, opacity } = props;
  const text =
    "First you need import component to your code. To use the component, copy and paste an example from the CODE tab. Default props of component can be omitted, they are applied automatically.";
  return (
    <>
      <Button
        view="filled"
        color="primary"
        text="Open Dialog"
        onClick={() => setOpen(true)}
      />
      <Dialog
        type={type}
        view={view}
        color={color}
        icon="info-sign"
        title={`This is ${type} dialog`}
        text={text}
        backdropOpacity={opacity}
        leftButton={
          <Button
            type="default"
            view={
              view === "filled"
                ? "filled"
                : view === "raised"
                ? "flat"
                : "outlined"
            }
            color={color}
            dense={type === "dense" ? true : false}
            onClick={() => setOpen(false)}
            text="Maybe next time"
          />
        }
        rightButton={
          <Button
            type={"default"}
            view={
              view === "filled"
                ? "raised"
                : view === "raised"
                ? "smooth"
                : "filled"
            }
            color={color}
            dense={type === "dense" ? true : false}
            onClick={() => setOpen(false)}
            text="Sure, continue!"
          />
        }
        isOpen={isOpen}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
