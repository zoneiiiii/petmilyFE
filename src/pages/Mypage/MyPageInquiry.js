import styleds from "styled-components";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { tableCellClasses } from "@mui/material/TableCell";
import { Pagination } from "@mui/material";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import CustomButton from "../Login/CustomButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const columns = [
  { id: "num", label: "No.", minWidth: 20, align: "center" },
  {
    id: "subject",
    label: "제목",
    minWidth: 170,
    align: "center",
  },
  {
    id: "date",
    label: "작성날짜 ",
    minWidth: 30,
    align: "center",
  },
  {
    id: "qnaStatus",
    label: "답변상태",
    minWidth: 10,
    align: "center",
  },
];
function createData(num, subject, date, qnaStatus) {
  return { num, subject, date, qnaStatus };
}

const rows = [
  createData(7, "환불 문의드립니다.", "2023-02-02", "진행중"),
  createData(6, "환불 문의드립니다.", "2023-02-02", "진행중"),
  createData(5, "환불 문의드립니다.", "2023-02-02", "진행중"),
  createData(4, "환불 문의드립니다.", "2023-02-02", "진행중"),
  createData(3, "환불 문의드립니다.", "2023-02-02", "진행중"),
  createData(2, "입양 절차 문의드립니다.", "2023-02-02", "답변완료"),
  createData(1, "배송 문의드립니다.", "2023-02-02", "답변완료"),
];

const MyPageInquiry = () => {
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
        <TableContainer
          component={Paper}
          sx={{
            mt: 5,
          }}
        >
          <Table
            sx={{ minWidth: 900 }}
            aria-label="caption table"
            overflow="hidden"
          >
            <TableHead>
              <StyledTableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(
                  (page - 1) * rowsPerPage,
                  (page - 1) * rowsPerPage + rowsPerPage
                )
                .map((row) => {
                  return (
                    <StyledTableRow key={row.num}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <StyledTableCell key={column.id} align={column.align}>
                            <Link
                              to="/mypage/inquirydetail"
                              style={{ textDecoration: "none", color: "black" }}
                            >
                              {value}
                            </Link>
                          </StyledTableCell>
                        );
                      })}
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Link to="/mypage/inquiryqna" style={{ textDecoration: "none" }}>
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
            count={Math.ceil(rows.length / rowsPerPage)}
          />
        </Stack>
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

export default MyPageInquiry;
