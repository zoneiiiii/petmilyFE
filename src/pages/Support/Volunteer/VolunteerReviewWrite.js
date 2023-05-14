import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./VolunteerNoticeWrite.styled";
import { TextField, Typography, ThemeProvider } from "@mui/material";
import { SUPPORT } from "../../../constants/PageURL";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";

const VolunteerReviewWrite = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // 전송 로직 구현
  };

  const handleCancel = () => {
    navigate(SUPPORT.VOLUNTEER_REVIEW);
  };

  return (
    <>
      <S.TitleContainer>
        <S.Title>✍ 게시글 작성</S.Title>
        <Typography variant="subtitle3">봉사 후기 게시판</Typography>
      </S.TitleContainer>
      <S.Container>
        <ThemeProvider theme={CustomTheme}>
          <S.FormWrapper>
            <form onSubmit={handleSubmit}>
              <S.FormRow>
                <TextField
                  label="제목"
                  value={title}
                  size="small"
                  fullWidth
                  onChange={(e) => setTitle(e.target.value)}
                />
              </S.FormRow>

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

              <S.FormRow>
                <S.EditorWrapper>
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
                </S.EditorWrapper>
              </S.FormRow>

              <S.FormRow>
                <S.ButtonGroup>
                  <S.WriteButton type="submit" variant="contained">
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
    </>
  );
};

export default VolunteerReviewWrite;
