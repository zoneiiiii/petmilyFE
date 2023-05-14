import React, { useState } from "react";
import styled from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { SHOP } from "../../constants/PageURL";

const product = {
  name: "유기농 강아지 사료",
  price: 10000,
};

const ProductDetail = ({ cartItems, setCartItems }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  const handleBuy = () => {};

  const handleCart = () => {};

  const formatCurrency = (number) => {
    //3번째 자릿수 마다 ',' 와 마지막에 '원' 붙혀주는 함수
    return number.toLocaleString("ko-KR", { currency: "KRW" }) + "원";
  };

  return (
    <ThemeProvider theme={theme}>
      <ProductWrapper>
        <ProductContainer>
          <ProductImage src="/images/product.png" />
          <ProductInfo>
            <ProductTitle>{product.name}</ProductTitle>
            <ProductPrice>{formatCurrency(product.price)}</ProductPrice>
            <ProductQuantity>
              <label htmlFor="quantity">구매수량</label>
              <QuantitySelect
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
              >
                {[...Array(100).keys()].map((n) => (
                  <option key={n} value={n + 1}>
                    {n + 1}
                  </option>
                ))}
              </QuantitySelect>
            </ProductQuantity>
            <ButtonsWrapper>
              <Link to={SHOP.ORDER} style={{ textDecoration: "none" }}>
                <BuyButton onClick={handleBuy}>구매하기</BuyButton>
              </Link>
              <Link to={SHOP.CART} style={{ textDecoration: "none" }}>
                <CartButton onClick={handleCart}>장바구니</CartButton>
              </Link>
            </ButtonsWrapper>
          </ProductInfo>
        </ProductContainer>
      </ProductWrapper>
      <Line />
      <ProductDescription>제품 상세 정보</ProductDescription>
      <Line />
      <ProductDetailImage src="/images/productdetail.png" />
    </ThemeProvider>
  );
};

const theme = createTheme({
  palette: {
    type: "mainColor",
    primary: {
      main: "#FBD385",
    },
  },
});

const ProductWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const ProductContainer = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid #ccc;
  width: 1350px;
`;

const ProductImage = styled.img`
  max-width: 50%;
  margin-right: 7rem;
  padding: 10px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ProductPrice = styled.p`
  font-size: 2rem;
  margin-bottom: 20rem;
`;

const ProductQuantity = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
  justify-content: flex-end;
  label {
    margin-right: 1rem;
    font-size: 1.2rem;
  }
`;

const QuantitySelect = styled.select`
  font-size: 1.2rem;
  padding: 0.1rem 0.5rem;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.5rem 6rem;
  font-size: 1.5rem;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  margin-bottom: 1rem;
`;

const CartButton = styled(Button)`
  background-color: #fbd385;
  color: #fff;
`;

const BuyButton = styled(Button)`
  background-color: #fbd385;
  color: #fff;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const Line = styled.hr`
  border: 1px solid rgba(224, 224, 224, 1);
  width: 100%;
  max-width: 1350px;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const ProductDescription = styled.div`
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
`;

const ProductDetailImage = styled.img`
  display: block;
  margin: auto;
`;

export default ProductDetail;
