import React from "react";
import Menu from "../../core/Menu";
import MenuItem from "../../core/Menu/MenuItem";
import MenuDivider from "../../core/Menu/MenuDivider";

export const ExampleMenu = props => {
  const { type, color } = props;
  return (
    <Menu type={type}>
      <MenuItem icon="graph" text="Graph" type={type} color={color} />
      <MenuItem icon="map" text="Map" type={type} color={color} />
      <MenuItem
        icon="th"
        text="Table"
        shouldDismissPopover={false}
        type={type}
        color={color}
      />
      <MenuItem
        icon="zoom-to-fit"
        text="Nucleus"
        disabled={true}
        type={type}
        color={color}
      />
      <MenuDivider type={type} color={color} />
      <MenuItem icon="cog" text="Settings..." type={type} color={color}>
        <MenuItem
          icon="add"
          text="Add new application"
          disabled={true}
          type={type}
          color={color}
        />
        <MenuItem
          icon="remove"
          text="Remove application"
          type={type}
          color={"danger"}
        />
      </MenuItem>
    </Menu>
  );
};
