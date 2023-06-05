import { SHOP } from "../../constants/PageURL";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";
import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { ThemeProvider } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  TextField,
  MenuItem,
  FormControl,
  Select,
  FormHelperText,
} from "@mui/material";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import OrderComplete from "./OrderComplete";
import axios from "axios";

const Order = () => {
  const location = useLocation();
  const items =
    location && location.state && location.state.items
      ? location.state.items
      : [];

  const [member, setMember] = useState([]);

  useEffect(() => {
    axios
      .get("/get-userinfo", {
        withCredentials: true,
      })
      .then((response) => {
        setMember(response.data);
      })
      .catch((error) => {
        console.error("사용자 정보 가져오기 실패", error);
      });
  }, []);
  //필수 항목 입력 상태 확인
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState(false);
  const [payError, setPayError] = useState("");

  const [nameAble, setNameAble] = useState(false);
  const [phoneAble, setPhoneAble] = useState(false);
  const [zipAble, setZipAble] = useState(false);
  const [addrAble, setAddrAble] = useState(false);
  const [detailAble, setDetailAble] = useState(false);

  const reset = () => {
    setOrderCompleted(false);
    setIsSuccess(false);
    setErrorMsg("");
  };

  //수령인 이름
  const onChangeName = (e) => {
    const checkName = e.target.value;
    setReceiverName(checkName);
    if (checkName.length < 2 || checkName.length > 5) {
      setNameError("2글자 이상 5글자 이하로 입력해주세요.");
      setNameAble(false);
    } else {
      setNameError("");
      setNameAble(true);
    }
  };

  //수령인 전화번호
  const onChangePhone = (e) => {
    const input = e.target.value
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/, `$1-$2-$3`)
      .replace(/-{1,2}$/g, "");
    setReceiverPhone(input);
    const regPhone = /^\d{3}-\d{4}-\d{4}$/;
    if (regPhone.test(input)) {
      setPhoneError("");
      setPhoneAble(true);
    } else {
      setPhoneError("전화번호 형식을 확인해주세요.");
      setPhoneAble(false);
    }
  };

  const submitCheck = () => {
    let isValid = true;
    if (!nameAble) {
      setNameError("2글자 이상 5글자 이하로 입력해주세요.");
      isValid = false;
    } else {
      setNameError("");
    }
    if (!phoneAble) {
      setPhoneError("전화번호 형식을 확인해주세요.");
      isValid = false;
    } else {
      setPhoneError("");
    }
    if (!zipAble || !addrAble || !detailAble) {
      setAddressError("주소를 모두 입력해주세요.");
      isValid = false;
    } else {
      setAddressError("");
    }
    if (!paymentMethod) {
      setPayError("결제 수단을 선택하세요.");
      isValid = false;
    } else {
      setPayError("");
    }

    return isValid;
  };

  //우편번호 API
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const open = useDaumPostcodePopup(
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );
  const handleComplete = (data) => {
    const {
      zonecode,
      address: fullAddress,
      addressType,
      roadAddress,
      jibunAddress,
    } = data;
    let formattedAddress = "";
    if (addressType === "R") {
      formattedAddress = roadAddress;
    } else {
      formattedAddress = jibunAddress;
    }

    console.log(fullAddress);
    setAddress(formattedAddress);
    setZipcode(zonecode);
    setAddrAble(true);
    setZipAble(true);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  //배송 요청사항 옵션
  const memos = [
    "",
    "부재 시 경비실에 맡겨주세요.",
    "부재 시 택배함에 넣어주세요.",
    "부재 시 집 앞에 놔주세요.",
    "배송 전 연락 바랍니다.",
    "파손의 위험이 있는 상품입니다. 배송 시 주의해 주세요.",
    "요청 사항 없음",
  ];

  const [shippingNote, SetShippingNote] = useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    // SetShippingNote(typeof value === "string" ? value.split(",") : value);
    SetShippingNote(value);
  };

  //장바구니 총 가격
  const totalPrice = items.reduce((acc, item) => {
    return acc + item.productCost * item.quantity;
  }, 0);
  //배송비 설정
  const shippingCost = totalPrice >= 50000 ? 0 : 2500;

  //결제방식
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderDate, setOrderDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const paymentSelect = (method) => {
    setPaymentMethod(method);
    setPayError("");
  };

  function onClickPayment() {
    //아임포트 NHN kpc pg사 api 연동
    /* 가맹점 식별하기 */
    const { IMP } = window;
    const merchant_uid = `PAYMENT-C-${Date.now()}`;
    IMP.init("imp83178746");
    const data = {
      //결제 데이터 정의하기
      pg: "kcp",
      pay_method: "card",
      merchant_uid: merchant_uid,
      name: "펫밀리 상품 결제",
      amount: totalPrice + shippingCost,
      buyer_email: member.memberEmail,
      buyer_name: member.memberName,
      buyer_tel: member.memberTel,
      buyer_addr: address + ", " + detailAddress,
      buyer_postcode: zipcode,
    };
    IMP.request_pay(data, callback);
  }
  // const navigate = useNavigate();

  function callback(response) {
    //콜백함수 정의하기
    const { success, merchant_uid, imp_uid, error_msg } = response;

    if (success) {
      const currentDate = new Date();
      const isoCurrentDate = new Date(
        currentDate.getTime() + 9 * 60 * 60 * 1000
      ).toISOString();

      const orderlistDtos = items.map((item) => ({
        boardNum: item.boardNum,
        quantity: item.quantity,
        cost: item.productCost * item.quantity,
      }));

      const paymentDto = {
        merchantUid: merchant_uid,
        impUid: imp_uid,
        paymentState: "결제완료",
        amount: totalPrice + shippingCost,
        paymentDate: isoCurrentDate,
      };

      const ordersDto = {
        orderDate: isoCurrentDate,
        orderState: "배송중",
        address: address,
        addressDetail: detailAddress,
        postal: zipcode,
        note: shippingNote,
        recipient: receiverName,
        recipientTel: receiverPhone,
      };

      const cartNums = items.map((item) => item.cartNum);
      const orderRequestDto = {
        ordersDto,
        paymentDto,
        orderlistDtos,
        cartNums,
      };
      axios
        .post("/order/purchase", orderRequestDto, { withCredentials: true })
        .then((response) => {
          const savedOrder = response.data;
          setOrderDate(isoCurrentDate);
          setOrderCompleted(true);
          setIsSuccess(true);
        })
        .catch((error) => {
          console.error(error);
          setErrorMsg(error_msg);
          setOrderCompleted(true);
          setIsSuccess(false);
        });
    } else {
      setErrorMsg(error_msg);
      setOrderCompleted(true);
      setIsSuccess(false);
    }
  }

  function onClickVbankPayment() {
    //아임포트 nice pg사 api 연동
    /* 가맹점 식별하기 */
    const { IMP } = window;
    const merchant_uid = `PAYMENT-V-${Date.now()}`;
    IMP.init("imp83178746");
    const data = {
      //결제 데이터 정의하기
      pg: "nice",
      pay_method: "trans",
      merchant_uid: merchant_uid,
      name: "펫밀리 상품 결제",
      amount: totalPrice + shippingCost,
      buyer_email: member.memberEmail,
      buyer_name: member.memberName,
      buyer_tel: member.memberTel,
      buyer_addr: address + ", " + detailAddress,
      buyer_postcode: zipcode,
    };
    IMP.request_pay(data, callback);
  }

  function onClickKAKAOPayment() {
    //아임포트 카카오페이 pg사 api 연동
    /* 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init("imp83178746");
    const merchant_uid = `PAYMENT-K-${Date.now()}`;
    const data = {
      //결제 데이터 정의하기
      pg: "kakaopay.TC0ONETIME",
      pay_method: "kakaopay",
      merchant_uid: merchant_uid,
      name: "펫밀리 상품 결제",
      amount: totalPrice + shippingCost,
      buyer_email: member.memberEmail,
      buyer_name: member.memberName,
      buyer_tel: member.memberTel,
      buyer_addr: address + ", " + detailAddress,
      buyer_postcode: zipcode,
    };
    IMP.request_pay(data, callback);
  }

  const handlePayment = () => {
    if (submitCheck()) {
      setErrorMsg("");
      if (paymentMethod === "신용카드") {
        onClickPayment();
      } else if (paymentMethod === "카카오페이") {
        onClickKAKAOPayment();
      } else if (paymentMethod === "계좌이체") {
        onClickVbankPayment();
      }
    }
  };

  if (orderCompleted) {
    return (
      <OrderComplete
        orderDate={orderDate}
        isSuccess={isSuccess}
        errorMsg={errorMsg}
        reset={reset}
      />
    );
  }

  return (
    <>
      <OrderStyle>
        <ThemeProvider theme={CustomTheme}>
          <h1>주문/결제</h1>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell colSpan={4}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  colSpan={4}
                  sx={{ fontWeight: "bold", fontSize: 16 }}
                >
                  상품 정보
                </TableCell>
              </TableRow>
              {items.map((item) => (
                <React.Fragment
                  key={
                    item.cartNum
                      ? `cart-${item.cartNum}`
                      : `board-${item.boardNum}`
                  }
                >
                  <TableRow>
                    <TableCell align="center" sx={{ width: "200px" }}>
                      <img
                        src={item.thumbnailImg}
                        alt="img"
                        style={{ width: 100, height: 100 }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ width: "400px" }}>
                      {item.productName}
                    </TableCell>
                    <TableCell align="center">수량 : {item.quantity}</TableCell>
                    <TableCell align="center">
                      가격 :
                      {(item.productCost * item.quantity)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      원
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
              <TableRow>
                <TableCell
                  colSpan={4}
                  sx={{ fontWeight: "bold", fontSize: 16 }}
                >
                  구매자 정보
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4} sx={{ height: 100, fontSize: 16 }}>
                  <p style={{ color: "darkgray", fontStyle: "italic" }}>
                    이름 : {member.memberName}
                    <br />
                    전화번호 : {member.memberTel} <br />
                    이메일 : {member.memberEmail}
                  </p>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  colSpan={3}
                  sx={{ fontWeight: "bold", fontSize: 16 }}
                >
                  배송지 정보
                </TableCell>
                <TableCell align="right">*필수 항목</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: 50 }}>받는 사람*</TableCell>
                <TableCell colSpan={3}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    autoComplete="off"
                    size="small"
                    value={receiverName}
                    onChange={onChangeName}
                  />
                  <FormHelperText sx={{ color: "red" }}>
                    {nameError}
                  </FormHelperText>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: 50 }}>연락처*</TableCell>
                <TableCell colSpan={3}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    autoComplete="off"
                    size="small"
                    value={receiverPhone}
                    onChange={onChangePhone}
                    inputProps={{ maxLength: 13, pattern: "[0-9]*" }}
                    InputProps={{
                      inputMode: "numeric",
                    }}
                  />
                  <FormHelperText sx={{ color: "red" }}>
                    {phoneError}
                  </FormHelperText>
                </TableCell>
              </TableRow>
              <TableRow rowSpan={2}>
                <TableCell sx={{ width: 50 }}>주소*</TableCell>
                <TableCell colSpan={3} sx={{ height: 100 }}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    autoComplete="off"
                    sx={{ mb: 3 }}
                    size="small"
                    value={zipcode}
                    onChange={(e) => {
                      setZipcode(e.target.value);
                    }}
                  />
                  <Button className="address" onClick={handleClick}>
                    우편번호 검색
                  </Button>
                  <br />
                  <TextField
                    className="inputPlace"
                    id="outlined-basic"
                    variant="outlined"
                    autoComplete="off"
                    placeholder="주소"
                    size="small"
                    sx={{ width: "500px" }}
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                  <br />
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="상세주소"
                    autoComplete="off"
                    size="small"
                    sx={{ width: "500px" }}
                    value={detailAddress}
                    onChange={(e) => {
                      setAddressError(false);
                      setDetailAddress(e.target.value);
                      setDetailAble(true);
                    }}
                  />
                  <FormHelperText sx={{ color: "red" }}>
                    {addressError ? "주소를 모두 입력해 주세요" : null}
                  </FormHelperText>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>요청사항</TableCell>
                <TableCell colSpan={3}>
                  <FormControl sx={{ width: "500px" }}>
                    <Select
                      size="small"
                      displayEmpty
                      value={shippingNote}
                      onChange={handleChange}
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return "배송 시 요청사항을 선택해주세요.";
                        }
                        return selected;
                      }}
                    >
                      {memos.map((memo) => (
                        <MenuItem key={memo} value={memo}>
                          {memo}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: 16, height: 80 }}
                >
                  결제수단
                </TableCell>
                <TableCell colSpan={3}>
                  <Button
                    variant={
                      paymentMethod === "신용카드" ? "contained" : "outlined"
                    }
                    onClick={() => paymentSelect("신용카드")}
                    sx={{
                      borderColor: "#FBD385",
                      mr: 2,
                      color:
                        paymentMethod === "신용카드" ? "#FFFFFF" : "#FBD385",
                      backgroundColor:
                        paymentMethod === "신용카드" ? "#FBD385" : "",
                      ":hover": {
                        borderColor: "#FBD385",
                        backgroundColor: "#FBD385",
                        color: "#FFFFFF",
                      },
                    }}
                  >
                    신용카드
                  </Button>
                  <Button
                    variant={
                      paymentMethod === "계좌이체" ? "contained" : "outlined"
                    }
                    onClick={() => paymentSelect("계좌이체")}
                    sx={{
                      borderColor: "#FBD385",
                      mr: 2,
                      color:
                        paymentMethod === "계좌이체" ? "#FFFFFF" : "#FBD385",
                      backgroundColor:
                        paymentMethod === "계좌이체" ? "#FBD385" : "",
                      ":hover": {
                        borderColor: "#FBD385",
                        backgroundColor: "#FBD385",
                        color: "#FFFFFF",
                      },
                    }}
                  >
                    계좌이체
                  </Button>
                  <Button
                    variant={
                      paymentMethod === "카카오페이" ? "contained" : "outlined"
                    }
                    size="small"
                    onClick={() => paymentSelect("카카오페이")}
                    sx={{
                      borderColor: "#FBD385",
                      mr: 2,
                      p: "6px 16px",
                      color:
                        paymentMethod === "카카오페이" ? "#FFFFFF" : "#FBD385",
                      backgroundColor:
                        paymentMethod === "카카오페이" ? "#FBD385" : "",
                      ":hover": {
                        borderColor: "#FBD385",
                        backgroundColor: "#FBD385",
                        color: "#FFFFFF",
                      },
                    }}
                  >
                    카카오페이
                  </Button>
                  <FormHelperText sx={{ color: "red" }}>
                    {payError}
                  </FormHelperText>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  colSpan={4}
                  sx={{ height: 150, color: "black", fontSize: "18px" }}
                  align="center"
                >
                  총 주문금액 :
                  <span>
                    {totalPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                  원 + 배송비
                  <span>
                    {shippingCost
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                  원 =
                  <span>
                    {(totalPrice + shippingCost)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                  원
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div style={{ textAlign: "center" }}>
            <Button type="submit" className="order" onClick={handlePayment}>
              결제하기
            </Button>
          </div>
        </ThemeProvider>
      </OrderStyle>
    </>
  );
};

const OrderStyle = styled.div`
  max-width: 1008px;
  margin: 0 auto;
  h1 {
    text-align: center;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  span {
    font-weight: bold;
  }
  .inputPlace {
    margin-bottom: 25px;
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
  .address {
    background-color: #fbd385;
    color: white;
    margin-left: 10px;
    &:hover {
      background-color: #facc73;
    }
    &:focus {
      background-color: #facc73;
    }
  }
`;

export default Order;
