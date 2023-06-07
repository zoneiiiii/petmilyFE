import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import * as S from "./VolunteerNotice.styled";
import VolunteerCard from "../../../components/Support/Volunteer/VolunteerCard";
import VolunteerPagination from "../../../components/Support/Volunteer/VolunteerPagination";
import axios from "axios";
import { SUPPORT } from "../../../constants/PageURL";
import { Container, Grid, ThemeProvider } from "@mui/material";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";
import { AuthContext } from "../../../contexts/AuthContexts";
import { useNavigate, useLocation } from "react-router-dom";
import NotFound from "../../NotFound/NotFound";
import styled from "styled-components";
import CustomButton from "../../Login/CustomButton";

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
    <ThemeProvider theme={CustomTheme}>
      <Section className="result">
        <MainContainer className="result-container">
          <ContainerBox>
            <Top>봉사 게시판</Top>
            <Container sx={{ py: "30px" }} maxWidth="60vw">
              <Grid container spacing={4} columns={8}>
                {data.length === 0 ? (
                  <S.NoDataContainer>게시글이 없습니다.</S.NoDataContainer>
                ) : (
                  <>
                    {data.map(
                      (
                        card //map함수로 cards에 있는 데이터 전부 보여줌.
                      ) => (
                        <Grid item xs={10} sm={6} md={2} key={card.boardNum}>
                          <VolunteerCard {...card} key={card.boardNum} />
                        </Grid>
                      )
                    )}
                  </>
                )}
              </Grid>

              {loggedIn === true ? (
                <Link to={SUPPORT.VOLUNTEER_NOTICE_WRITE}>
                  <CustomButton label="글쓰기" value="글쓰기">
                    글쓰기
                  </CustomButton>
                </Link>
              ) : (
                <></>
              )}
            </Container>
            <VolunteerPagination
              count={pageCount}
              page={page}
              onChange={handleChange}
            />
          </ContainerBox>
        </MainContainer>
      </Section>
    </ThemeProvider>
  );
};

export default VolunteerNotice;
const Section = styled.section`
  background: #f8f9fa;
  padding: 30px 0 40px 0;
`;

const MainContainer = styled.div`
  width: 1008px;
  // width: 1150px;
  max-width: 1150px;
  min-width: 790px;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(233, 236, 239);
  border-image: initial;
  margin: 0px auto 20px;
  background: rgb(255, 255, 255);
`;

const Top = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
`;

const SearchContainer = styled.div`
  float: right;
  margin-left: auto;
  margin-bottom: 20px;
`;

const CardImage = styled.img`
  width: auto;
  height: 196px;
  object-fit: cover;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  margin: 0.5rem;
`;

const CardTitle = styled.p`
  font-weight: bold;
  font-size: 0.9rem;
  margin: 0.5rem 0.5rem;
  line-height: 1.4em;
  height: 2.8em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const CardWritter = styled.p`
  font-size: 14px;
  color: #888;
  // float: left;
  margin-left: 10px;
`;
const CardDate = styled.p`
  font-size: 14px;
  color: #888;
  float: left;
  margin-left: 10px;
`;
const CardCount = styled.p`
  font-size: 14px;
  color: #888;
  float: right;
  margin-right: 10px;
`;

const ContainerBox = styled.div`
  margin-bottom: 20px;
`
