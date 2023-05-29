import styled from "styled-components";
import * as React from "react";
import {
  Card,
  Grid,
  Pagination,
  ThemeProvider,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ADOPT } from "../../constants/PageURL";
import { AuthContext } from "../../contexts/AuthContexts";
import axios from "axios";

const MyPageAdoptReview = () => {
  const [reviewData, setReviewData] = useState([]);
  const [page, setPage] = useState(1); // 현재 페이지 관리하는 상태 변수
  const itemsPerPage = 12; // 한페이지에 보여줄 페이지의 개수
  const [maxPageNum, setMaxPageNum] = useState(1);
  const { userNum } = useContext(AuthContext);

  useEffect(() => {
    if (userNum) {
      // API 호출

      axios
        .get(`/mypage/adoptReview/${userNum}`)
        .then((response) => {
          setReviewData(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [userNum]);

  const handleChange = (event, value) => {
    //페이지 변경 시 호출, 새 페이지의 번호를 value에 저장함.
    setPage(value);
  };

  const getPageNum = () => {
    const maxLength = reviewData.length;
    return setMaxPageNum(Math.ceil(maxLength / itemsPerPage));
  };

  useEffect(() => {
    getPageNum();
  }, []);
  if (reviewData.length === 0) {
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
          {reviewData
            .slice(
              (page - 1) * itemsPerPage,
              (page - 1) * itemsPerPage + itemsPerPage
            )
            .map((card) => (
              <Grid item xs={10} sm={6} md={2} key={card.boardNum}>
                <Link
                  to={ADOPT.REVIEW_DETAIL(card.boardNum)}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardImage src={card.imgThumbnail} />
                    <div>
                      <CardTitle>{card.reviewSubject}</CardTitle>
                      <CardWritter>{card.memberNickname}</CardWritter>
                      <CardCount>조회 {card.reviewCount}</CardCount>
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
