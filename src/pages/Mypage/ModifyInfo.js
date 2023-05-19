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
import { useLocation } from "react-router-dom";

function ModifyInfo() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
const [uploadedImageUrl, setUploadedImageUrl] = useState(""); // 업로드된 이미지 URL 저장
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
    /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordError(
        "숫자+영문자 조합으로 8~20자리로 입력해주세요!"
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`submit->  ${password} ${nickname} ${email} ${phone} ${Image}`);
  };


  const location = useLocation();
  const memberNum = location.state.num;

  const submitCheck = () => {
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
    } else {setPhoneError("");}
    
    if (nickname && password && confirmPw && email && phone) {
      if (file) {
        const formData = new FormData();
        formData.append("file : ", file);
  
        try {
          const response =  axios.post("/upload", formData);
          setUploadedImageUrl(response.data);
        } catch (error) {
          console.error("이미지 업로드 실패 : ", error);
        }
      } else {
        setUploadedImageUrl("https://via.placeholder.com/150");
      }
      
      console.log(memberNum);
      const memberData = {
        memberNickname: nickname,
        memberPw: password,
        memberEmail: email,
        memberTel: phone,
        memberImg: uploadedImageUrl,
      };
    axios.put(`/update/${memberNum}`, memberData)
      .then((res) => {
        console.log(res.data); // 성공 시 메시지 출력
        if (res.data) {
          alert("수정 성공");
          //document.location.href = "/mypage";
        } else {
          alert("수정에 실패하셨습니다.");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <Container
        component="main"
        //maxWidth="sm"
        sx={{ width: "50vw" }}
      >
        <Box
        component="form"
        validate="true"
        onSubmit={handleSubmit}
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
                aria-label="edit"
                size="small"
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
            sx={{ mt: 3 }}
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
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value
                        .replace(/[^0-9]/g, "")
                        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/, `$1-$2-$3`)
                        .replace(/-{1,2}$/g, "")
                    )
                    
                  }
                  inputProps={{ maxLength: 13, pattern: "[0-9]*" }}
                  InputProps={{
                    inputMode: "numeric",
                  }}
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
              <Typography  component="h1" variant="h6" color="white">
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