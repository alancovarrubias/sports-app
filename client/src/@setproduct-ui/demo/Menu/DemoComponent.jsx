import React from "react";
import { Icon } from "@blueprintjs/core";

/**Import core component (variable)*/
import Menu from "../../core/Menu";
import MenuItem from "../../core/Menu/MenuItem";
import MenuDivider from "../../core/Menu/MenuDivider";
import Toaster from "../../core/Toast/Toaster.jsx";

export const DEMO = props => {
  const { type, view, color } = props;
  const [toastRef, setRef] = React.useState(null);
  /**Success toast */
  const SuccessToast = {
    message: "Discount code copied successful!",
    timeout: 3000,
    icon: <Icon icon="dollar" iconSize={24} />
  };

  /**Copy function */
  const copyToClipboard = source => {
    const textField = document.createElement("textarea");
    textField.innerHTML = source;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy") && toastRef.show(SuccessToast);
    textField.remove();
  };

  return (
    <>
      <div style={{ margin: "20px", maxWidth: "280px" }}>
        <Menu type={type} view={view} color={color}>
          <MenuItem
            type={type}
            view={view}
            color={color}
            icon="cog"
            text="Custom SVG icon"
            label="Label"
          />
          <MenuDivider type={type} view={view} color={color} />
          <MenuItem
            type={type}
            view={view}
            color={color}
            icon="import"
            text="Import tasks"
          />
          <MenuItem
            type={type}
            view={view}
            color={color}
            text="Email notifications"
            icon="notifications"
            labelElement={4}
          />
          <MenuItem
            type={type}
            view={view}
            color="success"
            icon="tick-circle"
            text="Save as template"
            labelElement={<Icon icon="new-link" />}
            note
          />
          <MenuDivider type={type} view={view} color={color} />
          <MenuItem
            type={type}
            view={view}
            color="danger"
            icon="cog"
            labelElement={<Icon icon="share" />}
            text="Settings..."
            note
          />
        </Menu>
      </div>
      <div style={{ margin: "20px", maxWidth: "240px" }}>
        <Menu type={type} view={view} color={color}>
          <MenuDivider title="Edit" type={type} view={view} color={color} />
          <MenuItem
            type={type}
            view={view}
            color={color}
            icon="cut"
            text="Cut"
            label="⌘X"
          />
          <MenuItem
            type={type}
            view={view}
            color={color}
            icon="duplicate"
            text="Copy"
            label="⌘C"
          />
          <MenuItem
            type={type}
            view={view}
            color={color}
            icon="clipboard"
            text="Paste"
            label="⌘V"
            disabled={true}
          />
          <MenuDivider title="Text" type={type} view={view} color={color} />
          <MenuItem
            type={type}
            view={view}
            color={color}
            disabled={true}
            icon="align-left"
            text="Alignment"
          >
            <MenuItem icon="align-left" text="Left" />
            <MenuItem icon="align-center" text="Center" />
            <MenuItem icon="align-right" text="Right" />
            <MenuItem icon="align-justify" text="Justify" />
          </MenuItem>
          <MenuItem
            type={type}
            view={view}
            color={color}
            icon="style"
            text="Style"
          >
            <MenuItem
              type={type}
              view={view}
              color={color}
              icon="bold"
              text="Bold"
            />
            <MenuItem
              type={type}
              view={view}
              color={color}
              icon="italic"
              text="Italic"
            />
            <MenuItem
              type={type}
              view={view}
              color={color}
              icon="underline"
              text="Underline"
            />
          </MenuItem>
          <MenuItem
            type={type}
            view={view}
            color={color}
            icon="asterisk"
            text="Miscellaneous"
          >
            <MenuItem
              type={type}
              view={view}
              color={color}
              icon="briefcase"
              text="Briefcase"
            />
            <MenuItem
              type={type}
              view={view}
              color={color}
              icon="calculator"
              text="Calculator"
            />
            <MenuItem
              type={type}
              view={view}
              color={color}
              icon="dollar"
              text="Dollar"
            />
            <MenuItem
              type={type}
              view={view}
              color={color}
              icon="dot"
              text="Shapes"
            >
              <MenuItem
                type={type}
                view={view}
                color="success"
                icon="full-circle"
                text="Success circle"
                note
              />
              <MenuItem
                type={type}
                view={view}
                color="danger"
                icon="heart"
                text="Danger heart"
                note
              />
              <MenuItem
                type={type}
                view={view}
                color="warning"
                icon="ring"
                text="Warning ring"
                note
              />
              <MenuItem
                type={type}
                view={view}
                color="primary"
                icon="shopping-cart"
                text="GETDISCOUNT"
                note
                onClick={() => copyToClipboard("SMARTY")}
              />
            </MenuItem>
          </MenuItem>
        </Menu>
        <Toaster
          view="outlined"
          color="danger_alt"
          usePortal={false}
          position="bottom" //bottom, bottom-left, bottom-right
          setRef={setRef}
          withoutClose={true}
        />
      </div>
    </>
  );
};
