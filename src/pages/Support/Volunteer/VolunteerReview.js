import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import * as S from "./VolunteerReview.styled";
import VolunteerReviewCard from "../../../components/Support/Volunteer/VolunteerReviewCard";
import VolunteerPagination from "../../../components/Support/Volunteer/VolunteerPagination";
import axios from "axios";
import { SUPPORT } from "../../../constants/PageURL";
import { ThemeProvider } from "@mui/material";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";
import { AuthContext } from "../../../contexts/AuthContexts";
import { useNavigate, useLocation } from "react-router-dom";
import NotFound from "../../NotFound/NotFound";

const VolunteerReview = () => {
  const { loggedIn } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0); // 페이지 수 계산
  const [validPage, setValidPage] = useState(true); //존재하는 페이지인지 확인

  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    let urlPage = Number(params.get("page"));

    if (urlPage < 1 || isNaN(urlPage)) {
      urlPage = 1;
      params.set("page", urlPage);
      navigate({ ...location, search: params.toString() }, { replace: true });
      return;
    }

    const requestParams = new URLSearchParams({ page: urlPage - 1 });

    axios
      .get(`http://localhost:8080/donate/volunteer/review?${requestParams}`)
      .then((response) => {
        const totalPages = response.data.totalPages;
        if (totalPages !== 0 && urlPage > totalPages) {
          setValidPage(false);
          return;
        }

        setData(response.data.content);
        setPageCount(totalPages);
        setPage(urlPage);
        setValidPage(true);
      })
      .catch((error) => {
        console.error("데이터 수신 오류 :", error);
      });

    window.scrollTo(0, 0);
  }, [location, navigate, location.search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (!params.get("page")) {
      params.set("page", "1");

      navigate(
        {
          ...location,
          search: params.toString(),
        },
        { replace: true }
      );
    }
  }, [location, navigate]);

  const handleChange = (event, value) => {
    const params = new URLSearchParams(location.search);
    params.set("page", value);

    navigate(
      {
        ...location,
        search: params.toString(),
      },
      { replace: true }
    );
  };

  if (!validPage) {
    return <NotFound />;
  }

  return (
    <S.Container>
      <S.Title>봉사 후기 게시판</S.Title>
      <S.CardContainer>
        {data.length === 0 ? (
          <S.NoDataContainer>게시글이 없습니다.</S.NoDataContainer>
        ) : (
          <S.CardGrid>
            {data.map((card) => (
              <VolunteerReviewCard {...card} key={card.boardNum} />
            ))}
          </S.CardGrid>
        )}
      </S.CardContainer>
      <ThemeProvider theme={CustomTheme}>
        <VolunteerPagination
          count={pageCount}
          page={page}
          onChange={handleChange}
        />
        {loggedIn && (
          <S.ButtonContainer>
            <Link to={SUPPORT.VOLUNTEER_REVIEW_WRITE}>
              <S.VolunteerButton>글쓰기</S.VolunteerButton>
            </Link>
          </S.ButtonContainer>
        )}
      </ThemeProvider>
    </S.Container>
  );
};

export default VolunteerReview;
