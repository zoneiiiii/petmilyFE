import styleds from "styled-components";
import * as React from "react";
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
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { MYPAGE } from "../../constants/PageURL";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#FBD385",
    },
  },
});

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

const qnaList = [
  {
    num: 7,
    subject: "환불 문의드립니다.",
    date: "2023-02-02",
    qnaStatus: "진행중",
  },
  {
    num: 6,
    subject: "환불 문의드립니다.",
    date: "2023-02-02",
    qnaStatus: "진행중",
  },
  {
    num: 5,
    subject: "환불 문의드립니다.",
    date: "2023-02-02",
    qnaStatus: "진행중",
  },
  {
    num: 4,
    subject: "환불 문의드립니다.",
    date: "2023-02-02",
    qnaStatus: "진행중",
  },
  {
    num: 3,
    subject: "환불 문의드립니다.",
    date: "2023-02-02",
    qnaStatus: "진행중",
  },
  {
    num: 2,
    subject: "입양 절차 문의드립니다.",
    date: "2023-02-02",
    qnaStatus: "답변완료",
  },
  {
    num: 1,
    subject: "배송 문의드립니다.",
    date: "2023-02-02",
    qnaStatus: "답변완료",
  },
];

const MyPageQnA = () => {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <MyPageStyle>
          <div className="navTitle">
            <h5>1:1 문의</h5>
          </div>
        </MyPageStyle>
        <Grid style={{ width: 1000 }}>
          <Table
            sx={{
              mt: 5,
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
              {qnaList
                .slice(
                  (page - 1) * rowsPerPage,
                  (page - 1) * rowsPerPage + rowsPerPage
                )
                .map((qna) => (
                  <StyledTableRow key={qna.num}>
                    <StyledTableCell align="center" sx={{ minWidth: 10 }}>
                      {qna.num}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 300 }}>
                      <Link
                        to={MYPAGE.QNA_DETAIL(qna.num)}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {qna.subject}
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                      {qna.date}
                    </StyledTableCell>
                    {qna.qnaStatus === "진행중" ? (
                      <StyledTableCell
                        align="center"
                        sx={{
                          minWidth: 10,
                          color: "blue",
                        }}
                      >
                        {qna.qnaStatus}
                      </StyledTableCell>
                    ) : (
                      <StyledTableCell
                        align="center"
                        sx={{
                          minWidth: 10,
                          color: "red",
                        }}
                      >
                        {qna.qnaStatus}
                      </StyledTableCell>
                    )}
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
          <Link to={MYPAGE.QNA_WRITE} style={{ textDecoration: "none" }}>
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
              count={Math.ceil(qnaList.length / rowsPerPage)}
            />
          </Stack>
        </Grid>
      </ThemeProvider>
    </>
  );
};

const MyPageStyle = styleds.div`
  .navTitle {
    border: 1px solid #fbd385;
    width: 200px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default MyPageQnA;
