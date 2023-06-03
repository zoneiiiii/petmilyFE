import { useLocation } from "react-router-dom";
import {
  Button,
  TextField,
  Box,
  Typography,
  ThemeProvider,
  Paper,
} from "@mui/material";
import CustomButton from "../../Login/CustomButton";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";
import axios from "axios";
import { Admin } from "../../ImportPages";
import Container from "@mui/material/Container";
import { ADMIN } from "../../../constants/PageURL";
import { useState, useEffect } from "react";
const Style = {
  width: "100px",
  fontSize: "15px",
  marginBottom: "5px",
};
const fontStyle = {
  fontSize: "15px",
  marginBottom: "5px",
  marginRight: "5px",
};

const divtyle = {
  display: "flex",
};
const AdminAdoptInfo = () => {
  const currentDate = new Date();

  const isoCurrentDate = new Date(
    currentDate.getTime() + 9 * 60 * 60 * 1000
  ).toISOString();
  const location = useLocation();
  const state = location?.state || 0;
  const [adoptState, setAdoptState] = useState();
  const [data, setData] = useState([]);

  const handleOk = async (e) => {
    axios
      .put(`/adopt/${state.adoptNum}`, {
        adoptState: "success",
        approvedDate: isoCurrentDate,
      })
      .then(() => {
        alert("승인완료");
        document.location.href = ADMIN.ADOPT;
      });
  };
  const handlefail = async (e) => {
    try {
      await axios.delete(`/pet/${state.petName}`);
      await axios.put(`/adopt/${state.adoptNum}`, {
        adoptState: "fail",
        approvedDate: isoCurrentDate,
      });
      alert("반려완료");
      document.location.href = ADMIN.ADOPT;
    } catch (error) {
      console.error("Error handling fail:", error);
    }
  };
  const handleOnClick = () => {
    document.location.href = ADMIN.ADOPT;
  };
  // useEffect(() => {
  //   axios
  //     .get(`/pet/${state.petName}`)
  //     .then((response) => {
  //       setData(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("error");
  //     });
  // }, [state.petName]);

  return (
    <ThemeProvider theme={CustomTheme}>
      <Container
        sx={{
          mt: 4,
          mb: 4,
        }}
      >
        <Paper sx={{ mb: 2 }}>
          <Box style={{ border: "1px solid", padding: "20px" }}>
            <Typography
              component="h1"
              variant="h4"
              fontWeight="bold"
              style={{ fontSize: "25px", marginBottom: "5px" }}
            >
              입양 신청자 정보
            </Typography>
            <div style={divtyle}>
              <Typography
                component="h3"
                variant="h4"
                fontWeight="bold"
                sx={Style}
              >
                이름
              </Typography>
              <Typography
                component="h3"
                variant="h4"
                fontWeight="bold"
                sx={fontStyle}
              >
                :
              </Typography>
              <Typography
                component="h3"
                variant="h4"
                fontWeight="bold"
                sx={fontStyle}
              >
                {state.adopterName}
              </Typography>
            </div>
            <div style={divtyle}>
              <Typography
                component="h3"
                variant="h4"
                fontWeight="bold"
                sx={Style}
              >
                주소
              </Typography>
              <Typography
                component="h3"
                variant="h4"
                fontWeight="bold"
                sx={fontStyle}
              >
                :
              </Typography>
              <Typography
                component="h3"
                variant="h4"
                fontWeight="bold"
                sx={fontStyle}
              >
                {state.adopterAddr}
              </Typography>
            </div>
            <div style={divtyle}>
              <Typography
                component="h3"
                variant="h4"
                fontWeight="bold"
                sx={Style}
              >
                생년월일
              </Typography>
              <Typography
                component="h3"
                variant="h4"
                fontWeight="bold"
                sx={fontStyle}
              >
                :
              </Typography>
              <Typography
                component="h3"
                variant="h4"
                fontWeight="bold"
                sx={fontStyle}
              >
                {state.adopterBirth}
              </Typography>
            </div>
            <div style={divtyle}>
              <Typography
                component="h3"
                variant="h4"
                fontWeight="bold"
                sx={Style}
              >
                이메일
              </Typography>
              <Typography
                component="h3"
                variant="h4"
                fontWeight="bold"
                sx={fontStyle}
              >
                :
              </Typography>
              <Typography
                component="h3"
                variant="h4"
                fontWeight="bold"
                sx={fontStyle}
              >
                {state.adopterEmail}
              </Typography>
            </div>
            <div style={divtyle}>
              <Typography
                component="h3"
                variant="h4"
                fontWeight="bold"
                sx={Style}
              >
                전화번호
              </Typography>
              <Typography
                component="h3"
                variant="h4"
                fontWeight="bold"
                sx={fontStyle}
              >
                :
              </Typography>
              <Typography
                component="h3"
                variant="h4"
                fontWeight="bold"
                sx={fontStyle}
              >
                {state.adopterTel}
              </Typography>
            </div>
          </Box>
        </Paper>
        <Paper>
          <Box
            style={{
              border: "1px solid",
              padding: "20px",
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              fontWeight="bold"
              style={{ fontSize: "25px", marginBottom: "5px" }}
            >
              유기동물 정보
            </Typography>
            <div style={divtyle}>
              <Typography
                component="h3"
                variant="h4"
                fontWeight="bold"
                sx={Style}
              >
                번호
              </Typography>
              <Typography
                component="h3"
                variant="h4"
                fontWeight="bold"
                sx={fontStyle}
              >
                :
              </Typography>
              <Typography
                component="h3"
                variant="h4"
                fontWeight="bold"
                sx={fontStyle}
              >
                {state.petName}
              </Typography>
            </div>
            <div style={divtyle}>
              <Typography
                component="h3"
                variant="h4"
                fontWeight="bold"
                sx={Style}
              >
                보호소 이름
              </Typography>

              <Typography
                component="h3"
                variant="h4"
                fontWeight="bold"
                sx={fontStyle}
              >
                :
              </Typography>
              <Typography
                component="h3"
                variant="h4"
                fontWeight="bold"
                sx={fontStyle}
              >
                {state.shelterName}
              </Typography>
            </div>
            <div style={divtyle}>
              <Typography
                component="h3"
                variant="h4"
                fontWeight="bold"
                sx={Style}
              >
                보호소 주소
              </Typography>
              <Typography
                component="h3"
                variant="h4"
                fontWeight="bold"
                sx={fontStyle}
              >
                :
              </Typography>
              <Typography
                component="h3"
                variant="h4"
                fontWeight="bold"
                sx={fontStyle}
              >
                {state.shelterAddr}
              </Typography>
            </div>
            <div style={divtyle}>
              <Typography
                component="h3"
                variant="h4"
                fontWeight="bold"
                sx={Style}
              >
                보호소 주소
              </Typography>
              <Typography
                component="h3"
                variant="h4"
                fontWeight="bold"
                sx={fontStyle}
              >
                :
              </Typography>
              <Typography
                component="h3"
                variant="h4"
                fontWeight="bold"
                sx={fontStyle}
              >
                {state.shelterTel}
              </Typography>
            </div>
          </Box>
        </Paper>
        {state.adoptState === "wait" ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <CustomButton
              value="글쓰기"
              label="승인"
              onClick={handleOk}
            ></CustomButton>
            <CustomButton
              value="삭제"
              label="반려"
              onClick={handlefail}
            ></CustomButton>
          </div>
        ) : state.adoptState === "success" ? (
          <Typography
            component="h4"
            variant="h4"
            fontWeight="bold"
            style={{
              color: "blue",
              marginTop: "20px",
              fontSize: "20px",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={handleOnClick}
          >
            입양 승인
          </Typography>
        ) : (
          <Typography
            component="h4"
            variant="h4"
            fontWeight="bold"
            style={{
              color: "red",
              marginTop: "20px",
              fontSize: "20px",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={handleOnClick}
          >
            입양 반려
          </Typography>
        )}
      </Container>
    </ThemeProvider>
  );
};
export default AdminAdoptInfo;
