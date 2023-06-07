import styled from "styled-components";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { SHOP } from "../../constants/PageURL";
import axios from "axios";

const Section = styled.section`
  text-align: center;
`;

const Title = styled.h1`
  margin-top: 30px;
  margin-bottom: 20px;
`;

const Introduce = styled.p`
  margin-bottom: 30px;
`;

const CategoryList = styled.ul`
  display: flex;
  list-style: none;
  margin: 20px;
  padding: 0;
  justify-content: center;
`;

const CategoryItem = styled.li`
  margin: 0 3% 0 3%;
  cursor: pointer;
  color: ${({ active }) => (active ? "white" : "inherit")};
  background-color: ${({ active }) => (active ? "#FBD385" : "inherit")};
  padding: ${({ active }) => (active ? "10px" : "10px")};
  border-radius: ${({ active }) => (active ? "15px" : "15px")};
  font-weight: bold;
`;

const ProductImage = styled.img`
  width: auto;
  height: 264px;
  margin-bottom: 10px;
`;

const ProductName = styled.p`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
`;

const ProductPrice = styled.p`
  font-size: 14px;
  color: #888;
`;

const Line = styled.hr`
  border: 1px solid rgba(224, 224, 224, 1);
  width: 95%;
  max-width: 1008px;
`;

const categories = ["사료", "간식", "외출용품", "목욕/미용", "굿즈"];

const theme = createTheme({
  palette: {
    type: "mainColor",
    primary: {
      main: "#FBD385",
    },
  },
});

const Product = () => {
  const [maxPageNum, setMaxPageNum] = useState(1);
  const [page, setPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/shop/product")
      .then((response) => {
        setProducts(response.data);
        getPageNum(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const MAX_CARD_VIEW = 12;

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지네이션 클릭시 화면을 맨 위로 스크롤함
  }, [page]);

  const filteredProducts = products.filter(
    (product) => product.productCategory === activeCategory
  );

  const handleChange = (event, value) => {
    setPage(value);
  };

  const getPageNum = (maxLen) => {
    return setMaxPageNum(Math.ceil(maxLen / MAX_CARD_VIEW));
  };

  useEffect(() => {
    getPageNum(filteredProducts.length);
    setPage(1);
  }, [activeCategory]);

  // const formatCurrency = (number) => {
  //   //3번째 자릿수 마다 ',' 와 마지막에 '원' 붙혀주는 함수
  //   return number.toLocaleString("ko-KR", { currency: "KRW" }) + "원";
  // };

  return (
    <>
      {
        <ThemeProvider theme={theme}>
          <Section>
            <Title>Shop</Title>
            <Introduce>
              판매 금액의 일정 부분은 유기동물 자선단체에 기부됩니다.
            </Introduce>
            <Line />
            <CategoryList>
              {categories.map((category, idx) => (
                <CategoryItem
                  key={idx}
                  active={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </CategoryItem>
              ))}
            </CategoryList>
            <Line />
            <Container sx={{ py: 8 }} maxWidth="lg">
              <Grid container spacing={4} columns={8}>
                {filteredProducts.map((product, idx) => {
                  if (
                    page * MAX_CARD_VIEW <= idx ||
                    (page - 1) * MAX_CARD_VIEW > idx
                  ) {
                    return <span key={idx}></span>;
                  }
                  return (
                    <Grid item key={idx} xs={10} sm={6} md={2}>
                      <Link
                        to={SHOP.PRODUCT_DETAIL(product.boardNum)}
                        style={{ textDecoration: "none" }}
                      >
                        <Card
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <ProductImage src={product.imgThumbnail} />
                          <ProductName>{product.productName}</ProductName>
                          {/* <ProductPrice>
                            {formatCurrency(product.productCost)}
                          </ProductPrice> */}
                          <ProductPrice>
                            {`${product.productCost
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`}
                          </ProductPrice>
                        </Card>
                      </Link>
                    </Grid>
                  );
                })}
              </Grid>
            </Container>
            <Pagination
              color="primary"
              page={page}
              count={maxPageNum}
              onChange={handleChange}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            />
          </Section>
        </ThemeProvider>
      }
    </>
  );
};

export default Product;
