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
import { CustomTheme } from "../../assets/Theme/CustomTheme";

const Section = styled.section`
  padding: 0px 0 40px 0;
`;

const MainContainer = styled.div`
  width: 1008px;
  max-width: 1150px;
  min-width: 790px;
  margin: 0px auto 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  margin-top: 30px;
`;

const Introduce = styled.p`
  margin-bottom: 30px;
  text-align: center;
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

const CardImage = styled.img`
  width: auto;
  height: 264px;
  object-fit: cover;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  margin: 0.5rem;
`;

const ProductName = styled.p`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
  text-align: center;
`;

const ProductPrice = styled.p`
  font-size: 14px;
  color: #888;
  text-align: center;
`;

const Line = styled.hr`
  border: 1px solid rgba(224, 224, 224, 1);
  width: 95%;
  max-width: 1008px;
`;

const ContainerBox = styled.div`
  margin-bottom: 20px;
`;

const categories = ["사료", "간식", "외출용품", "목욕/미용", "굿즈"];

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
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const MAX_CARD_VIEW = 12;

  const filteredProducts = products.filter(
    (product) => product.productCategory === activeCategory
  );

  useEffect(() => {
    getPageNum(filteredProducts.length);
    setPage(1);
  }, [activeCategory, filteredProducts.length]);

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지네이션 클릭시 화면을 맨 위로 스크롤함
  }, [page]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const getPageNum = (maxLen) => {
    return setMaxPageNum(Math.ceil(maxLen / MAX_CARD_VIEW));
  };

  // const formatCurrency = (number) => {
  //   //3번째 자릿수 마다 ',' 와 마지막에 '원' 붙혀주는 함수
  //   return number.toLocaleString("ko-KR", { currency: "KRW" }) + "원";
  // };

  return (
    <>
      {
        <ThemeProvider theme={CustomTheme}>
          <Section>
            <MainContainer className="result-container">
              <ContainerBox>
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
                <Container sx={{ py: "30px" }} maxWidth="60vw">
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
                                height: "352.5px",
                                display: "flex",
                                flexDirection: "column",
                                border: "1px solid rgb(233, 236, 239)",
                                boxShadow: "1px 1px 4px 0px rgb(233, 236, 239)",
                              }}
                            >
                              <CardImage src={product.imgThumbnail} />
                              <div>
                                <ProductName>{product.productName}</ProductName>
                                <ProductPrice>
                                  {`${product.productCost
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`}
                                </ProductPrice>
                              </div>
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
                  showFirstButton
                  showLastButton
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "50px 0 0 0px",
                  }}
                />
              </ContainerBox>
            </MainContainer>
          </Section>
        </ThemeProvider>
      }
    </>
  );
};

export default Product;
