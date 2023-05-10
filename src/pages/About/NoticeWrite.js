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

  useEffect(() => console.log("re-rendering..."));

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
                  placeholder="제목을 입력하세요."
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
                }}
              >
                내용
              </TableCell>
              <TableCell>
                <CKEditor
                  editor={ClassicEditor}
                  data={data.contents}
                  onChange={(event, editor) => {
                    setData({ ...data, contents: editor.getData() });
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
                    extraStyles: `
          .ck-placeholder {
            color: #757575; /* MUI TextField의 텍스트 컬러와 동일하게 설정 */
            font-family: inherit; /* 부모 요소의 폰트 패밀리와 동일하게 설정 */
            font-size: inherit; /* 부모 요소의 폰트 크기와 동일하게 설정 */
          }
        `,
                  }}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
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
      </Box>
    </ThemeProvider>
  );
};

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
