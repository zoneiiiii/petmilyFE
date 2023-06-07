import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  Grid,
  Container,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  TablePagination,
  Select,
  MenuItem,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";
import LoadingPage from "../../../components/Loading/LoadingPage";

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleOrderNumClick = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const fetchOrdersAndOrderlists = async () => {
      try {
        setIsLoading(true);
        const ordersResponse = await axios.get(
          "http://localhost:3000/order/pagedOrders",
          { params: { page: page, size: rowsPerPage } }
        );
        const orderlistsResponse = await axios.get(
          "http://localhost:3000/order/allOrderlists"
        );
        const orderCountResponse = await axios.get(
          "http://localhost:3000/order/orders/count"
        );

        const orders = ordersResponse.data.content;
        const orderlists = orderlistsResponse.data;
        setTotalOrders(orderCountResponse.data);
        setIsLoading(false);

        const ordersWithProducts = orders.map((order) => {
          return {
            ...order,
            products: orderlists.filter(
              (orderlist) => orderlist.orderNum === order.orderNum
            ),
          };
        });

        setOrders(ordersWithProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchOrdersAndOrderlists();
  }, [page, rowsPerPage]);

  const handleRoleChange = (orderNum, newState) => {
    if (window.confirm("주문상태를 수정하시겠습니까?")) {
      axios
        .put(`/order/orderState/${orderNum}`, null, {
          params: { orderState: newState },
        })
        .then((response) => {
          window.alert("주문상태가 수정 되었습니다");

          const ordersResponse = axios
            .get("/order/pagedOrders", {
              params: { page: page, size: rowsPerPage },
            })
            .then((response) => response.data.content);

          const orderlistsResponse = axios
            .get("http://localhost:3000/order/allOrderlists")
            .then((response) => response.data);

          Promise.all([ordersResponse, orderlistsResponse])
            .then(([orders, orderlists]) => {
              const ordersWithProducts = orders.map((order) => {
                return {
                  ...order,
                  products: orderlists.filter(
                    (orderlist) => orderlist.orderNum === order.orderNum
                  ),
                };
              });
              setOrders(ordersWithProducts);
            })
            .catch((error) => {
              console.error("There was an error!", error);
              window.alert("데이터 불러오기 실패");
            });
        })
        .catch((error) => {
          console.error("There was an error!", error);
          window.alert("수정 실패");
        });
    }
  };

  const formatCurrency = (number) => {
    return number.toLocaleString("ko-KR", { currency: "KRW" }) + "원";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  if (isLoading) {
    return (
      <div>
        <LoadingPage />
      </div>
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
            총 주문수 : {totalOrders} 개
          </Paper>
          <Paper sx={{ p: 1, mb: 2 }}>
            <Grid style={{ width: 1135 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", fontSize: "12px" }}
                    >
                      주문번호
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", fontSize: "12px" }}
                    >
                      주문일자
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", fontSize: "12px" }}
                    >
                      배송상태
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", fontSize: "12px" }}
                    >
                      구매자ID
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", fontSize: "12px" }}
                    >
                      수령인
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", fontSize: "12px" }}
                    >
                      연락처
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", fontSize: "12px" }}
                    >
                      배송지
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", fontSize: "12px" }}
                    >
                      총 구매 가격
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", fontSize: "12px" }}
                    >
                      구매품목
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.orderNum}>
                      <TableCell align="center" sx={{ fontSize: "12px" }}>
                        {order.orderNum}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "12px" }}>
                        {formatDate(order.orderDate)}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "12px" }}>
                        <Select
                          sx={{
                            fontSize: "12px",
                            width: "100px",
                            height: "40px",
                          }}
                          value={order.orderState}
                          onChange={(e) =>
                            handleRoleChange(order.orderNum, e.target.value)
                          }
                        >
                          <MenuItem
                            sx={{ fontSize: "12px", textAlign: "center" }}
                            value={"배송중"}
                          >
                            <Box
                              sx={{
                                width: "100%",
                                textAlign: "center",
                                fontSize: "12px",
                              }}
                            >
                              배송중
                            </Box>
                          </MenuItem>
                          <MenuItem
                            sx={{ fontSize: "12px", textAlign: "center" }}
                            value={"배송완료"}
                          >
                            <Box
                              sx={{
                                width: "100%",
                                textAlign: "center",
                                fontSize: "12px",
                              }}
                            >
                              배송완료
                            </Box>
                          </MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "12px" }}>
                        {order.memberId}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "12px" }}>
                        {order.recipient}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "12px" }}>
                        {order.recipientTel}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "12px" }}>
                        {order.address} {order.addressDetail}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "12px" }}>
                        {formatCurrency(order.totalCost)}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleOrderNumClick(order)}
                        >
                          상세
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Box sx={{ p: 2, display: "flex", justifyContent: "right" }}>
                <TablePagination
                  component="div"
                  count={totalOrders}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Box>
              {selectedOrder && (
                <Dialog
                  onClose={handleClose}
                  open={open}
                  fullWidth={true}
                  maxWidth={"md"}
                >
                  <DialogTitle>
                    ID : {selectedOrder.memberId} / {selectedOrder.recipient}{" "}
                    님의 주문 상세 정보
                  </DialogTitle>
                  <DialogContent>
                    <Paper>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell
                              align="center"
                              sx={{ fontWeight: "bold" }}
                            >
                              주문 내역 번호
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ fontWeight: "bold" }}
                            >
                              주문 번호
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ fontWeight: "bold" }}
                            >
                              상품 코드
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ fontWeight: "bold" }}
                            >
                              상품명
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ fontWeight: "bold" }}
                            >
                              구매 수량
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ fontWeight: "bold" }}
                            >
                              구매 금액
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selectedOrder.products.map((product) => (
                            <TableRow key={product.orderlistNum}>
                              <TableCell align="center">
                                {product.orderlistNum}
                              </TableCell>
                              <TableCell align="center">
                                {product.orderNum}
                              </TableCell>
                              <TableCell align="center">
                                {product.boardNum}
                              </TableCell>
                              <TableCell align="center">
                                {product.productName}
                              </TableCell>
                              <TableCell align="center">
                                {product.quantity}
                              </TableCell>
                              <TableCell align="center">
                                {formatCurrency(product.cost)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Paper>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleClose}
                    >
                      닫기
                    </Button>
                  </DialogActions>
                </Dialog>
              )}
            </Grid>
          </Paper>
        </Container>
      </ThemeProvider>
    );
  }
};

export default AdminOrder;
