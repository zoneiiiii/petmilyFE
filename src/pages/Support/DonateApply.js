import React, { useState, useEffect } from "react";
import * as S from "./DonateApply.styled";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Logo from "../../assets/images/LOGO/Logo.png";
import DonateApplyComplete from "./DonateApplyComplete";

const DonateApply = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [donationCompleted, setDonationCompleted] = useState(false); //danateApplyComplete 렌더함수
  const [donationDate, setDonationDate] = useState("");
  const [amount, setAmount] = useState("");
  const [formattedAmount, setFormattedAmount] = useState(""); //원화 표시 상태
  const [paymentMethod, setPaymentMethod] = useState("");
  const [doner, setDoner] = useState("");
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");

  const reset = () => {
    // 결제 실패시 상태 초기화
    setDonationCompleted(false);
    setIsSuccess(false);
    setErrorMsg("");
  };

  useEffect(() => {
    // 기본 결제 수단을 신용카드로 설정
    setPaymentMethod("신용카드");
  }, []);

  function onClickPayment() {
    //아임포트 NHN kpc pg사 api 연동
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    const merchant_uid = `DONATION-C-${Date.now()}`;
    IMP.init("imp83178746");
    const data = {
      //결제 데이터 정의하기
      pg: "kcp",
      pay_method: "card",
      merchant_uid: merchant_uid,
      name: "펫밀리 기부",
      amount: amount,
      buyer_email: email,
      buyer_name: name,
      buyer_tel: tel,
      // buyer_addr: "서울특별시 강남구 신사동",
      // buyer_postcode: "01181",
    };
    IMP.request_pay(data, callback);
  }

  function callback(response) {
    //콜백함수 정의하기
    const { success, merchant_uid, error_msg } = response;

    if (success) {
      // alert("결제 성공");
      setDonationDate(new Date().toLocaleDateString());
      setDonationCompleted(true);
      setIsSuccess(true);
    } else {
      // alert(`결제 실패: ${error_msg}`);
      setErrorMsg(error_msg);
      setDonationCompleted(true);
      setIsSuccess(false);
    }
  }

  function onClickKAKAOPayment() {
    //아임포트 카카오페이 pg사 api 연동
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init("imp83178746");
    const merchant_uid = `DONATION-K-${Date.now()}`;
    const data = {
      //결제 데이터 정의하기
      pg: "kakaopay.TC0ONETIME",
      pay_method: "card",
      merchant_uid: merchant_uid,
      name: "펫밀리 기부",
      amount: amount,
      buyer_email: email,
      buyer_name: name,
      buyer_tel: tel,
      // buyer_addr: "서울특별시 강남구 신사동",
      // buyer_postcode: "01181",
    };
    IMP.request_pay(data, callback);
  }

  function onClickVbankPayment() {
    //아임포트 nice pg사 api 연동
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    const merchant_uid = `DONATION-C-${Date.now()}`;
    IMP.init("imp83178746");
    const data = {
      //결제 데이터 정의하기
      pg: "nice",
      pay_method: "trans",
      merchant_uid: merchant_uid,
      name: "펫밀리 기부",
      amount: amount,
      buyer_email: email,
      buyer_name: name,
      buyer_tel: tel,
      // buyer_addr: "서울특별시 강남구 신사동",
      // buyer_postcode: "01181",
    };
    IMP.request_pay(data, callback);
  }

  const handleAmountChange = (e) => {
    // 입력할때 이벤트 추가
    const value = e.target.value.replace(/\D/g, "");
    const formattedValue = Number(value).toLocaleString("ko-KR"); //기부 금액 부분 원으로 표시
    setAmount(Number(value));
    setFormattedAmount(formattedValue);
  };

  const paymentSelect = (method) => {
    setPaymentMethod(method);
  };

  const handleCancel = () => {
    //input 초기화
    setAmount("");
    setFormattedAmount("");
    setDoner("");
    setPaymentMethod("신용카드");
    setName("");
    setTel("");
    setEmail("");
  };

  const handlePayment = () => {
    if (paymentMethod === "신용카드") {
      onClickPayment();
    } else if (paymentMethod === "카카오페이") {
      onClickKAKAOPayment();
    } else if (paymentMethod === "계좌이체") {
      onClickVbankPayment();
    }
  };

  if (donationCompleted) {
    return (
      <DonateApplyComplete
        doner={doner}
        name={name}
        amount={amount}
        donationDate={donationDate}
        isSuccess={isSuccess}
        errorMsg={errorMsg}
        reset={reset}
      />
    );
  }

  return (
    <S.Container>
      <S.Logo src={Logo} alt="Logo Placeholder" />
      <S.Line />
      <S.Title>기부신청</S.Title>
      <S.Form>
        <S.Field>
          <S.Label>기부명</S.Label>
          <TextField
            variant="outlined"
            size="small"
            value={doner}
            onChange={(e) => setDoner(e.target.value)}
          />
        </S.Field>
        <S.Field>
          <S.Label>기부금액</S.Label>
          <TextField
            variant="outlined"
            size="small"
            value={formattedAmount}
            onChange={handleAmountChange}
            InputProps={{
              endAdornment: <S.InputAdornment>원</S.InputAdornment>,
            }}
          />
        </S.Field>
        <S.Title>기본정보</S.Title>
        <S.Field>
          <S.Label>이름</S.Label>
          <TextField
            variant="outlined"
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </S.Field>
        <S.Field>
          <S.Label>휴대폰 번호</S.Label>
          <TextField
            variant="outlined"
            size="small"
            placeholder="010-0000-0000"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            inputProps={{ maxLength: 13, pattern: "[0-9]*" }}
            InputProps={{
              inputMode: "numeric",
            }}
          />
        </S.Field>
        <S.Field>
          <S.Label>이메일</S.Label>
          <TextField
            variant="outlined"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </S.Field>
        <S.Title>결제정보</S.Title>
        <S.Field>
          <S.Label>결제 수단</S.Label>
          <S.PaymentButtons>
            <Button
              variant={paymentMethod === "신용카드" ? "contained" : "outlined"}
              onClick={() => paymentSelect("신용카드")}
              sx={{
                borderColor: "#FBD385",
                color: paymentMethod === "신용카드" ? "#FFFFFF" : "#FBD385",
                backgroundColor: paymentMethod === "신용카드" ? "#FBD385" : "",
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
              variant={paymentMethod === "계좌이체" ? "contained" : "outlined"}
              onClick={() => paymentSelect("계좌이체")}
              sx={{
                borderColor: "#FBD385",
                color: paymentMethod === "계좌이체" ? "#FFFFFF" : "#FBD385",
                backgroundColor: paymentMethod === "계좌이체" ? "#FBD385" : "",
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
                color: paymentMethod === "카카오페이" ? "#FFFFFF" : "#FBD385",
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
          </S.PaymentButtons>
        </S.Field>
      </S.Form>
      <S.ButtonGroup>
        <Button
          variant="contained"
          size="large"
          style={{ backgroundColor: "#FBD385", fontWeight: "bold" }}
          onClick={handlePayment}
        >
          신청
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={handleCancel}
          style={{
            backgroundColor: "white",
            color: "#FBD385",
            fontWeight: "bold",
          }}
        >
          취소
        </Button>
      </S.ButtonGroup>
    </S.Container>
  );
};

export default DonateApply;
