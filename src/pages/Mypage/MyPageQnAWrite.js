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
  Grid,
} from "@mui/material";
import axios from "axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MYPAGE } from "../../constants/PageURL";

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

//테마 색상 설정
const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#FBD385",
    },
  },
});

const MyPageQnAWrite = () => {
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const [formAble, setFormAble] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    if (!subject || !content) {
      setFormAble(false);
      setOpen(true);
    } else {
      setFormAble(true);
      setOpen(true);
      document.location.href = MYPAGE.QNA;
    }
  };
  const handleReset = () => {
    setSubject("");
    setContent("");
    document.location.href = MYPAGE.QNA;
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <MyPageStyle>
          <div className="navTitle">
            <h5>문의하기</h5>
          </div>
        </MyPageStyle>

        <Table
          sx={{
            width: "70vw",
            mt: 5,
            border: "none",
          }}
        >
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>제목</TableCell>
              <TableCell>
                <TextField
                  type="text"
                  size="small"
                  value={subject}
                  fullWidth
                  onChange={(event) => {
                    setSubject(event.target.value);
                  }}
                  sx={{ borderColor: "#ccced1" }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>첨부파일</TableCell>
              <TableCell>
                <input type="file" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>내용</TableCell>
              <TableCell>
                <EditorWrapper>
                  <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    fullWidth
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setContent(data);
                    }}
                    config={{
                      toolbar: [
                        "heading",
                        "|",
                        "bold",
                        "italic",
                        "link",
                        "bulletedList",
                        "numberedList",
                        "|",
                        "indent",
                        "outdent",
                        "|",
                        "blockQuote",
                        "insertTable",
                        "mediaEmbed",
                        "undo",
                        "redo",
                      ],
                      className: "WriteEditor",
                      placeholder: "내용을 입력하세요.",
                    }}
                  />
                </EditorWrapper>{" "}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <ButtonStyle>
          <Button className="write" onClick={handleOpen}>
            글쓰기
          </Button>
          <Button className="quit" onClick={handleReset}>
            취소
          </Button>
        </ButtonStyle>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {formAble ? (
            <Alert sx={modalStyle} severity="success">
              작성 완료!
            </Alert>
          ) : (
            <Alert sx={modalStyle} severity="warning">
              제목과 내용을 모두 입력해주세요.
            </Alert>
          )}
        </Modal>
      </ThemeProvider>
    </>
  );
};

const MyPageStyle = styled.div`
  .navTitle {
    border: 1px solid #fbd385;
    width: 200px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const EditorWrapper = styled.div`
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 300px;

    &:focus {
      border: 2px solid #fbd385;
    }
  }
`;
const ButtonStyle = styled.div`
  margin-top: 5px;
  text-align: center;
  .write {
    background-color: #fbd385;
    color: white;
    font-weight: bold;
    width: 90px;
    height: 30px;
    margin-top: 10px;
    margin-right: 10px;
    &:hover {
      background-color: #facc73;
    }
    &:focus {
      background-color: #facc73;
    }
  }
  .quit {
    background-color: #bfbfbf;
    color: white;
    font-weight: bold;
    width: 90px;
    height: 30px;
    margin-top: 10px;
    &:hover {
      background-color: #b2b0b0;
    }
    &:focus {
      background-color: #b2b0b0;
    }
  }
`;

export default MyPageQnAWrite;
