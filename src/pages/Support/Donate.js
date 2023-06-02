import React, { useState, useEffect } from "react";
import * as S from "./Donate.styled";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import axios from "axios";
import LoadingPage from "../../components/Loading/LoadingPage";

const Donate = () => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };
  const [isLoading, setIsLoading] = useState(true);
  const [memberDonaions, setMemberDonations] = useState([]); //회원 기부내역
  const [nonMemberDonaions, setNonMemberDonations] = useState([]); //비회원 기부내역
  const [totalCost, setTotalCost] = useState(0);
  const [memberTotalCost, setMemberTotalCost] = useState(0);
  const [nonMemberTotalCost, setNonMemberTotalCost] = useState(0);

  useEffect(() => {
    Promise.all([
      axios.get("/donate/member", {
        params: {
          page: 0,
          size: 10,
        },
      }),
      axios.get("/donate/non-member", {
        params: {
          page: 0,
          size: 10,
        },
      }),
      axios.get("/donate/total"),
      axios.get("/donate/total/member"),
      axios.get("/donate/total/non-member"),
    ])
      .then(
        ([
          memberRes,
          nonMemberRes,
          totalRes,
          memberTotalRes,
          nonMemberTotalRes,
        ]) => {
          setMemberDonations(memberRes.data.content);
          setNonMemberDonations(nonMemberRes.data.content);
          setTotalCost(totalRes.data);
          setMemberTotalCost(memberTotalRes.data);
          setNonMemberTotalCost(nonMemberTotalRes.data);
          setIsLoading(false);
        }
      )
      .catch((error) => {
        console.error("axios 오류 : ", error);
        setIsLoading(false);
      });
  }, []);

  const formatCurrency = (number) => {
    //3번째 자릿수 마다 ',' 와 마지막에 '원' 붙혀주는 함수
    return number.toLocaleString("ko-KR", { currency: "KRW" }) + "원";
  };

  if (isLoading) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  } else {
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
            <S.TableTitle>비회원 기부 내역</S.TableTitle>
            <div style={{ textAlign: "center" }}>
              비회원 누적 기부금 : <b>{formatCurrency(nonMemberTotalCost)}</b>
            </div>
            <S.Table>
              <thead>
                <S.TableRow>
                  <S.TableHeader>날짜</S.TableHeader>
                  <S.TableHeader>기부명</S.TableHeader>
                  <S.TableHeader>기부자</S.TableHeader>
                  <S.TableHeader>기부 금액</S.TableHeader>
                </S.TableRow>
              </thead>
              <tbody>
                {nonMemberDonaions.map((donation, index) => (
                  <S.TableRow key={index}>
                    <S.TableData>
                      {formatDate(donation.donationDate)}
                    </S.TableData>
                    <S.TableData>{donation.donationDonor}</S.TableData>
                    <S.TableData>{donation.donationName}님</S.TableData>
                    <S.TableData>
                      {formatCurrency(donation.donationCost)}
                    </S.TableData>
                  </S.TableRow>
                ))}
              </tbody>
            </S.Table>
          </S.DonationColumn>
          <S.DonationColumn>
            <S.TableTitle>회원 기부 내역</S.TableTitle>
            <div style={{ textAlign: "center" }}>
              회원 누적 기부금 : <b>{formatCurrency(memberTotalCost)}</b>
            </div>
            <S.Table>
              <thead>
                <S.TableRow>
                  <S.TableHeader>기부 날짜</S.TableHeader>
                  <S.TableHeader>기부명</S.TableHeader>
                  <S.TableHeader>기부자</S.TableHeader>
                  <S.TableHeader>기부 금액</S.TableHeader>
                </S.TableRow>
              </thead>
              <tbody>
                {memberDonaions.map((donation, index) => (
                  <S.TableRow key={index}>
                    <S.TableData>
                      {formatDate(donation.donationDate)}
                    </S.TableData>
                    <S.TableData>{donation.donationDonor}</S.TableData>
                    <S.TableData>{donation.donationName}님</S.TableData>
                    <S.TableData>
                      {formatCurrency(donation.donationCost)}
                    </S.TableData>
                  </S.TableRow>
                ))}
              </tbody>
            </S.Table>
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
  }
};

export default Donate;
