import { SHOP } from "../../constants/PageURL";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useState, useCallback } from "react";
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

const Order = () => {
  //필수 항목 입력 상태 확인
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [payError, setPayError] = useState("");

  const onChangeName = useCallback(
    (e) => {
      const nameRegex = /^[가-힣]{2,4}$/;
      setReceiverName(e.target.value);
      if (!nameRegex.test(receiverName)) {
        setNameError("한글 2글자 이상 4글자 이하로 입력해주세요.");
      } else {
        setNameError("");
      }
    },
    [receiverName]
  );
 
  const onChangePhone = useCallback(
    (e) => {
    setReceiverPhone(
    e.target.value
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/, `$1-$2-$3`)
      .replace(/-{1,2}$/g, "")
  )
  setPhoneError("");
    },
    []
  );



    

  const submitCheck = () => {
    if (!receiverName) {
      setNameError("받는 사람의 이름을 입력해주세요.");
    }
    if (!receiverPhone) {
      setPhoneError("전화번호를 입력해주세요.");
    }
    if (!zipcode || !address || !detailAddress) {
      setAddressError("주소를 모두 입력해주세요.");
    } else {
      setAddressError("");
    }
    if (!paymentMethod) {
      setPayError("결제 수단을 선택하세요.");
    } else {
      setPayError("");
    }

    if (
      receiverName &&
      receiverPhone &&
      zipcode &&
      address &&
      detailAddress &&
      paymentMethod
    ) {
      handlePayment();
    }
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
    SetShippingNote(typeof value === "string" ? value.split(",") : value);
  };

  //장바구니 총 가격
  const totalPrice = items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  //배송비 설정
  const shippingCost = totalPrice >= 50000 ? 0 : 2500;
  //결제방식
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderDate, setOrderDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const paymentSelect = (method) => {
    setPaymentMethod(method);
  };

  function onClickPayment() {
    //아임포트 NHN kpc pg사 api 연동
    /* 가맹점 식별하기 */
    const { IMP } = window;
    const merchant_uid = `PAYMENT-C-${Date.now()}`;
    IMP.init("imp15870417");
    const data = {
      //결제 데이터 정의하기
      pg: "kcp",
      pay_method: "card",
      merchant_uid: merchant_uid,
      name: "펫밀리 상품 결제",
      amount: totalPrice,
      buyer_email: member[0].email,
      buyer_name: member[0].name,
      buyer_tel: member[0].phone,
      buyer_addr: address + ", " + detailAddress,
      buyer_postcode: zipcode,
    };
    IMP.request_pay(data, callback);
  }
  const navigate = useNavigate();
  function callback(response) {
    //콜백함수 정의하기
    const { success, merchant_uid, error_msg } = response;

    if (success) {
      //alert("결제 성공");
      navigate(SHOP.ORDER_COMPLETE, { state: { orderState: orderCompleted } });
      setOrderDate(new Date().toLocaleDateString());
      setOrderCompleted(true);
    } else {
      navigate(SHOP.ORDER_COMPLETE, {
        state: { orderState: orderCompleted, error_msg: error_msg },
      });
      //alert(`결제 실패: ${error_msg}`);
    }
  }

  function onClickVbankPayment() {
    //아임포트 nice pg사 api 연동
    /* 가맹점 식별하기 */
    const { IMP } = window;
    const merchant_uid = `PAYMENT-V-${Date.now()}`;
    IMP.init("imp15870417");
    const data = {
      //결제 데이터 정의하기
      pg: "nice",
      pay_method: "trans",
      merchant_uid: merchant_uid,
      name: "펫밀리 상품 결제",
      amount: totalPrice,
      buyer_email: member[0].email,
      buyer_name: member[0].name,
      buyer_tel: member[0].phone,
      buyer_addr: address + ", " + detailAddress,
      buyer_postcode: zipcode,
    };
    IMP.request_pay(data, callback);
  }

  function onClickKAKAOPayment() {
    //아임포트 카카오페이 pg사 api 연동
    /* 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init("imp15870417");
    const merchant_uid = `PAYMENT-K-${Date.now()}`;
    const data = {
      //결제 데이터 정의하기
      pg: "kakaopay.TC0ONETIME",
      pay_method: "kakaopay",
      merchant_uid: merchant_uid,
      name: "펫밀리 상품 결제",
      amount: totalPrice,
      buyer_email: member[0].email,
      buyer_name: member[0].name,
      buyer_tel: member[0].phone,
      buyer_addr: address + ", " + detailAddress,
      buyer_postcode: zipcode,
    };
    IMP.request_pay(data, callback);
  }

  const handlePayment = () => {
    if (paymentMethod === "신용카드") {
      onClickPayment();
    } else if (paymentMethod === "카카오페이") {
      onClickKAKAOPayment();
    } else if (paymentMethod === "계좌이체") {
      onClickVbankPayment();
    }
  };

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
                <React.Fragment key={item.id}>
                  <TableRow>
                    <TableCell align="center" sx={{ width: "200px" }}>
                      {item.img}
                    </TableCell>
                    <TableCell align="center" sx={{ width: "400px" }}>
                      {item.name}
                    </TableCell>
                    <TableCell align="center">수량 : {item.quantity}</TableCell>
                    <TableCell align="center">
                      가격 :
                      {(item.price * item.quantity)
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
              {member.map((info) => (
                <React.Fragment key={info.id}>
                  <TableRow>
                    <TableCell colSpan={4} sx={{ height: 100, fontSize: 16 }}>
                      <p style={{ color: "darkgray", fontStyle: "italic" }}>
                        이름 : {info.name}
                        <br />
                        전화번호 : {info.phone} <br />
                        이메일 : {info.email}
                      </p>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
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
                    onChange={(e) => setZipcode(e.target.value)}
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
                    onChange={(e) => setAddress(e.target.value)}
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
                    onChange={(e) => setDetailAddress(e.target.value)}
                  />
                  <FormHelperText sx={{ color: "red" }}>
                    {addressError}
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
                        return selected.join(", ");
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
            <Button type="submit" className="order" onClick={submitCheck}>
              결제하기
            </Button>
          </div>
        </ThemeProvider>
      </OrderStyle>
    </>
  );
};

const OrderStyle = styled.div`
  width: 70vw;
  margin: 0 auto;
  padding-top: 20px;
  h1 {
    text-align: center;
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
const member = [
  {
    id: 1,
    name: "홍길동",
    phone: "010-1111-1111",
    email: "hong@email.com",
  },
];

const items = [
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
  },
];
export default Order;
