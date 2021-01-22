import React from "react";

/**Import core component (variable)*/
import Breadcrumbs from "../../core/Breadcrumbs";

export const DEMO = props => {
  const { width, from, color } = props;

  const CrumbsItem = [
    { href: "#", icon: "folder-close", text: "Home", intent: "warning" },
    { href: "#", icon: "folder-close", text: "Program Files" },
    { href: "#", icon: "folder-close", text: "Common Files" },
    { href: "#", icon: "folder-close", text: "Services" },
    { href: "#", icon: "folder-close", text: "Payout" },
    { icon: "document", text: "invoice.txt", current: true }
  ];

  return (
    <div style={{ width: width + "%" }}>
      <Breadcrumbs color={color} items={CrumbsItem} collapseFrom={from} />
    </div>
  );
};
