import * as React from "react";
import styled from "styled-components";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";

const Section = styled.section`
  text-align: center;
`;

const Title = styled.h1``;

const Introduce = styled.p``;

const CategoryList = styled.ul`
  display: flex;
  list-style: none;
  margin: 20px;
  padding: 0;
  justify-content: center;
`;

const CategoryItem = styled.li`
  margin-right: 20px;
  cursor: pointer;
  color: ${({ active }) => (active ? "blue" : "inherit")};
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

const categories = ["사료", "간식", "외출용품", "굿즈"];
const products = [
  { id: 1, category: "사료", name: "유기농 강아지 사료", price: 10000 },
  { id: 2, category: "사료", name: "유기농 강아지 사료", price: 10000 },
  { id: 3, category: "사료", name: "유기농 강아지 사료", price: 10000 },
  { id: 4, category: "사료", name: "유기농 강아지 사료", price: 10000 },
  { id: 5, category: "사료", name: "유기농 강아지 사료", price: 10000 },
  { id: 6, category: "사료", name: "유기농 강아지 사료", price: 10000 },
  { id: 7, category: "사료", name: "유기농 강아지 사료", price: 10000 },
  { id: 8, category: "사료", name: "유기농 강아지 사료", price: 10000 },
  { id: 9, category: "사료", name: "유기농 강아지 사료", price: 10000 },
  { id: 10, category: "사료", name: "유기농 강아지 사료", price: 10000 },
  { id: 11, category: "사료", name: "유기농 강아지 사료", price: 10000 },
  { id: 12, category: "사료", name: "유기농 강아지 사료", price: 10000 },
  { id: 2, category: "간식", name: "캣닢", price: 5000 },
  { id: 3, category: "외출용품", name: "하네스", price: 30000 },
  { id: 4, category: "굿즈", name: "고양이 인형", price: 20000 },
];

const Product = () => {
  const [page, setPage] = React.useState(1);
  const [activeCategory, setActiveCategory] = React.useState(categories[0]);

  const filteredProducts = products.filter(
    (product) => product.category === activeCategory
  );
  const filteredProducts2 = filteredProducts.filter(
    (product) => product.id < page * 10 + 1 && product.id > page * 10 - 10
  );

  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <>
      {
        <Section>
          <Title>Shop</Title>
          <Introduce>
            판매 금액의 일정 부분은 유기동물 자선단체에 기부됩니다.
          </Introduce>
          <hr />
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
          <hr />
          <Container sx={{ py: 8 }} maxWidth="lg">
            <Grid container spacing={2} columns={10}>
              {filteredProducts2
                // .map((product) =>
                //   activeCategory === "전체"
                //     ? true
                //     : product.category === activeCategory
                // )
                .map((product) => (
                  <Grid item key={product.id} xs={10} sm={6} md={2}>
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
                  </Grid>
                ))}
            </Grid>
          </Container>
          <Pagination
            count={5}
            onChange={handleChange}
            showFirstButton
            showLastButton
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          />
        </Section>
      }
    </>
  );
};

export default Product;
