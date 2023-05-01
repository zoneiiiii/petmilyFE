import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  ThemeProvider,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import { MYPAGE } from "../../constants/PageURL";

function MyInfo() {
  const navigate = useNavigate();
  const member = {
    num: 1,
    id: "PetLove",
    pw: "12345678",
    nickname: "",
    email: "asdf@naver.com",
    name: "이기자",
    gender: "남자",
    birth: "2023-01-01",
    tel: "010-1234-5678",
    addr: "서울특별시 강남구 선릉로 428",
    img: "",
    role: "user",
  };

  // const columnWidth = 100;
  return (
    <ThemeProvider theme={CustomTheme}>
      <Box p={2} border={3} borderRadius={2} borderColor="fbd385.main">
        <Table
          size="small"
          padding="normal"
          sx={{ minWidth: "800px", borderBottomColor: "fbd385.main" }}
        >
          <TableBody>
            <TableRow>
              <TableCell sx={tdSx}>ID</TableCell>
              <TableCell sx={tdSx}>{member.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={tdSx}>PW</TableCell>
              <TableCell sx={tdSx}>{"*".repeat(member.pw.length)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={tdSx}>이름</TableCell>
              <TableCell sx={tdSx}>{member.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={tdSx}>성별</TableCell>
              <TableCell sx={tdSx}>{member.gender}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={tdSx}>생일</TableCell>
              <TableCell sx={tdSx}>{member.birth}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={tdSx}>연락처</TableCell>
              <TableCell sx={tdSx}>{member.tel}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={tdSx}>이메일</TableCell>
              <TableCell sx={tdSx}>{member.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={tdSx}>주소</TableCell>
              <TableCell sx={tdSx}>{member.addr}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="fbd385"
            sx={{ m: 2, width: "100px" }}
            onClick={() => navigate(MYPAGE.MODIFY_INFO)}
          >
            수정
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

const tdSx = {
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "1.5rem",
  lineHeight: "50px",
  borderBottom: "1px solid #fbd385",
};

export default MyInfo;
