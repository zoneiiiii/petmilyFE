import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ADOPT } from "../../constants/PageURL";
import { useState, useContext } from "react";
import { ThemeProvider } from "@mui/material";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import * as React from "react";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AuthContext } from "../../contexts/AuthContexts";
import axios from "axios";

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

  const currentDate = new Date();
  const isoCurrentDate = new Date(
    currentDate.getTime() + 9 * 60 * 60 * 1000
  ).toISOString();
  const [file, setFile] = useState(null);
  const state = location?.state || 0;
  const [name, setName] = useState();
  const { loggedIn } = useContext(AuthContext);
  const [adopterAddr, setAdopterAddr] = useState();
  const [adopterEmail, setAdopterEmail] = useState();
  const [adopterTel, setAdopterTel] = useState();
  const [adopterBirth, setAdopterBirth] = useState();
  const [isHover, setIsHover] = React.useState(false);
  const handleHover = () => setIsHover(true);
  const handleLeave = () => setIsHover(false);

  const [expanded, setExpanded] = React.useState(false);
  console.log("aa", loggedIn);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loggedIn === true) {
      try {
        const petRequest = axios.post("/pet/insert", {
          petName: state.desertionNo,
          petAge: state.age,
          petImg: state.profile,
          petSpecies: state.kindCd,
          shelterName: state.careNm,
          shelterTel: state.careTel,
          shelterAddr: state.careAddr,
          shelterDate: isoCurrentDate,
        });
        const adoptRequest = axios.post("/adopt/insert", {
          petName: state.desertionNo,
          petImg: state.profile,
          adopterName: name,
          adopterBirth: adopterBirth,
          adopterTel: adopterTel,
          adopterAddr: adopterAddr,
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
  };

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
              component="h1"
              variant="h2"
              sx={{
                color: "black",
                mt: "30px",
                mb: "30px",
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
          <img
            className="ProfileImg"
            src={"./../images/emptyProfile.png"}
            alt="profile"
            width={"300px"}
            height={"300px"}
            style={{ borderRadius: "50%", marginRight: "20px" }}
          />
          <img
            className="Arrow"
            src="./../images/Arrow.png"
            alt="Arrow"
            style={{
              objectFit: "contian",
              marginRight: "20px",
            }}
          />
          {state === 0 ? (
            <div style={{ position: "relative", display: "inline-block" }}>
              <img
                className="AdoptedCat"
                src="./../images/pet.png"
                alt="profile"
                width={"300px"}
                height={"300px"}
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
          ) : (
            <img
              className="AdoptedCat"
              src={state.profile}
              alt="profile"
              width={"300px"}
              height={"300px"}
              style={{ borderRadius: "50%" }}
            />
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
        >
          <Typography
            component="h4"
            variant="h5"
            sx={{
              color: "black",
              mt: "30px",
            }}
          >
            user1
          </Typography>
          {state === 0 ? (
            <Typography
              component="h4"
              variant="h5"
              sx={{
                color: "black",
                mt: "30px",
              }}
            >
              고양이
            </Typography>
          ) : (
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
          )}
        </div>
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

        <div
          style={{
            backgroundColor: "#F5F5ED",
            width: "650px",
            height: "450px",
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            alignItems: "center",
            borderRadius: "10px",
          }}
        >
          <Box sx={{ width: "600px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomTextField
                  required
                  fullWidth
                  name="name"
                  label="이름"
                  type="text"
                  autoFocus
                  autoComplete="off"
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  required
                  fullWidth
                  name="birth"
                  label="생년월일"
                  type="text"
                  onChange={(e) => setAdopterBirth(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  required
                  fullWidth
                  name="tel"
                  label="전화번호"
                  onChange={(e) => setAdopterTel(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  required
                  fullWidth
                  name="addr"
                  label="주소"
                  type="text"
                  onChange={(e) => setAdopterAddr(e.target.value)}
                />
              </Grid>{" "}
              <Grid item xs={12}>
                <CustomTextField
                  required
                  fullWidth
                  label="이메일"
                  name="email"
                  onChange={(e) => setAdopterEmail(e.target.value)}
                />
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
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AdoptApplication;
