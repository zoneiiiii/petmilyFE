import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading/LoadingPage";
import * as S from "./VolunteerReviewModify.styled";
import styled from "styled-components";
import {
  TextField,
  Typography,
  ThemeProvider,
  FormHelperText,
  Modal,
  Alert,
  Button,
} from "@mui/material";
import { SUPPORT } from "../../../constants/PageURL";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";
import axios from "axios";
import { MyCustomUploadAdapterPlugin } from "../../../components/common/UploadAdapter";

const VolunteerReviewModify = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [Thumbnail, setThumbnail] = useState("");

  const modalStyle = {
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
  const [openModal, setOpenModal] = useState(false); // 모달 상태
  const handleModalClose = () => {
    // 모달닫는 함수
    setOpenModal(false);
    navigate(SUPPORT.VOLUNTEER_REVIEW);
  };

  //유효성 검증
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const validate = () => {
    let isError = false;
    if (title === "") {
      setTitleError(true);
      isError = true;
    }
    if (content === "") {
      setContentError(true);
      isError = true;
    }

    return isError;
  };

  // 사진 미리보기
  const [file, setFile] = useState(null);
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

  useEffect(() => {
    //게시글 Detail 호출
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/donate/volunteer/review/${id}`
        ); //게시글 Detail 데이터  호출
        const data = response.data;
        setTitle(data.reviewSubject);
        setContent(data.reviewContent);
        setThumbnail(data.imgThumbnail);
      } catch (error) {
        console.error("Error fetching data : ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/upload", formData);
      const imageUrl = response.data;
      return imageUrl;
    } catch (error) {
      console.error("이미지 업로드 실패", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isError = validate();
    if (isError) return;

    let imageUrl = Thumbnail;

    if (file) {
      const uploadedUrl = await uploadImage(file);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      }
    }

    const postData = {
      reviewSubject: title,
      reviewContent: content,
      imgThumbnail: imageUrl,
    };

    try {
      await axios.put(`/donate/volunteer/review/${id}`, postData, {
        withCredentials: true,
      });
      setOpenModal(true);
      setTimeout(() => {
        handleModalClose();
      }, 1000);
    } catch (error) {
      console.error("데이터 전송 실패 : ", error);
    }
  };

  const handleCancel = () => {
    navigate(SUPPORT.VOLUNTEER_REVIEW_DETAIL(id));
  };

  if (isLoading) {
    return <Loading />; // 로딩 중일 때 표시할 컴포넌트
  }

  return (
    <ThemeProvider theme={CustomTheme}>
      <Section className="result">
        <MainContainer className="result-container">
          <S.TitleContainer>
            <Board>✍ 게시글 수정</Board>
            <Typography variant="subtitle3">봉사 후기 게시판</Typography>
          </S.TitleContainer>
          <S.Container>
            <ThemeProvider theme={CustomTheme}>
              <S.FormWrapper>
                <form onSubmit={handleSubmit}>
                  <S.FormRowWithError>
                    <TextField
                      label="제목"
                      value={title}
                      size="small"
                      fullWidth
                      onChange={(e) => {
                        setTitleError(false);
                        setTitle(e.target.value);
                      }}
                    />
                    <S.ErrorMsg>
                      <FormHelperText sx={{ color: "red", fontSize: "15px" }}>
                        {titleError ? "제목을 입력해 주세요." : null}
                      </FormHelperText>
                    </S.ErrorMsg>
                  </S.FormRowWithError>

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

                  <S.FormRowWithError>
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
                    <S.ErrorMsg>
                      <FormHelperText sx={{ color: "red", fontSize: "15px" }}>
                        {contentError ? "내용을 입력해 주세요." : null}
                      </FormHelperText>
                    </S.ErrorMsg>
                  </S.FormRowWithError>

                  <S.FormRow>
                    <S.ButtonGroup>
                      <WriteButton
                        type="submit"
                        onClick={handleSubmit}
                        variant="contained"
                      >
                        수정
                      </WriteButton>
                      <S.ButtonSpace />
                      <ResetButton onClick={handleCancel} variant="contained">
                        취소
                      </ResetButton>
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
                <Alert sx={modalStyle} severity="success">
                  수정 완료!
                </Alert>
              </Modal>
            </ThemeProvider>
          </S.Container>
        </MainContainer>
      </Section>
    </ThemeProvider>
  );
};

export default VolunteerReviewModify;
const Section = styled.section`
  background: #f8f9fa;
  padding: 30px 0 40px 0;
`;

const MainContainer = styled.div`
  width: 60vw;
  // width: 1150px;
  max-width: 1150px;
  min-width: 790px;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(233, 236, 239);
  border-image: initial;
  margin: 0px auto 20px;
  background: rgb(255, 255, 255);
`;
const Board = styled.h1`
  margin-top: 2vw;
  text-align: center;
`;
const WriteButton = styled(Button)`
  && {
    color: #fff;
    background-color: #fbd385;
    width: auto;
    height: 30px;
    margin-top: 10px;
    margin-left: auto;
    &:hover {
      background-color: #AF935D;
    }
  }
`;
const ResetButton = styled(Button)`
  && {
    color: #fff;
    background-color: #bfbfbf;
    width: auto;
    height: 30px;
    margin-top: 10px;
    &:hover {
      background-color: #858585;
    }
  }
`;
