import { Button, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BROWSER_PATH } from "../../constants/path";

const theme = createTheme({
  palette: {
    type: "mainColor",
    fdb385: {
      main: "#FBD385",
    },
  },
});

function MyPageInfo() {
  const navigate = useNavigate();
  const member = {
    num: 1,
    id: "PetLove",
    pw: "*******",
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

  const columnWidth = 100;
  return (
    <>
      <MyPageInfoTable>
        <tbody>
          <tr>
            <td className="infoType" width={columnWidth}>
              ID
            </td>
            <td> {member.id}</td>
          </tr>
          <tr>
            <td className="infoType" width={columnWidth}>
              PW
            </td>
            <td> {member.pw}</td>
          </tr>
          <tr>
            <td className="infoType" width={columnWidth}>
              이름
            </td>
            <td> {member.name}</td>
          </tr>
          <tr>
            <td className="infoType" width={columnWidth}>
              성별
            </td>
            <td> {member.gender}</td>
          </tr>
          <tr>
            <td className="infoType" width={columnWidth}>
              생일
            </td>
            <td> {member.birth}</td>
          </tr>
          <tr>
            <td className="infoType" width={columnWidth}>
              연락처
            </td>
            <td> {member.tel}</td>
          </tr>
          <tr>
            <td className="infoType" width={columnWidth}>
              이메일
            </td>
            <td> {member.email}</td>
          </tr>
          <tr>
            <td className="infoType" width={columnWidth}>
              주소
            </td>
            <td> {member.addr}</td>
          </tr>
          <tr className="btn">
            <td colSpan={2}>
              <ThemeProvider theme={theme}>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    mb: 1,
                    fontWeight: "bold",
                    width: 100,
                    height: 40,
                  }}
                  color="fdb385"
                  onClick={() => navigate(BROWSER_PATH.MODIFYINFO)}
                >
                  수정
                </Button>
              </ThemeProvider>
            </td>
          </tr>
        </tbody>
      </MyPageInfoTable>
    </>
  );
}

const MyPageInfoTable = styled.table`
  border-collapse: collapse;
  width: 60vw;
  tr {
    height: 50px;
    border-bottom: 3px solid #ffbd59;
  }

  .btn {
    border: none;
    text-align: right;
    height: 5rem;
    vertical-align: bottom;
  }

  .infoType {
    font-weight: bold;
  }
  th,
  td {
    font-size: 1.5rem;
  }
`;

export default MyPageInfo;
