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
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

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

const orderList = [
  {
    num: 7,
    date: "2023-04-26",
    delivery: "배송중",
    PRcode: "000010",
    PRname: "유기농 강아지 사료",
    count: 2,
    buyerID: "test07",
    payment: "무통장입금",
    paymentCheck: "X",
    paymentAmount: 20000,
  },
  {
    num: 6,
    date: "2023-04-25",
    delivery: "배송중",
    PRcode: "000010",
    PRname: "유기농 강아지 사료",
    count: 1,
    buyerID: "test06",
    payment: "신용카드",
    paymentCheck: "O",
    paymentAmount: 10000,
  },
  {
    num: 5,
    date: "2023-04-25",
    delivery: "배송완료",
    PRcode: "000010",
    PRname: "유기농 강아지 사료",
    count: 2,
    buyerID: "test05",
    payment: "계좌이체",
    paymentCheck: "O",
    paymentAmount: 20000,
  },
  {
    num: 4,
    date: "2023-04-24",
    delivery: "배송완료",
    PRcode: "000010",
    PRname: "유기농 강아지 사료",
    count: 3,
    buyerID: "test04",
    payment: "계좌이체",
    paymentCheck: "O",
    paymentAmount: 30000,
  },
  {
    num: 3,
    date: "2023-04-22",
    delivery: "배송완료",
    PRcode: "000010",
    PRname: "유기농 강아지 사료",
    count: 1,
    buyerID: "test03",
    payment: "계좌이체",
    paymentCheck: "O",
    paymentAmount: 10000,
  },
  {
    num: 2,
    date: "2023-04-20",
    delivery: "배송완료",
    PRcode: "000010",
    PRname: "유기농 강아지 사료",
    count: 1,
    buyerID: "test02",
    payment: "계좌이체",
    paymentCheck: "O",
    paymentAmount: 10000,
  },
  {
    num: 1,
    date: "2023-04-18",
    delivery: "배송완료",
    PRcode: "000010",
    PRname: "유기농 강아지 사료",
    count: 1,
    buyerID: "test01",
    payment: "계좌이체",
    paymentCheck: "O",
    paymentAmount: 10000,
  },
];

const AdminOrder = () => {
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
            <h5>주문 배송 관리</h5>
          </div>
        </MyPageStyle>
        <Grid style={{ width: 1200 }}>
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
                  주문번호
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ minWidth: 20 }}>
                  주문일자
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ minWidth: 10 }}>
                  배송상태
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ minWidth: 10 }}>
                  상품코드
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ minWidth: 10 }}>
                  상품명
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ minWidth: 10 }}>
                  구매수량
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ minWidth: 10 }}>
                  구매자ID
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ minWidth: 10 }}>
                  결제방식
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ minWidth: 10 }}>
                  결제여부
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ minWidth: 10 }}>
                  총 결제금액(원)
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {orderList
                .slice(
                  (page - 1) * rowsPerPage,
                  (page - 1) * rowsPerPage + rowsPerPage
                )
                .map((order) => (
                  <StyledTableRow key={order.num}>
                    <StyledTableCell align="center" sx={{ minWidth: 10 }}>
                      {order.num}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                      {order.date}
                    </StyledTableCell>
                    {order.delivery === "배송중" ? (
                      <StyledTableCell
                        align="center"
                        sx={{
                          minWidth: 10,
                          color: "red",
                        }}
                      >
                        {order.delivery}
                      </StyledTableCell>
                    ) : (
                      <StyledTableCell
                        align="center"
                        sx={{
                          minWidth: 10,
                          color: "blue",
                        }}
                      >
                        {order.delivery}
                      </StyledTableCell>
                    )}

                    <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                      {order.PRcode}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                      {order.PRname}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                      {order.count}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                      {order.buyerID}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                      {order.payment}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                      {order.paymentCheck}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                      {order.paymentAmount}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>

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
              count={Math.ceil(orderList.length / rowsPerPage)}
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

export default AdminOrder;
