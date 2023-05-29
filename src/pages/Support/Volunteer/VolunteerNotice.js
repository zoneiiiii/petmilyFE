import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import * as S from "./VolunteerNotice.styled";
import VolunteerCard from "../../../components/Support/Volunteer/VolunteerCard";
import VolunteerPagination from "../../../components/Support/Volunteer/VolunteerPagination";
import axios from "axios";
import { SUPPORT } from "../../../constants/PageURL";
import { ThemeProvider } from "@mui/material";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";
import { AuthContext } from "../../../contexts/AuthContexts";
import { useNavigate, useLocation } from "react-router-dom";
import NotFound from "../../NotFound/NotFound";

const VolunteerNotice = () => {
  const { loggedIn } = useContext(AuthContext);
  const [data, setData] = useState([]); // DB 데이터 가져오는 변수
  const [page, setPage] = useState(1); // 현재 페이지 관리하는 상태 변수
  const [pageCount, setPageCount] = useState(0); // 페이지 수 계산
  const [validPage, setValidPage] = useState(true); //존재하는 페이지인지 확인

  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    // 쿼리스트링 추가
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
      .get(`http://localhost:8080/board/volunteer?${requestParams}`)
      .then((response) => {
        const totalPages = response.data.totalPages;

        if (urlPage > totalPages) {
          setValidPage(false);
          return;
        }

        setData(response.data.content);
        setPageCount(totalPages);
        setPage(urlPage);
        setValidPage(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    window.scrollTo(0, 0); // 페이지네이션 클릭시 화면을 맨 위로 스크롤함
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
    //존재하지 않는 페이지일 경우 NotFound 페이지 랜더링
    return <NotFound />;
  }

  return (
    <S.Container>
      <S.Title>봉사 게시판</S.Title>
      <S.CardContainer>
        <S.CardGrid>
          {data.map(
            (
              card //map함수로 cards에 있는 데이터 전부 보여줌.
            ) => (
              <VolunteerCard {...card} key={card.boardNum} />
            )
          )}
        </S.CardGrid>
      </S.CardContainer>
      <ThemeProvider theme={CustomTheme}>
        <VolunteerPagination
          count={pageCount}
          page={page}
          onChange={handleChange}
        />

        {loggedIn && (
          <S.ButtonContainer>
            <Link to={SUPPORT.VOLUNTEER_NOTICE_WRITE}>
              <S.VolunteerButton>글 작성</S.VolunteerButton>
            </Link>
          </S.ButtonContainer>
        )}
      </ThemeProvider>
    </S.Container>
  );
};

export default VolunteerNotice;
