import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  ThemeProvider,
} from "@mui/material";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import LoadingPage from "../../../components/Loading/LoadingPage";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ADMIN, SHOP } from "../../../constants/PageURL";

const AdminProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedBoardNum, setSelectedBoardNum] = useState(null);

  useEffect(() => {
    getData(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const getData = (page) => {
    let queryText = "/shop/product/lists";
    if (page) {
      queryText += "?page=" + page;
      if (rowsPerPage) queryText += "&limit=" + rowsPerPage;
    }
    console.log("queryText:", queryText);
    axios
      .get(queryText)
      .then((response) => {
        console.log(response);
        setProducts(response.data.content);
        setPage(parseInt(response.data.number));
        setTotalElements(parseInt(response.data.totalElements));
        console.log(totalElements);
      })
      .catch((error) => {
        console.error("axios 오류 : ", error);
      });
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleDelete = (boardNum) => {
  //   //삭제 axios
  //   //if (window.confirm("정말 삭제하시겠습니까?")) {
  //   try {
  //     axios.delete(`/shop/product/${boardNum}`);
  //     console.log(boardNum);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  //   // }
  // };

  // const handleDelete = async () => {
  //   // 삭제
  //   const result = window.confirm("정말 삭제하시겠습니까?");
  //   if (result) {
  //     try {
  //       await axios.delete(
  //         `http://localhost:8080/shop/product/delete/${}`
  //       );
  //       alert("상품이 삭제되었습니다.");
  //       navigate(ADMIN.PRODUCT);
  //     } catch (error) {
  //       console.error("Error deleting post: ", error);
  //     }
  //   }
  // };

  if (products.length === 0) {
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
                    상품 내역이 없습니다.
                    <br />
                    <Link
                      to={ADMIN.PRODUCT_WRITE}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mb: 3, width: "100px" }}
                      >
                        상품 등록
                      </Button>
                    </Link>
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
            총 상품 수 : {totalElements} 개
          </Paper>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    상품번호
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", width: "450px" }}
                  >
                    상품명
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    상품재고
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    상품단가
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    카테고리
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    관리
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((item) => (
                  <TableRow key={item.boardNum}>
                    <TableCell align="center">{item.boardNum}</TableCell>
                    <TableCell align="center">
                      <Link
                        to={SHOP.PRODUCT_DETAIL(item.boardNum)}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {item.productName}
                      </Link>
                    </TableCell>

                    <TableCell align="center">{item.productAmount}</TableCell>
                    <TableCell align="center">{`${item.productCost
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`}</TableCell>
                    <TableCell align="center">{item.productCategory}</TableCell>
                    <TableCell align="center">
                      <ButtonStyle>
                        <Link
                          to={ADMIN.PRODUCT_MODIFY(item.boardNum)}
                          style={{ textDecoration: "none" }}
                          state={{ boardNum: item.boardNum }}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{
                              width: "50px",
                              height: "30px",
                              mt: "10px",
                              mr: "10px",
                            }}
                          >
                            수정
                          </Button>
                        </Link>
                        {/* <Button
                          variant="contained"
                          color="error"
                          sx={{ width: "50px", height: "30px", mt: "10px" }}
                          // onClick={handleDelete(item.boardNum)}
                        >
                          삭제
                        </Button> */}
                      </ButtonStyle>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box sx={{ p: 2, display: "flex", justifyContent: "right" }}>
              <TablePagination
                component="div"
                count={totalElements}
                page={page}
                onPageChange={handleChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
            <div style={{ textAlign: "center" }}>
              <Link to={ADMIN.PRODUCT_WRITE} style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="warning"
                  sx={{ mb: 3, width: "200px" }}
                >
                  상품 등록
                </Button>
              </Link>
            </div>
          </Paper>
        </Container>
      </ThemeProvider>
    );
  }
};
const ButtonStyle = styled.div`
  margin-top: 5px;
  text-align: center;
  }
`;
export default AdminProduct;
