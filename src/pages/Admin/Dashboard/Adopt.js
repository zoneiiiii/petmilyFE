import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { ADMIN } from "../../../constants/PageURL";
import axios from "axios";
import Title from "./Title";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Adopt = () => {
  const [count, setCount] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/adopt/counts")
      .then((response) => {
        setCount(response.data); // 페이지네이션을 사용할 경우에는 data.content로 받아야합니다.
      })
      .catch((error) => {
        console.error("정보 가져오기 실패", error);
      });
  }, []);

  return (
    <React.Fragment>
      <Title>입양 신청 현황</Title>
      <TableContainer component={Paper}>
        <Table>
          <TableHead></TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontSize: "16px" }}>입양신청</TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {count.totalCount}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: "16px",
                }}
              >
                대기중
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {count.waitingCount}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: "16px",
                }}
              >
                입양완료
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {count.successCount}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: "16px",
                }}
              >
                입양반려
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {count.failCount}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography color="text.secondary" sx={{ flex: 1 }}></Typography>
      <div style={{ height: "20px", textAlign: "right" }}>
        <Link to={ADMIN.ADOPT}>입양 관리 이동</Link>
      </div>
    </React.Fragment>
  );
};

export default Adopt;
