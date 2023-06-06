import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Input,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import { ABOUT, ACCOUNT } from "../../constants/PageURL";
import styled from "styled-components";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { MyCustomUploadAdapterPlugin } from "../../components/common/UploadAdapter";
import axios from "axios";
import { CustomDatePicker } from "../../components/common/CustomDatePicker";
import dayjs from "dayjs";
import S from "../Admin/Board/WriteStyle";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const pageWidth = "100%";

const EventWrite = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [startDate, setStartDate] = useState(dayjs().startOf("date"));
  const [endDate, setEndDate] = useState(dayjs().endOf("date").add(1, "d"));
  const [mode, setMode] = useState("create");

  //< -- 유효성 검증 상태
  const [subjectError, setSubjectError] = useState(false);
  const [contentError, setContentError] = useState(false);

  useEffect(() => {
    axios
      .get("/check-login")
      .then((response) => {
        if (!response.data) {
          alert("로그인 해주세요.");
          navigate(ACCOUNT.LOGIN);
        } else if (state !== null && state.data !== null) {
          setMode("update");
          axios
            .get("/event/check-writer?no=" + state.data.no)
            .then((response) => {
              if (response.data) {
                setSubject(state.data.subject);
                setContent(state.data.content);
                setThumbnail(state.data.thumbnail);
                setStartDate(dayjs(state.data.startDate));
                setEndDate(dayjs(state.data.endDate));
              } else {
                alert("권한이 없습니다.");
                navigate(-1);
              }
            })
            .catch((error) => console.error("에러발생:", error));
        }
      })
      .catch((error) => console.error("에러발생! :", error));
  }, []);

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

    const postData = {
      no: state ? state.data.no : null,
      subject: subject,
      content: content,
      thumbnail: imageUrl,
      StartDate: startDate,
      EndDate: endDate,
    };

    try {
      switch (mode) {
        case "create":
          await axios.post("/event/insert", {
            subject: subject,
            content: content,
            thumbnail: thumbnail,
            startDate: startDate,
            endDate: endDate,
          });
          break;
        case "update":
          await axios.post("/event/update", {
            no: state.data.no,
            subject: subject,
            content: content,
            thumbnail: thumbnail,
            startDate: startDate,
            endDate: endDate,
          });
          break;
        default:
          console.log("something Wrong!");
          navigate(-1);
      }
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
    navigate(-1);
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <S.Section className="result">
        <S.MainContainer className="result-container">
          <S.TitleContainer>
            <S.Board>
              {mode === "update" ? "✍ 게시글 수정" : "✍ 게시글 작성"}
            </S.Board>
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
                        htmlEmbed: {
                          showPreviews: true,
                        },
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
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      variant="contained"
                    >
                      {mode === "update" ? "수정" : "글쓰기"}
                    </Button>
                    <S.ButtonSpace />
                    <Button
                      onClick={() => navigate(-1)}
                      variant="contained"
                      color="warning"
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
              <Alert sx={S.modalStyle} severity="success">
                {mode === "update" ? "수정완료!" : "작성완료!"}
              </Alert>
            </Modal>
          </S.Container>
        </S.MainContainer>
      </S.Section>
    </ThemeProvider>
  );

  // 이전코드
  //   const { state } = useLocation();
  //   const navigate = useNavigate();
  //   const [subject, setSubject] = useState("");
  //   const [content, setContent] = useState("");
  //   const [thumbnail, setThumbnail] = useState("");
  //   const [startDate, setStartDate] = useState(dayjs().startOf("date"));
  //   const [endDate, setEndDate] = useState(dayjs().endOf("date"));
  //   const [mode, setMode] = useState("create");
  //   const titleRef = useRef();
  //   const editorRef = useRef();

  //   useEffect(() =>
  //     console.log("re-rendering...", startDate, endDate, thumbnail)
  //   );

  //   useEffect(() => {
  //     axios
  //       .get("/check-login")
  //       .then((response) => {
  //         if (!response.data) {
  //           alert("로그인 해주세요.");
  //           navigate(ACCOUNT.LOGIN);
  //         } else if (state !== null && state.data !== null) {
  //           setMode("update");
  //           axios
  //             .get("/event/check-writer?no=" + state.data.no)
  //             .then((response) => {
  //               if (response.data) {
  //                 setSubject(state.data.subject);
  //                 setContent(state.data.content);
  //                 setThumbnail(state.data.thumbnail);
  //                 setStartDate(dayjs(state.data.startDate));
  //                 setEndDate(dayjs(state.data.endDate));
  //               } else {
  //                 alert("권한이 없습니다.");
  //                 navigate(-1);
  //               }
  //             })
  //             .catch((error) => console.error("에러발생:", error));
  //         }
  //       })
  //       .catch((error) => console.error("에러발생! :", error));
  //   }, []);

  //   const handleInsert = () => {
  //     const editorInstance = editorRef.current.editor;
  //     if (subject.trim() === "") {
  //       alert("제목을 입력하세요.");
  //       titleRef.current.focus();
  //     } else if (content.trim() === "") {
  //       alert("내용을 입력하세요.");
  //       editorInstance.editing.view.focus();
  //       editorInstance.ui.view.element.scrollIntoView({
  //         block: "center",
  //       });
  //     } else {
  //       switch (mode) {
  //         case "create":
  //           axios
  //             .post("/event/insert", {
  //               subject: subject,
  //               content: content,
  //               thumbnail: thumbnail,
  //               startDate: startDate,
  //               endDate: endDate,
  //             })
  //             .then((response) => console.log("등록?:", response.data))
  //             .catch((error) => console.error("에러 발생! :", error))
  //             .finally(() => {
  //               alert("등록되었습니다!");
  //               navigate(ABOUT.EVENT());
  //             });
  //           break;
  //         case "update":
  //           axios
  //             .post("/event/update", {
  //               no: state.data.no,
  //               subject: subject,
  //               content: content,
  //               thumbnail: thumbnail,
  //               startDate: startDate,
  //               endDate: endDate,
  //             })
  //             .then((response) => console.log("수정?:", response.data))
  //             .catch((error) => console.error("에러 발생! :", error))
  //             .finally(() => {
  //               alert("수정되었습니다!");
  //               navigate(-1);
  //             });
  //           break;
  //         default:
  //           console.log();
  //       }
  //     }
  //   };

  //   const handleImgUpload = (event) => {
  //     const formData = new FormData();
  //     formData.append("file", event.target.files[0]);
  //     axios
  //       .post("/upload", formData)
  //       .then((response) => {
  //         setThumbnail(response.data);
  //       })
  //       .catch((error) => console.error("에러발생:", error));
  //   };

  //   return (
  //     <ThemeProvider theme={CustomTheme}>
  //       <Box width={pageWidth}>
  //         <Table>
  //           <TableHead>
  //             <TableRow>
  //               <TableCell
  //                 colSpan={4}
  //                 sx={{
  //                   fontSize: "3rem",
  //                   fontWeight: 600,
  //                   textAlign: "center",
  //                   p: 10,
  //                 }}
  //               >
  //                 이벤트 작성
  //               </TableCell>
  //             </TableRow>
  //           </TableHead>
  //           <TableBody>
  //             <TableRow>
  //               <TableCell
  //                 sx={{
  //                   fontSize: "1.5rem",
  //                   fontWeight: 600,
  //                   textAlign: "left",
  //                   width: "10%",
  //                 }}
  //               >
  //                 제목
  //               </TableCell>
  //               <TableCell colSpan={3}>
  //                 <TextField
  //                   size="small"
  //                   fullWidth
  //                   value={subject}
  //                   onChange={
  //                     (event) => setSubject(event.target.value)
  //                     // setData({ ...data, subject: event.target.value })
  //                   }
  //                   inputRef={titleRef}
  //                   // placeholder="제목을 입력하세요."
  //                 />
  //               </TableCell>
  //             </TableRow>
  //             <TableRow>
  //               <TableCell
  //                 sx={{
  //                   fontSize: "1.5rem",
  //                   fontWeight: 600,
  //                   textAlign: "left",
  //                   width: "10%",
  //                 }}
  //               >
  //                 썸네일
  //               </TableCell>
  //               <TableCell
  //                 sx={{ display: "flex", justifyContent: "space-between" }}
  //               >
  //                 <Box
  //                   sx={{
  //                     display: "flex",
  //                     flexWrap: "wrap",
  //                     alignContent: "center",
  //                   }}
  //                 >
  //                   <Input
  //                     type="file"
  //                     disableUnderline
  //                     onChange={handleImgUpload}
  //                   />
  //                 </Box>
  //                 {thumbnail && (
  //                   <img alt="썸네일 미리보기" src={thumbnail} height={"90px"} />
  //                 )}
  //               </TableCell>
  //               <TableCell
  //                 sx={{
  //                   fontSize: "1.5rem",
  //                   fontWeight: 600,
  //                   textAlign: "left",
  //                   width: "100px",
  //                 }}
  //               >
  //                 행사기간
  //               </TableCell>
  //               <TableCell>
  //                 <Box display={"flex"}>
  //                   <CustomDatePicker
  //                     label="Start Date"
  //                     defaultValue={dayjs(startDate)}
  //                     value={startDate}
  //                     onChange={(date) => setStartDate(date)}
  //                     maxDate={endDate}
  //                     width={"205px"}
  //                     sx={{ mr: 2 }}
  //                   />
  //                   <CustomDatePicker
  //                     label="End Date"
  //                     defaultValue={dayjs(endDate)}
  //                     value={endDate}
  //                     onChange={(date) => setEndDate(date)}
  //                     minDate={startDate}
  //                     width={"205px"}
  //                   />
  //                 </Box>
  //               </TableCell>
  //             </TableRow>
  //             <TableRow>
  //               <TableCell
  //                 sx={{
  //                   fontSize: "1.5rem",
  //                   fontWeight: 600,
  //                   textAlign: "left",
  //                   width: "10%",
  //                   verticalAlign: "top",
  //                 }}
  //               >
  //                 내용
  //               </TableCell>
  //               <TableCell colSpan={3}>
  //                 <EditorWrapper>
  //                   <CKEditor
  //                     editor={ClassicEditor}
  //                     ref={editorRef}
  //                     config={{
  //                       extraPlugins: [MyCustomUploadAdapterPlugin],
  //                     }}
  //                     data={content}
  //                     onReady={(editor) => {
  //                       // You can store the "editor" and use when it is needed.
  //                       console.log("Editor is ready to use!", editor);
  //                     }}
  //                     onChange={(event, editor) => {
  //                       setContent(editor.getData());
  //                     }}
  //                     onBlur={(event, editor) => {
  //                       console.log("Blur.", editor);
  //                     }}
  //                     onFocus={(event, editor) => {
  //                       console.log("Focus.", editor);
  //                     }}
  //                   />
  //                 </EditorWrapper>
  //               </TableCell>
  //             </TableRow>
  //           </TableBody>
  //         </Table>

  //         <Box display={"flex"} justifyContent={"center"}>
  //           <Box display={"flex"} mt={2}>
  //             <Button
  //               variant="contained"
  //               sx={{ m: 2, width: "100px" }}
  //               onClick={handleInsert}
  //             >
  //               등록
  //             </Button>
  //             <Button
  //               variant="contained"
  //               sx={{ m: 2, width: "100px" }}
  //               color="bfbfbf"
  //               onClick={() => navigate(-1)}
  //             >
  //               취소
  //             </Button>
  //           </Box>
  //         </Box>
  //       </Box>
  //     </ThemeProvider>
  //   );
};

const EditorWrapper = styled.div`
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 500px;
  }

  .ck.ck-editor__editable:not(.ck-editor__nested-editable):focus {
    border-color: #fbd385;
  }
`;

export default EventWrite;
