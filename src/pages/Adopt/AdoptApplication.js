import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ADOPT } from "../../constants/PageURL";
import { ThemeProvider } from "@mui/material";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import * as React from "react";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  console.log("aa", location);
  const state = location?.state || 0;

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
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
            <img
              className="AdoptedCat"
              src="./../images/AdoptedCat.png"
              alt="profile"
              width={"300px"}
              height={"300px"}
              style={{ borderRadius: "50%" }}
            />
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
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  required
                  fullWidth
                  name="birth"
                  label="생년월일"
                  type="text"
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  required
                  fullWidth
                  name="tel"
                  label="전화번호"
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  required
                  fullWidth
                  name="addr"
                  label="주소"
                  type="text"
                />
              </Grid>{" "}
              <Grid item xs={12}>
                <CustomTextField
                  required
                  fullWidth
                  label="이메일"
                  name="email"
                />
              </Grid>
            </Grid>
            <Grid sx={{ marginTop: "10px" }}>
              <CustomizedButton
                type="submit"
                variant="contained"
                sx={{ marginRight: "15px" }}
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
