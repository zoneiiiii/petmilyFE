import React, { useState, useEffect } from "react";
import * as S from "./Donate.styled";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import axios from "axios";

const Donate = () => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const [donaions, setDonations] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    axios
      .get("/donate")
      .then((response) => {
        setDonations(response.data);

        const total = response.data.reduce(
          //총 기부금액 계산
          (sum, donation) => sum + donation.donationCost,
          0
        );
        setTotalCost(total);
      })
      .catch((error) => {
        console.error("axios 오류 : ", error);
      });
  }, []);

  const leftDonations = donaions.slice(0, 5); //좌측 기부내역 표시
  const rightDonations = donaions.slice(5, 10); //우측 기부내역 표시

  const formatCurrency = (number) => {
    //3번째 자릿수 마다 ',' 와 마지막에 '원' 붙혀주는 함수
    return number.toLocaleString("ko-KR", { currency: "KRW" }) + "원";
  };

  return (
    <S.Container>
      <S.Banner>
        <S.DonateButton to="/donate/apply">기부하기</S.DonateButton>
      </S.Banner>
      <S.TotalDonation>
        누적 기부금 : {formatCurrency(totalCost)}
      </S.TotalDonation>
      <S.RecentDonations>
        <S.DonationColumn>
          {leftDonations.map((donation, index) => (
            <S.DonationItem key={index}>
              <span>{formatDate(donation.donationDate)}</span>{" "}
              {donation.donationName}님{" "}
              <span>{formatCurrency(donation.donationCost)}</span>
            </S.DonationItem>
          ))}
        </S.DonationColumn>
        <S.DonationColumn>
          {rightDonations.map((donation, index) => (
            <S.DonationItem key={index}>
              <span>{formatDate(donation.donationDate)}</span>{" "}
              {donation.donationName}님{" "}
              <span>{formatCurrency(donation.donationCost)}</span>
            </S.DonationItem>
          ))}
        </S.DonationColumn>
      </S.RecentDonations>
      <S.TransparentDisclosure>
        <S.IconContainer>
          <VolunteerActivismOutlinedIcon sx={{ width: 70, height: 70 }} />
        </S.IconContainer>
        저희 펫밀리는 <br />
        기부금 현황과 사용내역을
        <br />
        투명하게 공개합니다.
      </S.TransparentDisclosure>
    </S.Container>
  );
};

export default Donate;
