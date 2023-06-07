import {
  Alert,
  Box,
  Button,
  Container,
  Modal,
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
import { useNavigate } from "react-router-dom";
import { deleteData, detailPath } from "./FetchBoardData";
import EventDetailModal from "./EventDetailModal";
import NoticeDetailModal from "./NoticeDetailModal";

const AdminTable = (props) => {
  const navigate = useNavigate();
  const { data, setPage, setRowsPerPage, reload, setReload } = props;

  //data가 바뀌는 상황
  useEffect(() => {
    console.log("data:", data);
  }, [data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setReload(true);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setReload(true);
  };

  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selecteBoard, setSelectedBoard] = useState();

  const onDelete = ({ boardName, boardNums }) => {
    deleteData({ boardName, boardNums })
      .then((response) => {
        setOpenDeteteModal(response.data);
      })
      .catch((error) => {
        console.log("에러발생:", error);
        alert("에러발생:", error);
      });
  };
  const [openDeleteModal, setOpenDeteteModal] = useState(false);
  const handleDeleteModalClose = () => {
    setOpenDeteteModal(false);
    setReload(true);
  };

  return reload ? (
    <LoadingPage />
  ) : (
    <ThemeProvider theme={CustomTheme}>
      <Table>
        <TableHead>
          <TableRow sx={{ textAlign: "center" }}>
            <TableCell sx={{ ...TableHeadSx, justifySelf: "start" }}>
              No
            </TableCell>
            <TableCell sx={{ ...TableHeadSx, justifySelf: "start" }}>
              게시판명
            </TableCell>
            <TableCell sx={{ ...TableHeadSx, justifySelf: "start" }}>
              제목
            </TableCell>
            <TableCell sx={{ ...TableHeadSx, justifySelf: "end" }}>
              작성자
            </TableCell>
            <TableCell sx={{ ...TableHeadSx, justifySelf: "end" }}>
              작성날짜
            </TableCell>
            <TableCell sx={{ ...TableHeadSx, justifySelf: "end" }}>
              내용
            </TableCell>
            <TableCell sx={{ ...TableHeadSx, justifySelf: "end" }}>
              변경
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.boardName !== "" &&
            data.board &&
            data.board.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      ...TableBodySx,
                      width: "80px",
                      justifySelf: "flex-start",
                    }}
                  >
                    {data.totalElements - data.rowsPerPage * data.page - index}
                  </TableCell>
                  <TableCell
                    sx={{
                      ...TableBodySx,
                      width: "150px",
                      justifySelf: "flex-start",
                    }}
                  >
                    {data.boardName}
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
                  <TableCell
                    align="center"
                    sx={{ ...TableBodySx, width: "150px", justifySelf: "end" }}
                  >
                    {item.memberId}
                  </TableCell>
                  <TableCell
                    sx={{ ...TableBodySx, width: "50px", justifySelf: "end" }}
                  >
                    {dayjs(item.postDate).format("YYYY/MM/DD HH:mm:ss")}
                  </TableCell>
                  <TableCell
                    sx={{ ...TableBodySx, width: "110px", justifySelf: "end" }}
                  >
                    <Button
                      onClick={() => {
                        if (
                          data.boardName === "공지사항" ||
                          data.boardName === "이벤트"
                        ) {
                          setSelectedBoard(item);
                          setOpenDetailModal(true);
                        } else {
                          navigate(detailPath(data.boardName, item.boardNum), {
                            state: {
                              page: data.page,
                              limit: data.rowsPerPage,
                              search: data.search,
                              search_mode: data.search_mode,
                            },
                          });
                        }
                      }}
                    >
                      상세보기
                    </Button>
                  </TableCell>
                  <TableCell
                    sx={{ ...TableBodySx, width: "120px", justifySelf: "end" }}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() =>
                        onDelete({
                          boardName: data.boardName,
                          boardNums: [item.boardNum],
                        })
                      }
                    >
                      삭제
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      {data.board.length > 0 ? (
        <Box sx={{ justifySelf: "flex-end" }}>
          <TablePagination
            component="div"
            count={data.totalElements}
            page={data.page}
            rowsPerPage={data.rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      ) : (
        data.boardName.length > 0 && (
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Table aria-label="caption table" overflow="hidden">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ height: 250 }}>
                    작성된 게시물이 없습니다.
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </Container>
          // <Box
          //   sx={{
          //     width: "100%",
          //     height: "200px",
          //     justifyContent: "center",
          //     display: "flex",
          //     alignItems: "center",
          //   }}
          // >
          //   작성된 게시물이 없습니다.
          // </Box>
        )
      )}
      <Modal
        p={0}
        m={0}
        open={openDetailModal}
        onClose={() => setOpenDetailModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Alert icon={false} sx={modalStyle}>
          {data.boardName === "공지사항" && (
            <NoticeDetailModal
              board={selecteBoard}
              setReload={setReload}
              setOpenDetailModal={setOpenDetailModal}
            />
          )}
          {data.boardName === "이벤트" && (
            <EventDetailModal
              board={selecteBoard}
              setReload={setReload}
              setOpenDetailModal={setOpenDetailModal}
            />
          )}
        </Alert>
      </Modal>
      <Modal
        open={openDeleteModal}
        onClose={handleDeleteModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Alert sx={deleteModalStyle} severity="success">
          삭제완료!
        </Alert>
      </Modal>
    </ThemeProvider>
  );
};

const TableHeadSx = {
  fontWeight: "bold",
  textAlign: "center",
};

const TableBodySx = {
  textAlign: "center",
  // width: "fit-content",
};

const modalStyle = {
  // 모달 스타일
  position: "absolute",
  overflow: "auto",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  maxWidth: "1150px",
  minWidth: "790px",
  height: "80vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
};
const deleteModalStyle = {
  // 모달 스타일
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default AdminTable;
