import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ADOPT } from "../../constants/PageURL";
import { useState, useContext, useEffect, useCallback, useRef } from "react";
import {
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  ThemeProvider,
} from "@mui/material";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import * as React from "react";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AuthContext } from "../../contexts/AuthContexts";
import axios from "axios";
import FormHelperText from "@mui/material/FormHelperText";
import DaumPostcode from "react-daum-postcode";
import * as S from "../Support/Volunteer/VolunteerNoticeWrite.styled";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CustomTextField = styled(TextField)({
  backgroundColor: "white",
  "& label.Mui-focused": {
    color: "#FBD385",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#FBD385",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      //borderColor: "#FBD385",
    },
    "&:hover fieldset": {
      borderColor: "#FBD385",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FBD385",
    },
  },
});
const CustomizedButton = styled(Button)`
  background-color: #fbd385;
  color: white;
  width: 90px;
  height: 40px;
  margin-top: 10px;
  &:hover {
    background-color: #facc73;
  }
  &:focus {
    background-color: #facc73;
  }
`;

const AdoptApplication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userNum } = useContext(AuthContext);
  const currentDate = new Date();
  console.log("user", userNum);
  const isoCurrentDate = new Date(
    currentDate.getTime() + 9 * 60 * 60 * 1000
  ).toISOString();
  const [file, setFile] = useState(null);
  const state = location?.state || 0;
  const [data, setData] = useState([]);
  const [name, setName] = useState();
  const { loggedIn } = useContext(AuthContext);
  const [adopterAddr, setAdopterAddr] = useState();
  const [adopterEmail, setAdopterEmail] = useState();
  const [adopterTel, setAdopterTel] = useState();
  const [adopterBirth, setAdopterBirth] = useState();
  const [isHover, setIsHover] = React.useState(false);
  const handleHover = () => setIsHover(true);
  const handleLeave = () => setIsHover(false);
  const [telError, setTelError] = useState();
  const [nameError, setNameError] = useState("");
  const [addressError, setAddressError] = useState(false);
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [addressDetail, setAddressDetail] = useState("");
  const [expanded, setExpanded] = React.useState(false);
  const [addressDetailError, setAddressDetailError] = useState(false);
  const [emailError, setEmailError] = useState();
  const [dateOfBirthError, setDateOfBirthError] = useState("");
  console.log("aa", location);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const IDRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const emailRef = useRef();
  const nameRef = useRef();
  const nicknameRef = useRef();
  const dateOfBirthRef = useRef();
  const phonenumberRef = useRef();
  const genderRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location.state) {
      alert("선택된 동물이 없습니다.");
      return;
    }
    if (validate()) {
      if (loggedIn === true) {
        try {
          const petRequest = axios.post("/pet/insert", {
            petName: state.desertionNo,
          });
          const adoptRequest = axios.post("/adopt/insert", {
            petName: state.desertionNo,
            petAge: state.age,
            petImg: state.profile,
            petSpecies: state.kindCd,
            shelterName: state.careNm,
            shelterTel: state.careTel,
            shelterAddr: state.careAddr,
            sexCd: state.sexCd,
            neuterYn: state.neuterYn,
            adopterName: name,
            adopterBirth: dateOfBirthRef?.current?.querySelector("input").value,
            adopterTel: adopterTel,
            adopterAddr: adopterAddr + " " + addressDetail,
            adopterEmail: adopterEmail,
            adoptDate: isoCurrentDate,
            adoptState: "wait",
          });

          await axios.all([petRequest, adoptRequest]);

          alert("신청완료");
          document.location.href = ADOPT.REVIEW;
        } catch (error) {
          // Handle error if any of the requests fail
          console.error(error);
        }
      } else {
        alert("로그인 후 신청해주세요!!!");
      }
    }
  };
  const isValidatePhone = (tel) => {
    const phoneRegex = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
    return phoneRegex.test(tel.slice(0, 13));
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
    if (event.target.value !== "") {
      setNameError("");
    } else {
      setNameError("이름을 입력하세요");
    }
  };

  const handleAddress = (data) => {
    setAdopterAddr(data.address);
    setIsPostcodeOpen(false);
  };
  const handlePostcodeOpen = () => {
    setIsPostcodeOpen(true);
  };

  const handlePostcodeClose = () => {
    setIsPostcodeOpen(false);
  };

  const handleTelChange = (event) => {
    setAdopterTel(
      event.target.value
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})(\d{0,1})$/g, "$1-$2-$3")
        .replace(/(\-{1,2})$/g, "")
        .slice(0, 13)
    );
    console.log(event.target.value);
    setTelError(
      isValidatePhone(event.target.value)
        ? ""
        : "올바른 휴대폰 번호를 입력하세요."
    );
    if (event.target.value === "") {
      setTelError("휴대폰 번호를 입력하세요");
    }
  };
  const handleIdChange = (event) => {
    setAdopterEmail(event.target.value);
    // setEmail 함수를 이용해 email 상태값을 업데이트한다.
    setEmailError(
      isValidId(event.target.value) ? "" : "정확한 이메일 주소를 입력해주세요."
    );
  };
  const isValidId = (id) => {
    const idRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return idRegex.test(id);
    // 이메일 주소의 유효성을 검사하는 코드를 작성한다.
    // 유효한 이메일 주소인 경우 true, 그렇지 않은 경우 false를 반환한다.
  };
  const onChangeDate = useCallback((e) => {
    setDateOfBirthError("");
  }, []);

  const validate = () => {
    let isError = true;
    if (!name) {
      setNameError("이름을 입력해 주세요");
      isError = false;
    } else {
      setNameError("");
    }
    if (!adopterTel) {
      setTelError("전화번호를 입력해 주세요");
      isError = false;
    } else {
      setTelError("");
    }
    if (!adopterAddr) {
      setAddressError("주소를 입력해 주세요");
      isError = false;
    } else {
      setAddressError("");
    }
    if (!addressDetail) {
      setAddressDetailError("상세주소를 입력해 주세요");
      isError = false;
    } else {
      setAddressDetailError("");
    }
    if (!dateOfBirthRef?.current?.querySelector("input").value) {
      setDateOfBirthError("생년월일을 입력해주세요.");
      isError = false;
    } else {
      setDateOfBirthError("");
    }
    if (!adopterEmail) {
      setEmailError("이메일을 입력해 주세요");
      isError = false;
    } else {
      setEmailError("");
    }

    return isError;
  };
  useEffect(() => {
    if (userNum !== null) {
      axios
        .get(`/getMemberDetail/${userNum}`)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("error");
        });
    }
  }, [userNum]);
  return (
    <ThemeProvider theme={CustomTheme}>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        {state === 0 ? (
          <div>
            <Typography
              component="h1"
              variant="h2"
              sx={{
                color: "black",
                mt: "30px",
                mb: "30px",
                fontSize: "35px",
                fontWeight: "bolder",
              }}
            >
              입양 신청
            </Typography>
            <Typography paragraph>신청 전 필수 확인</Typography>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Button
                style={{
                  color: "gray",
                  fontSize: "medium",
                  mb: "30px",
                  height: "20px",
                }}
                onClick={() => navigate(ADOPT.ADOPT)}
              >
                아이들 보러가기
              </Button>
              <br />
              <Button
                style={{
                  color: "gray",
                  fontSize: "medium",
                  mb: "30px",
                  height: "20px",
                }}
                onClick={() => navigate(ADOPT.CHECKLIST)}
              >
                입양 체크리스트 확인하기
              </Button>
            </Collapse>
          </div>
        ) : (
          <div>
            <Typography
              component="h3"
              variant="h2"
              sx={{
                color: "black",
                mt: "30px",
                mb: "30px",
                fontSize: "35px",
                fontWeight: "bolder",
              }}
            >
              입양 신청
            </Typography>
            <Typography paragraph>신청 전 필수 확인</Typography>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Button
                style={{
                  color: "gray",
                  fontSize: "medium",
                  mb: "30px",

                  height: "20px",
                }}
                onClick={() => navigate(ADOPT.CHECKLIST)}
              >
                입양 체크리스트 확인하기
              </Button>
            </Collapse>
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: "30px",
          }}
        >
          {data?.length === 0 ? (
            <div>
              <img
                className="ProfileImg"
                src={"./../images/emptyProfile.png"}
                alt="profile"
                width={"250px"}
                height={"250px"}
                style={{ borderRadius: "50%", marginRight: "20px" }}
              />
              <Typography
                component="h4"
                variant="h5"
                sx={{
                  color: "black",
                  mt: "30px",
                }}
              >
                USER
              </Typography>
            </div>
          ) : (
            <div>
              <img
                className="ProfileImg"
                src={data.memberImg}
                alt="profile"
                width={"250px"}
                height={"250px"}
                style={{ borderRadius: "50%", marginRight: "20px" }}
              />
              <Typography
                component="h4"
                variant="h5"
                sx={{
                  color: "black",
                  mt: "30px",
                }}
              >
                {data.memberNickname}
              </Typography>
            </div>
          )}

          <img
            className="Arrow"
            src="./../images/Arrow.png"
            alt="Arrow"
            style={{
              objectFit: "contian",
              marginRight: "20px",
              paddingBottom: "60px",
            }}
          />
          {state === 0 ? (
            <div>
              <div style={{ position: "relative", display: "inline-block" }}>
                <img
                  className="AdoptedCat"
                  src="./../images/pet.png"
                  alt="profile"
                  width={"250px"}
                  height={"250px"}
                  style={{
                    borderRadius: "50%",
                    cursor: "pointer",
                    transition: "all 0.3s ease-out",
                    transform: isHover ? "scale(1.05)" : "scale(1)",
                  }}
                  onMouseEnter={handleHover}
                  onMouseLeave={handleLeave}
                  onClick={() => navigate(ADOPT.ADOPT)}
                />

                {isHover && (
                  <div
                    onClick={() => navigate(ADOPT.ADOPT)}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 10,
                      backgroundColor: "rgba(0,0,0,0.8)",
                      cursor: "pointer",
                      borderRadius: "50%",
                      width: "90%",
                      height: "90%",
                    }}
                    onMouseEnter={handleHover}
                    onMouseLeave={handleLeave}
                  >
                    <Typography
                      variant="h6"
                      component="span"
                      sx={{
                        color: "white",
                        p: 2,
                        animation: isHover
                          ? "none"
                          : "$fadeInOut 2s ease-out infinite",
                      }}
                    >
                      유기동물 보러가기
                    </Typography>
                  </div>
                )}
              </div>
              <Typography
                component="h4"
                variant="h5"
                sx={{
                  color: "black",
                  mt: "30px",
                }}
              >
                유기동물
              </Typography>
            </div>
          ) : (
            <div>
              <img
                className="AdoptedCat"
                src={state.profile}
                alt="profile"
                width={"250px"}
                height={"250px"}
                style={{ borderRadius: "50%" }}
              />
              <Typography
                component="h4"
                variant="h5"
                sx={{
                  color: "black",
                  mt: "30px",
                }}
              >
                {state.desertionNo}
              </Typography>
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "650px",
            justifyContent: "space-between",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "40px",
            marignBottom: "20px",
          }}
        >
          {/* <Typography
            component="h5"
            variant="h5"
            sx={{
              color: "black",
            }}
          >
            입양 체크리스트를 꼭 확인 후 신청해 주세요!
          </Typography>
          <Button
            style={{
              color: "gray",
              fontSize: "medium",

              height: "20px",
            }}
            onClick={() => navigate(ADOPT.CHECKLIST)}
          >
            체크리스트 보러가기.
          </Button> */}
        </div>

        <Container
          style={{
            backgroundColor: "#F5F5ED",
            width: "650px",
            height: "650px",
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            alignItems: "center",
            borderRadius: "10px",
          }}
        >
          <Box sx={{ width: "600px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} style={{ height: "94px" }}>
                <CustomTextField
                  required
                  fullWidth
                  name="name"
                  label="이름"
                  type="text"
                  autoFocus
                  autoComplete="off"
                  onChange={handleNameChange}
                />
                <FormHelperText sx={{ color: "red" }}>
                  {nameError}
                </FormHelperText>
              </Grid>
              <Grid item xs={12} style={{ height: "94px" }}>
                <Box sx={{ backgroundColor: "white", width: "100%" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      className="input-item default-date"
                      onChange={onChangeDate}
                      ref={dateOfBirthRef}
                      fullWidth
                      format="YYYY-MM-DD"
                      label={"생년월일"}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </LocalizationProvider>
                </Box>
                <FormHelperText sx={{ color: "red" }}>
                  {dateOfBirthError}
                </FormHelperText>
              </Grid>
              <Grid item xs={12} style={{ height: "94px" }}>
                <CustomTextField
                  required
                  fullWidth
                  name="tel"
                  label="전화번호"
                  onChange={handleTelChange}
                  value={adopterTel}
                  inputProps={{ maxLength: 13 }}
                />
                <FormHelperText sx={{ color: "red" }}>
                  {telError}
                </FormHelperText>
              </Grid>
              <Grid item xs={12} style={{ height: "94px" }}>
                <div style={{ display: "flex" }}>
                  <CustomTextField
                    label="주소"
                    value={adopterAddr}
                    required
                    fullWidth
                    // InputProps={{ readOnly: true }}
                  />
                  <S.ButtonSpace />
                  <S.WriteButton onClick={handlePostcodeOpen}>
                    검색
                  </S.WriteButton>
                </div>
                <Dialog
                  open={isPostcodeOpen}
                  onClose={handlePostcodeClose}
                  fullWidth
                  maxWidth="sm"
                >
                  <DialogTitle>주소 검색</DialogTitle>
                  <DialogContent>
                    {isPostcodeOpen && (
                      <DaumPostcode
                        onComplete={(data) => {
                          handleAddress(data);
                          setAddressError(false);
                        }}
                        autoClose={false}
                        width={592}
                        height={557}
                      />
                    )}
                  </DialogContent>
                </Dialog>
                <FormHelperText sx={{ color: "red" }}>
                  {addressError ? "주소를 입력해 주세요." : null}
                </FormHelperText>
              </Grid>
              <Grid item xs={12} style={{ height: "94px" }}>
                <CustomTextField
                  required
                  fullWidth
                  name="addr"
                  label="상세주소"
                  value={addressDetail}
                  type="text"
                  style={{ marginRight: "5px" }}
                  onChange={(e) => {
                    setAddressDetailError(false);
                    setAddressDetail(e.target.value);
                  }}
                />
                <FormHelperText sx={{ color: "red" }}>
                  {addressDetailError ? "상세주소를 입력해 주세요." : null}
                </FormHelperText>
              </Grid>

              <Grid item xs={12} style={{ height: "94px" }}>
                <CustomTextField
                  required
                  fullWidth
                  label="이메일"
                  name="email"
                  value={adopterEmail}
                  onChange={handleIdChange}
                />
                <FormHelperText sx={{ color: "red" }}>
                  {emailError}
                </FormHelperText>
              </Grid>
            </Grid>
            <Grid sx={{ marginTop: "10px" }}>
              <CustomizedButton
                type="submit"
                variant="contained"
                sx={{ marginRight: "15px" }}
                onClick={handleSubmit}
              >
                신청
              </CustomizedButton>
              <CustomizedButton
                type="submit"
                variant="contained"
                onClick={() => navigate(ADOPT.ADOPT)}
              >
                취소
              </CustomizedButton>
            </Grid>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default AdoptApplication;
