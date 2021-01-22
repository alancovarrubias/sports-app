import React from "react";
import Button from "../../core/Button";
import styled from "styled-components";

export const LicenseButton = ({ linkTo, icon, device }) => {
  const GetLicense = styled(Button)`
    background: var(--grey100) !important;
    color: var(--grey0) !important;
    box-shadow: var(--greyShadow4dp) !important;
    &: hover {
      box-shadow: var(--greyShadow8dp) !important;
      background: var(--grey100) !important;
      color: var(--white) !important;
    }
    & svg {
      color: var(--yellow20);
    }
  `;

  return (
    <a href={linkTo} style={{ textDecoration: "none" }}>
      <GetLicense
        dense={device === "mobile" && true}
        view="flat"
        // color="primary"
        icon={device !== "mobile" && icon}
        text={"Get a license"}
      />
    </a>
  );
};
