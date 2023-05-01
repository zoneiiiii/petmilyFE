import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const SignInButton = styled(Button)`
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
const CustomizedButton = styled(Button)`
  background-color: #fbd385;
  color: white;
  width: 90px;
  height: 30px;
  margin-top: 10px;
  &:hover {
    background-color: #facc73;
  }
  &:focus {
    background-color: #facc73;
  }
`;
const SubmitButton = styled(Button)`
  background-color: #fbd385;
  color: white;
  width: 90px;
  height: 30px;
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
      {value === "로그인폼" ? (
        <SignInButton
          value={value}
          variant="contained"
          onClick={props.onClick}
          disabled={props.disabled}
          fullWidth
          href={props.href}
        >
          {props.label}
        </SignInButton>
      ) : value === "버튼" ? (
        <CustomizedButton
          value={value}
          variant="contained"
          onClick={props.onClick}
          fullWidth
        >
          {props.label}
        </CustomizedButton>
      ) : value === "병원검색" ? (
        <SubmitButton
          value={value}
          variant="contained"
          onClick={props.onClick}
          fullWidth
        >
          {props.label}
        </SubmitButton>
      ) : (
        ""
      )}
    </div>
  );
}
