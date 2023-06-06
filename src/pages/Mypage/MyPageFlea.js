import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Typography,
  ThemeProvider,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Card,
} from "@mui/material";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import { AuthContext } from "../../contexts/AuthContexts";
import axios from "axios";
import { COMMUNITY } from "../../constants/PageURL";
import Loading from "../../components/Loading/LoadingPage";

const MyPageFlea = () => {
  const { userNum } = useContext(AuthContext);
  const [flea, setFlea] = useState([]);
  const [isLoading, setIsLoading] = useState(true); //로딩 상태
  const navigate = useNavigate();

  //fleaboard 무한스크롤 설정
  const [visibleCount, setVisibleCount] = useState(8); // 더보기 기능

  useEffect(() => {
    if (userNum) {
      // API 호출
      axios
        .get(`/mypage/flea/${userNum}`)
        .then((response) => {
          setFlea(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("데이터 수신 오류 :", error);
        });
    }
  }, [userNum]);
  const handleLoadMore = () => {
    setVisibleCount(visibleCount + 4); // 더보기 클릭시 추가되는 아이템 개수
  };

  const visibleItems = flea.slice(0, visibleCount);
  const isLastPage = visibleCount >= flea.length; // 더 이상 불러올 상품이 없는 경우 true, 더보기 버튼 사라짐.

  const formatDate = (dateString) => {
    //날짜 변환함수
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  if (isLoading) {
    return <Loading />; // 로딩 중일 때 표시할 컴포넌트
  }

  if (flea.length === 0) {
    return (
      <ThemeProvider theme={CustomTheme}>
        <Typography sx={titleSx} border={3} borderColor="#ffbd59" mb={4}>
          매매장터
        </Typography>
        <Grid sx={{ width: "940px", height: "50vh" }}>
          <Table
            aria-label="caption table"
            overflow="hidden"
            sx={{ border: "1px solid lightgray" }}
          >
            <TableHead>
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ height: 250 }}>
                  게시글이 없습니다.
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </Grid>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={CustomTheme}>
        <Typography sx={titleSx} border={3} borderColor="#ffbd59" mb={4}>
          매매장터
        </Typography>
        <MainContainer>
          <Grid container spacing={4} columns={8}>
            {visibleItems.map((item, index) => {
              return (
                <Grid item xs={10} sm={6} md={2} key={item.boardNum}>
                  <Link
                    to={COMMUNITY.FLEA_DETAIL(item.boardNum)}
                    style={{ textDecoration: "none" }}
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
                        <CardTitle>{item.boardSubject}</CardTitle>
                      </div>
                      <div>
                        <CardCost>
                          {item.boardCost
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          원
                        </CardCost>
                        <CardDate>{formatDate(item.boardDate)}</CardDate>
                        <CardStatus>
                          {item.boardStatus === true ? (
                            <p>판매중</p>
                          ) : (
                            <p style={{ color: "lightgray" }}>판매완료</p>
                          )}
                        </CardStatus>
                      </div>
                    </Card>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
          {!isLastPage && (
            <MoreItem>
              <MoreBtn onClick={handleLoadMore}>더보기</MoreBtn>
            </MoreItem>
          )}
        </MainContainer>
      </ThemeProvider>
    );
  }
};
const titleSx = {
  width: "200px",
  textAlign: "center",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "1.5rem",
  lineHeight: "50px",
};
//flea style

const MainContainer = styled.div`
  width: 940px;
  max-width: 1150px;
  min-width: 790px;
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
  font-size: 1.2em;
  margin: 0.3em 0.5em 0em 0.5em;
  line-height: 1.2em;
  height: 2.35em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const CardCost = styled.p`
  font-weight: 600;
  color: rgb(255, 138, 61);
  font-size: 20px;
  margin-left: 0.5em;
`;

const CardStatus = styled.div`
  font-size: 16px;
  font-weight: 600;
  float: right;
  margin-right: 0.5em;
`;

const MoreItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  cursor: pointer;
  width: 100%;
  border-top: 1px solid rgb(233, 236, 239);
  margin-top: 10px;
`;
const MoreBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  cursor: pointer;
  width: 100%;
  background-color: #ffffff;
  color: rgb(134, 142, 150);
  font-size: 16px;
  border: none;
`;

const CardDate = styled.p`
  font-size: 14px;
  color: #888;
  float: left;
  margin-left: 10px;
`;
export default MyPageFlea;
