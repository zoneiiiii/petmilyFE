import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";
import Loading from "../../../components/Loading/LoadingPage";
import NotFound from "../../NotFound/NotFound";
import DOMPurify from "dompurify";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import styleds from "styled-components";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { ADMIN } from "../../../constants/PageURL";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight: "bold",
    border: 0,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: 0,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

//modal style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "940px",
  height: "400px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const AdminQnADetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qnaData, setQnaData] = useState(null);
  const [content, setContent] = useState("");
  const [contentError, setContentError] = useState(false);
  const [file, setFile] = useState("");
  const [isLoading, setIsLoading] = useState(true); //로딩 상태
  const [open, setOpen] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    //게시글 Detail 호출
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/board/qna/${id}`
        ); //게시글 Detail 데이터  호출
        setQnaData(response.data);
      } catch (error) {
        console.error("Error fetching data : ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (isLoading) {
    return <Loading />; // 로딩 중일 때 표시할 컴포넌트
  }

  if (!qnaData) {
    return <NotFound />; //존재하지 않는 번호를 넣었을 때 표시할 컴포넌트
  }

  const handleReset = () => {
    setContent("");
    navigate(ADMIN.QNA);
  };

  const validate = () => {
    let isError = false;
    if (content === "") {
      isError = true;
      setContentError(true);
    }
    return isError;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const isError = validate();
    if (isError) {
      return;
    }

    try {
      await axios.put(`/board/qna/${qnaData.boardNum}`, {
        qnaStatus: 1,
        adminAnswer: content,
      });
      console.log(qnaData.boardNum);
      setSubmitOpen(true);
      setTimeout(() => {
        handleReset();
      }, 1000);
      //navigate(ADMIN.QNA);
    } catch (error) {
      console.error("데이터 전송 실패 : ", error);
    }
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 1, mb: 2 }}>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  제목 : {qnaData.qnaSubject}
                </StyledTableCell>
                <StyledTableCell
                  align="right"
                  sx={{ fontWeight: "bold", width: "180px" }}
                >
                  작성자 : {qnaData.memberId}
                </StyledTableCell>
                <StyledTableCell
                  align="right"
                  sx={{
                    fontWeight: "bold",
                    width: "130px",
                  }}
                >
                  {qnaData.qnaDate}
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell
                  colSpan={3}
                  height="200px"
                  dangerouslySetInnerHTML={createMarkup(qnaData.qnaContent)}
                />
              </StyledTableRow>
            </TableBody>
          </Table>
        </Paper>
        <Paper>
          <Table>
            <TableHead>
              <StyledTableRow>
                {qnaData.qnaStatus === false ? (
                  <StyledTableCell
                    colSpan={3}
                    sx={{ height: 100, color: "gray" }}
                    align="center"
                  >
                    답변이 등록되지 않았습니다.
                  </StyledTableCell>
                ) : (
                  <StyledTableCell
                    colSpan={3}
                    sx={{ height: 100, color: "gray" }}
                    align="center"
                  >
                    {qnaData.adminAnswer}
                  </StyledTableCell>
                )}
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell align="center" colSpan={3}>
                  {qnaData.qnaStatus === false ? (
                    <ButtonStyle>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={handleOpen}
                      >
                        답변 작성
                      </Button>
                    </ButtonStyle>
                  ) : (
                    ""
                  )}
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
          </Table>
        </Paper>
      </Container>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography
            variant="h6"
            component="h2"
            sx={{ textAlign: "center", mb: 2 }}
          >
            답변을 작성하세요.
          </Typography>
          <TextField
            multiline
            placeholder="내용을 입력하세요."
            rows={8}
            data={content}
            onChange={(event) => {
              setContent(event.target.value);
              setContentError(false);
            }}
            fullWidth
          ></TextField>
          <FormHelperText sx={{ color: "red" }}>
            {contentError ? "내용을 입력해 주세요." : null}
          </FormHelperText>
          <ButtonStyle>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: "90px", height: "30px", mt: "10px", mr: "10px" }}
              onClick={handleUpdate}
            >
              글쓰기
            </Button>
            <Button
              variant="contained"
              color="warning"
              sx={{ width: "90px", height: "30px", mt: "10px" }}
              onClick={handleReset}
            >
              취소
            </Button>
          </ButtonStyle>
        </Box>
      </Modal>
      <Modal
        open={submitOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Alert sx={modalStyle} severity="success">
          작성 완료!
        </Alert>
      </Modal>
    </ThemeProvider>
  );
};
const ButtonStyle = styleds.div`
  margin-top: 5px;
  text-align: center;
  }
`;
export default AdminQnADetail;
