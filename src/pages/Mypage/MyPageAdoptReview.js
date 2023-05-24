import styled from "styled-components";
import * as React from "react";
import {
  Card,
  Grid,
  Pagination,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ADOPT } from "../../constants/PageURL";
  const cards = [
    {
      id: 1,
      title: "밍키 잘 지내고 있어요! 밍키 잘 지내고 있어요!밍키 밍키 밍키 밍키",
      writter: "밍키맘",
      date: "2023.05.04",
      count: 34,
    },
    {
      id: 2,
      title: "펫밀리 입양후기",
      writter: "똘이엄마",
      date: "2023.05.04",
      count: 34,
    },
    {
      id: 3,
      title: "입양 3개월 후 남기는 후기",
      writter: "별맘",
      date: "2023.05.04",
      count: 34,
    },
    {
      id: 4,
      title: "아지 잘 지냅니다 :)",
      writter: "아지아지",
      date: "2023.05.04",
      count: 34,
    },
    {
      id: 5,
      title: "새 가족이 생겼어요!",
      writter: "패밀리",
      date: "2023.05.04",
      count: 34,
    },
    {
      id: 6,
      title: "똘이가 어느새 3살이 됐어요.",
      writter: "똘이엄마",
      date: "2023.05.04",
      count: 34,
    },
    {
      id: 7,
      title: "이름 같이 지어주세요!",
      writter: "초보엄마",
      date: "2023.05.04",
      count: 34,
    },
    {
      id: 8,
      title: "입양신청은 펫밀리에서!",
      writter: "나는유저",
      date: "2023.05.04",
      count: 34,
    },
    {
      id: 9,
      title: "초보 반려인의 후기",
      writter: "이기자",
      date: "2023.05.04",
      count: 34,
    },
    {
      id: 10,
      title: "서울보호소,입양 후기",
      writter: "삼기자",
      date: "2023.05.04",
      count: 34,
    },
    {
      id: 11,
      title: "건강해진 모모 봐주세요!",
      writter: "사기자",
      date: "2023.05.04",
      count: 34,
    },
    {
      id: 12,
      title: "골든 리트리버 입양했습니다.",
      writter: "오기자",
      date: "2023.05.04",
      count: 34,
    },
    {
      id: 13,
      title: "잘 지내고 있습니다.",
      writter: "ㅎㅎ",
      date: "2023.05.04",
      count: 34,
    },
  ];

const MyPageAdoptReview = () => {
  const [data, setData] = useState([]); // DB 데이터 가져오는 변수
  const [page, setPage] = useState(1); // 현재 페이지 관리하는 상태 변수
  const itemsPerPage = 12; // 한페이지에 보여줄 페이지의 개수
  const [maxPageNum, setMaxPageNum] = useState(1);
  const { id } = useParams();
  const [reviewData, setReviewData] = useState([]); 

  useEffect(() => {
    setReviewData(cards.filter((data) => data.id === parseInt(id))[0]);
  }, [id]);

  const handleChange = (event, value) => {
    //페이지 변경 시 호출, 새 페이지의 번호를 value에 저장함.
    setPage(value);
  };

  const getPageNum = () => {
    const maxLength = cards.length;
    return setMaxPageNum(Math.ceil(maxLength / itemsPerPage));
  };

  useEffect(() => {
    getPageNum();
  }, []);

  return (
    <ThemeProvider theme={CustomTheme}>
      <Typography
        className="myOrderListTitle"
        sx={titleSx}
        border={3}
        borderColor="#ffbd59"
        mb={4}
      >
        입양 후기
      </Typography>
              <Grid container spacing={4} columns={8} width="940px">
                {cards
                  .slice(
                    (page - 1) * itemsPerPage,
                    (page - 1) * itemsPerPage + itemsPerPage
                  )
                  .map((card) => (
                    <Grid item xs={10} sm={6} md={2} key={card.id}>
                      <Link
                        to={ADOPT.REVIEW_DETAIL(card.id)}
                        style={{ textDecoration: "none" }}
                      >
                        <Card
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
                  ))}
              </Grid>
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
    </ThemeProvider>
  );
};

const titleSx = {
  width: "200px",
  textAlign: "center",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "1.5rem",
  lineHeight: "50px",
};

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
export default MyPageAdoptReview;