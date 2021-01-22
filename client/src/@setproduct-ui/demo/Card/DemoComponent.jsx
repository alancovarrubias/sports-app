import React from "react";
//import Button from "../../core/Button";
import Typography from "../../core/Typography";

/**Import core component (variable)*/
import Card from "../../core/Card";

export const DEMO = props => {
  const { view, color, isInter } = props;
  return (
    <Card
      view={view}
      color={color}
      interactive={isInter}
      style={{ maxWidth: "480px" }}
    >
      <div style={{ margin: "1rem", display: "inline-block" }}>
        <Typography
          type="h6"
          large
          style={{
            paddingBottom: "1rem"
          }}
          colorStep={view === "filled" ? 0 : 100}
        >
          Card component example
        </Typography>
        <Typography colorStep={view === "filled" ? 0 : 100}>
          You can put here and customize any components and elements.
        </Typography>
      </div>
    </Card>
  );
};
