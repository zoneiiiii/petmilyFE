import React from "react";

function MyPageInfo() {
  const member = {
    num: 1,
    id: "PetLove",
    pw: "*******",
    nickname: "",
    email: "asdf@naver.com",
    name: "이기자",
    gender: "남자",
    birth: "2023-01-01",
    tel: "010-1234-5678",
    addr: "서울특별시 강남구 선릉로 428",
    img: "",
    role: "user",
  };
  return (
    <div>
      <div>ID: {member.id}</div>
      <div>PW: {member.pw}</div>
      <div>이름: {member.name}</div>
      <div>성별: {member.gender}</div>
      <div>생일: {member.birth}</div>
      <div>연락처: {member.tel}</div>
      <div>이메일: {member.email}</div>
      <div>주소: {member.addr}</div>
    </div>
  );
}

export default MyPageInfo;
