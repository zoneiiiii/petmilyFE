import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";

function Login() {
  const [id, setId] = useState("");
  const [idError, setIdError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const idRef = useRef();
  const pwRef = useRef();

  const emailLabel = "ID";
  const pwLabel = "PW";

  const isValidPassword = (password) => {
    const pwLength = password.length >= 8 && password.length <= 20;
    return pwLength;
  };
  const isValidId = (id) => {
    const idRegExp = /^[a-zA-z0-9]{6,15}$/;
    return idRegExp.test(id);
  };
  const passwordInput = document.querySelector("[name=password]");
  const pwChange = (event) => {
    setPassword((value) => event.target.value);
    console.log("pw" + event.target.value);

    if (event.target.value) {
      setPasswordError(
        isValidPassword(event.target.value)
          ? ""
          : "비밀번호는 8~20자로 입력해주세요."
      );
    } else {
      setPasswordError("");
    }
  };
  const idChange = (event) => {
    setId((value) => event.target.value);
    console.log("id1 " + id);
    console.log("id  " + event.target.value);
    if (event.target.value) {
      setIdError(
        isValidId(event.target.value)
          ? ""
          : "아이디는 6~15자, 영문자와 숫자로 입력해주세요."
      );
    } else {
      setIdError("");
    }
  };

  const passwordFocus = () => {
    passwordInput.focus();
  };

  const checkenterSubmit = (e) => {
    if (e.key === "Enter") {
      submitCheck();
    }
  };

  const gotoPasswordInput = (e) => {
    if (e.key === "Enter") {
      passwordFocus();
    }
  };
  const submitCheck = (event) => {
    let validId = /^[a-zA-z0-9]{8,20}$/.test(id);
    let validPassword = password.length >= 6 && password.length <= 60;
    if (!id) {
      setIdError("이메일을 입력해주세요.");
      idRef.current.focus();
    } else if (!validId) {
      setIdError("정확한 이메일 주소를 입력해주세요.");
      idRef.current.focus();
    }
    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
      pwRef.current.focus();
    } else if (!validPassword) {
      setPasswordError("비밀번호는 8~20자 사이여야 합니다.");
      pwRef.current.focus();
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
      <Typography
        component="h1"
        variant="h5"
        sx={{ color: "#FBD385", mt: "30px", mb: "30px", fontSize: "xx-large" }}
      >
        Login
      </Typography>
      <div style={{ marginTop: "10px" }}>
        <TextField
          autoComplete="off"
          label={emailLabel}
          type="email"
          name="email"
          variant="standard"
          inputProps={{ style: { color: "#FBD385" } }}
          InputLabelProps={{ style: { color: "#FBD385" } }}
          sx={{
            borderBottom: "solid 1px #FBD385",
            background: "white",
            width: "300px",
          }}
          InputProps={{
            disableUnderline: true,
          }}
          onChange={idChange}
          required
          ref={idRef}
          onKeyPress={gotoPasswordInput}
        />
        <FormHelperText sx={{ color: "red" }}>{idError}</FormHelperText>
      </div>
      <div style={{ marginTop: "10px" }}>
        <TextField
          autoComplete="current-password"
          label={pwLabel}
          type="password"
          name="password"
          required
          variant="standard"
          inputProps={{ style: { color: "#FBD385" } }}
          InputLabelProps={{ style: { color: "#FBD385" } }}
          sx={{
            borderBottom: "solid 1px #FBD385",
            width: "300px",
            background: "white",
          }}
          InputProps={{
            disableUnderline: true,
          }}
          onChange={pwChange}
          ref={pwRef}
          onKeyPress={checkenterSubmit}
        />
        <FormHelperText sx={{ color: "red" }}>{passwordError}</FormHelperText>
      </div>
      <Typography
        style={{
          color: "gray",
          fontSize: "xx-small",
          marginTop: "10px",
        }}
      >
        비밀번호를 잊으셨나요?
      </Typography>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          background: "#FBD385",
          width: "300px",
          height: "25px",
          mt: "10px",
        }}
        onClick={submitCheck}
      >
        로그인
      </Button>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <Typography style={{ color: "gray", fontSize: "xx-small" }}>
          아이디가 존재하지 않으신가요?
        </Typography>
        <Typography
          variant="text"
          style={{ color: "#909090", fontSize: "xx-small", marginLeft: "5px" }}
        >
          회원가입
        </Typography>
      </div>
    </div>
  );
}

export default Login;
