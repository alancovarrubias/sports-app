import React from "react";

/**Import core component (variable)*/
import Table from "../../core/Table/Table";
import { Data, Data2, Head } from "./data.jsx";

export const DEMO = props => {
  const { type, view, color, isCheckbox, isPagination } = props;
  return (
    <Table
      name={Head}
      data={type === "smooth" ? Data2 : Data}
      position={"left"}
      type={type}
      view={view}
      color={color}
      pages={isPagination}
      labelRowsPerPage={"Show rows:"}
      rowsPerPageOptions={[5, 8, 20]}
      defRows={8}
      checkboxes={isCheckbox}
      style={{ marginLeft: "6px" }}
    />
  );
};
