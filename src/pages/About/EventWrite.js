import {
  Box,
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
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

const pageWidth = "100%";

const EventWrite = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [startDate, setStartDate] = useState(dayjs().startOf("date"));
  const [endDate, setEndDate] = useState(dayjs().endOf("date"));
  const [mode, setMode] = useState("create");
  const titleRef = useRef();
  const editorRef = useRef();

  useEffect(() =>
    console.log("re-rendering...", startDate, endDate, thumbnail)
  );

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

  const handleInsert = () => {
    const editorInstance = editorRef.current.editor;
    if (subject.trim() === "") {
      alert("제목을 입력하세요.");
      titleRef.current.focus();
    } else if (content.trim() === "") {
      alert("내용을 입력하세요.");
      editorInstance.editing.view.focus();
      editorInstance.ui.view.element.scrollIntoView({
        block: "center",
      });
    } else {
      switch (mode) {
        case "create":
          axios
            .post("/event/insert", {
              subject: subject,
              content: content,
              thumbnail: thumbnail,
              startDate: startDate,
              endDate: endDate,
            })
            .then((response) => console.log("등록?:", response.data))
            .catch((error) => console.error("에러 발생! :", error))
            .finally(() => {
              alert("등록되었습니다!");
              navigate(ABOUT.EVENT());
            });
          break;
        case "update":
          axios
            .post("/event/update", {
              no: state.data.no,
              subject: subject,
              content: content,
              thumbnail: thumbnail,
              startDate: startDate,
              endDate: endDate,
            })
            .then((response) => console.log("수정?:", response.data))
            .catch((error) => console.error("에러 발생! :", error))
            .finally(() => {
              alert("수정되었습니다!");
              navigate(-1);
            });
          break;
        default:
          console.log();
      }
    }
  };

  const handleImgUpload = (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    axios
      .post("/upload", formData)
      .then((response) => {
        setThumbnail(response.data);
      })
      .catch((error) => console.error("에러발생:", error));
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <Box width={pageWidth}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={4}
                sx={{
                  fontSize: "3rem",
                  fontWeight: 600,
                  textAlign: "center",
                  p: 10,
                }}
              >
                이벤트 작성
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  textAlign: "left",
                  width: "10%",
                }}
              >
                제목
              </TableCell>
              <TableCell colSpan={3}>
                <TextField
                  size="small"
                  fullWidth
                  value={subject}
                  onChange={
                    (event) => setSubject(event.target.value)
                    // setData({ ...data, subject: event.target.value })
                  }
                  inputRef={titleRef}
                  // placeholder="제목을 입력하세요."
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  textAlign: "left",
                  width: "10%",
                }}
              >
                썸네일
              </TableCell>
              <TableCell
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignContent: "center",
                  }}
                >
                  <Input
                    type="file"
                    disableUnderline
                    onChange={handleImgUpload}
                  />
                </Box>
                {thumbnail && (
                  <img alt="썸네일 미리보기" src={thumbnail} height={"90px"} />
                )}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  textAlign: "left",
                  width: "100px",
                }}
              >
                행사기간
              </TableCell>
              <TableCell>
                <Box display={"flex"}>
                  <CustomDatePicker
                    label="Start Date"
                    defaultValue={dayjs(startDate)}
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                    maxDate={endDate}
                    width={"205px"}
                    sx={{ mr: 2 }}
                  />
                  <CustomDatePicker
                    label="End Date"
                    defaultValue={dayjs(endDate)}
                    value={endDate}
                    onChange={(date) => setEndDate(date)}
                    minDate={startDate}
                    width={"205px"}
                  />
                </Box>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  textAlign: "left",
                  width: "10%",
                  verticalAlign: "top",
                }}
              >
                내용
              </TableCell>
              <TableCell colSpan={3}>
                <EditorWrapper>
                  <CKEditor
                    editor={ClassicEditor}
                    ref={editorRef}
                    config={{
                      extraPlugins: [MyCustomUploadAdapterPlugin],
                    }}
                    data={content}
                    onReady={(editor) => {
                      // You can store the "editor" and use when it is needed.
                      console.log("Editor is ready to use!", editor);
                    }}
                    onChange={(event, editor) => {
                      setContent(editor.getData());
                    }}
                    onBlur={(event, editor) => {
                      console.log("Blur.", editor);
                    }}
                    onFocus={(event, editor) => {
                      console.log("Focus.", editor);
                    }}
                  />
                </EditorWrapper>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Box display={"flex"} justifyContent={"center"}>
          <Box display={"flex"} mt={2}>
            <Button
              variant="contained"
              sx={{ m: 2, width: "100px" }}
              onClick={handleInsert}
            >
              등록
            </Button>
            <Button
              variant="contained"
              sx={{ m: 2, width: "100px" }}
              color="bfbfbf"
              onClick={() => navigate(-1)}
            >
              취소
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export const EditorWrapper = styled.div`
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 500px;
  }

  .ck.ck-editor__editable:not(.ck-editor__nested-editable):focus {
    border-color: #fbd385;
  }
`;

export default EventWrite;
