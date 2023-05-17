import React from "react";
import * as S from "./DonateApplyComplete.styled";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";
import { MAIN } from "../../constants/PageURL";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}년 ${month}월 ${day}일`;
};

const DonateApplyComplete = ({
  donor,
  name,
  amount,
  donationDate,
  isSuccess,
  errorMsg,
  reset,
}) => {
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate(MAIN);
  };

  const handleClickDonateApply = () => {
    reset();
  };

  if (isSuccess) {
    return (
      <>
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
            <S.Name>{name}</S.Name> 님의 소중한 후원금을 투명하고 정직하게
            사용하겠습니다.
          </S.Message2>
          <TableContainer align="center" sx={{ width: "80%" }}>
            <Table sx={{ maxWidth: 300 }}>
              <TableBody>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", backgroundColor: "#FFFFEE" }}
                  >
                    기부일자
                  </TableCell>
                  <TableCell align="center">
                    {formatDate(donationDate)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", backgroundColor: "#FFFFEE" }}
                  >
                    기부이름
                  </TableCell>
                  <TableCell align="center">{donor}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", backgroundColor: "#FFFFEE" }}
                  >
                    기부자명
                  </TableCell>
                  <TableCell align="center">{name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", backgroundColor: "#FFFFEE" }}
                  >
                    기부금액
                  </TableCell>
                  <TableCell align="center">
                    {Intl.NumberFormat("ko-KR").format(amount)}원
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <S.Line />
          <S.ButtonWrapper>
            <Button
              variant="contained"
              onClick={handleClickHome}
              style={{ backgroundColor: "#FBD385", fontWeight: "bold" }}
            >
              홈으로
            </Button>
          </S.ButtonWrapper>
        </S.Container>
      </>
    );
  } else {
    return (
      <>
        <S.Container>
          <S.Title>기부 실패</S.Title>
          <S.Line />
          <S.Message>
            <ErrorOutlineIcon sx={{ color: "red", width: 70, height: 70 }} />
          </S.Message>
          <S.Message>기부 결제 처리를 실패하였습니다.</S.Message>
          <S.Message2>
            기부 결제 처리에 실패하여 기부를 완료하지 못했습니다.
          </S.Message2>
          <br />
          <br />
          <S.Message>
            <S.Name>{errorMsg}</S.Name>{" "}
          </S.Message>

          <S.Line />
          <S.ButtonWrapper>
            <Button
              variant="contained"
              onClick={handleClickDonateApply}
              style={{ backgroundColor: "#FBD385", fontWeight: "bold" }}
            >
              돌아가기
            </Button>
          </S.ButtonWrapper>
        </S.Container>
        ;
      </>
    );
  }
};

export default DonateApplyComplete;
