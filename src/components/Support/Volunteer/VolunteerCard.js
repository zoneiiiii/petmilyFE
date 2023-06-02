import React from "react";
import * as S from "./VolunteerCard.styled";
import { Link } from "react-router-dom";
import { SUPPORT } from "../../../constants/PageURL";
import { Card } from "@mui/material";
import styled from "styled-components";
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${year}/${month}/${day}`;
}

const VolunteerCard = ({
  boardNum,
  imgThumbnail,
  shelterName,
  volunteerSubject,
  volunteerDate,
  volunteerCount,
  volunteerStatus,
}) => {
  return (
    <>
      {volunteerStatus ? (
        // <S.Container>
        <Link
          to={SUPPORT.VOLUNTEER_NOTICE_DETAIL(boardNum)}
          style={{ textDecoration: "none", color: "inherit", width: "100%" }}
        >
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              border: "1px solid rgb(233, 236, 239)",
              boxShadow: "1px 1px 4px 0px rgb(233, 236, 239)",
            }}
          >
            <S.CardImage src={imgThumbnail} alt="thumbnail" />
            <div>
              <S.CardTitle>{volunteerSubject}</S.CardTitle>
              <S.CardWritter>{shelterName}</S.CardWritter>
              <S.CardDate>{formatDate(volunteerDate)}</S.CardDate>
              <S.CountWrapper>
                <S.CardCount>조회수 : {volunteerCount} </S.CardCount>
              </S.CountWrapper>
            </div>
          </Card>
        </Link>
      ) : (
        // </S.Container>

        <Link
          to={SUPPORT.VOLUNTEER_NOTICE_DETAIL(boardNum)}
          style={{ textDecoration: "none", color: "inherit", width: "100%" }}
        >
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              border: "1px solid rgb(233, 236, 239)",
              boxShadow: "1px 1px 4px 0px rgb(233, 236, 239)",
              backgroundColor: "#d3d3d3",
              position: "relative",
            }}
          >
            <S.ClosedLabel>모집마감</S.ClosedLabel>
            <S.CardImage src={imgThumbnail} alt="thumbnail" />
            <div>
              <S.CardTitle>{volunteerSubject}</S.CardTitle>
              <S.CardWritter>{shelterName}</S.CardWritter>
              <S.CardDate>{formatDate(volunteerDate)}</S.CardDate>
              <S.CountWrapper>
                <S.CardCount>조회수 : {volunteerCount} </S.CardCount>
              </S.CountWrapper>
            </div>
          </Card>
        </Link>
      )}
    </>
  );
};

export default VolunteerCard;
