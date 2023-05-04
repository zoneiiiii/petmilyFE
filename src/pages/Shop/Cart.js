import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import * as React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Button, Checkbox } from "@material-ui/core";
import { useState } from "react";
import { AddCircle, RemoveCircle } from "@material-ui/icons";
import CustomButton from "../Login/CustomButton";
import { SHOP } from "../../constants/PageURL";

const Cart = () => {
  //데이터 초기값 설정
  const [items, setItems] = useState([
    {
      id: 1,
      img: (
        <img
          src="https://source.unsplash.com/random/?programming"
          alt="img"
          style={{ width: 100, height: 100 }}
        />
      ),
      name: "하네스",
      price: 10000,
      quantity: 2,
      checked: false,
    },
    {
      id: 2,
      img: (
        <img
          src="https://source.unsplash.com/random/?programming"
          alt="img"
          style={{ width: 100, height: 100 }}
        />
      ),
      name: "커스텀 그립톡",
      price: 20000,
      quantity: 1,
      checked: false,
    },
    {
      id: 3,
      img: (
        <img
          src="https://source.unsplash.com/random/?programming"
          alt="img"
          style={{ width: 100, height: 100 }}
        />
      ),
      name: "유기농 강아지 사료 3kg",
      price: 30000,
      quantity: 3,
      checked: false,
    },
  ]);
  const [selected, setSelected] = useState([]);
  //수량 조절
  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });
    setItems(updatedItems);
  };
  //전체선택 기능
  const handleToggleAll = () => {
    const allChecked = items.every((item) => item.checked);
    const updatedItems = items.map((item) => ({
      ...item,
      checked: !allChecked,
    }));
    setItems(updatedItems);
  };
  const allChecked = items.every((item) => item.checked);
  const indeterminate = !allChecked && items.some((item) => item.checked);
  //체크박스 기능
  const handleToggle = (itemId) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          checked: !item.checked,
        };
      }
      return item;
    });
    setItems(updatedItems);
  };
  //체크된 상품 삭제(백엔드 하면서 수정 필요)
  const handleDeleteSelected = (e) => {
    e.preventDefault(); // 폼의 기본 동작 방지
    setItems(items.filter((item) => !selected.includes(item.id)));
    setSelected([]);
  };
  //장바구니 총 가격
  const totalPrice = items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  //배송비 설정
  const shippingCost = totalPrice >= 50000 ? 0 : 2500;

  return (
    <>
      <CartStyle>
        <h1>🛒 장바구니</h1>
        <CustomButton
          label="선택삭제"
          value="1:1문의작성"
          onClick={handleDeleteSelected}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={6}></TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} sx={{ fontWeight: "bold" }}>
                <Checkbox
                  edge="start"
                  checked={allChecked}
                  indeterminate={indeterminate}
                  onClick={handleToggleAll}
                  tabIndex={-1}
                />
                전체선택
              </TableCell>

              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                상품명 {/*상품 상세 링크 연결해야함*/}
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                수량
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                상품가격
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                총 상품가격
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6} />
            </TableRow>
            <TableRow></TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <React.Fragment key={item.id}>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      edge="start"
                      checked={item.checked}
                      onClick={() => handleToggle(item.id)}
                      tabIndex={-1}
                    />
                  </TableCell>
                  <TableCell align="center">{item.img}</TableCell>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">
                    {
                      <React.Fragment>
                        <IconButton
                          size="small"
                          sx={{ color: "#FF8282" }}
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                        >
                          <RemoveCircle />
                        </IconButton>
                        {` ${item.quantity} `}
                        <IconButton
                          size="small"
                          sx={{ color: "#FF8282" }}
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                        >
                          <AddCircle />
                        </IconButton>
                      </React.Fragment>
                    }
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "16px" }}>
                    <Typography>{`${item.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{`${(item.price * item.quantity)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`}</Typography>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
        <Table sx={{ mt: 3 }}>
          <TableRow>
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell
              colSpan={2}
              sx={{ height: 100, color: "black", fontSize: "18px" }}
              align="center"
            >
              총 주문금액 :{" "}
              <span>
                {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
              원 + 배송비{" "}
              <span>
                {shippingCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
              원 =
              <span>
                {" "}
                {(totalPrice + shippingCost)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
              원
            </TableCell>
          </TableRow>{" "}
        </Table>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <Link to={SHOP.PRODUCT} style={{ textDecoration: "none" }}>
            <Button className="continue">계속 쇼핑하기</Button>
          </Link>
          <Link to={SHOP.ORDER} style={{ textDecoration: "none" }}>
            <Button className="order">구매하기</Button>
          </Link>
        </div>
      </CartStyle>
    </>
  );
};
const CartStyle = styled.div`
  width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
  h1 {
    text-align: center;
  }
  span {
    font-weight: bold;
  }
  .continue {
    width: 300px;
    color: #fbd385;
    border: 1px solid #fbd385;
    margin: 50px auto;
    margin-right: 20px;
    &:hover {
      background-color: #ffffff;
      color: #ffc149;
    }
  }
  .order {
    width: 300px;
    background-color: #fbd385;
    color: white;
    margin: 50px auto;
    &:hover {
      background-color: #facc73;
    }
    &:focus {
      background-color: #facc73;
    }
  }
`;
export default Cart;
