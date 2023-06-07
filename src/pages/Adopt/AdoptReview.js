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
    <ThemeProvider theme={CustomTheme}>
      <Section className="result">
        <MainContainer className="result-container">
          <ContainerBox>
            <Top>입양 후기 게시판</Top>
            <Container sx={{ py: "30px" }} maxWidth="60vw">
              {/* <SearchContainer>
                <SearchBar />
              </SearchContainer> */}
              <Grid container spacing={4} columns={8}>
                {/* <Grid item xs={12} sm={6} md={4} lg={3}> */}
                {data
                  .slice(
                    (page - 1) * itemsPerPage,
                    (page - 1) * itemsPerPage + itemsPerPage
                  )
                  .map((item) => {
                    return (
                      <Grid item xs={10} sm={6} md={2} key={item.boardNum}>
                        <Link
                          to={ADOPT.REVIEW_DETAIL(item.boardNum)}
                          style={{ textDecoration: "none" }}
                          state={{
                            boardNum: item.boardNum,
                            nickName: item.memberNickName,
                          }}
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
                            <CardImage src={item.imgThumbnail} />
                            <div>
                              <CardTitle>{item.reviewSubject}</CardTitle>
                              <CardWritter>{item.memberNickName}</CardWritter>
                              <CardDate>
                                {item.reviewDate.replace(/-/g, "/")}
                              </CardDate>
                              <CardCount>조회 {item.reviewCount}</CardCount>
                            </div>
                          </Card>
                        </Link>
                      </Grid>
                    );
                  })}
              </Grid>
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
            </Container>

            <Pagination
              color="primary"
              page={page}
              count={maxPageNum}
              onChange={handleChange}
              showFirstButton
              showLastButton
              sx={{
                display: "flex",
                justifyContent: "center",
                margin: "50px 0 0px 0px",
              }}
            />
          </ContainerBox>
        </MainContainer>
      </Section>
    </ThemeProvider>
  );
};
// const Section = styled.section`
//   padding: 30px 0 40px 0;
// `;

// const MainContainer = styled.div`;
//   width: 70vw;

//   max-width: 1150px;
//   min-width: 790px;
//   margin: 0px auto 20px;
//   background: rgb(255, 255, 255);
// `;

// const MainContainer = styled.div`
//   // display: flex;
//   // flex-direction: column;
//   // align-items: center;
//   // padding: 2rem;
//   // min-width: 1200px;
//   width: 60vw;
//   // width: 1150px;
//   max-width: 1150px;
//   min-width: 790px;
//   border-radius: 8px;
//   border-width: 1px;
//   border-style: solid;
//   border-color: rgb(233, 236, 239);
//   border-image: initial;
//   margin: 0px auto 20px;
//   background: rgb(255, 255, 255);
// `;

// const Top = styled.h1`
//   font-size: 2rem;
//   font-weight: bold;
//   text-align: center;
//   margin-bottom: 2rem;
// `;

// const SearchContainer = styled.div`
//   float: right;
//   margin-left: auto;
//   margin-bottom: 20px;
// `;

// const CardGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 1rem;
//   width: 95%;
//   max-width: 1200px;
//   justify-items: center; // 변경된 부분
// `;
// const ContainerBox = styled.div``;
// const CardContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   margin: 0 1rem; // 좌우 여백 추가
//   margin-bottom: 1rem;
// `;
const Section = styled.section`
  background: #f8f9fa;
  padding: 30px 0 40px 0;
  min-height: 1550px;
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

export default AdoptReview;
