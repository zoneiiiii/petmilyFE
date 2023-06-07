import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import * as S from "./VolunteerNoticeWrite.styled";
import styled from "styled-components";
import {
  Button,
  TextField,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  ThemeProvider,
  FormHelperText,
  Modal,
  Alert,
} from "@mui/material";
import { CustomDatePicker } from "../../../components/common/CustomDatePicker";
import { SUPPORT } from "../../../constants/PageURL";
import dayjs from "dayjs";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import axios from "axios";
import { MyCustomUploadAdapterPlugin } from "../../../components/common/UploadAdapter";

const VolunteerNoticeWrite = () => {
  const navigate = useNavigate();
  const [volunteerStartPeriod, setVolunteerStartPeriod] = useState(dayjs());
  const [volunteerEndPeriod, setVolunteerEndPeriod] = useState(
    dayjs().add(1, "day")
  );
  const [title, setTitle] = useState("");
  const [ageLimit, setAgeLimit] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [shelterName, setShelterName] = useState("");
  const [recruitmentNumber, setRecruitmentNumber] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("모집중");
  const [content, setContent] = useState("");
  // const [uploadedImageUrl, setUploadedImageUrl] = useState(""); // 업로드된 이미지 URL 저장
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

  //< -- 유효성 검증 상태
  const [titleError, setTitleError] = useState(false);
  const [ageLimitError, setAgeLimitError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [addressDetailError, setAddressDetailError] = useState(false);
  const [shelterNameError, setShelterNameError] = useState(false);
  const [recruitmentNumberError, setRecruitmentNumberError] = useState(false);
  const [contentError, setContentError] = useState(false);

  const validate = () => {
    let isError = false;
    if (title === "") {
      setTitleError(true);
      isError = true;
    }
    if (ageLimit === "") {
      setAgeLimitError(true);
      isError = true;
    }
    if (address === "") {
      setAddressError(true);
      isError = true;
    }
    if (addressDetail === "") {
      setAddressDetailError(true);
      isError = true;
    }
    if (shelterName === "") {
      setShelterNameError(true);
      isError = true;
    }
    if (recruitmentNumber === "") {
      setRecruitmentNumberError(true);
      isError = true;
    }
    if (content === "") {
      setContentError(true);
      isError = true;
    }

    return isError;
  };

  // -->

  // <-- 모달
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
    navigate(SUPPORT.VOLUNTEER_NOTICE);
  };

  // -->
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
      shelterName: shelterName,
      volunteerSubject: title,
      volunteerStartPeriod: volunteerStartPeriod.format("YYYY-MM-DD"),
      volunteerEndPeriod: volunteerEndPeriod.format("YYYY-MM-DD"),
      volunteerAddr: address,
      volunteerAddrDetail: addressDetail,
      volunteerNumber: recruitmentNumber,
      volunteerAge: ageLimit,
      volunteerStatus: selectedStatus === "모집중" ? 1 : 0,
      volunteerContent: content,
      imgThumbnail: imageUrl,
      volunteerDate: isoCurrentDate,
    };

    try {
      await axios.post("/board/volunteer/write", postData, {
        credentials: "include",
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
    navigate(SUPPORT.VOLUNTEER_NOTICE);
  };

  const handleAddress = (data) => {
    setAddress(data.address);
    setIsPostcodeOpen(false);
  };

  const handlePostcodeOpen = () => {
    setIsPostcodeOpen(true);
  };

  const handlePostcodeClose = () => {
    setIsPostcodeOpen(false);
  };

  const handleRecruitmentNumberChange = (e) => {
    //모집인원에 음수 입력 못하게
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setRecruitmentNumber(value);
    } else {
      setRecruitmentNumber("");
    }
  };
  const resetDate = () => {
    setVolunteerStartPeriod(dayjs());
    setVolunteerEndPeriod(dayjs().add(1, "day"));
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <Section className="result">
        <MainContainer className="result-container">
          <S.TitleContainer>
            <Board>✍ 게시글 작성</Board>
            <Typography variant="subtitle3">봉사 모집 게시판</Typography>
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

                  <S.FormRow2>
                    <CustomDatePicker
                      label="활동 시작 기간"
                      value={dayjs(volunteerStartPeriod)}
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
                      onChange={(newValue) => setVolunteerStartPeriod(newValue)}
                    />
                    &nbsp;
                    <CustomDatePicker
                      label="활동 종료 기간"
                      value={dayjs(volunteerEndPeriod)}
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
                      onChange={(newValue) => setVolunteerEndPeriod(newValue)}
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
                  <S.FormRowWithError>
                    <S.FormRowAddr>
                      <TextField
                        label="주소"
                        value={address}
                        fullWidth
                        size="small"
                        InputProps={{ readOnly: true }}
                      />

                      <S.ButtonSpace />
                      <S.WriteButton onClick={handlePostcodeOpen}>
                        검색
                      </S.WriteButton>
                      <Dialog
                        open={isPostcodeOpen}
                        onClose={handlePostcodeClose}
                        fullWidth
                        maxWidth="sm"
                      >
                        <DialogTitle>주소 검색</DialogTitle>
                        <DialogContent>
                          {isPostcodeOpen && (
                            <DaumPostcode
                              onComplete={(data) => {
                                handleAddress(data);
                                setAddressError(false);
                              }}
                              autoClose={false}
                              width={592}
                              height={557}
                            />
                          )}
                        </DialogContent>
                      </Dialog>
                    </S.FormRowAddr>
                    <S.ErrorMsg>
                      <FormHelperText sx={{ color: "red", fontSize: "15px" }}>
                        {addressError ? "주소를 입력해 주세요." : null}
                      </FormHelperText>
                    </S.ErrorMsg>
                  </S.FormRowWithError>
                  <S.FormRowWithError>
                    <TextField
                      label="상세 주소"
                      value={addressDetail}
                      fullWidth
                      size="small"
                      onChange={(e) => {
                        setAddressDetailError(false);
                        setAddressDetail(e.target.value);
                      }}
                    />
                    <S.ErrorMsg>
                      <FormHelperText sx={{ color: "red", fontSize: "15px" }}>
                        {addressDetailError
                          ? "상세주소를 입력해 주세요."
                          : null}
                      </FormHelperText>
                    </S.ErrorMsg>
                  </S.FormRowWithError>

                  <S.FormRowWithError>
                    <TextField
                      label="보호소 이름"
                      value={shelterName}
                      fullWidth
                      size="small"
                      onChange={(e) => {
                        setShelterNameError(false);
                        setShelterName(e.target.value);
                      }}
                    />
                    <S.ErrorMsg>
                      <FormHelperText sx={{ color: "red", fontSize: "15px" }}>
                        {shelterNameError
                          ? "보호소 이름을 입력해 주세요"
                          : null}
                      </FormHelperText>
                    </S.ErrorMsg>
                  </S.FormRowWithError>

                  <S.FormRow>
                    <S.FormRowWithError>
                      <TextField
                        label="모집 인원"
                        value={recruitmentNumber}
                        fullWidth
                        size="small"
                        onChange={(e) => {
                          if (e.target.value.length <= 2) {
                            handleRecruitmentNumberChange(e);
                          }
                          setRecruitmentNumberError(false);
                        }}
                      />
                      <S.ErrorMsg>
                        <FormHelperText sx={{ color: "red", fontSize: "15px" }}>
                          {recruitmentNumberError
                            ? "모집 인원을 입력해 주세요"
                            : null}
                        </FormHelperText>
                      </S.ErrorMsg>
                    </S.FormRowWithError>
                    &nbsp;
                    <S.FormRowWithError>
                      <TextField
                        label="나이제한"
                        value={ageLimit}
                        size="small"
                        fullWidth
                        onChange={(e) => {
                          setAgeLimitError(false);
                          setAgeLimit(e.target.value);
                        }}
                      />
                      <S.ErrorMsg>
                        <FormHelperText sx={{ color: "red", fontSize: "15px" }}>
                          {ageLimitError ? "나이제한을 입력해 주세요" : null}
                        </FormHelperText>
                      </S.ErrorMsg>
                    </S.FormRowWithError>
                  </S.FormRow>

                  <S.FormRow>
                    <S.ImageWrapper>
                      <span>대표 이미지</span>
                      <S.CommonSpace />
                      <S.CommonButton component="label">
                        사진 업로드
                        <input type="file" hidden onChange={handleFileChange} />
                      </S.CommonButton>
                    </S.ImageWrapper>
                    <S.StatusWrapper>
                      모집 상태
                      <S.CommonSpace />
                      <FormControl>
                        <ToggleButtonGroup
                          size="small"
                          value={selectedStatus}
                          exclusive
                          onChange={(e, value) => setSelectedStatus(value)}
                        >
                          <ToggleButton
                            value="모집중"
                            sx={{
                              width: "80px",
                              "&.Mui-selected": {
                                backgroundColor: "#fbd385",
                                color: "#fff",
                              },
                              "&.Mui-selected:hover": {
                                backgroundColor: "#AF935D",
                                color: "#fff",
                              },
                            }}
                          >
                            모집중
                          </ToggleButton>
                          <ToggleButton
                            value="마감"
                            sx={{
                              width: "80px",
                              "&.Mui-selected": {
                                backgroundColor: "#fbd385",
                                color: "#fff",
                              },
                              "&.Mui-selected:hover": {
                                backgroundColor: "#AF935D",
                                color: "#fff",
                              },
                            }}
                          >
                            마감
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </FormControl>
                    </S.StatusWrapper>
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
                          setContentError(false);
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
                        글쓰기
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
                  작성 완료!
                </Alert>
              </Modal>
            </ThemeProvider>
          </S.Container>
        </MainContainer>
      </Section>
    </ThemeProvider>
  );
};

export default VolunteerNoticeWrite;
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
