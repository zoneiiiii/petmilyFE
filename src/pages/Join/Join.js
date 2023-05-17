import "./join.css";
import axios from "axios";
import React, { useRef, useState, useCallback } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";

const Button = styled.button`
  width: 300px;
  height: 35px;
  background-color: #fbd385;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  border: 2px solid #ffbd59;
  margin-top: 40px;
  cursor: pointer;
`;

const Joinup = styled.h1`
  color: #fbd385;
  font-size: 40px;
`;

const Section = styled.section`
  text-align: center;
  background-color: white;
  border: none;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: flex-end;
`;

const InputName = styled.div`
  width: 4.5rem;
  background-color: #fbd385;
  text-align: center;
  font-weight: bold;
  padding: 10px 22px;
  border-radius: 6px;
  border: 2px solid #ffbd59;
  flex-shrink: 0;
`;

const Inputbox = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-grow: 1;
  padding: 0px 25px;
`;

const InputRadio = styled.div`
  vertical-align: middle;
`;
const Join = () => {
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [name, setName] = useState("");

  const IDRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const emailRef = useRef();
  const nameRef = useRef();
  const nicknameRef = useRef();
  const dateOfBirthRef = useRef();
  const phonenumberRef = useRef();
  const genderRef = useRef();

  const [IDError, setIDError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [dateOfBirthError, setDateOfBirthError] = useState("");
  const [phonenumberError, setPhonenumberError] = useState("");

  const handleFormSubmit = () => {
    axios
      .post("/register", {
        memberId: IDRef?.current?.querySelector("input").value,
        memberPw: passwordRef?.current?.querySelector("input").value,
        memberNickname: nicknameRef?.current?.querySelector("input").value,
        memberEmail: emailRef?.current?.querySelector("input").value,
        memberName: nameRef?.current?.querySelector("input").value,
        memberBirth: dateOfBirthRef?.current?.querySelector("input").value,
        memberTel: phonenumberRef?.current?.querySelector("input").value,
        memberGender: genderRef?.current?.querySelector("input").value,
      })
      .then((res) => {
        const { data } = res;
        if (data === 0) {
          setIDError("이미 사용중인 아이디입니다.");
          IDRef.current.querySelector("input").value = "";
        } else {
          alert("회원가입이 완료되었습니다.\n로그인 화면으로 이동합니다.");
          window.location.href = "/login";
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onChangeId = useCallback((e) => {
    const IDRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{6,15}$/;
    setID(e.target.value);
    if (!IDRegex.test(IDRef.current.querySelector("input").value)) {
      setIDError("숫자+영문자 조합으로 6~15자리로 입력해주세요!");
    } else {
      setIDError("");
    }
  }, []);

  const onChangepassword = useCallback((e) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,20}$/;
    setPassword(e.target.value);
    if (!passwordRegex.test(passwordRef.current.querySelector("input").value)) {
      setPasswordError(
        "숫자+영문자+특수문자 조합으로 8~20자리로 입력해주세요!"
      );
    } else {
      setPasswordError("");
    }
  }, []);

  const onChangeEmail = useCallback((e) => {
    const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailError("이메일 형식을 다시 확인해주세요.");
    } else {
      setEmailError("");
    }
  }, []);

  const onChangePhone = useCallback((e) => {
    const phonenumberRegex = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
    const phoneCurrent = e.target.value;
    setPhonenumber(phoneCurrent);

    if (!phonenumberRegex.test(phoneCurrent)) {
      setPhonenumberError("전화번호를 다시 확인해주세요.");
    } else {
      setPhonenumberError("");
    }
  }, []);

  const onChangeNickname = useCallback((e) => {
    setNickname(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 5) {
      setNicknameError("2글자 이상 5글자 미만으로 입력해주세요.");
    } else {
      setNicknameError("");
    }
  }, []);

  const onChangePasswordConfirm = useCallback(
    (e) => {
      const passwordConfirmCurrent = e.target.value;
      setConfirmPassword(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setConfirmPasswordError("");
      } else {
        setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      }
    },
    [password]
  );

  const onChangeName = useCallback((e) => {
    setName(e.target.value);
    if (!nameRef?.current?.querySelector("input").value) {
      setNameError("이름을 입력해주세요.");
    } else {
      setNameError("");
    }
  }, []);

  const onChangeDate = useCallback((e) => {
    setDateOfBirthError("");
  }, []);

  const handleButtonClick = (e) => {
    if (true) {
      if (!IDRef?.current?.querySelector("input").value) {
        setIDError("아이디를 입력해주세요.");
      } else {
        setIDError("");
      }

      if (!passwordRef?.current?.querySelector("input").value) {
        setPasswordError("패스워드를 입력해주세요.");
      } else {
        setPasswordError("");
      }

      if (!confirmPasswordRef?.current?.querySelector("input").value) {
        setConfirmPasswordError("패스워드 확인을 입력해주세요.");
      } else {
        setConfirmPasswordError("");
      }

      if (!emailRef?.current?.querySelector("input").value) {
        setEmailError("이메일을 입력해주세요.");
      } else {
        setEmailError("");
      }

      if (!nameRef?.current?.querySelector("input").value) {
        setNameError("이름을 입력해주세요.");
      } else {
        setNameError("");
      }

      if (!nicknameRef?.current?.querySelector("input").value) {
        setNicknameError("닉네임을 입력해주세요.");
      } else {
        setNicknameError("");
      }

      if (!dateOfBirthRef?.current?.querySelector("input").value) {
        setDateOfBirthError("생년월일을 입력해주세요.");
      } else {
        setDateOfBirthError("");
      }

      if (!phonenumberRef?.current?.querySelector("input").value) {
        setPhonenumberError("전화번호를 입력해주세요.");
      } else {
        setPhonenumberError("");
      }
    }

    handleFormSubmit();
  };

  return (
    <>
      <Section>
        <div>
          <Joinup>회원가입</Joinup>

          <div className="form-wrapper">
            <InputContainer>
              <InputName>ID</InputName>
              <TextField
                type="id"
                variant="standard"
                className="input-item"
                name="user-id"
                onChange={onChangeId}
                ref={IDRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const target = passwordRef.current.querySelector("input");
                    target.focus();
                  }
                }}
              />
            </InputContainer>
            <FormHelperText
              sx={{ color: "red", marginLeft: "140px", fontSize: "0.9rem" }}
            >
              {IDError}
            </FormHelperText>
            <InputContainer>
              <InputName>PW</InputName>
              <TextField
                type="password"
                variant="standard"
                className="input-item"
                name="user-pw"
                ref={passwordRef}
                onChange={onChangepassword}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const target =
                      confirmPasswordRef.current.querySelector("input");
                    target.focus();
                  }
                }}
              />
            </InputContainer>
            <FormHelperText
              sx={{ color: "red", marginLeft: "140px", fontSize: "0.9rem" }}
            >
              {passwordError}
            </FormHelperText>

            <InputContainer>
              <InputName>PW 확인</InputName>
              <TextField
                type="password"
                variant="standard"
                className="input-item"
                name="chk-user-pw"
                ref={confirmPasswordRef}
                onChange={onChangePasswordConfirm}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const target = emailRef.current.querySelector("input");
                    target.focus();
                  }
                }}
              />
            </InputContainer>
            <FormHelperText
              sx={{ color: "red", marginLeft: "140px", fontSize: "0.9rem" }}
            >
              {confirmPasswordError}
            </FormHelperText>

            <InputContainer>
              <InputName>이메일</InputName>
              <TextField
                type="email"
                variant="standard"
                className="input-item"
                name="user-email"
                ref={emailRef}
                onChange={onChangeEmail}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const target = nameRef.current.querySelector("input");
                    target.focus();
                  }
                }}
              />
            </InputContainer>
            <FormHelperText
              sx={{ color: "red", marginLeft: "140px", fontSize: "0.9rem" }}
            >
              {emailError}
            </FormHelperText>

            <InputContainer>
              <InputName>이름</InputName>
              <TextField
                type="name"
                variant="standard"
                maxLength="10"
                className="input-item"
                name="user-name"
                ref={nameRef}
                onChange={onChangeName}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const target = nicknameRef.current.querySelector("input");
                    target.focus();
                  }
                }}
              />
            </InputContainer>
            <FormHelperText
              sx={{ color: "red", marginLeft: "140px", fontSize: "0.9rem" }}
            >
              {nameError}
            </FormHelperText>

            <InputContainer>
              <InputName>닉네임</InputName>
              <TextField
                type="nickname"
                variant="standard"
                className="input-item"
                name="user-nickname"
                ref={nicknameRef}
                onChange={onChangeNickname}
              />
            </InputContainer>
            <FormHelperText
              sx={{ color: "red", marginLeft: "140px", fontSize: "0.9rem" }}
            >
              {nicknameError}
            </FormHelperText>

            <InputContainer>
              <InputName>생년월일</InputName>
              <Inputbox>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <input type="date" /> */}
                  <DatePicker
                    className="input-item default-date"
                    ref={dateOfBirthRef}
                    onChange={onChangeDate}
                    format="YYYY-MM-DD"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const target =
                          phonenumberRef.current.querySelector("input");
                        target.focus();
                      }
                    }}
                  />
                </LocalizationProvider>
              </Inputbox>
            </InputContainer>
            <FormHelperText
              sx={{ color: "red", marginLeft: "140px", fontSize: "0.9rem" }}
            >
              {dateOfBirthError}
            </FormHelperText>

            <InputContainer>
              <InputName>전화번호</InputName>
              <TextField
                type="phonenumber"
                variant="standard"
                className="input-item"
                ref={phonenumberRef}
                onChange={onChangePhone}
                name="user-number"
              />
            </InputContainer>
            <FormHelperText
              sx={{ color: "red", marginLeft: "140px", fontSize: "0.9rem" }}
            >
              {phonenumberError}
            </FormHelperText>

            <InputContainer
              className="form-center"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <InputName>성별</InputName>
              <Inputbox>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="male"
                  name="radio-buttons-group"
                  ref={genderRef}
                >
                  <InputRadio>
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="남"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="여"
                    />
                  </InputRadio>
                </RadioGroup>
              </Inputbox>
            </InputContainer>
          </div>

          <br />

          <div className="inputContainer">
            <Button onClick={handleButtonClick}>회원가입</Button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Join;
