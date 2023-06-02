import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  Grid,
  Pagination,
} from "@mui/material";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import { tableCellClasses } from "@mui/material/TableCell";
import { makeStyles } from "@material-ui/core";
import { AuthContext } from "../../contexts/AuthContexts";
import axios from "axios";
import { COMMUNITY } from "../../constants/PageURL";
import { styled } from "@mui/material/styles";
import styleds from "styled-components";

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

const MainContainer = styleds.div`
width: 940px;
// width: 1150px;
max-width: 1150px;
min-width: 790px;
`;

const useStyles = makeStyles({
  // 게시글 목록 css
  title: {
    textAlign: "center",
  },

  tablecontainer: {
    minWidth: 700,
    margin: "auto",
  },

  table: {
    margin: "auto",
  },

  content: {
    overflow: "hidden",
    lineHeight: "1.4em",
    height: "1.4em",
    textOverflow: "ellipsis",
  },

  pagination: {
    display: "flex",
    justifyContent: "center",
  },

  write: {
    display: "flex",
    float: "right",
  },

  writelink: {
    textDecoration: "none",
  },

  subject: {
    fontSize: "0.9rem",
    lineHeight: "1.4em",
    height: "1.4em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
  },
});

const MyPageFree = () => {
  const [free, setFree] = useState([]);
  const classes = useStyles(); //freeboard 스타일
  const { userNum } = useContext(AuthContext);
  const [rowData, setRowData] = useState(free.length); // 날짜 sort 기능을 위한 상수 저장 정의(freeboard)
  const [orderDirection, setOrderDirection] = useState("asc"); // 날짜 sort 기능(freeboard)
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0); // 페이지 수 계산
  const itemsPerPage = 10; // 한페이지에 보여줄 페이지의 개수
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const lists = free.slice(startIndex, endIndex); // 현재 페이지에 해당하는 카드 데이터 계산
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
        .get(`/mypage/free/${userNum}?${requestParams}`)
        .then((response) => {
          const totalPages = response.data.totalPages;
          if (urlPage > totalPages) {
            return;
          }
          setFree(response.data.content);
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
    setRowData(sortArray(lists, orderDirection));
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
  };
  /* sort end */

  if (free.length === 0) {
    return (
      <ThemeProvider theme={CustomTheme}>
        <Typography sx={titleSx} border={3} borderColor="#ffbd59" mb={4}>
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
  } else {
    return (
      <ThemeProvider theme={CustomTheme}>
        <Typography sx={titleSx} border={3} borderColor="#ffbd59" mb={4}>
          자유게시판
        </Typography>
        <MainContainer className="result-container"></MainContainer>
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
                  sx={{ minWidth: 40, maxWidth: 40, background: "#FBD385" }}
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
                  sx={{ minWidth: 90, background: "#FBD385" }}
                  onClick={handleSortRequest}
                >
                  <TableSortLabel active={false} direction={orderDirection}>
                    작성일
                  </TableSortLabel>
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {free &&
                free.map((list) => {
                  return (
                    <StyledTableRow
                      key={list.boardNum}
                      className={classes.content}
                    >
                      <StyledTableCell align="center" sx={{ minWidth: 10 }}>
                        {list.boardNum}
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ minWidth: 300 }}>
                        <Link
                          to={COMMUNITY.FREE_DETAIL(list.boardNum)}
                          className={classes.subject}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          {list.freeSubject}
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                        {list.memberNickName}
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                        {list.freeCount}
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                        {list.freeDate}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
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
export default MyPageFree;
