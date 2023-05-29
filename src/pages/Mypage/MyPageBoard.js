import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styleds from "styled-components";
import {
  Typography,
  ThemeProvider,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableSortLabel,
  TableContainer,
  TableRow,
  Paper,
  Divider,
} from "@mui/material";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import { tableCellClasses } from "@mui/material/TableCell";
import { makeStyles } from "@material-ui/core";
import { Card } from "@mui/material";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import { AuthContext } from "../../contexts/AuthContexts";
import axios from "axios";
import { COMMUNITY } from "../../constants/PageURL";
import { styled } from "@mui/material/styles";
import * as S from "../Support/Volunteer/VolunteerReview.styled";
import VolunteerReviewCard from "../../components/Support/Volunteer/VolunteerReviewCard";
import VolunteerPagination from "../../components/Support/Volunteer/VolunteerPagination";
import { SecurityUpdateWarning } from "@mui/icons-material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.black,
    fontWeight: "bold",
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const useStyles = makeStyles({
  // 게시글 목록 css
  title: {
    textAlign: "center",
  },

  tablecontainer: {
    // maxWidth: 1200,
    minWidth: 700,
    margin: "auto",
  },

  table: {
    margin: "auto",
    // maxWidth: 1200,
    // minWidth: 700,
    // overflow: "hidden"
  },

  content: {
    overflow: "hidden",
    lineHeight: "1.4em",
    height: "1.4em",
    textOverflow: "ellipsis",
    // webkitlineclamp: 2,
    // webkitboxorient: "vertical",
  },

  pagination: {
    display: "flex",
    justifyContent: "center",
  },

  write: {
    display: "flex",
    float: "right",
    // display: "flex",
    // justifyContent: "center",
  },

  writelink: {
    textDecoration: "none",
  },
});

