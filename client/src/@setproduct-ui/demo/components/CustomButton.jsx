import React from "react";
import styled from "styled-components";
import Button from "../../core/Button";

/*Demo CustomButton for "filled" AppBar*/
const StyledButton = styled(Button)`
  box-shadow: none !important;
 /* background: ${props =>
   props.device === "mobile"
     ? "var(--color70)"
     : "var(--color60)"} !important;*/
  color: var(--color0) !important;
  font-size: 0.865rem;
  letter-spacing: 0.054em;
  white-space: nowrap;
  &:hover {
    background: ${props =>
      props.device === "mobile"
        ? "var(--color80)"
        : "var(--color80)"} !important;
  }
  &[class*="focused"] {
    background: ${props =>
      props.device === "mobile"
        ? "var(--color80)"
        : "var(--color80)"} !important;
  }
  &[class*="active"] {
    background: ${props =>
      props.device === "mobile"
        ? "var(--color80)"
        : "var(--color80)"} !important;
  }
`;

export const CustomButton = props => {
  return <StyledButton {...props} />;
};
