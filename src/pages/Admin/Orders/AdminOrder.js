import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Grid from "@mui/material/Grid";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Container, Pagination, Paper } from "@mui/material";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#FBD385",
    },
  },
});

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/a/order/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDeleteOrder = async (orderNum) => {
    try {
      await axios.post(`/a/order/orders/${orderNum}`);
      const response = await axios.get("/a/order/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("주문 삭제 실패:", error);
    }
  };

  const handleDeleteButtonClick = (orderNum) => {
    if (window.confirm("주문을 삭제하시겠습니까?")) {
      handleDeleteOrder(orderNum);
      alert("주문 삭제가 완료되었습니다.");
    }
  };

  const handleRoleChange = (orderNum, newState) => {
    if (window.confirm("주문상태를 수정하시겠습니까?")) {
      axios
        .put(`/a/order/updateState/${orderNum}`, { orderState: newState })
        .then((response) => {
          window.alert("주문상태가 수정 되었습니다");
          return axios.get("/a/order/orders", {});
        })
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
          window.alert("수정 실패");
        });
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Paper sx={{ p: 1, mb: 2 }}>
            <Grid style={{ width: 1135 }}>
              <Table
                sx={{
                  mt: 5,
                  border: "1px solid lightgray",
                }}
                aria-label="caption table"
                overflow="hidden"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      주문번호
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      주문일자
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      배송상태
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      상품코드
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      구매수량
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      구매자ID
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      총 결제금액(원)
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      관리
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders
                    .slice(
                      (page - 1) * rowsPerPage,
                      (page - 1) * rowsPerPage + rowsPerPage
                    )
                    .map((order) => {
                      return (
                        <TableRow key={order.orderNum}>
                          <TableCell align="center">{order.orderNum}</TableCell>
                          <TableCell align="center">
                            {dayjs(order.orderDate).format("YY/MM/DD HH:mm")}
                          </TableCell>
                          <TableCell align="center">
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                              <Select
                                sx={{
                                  fontSize: "13px",
                                  width: "100px",
                                  height: "40px",
                                }}
                                value={order.orderState}
                                onChange={(e) =>
                                  handleRoleChange(
                                    order.orderNum,
                                    e.target.value
                                  )
                                }
                                displayEmpty
                              >
                                <MenuItem
                                  sx={{ fontSize: "13px" }}
                                  value="complete"
                                >
                                  배송완료
                                </MenuItem>
                                <MenuItem
                                  sx={{ fontSize: "13px" }}
                                  value="shipping"
                                >
                                  배송중
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell align="center">{order.boardNum}</TableCell>
                          <TableCell align="center">{order.quantity}</TableCell>
                          <TableCell align="center">
                            {order.memberNum}
                          </TableCell>
                          <TableCell align="center">{order.cost}</TableCell>
                          <TableCell align="center">
                            <Button
                              className="prodDelete"
                              onClick={() =>
                                handleDeleteButtonClick(order.orderNum)
                              }
                            >
                              삭제
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
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
          </Paper>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default AdminOrder;
