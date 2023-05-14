import {
  Avatar,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import { ABOUT } from "../../constants/PageURL";
import styled from "styled-components";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import dayjs from "dayjs";

const pageWidth = "80%";

const NoticeWrite = () => {
  const navigate = useNavigate();
  const fileList = []; // 업로드한 파일들을 저장하는 배열
  const [data, setData] = useState({
    no: null,
    memberNo: 1,
    category: "",
    subject: "",
    contents: "",
    count: 0,
    postDate: dayjs(),
    imgThumbnail: "",
  });

  useEffect(() => console.log("re-rendering...", data, fileList));

  function uploadAdapter(loader) {
    return {
      upload: () => {
        console.log("loader:", loader);
        return new Promise((resolve, reject) => {
          const uploadFiles = Array.prototype.slice.call(loader.file); // 파일선택창에서 선택한 파일들

          uploadFiles.forEach((uploadFile) => {
            fileList.push(uploadFile);
          });
          // const body = new FormData();
          // loader.file
          //   .then((file) => {
          //     body.append("uploadImg", file);
          //     console.log("filename:", file.name);
          //   })
          //   .then((file) => {
          //     console.log("body:", body.get("uploadImg"));
          //   });
        });
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <ThemeProvider theme={CustomTheme}>
      <Box width={pageWidth}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={2}
                sx={{
                  fontSize: "3rem",
                  fontWeight: 600,
                  textAlign: "center",
                  p: 10,
                }}
              >
                공지사항 작성
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
                  width: "60px",
                }}
              >
                제목
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  fullWidth
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
                  width: "60px",
                  verticalAlign: "top",
                }}
              >
                내용
              </TableCell>
              <TableCell>
                <CKEditor
                  config={{
                    extraPlugins: [uploadPlugin],
                  }}
                  editor={ClassicEditor}
                  data={data.contents}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    setData({ ...data, contents: editor.getData() });
                  }}
                  onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                  }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Box display={"flex"} justifyContent={"center"}>
          <Box display={"flex"} mt={2}>
            <Button
              variant="contained"
              sx={{ m: 2, width: "100px" }}
              color="fbd385"
              onClick={() => navigate(ABOUT.NOTICE_WRITE)}
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
        <Box>
          <div dangerouslySetInnerHTML={{ __html: data.contents }}></div>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const CustomCKEditor = styled(CKEditor)`
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 400px;
    margin-bottom: 20px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: 600;
  :hover {
    text-decoration: underline;
  }
`;

const member = {
  num: 1,
  id: "Admin",
  pw: "1234",
  nickname: "관리자",
  email: "asdf@naver.com",
  name: "관리자",
  gender: "남자",
  birth: "2023-01-01",
  tel: "010-1234-5678",
  addr: "서울특별시 강남구 선릉로 428",
  img: "/images/emptyProfile.png",
  role: "admin",
};

export default NoticeWrite;
