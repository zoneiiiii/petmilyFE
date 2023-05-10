import React from "react";
import * as S from "./VolunteerCard.styled";
import { Link } from "react-router-dom";
import { SUPPORT } from "../../../constants/PageURL";

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
}

const VolunteerReviewCard = ({
  boardNum,
  imgThumbnail,
  memberNum,
  reviewSubject,
  reviewDate,
  reviewCount,
}) => {
  return (
    <S.Container>
      <Link
        to={SUPPORT.VOLUNTEER_REVIEW_DETAIL(boardNum)}
        style={{ textDecoration: "none", color: "inherit", width: "100%" }}
      >
        <S.Thumbnail src={imgThumbnail} alt="thumbnail" />
        <S.User>{reviewSubject}</S.User>
        <S.Title>아이디: {memberNum}</S.Title>
        <S.Date>{formatDate(reviewDate)}</S.Date>
        <S.CountWrapper>
          <S.Count>조회수 : {reviewCount} </S.Count>
        </S.CountWrapper>
      </Link>
    </S.Container>
  );
};

export default VolunteerReviewCard;
