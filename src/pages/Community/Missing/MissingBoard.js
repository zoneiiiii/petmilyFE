import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { COMMUNITY } from '../../../constants/PageURL';
import styled from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Card } from '@mui/material';
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import SearchBar from "../../../components/common/SearchBar";
import Pagination from "@mui/material/Pagination";
import CustomButton from "../../Login/CustomButton";
import axios from "axios";

//board_num, member_num, board_id, subject, content, count, date, state
const categories = ["목격", "실종"]


const dummy = [
  { id: 1, title: "골든 리트리버 똘이를 찾습니다", region: "서울", writter: "똘이엄마", date: "2023.05.04", count: 34 },
  { id: 2, title: "푸들 복이를 찾습니다", region: "서울", writter: "똘이엄마", date: "2023.05.04", count: 34 },
  { id: 3, title: "코리안숏헤어 가이를 찾습니다", region: "서울", writter: "똘이엄마", date: "2023.05.04", count: 34 },
  { id: 4, title: "골든 리트리버 라이를 찾습니다", region: "서울", writter: "똘이엄마", date: "2023.05.04", count: 34 },
  { id: 5, title: "골든 리트리버 마이를 찾습니다", region: "서울", writter: "똘이엄마", date: "2023.05.04", count: 34 },
  { id: 6, title: "골든 리트리버 바이를 찾습니다", region: "서울", writter: "똘이엄마", date: "2023.05.04", count: 34 },
  { id: 7, title: "코리안숏헤어 사이를 찾습니다", region: "서울", writter: "똘이엄마", date: "2023.05.04", count: 34 },
  { id: 8, title: "골든 리트리버 아이를 찾습니다", region: "서울", writter: "똘이엄마", date: "2023.05.04", count: 34 },
  { id: 9, title: "골든 리트리버 똘이를 찾습니다", region: "서울", writter: "똘이엄마", date: "2023.05.04", count: 34 },
  { id: 10, title: "골든 리트리버 복이를 찾습니다", region: "서울", writter: "똘이엄마", date: "2023.05.04", count: 34 },
  { id: 11, title: "코리안숏헤어 가이를 찾습니다", region: "서울", writter: "똘이엄마", date: "2023.05.04", count: 34 },
  { id: 12, title: "골든 리트리버 라이를 찾습니다", region: "서울", writter: "똘이엄마", date: "2023.05.04", count: 34 },
  { id: 13, title: "코리안숏헤어 마이를 찾습니다", region: "서울", writter: "똘이엄마", date: "2023.05.04", count: 34 },
  { id: 14, title: "골든 리트리버 바이를 찾습니다", region: "서울", writter: "똘이엄마", date: "2023.05.04", count: 34 },
  { id: 15, title: "푸들 사이를 찾습니다", region: "서울", writter: "똘이엄마", date: "2023.05.04", count: 34 },
  { id: 16, title: "골든 리트리버 아이를 찾습니다", region: "서울", writter: "똘이엄마", date: "2023.05.04", count: 34 },
]

const MissingBoard = () => {
  const [data, setData] = useState([]); // DB 데이터 가져오는 변수
  const [page, setPage] = useState(1); // 현재 페이지 관리하는 상태 변수
  const itemsPerPage = 12; // 한페이지에 보여줄 페이지의 개수
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const cards = data.slice(startIndex, endIndex); // 현재 페이지에 해당하는 카드 데이터 계산
  const [maxPageNum, setMaxPageNum] = useState(1);
  // const pageCount = Math.ceil(data.length / itemsPerPage); // 페이지 수 계산

  const handleChange = (event, value) => {
    //페이지 변경 시 호출, 새 페이지의 번호를 value에 저장함.
    setPage(value);
  };

  const getPageNum = () => {
    const maxLength = dummy.length;
    return setMaxPageNum(Math.ceil(maxLength / itemsPerPage));
  }

  useEffect(() => {
    getPageNum();
  }, []);

  /* axios start */
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/board/missing")
  //     .then((response) => {
  //       setData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);
  /* axios end */

  return (
    <Section className="result">
      <MainContainer className="result-container">
        <ThemeProvider theme={theme}>
          <ContainerBox>
            <Top>실종 동물 게시판</Top>

            <Container sx={{ py: '30px' }} maxWidth="60vw">
              <SearchContainer>
                <SearchBar />
              </SearchContainer>
              <Grid container spacing={4} columns={8}>
                {dummy
                  .slice(
                    (page - 1) * itemsPerPage,
                    (page - 1) * itemsPerPage + itemsPerPage
                  )
                  .map((card) => {
                    return (
                      <Grid item xs={10} sm={6} md={2} key={card.id}>
                        <Link to={COMMUNITY.MISSING_DETAIL(card.id)} style={{ textDecoration: "none" }}>
                          <Card
                            key={card.id}
                            sx={{
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <CardImage src="http://placeimg.com/300/300/animals/sepia" />
                            <div>
                              <CardTitle>{card.title}</CardTitle>
                              <CardWritter>{card.writter}</CardWritter>
                              <CardCount>조회 {card.count}</CardCount>
                            </div>
                          </Card>
                        </Link>
                      </Grid>
                    );
                  })}
              </Grid>
              <Link className="button" to={COMMUNITY.MISSING_WRITE}>
                <CustomButton label="글쓰기" value="글쓰기" />
              </Link>
            </Container>


            <Pagination
              color="primary"
              page={page}
              count={maxPageNum}
              onChange={handleChange}
              sx={{
                display: "flex",
                justifyContent: "center",
                margin: '50px 0 0 0px'
              }}
            />

          </ContainerBox >
        </ThemeProvider>

      </MainContainer>
    </Section >
  );
};

const theme = createTheme({
  palette: {
    type: "mainColor",
    primary: {
      main: "#FBD385",
    },
  },
});

const Section = styled.section`
  background: #f8f9fa;
  padding: 30px 0 40px 0;
`

const MainContainer = styled.div`
  width: 60vw;
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
`

const Top = styled.h1`
      font-size: 2rem;
      font-weight: bold;
      text-align: center;
      margin-bottom: 2rem;
      `;

const SearchContainer = styled.div`
      float:right;
      `;

const CardImage = styled.img`
      width: 100%;
      height: auto;
      margin-bottom: 10px;
      `;

const CardTitle = styled.p`
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 5px;
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
      float: left;
      margin-left: 10px
      `;

const CardCount = styled.p`
      font-size: 14px;
      color: #888;
      float: right;
      margin-right: 10px;
      `

const ContainerBox = styled.div`
      `
const CardBoxList = styled.div``
const CardBox = styled.div``

export default MissingBoard;
