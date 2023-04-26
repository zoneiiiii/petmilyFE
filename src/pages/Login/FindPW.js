import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import { styled } from "@mui/material/styles";

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
function FindPW() {
  const idLabel = "Id";
  const emailLabel = "email";
  const [id, setId] = useState("");
  const [idError, setIdError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const idRef = useRef();
  const emailRef = useRef();
  const [idAble, setIdAble] = useState(false);
  const [emailAble, setEmailable] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  const isValidId = (id) => {
    const idRegExp = /^[a-zA-z0-9]{6,15}$/;
    console.log(idRegExp.test(id));
    return idRegExp.test(id);
  };

  const emailChange = (event) => {
    setEmail((value) => event.target.value);
    console.log("pw" + event.target.value);
    if (event.target.value) {
      setEmailError(
        isValidEmail(event.target.value)
          ? ""
          : "올바른 이메일 형식을 입력해 주세요."
      );
      setEmailable(isValidEmail(event.target.value) ? true : false);
    } else {
      setEmailError("");
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
      setIdAble(isValidId(event.target.value) ? true : false);
    } else {
      setIdError("");
    }
  };
  const emailInput = document.querySelector("[name=email]");
  const emailFocus = () => {
    emailInput.focus();
  };

  const checkenterSubmit = (e) => {
    if (e.key === "Enter") {
      if (idAble === false || emailAble === false) {
        return true;
      } else if (!email) {
        return true;
      } else if (!id) {
        return true;
      } else {
        submitCheck();
      }
    }
  };
  const checkDisable = () => {
    console.log("testId =" + idAble);
    console.log("pwAble = " + emailAble);
    if (idAble === false || emailAble === false) {
      return true;
    } else if (!email) {
      return true;
    } else if (!id) {
      return true;
    } else {
      return false;
    }
  };
  const gotoEmailInput = (e) => {
    if (e.key === "Enter") {
      emailFocus();
    }
  };

  const submitCheck = (event) => {
    let validId = /^[a-zA-z0-9]{6,15}$/.test(id);
    // let validPassword = password.length >= 8 && password.length <= 20;
    console.log("enter");
    alert("엔터확인");
    if (!id) {
      setIdError("아이디을 입력해주세요.");
      idRef.current.focus();
    } else if (!validId) {
      setIdError("정확한 아이디를 입력해주세요.");
      idRef.current.focus();
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
      <Typography sx={{ color: "#FBD385", mb: "20px", fontSize: "small" }}>
        가입한 아이디와 이메일을 입력하세요.
      </Typography>
      <div style={{ marginTop: "10px" }}>
        <CustomTextField
          autoComplete="off"
          label={idLabel}
          type="text"
          name="id"
          variant="outlined"
          InputProps={{ style: { color: "#FBD385" } }}
          InputLabelProps={{ style: { color: "#FBD385" } }}
          sx={{
            background: "white",
            width: "300px",
          }}
          required
          onChange={idChange}
          ref={idRef}
          onKeyPress={gotoEmailInput}
        />
        <FormHelperText sx={{ color: "red" }}>{idError}</FormHelperText>
      </div>
      <div style={{ marginTop: "10px" }}>
        <CustomTextField
          label={emailLabel}
          type="email"
          name="email"
          required
          variant="outlined"
          InputProps={{ style: { color: "#FBD385" } }}
          InputLabelProps={{ style: { color: "#FBD385" } }}
          sx={{
            width: "300px",
            background: "white",
          }}
          onChange={emailChange}
          ref={emailRef}
          onKeyPress={checkenterSubmit}
        />
        <FormHelperText sx={{ color: "red" }}>{emailError}</FormHelperText>
      </div>
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
        disabled={checkDisable()}
        href="/changepw"
      >
        비밀번호 찾기
      </Button>
    </div>
  );
}

export default FindPW;
