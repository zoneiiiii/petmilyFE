import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  Pagination,
} from "@mui/material";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import { AuthContext } from "../../contexts/AuthContexts";
import axios from "axios";
import { COMMUNITY } from "../../constants/PageURL";

const MyPageMissing = () => {
  const { userNum } = useContext(AuthContext);
  const [missing, setMissing] = useState([]); // DB 데이터 가져오는 변수
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0); // 페이지 수 계산

  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    let urlPage = Number(params.get("page"));

    if (urlPage < 1 || isNaN(urlPage)) {
      urlPage = 1;
      params.set("page", urlPage);
      navigate({ ...location, search: params.toString() }, { replace: true });
      return;
    }

    const requestParams = new URLSearchParams({ page: urlPage - 1 });

    if (userNum) {
      // API 호출

      axios
        .get(`/mypage/missing/${userNum}?${requestParams}`)
        .then((response) => {
          const totalPages = response.data.totalPages;
          if (urlPage > totalPages) {
            return;
          }

          setMissing(response.data.content);
          setPageCount(totalPages);
          setPage(urlPage);
        })
        .catch((error) => {
          console.error("데이터 수신 오류 :", error);
        });

      window.scrollTo(0, 0);
    }
  }, [location, navigate, location.search, userNum]);

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

  const formatDate = (dateString) => {
    //날짜 변환함수
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  if (missing.length === 0) {
    return (
      <ThemeProvider theme={CustomTheme}>
        <Typography sx={titleSx} border={3} borderColor="#ffbd59" mb={4}>
          실종 동물 게시판
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
          실종 동물 게시판
        </Typography>
        <MainContainer className="result-container">
          <Grid container spacing={4} columns={8}>
            {missing &&
              missing.map((card) => {
                return (
                  <Grid item xs={10} sm={6} md={2} key={card.boardNum}>
                    <Link
                      to={COMMUNITY.MISSING_DETAIL(card.boardNum)}
                      style={{ textDecoration: "none" }}
                    >
                      <Card
                        key={card.boardNum}
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          border: "1px solid rgb(233, 236, 239)",
                          boxShadow: "1px 1px 4px 0px rgb(233, 236, 239)",
                        }}
                      >
                        <CardImage src={card.imgThumbnail} />
                        <div>
                          <CardTitle>{card.boardSubject}</CardTitle>
                          <CardWritter>{card.memberNickName}</CardWritter>
                          <CardDate>{formatDate(card.boardDate)}</CardDate>
                          <CardCount>조회 {card.boardCount}</CardCount>
                        </div>
                      </Card>
                    </Link>
                  </Grid>
                );
              })}
          </Grid>
        </MainContainer>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handleChange}
          color="primary"
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "50px 0 0 0px",
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

const MainContainer = styled.div`
  width: 940px;
  max-width: 1150px;
  min-width: 790px;
`;

const CardImage = styled.img`
  // fullWidth;
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
  font-size: 1.1rem;
  margin: 0.3em 0.5em 0em 0.5em;
  line-height: 1.2em;
  height: 2.4em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const CardWritter = styled.p`
  font-size: 14px;
  color: #888;
  margin-left: 10px;
`;

const CardCount = styled.p`
  font-size: 14px;
  color: #888;
  float: right;
  margin-right: 10px;
`;

const CardDate = styled.p`
  font-size: 14px;
  color: #888;
  float: left;
  margin-left: 10px;
`;
export default MyPageMissing;
