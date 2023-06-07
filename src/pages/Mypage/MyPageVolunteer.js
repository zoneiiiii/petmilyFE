import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Typography,
  ThemeProvider,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Grid,
} from "@mui/material";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import { AuthContext } from "../../contexts/AuthContexts";
import axios from "axios";
import VolunteerReviewCard from "../../components/Support/Volunteer/VolunteerReviewCard";
import VolunteerPagination from "../../components/Support/Volunteer/VolunteerPagination";
import styled from "styled-components";
import Loading from "../../components/Loading/LoadingPage";

const MyPageVolunteer = () => {
  const { userNum } = useContext(AuthContext);
  const [review, setReview] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0); // 페이지 수 계산
  const [isLoading, setIsLoading] = useState(true); //로딩 상태

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
        .get(`/mypage/review/${userNum}?${requestParams}`)
        .then((response) => {
          const totalPages = response.data.totalPages;
          if (urlPage > totalPages) {
            return;
          }

          setReview(response.data.content);
          setPageCount(totalPages);
          setPage(urlPage);
          setIsLoading(false);
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

  if (isLoading) {
    return <Loading />; // 로딩 중일 때 표시할 컴포넌트
  }

  if (review.length === 0) {
    return (
      <ThemeProvider theme={CustomTheme}>
        <Typography
          className="myOrderListTitle"
          sx={titleSx}
          border={3}
          borderColor="#ffbd59"
          mb={4}
        >
          봉사 후기
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
      <>
        <ThemeProvider theme={CustomTheme}>
          <Typography
            className="myOrderListTitle"
            sx={titleSx}
            border={3}
            borderColor="#ffbd59"
            mb={4}
          >
            봉사 후기
          </Typography>
          <MainContainer className="result-container">
            <Grid container spacing={4} columns={8}>
              {review &&
                review.map((card) => (
                  <Grid item xs={10} sm={6} md={2} key={card.boardNum}>
                    <VolunteerReviewCard {...card} key={card.boardNum} />
                  </Grid>
                ))}
            </Grid>
            <VolunteerPagination
              count={pageCount}
              page={page}
              onChange={handleChange}
            />
          </MainContainer>
        </ThemeProvider>
      </>
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
export default MyPageVolunteer;
