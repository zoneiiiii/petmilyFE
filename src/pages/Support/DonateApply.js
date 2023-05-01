import React, { useState } from 'react';
import * as S from './DonateApply.styled';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Logo from '../../assets/images/LOGO/Logo.png'

const DonateApply = () => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [doner, setDoner] = useState("");
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");



  const handleAmountChange = (e) => { // 입력할때 이벤트 추가
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = Number(value).toLocaleString('ko-KR'); //기부 금액 부분 원으로 표시
    setAmount(formattedValue);
  };

   const paymentSelect = (method) => {
    setPaymentMethod(method);
   };

   const handleCancel = () => { //input 초기화
    setAmount("");
    setDoner("");
    setPaymentMethod("");
    setName("");
    setTel("");
    setEmail("");
  };

  return (
    <S.Container>
      <S.Logo src={Logo} alt="Logo Placeholder" />
      <S.Line />
      <S.Title>기부신청</S.Title>
      <S.Form>
        <S.Field>
          <S.Label>기부명</S.Label>
          <TextField variant="outlined" size="small" value={doner} onChange={(e) => setDoner(e.target.value)}/>
        </S.Field>
        <S.Field>
          <S.Label>기부금액</S.Label>
          <TextField
            variant="outlined"
            size="small"
            value={amount}
            onChange={handleAmountChange}
            InputProps={{
              endAdornment: <S.InputAdornment>원</S.InputAdornment>,
            }}
          />
        </S.Field>
        <S.Title>기본정보</S.Title>
        <S.Field>
          <S.Label>이름</S.Label>
          <TextField variant="outlined" size="small" value={name} onChange={(e) => setName(e.target.value)}/>
        </S.Field>
        <S.Field>
          <S.Label>휴대폰 번호</S.Label>
          <TextField
            variant="outlined"
            size="small"
            placeholder="010-0000-0000"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            inputProps={{ maxLength: 13, pattern: '[0-9]*' }}
            InputProps={{
              inputMode: 'numeric',
            }}
          />
        </S.Field>
        <S.Field>
          <S.Label>이메일</S.Label>
          <TextField variant="outlined" size="small" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </S.Field>
        <S.Title>결제정보</S.Title>
        <S.Field>
          <S.Label>결제 수단</S.Label>
          <S.PaymentButtons>
            <Button variant={paymentMethod === '신용카드' ? 'contained' : 'outlined'} onClick={() => paymentSelect('신용카드')}
            sx={{
              borderColor: '#FBD385',
              color: paymentMethod === '신용카드' ? '#FFFFFF' : '#FBD385',
              backgroundColor: paymentMethod === '신용카드' ? '#FBD385' : '',
              ":hover": { borderColor: "#FBD385", backgroundColor: '#FBD385', color: '#FFFFFF'},
            }}>
              신용카드
            </Button>
            <Button variant={paymentMethod === '계좌이체' ? 'contained' : 'outlined'} onClick={() => paymentSelect('계좌이체')}
            sx={{
              borderColor: '#FBD385',
              color: paymentMethod === '계좌이체' ? '#FFFFFF' : '#FBD385',
              backgroundColor: paymentMethod === '계좌이체' ? '#FBD385' : '',
              ":hover": { borderColor: "#FBD385", backgroundColor: '#FBD385', color: '#FFFFFF'},
            }}>
              계좌이체
            </Button>
            <Button variant={paymentMethod === '카카오페이' ? 'contained' : 'outlined'} size="small" onClick={() => paymentSelect('카카오페이')}
            sx={{
              borderColor: '#FBD385',
              color: paymentMethod === '카카오페이' ? '#FFFFFF' : '#FBD385',
              backgroundColor: paymentMethod === '카카오페이' ? '#FBD385' : '',
              ":hover": { borderColor: "#FBD385", backgroundColor: '#FBD385', color: '#FFFFFF'},
            }}>
              카카오페이
            </Button>
          </S.PaymentButtons>
        </S.Field>
      </S.Form>
      <S.ButtonGroup>
        <Button variant="contained" size="large" style={{ backgroundColor: '#FBD385', fontWeight: 'bold' }}>
          신청
        </Button>
        <Button variant="contained" size="large" onClick={handleCancel} style={{ backgroundColor: 'white', color : '#FBD385', fontWeight: 'bold'}}>
          취소
        </Button>
      </S.ButtonGroup>
    </S.Container>
  );
};

export default DonateApply;
