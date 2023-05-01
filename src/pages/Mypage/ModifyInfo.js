import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Fab from "@mui/material/Fab";
import { useRef, useState } from "react";
import FormHelperText from "@mui/material/FormHelperText";

//테마 색상 지정
const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#FBD385",
    },
  },
});
function ModifyInfo() {
  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [confirmPwError, setConfirmPwError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const nickRef = useRef();
  const passRef = useRef();
  const confirmRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();

  const nickChange = (event) => {
    setNickname((value) => event.target.value);
    console.log("nickname" + event.target.value);
    if (nickname.length < 2 || nickname.length > 5) {
      setNicknameError("닉네임은 2글자 이상 5글자 이하로 입력해주세요!");
      return false;
    } else {
      setNicknameError("");
    }
  };
  const isValidPassword = (password) => {
    const pwLength = password.length >= 8 && password.length <= 20;
    return pwLength;
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
    } else {
      setPasswordError("");
    }
  };
  const confirmChange = (event) => {
    setConfirmPw((value) => event.target.value);
    console.log("confirmPw" + event.target.value);

    // if (event.target.value) {
    //   setConfirmPwError("");
    // }
    if (passRef !== confirmRef) {
      setConfirmPwError("비밀번호가 일치하지 않습니다다.");
      confirmRef.current.focus();
    } else {
      setConfirmPwError("");
    }
  };
  const emailChange = (event) => {
    setEmail((value) => event.target.value);
    console.log("email" + event.current.value);
    if (event.target.value) {
      setEmailError("");
    }
  };
  const isValidPhone = (phone) => {
    var phoneRegExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
    return phoneRegExp.test(phone);
  };
  const phoneChange = (event) => {
    setPhone((value) => event.target.value);
    console.log("phone" + event.current.value);
    if (event.target.value) {
      setPhoneError(
        isValidPhone(event.target.value) ? "" : "전화번호를 확인해 주세요."
      );
    } else {
      setPhoneError("");
    }
  };
  const addressChange = (event) => {
    setAddress((value) => event.target.value);
    console.log("address" + event.target.value);
    if (event.target.value) {
      setAddressError("");
    } else {
    }
  };

  const checkenterSubmit = (e) => {
    if (e.key === "Enter") {
      submitCheck();
    }
  };

  const passwordInput = document.querySelector("[name=password]");
  const confirmPwInput = document.querySelector("[name=confirmPw]");
  const emailInput = document.querySelector("[name=email]");
  const phoneInput = document.querySelector("[name=phone]");
  const addressInput = document.querySelector("[name=address]");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      //ref&& nickRef.target.current.value != ""

      if (e.target.name === "nickname" && nickRef.current.value !== "") {
        passwordInput.focus();
      } else if (e.target.name === "password" && passRef.current.value !== "") {
        confirmPwInput.focus();
      } else if (
        e.target.name === "confirmPw" &&
        confirmRef.current.value !== ""
      ) {
        emailInput.focus();
      } else if (e.target.name === "email" && emailRef.current.value !== "") {
        phoneInput.focus();
      } else if (e.target.name === "phone" && phoneRef.current.value !== "") {
        addressInput.focus();
      }
    }
  };

  const submitCheck = (e) => {
    let validPhone = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/.test(phone);
    let validPassword = password.length >= 8 && password.length <= 20;
    if (!nickname) {
      setNicknameError("닉네임을 입력해주세요.");
      nickRef.current.focus();
    }
    if (!password) {
      setPasswordError("패스워드를 입력해주세요.");
      passRef.current.focus();
    } else if (!validPassword) {
      setPasswordError("비밀번호는 8~20자 사이여야 합니다.");
      passRef.current.focus();
    }
    if (!confirmPw) {
      setConfirmPwError("패스워드 확인을 입력해주세요.");
      confirmRef.current.focus();
      // } else if (password !== confirmPw) {
      //   setConfirmPwError("비밀번호가 일치하지 않습니다다.");
      //   confirmRef.current.focus();
    }
    if (!email) {
      setEmailError("이메일을 입력해주세요.");
      emailRef.current.focus();
    }
    if (!phone) {
      setPhoneError("전화번호를 입력해주세요.");
      phoneRef.current.focus();
    } else if (!validPhone) {
      setPasswordError("전화번호를 확인해 주세요.");
      phoneRef.current.focus();
    }
    if (!address) {
      setAddressError("주소를 입력해주세요.");
      addressRef.current.focus();
    }
  };
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
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {" "}
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
                  onChange={nickChange}
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
                  name="password"
                  label="비밀번호"
                  type="password"
                  autoComplete="new-password"
                  onChange={pwChange}
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
                  onChange={confirmChange}
                  ref={confirmRef}
                  onKeyPress={handleKeyPress}
                />
                <FormHelperText sx={{ color: "red" }}>
                  {confirmPwError}
                </FormHelperText>
              </Grid>{" "}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="이메일"
                  name="email"
                  autoComplete="email"
                  onChange={emailChange}
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
                  onChange={phoneChange}
                  ref={phoneRef}
                  onKeyPress={handleKeyPress}
                />
                <FormHelperText sx={{ color: "red" }}>
                  {phoneError}
                </FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="주소"
                  name="address"
                  autoComplete="address"
                  onChange={addressChange}
                  ref={addressRef}
                  onKeyPress={checkenterSubmit}
                />
                <FormHelperText sx={{ color: "red" }}>
                  {addressError}
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
                fontWeight: "bold",
              }}
              color="primary"
              onClick={submitCheck}
            >
              <Typography
                component="h1"
                variant="h6"
                color="white"
                fontWeight="bold"
              >
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
