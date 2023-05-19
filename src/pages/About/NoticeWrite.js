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
import {
  MyCustomUploadAdapterPlugin,
  MyUploadAdapter,
} from "../../components/common/UploadAdapter";

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
                <EditorWrapper>
                  <CKEditor
                    editor={ClassicEditor}
                    config={{
                      extraPlugins: [MyCustomUploadAdapterPlugin],
                    }}
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

export const EditorWrapper = styled.div`
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 500px;
  }

  .ck.ck-editor__editable:not(.ck-editor__nested-editable):focus {
    border-color: #fbd385;
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
