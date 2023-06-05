import {
  Box,
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  ThemeProvider,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";
import LoadingPage from "../../Loading/LoadingPage";

const AdminTable = (props) => {
  const {
    data,
    board,
    category,
    page,
    setPage,
    totalElements,
    rowsPerPage,
    setRowsPerPage,
  } = props;
  const [checkboxes, setCheckboxes] = useState(
    board ? Array(board.length).fill(false) : []
  );
  const [allChecked, setAllChecked] = useState(false);
  useEffect(() => {
    console.log(checkboxes);
    console.log(allChecked);
  });

  useEffect(() => {
    console.log("data:", data);
    console.log("board:", board);
    console.log("category:", category);
  }, [data, board, category]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCheckboxClick = (event, index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = event.target.checked;
    setCheckboxes(newCheckboxes);
  };

  const handleAllCheckboxClick = (event) => {
    const isChecked = event.target.checked;
    const updatedCheckboxes = checkboxes.map(() => isChecked);
    setCheckboxes(updatedCheckboxes);
    setAllChecked(isChecked);
  };

  const onDelete = () => {
    const deleteBuffer = board
      .filter((item, index) => checkboxes[index])
      .map((item) => item.num);
    console.log("deleteBuffer:", deleteBuffer);
  };

  return category.value === "" || data ? (
    <ThemeProvider theme={CustomTheme}>
      <Table>
        <TableHead>
          <TableRow sx={{ textAlign: "center" }}>
            <TableCell sx={{ width: "45px" }}>
              <Checkbox onClick={handleAllCheckboxClick} />
            </TableCell>
            <TableCell sx={TableHeadSx}>No</TableCell>
            <TableCell sx={TableHeadSx}>카테고리</TableCell>
            <TableCell sx={TableHeadSx}>제목</TableCell>
            <TableCell sx={TableHeadSx}>작성자</TableCell>
            <TableCell sx={TableHeadSx}>작성날짜</TableCell>
            <TableCell sx={TableHeadSx}>내용</TableCell>
          </TableRow>
        </TableHead>
        {category.value && (
          <TableBody>
            {data.board &&
              data.board.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell width={"fit-content"}>
                      <Checkbox
                        key={index}
                        checked={checkboxes[index]}
                        onClick={(event) => handleCheckboxClick(event, index)}
                      />
                    </TableCell>
                    <TableCell sx={{ ...TableBodySx, width: "50px" }}>
                      {item.boardNum}
                    </TableCell>
                    <TableCell sx={{ ...TableBodySx, width: "150px" }}>
                      {item.boardId}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...TableBodySx,
                        maxWidth: "400px",
                        textAlign: "start",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.subject}
                    </TableCell>
                    <TableCell sx={{ ...TableBodySx, width: "120px" }}>
                      {item.memberId}
                    </TableCell>
                    <TableCell sx={{ ...TableBodySx, width: "220px" }}>
                      {dayjs(item.postDate).format("YYYY/MM/DD HH:mm:ss")}
                    </TableCell>
                    <TableCell sx={{ ...TableBodySx, width: "130px" }}>
                      <Button variant="contained">상세보기</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        )}
      </Table>
      {category.value && (
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Button variant="contained" color="error" onClick={onDelete}>
              삭제
            </Button>
          </Box>
          <TablePagination
            component="div"
            count={data.totalElements}
            page={data.page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      )}
    </ThemeProvider>
  ) : (
    <LoadingPage />
  );
};

const TableHeadSx = {
  fontWeight: "bold",
  textAlign: "center",
};

const TableBodySx = {
  textAlign: "center",
  width: "fit-content",
};

export default AdminTable;
