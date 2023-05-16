import { useRef, useState, useCallback } from "react";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Badge,
  Fab,
  FormHelperText,
  ThemeProvider,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import axios from "axios";

function ModifyInfo() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPwError, setConfirmPwError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const nickRef = useRef();
  const passRef = useRef();
  const confirmRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  // 닉네임
  const onChangeNickname = useCallback((e) => {
    setNickname(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 5) {
      setNicknameError("2글자 이상 5글자 미만으로 입력해주세요.");
    } else {
      setNicknameError("");
    }
  }, []);

  // 비밀번호
  const onChangePassword = useCallback((e) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordError(
        "숫자+영문자+특수문자 조합으로 8~20자리로 입력해주세요!"
      );
    } else {
      setPasswordError("");
    }
  }, []);

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e) => {
      const passwordConfirmCurrent = e.target.value;
      setConfirmPw(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setConfirmPwError("");
      } else {
        setConfirmPwError("비밀번호가 일치하지 않습니다.");
      }
    },
    [password]
  );

  // 이메일
  const onChangeEmail = useCallback((e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailError("이메일 형식을 다시 확인해주세요.");
    } else {
      setEmailError("");
    }
  }, []);

  // 전화번호
  const onChangePhone = useCallback((e) => {
    const phoneRegex = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
    const phoneCurrent = e.target.value;
    setPhone(phoneCurrent);

    if (!phoneRegex.test(phoneCurrent)) {
      setPhoneError("전화번호를 다시 확인해주세요.");
    } else {
      setPhoneError("");
    }
  }, []);

  //엔터 키 이벤트
  const passwordInput = document.querySelector("[name=pw]");
  const confirmPwInput = document.querySelector("[name=confirmPw]");
  const emailInput = document.querySelector("[name=email]");
  const phoneInput = document.querySelector("[name=phone]");
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (e.target.name === "nickname" && passwordInput) {
        passwordInput.focus();
      } else if (e.target.name === "pw" && passRef.current.value !== "") {
        confirmPwInput.focus();
      } else if (
        e.target.name === "confirmPw" &&
        confirmRef.current.value !== ""
      ) {
        emailInput.focus();
      } else if (e.target.name === "email" && emailRef.current.value !== "") {
        phoneInput.focus();
      }
    }
  };

  const checkenterSubmit = (e) => {
    if (e.key === "Enter") {
      submitCheck();
    }
  };

  const submitCheck = () => {
    if (true) {
      if (!nickname) {
        setNicknameError("닉네임을 입력해주세요.");
      }
      if (!password) {
        setPasswordError("패스워드를 입력해주세요.");
      }
      if (!confirmPw) {
        setConfirmPwError("패스워드 확인을 입력해주세요.");
      }
      if (!email) {
        setEmailError("이메일을 입력해주세요.");
      }
      if (!phone) {
        setPhoneError("전화번호를 입력해주세요.");
      }
    }
    // } else {
    //   axios
    //     .post("/update", {
    //       nickname: nickRef.current.value,
    //       password: passRef.current.value,
    //       email: emailRef.current.value,
    //       phone: phoneRef.current.value,
    //       address: addressRef.current.value,
    //     })
    //     .then((res) => {
    //       if (res) {
    //         alert("수정에 성공하셨습니다.");
    //         document.location.href = "/mypage/info";
    //       } else {
    //         alert("수정에 실패하셨습니다.");
    //       }
    //       nickRef.current.value = "";
    //       passRef.current.value = "";
    //       emailRef.current.value = "";
    //       phoneRef.current.value = "";
    //       addressRef.current.value = "";
    //     })
    //     .catch((e) => {
    //       console.error(e);
    //     });
    // }
  };

  //이미지 파일
  const [Image, setImage] = useState("/images/emptyProfile.png");
  const [file, setFile] = useState();
  const fileInput = useRef(null);
  const onChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      //업로드 취소할 시
      setImage("/images/emptyProfile.png");
      return;
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <Container
        component="main"
        //maxWidth="sm"
        sx={{ width: "50vw" }}
      >
        <Box
          sx={{
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            color="#FBD385"
            fontWeight="bold"
          >
            회원 정보 수정
          </Typography>
          <br />
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Fab
                color="primary"
                aria-label="edit"
                onClick={() => {
                  fileInput.current.click();
                }}
              >
                <CameraAltIcon />
              </Fab>
            }
          >
            <Avatar src={Image} sx={{ width: 150, height: 150 }} />
            <input
              type="file"
              style={{ display: "none" }}
              accept="image/jpg,impge/png,image/jpeg"
              name="profile_img"
              onChange={onChange}
              ref={fileInput}
            />
          </Badge>
          <Box
            //component="form"
            // noValidate
            //onSubmit={submitCheck}
            sx={{ mt: 3, mb: 5 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="nickname"
                  label="닉네임"
                  type="nickname"
                  autoFocus
                  autoComplete="off"
                  onChange={onChangeNickname}
                  ref={nickRef}
                  onKeyPress={handleKeyPress}
                />
                <FormHelperText sx={{ color: "red" }}>
                  {nicknameError}
                </FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="pw"
                  id="pw"
                  label="비밀번호"
                  type="password"
                  autoComplete="new-password"
                  onChange={onChangePassword}
                  ref={passRef}
                  onKeyPress={handleKeyPress}
                />
                <FormHelperText sx={{ color: "red" }}>
                  {passwordError}
                </FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPw"
                  label="비밀번호 확인"
                  type="password"
                  autoComplete="new-password"
                  onChange={onChangePasswordConfirm}
                  ref={confirmRef}
                  onKeyPress={handleKeyPress}
                />
                <FormHelperText sx={{ color: "red" }}>
                  {confirmPwError}
                </FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="이메일"
                  name="email"
                  autoComplete="email"
                  onChange={onChangeEmail}
                  ref={emailRef}
                  onKeyPress={handleKeyPress}
                />
                <FormHelperText sx={{ color: "red" }}>
                  {emailError}
                </FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="전화번호"
                  name="phone"
                  autoComplete="phone"
                  onChange={onChangePhone}
                  ref={phoneRef}
                  onKeyPress={checkenterSubmit}
                />
                <FormHelperText sx={{ color: "red" }}>
                  {phoneError}
                </FormHelperText>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 1,
                height: "50px",
              }}
              color="primary"
              onClick={submitCheck}
            >
              <Typography component="h1" variant="h6" color="white">
                수정
              </Typography>
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ModifyInfo;
