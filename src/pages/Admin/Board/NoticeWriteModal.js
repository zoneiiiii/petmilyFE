import {
  Alert,
  Button,
  FormHelperText,
  Modal,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";
import styled from "styled-components";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { MyCustomUploadAdapterPlugin } from "../../../components/common/UploadAdapter";
import axios from "axios";
import S from "./WriteStyle";

const NoticeWriteModal = ({ modalClose }) => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  //< -- 유효성 검증 상태
  const [subjectError, setSubjectError] = useState(false);
  const [contentError, setContentError] = useState(false);

  const validate = () => {
    let isError = false;
    if (subject.trim() === "") {
      setSubjectError(true);
      isError = true;
    }
    if (content.trim() === "") {
      setContentError(true);
      isError = true;
    }

    return isError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isError = validate();
    if (isError) return;

    try {
      await axios.post("/notice/insert", {
        subject: subject,
        content: content,
      });
      setOpenModal(true);
      setTimeout(() => {
        handleModalClose();
      }, 1000);
    } catch (error) {
      console.error("데이터 전송 실패 : ", error);
    }
  };

  const [openModal, setOpenModal] = useState(false); // 모달 상태
  const handleModalClose = () => {
    // 모달닫는 함수
    setOpenModal(false);
    modalClose();
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <S.MainContainer className="result-container">
        <S.TitleContainer>
          <S.Board>✍ 게시글 작성</S.Board>
          <Typography variant="subtitle3">공지사항</Typography>
        </S.TitleContainer>
        <S.Container>
          <S.FormWrapper>
            <form onSubmit={handleSubmit}>
              <S.FormRowWithError>
                <TextField
                  label="제목"
                  value={subject}
                  size="small"
                  fullWidth
                  onChange={(event) => {
                    setSubjectError(false);
                    setSubject(event.target.value);
                  }}
                />
                <S.ErrorMsg>
                  <FormHelperText sx={{ color: "red", fontSize: "15px" }}>
                    {subjectError ? "제목을 입력해 주세요." : null}
                  </FormHelperText>
                </S.ErrorMsg>
              </S.FormRowWithError>
              <S.FormRowWithError>
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
                      htmlEmbed: {
                        showPreviews: true,
                      },
                    }}
                  />
                </EditorWrapper>
                <S.ErrorMsg>
                  <FormHelperText sx={{ color: "red", fontSize: "15px" }}>
                    {contentError ? "내용을 입력해 주세요." : null}
                  </FormHelperText>
                </S.ErrorMsg>
              </S.FormRowWithError>
              <S.FormRow>
                <S.ButtonGroup>
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    variant="contained"
                  >
                    등록
                  </Button>
                  <S.ButtonSpace />
                </S.ButtonGroup>
              </S.FormRow>
            </form>
          </S.FormWrapper>
          <Modal
            open={openModal}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Alert sx={S.modalStyle} severity="success">
              등록되었습니다!
            </Alert>
          </Modal>
        </S.Container>
      </S.MainContainer>
    </ThemeProvider>
  );
};

const EditorWrapper = styled.div`
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 500px;
    width: 700px;
  }

  .ck.ck-editor__editable:not(.ck-editor__nested-editable):focus {
    border-color: #fbd385;
  }
`;

export default NoticeWriteModal;
