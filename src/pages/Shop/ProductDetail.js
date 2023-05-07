import React, { useState } from "react";
import styled from "styled-components";

const ProductDetail = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 600px;
  padding: 20px;
`;

const ProductDetailHeader = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

const ProductDetailImage = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const ProductDetailImageElement = styled.img`
  width: 100%;
  height: auto;
`;

const ProductDetailInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProductDetailName = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 0 10px 0;
`;

const ProductDetailPrice = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0 0 10px 0;
`;

const ProductDetailQuantity = styled.div`
  margin-bottom: 10px;
`;

const ProductDetailQuantityLabel = styled.label`
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const ProductDetailQuantityInput = styled.input`
  border: 1px solid #ccc;
  font-size: 1.2rem;
  padding: 5px 10px;
  width: 80px;
`;

const ProductDetailButtons = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProductDetailButton = styled.button`
  background-color: #fff;
  border: 1px solid #ccc;
  color: #333;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 10px 20px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: #333;
    color: #fff;
  }

  & + & {
    margin-left: 10px;
  }
`;

const ProductDetailWrapper = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  const handleAddToCart = () => {
    // 장바구니에 상품을 추가하는 코드 작성
  };

  const handleBuyNow = () => {
    // 상품을 구매하는 페이지로 이동하는 코드 작성
  };

  return (
    <ProductDetailWrapper>
      <ProductDetail>
        <ProductDetailHeader>
          <ProductDetailImage>
            <ProductDetailImageElement src="http://placehold.it/500x500" />
          </ProductDetailImage>
          <ProductDetailInfo>
            <ProductDetailName>유기농 강아지 사료</ProductDetailName>
            <ProductDetailPrice>10000</ProductDetailPrice>
            <ProductDetailQuantity>
              <ProductDetailQuantityLabel htmlFor="quantity">
                수량
              </ProductDetailQuantityLabel>
              <ProductDetailQuantityInput
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
              />
            </ProductDetailQuantity>
            <ProductDetailButtons>
              <ProductDetailButton onClick={handleBuyNow}>
                구매하기
              </ProductDetailButton>
              <ProductDetailButton onClick={handleAddToCart}>
                장바구니 담기
              </ProductDetailButton>
            </ProductDetailButtons>
          </ProductDetailInfo>
        </ProductDetailHeader>
      </ProductDetail>
    </ProductDetailWrapper>
  );
};

export default ProductDetailPage;
