import styled from "styled-components";
import * as React from "react";
import {
  Grid,
  Pagination,
  ThemeProvider,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Card,
} from "@mui/material";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ADOPT } from "../../constants/PageURL";
import { AuthContext } from "../../contexts/AuthContexts";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const MyPageAdoptReview = () => {
  const { userNum } = useContext(AuthContext);
  const [reviewData, setReviewData] = useState([]);
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
      axios
        .get(`/mypage/adoptReview/${userNum}?${requestParams}`)
        .then((response) => {
          const totalPages = response.data.totalPages;
          if (urlPage > totalPages) {
            return;
          }
          setReviewData(response.data.content);
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

  if (reviewData.length === 0) {
    return (
      <ThemeProvider theme={CustomTheme}>
        <Typography sx={titleSx} border={3} borderColor="#ffbd59" mb={4}>
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
        <Typography sx={titleSx} border={3} borderColor="#ffbd59" mb={4}>
          입양 후기
        </Typography>
        <MainContainer className="result-container">
          <Grid container spacing={4} columns={8}>
            {reviewData &&
              reviewData.map((item) => {
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
        </MainContainer>
        <Pagination
          count={pageCount}
          page={page}
          color="primary"
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

const MainContainer = styled.div`
  width: 940px;
  // width: 1150px;
  max-width: 1150px;
  min-width: 790px;
`;

const CardDate = styled.p`
  font-size: 14px;
  color: #888;
  float: left;
  margin-left: 10px;
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

const CardCount = styled.p`
  font-size: 14px;
  color: #888;
  float: right;
  margin-right: 10px;
`;

export default MyPageAdoptReview;
