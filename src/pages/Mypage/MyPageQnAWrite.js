import * as React from "react";
import styled from "styled-components";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  ThemeProvider,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { MYPAGE } from "../../constants/PageURL";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import { MyCustomUploadAdapterPlugin } from "../../components/common/UploadAdapter";

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

const MyPageQnAWrite = () => {
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const [subjectError, setSubjectError] = useState(false);
  const [contentError, setContentError] = useState(false);
  // const [data, setData] = useState("");
  const [file, setFile] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const handleReset = () => {
    setSubject("");
    setContent("");
    document.location.href = MYPAGE.QNA;
  };

  const validate = () => {
    let isError = false;
    if (subject === "") {
      isError = true;
      setSubjectError(true);
    }
    if (content === "") {
      isError = true;
      setContentError(true);
    }
    return isError;
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/upload", formData);
      const imageUrl = response.data;
      return imageUrl;
    } catch (error) {
      console.error("이미지 업로드 실패 : ", error);
      return null;
    }
  };

  // const location = useLocation();
  // const memberNum = location.state.num;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isError = validate();
    if (isError) {
      return;
    }
    const currentDate = new Date();
    const isoCurrentDate = new Date(
      currentDate.getTime() + 9 * 60 * 60 * 1000
    ).toISOString();

    let imageUrl = "https://via.placeholder.com/150";

    if (file) {
      const uploadedUrl = await uploadImage(file);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      }
    }

    const postData = {
      qnaSubject: subject,
      qnaContent: content,
      qnaImg: imageUrl,
      qnaDate: isoCurrentDate,
      qnaStatus: false,
      // memberNum: userNum,
    };

    try {
      await axios.post("http://localhost:8080/board/qna/write", postData, {
        withCredentials: true,
      });
      setOpen(true);
      setTimeout(() => {
        handleReset();
      }, 1000);
    } catch (error) {
      console.error("데이터 전송 실패 : ", error);
    }
  };

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
          문의하기
        </Typography>
        <Table
          sx={{
            width: "940px",
            mt: 5,
            border: "none",
          }}
        >
          <TableBody>
            <TableRow>
              {/* <TableCell sx={{ fontWeight: "bold" }}>제목</TableCell> */}
              <TableCell>
                <TextField
                  type="text"
                  size="small"
                  label="제목"
                  value={subject}
                  fullWidth
                  onChange={(event) => {
                    setSubject(event.target.value);
                    setSubjectError(false);
                  }}
                  sx={{ borderColor: "#ccced1" }}
                />
                <FormHelperText sx={{ color: "red" }}>
                  {subjectError ? "제목을 입력해 주세요." : null}
                </FormHelperText>
              </TableCell>
            </TableRow>
            <TableRow>
              {/* <TableCell sx={{ fontWeight: "bold" }}>내용</TableCell> */}
              <TableCell sx={{ width: "828px" }}>
                <EditorWrapper>
                  <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setContent(data);
                      setContentError(false);
                    }}
                    config={{
                      className: "WriteEditor",
                      placeholder: "내용을 입력하세요.",
                      extraPlugins: [MyCustomUploadAdapterPlugin],
                    }}
                    fullWidth
                  />
                </EditorWrapper>
                <FormHelperText sx={{ color: "red" }}>
                  {contentError ? "내용을 입력해 주세요." : null}
                </FormHelperText>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <ButtonStyle>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "90px", height: "30px", mt: "10px", mr: "10px" }}
            onClick={handleSubmit}
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Alert sx={modalStyle} severity="success">
            작성 완료!
          </Alert>
        </Modal>
      </ThemeProvider>
    </>
  );
};

const titleSx = {
  width: "200px",
  textAlign: "center",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "1.5rem",
  lineHeight: "50px",
};
const EditorWrapper = styled.div`
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 300px;
    // width: 940px;
    &:focus {
      border: 1px solid #fbd385;
    }
  }
`;
const ButtonStyle = styled.div`
  margin-top: 5px;
  text-align: center;
`;

export default MyPageQnAWrite;
