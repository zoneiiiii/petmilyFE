import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { ADMIN } from "../../../constants/PageURL";
import { ThemeProvider } from "@mui/material";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";
import { useState, useEffect } from "react";
import axios from "axios";

const AdminQnA = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    getData(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const getData = (page) => {
    let queryText = "/board/qna";
    if (page) {
      queryText += "?page=" + page;
    }
    console.log("queryText:", queryText);
    axios
      .get(queryText)
      .then((response) => {
        console.log(response);
        setData(response.data.content);
        setPage(parseInt(response.data.number));
        setTotalElements(parseInt(response.data.totalElements));
        console.log(totalElements);
      })
      .catch((error) => {
        console.error("axios 오류 : ", error);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (data.length === 0) {
    return (
      <ThemeProvider theme={CustomTheme}>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Paper>
            <Table
              sx={{
                border: "1px solid lightgray",
              }}
              aria-label="caption table"
              overflow="hidden"
            >
              <TableHead>
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ height: 250 }}>
                    문의 내역이 없습니다.
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </Paper>
        </Container>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={CustomTheme}>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Paper
            sx={{
              p: 1,
              mb: 2,
              fontWeight: "bold",
              textAlign: "center",
              height: "57px",
              lineHeight: "46px",
            }}
          >
            총 문의 수 : {totalElements} 건
          </Paper>
          <Paper>
            <Table
              sx={{
                border: "1px solid lightgray",
              }}
              aria-label="caption table"
              overflow="hidden"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", width: "140px" }}
                  >
                    No.
                  </TableCell>

                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    제목
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", width: "160px" }}
                  >
                    작성날짜
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", width: "110px" }}
                  >
                    회원번호
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", width: "160px" }}
                  >
                    답변상태
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((qna) => (
                  <TableRow key={qna.boardNum}>
                    <TableCell align="center">{qna.boardNum}</TableCell>
                    <TableCell align="center">
                      <Link
                        to={ADMIN.QNA_DETAIL(qna.boardNum)}
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        {qna.qnaSubject}
                      </Link>
                    </TableCell>

                    <TableCell align="center">{qna.qnaDate}</TableCell>
                    <TableCell align="center">{qna.memberNum}</TableCell>
                    {qna.qnaStatus === false ? (
                      <TableCell
                        align="center"
                        sx={{
                          minWidth: 10,
                          color: "blue",
                        }}
                      >
                        진행중
                      </TableCell>
                    ) : (
                      <TableCell
                        align="center"
                        sx={{
                          minWidth: 10,
                          color: "darkgray",
                        }}
                      >
                        답변완료
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={totalElements}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Container>
      </ThemeProvider>
    );
  }
};

export default AdminQnA;
