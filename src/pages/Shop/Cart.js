import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { SHOP } from "../../constants/PageURL";
import * as React from "react";
import { useState, useEffect } from "react";
import { AddCircle, RemoveCircle } from "@material-ui/icons";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Typography,
  IconButton,
  Button,
  Checkbox,
  ThemeProvider,
} from "@mui/material";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import axios from "axios";

const Cart = () => {
  //데이터 초기값 설정
  const [items, setItems] = useState([]);
  const [selectedTotalPrice, setSelectedTotalPrice] = useState(0); //선택된 항목의 가격 계산
  const [isClicking, setIsClicking] = useState(false); // 클릭 상태 관리 (수량 증가 감소 버튼 빠르게 연속으로 누르면 가격이 이상해짐)
  useEffect(() => {
    axios
      .get("/cart", {
        withCredentials: true,
      })
      .then((response) => {
        const itemsWithChecked = response.data.map((item) => ({
          ...item,
          checked: true,
        }));
        setItems(itemsWithChecked);
        const selectedItems = itemsWithChecked.filter((item) => item.checked);
        const selectedTotalPrice = selectedItems.reduce(
          (acc, item) => acc + item.productCost * item.quantity,
          0
        );
        setSelectedTotalPrice(selectedTotalPrice);
      })
      .catch((error) => {
        console.error("cart 정보 가져오기 실패", error);
      });
  }, []);

  const handleQuantityPlus = (cartNum, newQuantity) => {
    if (newQuantity < 1 || isClicking) return; // 음수 안나오게 설정 및 중복 클릭 방지
    setIsClicking(true);
    axios
      .put(`/cart/${cartNum}/increase`, null, {
        withCredentials: true,
      })
      .then((response) => {
        const updatedItems = items.map((item) => {
          if (item.cartNum === cartNum) {
            const priceChange =
              item.productCost * (newQuantity - item.quantity);
            setSelectedTotalPrice((prev) => prev + priceChange);
            return {
              ...item,
              quantity: newQuantity,
            };
          }
          return item;
        });
        setItems(updatedItems);
        setIsClicking(false);
      })
      .catch((error) => {
        console.error("수량 증가 실패", error);
        setIsClicking(false);
      });
  };

  const handleQuantityMinus = (cartNum, newQuantity) => {
    if (newQuantity < 1 || isClicking) return;
    setIsClicking(true);
    axios
      .put(`/cart/${cartNum}/decrease`, null, {
        withCredentials: true,
      })
      .then((response) => {
        const updatedItems = items.map((item) => {
          if (item.cartNum === cartNum) {
            const priceChange =
              item.productCost * (item.quantity - newQuantity);
            setSelectedTotalPrice((prev) => prev - priceChange);
            return {
              ...item,
              quantity: newQuantity,
            };
          }
          return item;
        });
        setItems(updatedItems);
        setIsClicking(false);
      })
      .catch((error) => {
        console.error("수량 감소 실패", error);
        setIsClicking(false);
      });
  };
  //전체선택 기능
  const handleToggleAll = () => {
    const allChecked = items.every((item) => item.checked);
    const updatedItems = items.map((item) => ({
      ...item,
      checked: !allChecked,
    }));
    setItems(updatedItems);

    const selectedItems = updatedItems.filter((item) => item.checked);
    const selectedTotalPrice = selectedItems.reduce(
      (acc, item) => acc + item.productCost * item.quantity,
      0
    );
    setSelectedTotalPrice(selectedTotalPrice);
  };
  const allChecked = items.every((item) => item.checked);
  const indeterminate = !allChecked && items.some((item) => item.checked);
  //체크박스 기능
  const handleToggle = (itemId) => {
    const updatedItems = items.map((item) => {
      if (item.cartNum === itemId) {
        const isChecked = !item.checked;
        const priceChange =
          (isChecked ? 1 : -1) * item.productCost * item.quantity;
        setSelectedTotalPrice((prev) => prev + priceChange);
        return {
          ...item,
          checked: isChecked,
        };
      }
      return item;
    });
    setItems(updatedItems);
  };
  //체크된 상품 삭제(백엔드 하면서 수정 필요)
  const handleDeleteSelected = (e) => {
    e.preventDefault(); // 폼의 기본 동작 방지
    const selectedItems = items.filter((item) => item.checked);

    axios
      .delete("/cart", {
        data: selectedItems.map((item) => item.cartNum),
      })
      .then(() => {
        // 성공적으로 삭제하면 항목 목록을 갱신
        const updatedItems = items.filter((item) => !item.checked);
        setItems(updatedItems);

        const deletedItemsTotalPrice = selectedItems.reduce(
          (acc, item) => acc + item.productCost * item.quantity,
          0
        );
        setSelectedTotalPrice((prev) => prev - deletedItemsTotalPrice);
      })
      .catch((error) => {
        console.error("선택한 항목을 삭제하는데 실패", error);
      });
  };
  //장바구니 총 가격
  const totalPrice = items.reduce((acc, item) => {
    return acc + item.productCost * item.quantity;
  }, 0);
  //배송비 설정
  const shippingCost = selectedTotalPrice >= 50000 ? 0 : 2500;

  const navigate = useNavigate();

  // 구매 페이지로 이동하는 함수
  const handlePurchase = () => {
    // 선택된 항목들을 구매 페이지로 전달
    const selectedItems = items.filter((item) => item.checked);
    navigate(SHOP.ORDER, { state: { items: selectedItems } });
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <CartStyle>
        <h1>🛒 장바구니</h1>
        <Button className="prodDelete" onClick={handleDeleteSelected}>
          선택상품 삭제
        </Button>
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
                상품명
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
              <React.Fragment key={item.cartNum}>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      edge="start"
                      checked={item.checked}
                      onClick={() => handleToggle(item.cartNum)}
                      tabIndex={-1}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <img
                      src={item.thumbnailImg}
                      alt="img"
                      style={{ width: 100, height: 100 }}
                    />
                  </TableCell>
                  <TableCell align="center">{item.productName}</TableCell>
                  <TableCell align="center">
                    {
                      <React.Fragment>
                        <IconButton
                          size="small"
                          className="plus_minus"
                          onClick={() =>
                            handleQuantityMinus(item.cartNum, item.quantity - 1)
                          }
                        >
                          <RemoveCircle />
                        </IconButton>
                        {` ${item.quantity} `}
                        <IconButton
                          size="small"
                          className="plus_minus"
                          sx={{ color: "#FF8282" }}
                          onClick={() =>
                            handleQuantityPlus(item.cartNum, item.quantity + 1)
                          }
                        >
                          <AddCircle />
                        </IconButton>
                      </React.Fragment>
                    }
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "16px" }}>
                    <Typography>{`${item.productCost
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{`${(item.productCost * item.quantity)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`}</Typography>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
        <Table sx={{ mt: 3 }}>
          <TableBody>
            <TableRow>
              <TableCell />
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={2}
                sx={{ height: 150, color: "black", fontSize: "18px" }}
                align="center"
              >
                총 주문금액 :
                <span className="tot">
                  {selectedTotalPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
                원 + 배송비
                <span className="tot">
                  {shippingCost
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
                원 =
                <span className="tot">
                  {(selectedTotalPrice + shippingCost)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
                원
                <br />
                <span className="notice">
                  ※ 50,000원 이상 구매 시 무료 배송
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <Link to={SHOP.PRODUCT} style={{ textDecoration: "none" }}>
            <Button className="continue">계속 쇼핑하기</Button>
          </Link>
          <Button variant="contained" color="error" onClick={handlePurchase}>
            구매하기
          </Button>
        </div>
      </CartStyle>
    </ThemeProvider>
  );
};
const CartStyle = styled.div`
  max-width: 1008px;
  margin: 0 auto;
  h1 {
    text-align: center;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .tot {
    font-weight: bold;
  }
  .notice {
    font-size: small;
    color: darkgray;
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
  .prodDelete {
    float: right;
    background-color: #fbd385;
    color: white;
    margin-bottom: -20px;
    &:hover {
      background-color: #facc73;
    }
    &:focus {
      background-color: #facc73;
    }
  }
  .plus_minus {
    color: #ff8282;
  }
`;
export default Cart;
