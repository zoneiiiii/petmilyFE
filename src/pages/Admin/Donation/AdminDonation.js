import React, { useState, useEffect } from "react";
import axios from "axios";
import * as S from "./AdminDonation.styled";
import LoadingPage from "../../../components/Loading/LoadingPage";
import VolunteerPagination from "../../../components/Support/Volunteer/VolunteerPagination";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const defaultTheme = createTheme();
const AdminDonation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [memberDonaions, setMemberDonations] = useState({
    content: [],
    totalPages: 0,
  }); //회원 기부내역
  const [nonMemberDonaions, setNonMemberDonations] = useState({
    content: [],
    totalPages: 0,
  }); //비회원 기부내역
  const [totalCost, setTotalCost] = useState(0);
  const [memberTotalCost, setMemberTotalCost] = useState(0);
  const [nonMemberTotalCost, setNonMemberTotalCost] = useState(0);
  const [memberPage, setMemberPage] = useState(0);
  const [nonMemberPage, setNonMemberPage] = useState(0);
  const [size, setSize] = useState(10);

  const handleMemberChange = (event, value) => {
    setMemberPage(value - 1);
  };

  const handleNonMemberChange = (event, value) => {
    setNonMemberPage(value - 1);
  };

  useEffect(() => {
    Promise.all([
      axios.get("/donate/member", {
        params: {
          page: memberPage,
          size: size,
        },
      }),
      axios.get("/donate/non-member", {
        params: {
          page: nonMemberPage,
          size: size,
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
          setMemberDonations({
            content: memberRes.data.content,
            totalPages: memberRes.data.totalPages,
          });
          setNonMemberDonations({
            content: nonMemberRes.data.content,
            totalPages: nonMemberRes.data.totalPages,
          });
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
  }, [memberPage, nonMemberPage, size]);

  const formatCurrency = (number) => {
    return number.toLocaleString("ko-KR", { currency: "KRW" }) + "원";
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  if (isLoading) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  } else {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 1, mb: 2 }}>
          <S.TotalDonation>
            누적 기부금 : {formatCurrency(totalCost)}
          </S.TotalDonation>
        </Paper>
        <S.RecentDonations>
          <Paper
            sx={{
              width: "100%",
              mb: 2,
            }}
          >
            <S.DonationColumn>
              <S.TableTitle>비회원 기부 내역</S.TableTitle>
              <div>
                비회원 누적 기부금 : <b>{formatCurrency(nonMemberTotalCost)}</b>
              </div>
              <S.Table>
                <thead>
                  <S.TableRow>
                    <S.TableHeader>기부날짜</S.TableHeader>
                    <S.TableHeader>기부명</S.TableHeader>
                    <S.TableHeader>기부자</S.TableHeader>
                    <S.TableHeader>기부자 전화번호</S.TableHeader>
                    <S.TableHeader>기부자 이메일</S.TableHeader>
                    <S.TableHeader>기부 금액</S.TableHeader>
                  </S.TableRow>
                </thead>
                <tbody>
                  {nonMemberDonaions.content.map((donation, index) => (
                    <S.TableRow key={index}>
                      <S.TableData>
                        {formatDate(donation.donationDate)}
                      </S.TableData>
                      <S.TableData>{donation.donationDonor}</S.TableData>
                      <S.TableData>{donation.donationName}님</S.TableData>
                      <S.TableData>{donation.donationTel}</S.TableData>
                      <S.TableData>{donation.donationEmail}</S.TableData>
                      <S.TableData>
                        {formatCurrency(donation.donationCost)}
                      </S.TableData>
                    </S.TableRow>
                  ))}
                </tbody>
              </S.Table>
              <VolunteerPagination
                count={nonMemberDonaions.totalPages}
                page={nonMemberPage + 1}
                onChange={handleNonMemberChange}
              />
            </S.DonationColumn>
          </Paper>
        </S.RecentDonations>

        <S.RecentDonations>
          <Paper
            sx={{
              width: "100%",
            }}
          >
            <S.DonationColumn>
              <S.TableTitle>회원 기부 내역</S.TableTitle>
              <div>
                회원 누적 기부금 : <b>{formatCurrency(memberTotalCost)}</b>
              </div>
              <S.Table>
                <thead>
                  <S.TableRow>
                    <S.TableHeader>기부날짜</S.TableHeader>
                    <S.TableHeader>기부명</S.TableHeader>
                    <S.TableHeader>기부자</S.TableHeader>
                    <S.TableHeader>기부자 전화번호</S.TableHeader>
                    <S.TableHeader>기부자 이메일</S.TableHeader>
                    <S.TableHeader>기부 금액</S.TableHeader>
                  </S.TableRow>
                </thead>
                <tbody>
                  {memberDonaions.content.map((donation, index) => (
                    <S.TableRow key={index}>
                      <S.TableData>
                        {formatDate(donation.donationDate)}
                      </S.TableData>
                      <S.TableData>{donation.donationDonor}</S.TableData>
                      <S.TableData>{donation.donationName}님</S.TableData>
                      <S.TableData>{donation.donationTel}</S.TableData>
                      <S.TableData>{donation.donationEmail}</S.TableData>
                      <S.TableData>
                        {formatCurrency(donation.donationCost)}
                      </S.TableData>
                    </S.TableRow>
                  ))}
                </tbody>
              </S.Table>
              <VolunteerPagination
                count={memberDonaions.totalPages}
                page={memberPage + 1}
                onChange={handleMemberChange}
              />
            </S.DonationColumn>
          </Paper>
        </S.RecentDonations>
      </Container>
    );
  }
};

export default AdminDonation;
