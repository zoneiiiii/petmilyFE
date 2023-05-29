import React, { useLayoutEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as S from "../Support/Volunteer/VolunteerNoticeWrite.styled";
import styled from "styled-components";
import {
  TextField,
  Modal,
  Alert,
  ThemeProvider,
  FormHelperText,
} from "@mui/material";
import { ADOPT } from "../../constants/PageURL";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import axios from "axios";
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

const AdoptReviewWrite = () => {
  const [formAble, setFormAble] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const currentDate = new Date();
  const isoCurrentDate = new Date(
    currentDate.getTime() + 9 * 60 * 60 * 1000
  ).toISOString();
  console.log("is", isoCurrentDate);

  // const dateString = isoCurrentDateTime;
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [contentError, setContentError] = useState();
  const [subjectError, setSubjectError] = useState();

  // 사진 미리보기
  const [previewUrl, setPreviewUrl] = useState(null);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // const handleOpen = () => {};
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/upload", formData);
      const imageUrl = response.data;
      // setUploadedImageUrl(imageUrl);
      return imageUrl;
    } catch (error) {
      console.error("이미지 업로드 실패 : ", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title && !content) {
      setSubjectError("제목을 입력해주세요");
      setContentError("내용을 입력해주세요");
    } else if (!content) {
      setSubjectError("");
      setContentError("내용을 입력해주세요");
    } else if (!title) {
      setContentError("");
      setSubjectError("제목을 입력해주세요");
    } else {
      let imageUrl = "https://via.placeholder.com/150";

      if (file) {
        const uploadedUrl = await uploadImage(file);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      axios
        .post("/board/review/insert", {
          reviewSubject: title,
          reviewContent: content,
          imgThumbnail: imageUrl,
          reviewDate: isoCurrentDate,
        })
        .then(() => {
          alert("등록완료");
          document.location.href = ADOPT.REVIEW;
        });
      setFormAble(true);
      setOpen(true);
    }
    // 전송 로직 구현
  };

  const handleCancel = () => {
    navigate(ADOPT.REVIEW);
  };

  return (
    <>
      <S.TitleContainer>
        <S.Title>게시글 작성</S.Title>
      </S.TitleContainer>
      <S.Container>
        <ThemeProvider theme={CustomTheme}>
          <S.FormWrapper>
            <form onSubmit={handleSubmit}>
              <FormRow>
                <TextField
                  label="제목"
                  value={title}
                  size="small"
                  fullWidth
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormRow>
              <FormHelperText sx={{ color: "red" }}>
                {subjectError}
              </FormHelperText>

              <S.FormRow>
                <S.ImageWrapper>
                  <span>이미지 첨부</span>
                  <S.CommonSpace />
                  <S.CommonButton component="label">
                    사진 업로드
                    <input type="file" hidden onChange={handleFileChange} />
                  </S.CommonButton>
                </S.ImageWrapper>
              </S.FormRow>
              <S.FormRow>
                {previewUrl && (
                  <S.PreviewWrapper>
                    <img
                      src={previewUrl}
                      alt="미리보기"
                      style={{ width: "150px" }}
                    />
                  </S.PreviewWrapper>
                )}
              </S.FormRow>

              <FormRow>
                <S.EditorWrapper>
                  <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setContent(data);
                    }}
                    config={{
                      className: "WriteEditor",
                      placeholder: "내용을 입력하세요.",
                      extraPlugins: [MyCustomUploadAdapterPlugin],
                    }}
                  />
                </S.EditorWrapper>
              </FormRow>
              <FormHelperText sx={{ color: "red" }}>
                {contentError}
              </FormHelperText>

              <S.FormRow>
                <S.ButtonGroup>
                  <S.WriteButton
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    글쓰기
                  </S.WriteButton>
                  <S.ButtonSpace />
                  <S.WriteButton onClick={handleCancel} variant="contained">
                    취소
                  </S.WriteButton>
                </S.ButtonGroup>
              </S.FormRow>
            </form>
          </S.FormWrapper>
        </ThemeProvider>
      </S.Container>
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
          <Alert sx={modalStyle} severity="success">
            작성 완료!
          </Alert>
        )}
      </Modal>
    </>
  );
};
export default AdoptReviewWrite;
export const FormRow = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  align-items: center;
`;
