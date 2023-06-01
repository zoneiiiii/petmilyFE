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
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Checkbox, Button } from "@mui/material";
import { useState } from "react";

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

const AdminOrder = () => {
  const [orders, setOrders] = useState([
    {
      num: 7,
      date: "2023-04-26",
      delivery: "shipping",
      PRcode: "000010",
      PRname: "유기농 강아지 사료",
      count: 2,
      buyerID: "test07",
      payment: "무통장입금",
      paymentCheck: "X",
      paymentAmount: 20000,
      checked: false,
    },
    {
      num: 6,
      date: "2023-04-25",
      delivery: "shipping",
      PRcode: "000010",
      PRname: "유기농 강아지 사료",
      count: 1,
      buyerID: "test06",
      payment: "신용카드",
      paymentCheck: "O",
      paymentAmount: 10000,
      checked: false,
    },
    {
      num: 5,
      date: "2023-04-25",
      delivery: "complete",
      PRcode: "000010",
      PRname: "유기농 강아지 사료",
      count: 2,
      buyerID: "test05",
      payment: "계좌이체",
      paymentCheck: "O",
      paymentAmount: 20000,
      checked: false,
    },
    {
      num: 4,
      date: "2023-04-24",
      delivery: "complete",
      PRcode: "000010",
      PRname: "유기농 강아지 사료",
      count: 3,
      buyerID: "test04",
      payment: "계좌이체",
      paymentCheck: "O",
      paymentAmount: 30000,
      checked: false,
    },
    {
      num: 3,
      date: "2023-04-22",
      delivery: "complete",
      PRcode: "000010",
      PRname: "유기농 강아지 사료",
      count: 1,
      buyerID: "test03",
      payment: "계좌이체",
      paymentCheck: "O",
      paymentAmount: 10000,
      checked: false,
    },
    {
      num: 2,
      date: "2023-04-20",
      delivery: "complete",
      PRcode: "000010",
      PRname: "유기농 강아지 사료",
      count: 1,
      buyerID: "test02",
      payment: "계좌이체",
      paymentCheck: "O",
      paymentAmount: 10000,
      checked: false,
    },
    {
      num: 1,
      date: "2023-04-18",
      delivery: "complete",
      PRcode: "000010",
      PRname: "유기농 강아지 사료",
      count: 1,
      buyerID: "test01",
      payment: "계좌이체",
      paymentCheck: "O",
      paymentAmount: 10000,
      checked: false,
    },
  ]);

  const [selected, setSelected] = useState([]);
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [delivery, setDelivery] = React.useState("");

  const handleChange = (event) => {
    setDelivery(event.target.value);
  };

  //전체선택 기능
  const handleToggleAll = () => {
    const allChecked = orders.every((order) => order.checked);
    const updatedOrders = orders.map((order) => ({
      ...order,
      checked: !allChecked,
    }));
    setOrders(updatedOrders);
  };

  const allChecked = orders.every((order) => order.checked);
  const indeterminate = !allChecked && orders.some((order) => order.checked);
  //체크박스 기능
  const handleToggle = (orderId) => {
    const updatedOrders = orders.map((order) => {
      if (order.num === orderId) {
        return {
          ...order,
          checked: !order.checked,
        };
      }
      return order;
    });
    setOrders(updatedOrders);
  };
  //체크된 상품 삭제(백엔드 하면서 수정 필요)
  const handleDeleteSelected = (e) => {
    e.preventDefault(); // 폼의 기본 동작 방지
    setOrders(orders.filter((order) => !selected.includes(order.id)));
    setSelected([]);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <MyPageStyle>
          <div className="navTitle">
            <h5>주문 배송 관리</h5>
          </div>
          <Button className="prodDelete" onClick={handleDeleteSelected}>
            선택 주문 삭제
          </Button>
        </MyPageStyle>
        <Grid style={{ width: 1300 }}>
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
                <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                  <Checkbox
                    edge="start"
                    checked={allChecked}
                    indeterminate={indeterminate}
                    onClick={handleToggleAll}
                    tabIndex={-1}
                  />
                  전체선택
                </StyledTableCell>
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
              {orders
                .slice(
                  (page - 1) * rowsPerPage,
                  (page - 1) * rowsPerPage + rowsPerPage
                )
                .map((order) => (
                  <StyledTableRow key={order.num}>
                    <StyledTableCell align="center" sx={{ minWidth: 10 }}>
                      <Checkbox
                        edge="start"
                        checked={order.checked}
                        onClick={() => handleToggle(order.num)}
                        tabIndex={-1}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 10 }}>
                      {order.num}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                      {order.date}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                          defaultValue={order.delivery}
                          onChange={handleChange}
                          displayEmpty
                        >
                          <MenuItem value="complete">배송완료</MenuItem>
                          <MenuItem value="shipping">배송중</MenuItem>
                        </Select>
                      </FormControl>
                    </StyledTableCell>
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
              count={Math.ceil(orders.length / rowsPerPage)}
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
    margin: 30px 0 0 150px;
  }
  .prodDelete {
    float: left;
    background-color: #fbd385;
    color: white;
    margin: 20px 0 20px 150px;
    &:hover {
      background-color: #facc73;
    }
    &:focus {
      background-color: #facc73;
    }
    font-weight: bold;
  }
`;

export default AdminOrder;
