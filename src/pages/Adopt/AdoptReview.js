import styled from "styled-components";
import { useState, useEffect, useLayoutEffect, useContext } from "react";
import {
  Card,
  Grid,
  Pagination,
  Container,
  ThemeProvider,
} from "@mui/material";
import * as S from "../../components/Support/Volunteer/VolunteerCard.styled";
import SearchBar from "../../components/common/SearchBar";
import CustomButton from "../Login/CustomButton";
import { Link } from "react-router-dom";
import { ADOPT } from "../../constants/PageURL";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContexts";

const AdoptReview = () => {
  const { loggedIn } = useContext(AuthContext);
  const [data, setData] = useState([]); // DB 데이터 가져오는 변수
  const [page, setPage] = useState(1); // 현재 페이지 관리하는 상태 변수
  const itemsPerPage = 12; // 한페이지에 보여줄 페이지의 개수
  const [maxPageNum, setMaxPageNum] = useState(1);
  const [pageChk, setPageChk] = useState(false);

  const handleChange = (event, value) => {
    //페이지 변경 시 호출, 새 페이지의 번호를 value에 저장함.
    setPage(value);
  };

  const getPageNum = () => {
    const maxLength = data.length;
    setPageChk(!pageChk);
    return setMaxPageNum(Math.ceil(maxLength / itemsPerPage));
  };
  useLayoutEffect(() => {
    axios
      .get("/board/review/list")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("error");
      });
  }, []);
  useEffect(() => {
    getPageNum();
  }, [pageChk]);

  return (
    <Section className="result">
      <MainContainer className="result-container">
        <ThemeProvider theme={CustomTheme}>
          <ContainerBox>
            <Top>입양 후기 게시판</Top>

            <CardContainer>
              <SearchContainer>
                <SearchBar />
              </SearchContainer>
              <CardGrid container spacing={4}>
                {/* <Grid item xs={12} sm={6} md={4} lg={3}> */}
                {data
                  .slice(
                    (page - 1) * itemsPerPage,
                    (page - 1) * itemsPerPage + itemsPerPage
                  )
                  .map((item) => (
                    <S.Container key={item.boardNum}>
                      <Link
                        to={ADOPT.REVIEW_DETAIL(item.boardNum)}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          width: "100%",
                        }}
                        state={{
                          boardNum: item.boardNum,
                        }}
                      >
                        <S.Thumbnail src={item.imgThumbnail} alt="thumbnail" />
                        <S.User>{item.memberNickName}</S.User>
                        <S.Title>{item.reviewSubject}</S.Title>
                        <S.Date>{item.reviewDate}</S.Date>
                        <S.CountWrapper>
                          <S.Count>조회수: {item.reviewCount}</S.Count>
                        </S.CountWrapper>
                      </Link>
                    </S.Container>
                  ))}
              </CardGrid>
              {loggedIn && (
                <Link
                  className="button"
                  to={ADOPT.REVIEW_WRITE}
                  state={{
                    modify: "write",
                  }}
                  style={{ marginLeft: "auto" }}
                >
                  <CustomButton label="글쓰기" value="글쓰기1" />
                </Link>
              )}
            </CardContainer>

            <Pagination
              color="primary"
              page={page}
              count={maxPageNum}
              onChange={handleChange}
              sx={{
                display: "flex",
                justifyContent: "center",
                margin: "50px 0 0px 0px",
              }}
            />
          </ContainerBox>
        </ThemeProvider>
      </MainContainer>
    </Section>
  );
};
const Section = styled.section`
  padding: 30px 0 40px 0;
`;

// const MainContainer = styled.div`
//   width: 70vw;

//   max-width: 1150px;
//   min-width: 790px;
//   margin: 0px auto 20px;
//   background: rgb(255, 255, 255);
// `;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-width: 1200px;
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

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  width: 95%;
  max-width: 1200px;
  justify-items: center; // 변경된 부분
`;
const ContainerBox = styled.div``;
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 1rem; // 좌우 여백 추가
  margin-bottom: 1rem;
`;

export default AdoptReview;
