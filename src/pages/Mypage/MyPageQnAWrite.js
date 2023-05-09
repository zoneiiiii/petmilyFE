import * as React from "react";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import { useRef, useState } from "react";
import CustomButton from "../Login/CustomButton";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import { TextField } from "@mui/material";
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
    // document.location.href = MYPAGE.QNA;
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <MyPageStyle>
          <div className="navTitle">
            <h5>문의하기</h5>
          </div>
        </MyPageStyle>
        <Grid sx={{ width: 800, mt: 5 }}>
          <InputContainer>
            <p className="title">제목</p>
            <TextField
              type="text"
              size="small"
              value={subject}
              onChange={(event) => {
                setSubject(event.target.value);
              }}
              sx={{ width: "717px", borderColor: "#ccced1" }}
            />
          </InputContainer>
          <FileContainer>
            <p>첨부파일</p>
            <input type="file" style={{ marginTop: "10px" }} />
          </FileContainer>
          <InputContainer>
            <p className="title">내용</p>
            <EditorWrapper>
              <CKEditor
                editor={ClassicEditor}
                data={content}
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
            </EditorWrapper>
          </InputContainer>
          <br />
          <CustomButton
            label="취소"
            value="작성취소"
            onClick={handleReset}
          ></CustomButton>
          <CustomButton
            label="글쓰기"
            value="1:1문의작성"
            onClick={handleOpen}
          />
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
        </Grid>
      </ThemeProvider>
    </>
  );
};

const InputContainer = styled.div`
  display: flex;
  gap: 3rem;
  align-items: flex;
  margin-bottom: 10px;
  .title {
    font-weight: bold;
    color: #474747;
  }
`;
const FileContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex;
  margin-bottom: 10px;
  p {
    font-weight: bold;
    color: #474747;
  }
`;
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
    width: 696px;

    &:focus {
      border: 2px solid #fbd385;
    }
  }
`;

export default MyPageQnAWrite;
