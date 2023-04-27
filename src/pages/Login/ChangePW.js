import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import { styled } from "@mui/material/styles";
import CustomButton from "./CustomButton";
const CustomTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#FBD385",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#FBD385",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#FBD385",
    },
    "&:hover fieldset": {
      borderColor: "#FBD385",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FBD385",
    },
  },
});

function ChangePW() {
  const pwLabel = "PW";
  const pwchangeLabel = "PW변경";
  const pwRef = useRef();
  const pwcheckRef = useRef();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [pwCheckError, setPwCheckError] = useState("");
  const [pwAble, setPwAble] = useState(false);
  const [pwchkAble, setPwchkAble] = useState(false);

  const isValidPassword = (password) => {
    const pwLength = password.length >= 8 && password.length <= 20;
    return pwLength;
  };
  const isValidPwCheck = (pwCheck) => {
    if (pwCheck === password) {
      return true;
    } else {
      return false;
    }
  };
  const pwChange = (event) => {
    setPassword((value) => event.target.value);
    if (event.target.value) {
      setPasswordError(
        isValidPassword(event.target.value)
          ? ""
          : "비밀번호는 8~20자로 입력해주세요."
      );
      setPwAble(isValidPassword(event.target.value) ? true : false);
      console.log("pwable" + pwAble);
    } else {
      setPasswordError("");
    }
  };
  const passwordCheck = (event) => {
    setPwCheck((value) => event.target.value);
    console.log("is = " + isValidPwCheck(event.target.value));
    if (event.target.value) {
      setPwchkAble(isValidPwCheck(event.target.value) ? true : false);
      if (event.target.value === password) {
        setPwCheckError("");
      } else {
        setPwCheckError("비밀번호 확인이 같지 않습니다.");
      }
    } else {
      setPwCheckError("");
    }
  };
  const passwordInput = document.querySelector("[name=passwordcheck]");
  const passwordFocus = () => {
    passwordInput.focus();
  };
  const gotoPasswordCheckInput = (e) => {
    if (e.key === "Enter") {
      passwordFocus();
    }
  };
  const checkenterSubmit = (e) => {
    if (e.key === "Enter") {
      submitCheck();
    }
  };
  const submitCheck = () => {
    console.log("enter");
  };
  const checkDisable = () => {
    if (pwchkAble === false || pwAble === false) {
      return true;
    } else if (!password) {
      return true;
    } else if (!pwCheck) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div
      style={{
        textAlign: "center",
        width: "350px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 auto",
      }}
    >
      <Typography sx={{ color: "#FBD385", mt: "30px", fontSize: "xx-large" }}>
        비밀번호 찾기
      </Typography>
      <div style={{ marginTop: "10px" }}>
        <CustomTextField
          autoComplete="off"
          label={pwLabel}
          type="password"
          name="password"
          variant="outlined"
          InputProps={{ style: { color: "#FBD385" } }}
          InputLabelProps={{ style: { color: "#FBD385" } }}
          sx={{
            background: "white",
            width: "300px",
          }}
          required
          onChange={pwChange}
          ref={pwRef}
          onKeyPress={gotoPasswordCheckInput}
        />
        <FormHelperText sx={{ color: "red" }}>{passwordError}</FormHelperText>
      </div>
      <div style={{ marginTop: "10px" }}>
        <CustomTextField
          label={pwchangeLabel}
          type="password"
          name="pwCheck"
          required
          variant="outlined"
          InputProps={{ style: { color: "#FBD385" } }}
          InputLabelProps={{ style: { color: "#FBD385" } }}
          sx={{
            width: "300px",
            background: "white",
          }}
          ref={pwcheckRef}
          onChange={passwordCheck}
          onKeyPress={checkenterSubmit}
        />
        <FormHelperText sx={{ color: "red" }}>{pwCheckError}</FormHelperText>
      </div>
      <CustomButton
        type="submit"
        value="비밀번호 변경"
        label="비밀번호 변경"
        onClick={submitCheck}
        disabled={checkDisable()}
      />
    </div>
  );
}

export default ChangePW;
