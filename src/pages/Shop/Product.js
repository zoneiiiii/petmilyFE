import styled from "styled-components";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

const Section = styled.section`
  text-align: center;
`;

const Title = styled.h1`
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
  width: 100%;
  height: auto;
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
  max-width: 1300px;
`;

const categories = ["사료", "간식", "외출용품", "목욕/미용", "굿즈"];

const products = [
  { id: 1, category: "사료", name: "유기농 강아지 사료", price: 10000 },
  { id: 1, category: "사료", name: "유기농 강아지 사료", price: 10000 },
  { id: 1, category: "사료", name: "유기농 강아지 사료", price: 10000 },
  { id: 1, category: "사료", name: "유기농 강아지 사료", price: 10000 },
  { id: 1, category: "사료", name: "유기농 강아지 사료", price: 10000 },
  { id: 1, category: "사료", name: "유기농 강아지 사료", price: 10000 },
  { id: 1, category: "사료", name: "유기농 강아지 사료", price: 10000 },
  { id: 1, category: "사료", name: "유기농 강아지 사료", price: 10000 },
  { id: 3, category: "사료", name: "유기농 강아지 사료", price: 10000 },
  { id: 4, category: "사료", name: "유기농 강아지 사료", price: 10000 },
  { id: 5, category: "사료", name: "유기농 강아지 사료", price: 10000 },
  { id: 6, category: "사료", name: "유기농 강아지 사료", price: 10000 },
  { id: 7, category: "사료", name: "유기농 강아지 사료", price: 10000 },
  { id: 8, category: "사료", name: "유기농 강아지 사료", price: 10000 },
  { id: 9, category: "사료", name: "유기농 강아지 사료", price: 10000 },
  { id: 10, category: "사료", name: "유기농 강아지 사료", price: 10000 },
  { id: 11, category: "사료", name: "유기농 강아지 사료", price: 10000 },
  { id: 2, category: "간식", name: "캣닢", price: 5000 },
  { id: 3, category: "외출용품", name: "하네스", price: 30000 },
  { id: 3, category: "외출용품", name: "하네스", price: 30000 },
  { id: 4, category: "굿즈", name: "고양이 인형", price: 20000 },
  { id: 4, category: "굿즈", name: "고양이 인형", price: 20000 },
  { id: 4, category: "굿즈", name: "고양이 인형", price: 20000 },
  { id: 4, category: "굿즈", name: "고양이 인형", price: 20000 },
  { id: 4, category: "굿즈", name: "고양이 인형", price: 20000 },
  { id: 4, category: "굿즈", name: "고양이 인형", price: 20000 },
  { id: 4, category: "굿즈", name: "고양이 인형", price: 20000 },
  { id: 4, category: "굿즈", name: "고양이 인형", price: 20000 },
  { id: 4, category: "굿즈", name: "고양이 인형", price: 20000 },
  { id: 4, category: "굿즈", name: "고양이 인형", price: 20000 },
  { id: 4, category: "굿즈", name: "고양이 인형", price: 20000 },
];

const theme = createTheme({
  palette: {
    type: "mainColor",
    primary: {
      main: "#FBD385",
    },
  },
});

const Product = () => {
  const MAX_CARD_VIEW = 10;

  const [maxPageNum, setMaxPageNum] = useState(1);
  const [page, setPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filteredProducts = products.filter(
    (product) => product.category === activeCategory
  );

  const handleChange = (event, value) => {
    setPage(value);
  };

  const getPageNum = () => {
    const maxLen = filteredProducts.length;
    return setMaxPageNum(Math.ceil(maxLen / MAX_CARD_VIEW));
  };

  useEffect(() => {
    getPageNum();
    setPage(1);
  }, [activeCategory]);

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
              {categories.map((category) => (
                <CategoryItem
                  key={category}
                  active={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </CategoryItem>
              ))}
            </CategoryList>
            <Line />
            <Container sx={{ py: 8 }} maxWidth="lg">
              <Grid container spacing={2} columns={10}>
                {filteredProducts.map((product, idx) => {
                  if (
                    page * MAX_CARD_VIEW <= idx ||
                    (page - 1) * MAX_CARD_VIEW > idx
                  ) {
                    return <></>;
                  }
                  return (
                    <Grid item key={idx} xs={10} sm={6} md={2}>
                      <Link to="/productdetail">
                        <Card
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <ProductImage src="http://placehold.it/500x500" />
                          <ProductName>{product.name}</ProductName>
                          <ProductPrice>{product.price} 원</ProductPrice>
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
