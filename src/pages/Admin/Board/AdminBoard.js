import {
  Alert,
  Box,
  Button,
  Container,
  Modal,
  Paper,
  ThemeProvider,
} from "@mui/material";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";
import { useEffect, useState } from "react";
import BoardSelector from "./BoardSelector";
import SearchBox from "./SearchBox";
import AdminBoardTable from "./AdminBoardTable";
import { fetchData } from "./FetchBoardData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MAIN } from "../../../constants/PageURL";
import EventWriteModal from "./EventWriteModal";
import NoticeWriteModal from "./NoticeWriteModal";

const defaultSearchMode = "subject_content";
const AdminBoard = () => {
  const navigate = useNavigate();
  const [boardName, setBoardName] = useState("");
  const [data, setData] = useState(null);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [search_mode, setSearch_mode] = useState(defaultSearchMode);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [reload, setReload] = useState(true);

  const [openAdminModal, setOpenAdminModal] = useState(false);
  const handleAdminModalClose = () => {
    setOpenAdminModal(false);
    navigate(MAIN);
  };

  const initOption = () => {
    setPage(0);
    setRowsPerPage(10);
    setSearch("");
    setSearch_mode(defaultSearchMode);
    setReload(true);
  };

  useEffect(() => {
    console.log("data:", data);
    console.log("page:", page);
    console.log("boardName:", boardName);
    console.log("search:", search);
    console.log("search_mode:", search_mode);
    console.log("rowsPerPage:", rowsPerPage);
    console.log("reload:", reload);
  });

  useEffect(() => {
    axios
      .get("/admin/check-admin")
      .then((response) => {
        if (!response.data) {
          setOpenAdminModal(true);
        }
      })
      .catch((error) => {
        console.error("에러발생:", error);
        alert("에러발생: " + error);
        navigate(MAIN);
      });
  }, []);

  useEffect(() => {
    console.log(boardName, page, rowsPerPage);
    reload &&
      fetchData({
        boardName: boardName,
        page: page,
        rowsPerPage: rowsPerPage,
        search: search,
        search_mode: search_mode,
        setData: setData,
        setReload: setReload,
      });
    console.log("after getData page", page);
  }, [boardName, page, rowsPerPage, reload]);

  const [openWriteModal, setOpenWriteModal] = useState(false); // 모달 상태
  const handleWriteModalClose = () => {
    setOpenWriteModal(false);
    setPage(0);
    setReload(true);
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 1, mb: 2 }}>
          <Box display={"flex"} justifyContent={"space-between"} mt={2} mb={2}>
            <Box display={"flex"}>
              <BoardSelector
                boardname={boardName}
                setBoardName={setBoardName}
                initOption={initOption}
              />
              {(boardName === "공지사항" || boardName === "이벤트") && (
                <Box sx={{ textAlign: "center" }}>
                  <Button onClick={() => setOpenWriteModal(true)}>
                    글쓰기
                  </Button>
                </Box>
              )}
            </Box>
            <SearchBox
              setSearch={setSearch}
              setPage={setPage}
              setSearch_mode={setSearch_mode}
              SearchbarWidth={"250px"}
              search={search}
              search_mode={search_mode}
              setReload={setReload}
            />
          </Box>
        </Paper>
        <Paper>
          <AdminBoardTable
            data={data}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
            reload={reload}
            setReload={setReload}
          />
        </Paper>
        <Modal
          open={openAdminModal}
          onClose={handleAdminModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Alert
            sx={authModalStyle}
            severity="error"
            onClose={handleAdminModalClose}
          >
            접근 권한이 없습니다!
          </Alert>
        </Modal>

        <Modal
          p={0}
          m={0}
          open={openWriteModal}
          onClose={handleWriteModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Alert icon={false} sx={modalStyle}>
            {boardName === "공지사항" && (
              <NoticeWriteModal modalClose={handleWriteModalClose} />
            )}
            {boardName === "이벤트" && (
              <EventWriteModal modalClose={handleWriteModalClose} />
            )}
          </Alert>
        </Modal>
      </Container>
    </ThemeProvider>
  );
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

const authModalStyle = {
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

export default AdminBoard;
