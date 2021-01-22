import React from "react";
import Button from "../../core/Button";
import styled from "styled-components";

const StyledLogo = styled(Button)`
  font-size: 24px !important;
  color: var(--white) !important;
  background: var(--color40) !important;
  ${props => props.sizeW >= 1024 && "margin-top: -8px;"}
`;

export const DemoLogo = props => {
  return (
    <>
      <StyledLogo
        mdc_style={["def", "smooth", props.color]}
        active={true}
        text={props.letter}
        sizeW={props.sizeW}
      />
      {props.sizeW >= 1024 && (
        <span
          style={{
            marginLeft: "0.5rem",
            fontSize: "1.5rem",
            fontFamily: "Roboto",
            color: props.view === "filled" ? "var(--white)" : "var(--color100)",
            fontWeight: "bold",
            lineHeight: "40px"
          }}
        >
          {props.text}
        </span>
      )}
    </>
  );
};
