import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as S from "./VolunteerReview.styled";
import VolunteerReviewCard from "../../../components/Support/Volunteer/VolunteerReviewCard";
import VolunteerPagination from "../../../components/Support/Volunteer/VolunteerPagination";
import axios from "axios";
import { SUPPORT } from "../../../constants/PageURL";

const VolunteerReview = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const cards = data.slice(startIndex, endIndex);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    axios
      .get("http://localhost:8080/donate/volunteer/review")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("데이터 수신 오류 :", error);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <S.Container>
      <S.Title>봉사 후기 게시판</S.Title>
      <S.CardContainer>
        <S.CardGrid>
          {cards.map((card) => (
            <VolunteerReviewCard {...card} key={card.boardNum} />
          ))}
        </S.CardGrid>
      </S.CardContainer>
      <VolunteerPagination
        count={pageCount}
        page={page}
        onChange={handleChange}
      />
      <S.ButtonContainer>
        <Link to={SUPPORT.VOLUNTEER_REVIEW_WRITE}>
          <S.VolunteerButton>글작성</S.VolunteerButton>
        </Link>
      </S.ButtonContainer>
    </S.Container>
  );
};

export default VolunteerReview;
