import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "../../Support/Volunteer/VolunteerNoticeWrite.styled";
import styled from "styled-components";
import {
  TextField,
  ThemeProvider,
  FormHelperText,
  Modal,
  Alert,
  Button,
} from "@mui/material";
import { ADMIN } from "../../../constants/PageURL";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";
import axios from "axios";
import { MyCustomUploadAdapterPlugin } from "../../../components/common/UploadAdapter";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const AdminProductWrite = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [amount, setAmount] = useState("");
  const [cost, setCost] = useState("");
  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
    setCategoryError(false);
  };

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
    navigate(ADMIN.PRODUCT);
  };

  //유효성 검증
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [costError, setCostError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

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
    if (amount === "") {
      setAmountError(true);
      isError = true;
    }
    if (cost === "") {
      setCostError(true);
      isError = true;
    }
    if (category === "none") {
      setCategoryError(true);
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

    let imageUrl = "https://via.placeholder.com/150"; // 사진 안넣었을 때 이미지 (임시)

    if (file) {
      const uploadedUrl = await uploadImage(file);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      }
    }

    const postData = {
      productName: title,
      productCost: cost,
      productContent: content,
      productAmount: amount,
      imgThumbnail: imageUrl,
      productCategory: category,
    };

    try {
      await axios.post("/shop/product/create", postData, {
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
    navigate(ADMIN.PRODUCT);
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <Section className="result">
        <MainContainer className="result-container">
          <Board>상품 등록</Board>
          <S.Container>
            <ThemeProvider theme={CustomTheme}>
              <S.FormWrapper>
                <form onSubmit={handleSubmit} method="POST">
                  <S.FormRowWithError>
                    <TextField
                      label="상품명"
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
                        {titleError ? "상품명을 입력해 주세요." : null}
                      </FormHelperText>
                    </S.ErrorMsg>
                  </S.FormRowWithError>
                  <S.FormRow>
                    <S.FormRowWithError>
                      <TextField
                        size="small"
                        value={cost}
                        label="상품가격(원)"
                        fullWidth
                        type="number"
                        onChange={(e) => {
                          const inputAmount = e.target.value;
                          if (inputAmount >= 0) {
                            setCostError(false);
                            setCost(inputAmount);
                          } else {
                            setCostError(true);
                          }
                        }}
                      />
                      <S.ErrorMsg>
                        <FormHelperText sx={{ color: "red", fontSize: "15px" }}>
                          {costError ? "가격을 입력해 주세요." : null}
                        </FormHelperText>
                      </S.ErrorMsg>
                    </S.FormRowWithError>
                    &nbsp;
                    <S.FormRowWithError>
                      <TextField
                        size="small"
                        label="상품수량(개)"
                        value={amount}
                        fullWidth
                        type="number"
                        onChange={(e) => {
                          const inputAmount = e.target.value;
                          if (inputAmount >= 0) {
                            setAmountError(false);
                            setAmount(inputAmount);
                          } else {
                            setAmountError(true);
                          }
                        }}
                      />
                      <S.ErrorMsg>
                        <FormHelperText sx={{ color: "red", fontSize: "15px" }}>
                          {amountError ? "수량을 입력해 주세요." : null}
                        </FormHelperText>
                      </S.ErrorMsg>
                    </S.FormRowWithError>
                  </S.FormRow>
                  <S.FormRow>
                    <ImageWrapper>
                      <span>대표 이미지</span>
                      <S.CommonSpace />
                      <S.CommonButton component="label">
                        사진 업로드
                        <input type="file" hidden onChange={handleFileChange} />
                      </S.CommonButton>
                    </ImageWrapper>
                    <S.FormRowWithError>
                      <FormControl size="small" fullWidth>
                        <InputLabel>카테고리</InputLabel>
                        <Select
                          value={category}
                          label="Category"
                          onChange={handleChange}
                        >
                          <MenuItem value="none">
                            <em sx={{ color: "lightgray" }}>카테고리 선택</em>
                          </MenuItem>
                          <MenuItem value="사료">사료</MenuItem>
                          <MenuItem value="간식">간식</MenuItem>
                          <MenuItem value="외출용품">외출용품</MenuItem>
                          <MenuItem value="목욕/미용">목욕/미용</MenuItem>
                          <MenuItem value="굿즈">굿즈</MenuItem>
                        </Select>
                        <S.ErrorMsg>
                          <FormHelperText
                            sx={{ color: "red", fontSize: "15px", ml: -0.3 }}
                          >
                            {categoryError ? "카테고리를 선택해 주세요." : null}
                          </FormHelperText>
                        </S.ErrorMsg>
                      </FormControl>
                    </S.FormRowWithError>
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
                        color="primary"
                      >
                        등록
                      </Button>
                      <S.ButtonSpace />
                      <Button
                        onClick={handleCancel}
                        color="warning"
                        variant="contained"
                      >
                        취소
                      </Button>
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
                  등록 완료!
                </Alert>
              </Modal>
            </ThemeProvider>
          </S.Container>
        </MainContainer>
      </Section>
    </ThemeProvider>
  );
};
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

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const EditorWrapper = styled.div`
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 500px;
    // width: 700px;
  }

  .ck.ck-editor__editable:not(.ck-editor__nested-editable):focus {
    border-color: #fbd385;
  }
`;

export default AdminProductWrite;
