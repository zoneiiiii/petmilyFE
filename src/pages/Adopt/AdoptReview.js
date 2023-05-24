import styled from "styled-components";
import { useState, useEffect, useLayoutEffect } from "react";
import {
  Card,
  Grid,
  Pagination,
  Container,
  ThemeProvider,
} from "@mui/material";
import SearchBar from "../../components/common/SearchBar";
import CustomButton from "../Login/CustomButton";
import { Link } from "react-router-dom";
import { ADOPT } from "../../constants/PageURL";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import axios from "axios";
import { red } from "@mui/material/colors";

const AdoptReview = () => {
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

            <Container sx={{ py: "30px" }} maxWidth="70vw">
              <SearchContainer>
                <SearchBar />
              </SearchContainer>
              <Grid container spacing={4} columns={8}>
                {data
                  .slice(
                    (page - 1) * itemsPerPage,
                    (page - 1) * itemsPerPage + itemsPerPage
                  )
                  .map((item) => (
                    <Grid item xs={10} sm={6} md={2} key={item.boardNum}>
                      <Link
                        to={ADOPT.REVIEW_DETAIL(item.boardNum)}
                        state={{
                          boardNum: item.boardNum,
                          reviewSubject: item.reviewSubject,
                          memberNum: item.memberNum,
                          reviewCount: item.reviewCount,
                          reviewContent: item.reviewContent,
                          reviewDate: item.reviewDate,
                        }}
                        style={{ textDecoration: "none" }}
                      >
                        <Card
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <CardImage src={item.imgThumbnail} />
                          <div>
                            <CardTitle>{item.reviewSubject}</CardTitle>
                            <CardWritter>{item.memberNum}</CardWritter>
                            <CardCount>조회 {item.reviewCount}</CardCount>
                          </div>
                        </Card>
                      </Link>
                    </Grid>
                  ))}
              </Grid>
              <Link
                className="button"
                to={ADOPT.REVIEW_WRITE}
                state={{
                  modify: "write",
                }}
              >
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

const MainContainer = styled.div`
  width: 70vw;
  // width: 1150px;
  max-width: 1150px;
  min-width: 790px;
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
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
`;

const CardTitle = styled.p`
  font-weight: bold;
  font-size: 16px;
  text-align: center;
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
  margin-left: 10px;
`;

const CardCount = styled.p`
  font-size: 14px;
  color: #888;
  float: right;
  margin-right: 10px;
`;
const ContainerBox = styled.div``;

export default AdoptReview;
