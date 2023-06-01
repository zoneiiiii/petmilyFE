import { useLocation } from "react-router-dom";
import {
  Button,
  TextField,
  Box,
  Typography,
  ThemeProvider,
} from "@mui/material";
import CustomButton from "../../Login/CustomButton";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";
import axios from "axios";
import { Admin } from "../../ImportPages";

import { ADMIN } from "../../../constants/PageURL";
import { useState, useEffect } from "react";
const Style = {
  width: "300px",
};

const divtyle = {
  display: "flex",
};
const AdminAdoptInfo = () => {
  const location = useLocation();
  const state = location?.state || 0;
  const [adoptState, setAdoptState] = useState();
  const [data, setData] = useState([]);

  const handleOk = async (e) => {
    axios
      .put(`/adopt/${state.adoptNum}`, {
        adoptState: "success",
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
      });
      alert("반려완료");
      document.location.href = ADMIN.ADOPT;
    } catch (error) {
      console.error("Error handling fail:", error);
    }
  };
  useEffect(() => {
    axios
      .get(`/pet/${state.petName}`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("error");
      });
  }, [state.petName]);

  return (
    <ThemeProvider theme={CustomTheme}>
      <div
        style={{
          // textAlign: "center",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "50px auto",
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          fontWeight="bold"
          fontSize="40px"
          sx={{ marginBttom: "20px" }}
        >
          입양 관리
        </Typography>
        <Box style={{ width: "1000px", border: "2px solid", padding: "20px" }}>
          <Typography component="h1" variant="h4" fontWeight="bold">
            입양 신청자 정보
          </Typography>
          <div style={divtyle}>
            <Typography
              component="h3"
              variant="h4"
              fontWeight="bold"
              sx={Style}
            >
              이름 :
            </Typography>
            <Typography component="h3" variant="h4" fontWeight="bold">
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
              주소:
            </Typography>
            <Typography component="h3" variant="h4" fontWeight="bold">
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
              생년월일 :
            </Typography>
            <Typography component="h3" variant="h4" fontWeight="bold">
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
              이메일 :
            </Typography>
            <Typography component="h3" variant="h4" fontWeight="bold">
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
              전화번호 :
            </Typography>
            <Typography component="h3" variant="h4" fontWeight="bold">
              {state.adopterTel}
            </Typography>
          </div>
        </Box>
        <Box
          style={{
            marginTop: "20px",
            width: "1000px",
            border: "2px solid",
            padding: "20px",
          }}
        >
          <Typography component="h1" variant="h4" fontWeight="bold">
            유기동물 정보
          </Typography>
          <div style={divtyle}>
            <Typography
              component="h3"
              variant="h4"
              fontWeight="bold"
              sx={Style}
            >
              번호 :
            </Typography>
            <Typography component="h3" variant="h4" fontWeight="bold">
              {data.petName}
            </Typography>
          </div>
          <div style={divtyle}>
            <Typography
              component="h3"
              variant="h4"
              fontWeight="bold"
              sx={Style}
            >
              보호소 이름:
            </Typography>
            <Typography component="h3" variant="h4" fontWeight="bold">
              {data.shelterName}
            </Typography>
          </div>
          <div style={divtyle}>
            <Typography
              component="h3"
              variant="h4"
              fontWeight="bold"
              sx={Style}
            >
              보호소 주소 :
            </Typography>
            <Typography component="h3" variant="h4" fontWeight="bold">
              {data.shelterAddr}
            </Typography>
          </div>
          <div style={divtyle}>
            <Typography
              component="h3"
              variant="h4"
              fontWeight="bold"
              sx={Style}
            >
              보호소 주소 :
            </Typography>
            <Typography component="h3" variant="h4" fontWeight="bold">
              {data.shelterTel}
            </Typography>
          </div>
        </Box>
        {state.adoptState === "wait" ? (
          <div style={{ display: "flex" }}>
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
            style={{ color: "blue", marginTop: "20px" }}
          >
            입양 승인
          </Typography>
        ) : (
          <Typography
            component="h4"
            variant="h4"
            fontWeight="bold"
            style={{ color: "red", marginTop: "20px" }}
          >
            입양 반려
          </Typography>
        )}
      </div>
    </ThemeProvider>
  );
};
export default AdminAdoptInfo;
