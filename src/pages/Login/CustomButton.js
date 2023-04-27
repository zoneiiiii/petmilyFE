import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)`
  background-color: #fbd385;
  color: white;
  width: 300px;
  height: 25px;
  margin-top: 10px;
  &:hover {
    background-color: #facc73;
  }
  &:focus {
    background-color: #facc73;
  }
`;
export default function CustomButton(props) {
  const { value, label } = props;

  return (
    <div>
      <StyledButton
        value={value}
        variant="contained"
        onClick={props.onClick}
        disabled={props.disabled}
        fullWidth
        href={props.href}
      >
        {props.label}
      </StyledButton>
    </div>
  );
}
