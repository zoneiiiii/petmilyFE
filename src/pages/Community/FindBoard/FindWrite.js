import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  ThemeProvider,
  TextField,
  Grid,
  Modal,
  Alert,
  FormHelperText,
  Button
} from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { MyCustomUploadAdapterPlugin } from "../../../components/common/UploadAdapter";
import { COMMUNITY } from "../../../constants/PageURL";
import sigungu from "../Missing/sigungu";
import axios from "axios";

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

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

const FindWrite = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [species, setSpecies] = useState("");
  const [location, setLocation] = useState("서울시"); // 미구현 상태(임시 주소)
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [val3, setVal3] = useState("");
  // const { sido, sigugun, dong } = sigungu;
  const { sido = [], sigugun = [], dong = [] } = sigungu;
  const [formAble, setFormAble] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    if (
      title === undefined ||
      title === "" ||
      content === undefined ||
      content === "" ||
      species === undefined ||
      species === "" ||
      location === undefined ||
      location === "" ||
      age === undefined ||
      age === "" ||
      gender === undefined ||
      gender === ""
    ) {
      setFormAble(false);
      setOpen(true);
    } else {
      setFormAble(true);
      setOpen(true);
      console.log(title);
      console.log(content);
      console.log(species);
      console.log(location);
      console.log(age);
      console.log(gender);
      document.location.href = COMMUNITY.FIND;
    }
  };
  const handleReset = () => {
    setTitle("");
    setContent("");
    setSpecies("");
    setLocation("");
    setAge("");
    setGender("");
    document.location.href = COMMUNITY.FIND;
  };

  // 유효성 검증 상태
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [speciesError, setSpeciesError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [Thumbnail, setThumbnail] = useState("");

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
    if (species === "") {
      setSpeciesError(true);
      isError = true;
    }
    if (location === "") {
      setLocationError(true);
      isError = true;
    }
    if (age === "") {
      setAgeError(true);
      isError = true;
    }
    if (gender === "") {
      setGenderError(true);
      isError = true;
    }

    return isError;
  }

  const [openModal, setOpenModal] = useState(false); // 모달 상태
  const handleModalClose = () => {
    // 모달닫는 함수
    setOpenModal(false);
    navigate(COMMUNITY.FIND);
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
      boardSubject: title,
      boardContent: content,
      boardSpecies: species,
      boardLocation: location,
      boardAge: age,
      boardGender: gender,
      imgThumbnail: imageUrl,
      boardDate: isoCurrentDate,
    };

    try {
      await axios.post("/board/find/write", postData, {
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


  return (
    <ThemeProvider theme={CustomTheme}>
      <Section className="result">
        <MainContainer className="result-container">
          <Board>게시글 작성</Board>
          <Grid sx={{ minWidth: 700, mt: 5, mb: 10 }}>
            <form onSubmit={handleSubmit}>
              <div style={{ margin: 'auto', maxWidth: '700px' }}>
                <FormRowWithError>
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
                  <ErrorMsg>
                    <FormHelperText sx={{ color: "red", fontSize: "15px" }}>
                      {titleError ? "제목을 입력해 주세요." : null}
                    </FormHelperText>
                  </ErrorMsg>
                </FormRowWithError>

                <div style={{ display: "flex", justifyContent: 'space-between' }}>
                  <FormRowWithError>
                    <TextField
                      label="세부 종"
                      value={species}
                      size="small"
                      fullWidth
                      onChange={(e) => {
                        setSpeciesError(false);
                        setSpecies(e.target.value);
                      }}
                    />
                    <ErrorMsg>
                      <FormHelperText sx={{ color: "red", fontSize: "15px" }}>
                        {speciesError ? "세부 종을 입력해 주세요." : null}
                      </FormHelperText>
                    </ErrorMsg>
                  </FormRowWithError>
                </div>

                <FormRow>
                  <SelectContainer>
                    <p className="title">목격 지역</p>
                    <nav id="hot-articles-navigation" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
                      <select name="region1" id="region1" onChange={(e) => setVal1(e.target.value)} className="hot-articles-nav-select">
                        <option value="선택">지역을 선택하세요</option>
                        <option value="서울특별시">서울특별시</option>
                        <option value="부산광역시">부산광역시</option>
                        <option value="대구광역시">대구광역시</option>
                        <option value="인천광역시">인천광역시</option>
                        <option value="광주광역시">광주광역시</option>
                        <option value="대전광역시">대전광역시</option>
                        <option value="울산광역시">울산광역시</option>
                        <option value="세종특별자치시">세종특별자치시</option>
                        <option value="경기도">경기도</option>
                        <option value="강원도">강원도</option>
                        <option value="충청북도">충청북도</option>
                        <option value="충청남도">충청남도</option>
                        <option value="전라북도">전라북도</option>
                        <option value="전라남도">전라남도</option>
                        <option value="경상북도">경상북도</option>
                        <option value="경상남도">경상남도</option>
                        <option value="제주특별자치도">제주특별자치도</option></select>
                      <select name="region2" id="region2" onChange={(e) => setVal2(e.target.value)} className="hot-articles-nav-select">
                        <option value="">동네를 선택하세요</option>
                        <option value="강남구">강남구</option>
                        <option value="강동구">강동구</option>
                        <option value="강북구">강북구</option>
                        <option value="강서구">강서구</option>
                        <option value="관악구">관악구</option>
                        <option value="광진구">광진구</option>
                        <option value="구로구">구로구</option>
                        <option value="금천구">금천구</option>
                        <option value="노원구">노원구</option>
                        <option value="도봉구">도봉구</option>
                        <option value="동대문구">동대문구</option>
                        <option value="동작구">동작구</option>
                        <option value="마포구">마포구</option>
                        <option value="서대문구">서대문구</option>
                        <option value="서초구">서초구</option>
                        <option value="성동구">성동구</option>
                        <option value="성북구">성북구</option>
                        <option value="송파구">송파구</option>
                        <option value="양천구">양천구</option>
                        <option value="영등포구">영등포구</option>
                        <option value="용산구">용산구</option>
                        <option value="은평구">은평구</option>
                        <option value="종로구">종로구</option>
                        <option value="중구">중구</option>
                        <option value="중랑구">중랑구</option></select>

                      <select name="region3" id="region3" onChange={(e) => setVal3(e.target.value)} className="hot-articles-nav-select">
                        <option value="">동을 선택하세요</option>
                        <option value="개포1동">개포1동</option>
                        <option value="개포동">개포동</option>
                        <option value="율현동">율현동</option>
                        <option value="대치4동">대치4동</option>
                        <option value="일원1동">일원1동</option>
                        <option value="논현동">논현동</option>
                        <option value="도곡2동">도곡2동</option>
                        <option value="대치동">대치동</option>
                        <option value="청담동">청담동</option>
                        <option value="대치1동">대치1동</option>
                        <option value="논현2동">논현2동</option>
                        <option value="삼성1동">삼성1동</option>
                        <option value="삼성동">삼성동</option>
                        <option value="역삼2동">역삼2동</option>
                        <option value="역삼동">역삼동</option>
                        <option value="일원동">일원동</option>
                        <option value="개포3동">개포3동</option>
                        <option value="도곡동">도곡동</option>
                        <option value="압구정동">압구정동</option>
                        <option value="신사동">신사동</option>
                        <option value="논현1동">논현1동</option>
                        <option value="개포2동">개포2동</option>
                        <option value="수서동">수서동</option>
                        <option value="역삼1동">역삼1동</option>
                        <option value="세곡동">세곡동</option>
                        <option value="자곡동">자곡동</option>
                        <option value="도곡1동">도곡1동</option>
                        <option value="개포4동">개포4동</option>
                        <option value="대치2동">대치2동</option>
                        <option value="일원본동">일원본동</option>
                        <option value="삼성2동">삼성2동</option></select>
                    </nav>
                  </SelectContainer>
                </FormRow>
                <FormRow>
                  <ErrorMsg>
                    <FormHelperText sx={{ color: "red", fontSize: "15px" }}>
                      {speciesError ? "지역을 선택해 주세요." : null}
                    </FormHelperText>
                  </ErrorMsg>
                </FormRow>

                <FormRow2>
                  <SelectContainer>
                    <p className="title">나이</p>
                    <Select
                      label="나이"
                      size="small"
                      value={age}
                      onChange={(e) => {
                        setAgeError(false);
                        setAge(e.target.value);
                      }}
                      MenuProps={MenuProps}
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em>Placeholder</em>;
                        }

                        return selected;
                      }}
                    >
                      {Array.from({ length: 30 }, (_, i) => (
                        <MenuItem key={i} value={i + 1}>
                          {i + 1}살
                        </MenuItem>
                      ))}
                    </Select>
                    <CommonSpace />
                    <p className="title">성별</p>
                    <Select
                      label="성별"
                      size="small"
                      value={gender}
                      onChange={(e) => {
                        setGenderError(false);
                        setGender(e.target.value);
                      }}
                    >
                      <MenuItem value="수컷">수컷</MenuItem>
                      <MenuItem value="암컷">암컷</MenuItem>
                    </Select>
                  </SelectContainer>
                </FormRow2>
                <FormRow>
                  <ErrorMsg>
                    <FormHelperText sx={{ color: "red", fontSize: "15px" }}>
                      {ageError ? "나이를 선택해 주세요." : null}
                    </FormHelperText>
                  </ErrorMsg>
                  <ErrorMsg>
                    <FormHelperText sx={{ color: "red", fontSize: "15px" }}>
                      {genderError ? "성별을 선택해 주세요." : null}
                    </FormHelperText>
                  </ErrorMsg>
                </FormRow>

                <FormRow>
                  <FileContainer>
                    <p className="title">대표 이미지</p>
                    <label htmlFor="file">
                      <div className="btn-upload">파일 선택</div>
                    </label>
                    <input type="file" hidden onChange={handleFileChange} className="file" id="file" />
                  </FileContainer>
                </FormRow>
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

                <FormRowWithError>
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
                  <ErrorMsg>
                    <FormHelperText sx={{ color: "red", fontSize: "15px" }}>
                      {contentError ? "내용을 입력해 주세요." : null}
                    </FormHelperText>
                  </ErrorMsg>
                </FormRowWithError>

                <br />
                <br />
                <ButtonsContainer>
                  <WriteButton
                    type="submit"
                    onClick={handleSubmit}
                    variant="contained"
                  >글쓰기
                  </WriteButton>
                  <ButtonsSpace />

                  <ResetButton
                    variant="contained"
                    onClick={handleReset}
                  >취소
                  </ResetButton>

                </ButtonsContainer>
              </div>

              <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Alert sx={modalStyle} severity="success">
                  작성 완료!
                </Alert>
              </Modal>
            </form>
          </Grid >
        </MainContainer>
      </Section>
    </ThemeProvider>
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

const Board = styled.h1`
  margin-top: 2vw;
  text-align: center;
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
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

const PreviewWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
`;

const FormRowWithError = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 16px;
    align-items: center;
`;

const ErrorMsg = styled.div`
  width: 100%;
  margin-left: 10px;
`;

const SelectContainer = styled.div`
                display: flex;
                gap: 1rem;
                align-items: flex;
                margin-bottom: 10px;
                p {
                  font-weight: bold;
                  color: #474747;
                }
              `

const FileContainer = styled.div`
      display: flex;
      gap: 1rem;
      align-items: center;
      margin-bottom: 10px;

      .title {
        font - weight: bold;
      color: #474747;
      margin-right: 50px;
}

      .btn-upload {
        width: 150px;
      height: 30px;
      background: #ffffff;
      border: 1px solid #000000;
      border-radius: 10px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        background: #fbd385;
      border: 1px solid #fbd385;
      color: #fff;
    }
}
      .file {
        display: none;
}
      `;


const EditorWrapper = styled.div`
      .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
        min-height: 500px;
      width: 700px;
  }
      `;

const ButtonsContainer = styled.div`
      margin-top: 10px;
      margin-bottom: 10px;
      min-width: 700px;
      display: flex;
      justify-content: flex-end;
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
          background-color: #ffbe3f;
        }
      }
    `;

const ButtonsSpace = styled.div`
      width: 5px;
      height: auto;
      display: inline-block;
    `;

const ResetButton = styled(Button)`
    && {
        color: #fff;
        background-color: #bfbfbf;
        width: auto;
        height: 30px;
        margin-top: 10px;
        &:hover {
          background-color: #b2b0b0;
        }
      }
    `;

const CommonSpace = styled.div`
  width: 230px;
  height: auto;
  display: inline-block;
`;


export default FindWrite;
