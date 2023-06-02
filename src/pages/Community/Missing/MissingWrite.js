import * as React from "react";
import styled from "styled-components";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ThemeProvider,
  TextField,
  Grid,
  Modal,
  Alert,
  FormHelperText,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  Button,
} from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { MyCustomUploadAdapterPlugin } from "../../../components/common/UploadAdapter";
import sigungu from "./sigungu";
import { COMMUNITY } from "../../../constants/PageURL";
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

const MissingWrite = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [location, setLocation] = useState("서울시"); // 미구현 상태(임시 주소)
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");

  // const [val1, setVal1] = useState("");
  // const [val2, setVal2] = useState("");
  // const [val3, setVal3] = useState("");
  // const { sido, sigugun, dong } = sigungu;
  // const { sido = [], sigugun = [], dong = [] } = sigungu;
  const [sidos, setSidos] = useState([]);
  const [siguguns, setSiguguns] = useState([]);
  const [dongs, setDongs] = useState([]);
  const [weatherUrl, setWeatherUrl] = useState("");
  const [selectedSido, setSelectedSido] = useState("");
  const [selectedSigugun, setSelectedSigugun] = useState("");

  useEffect(() => {
    axios
      .get(
        "<https://zelkun.tistory.com/attachment/cfile8.uf@99BB7A3D5D45C065343307.js>"
      )
      .then((res) => {
        const hangjungdong = res.data.match(/var hangjungdong = (.+);/)[1];
        const parsedData = JSON.parse(hangjungdong);
        setSidos(parsedData.sido);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSidoChange = (e) => {
    const selectedSido = e.target.value;
    const filteredSiguguns = sidos.find(
      (sido) => sido.sido === selectedSido
    ).sigugun;
    setSiguguns(filteredSiguguns);
  };

  const handleSigugunChange = (e) => {
    const selectedSigugun = e.target.value;
    const filteredDongs = dongs.filter(
      (dong) => dong.sido === selectedSido && dong.sigugun === selectedSigugun
    );
    setDongs(filteredDongs);
  };

  const handleDongChange = (e) => {
    const sido = selectedSido;
    const sigugun = selectedSigugun;
    const dong = e.target.value;
    const dongCode = sido + sigugun + dong + "00";
    const url = `https://www.weather.go.kr/weather/process/timeseries-dfs-body-ajax.jsp?myPointCode=${dongCode}&unit=K`;
    setWeatherUrl(url);
  };

  const [formAble, setFormAble] = useState(false);
  const [open, setOpen] = useState(false);

  const handleReset = () => {
    setTitle("");
    setContent("");
    setName("");
    setSpecies("");
    setLocation("");
    setAge("");
    setGender("");
    setStatus("");
    document.location.href = COMMUNITY.MISSING;
  };

  // 유효성 검증 상태
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [speciesError, setSpeciesError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [statusError, setStatusError] = useState(false);
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
    if (name === "") {
      setNameError(true);
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
    if (status === "") {
      setStatusError(true);
      isError = true;
    }

    return isError;
  };

  const [openModal, setOpenModal] = useState(false); // 모달 상태
  const handleModalClose = () => {
    // 모달닫는 함수
    setOpenModal(false);
    navigate(COMMUNITY.MISSING);
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
      boardName: name,
      boardSpecies: species,
      boardLocation: location,
      boardAge: age,
      boardGender: gender,
      boardStatus: status === "실종" ? 1 : 0,
      imgThumbnail: imageUrl,
      boardDate: isoCurrentDate,
    };

    try {
      await axios.post("/board/missing/write", postData, {
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
              <div style={{ margin: "auto", maxWidth: "700px" }}>
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
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <FormRowWithError>
                    <TextField
                      label="이름"
                      value={name}
                      size="small"
                      fullWidth
                      onChange={(e) => {
                        setNameError(false);
                        setName(e.target.value);
                      }}
                    />
                    <ErrorMsg>
                      <FormHelperText sx={{ color: "red", fontSize: "15px" }}>
                        {nameError ? "이름을 입력해 주세요." : null}
                      </FormHelperText>
                    </ErrorMsg>
                  </FormRowWithError>
                  &nbsp;
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
                    <p className="title">실종 지역</p>
                    <div>
                      <select id="sido" onChange={handleSidoChange}>
                        <option value="">선택</option>
                        {sidos.map((sido) => (
                          <option key={sido.codeNm} value={sido.sido}>
                            {sido.codeNm}
                          </option>
                        ))}
                      </select>
                      <select id="sigugun" onChange={handleSigugunChange}>
                        <option value="">선택</option>
                        {siguguns.map((sigugun) => (
                          <option key={sigugun.codeNm} value={sigugun.sigugun}>
                            {sigugun.codeNm}
                          </option>
                        ))}
                      </select>
                      <select id="dong" onChange={handleDongChange}>
                        <option value="">선택</option>
                        {dongs.map((dong) => (
                          <option key={dong.codeNm} value={dong.dong}>
                            {dong.codeNm}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* <div>
                      <iframe id="iframe" style={{ width: '100%', height: '500px' }} src={weatherUrl} />
                    </div> */}

                    {/* <div style={{ margin: 'auto' }}>
                      <h1>{`${val1}-${val2}-${val3}`}</h1>
                      <select onChange={(e) => setVal1(e.target.value)}>
                        <option value="">선택</option>
                        {sido.map((el) => (
                          <option key={el.sido} value={el.sido}>
                            {el.codeNm}
                          </option>
                        ))}
                      </select>
                      <select onChange={(e) => setVal2(e.target.value)}>
                        <option value="">선택</option>
                        {sigugun
                          .filter((el) => el.sido === val1)
                          .map((el) => (
                            <option key={el.sigugun} value={el.sigugun}>
                              {el.codeNm}
                            </option>
                          ))}
                      </select>
                      <select onChange={(e) => setVal3(e.target.value)}>
                        <option value="">선택</option>
                        {dong
                          .filter(
                            (el) => el.sido === val1 && el.sigugun === val2
                          )
                          .map((el) => (
                            <option key={el.dong} value={el.dong}>
                              {el.codeNm}
                            </option>
                          ))}
                      </select>
                    </div> */}
                  </SelectContainer>
                  {/* <SelectContainer>
                  <p className="title">분류</p>
                  <Select
                    size="small"
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                  >
                    <MenuItem value="---">---</MenuItem>
                    <MenuItem value="강아지">강아지</MenuItem>
                    <MenuItem value="고양이">고양이</MenuItem>
                  </Select>
                </SelectContainer> */}
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
                  </SelectContainer>
                  <SelectContainer>
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
                </FormRow>
                <FormRow>
                  <ErrorMsg>
                    <FormHelperText sx={{ color: "red", fontSize: "15px" }}>
                      {ageError ? "지역을 선택해 주세요." : null}
                    </FormHelperText>
                  </ErrorMsg>
                  <ErrorMsg>
                    <FormHelperText sx={{ color: "red", fontSize: "15px" }}>
                      {ageError ? "나이를 선택해 주세요." : null}
                    </FormHelperText>
                  </ErrorMsg>
                  <ErrorMsg>
                    <FormHelperText
                      sx={{ color: "red", fontSize: "15px", float: "right" }}
                    >
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
                    <input
                      type="file"
                      hidden
                      onChange={handleFileChange}
                      className="file"
                      id="file"
                    />
                  </FileContainer>

                  {/* <ToggleButton /> */}
                  <StatusWrapper>
                    실종 상태
                    <CommonSpace />
                    <FormControl>
                      <ToggleButtonGroup
                        size="small"
                        value={status}
                        exclusive
                        onChange={(e, value) => {
                          setStatusError(false);
                          setStatus(value);
                        }}
                      >
                        <ToggleButton
                          value="실종"
                          sx={{
                            width: "80px",
                            "&.Mui-selected": {
                              backgroundColor: "#FF4646",
                              color: "#fff",
                            },
                            "&.Mui-selected:hover": {
                              backgroundColor: "#FF4646",
                              color: "#fff",
                            },
                          }}
                        >
                          실종
                        </ToggleButton>
                        <ToggleButton
                          value="완료"
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
                          완료
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </FormControl>
                  </StatusWrapper>
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

                  <ErrorMsg>
                    <FormHelperText
                      sx={{ color: "red", fontSize: "15px", float: "right" }}
                    >
                      {statusError ? "실종 상태를 선택해 주세요." : null}
                    </FormHelperText>
                  </ErrorMsg>
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
                <ButtonsContainer>
                  <WriteButton
                    type="submit"
                    onClick={handleSubmit}
                    variant="contained"
                  >
                    글쓰기
                  </WriteButton>
                  <ButtonsSpace />

                  <ResetButton variant="contained" onClick={handleReset}>
                    취소
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
          </Grid>
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
`;

const FileContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 10px;

  .title {
    font-weight: bold;
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

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;
  align-items: center;
`;

const PreviewWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
`;

const EditorWrapper = styled.div`
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 500px;
    min-width: 700px;
  }
`;

const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
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

const CommonSpace = styled.div`
  width: 10px;
  height: auto;
  display: inline-block;
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

export default MissingWrite;
