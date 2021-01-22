import React from "react";

import Menu from "../../core/Menu";
import MenuItem from "../../core/Menu/MenuItem";
import MenuDivider from "../../core/Menu/MenuDivider";

export default function ExampleMenu({ view, dense, color }) {
  const type = dense ? "dense" : "def";
  const viewMenu = view === "raised" ? "filled" : "raised";

  return (
    <Menu type={type} view={viewMenu} color={color}>
      <MenuItem
        type={type}
        view={viewMenu}
        color={color}
        text="Custom SVG icon"
      />
      <MenuItem type={type} view={viewMenu} color={color} text="Import tasks" />
      <MenuItem
        type={type}
        view={viewMenu}
        color={color}
        text="Email notifications"
      />
      <MenuItem
        type={type}
        view={viewMenu}
        color={color}
        text="Save as template"
      />
      <MenuDivider type={type} view={viewMenu} color={color} />
      <MenuItem
        type={type}
        view={viewMenu}
        color={color}
        text="Settings"
        note
      />
    </Menu>
  );
}
