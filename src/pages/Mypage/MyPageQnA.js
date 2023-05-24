import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Grid from "@mui/material/Grid";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { tableCellClasses } from "@mui/material/TableCell";
import { Pagination } from "@mui/material";
import Stack from "@mui/material/Stack";
import CustomButton from "../Login/CustomButton";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { MYPAGE } from "../../constants/PageURL";
import { ThemeProvider, Typography } from "@mui/material";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
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
  // "td,th": {
  //   border: "1px solid lightgray",
  // },
}));

const MyPageQnA = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/board/qna")
      .then((response) => {
        setData(response.data);
       console.log(response.data);
       console.log(data.memberNum);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (data.length === 0) {
    return (
      <ThemeProvider theme={CustomTheme}>
        <Typography
          className="myOrderListTitle"
          sx={titleSx}
          border={3}
          borderColor="#ffbd59"
          mb={4}
        >
          1:1 문의
        </Typography>
        <Grid sx={{ width: "940px", height: "50vh" }}>
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
                <StyledTableCell colSpan={4} align="center" sx={{height:250}}>문의 내역이 없습니다.</StyledTableCell>
              </StyledTableRow>
            </TableHead>
          </Table>
          <Link to={MYPAGE.QNA_WRITE} style={{ textDecoration: "none" }} state={{num : data.memberNum }}>
            <CustomButton label="문의하기" value="문의하기">
              문의하기
            </CustomButton>
          </Link>
        </Grid>
      </ThemeProvider>
  );
  }else {
  return (
      <ThemeProvider theme={CustomTheme}>
        <Typography
          className="myOrderListTitle"
          sx={titleSx}
          border={3}
          borderColor="#ffbd59"
          mb={4}
        >
          1:1 문의
        </Typography>
        <Grid sx={{ width: "940px", height: "50vh" }}>
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
                    <StyledTableCell align="center" sx={{ minWidth: 300 }}>
                      <Link
                        to={MYPAGE.QNA_DETAIL(qna.boardNum)}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {qna.qnaSubject}
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                      {qna.qnaDate}
                    </StyledTableCell>
                    {qna.qnaStatus===false ? (
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
          <Link to={MYPAGE.QNA_WRITE} style={{ textDecoration: "none" }} state={{num : data.memberNum }}>
            <CustomButton label="문의하기" value="문의하기">
              문의하기
            </CustomButton>
          </Link>
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
}};

const titleSx = {
  width: "200px",
  textAlign: "center",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "1.5rem",
  lineHeight: "50px",
};

export default MyPageQnA;
