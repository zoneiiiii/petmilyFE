import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CustomButton from "../Login/CustomButton";
import Grid from "@mui/material/Grid";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { MYPAGE } from "../../constants/PageURL";
import { ThemeProvider, Typography } from "@mui/material";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import Loading from "../../components/Loading/LoadingPage";
import NotFound from "../NotFound/NotFound";
import DOMPurify from "dompurify";

const MyPageQnADetail = () => {
  const { id } = useParams();
  const [qnaData, setQnaData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); //로딩 상태
  const navigate = useNavigate();
  //  const { userNum } = useContext(AuthContext);

  useEffect(() => {
    //게시글 Detail 호출
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/board/qna/${id}`
        ); //게시글 Detail 데이터  호출
        setQnaData(response.data);
      } catch (error) {
        console.error("Error fetching data : ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (isLoading) {
    return <Loading />; // 로딩 중일 때 표시할 컴포넌트
  }

  if (!qnaData) {
    return <NotFound />; //존재하지 않는 번호를 넣었을 때 표시할 컴포넌트
  }

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  const handleDelete = async () => {
    // 삭제
    const result = window.confirm("정말 삭제하시겠습니까?");
    if (result) {
      try {
        await axios.delete(`http://localhost:8080/board/qna/${id}`);
        alert("게시물이 삭제되었습니다.");
        navigate(MYPAGE.QNA);
      } catch (error) {
        console.error("Error deleting post: ", error);
      }
    }
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <Typography
        className="myOrderListTitle"
        sx={titleSx}
        border={3}
        borderColor="#ffbd59"
        mb={4}
      >
        1:1 문의
      </Typography>
      <Grid style={{ width: "940px" }}>
        <Table sx={{ mt: 1 }}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}></TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: 780, fontWeight: "bold" }}>
                {qnaData.qnaSubject}
              </TableCell>
              <TableCell sx={{ color: "lightgray" }}>
                {qnaData.qnaDate}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={2}
                dangerouslySetInnerHTML={createMarkup(qnaData.qnaContent)}
              />
            </TableRow>
          </TableBody>
        </Table>
        <Table sx={{ mt: 7 }}>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2} sx={{ fontWeight: "bold" }}>
                관리자 답변
              </TableCell>
            </TableRow>
            <TableRow>
              {qnaData.qnaStatus === false ? (
                <TableCell
                  colSpan={2}
                  sx={{ height: 100, color: "gray" }}
                  align="center"
                >
                  답변이 등록되지 않았습니다.
                </TableCell>
              ) : (
                <TableCell
                  colSpan={2}
                  sx={{ height: 100, color: "gray" }}
                  align="center"
                >
                  {qnaData.adminAnswer}
                </TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
        <CustomButton label="문의취소" value="삭제" onClick={handleDelete} />
        <Link to={MYPAGE.QNA} style={{ textDecoration: "none" }}>
          <CustomButton label="목록으로" value="목록으로" />
        </Link>
      </Grid>
    </ThemeProvider>
  );
};
const titleSx = {
  width: "200px",
  textAlign: "center",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "1.5rem",
  lineHeight: "50px",
};
export default MyPageQnADetail;
