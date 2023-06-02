import React, { useState, useEffect } from "react";
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
import axios from "axios";

const UserImg = styled(Avatar)`
  && {
    margin-right: 8px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 10px;
  }
`;

export default function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios
      .get("/members", {
        params: {
          page: 0,
          size: 5,
        },
      })
      .then((response) => {
        setMembers(response.data.content); // 페이지네이션을 사용할 경우에는 data.content로 받아야합니다.
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <React.Fragment>
      <Typography
        variant="h6"
        component="div"
        color="primary"
        style={{ marginBottom: "16px" }}
      >
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
          {members.map((member) => (
            <TableRow key={member.memberNum}>
              <TableCell>
                <UserImg src={member.memberImg} />
              </TableCell>
              <TableCell>{member.memberId}</TableCell>
              <TableCell>{member.memberNickname}</TableCell>
              <TableCell>{member.memberEmail}</TableCell>
              <TableCell>{member.memberName}</TableCell>
              <TableCell>{member.memberGender}</TableCell>
              <TableCell>{member.memberBirth}</TableCell>
              <TableCell align="right">{member.memberRole}</TableCell>
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
