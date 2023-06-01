import * as React from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import styled from "styled-components";
import { ADMIN } from "../../../constants/PageURL";

// Generate Order Data
function createData(
  memberNum,
  memberId,
  memberNickName,
  memberEmail,
  memberName,
  memberGender,
  memberBirth,
  memberRole,
  memberImg
) {
  return {
    memberNum,
    memberId,
    memberNickName,
    memberEmail,
    memberName,
    memberGender,
    memberBirth,
    memberRole,
    memberImg,
  };
}

const UserImg = styled(Avatar)`
  && {
    margin-right: 8px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 10px;
  }
`;

const rows = [
  createData(
    1,
    "admin1234",
    "관리자",
    "admin1@test.com",
    "관리자",
    "male",
    "2000-01-01",
    "Admin",
    "https://taemin-testbucket.s3.ap-northeast-2.amazonaws.com/petmily/8f230276-3448-4a42-b3fa-8bac6dc06e83.png"
  ),
  createData(
    2,
    "test1234",
    "닉네임1",
    "test1@test.com",
    "홍길동",
    "male",
    "2000-01-01",
    "User",
    "https://taemin-testbucket.s3.ap-northeast-2.amazonaws.com/petmily/5a395426-5d25-45b4-80e1-1ca846e1b5fc.png"
  ),
  createData(
    3,
    "test1235",
    "닉네임2",
    "test2@test.com",
    "김길동",
    "male",
    "2000-01-01",
    "User",
    "https://taemin-testbucket.s3.ap-northeast-2.amazonaws.com/petmily/66336982-ecdb-44fe-9488-1d8f7a777bfa.png"
  ),
  createData(
    4,
    "test1236",
    "닉네임3",
    "test1@test.com",
    "이길동",
    "male",
    "2000-01-01",
    "User",
    "https://taemin-testbucket.s3.ap-northeast-2.amazonaws.com/petmily/efe36b62-5e96-4c5b-8ce7-064bc0ca6f95.png"
  ),
  createData(
    5,
    "test1237",
    "닉네임4",
    "test1@test.com",
    "박길동",
    "male",
    "2000-01-01",
    "User",
    "https://taemin-testbucket.s3.ap-northeast-2.amazonaws.com/petmily/2d014257-7fc4-4b7a-ae2e-b554d7c3f464.png"
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Members() {
  return (
    <React.Fragment>
      <Typography variant="h6" component="div" style={{ marginBottom: "16px" }}>
        회원
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>대표이미지</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>닉네임</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell align="right">유저 권한</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <UserImg src={row.memberImg} />
              </TableCell>
              <TableCell>{row.memberId}</TableCell>
              <TableCell>{row.memberNickName}</TableCell>
              <TableCell>{row.memberEmail}</TableCell>
              <TableCell>{row.memberName}</TableCell>
              <TableCell>{row.memberGender}</TableCell>
              <TableCell>{row.memberBirth}</TableCell>
              <TableCell align="right">{row.memberRole}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ marginTop: "20px", textAlign: "right" }}>
        <Link to={ADMIN.MEMBER}>회원 관리 이동</Link>
      </div>
    </React.Fragment>
  );
}
