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
import { useNavigate } from "react-router-dom";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";
import styled from "styled-components";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { MyCustomUploadAdapterPlugin } from "../../../components/common/UploadAdapter";
import axios from "axios";
import { CustomDatePicker } from "../../../components/common/CustomDatePicker";
import dayjs from "dayjs";
import S from "./WriteStyle";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const EventWriteModal = ({ modalClose }) => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [startDate, setStartDate] = useState(dayjs().startOf("date"));
  const [endDate, setEndDate] = useState(dayjs().endOf("date").add(1, "d"));

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

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        setThumbnail(event.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

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
    const isError = validate();
    if (isError) return;
    let imageUrl = "";

    if (file) {
      const uploadedUrl = await uploadImage(file);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      }
    }

    try {
      await axios.post("/event/insert", {
        subject: subject,
        content: content,
        thumbnail: thumbnail,
        startDate: startDate,
        endDate: endDate,
      });
      setOpenModal(true);
      setTimeout(() => {
        handleModalClose();
      }, 1000);
    } catch (error) {
      console.error("데이터 전송 실패 : ", error);
    }
  };

  const resetDate = () => {
    setStartDate(dayjs().startOf("date"));
    setEndDate(dayjs().endOf("date"));
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
          <Typography variant="subtitle3">이벤트</Typography>
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

              <S.FormRow2>
                <CustomDatePicker
                  label="이벤트 시작 기간"
                  value={dayjs(startDate)}
                  sx={{
                    width: "50%",
                    "& label": {
                      color: "#ccc",
                    },
                    "&:hover label": {
                      color: "#fbd385",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ccc",
                      },
                    },
                  }}
                  onChange={(newValue) => setStartDate(newValue)}
                />
                &nbsp;
                <CustomDatePicker
                  label="이벤트 종료 기간"
                  value={dayjs(endDate)}
                  sx={{
                    width: "50%",
                    "& label": {
                      color: "#ccc",
                    },
                    "&:hover label": {
                      color: "#fbd385",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ccc",
                      },
                    },
                  }}
                  onChange={(newValue) => setEndDate(newValue)}
                />
                <Button
                  onClick={resetDate}
                  sx={{
                    minWidth: "51px",
                  }}
                >
                  <AutorenewIcon onClick={resetDate} />
                </Button>
              </S.FormRow2>
              <S.FormRow>
                <S.ImageWrapper>
                  <span>대표 이미지</span>
                  <S.CommonSpace />
                  <Button component="label" variant="contained">
                    사진 업로드
                    <input type="file" hidden onChange={handleFileChange} />
                  </Button>
                </S.ImageWrapper>
              </S.FormRow>
              <S.FormRow>
                {thumbnail && (
                  <S.PreviewWrapper>
                    <img
                      src={thumbnail}
                      alt="미리보기"
                      style={{ width: "150px" }}
                    />
                  </S.PreviewWrapper>
                )}
              </S.FormRow>

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

export default EventWriteModal;
