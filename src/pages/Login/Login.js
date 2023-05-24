import React, { useState, useRef, useContext } from "react";
import CustomButton from "./CustomButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ACCOUNT } from "../../constants/PageURL";
import { AuthContext } from "../../contexts/AuthContexts";
import { styled } from "@mui/material/styles";
import {
  Button,
  TextField,
  Typography,
  FormHelperText,
  ThemeProvider,
} from "@mui/material";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
const CustomTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#FBD385",
    border: "1px solid",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      // borderColor: "#FBD385",
      border: "2px solid #FBD385",
    },
    "&:hover fieldset": {
      // borderColor: "#FBD385",
      border: "2px solid #FBD385",
    },
    "&.Mui-focused fieldset": {
      // borderColor: "#FBD385",
      border: "2px solid #FBD385",
    },
  },
});
function Login() {
  const { setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [idError, setIdError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const idRef = useRef();
  const pwRef = useRef();
  const [idAble, setIdAble] = useState(false);
  const [pwAble, setPwAble] = useState(false);

  const idLabel = "ID";
  const pwLabel = "PW";

  const isValidPassword = (password) => {
    const pwLength = password.length >= 8 && password.length <= 20;
    return pwLength;
  };
  const isValidId = (id) => {
    const idRegExp = /^[a-zA-z0-9]{6,15}$/;
    console.log(idRegExp.test(id));
    return idRegExp.test(id);
  };

  const pwChange = (event) => {
    setPassword((value) => event.target.value);
    console.log("pw" + event.target.value);
    if (event.target.value) {
      setPasswordError(
        isValidPassword(event.target.value)
          ? ""
          : "비밀번호는 8~20자로 입력해주세요."
      );
      setPwAble(isValidPassword(event.target.value) ? true : false);
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
      setIdAble(isValidId(event.target.value) ? true : false);
    } else {
      setIdError("");
    }
  };

  const passwordInput = document.querySelector("[name=password]");
  const passwordFocus = () => {
    passwordInput.focus();
  };

  const checkenterSubmit = (e) => {
    if (e.key === "Enter") {
      if (idAble === false || pwAble === false) {
        return true;
      } else if (!password) {
        return true;
      } else if (!id) {
        return true;
      } else {
        submitCheck();
      }
    }
  };

  const gotoPasswordInput = (e) => {
    if (e.key === "Enter") {
      passwordFocus();
    }
  };

  const submitCheck = (event) => {
    let validId = /^[a-zA-z0-9]{6,15}$/.test(id);
    let validPassword = password.length >= 8 && password.length <= 20;

    if (validId && validPassword) {
      handleLogin();
    }
  };
  const handleLogin = () => {
    axios
      .post("http://localhost:8080/selectMember", {
        memberId: id,
      })
      .then((res) => {
        if (res.data !== "") {
          axios
            .post(
              "http://localhost:8080/login",
              {
                memberId: id,
                memberPw: password,
              },
              { withCredentials: true }
            )
            .then((res) => {
              console.log("handleLogin =>", res);
              if (res.data === 1) {
                sessionStorage.setItem("id", id);
                setLoggedIn(true);
                navigate("/");
              } else {
                setLoginError("비밀번호가 다릅니다.");
              }
            })
            .catch((e) => {
              console.error(e);
            });
        } else {
          setLoginError("아이디가 존재하지 않습니다.");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const checkDisable = () => {
    console.log("testId =" + idAble);
    console.log("pwAble = " + pwAble);
    if (idAble === false || pwAble === false) {
      return true;
    } else if (!password) {
      return true;
    } else if (!id) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <ThemeProvider theme={CustomTheme}>
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
          sx={{
            color: "#FBD385",
            mt: "30px",
            fontSize: "40px ",
            fontWeight: "bolder",
            mb: "20px",
          }}
        >
          Login
        </Typography>
        <div style={{ marginTop: "10px", width: "350px" }}>
          <CustomTextField
            autoComplete="off"
            label={idLabel}
            type="text"
            name="id"
            required
            fullWidth
            inputProps={{ style: { color: "black" } }}
            InputLabelProps={{
              style: { color: "gray", fontSize: "20px", fontWeight: "border" },
            }}
            InputProps={{
              disableunderline: "true",
            }}
            onChange={idChange}
            ref={idRef}
            onKeyPress={gotoPasswordInput}
          />
          <FormHelperText sx={{ color: "red" }}>{idError}</FormHelperText>
        </div>
        <div style={{ marginTop: "10px", width: "350px" }}>
          <CustomTextField
            autoComplete="current-password"
            label={pwLabel}
            type="password"
            name="password"
            required
            fullWidth
            inputProps={{ style: { color: "black" } }}
            InputLabelProps={{
              style: { color: "gray", fontSize: "20px", fontWeight: "border" },
            }}
            InputProps={{
              disableunderline: "true",
            }}
            onChange={pwChange}
            ref={pwRef}
            onKeyPress={checkenterSubmit}
          />
          <FormHelperText sx={{ color: "red" }}>{passwordError}</FormHelperText>
        </div>
        <Typography
          style={{
            fontSize: "xx-small",
            marginTop: "5px",
            marginBottom: "5px",
            cursor: "pointer",
            color: "#909090",
          }}
          onClick={() => navigate(ACCOUNT.FIND_PW)}
        >
          비밀번호를 잊으셨나요?
        </Typography>
        <CustomButton
          type="submit"
          variant="text"
          label="로그인"
          value="로그인폼"
          onClick={submitCheck}
          disabled={checkDisable()}
        />
        <FormHelperText sx={{ color: "red", mt: "10px" }}>
          {loginError}
        </FormHelperText>
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
            style={{
              color: "#909090",
              fontSize: "xx-small",
              marginLeft: "5px",
              cursor: "pointer",
            }}
            onClick={() => navigate(ACCOUNT.JOIN)}
          >
            회원가입
          </Typography>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Login;
