import React from "react";
import * as S from "./DonateApplyComplete.styled";
import Button from "@mui/material/Button";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { useNavigate } from "react-router-dom";
import { MAIN } from "../../constants/PageURL";

const DonateApplyComplete = ({ doner, name, amount, donationDate }) => {
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate(MAIN);
  };

  return (
    <S.Container>
      <S.Title>기부 완료</S.Title>
      <S.Line />
      <S.Message>
        <VolunteerActivismIcon
          sx={{ color: "#17C047", width: 70, height: 70 }}
        />
      </S.Message>
      <S.Message>
        <S.Name>{name}</S.Name> 님의 기부가 정상적으로 완료 되었습니다.
      </S.Message>
      <S.Message2>
        {name} 님의 소중한 후원금을 투명하고 정직하게 사용하겠습니다.
      </S.Message2>
      <S.Table>
        <S.Row>
          <S.Label>기부일자 : </S.Label>
          <S.Value>{donationDate}</S.Value>
        </S.Row>
        <S.Row>
          <S.Label>기부이름 : </S.Label>
          <S.Value>{doner}</S.Value>
        </S.Row>
        <S.Row>
          <S.Label>기부자명 : </S.Label>
          <S.Value>{name}</S.Value>
        </S.Row>
        <S.Row>
          <S.Label>기부금액 : </S.Label>
          <S.Value>{Intl.NumberFormat("ko-KR").format(amount)}원</S.Value>
        </S.Row>
      </S.Table>
      <S.Line />
      <S.ButtonWrapper>
        <Button
          variant="contained"
          onClick={handleClickHome}
          size="large"
          style={{ backgroundColor: "#FBD385", fontWeight: "bold" }}
        >
          홈으로
        </Button>
      </S.ButtonWrapper>
    </S.Container>
  );
};

export default DonateApplyComplete;

// import styled from "styled-components";
// import { Table, TableBody, TableCell, TableRow, Button } from "@mui/material";
// import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
// import { Link } from "react-router-dom";
// import * as S from "./DonateApplyComplete.styled";
// import { MAIN, MYPAGE, SHOP, SUPPORT } from "../../constants/PageURL";
// import Logos from "../../assets/images/LOGO/Logo.png";
// const OrderComplete = () => {
//   const paymentState = 1;
//   if (paymentState === 1) {
//     return (
//       <>
//         <OrderStyle>
//           <h1> 기부 완료 </h1>
//           <Table sx={{ mt: 3 }}>
//             <TableBody>
//               <TableRow>
//                 <TableCell />
//               </TableRow>
//               <TableRow>
//                 <TableCell
//                   align="center"
//                   sx={{
//                     height: 300,
//                     fontSize: "23px",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   <VolunteerActivismIcon
//                     sx={{ color: "#17C047", width: 70, height: 70 }}
//                   />
//                   <br />
//                   <br />
//                   기부가 정상적으로 완료되었습니다.
//                   <br />
//                   <br />
//                   소중하게 사용하겠습니다.
//                   <br />
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//           <div style={{ textAlign: "center" }}>
//             <Link to={MAIN} style={{ textDecoration: "none" }}>
//               <Button className="success">홈으로</Button>
//             </Link>
//           </div>
//         </OrderStyle>
//       </>
//     );
//   }
// };
// const OrderStyle = styled.div`
//   width: 1000px;
//   margin: 0 auto;
//   padding-top: 20px;
//   h1 {
//     text-align: center;
//   }
//   .success {
//     width: 200px;
//     background-color: #fbd385;
//     color: white;
//     font-weight: bold;
//     margin-top: 70px;
//     &:hover {
//       background-color: #facc73;
//     }
//     &:focus {
//       background-color: #facc73;
//     }
//   }
// `;

// export default OrderComplete;
