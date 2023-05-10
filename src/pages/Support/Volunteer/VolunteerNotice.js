import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as S from "./VolunteerNotice.styled";
import VolunteerCard from "../../../components/Support/Volunteer/VolunteerCard";
import VolunteerPagination from "../../../components/Support/Volunteer/VolunteerPagination";
import axios from "axios";
import { SUPPORT } from "../../../constants/PageURL";

const VolunteerNotice = () => {
  const [data, setData] = useState([]); // DB 데이터 가져오는 변수
  const [page, setPage] = useState(1); // 현재 페이지 관리하는 상태 변수
  const itemsPerPage = 9; // 한페이지에 보여줄 페이지의 개수
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const cards = data.slice(startIndex, endIndex); // 현재 페이지에 해당하는 카드 데이터 계산
  const pageCount = Math.ceil(data.length / itemsPerPage); // 페이지 수 계산

  useEffect(() => {
    axios
      .get("http://localhost:8080/board/volunteer")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지네이션 클릭시 화면을 맨 위로 스크롤함
  }, [page]);

  const handleChange = (event, value) => {
    //페이지 변경 시 호출, 새 페이지의 번호를 value에 저장함.
    setPage(value);
  };

  return (
    <S.Container>
      <S.Title>봉사 게시판</S.Title>
      <S.CardContainer>
        <S.CardGrid>
          {cards.map(
            (
              card //map함수로 cards에 있는 데이터 전부 보여줌.
            ) => (
              <VolunteerCard {...card} key={card.boardNum} />
            )
          )}
        </S.CardGrid>
      </S.CardContainer>
      <VolunteerPagination
        count={pageCount}
        page={page}
        onChange={handleChange}
      />
      <S.ButtonContainer>
        <Link to={SUPPORT.VOLUNTEER_NOTICE_WRITE}>
          <S.VolunteerButton>글 작성</S.VolunteerButton>
        </Link>
      </S.ButtonContainer>
    </S.Container>
  );
};

export default VolunteerNotice;
