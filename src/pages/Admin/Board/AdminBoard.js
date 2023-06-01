import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  ThemeProvider,
} from "@mui/material";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";
import SearchBar from "../../../components/common/SearchBar";
import { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import dayjs from "dayjs";

const boardName = {
  notice: "공지사항",
  event: "이벤트",
  adoptReview: "입양후기게시판",
  missing: "실종동물게시판",
  find: "목격제보게시판",
  free: "자유게시판",
  flea: "매매장터",
  volunteer: "봉사하기",
  volunteerReview: "봉사후기",
};

const AdminBoard = () => {
  const [category, setCategory] = useState("");
  const [board, setBoard] = useState(null);
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderTarget, setOrderTarget] = useState();
  const [orderBy, setOrderBy] = useState("asc");

  useEffect(() => {
    switch (category) {
      case boardName.notice:
        getData(page, rowsPerPage, null, null);
        break;
      case boardName.event:
        break;
      default:
        setBoard(null);
    }
  }, [category, page, rowsPerPage]);

  const getData = (page, limit, search, search_mode) => {
    let queryText = "/notice/list";
    if (page) {
      queryText += "?page=" + page;
      if (limit) queryText += "&limit=" + limit;
      if (search)
        search_mode
          ? (queryText +=
              "&search=" +
              encodeURIComponent(search) +
              "&search_mode=" +
              search_mode)
          : (queryText += "&search=" + encodeURIComponent(search));
    }
    console.log("queryText:", queryText);
    axios
      .get(queryText)
      .then((response) => {
        console.log(response);
        setBoard(response.data.content);
        setPage(parseInt(response.data.number));
        setTotalElements(parseInt(response.data.totalElements));
      })
      .catch((error) => {
        console.error("axios 오류 : ", error);
      });
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOrderBy = () => {
    orderBy === "asc" ? setOrderBy("desc") : setOrderBy("asc");
  };

  const handleCheck = () => {};

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };

  const headCells = {
    no: "No",
    category: "카테고리",
    title: "제목",
    writer: "작성자",
    postDate: "작성날짜",
    content: "내용",
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 1, mb: 2 }}>
          <Box display={"flex"} justifyContent={"space-between"} mt={2} mb={2}>
            <FormControl size="small">
              <InputLabel id="category-label">카테고리</InputLabel>
              <Select
                value={category}
                onChange={handleChangeCategory}
                labelId="category-label"
                label="카테고리"
                MenuProps={MenuProps}
                sx={{ width: "160px" }}
              >
                <MenuItem value={""}>선택</MenuItem>
                <ListSubheader>------ 소개 ------</ListSubheader>
                <MenuItem value={boardName.notice}>{boardName.notice}</MenuItem>
                <MenuItem value={boardName.event}>{boardName.event}</MenuItem>
                <ListSubheader>------ 입양 ------</ListSubheader>
                <MenuItem value={boardName.adoptReview}>
                  {boardName.adoptReview}
                </MenuItem>
                <ListSubheader>---- 커뮤니티 ----</ListSubheader>
                <MenuItem value={boardName.missing}>
                  {boardName.missing}
                </MenuItem>
                <MenuItem value={boardName.find}>{boardName.find}</MenuItem>
                <MenuItem value={boardName.free}>{boardName.free}</MenuItem>
                <MenuItem value={boardName.flea}>{boardName.flea}</MenuItem>
                <ListSubheader>------ 후원 ------</ListSubheader>
                <MenuItem value={boardName.volunteer}>
                  {boardName.volunteer}
                </MenuItem>
                <MenuItem value={boardName.volunteerReview}>
                  {boardName.volunteerReview}
                </MenuItem>
              </Select>
            </FormControl>
            <Box display={"flex"} justifyContent={"flex-end"}>
              <FormControl size="small" sx={{ mr: 2 }}>
                <Select defaultValue={1}>
                  <MenuItem value={1}>제목 + 내용</MenuItem>
                  <MenuItem value={2}>제목</MenuItem>
                  <MenuItem value={3}>내용</MenuItem>
                </Select>
              </FormControl>
              <SearchBar />
            </Box>
          </Box>
        </Paper>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox onClick={handleCheck} />
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderTarget === "No"}
                    direction={orderBy}
                    onClick={handleOrderBy}
                  >
                    No
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderTarget === "category"}
                    direction={orderBy}
                    onClick={handleOrderBy}
                  >
                    카테고리
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderTarget === "title"}
                    direction={orderBy}
                    onClick={handleOrderBy}
                  >
                    제목
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderTarget === "writer"}
                    direction={orderBy}
                    onClick={handleOrderBy}
                  >
                    작성자
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderTarget === "postDate"}
                    direction={orderBy}
                    onClick={handleOrderBy}
                  >
                    작성날짜
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderTarget === "content"}
                    direction={orderBy}
                    onClick={handleOrderBy}
                  >
                    내용
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {board &&
                board.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <Checkbox className="item-checkbox" />
                      </TableCell>
                      <TableCell>{item.num}</TableCell>
                      <TableCell>{category}</TableCell>
                      <TableCell>{item.subject}</TableCell>
                      <TableCell>{item.writer}</TableCell>
                      <TableCell>
                        {dayjs(item.postDate).format("YYYY/MM/DD HH:mm:ss")}
                      </TableCell>
                      <TableCell>
                        <Button variant="contained">상세보기</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <Box sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Button variant="contained" color="ff8282">
                삭제
              </Button>
            </Box>
            <TablePagination
              component="div"
              count={totalElements}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default AdminBoard;
