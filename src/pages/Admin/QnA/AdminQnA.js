import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { tableCellClasses } from "@mui/material/TableCell";
import { Pagination } from "@mui/material";
import Stack from "@mui/material/Stack";
import CustomButton from "../../Login/CustomButton";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { MYPAGE } from "../../../constants/PageURL";
import { ThemeProvider, Typography } from "@mui/material";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";
import { useState, useEffect } from "react";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "td,th": {
    border: "1px solid lightgray",
  },
}));
const AdminQnA = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8080/board/qna`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (data.length === 0) {
    return (
      <ThemeProvider theme={CustomTheme}>
        <Grid sx={{ width: "70vw", height: "50vh", margin: "0 auto" }}>
          <Table
            sx={{
              mt: 15,
              border: "1px solid lightgray",
            }}
            aria-label="caption table"
            overflow="hidden"
          >
            <TableHead>
              <StyledTableRow>
                <StyledTableCell
                  colSpan={4}
                  align="center"
                  sx={{ height: 250 }}
                >
                  문의 내역이 없습니다.
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
          </Table>
          {/* <Link to={MYPAGE.QNA_WRITE} style={{ textDecoration: "none" }}> */}
          {/* <CustomButton label="문의하기" value="문의하기">
            답변
          </CustomButton> */}
          {/* </Link> */}
        </Grid>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={CustomTheme}>
        <Grid sx={{ width: "70vw", height: "50vh", margin: "0 auto" }}>
          <Table
            sx={{
              mt: 15,
              border: "1px solid lightgray",
            }}
            aria-label="caption table"
            overflow="hidden"
          >
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align="center" sx={{ minWidth: 10 }}>
                  No.
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ minWidth: 10 }}>
                  회원번호
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ minWidth: 300 }}>
                  제목
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                  작성날짜
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ minWidth: 10 }}>
                  답변상태
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(
                  (page - 1) * rowsPerPage,
                  (page - 1) * rowsPerPage + rowsPerPage
                )
                .map((qna) => (
                  <StyledTableRow key={qna.boardNum}>
                    <StyledTableCell align="center" sx={{ minWidth: 10 }}>
                      {qna.boardNum}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 10 }}>
                      {qna.memberNum}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 300 }}>
                      {qna.qnaSubject}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                      {qna.qnaDate}
                    </StyledTableCell>
                    {qna.qnaStatus === false ? (
                      <StyledTableCell
                        align="center"
                        sx={{
                          minWidth: 10,
                          color: "blue",
                        }}
                      >
                        진행중
                      </StyledTableCell>
                    ) : (
                      <StyledTableCell
                        align="center"
                        sx={{
                          minWidth: 10,
                          color: "darkgray",
                        }}
                      >
                        답변완료
                      </StyledTableCell>
                    )}
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
          {/* <Link to={MYPAGE.QNA_WRITE} style={{ textDecoration: "none" }}> */}
          {/* <CustomButton label="답변하기" value="문의하기"></CustomButton> */}
          {/* </Link> */}
          <Stack spacing={2} sx={{ mt: 5 }}>
            <Pagination
              color="primary"
              page={page}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
              onChange={handleChangePage}
              component="div"
              count={Math.ceil(data.length / rowsPerPage)}
            />
          </Stack>
        </Grid>
      </ThemeProvider>
    );
  }
};

export default AdminQnA;
