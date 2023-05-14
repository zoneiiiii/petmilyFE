import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  TextField,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  Button,
  Modal,
  Alert,
  Select, MenuItem
} from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import { COMMUNITY } from "../../../constants/PageURL";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import CustomButton from "../../Login/CustomButton";

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

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const categories = [
  '전자제품',
  '가구/인테리어',
  '의류/잡화',
  '스포츠/레저',
  '게임/취미',
  '반려동물용품',
  '자동차용품',
  '기타',
];

const FleaWrite = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [title, setTitle] = useState(""); // 상품명
  const [cost, setCost] = useState(""); // 상품 가격
  const [content, setContent] = useState(""); // 상품 설명
  const [selectedCategory, setSelectedCategory] = useState('');  // 상품 카테고리
  const [selectedStatus, setSelectedStatus] = useState(""); // 거래 완료 여부
  const [method, setMethod] = useState("") // 거래 방법

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // 전송 로직 구현
  };

  const [formAble, setFormAble] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    if (
      title === "" ||
      title === undefined ||
      content === "" ||
      content === undefined ||
      cost === undefined ||
      cost === "" ||
      content === undefined ||
      content === "" ||
      selectedCategory === undefined ||
      selectedCategory === ""
    ) {
      setFormAble(false);
      setOpen(true);
    } else {
      setFormAble(true);
      setOpen(true);
      console.log(title);
      console.log(content);
      document.location.href = COMMUNITY.FLEA;
    }
  };
  const handleReset = () => {
    setTitle("");
    setContent("");
    document.location.href = COMMUNITY.FLEA;
  };

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <>
      <Section className="result">
        <MainContainer className="result-container">
          <TitleContainer>
            <Title> 상품 등록 </Title>
            <Typography variant="subtitle3">중고 장터 게시판</Typography>
          </TitleContainer>
          <Container>
            <FormWrapper>
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

                <FormRow2>
                  <TextField
                    label="가격"
                    value={cost}
                    size="small"
                    sx={{ marginRight: '50px', width: '300px' }}
                    onChange={(e) => setCost(e.target.value)}
                  />
                </FormRow2>

                <FormRow3>
                  <ImageWrapper>
                    <span>이미지 첨부</span>
                    <CommonSpace />
                    <CommonButton component="label">
                      사진 업로드
                      <input type="file" hidden onChange={handleFileChange} />
                    </CommonButton>
                  </ImageWrapper>

                  <CategoryWrapper id="category-select-label">카테고리
                    <Select
                      labelId="category-select-label"
                      id="category-select"
                      value={selectedCategory}
                      onChange={handleChange}
                      sx={{ margin: '10px 0 10px 10px', height: '40px' }}
                      MenuProps={MenuProps}
                    >
                      <MenuItem value="">카테고리 선택</MenuItem>
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </CategoryWrapper>

                  <StatusWrapper>
                    판매상태
                    <CommonSpace />
                    <FormControl>
                      <ToggleButtonGroup
                        size="small"
                        value={selectedStatus}
                        exclusive
                        onChange={(e, value) => setSelectedStatus(value)}
                      >
                        <ToggleButton
                          value="판매중"
                          sx={{
                            width: "80px",
                            "&.Mui-selected": {
                              backgroundColor: "#fbd385",
                              color: "#fff",
                            },
                            "&.Mui-selected:hover": {
                              backgroundColor: "#ffbe3f",
                              color: "#fff",
                            },
                          }}
                        >
                          판매중
                        </ToggleButton>
                        <ToggleButton
                          value="판매 완료"
                          sx={{
                            width: "80px",
                            "&.Mui-selected": {
                              backgroundColor: "#bfbfbf",
                              color: "#fff",
                            },
                            "&.Mui-selected:hover": {
                              backgroundColor: "#b2b0b0",
                              color: "#fff",
                            },
                          }}
                        >
                          판매 완료
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </FormControl>
                  </StatusWrapper>
                </FormRow3>

                <FormRow>
                  {previewUrl && (
                    <PreviewWrapper>
                      <img
                        src={previewUrl}
                        alt="미리보기"
                        style={{ width: "150px" }}
                      />
                    </PreviewWrapper>
                  )}
                </FormRow>

                <FormRow>
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
                </FormRow>

                <ButtonGroup>
                  <CustomButton label="취소" value="작성취소" onClick={handleReset} />
                  <CustomButton label="확인" value="글쓰기" onClick={handleOpen} />
                </ButtonGroup>

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
              </form>
            </FormWrapper>
          </Container>
        </MainContainer>
      </Section >
    </>
  );
};

const Section = styled.section`
  background: #f8f9fa;
  padding: 30px 0 40px 0;
`

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
`

const TitleContainer = styled.div`
  margin-top: 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
`;

const Container = styled.div`
  margin-top: 3vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormRow = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 16px;
  align-items: center;
`;

const FormRow2 = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;
`;

const FormRow3 = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 16px;
  align-items: center;
`;

const ButtonGroup = styled.div`
  font-size: 0.8rem;
  color: gray;
  margin-left: auto;
  margin-right: 5px;
  margin-top: 10px;
  margin-bottom: 100px;
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 40px;
  
`

const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
`;

const PreviewWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
`;

const ButtonSpace = styled.div`
  width: 4px;
  height: auto;
  display: inline-block;
`;

const CommonSpace = styled.div`
  width: 10px;
  height: auto;
  display: inline-block;
`;

const CommonButton = styled(Button)`
  && {
    color: #fff;
    background-color: #fbd385;
    width: auto;
    &:hover {
      background-color: #facc73;
    }
  }
`;

const EditorWrapper = styled.div`
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 500px;
    width: 700px;
  }
`;


export default FleaWrite;
