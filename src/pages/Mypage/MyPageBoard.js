import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import MissingBoard from "../Community/Missing/MissingBoard";
import FreeBoard from "../Community/FreeBoard/FreeBoard";
import FleaBoard from "../Community/FleaBoard/FleaBoard";
import FindBoard from "../Community/FindBoard/FindBoard";
import VolunteerReview from "../Support/Volunteer/VolunteerReview";
import { Typography, ThemeProvider } from "@mui/material";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import { COMMUNITY } from '../../constants/PageURL';
import { Card } from '@mui/material';
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

//board_num, member_num, board_id, subject, content, count, date, state

const dummy = [
  {
    board_id: "missing",
  },
  {
    board_id: "find",
  },
  {
    board_id: "flea",
  },
  {
    board_id: "free",
  },
  {
    board_id: "review",
  },
];

const MyPageBoard = () => {
  const { id } = useParams();
  const [data, setData] = useState([]); // DB 데이터 가져오는 변수

  useEffect(() => {
    setData(dummy.filter((data) => data.board_id === parseInt(id))[0]);
  }, [id]);

  // const [page, setPage] = useState(1); // 현재 페이지 관리하는 상태 변수
  // const itemsPerPage = 12; // 한페이지에 보여줄 페이지의 개수
  // const startIndex = (page - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const cards = data.slice(startIndex, endIndex); // 현재 페이지에 해당하는 카드 데이터 계산
  // const [maxPageNum, setMaxPageNum] = useState(1);
  // // const pageCount = Math.ceil(data.length / itemsPerPage); // 페이지 수 계산

  // const handleChange = (event, value) => {
  //   //페이지 변경 시 호출, 새 페이지의 번호를 value에 저장함.
  //   setPage(value);
  //   console.log(data);
  // };

  // const getPageNum = () => {
  //   const maxLength = dummy.length;
  //   return setMaxPageNum(Math.ceil(maxLength / itemsPerPage));
  // }

  // useEffect(() => {
  //   getPageNum();
  // }, []);


  return (
    <ThemeProvider theme={CustomTheme}>
      {id === "missing" ? (
        <>
          <Typography
            className="myOrderListTitle"
            sx={titleSx}
            border={3}
            borderColor="#ffbd59"
            mb={4}
          >
            실종 동물 게시판
          </Typography>
          <Grid container spacing={4} columns={8} width="940px">
                {/* {data
                  .slice(
                    (page - 1) * itemsPerPage,
                    (page - 1) * itemsPerPage + itemsPerPage
                  )
                  .map((card) => {
                    return (
                      <Grid item xs={10} sm={6} md={2} key={card.boardNum}>
                        <Link to={COMMUNITY.MISSING_DETAIL(card.boardNum)} style={{ textDecoration: "none" }}>
                          <Card
                            key={card.boardNum}
                            sx={{
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <CardImage src="http://placeimg.com/300/300/animals/sepia" />
                            <div>
                              <CardTitle>{card.boardSubject}</CardTitle>
                              <CardWritter>{card.memberNickName}</CardWritter>
                              <CardCount>조회 {card.boardCount}</CardCount>
                            </div>
                          </Card>
                        </Link>
                      </Grid>
                    );
                  })} */}
              </Grid>
              {/* <Pagination
              color="primary"
              page={page}
              count={maxPageNum}
              onChange={handleChange}
              sx={{
                display: "flex",
                justifyContent: "center",
                margin: '50px 0 0 0px'
              }} */}
            {/* /> */}
        </>
      ) : id === "find" ? (
        <>
          <Typography
            className="myOrderListTitle"
            sx={titleSx}
            border={3}
            borderColor="#ffbd59"
            mb={4}
          >
            목격 제보 게시판
          </Typography>
          {/* <FindBoard /> */}
        </>
      ) : id === "free" ? (
        <>
          <Typography
            className="myOrderListTitle"
            sx={titleSx}
            border={3}
            borderColor="#ffbd59"
            mb={4}
          >
            자유게시판
          </Typography>
          {/* <FreeBoard /> */}
        </>
      ) : id === "flea" ? (
        <>
          <Typography
            className="myOrderListTitle"
            sx={titleSx}
            border={3}
            borderColor="#ffbd59"
            mb={4}
          >
            매매 장터
          </Typography>
          {/* <FleaBoard /> */}
        </>
      ) : (
        <>
          <Typography
            className="myOrderListTitle"
            sx={titleSx}
            border={3}
            borderColor="#ffbd59"
            mb={4}
          >
            봉사 후기
          </Typography>
          {/* <VolunteerReview /> */}
        </>
      )}
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
export default MyPageBoard;
