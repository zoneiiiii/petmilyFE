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
  height: 40px;
  background-color: #bfbfbf;
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 4px;
  margin-top: 40px;
  cursor: pointer;
  &:hover {
    background-color: #757575;
  }
  &:focus {
    background-color: #757575;
  }
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
        if (data === 1) {
          setIDError("이미 사용중인 아이디입니다.");
          IDRef.current.querySelector("input").value = "";
        } else if (data === 2) {
          setEmailError("이미 사용중인 이메일입니다.");
          emailRef.current.querySelector("input").value = "";
        } else if (data === 3) {
          setNicknameError("이미 사용중인 닉네임입니다.");
          nicknameRef.current.querySelector("input").value = "";
        } else if (data === 4) {
          setPhonenumberError("이미 사용중인 전화번호입니다.");
          phonenumberRef.current.querySelector("input").value = "";
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
      setPasswordError("숫자+영문자 조합으로 8~20자리로 입력해주세요!");
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

  const onChangePhone = (e) => {
    const input = e.target.value;
    const formattedNumber = formatPhoneNumber(input);
    setPhonenumber(formattedNumber);
    const regPhone = /^01([0|1|6|7|8|9])?([0-9]{3,4})?([0-9]{4})$/;

    if (regPhone.test(phonenumber) === true || formattedNumber.trim() !== "") {
      setPhonenumberError("");
    } else {
      setPhonenumberError("전화번호를 다시 확인해주세요.");
    }
  };

  //전화번호 하이픈 자동완성
  const formatPhoneNumber = (number) => {
    const numericOnly = number.replace(/[^0-9]/g, "");
    const formattedNumber = numericOnly
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/, "$1-$2-$3")
      .replace(/-{1,2}$/g, "");
    return formattedNumber;
  };

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
    const IDRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{6,15}$/;
    if (!IDRef?.current?.querySelector("input").value) {
      setIDError("아이디를 입력해주세요.");
      return;
    } else if (!IDRegex.test(IDRef.current.querySelector("input").value)) {
      setIDError("숫자+영문자 조합으로 6~15자리로 입력해주세요!");
      return;
    } else {
      setIDError("");
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,20}$/;
    if (!passwordRef?.current?.querySelector("input").value) {
      setPasswordError("패스워드를 입력해주세요.");
      return;
    } else if (
      !passwordRegex.test(passwordRef.current.querySelector("input").value)
    ) {
      setPasswordError("숫자+영문자 조합으로 8~20자리로 입력해주세요!");
      return;
    } else {
      setPasswordError("");
    }

    if (!confirmPasswordRef?.current?.querySelector("input").value) {
      setConfirmPasswordError("패스워드 확인을 입력해주세요.");
      return;
    } else if (password !== confirmpassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      return;
    } else {
      setConfirmPasswordError("");
    }

    const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (!emailRef?.current?.querySelector("input").value) {
      setEmailError("이메일을 입력해주세요.");
      return;
    } else if (
      !emailRegex.test(emailRef.current.querySelector("input").value)
    ) {
      setEmailError("이메일 형식을 다시 확인해주세요.");
      return;
    } else {
      setEmailError("");
    }

    if (!nameRef?.current?.querySelector("input").value) {
      setNameError("이름을 입력해주세요.");
      return;
    } else {
      setNameError("");
    }

    if (!nicknameRef?.current?.querySelector("input").value) {
      setNicknameError("닉네임을 입력해주세요.");
      return;
    } else if (nickname.length < 2 || nickname.length > 5) {
      setNicknameError("2글자 이상 5글자 미만으로 입력해주세요.");
      return;
    } else {
      setNicknameError("");
    }
    console.log(nicknameRef?.current?.querySelector("input").value);

    if (!dateOfBirthRef?.current?.querySelector("input").value) {
      setDateOfBirthError("생년월일을 입력해주세요.");
      return;
    } else {
      setDateOfBirthError("");
    }

    const phonenumberRegex =
      /^(?:(010-\d{4})|(01[1|6|7|8|9]-\d{3,4}))-(\d{4})$/;
    if (!phonenumberRef?.current?.querySelector("input").value) {
      setPhonenumberError("전화번호를 입력해주세요.");
      return;
    } else if (
      !phonenumberRegex.test(
        phonenumberRef.current.querySelector("input").value
      )
    ) {
      setPhonenumberError("전화번호를 다시 확인해주세요.");
      return;
    } else {
      setPhonenumberError("");
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
                name="user-number"
                value={phonenumber}
                ref={phonenumberRef}
                onChange={onChangePhone}
                inputProps={{ maxLength: 13 }}
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
