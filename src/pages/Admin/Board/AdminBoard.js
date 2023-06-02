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
import BoardCategorySelector from "./BoardCategorySelector";
import SearchBox from "./SearchBox";
import AdminTable from "./AdminTable";

const AdminBoard = () => {
  const [category, setCategory] = useState({ value: "", path: "" });
  const [board, setBoard] = useState(null);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState();
  const [search_mode, setSearch_mode] = useState();
  const [totalElements, setTotalElements] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (category.value.length > 0) getData();
    console.log("after getData page", page);
  }, [category, page, rowsPerPage]);

  const getData = () => {
    axios
      .get(setQuery(category, page, rowsPerPage))
      .then((response) => {
        console.log(response);
        setBoard(
          response.data.length !== 0 && response.data.content.length !== 0
            ? response.data.content
            : []
        );
        setPage(
          response.data.length !== 0 && response.data.content.length !== 0
            ? parseInt(response.data.number)
            : 0
        );
        setTotalElements(
          response.data.length !== 0 && response.data.content.length !== 0
            ? parseInt(response.data.totalElements)
            : 0
        );
      })
      .catch((error) => {
        console.error("axios 오류 : ", error);
        setBoard(null);
        setPage(0);
        setTotalElements(0);
      });
  };

  const setQuery = () => {
    console.log("query:", category);
    let queryText = category.path;
    if (page !== undefined) {
      queryText += "?page=" + page;
      if (rowsPerPage) queryText += "&limit=" + rowsPerPage;
      if (search)
        search_mode
          ? (queryText +=
              "&search=" +
              encodeURIComponent(search) +
              "&search_mode=" +
              search_mode)
          : (queryText += "&search=" + encodeURIComponent(search));
    }
    return queryText;
  };

  // const getData = (page, limit, search, search_mode) => {
  //   console.log("page:", page, "rowsPerPage", rowsPerPage);
  //   let queryText = "/notice/list";
  //   if (page !== undefined) {
  //     queryText += "?page=" + page;
  //     if (limit) queryText += "&limit=" + limit;
  //     if (search)
  //       search_mode
  //         ? (queryText +=
  //             "&search=" +
  //             encodeURIComponent(search) +
  //             "&search_mode=" +
  //             search_mode)
  //         : (queryText += "&search=" + encodeURIComponent(search));
  //   }
  //   // console.log("queryText:", queryText);
  //   axios
  //     .get(queryText)
  //     .then((response) => {
  //       console.log(response);
  //       setBoard(response.data.content);
  //       setPage(parseInt(response.data.number));
  //       setTotalElements(parseInt(response.data.totalElements));
  //       setShow(true);
  //     })
  //     .catch((error) => {
  //       console.error("axios 오류 : ", error);
  //     });
  // };

  return (
    <ThemeProvider theme={CustomTheme}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 1, mb: 2 }}>
          <Box display={"flex"} justifyContent={"space-between"} mt={2} mb={2}>
            <BoardCategorySelector
              category={category}
              setCategory={setCategory}
            />
            <SearchBox />
          </Box>
        </Paper>
        <AdminTable
          board={board}
          category={category}
          page={page}
          setPage={setPage}
          totalElements={totalElements}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
        {/* <Paper>
          <Table>
            <TableHead>
              <TableRow sx={{ textAlign: "center" }}>
                <TableCell>
                  <Checkbox onClick={handleAllCheckboxClick} />
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
                        <Checkbox
                          key={index}
                          checked={checkboxes[index]}
                          onClick={(event) => handleCheckboxClick(event, index)}
                        />
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
        </Paper> */}
      </Container>
    </ThemeProvider>
  );
};

export default AdminBoard;
