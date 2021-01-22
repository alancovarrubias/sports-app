import React from "react";
import { Icon } from "@blueprintjs/core";

const FooterLink = props => (
  <a href={props.href}>
    <div>
      <div>
        <Icon icon={props.icon} />
      </div>
      {props.value}
    </div>
  </a>
);

export default FooterLink;
