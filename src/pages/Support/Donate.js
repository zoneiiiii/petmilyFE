// import React, { useState, useEffect } from "react";
// import * as S from "./Donate.styled";
// import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
// import axios from "axios";

// const Donate = () => {
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}.${month}.${day}`;
//   };

//   const [donaions, setDonations] = useState([]);
//   const [totalCost, setTotalCost] = useState(0);

//   useEffect(() => {
//     axios
//       .get("/donate")
//       .then((response) => {
//         setDonations(response.data);

//         const total = response.data.reduce(
//           //총 기부금액 계산
//           (sum, donation) => sum + donation.donationCost,
//           0
//         );
//         setTotalCost(total);
//       })
//       .catch((error) => {
//         console.error("axios 오류 : ", error);
//       });
//   }, []);

//   const leftDonations = donaions.slice(0, 5); //좌측 기부내역 표시
//   const rightDonations = donaions.slice(5, 10); //우측 기부내역 표시

//   const formatCurrency = (number) => {
//     //3번째 자릿수 마다 ',' 와 마지막에 '원' 붙혀주는 함수
//     return number.toLocaleString("ko-KR", { currency: "KRW" }) + "원";
//   };

//   return (
//     <S.Container>
//       <S.Banner>
//         <S.DonateButton to="/donate/apply">기부하기</S.DonateButton>
//       </S.Banner>
//       <S.TotalDonation>
//         누적 기부금 : {formatCurrency(totalCost)}
//       </S.TotalDonation>
//       <S.RecentDonations>
//         <S.DonationColumn>
//           {leftDonations.map((donation, index) => (
//             <S.DonationItem key={index}>
//               <span>{formatDate(donation.donationDate)}</span>{" "}
//               {donation.donationName}님{" "}
//               <span>{formatCurrency(donation.donationCost)}</span>
//             </S.DonationItem>
//           ))}
//         </S.DonationColumn>
//         <S.DonationColumn>
//           {rightDonations.map((donation, index) => (
//             <S.DonationItem key={index}>
//               <span>{formatDate(donation.donationDate)}</span>{" "}
//               {donation.donationName}님{" "}
//               <span>{formatCurrency(donation.donationCost)}</span>
//             </S.DonationItem>
//           ))}
//         </S.DonationColumn>
//       </S.RecentDonations>
//       <S.TransparentDisclosure>
//         <S.IconContainer>
//           <VolunteerActivismOutlinedIcon sx={{ width: 70, height: 70 }} />
//         </S.IconContainer>
//         저희 펫밀리는 <br />
//         기부금 현황과 사용내역을
//         <br />
//         투명하게 공개합니다.
//       </S.TransparentDisclosure>
//     </S.Container>
//   );
// };

// export default Donate;

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

  const [memberDonaions, setMemberDonations] = useState([]); //회원 기부내역
  const [nonMemberDonaions, setNonMemberDonations] = useState([]); //비회원 기부내역
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    axios
      .get("/donate")
      .then((response) => {
        const memberDonations = response.data.filter(
          (donation) => donation.memberNum !== null
        );
        const nonMemberDonations = response.data.filter(
          (donation) => donation.memberNum === null
        );
        setMemberDonations(memberDonations);
        setNonMemberDonations(nonMemberDonations);

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

  const leftDonations = nonMemberDonaions.slice(0, 10); //좌측 기부내역 표시
  const rightDonations = memberDonaions.slice(0, 10); //우측 기부내역 표시

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
          <S.TableTitle>비회원 기부 내역</S.TableTitle>
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
              {leftDonations.map((donation, index) => (
                <S.TableRow key={index}>
                  <S.TableData>{formatDate(donation.donationDate)}</S.TableData>
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
              {rightDonations.map((donation, index) => (
                <S.TableRow key={index}>
                  <S.TableData>{formatDate(donation.donationDate)}</S.TableData>
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
};

export default Donate;