const MyPageBoard = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [missing, setMissing] = useState([]); // DB 데이터 가져오는 변수
  const [free, setFree] = useState([]);
  const [review, setReview] = useState([]);
  const [find, setFind] = useState([]);
  const [flea, setFlea] = useState([]);
  const [rowData, setRowData] = useState(free.length); // 날짜 sort 기능을 위한 상수 저장 정의
  const [orderDirection, setOrderDirection] = useState("asc");
  const { userNum } = useContext(AuthContext);
  // useEffect(() => {
  //   setData(dummy.filter((data) => data.boardId === parseInt(id))[0]);
  // }, [id]);
  console.log(userNum);

  useEffect(() => {
    if (userNum) {
      // API 호출

      axios
        .get(`/mypage/missing/${userNum}/${id}`)
        .then((response) => {
          setMissing(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      axios
        .get(`/mypage/free/${userNum}/${id}`)
        .then((response) => {
          setFree(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      axios
        .get(`/mypage/review/${userNum}/${id}`)
        .then((response) => {
          setReview(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [userNum, id]);

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
  // };

  // useEffect(() => {
  //   getPageNum();
  // }, []);
  /* sort start */
  // 날짜 정렬 요청 처리
  const sortArray = (arr, orderBy) => {
    switch (orderBy) {
      case "asc":
      default:
        return arr.sort((a, b) =>
          a.date > b.date ? 1 : b.date > a.date ? -1 : 0
        );
      case "desc":
        return arr.sort((a, b) =>
          a.date < b.date ? 1 : b.date < a.date ? -1 : 0
        );
    }
  };

  const handleSortRequest = () => {
    setRowData(sortArray(free, orderDirection));
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
  };
  /* sort end */

  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = React.useState(9); // 더보기 기능

  const handleLoadMore = () => {
    setVisibleCount(visibleCount + 6); // 더보기 클릭시 추가되는 아이템 개수
  };

  const visibleItems = flea.slice(0, visibleCount);
  const isLastPage = visibleCount >= flea.length; // 더 이상 불러올 상품이 없는 경우 true, 더보기 버튼 사라짐.

  if (missing && missing.length > 0 && id === "missing") {
    return (
      <ThemeProvider theme={CustomTheme}>
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
          {/* data.slice( (page - 1) * itemsPerPage, (page - 1) * itemsPerPage +
          itemsPerPage ) */}
          {missing.map((card) => {
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
          })}
        </Grid>
      </ThemeProvider>
    );
  } else if (missing.length === 0 && id === "missing") {
    return (
      <ThemeProvider theme={CustomTheme}>
        <Typography
          className="myOrderListTitle"
          sx={titleSx}
          border={3}
          borderColor="#ffbd59"
          mb={4}
        >
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
  }
  if (find && find.length > 0 && id === "find") {
    return (
      <ThemeProvider theme={CustomTheme}>
        <Typography
          className="myOrderListTitle"
          sx={titleSx}
          border={3}
          borderColor="#ffbd59"
          mb={4}
        >
          목격 제보 게시판
        </Typography>
        <Grid container spacing={4} columns={8} width="940px">
          {/* data.slice( (page - 1) * itemsPerPage, (page - 1) * itemsPerPage +
          itemsPerPage ) */}
          {find.map((card) => {
            return (
              <Grid item xs={10} sm={6} md={2} key={card.boardNum}>
                <Link
                  to={COMMUNITY.FIND_DETAIL(card.boardNum)}
                  style={{ textDecoration: "none" }}
                >
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
          })}
        </Grid>
      </ThemeProvider>
    );
  } else if (find.length === 0 && id === "find") {
    return (
      <ThemeProvider theme={CustomTheme}>
        <Typography
          className="myOrderListTitle"
          sx={titleSx}
          border={3}
          borderColor="#ffbd59"
          mb={4}
        >
          목격 제보 게시판
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
  }
  if (flea && flea.length > 0 && id === "flea") {
    return (
      <ThemeProvider theme={CustomTheme}>
        <Typography
          className="myOrderListTitle"
          sx={titleSx}
          border={3}
          borderColor="#ffbd59"
          mb={4}
        >
          매매장터
        </Typography>
        <div className="card-container">
          {visibleItems.map((item, index) => (
            <article className="flat-card" key={index}>
              <Link
                className="article-link"
                to={"{COMMUNITY.FLEA_DETAIL(item.boardNum)}"}
              >
                <div className="card-photo">
                  <img
                    alt="noImg"
                    src={item.imgThumbnail}
                    onClick={() => navigate(COMMUNITY.FLEA_DETAIL)}
                  />
                </div>
                <div className="article-info">
                  <div className="article-title-content">
                    <span className="article-title">{item.fleaSubject}</span>
                    <span className="article-content">{item.fleaContent}</span>
                  </div>
                  <p className="article-price">{item.fleaCost}</p>
                  <section className="article-sub-info">
                    <span className="article-watch">
                      <img
                        className="watch-icon"
                        alt="Watch count"
                        src="/images/like.png"
                      />
                      {item.fleaLike}
                    </span>
                  </section>
                </div>
              </Link>
            </article>
          ))}
        </div>
        {!isLastPage && (
          <div className="more-item">
            <button className="more-btn" onClick={handleLoadMore}>
              더보기
            </button>
          </div>
        )}
      </ThemeProvider>
    );
  } else if (flea.length === 0 && id === "flea") {
    return (
      <ThemeProvider theme={CustomTheme}>
        <Typography
          className="myOrderListTitle"
          sx={titleSx}
          border={3}
          borderColor="#ffbd59"
          mb={4}
        >
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
  }
  if (free && free.length > 0 && id === "free") {
    return (
      <ThemeProvider theme={CustomTheme}>
        <Typography
          sx={titleSx}
          border={3}
          borderColor="#ffbd59"
          className="myOrderListTitle"
          mb={4}
        >
          자유게시판
        </Typography>
        <TableContainer className={classes.tablecontainer} component={Paper}>
          <Table aria-label="customized table" className={classes.table}>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell
                  align="center"
                  sx={{ minWidth: 10, background: "#FBD385" }}
                >
                  No.
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ minWidth: 200, background: "#FBD385" }}
                >
                  제목
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ minWidth: 50, background: "#FBD385" }}
                >
                  작성자
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ minWidth: 50, background: "#FBD385" }}
                >
                  조회수
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ minWidth: 10, background: "#FBD385" }}
                  onClick={handleSortRequest}
                >
                  <TableSortLabel active={false} direction={orderDirection}>
                    작성일
                  </TableSortLabel>
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {free.map((card) => {
                return (
                  <StyledTableRow
                    key={card.boardNum}
                    className={classes.content}
                  >
                    <StyledTableCell align="center" sx={{ minWidth: 10 }}>
                      {card.boardNum}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 300 }}>
                      <Link
                        to={COMMUNITY.FREE_DETAIL(card.boardNum)}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {card.freeSubject}
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                      {card.memberNickName}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                      {card.freeCount}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                      {card.freeDate}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
    );
  } else if (free.length === 0 && id === "free") {
    return (
      <ThemeProvider theme={CustomTheme}>
        <Typography
          className="myOrderListTitle"
          sx={titleSx}
          border={3}
          borderColor="#ffbd59"
          mb={4}
        >
          자유게시판
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
  }
  if (review && review.length > 0 && id === "review") {
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
          <S.CardGrid>
            {review.map((card) => (
              <VolunteerReviewCard {...card} key={card.boardNum} />
            ))}
          </S.CardGrid>
        </ThemeProvider>
      </>
    );
  } else if (review.length === 0 && id === "review") {
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

const CardImage = styleds.img`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
`;

const CardTitle = styleds.p`
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

const CardWritter = styleds.p`
  font-size: 14px;
  color: #888;
  float: left;
  margin-left: 10px;
`;

const CardCount = styleds.p`
  font-size: 14px;
  color: #888;
  float: right;
  margin-right: 10px;
`;
export default MyPageBoard;
