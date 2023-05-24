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
  ThemeProvider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import { ABOUT } from "../../constants/PageURL";
import styled from "styled-components";
import axios from "axios";
import dayjs from "dayjs";

const pageWidth = "100%";

const NoticeDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const no = searchParams.get("no");
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const search = searchParams.get("search");
  const search_mode = searchParams.get("search_mode");

  const [data, setData] = useState(null);

  useEffect(() => console.log("re-rendering...", no, page, search));
  useEffect(() => {
    axios
      .get("/notice/view?no=" + no)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => console.error("에러발생: ", error));
  }, [no]);

  const deleteData = () => {
    // db연결 후 삭제 구현
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <Box width={pageWidth}>
        <Table width={pageWidth}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  borderBottom: "unset",
                  fontSize: "2rem",
                  fontWeight: 600,
                }}
              >
                [공지] {data && data.subject}
              </TableCell>
            </TableRow>
            <TableRow sx={{ display: "flex" }}>
              <TableCell
                sx={{
                  p: 0,
                  ml: 2,
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid #bfbfbf",
                }}
              >
                <Avatar alt="profile" src={data && data.imgSrc} />
              </TableCell>
              <TableCell
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  fontSize: "1rem",
                }}
              >
                {data && data.nickname}
              </TableCell>
              <TableCell
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <VisibilityIcon
                  color="disabled"
                  sx={{
                    fontSize: "small",
                    alignSelf: "center",
                  }}
                />
                &nbsp;
                {data && data.count}
              </TableCell>
              <TableCell
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {data && dayjs(data.postDate).format("YY/MM/DD HH:mm:ss")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Box
                  sx={{
                    borderBottom: "unset",
                    fontSize: "1rem",
                    mb: "200px",
                  }}
                >
                  {data && data.content}
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow></TableRow>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box display={"flex"}>
                  {data &&
                    (data.nextNo ? (
                      <StyledLink
                        to={ABOUT.NOTICE_DETAIL({
                          no: data.nextNo,
                          page: page,
                          limit: limit,
                          search: search,
                          search_mode: search_mode,
                        })}
                      >
                        &#9664; &nbsp;
                        <div className="subject">{data.nextSub}</div>
                      </StyledLink>
                    ) : (
                      <Box>{data.nextSub}</Box>
                    ))}
                </Box>
                <Box display={"flex"}>
                  {data &&
                    (data.prevNo ? (
                      <StyledLink
                        to={ABOUT.NOTICE_DETAIL({
                          no: data.prevNo,
                          page: page,
                          limit: limit,
                          search: search,
                          search_mode: search_mode,
                        })}
                      >
                        <div className="subject">{data && data.prevSub}</div>
                        &nbsp; &#9654;
                      </StyledLink>
                    ) : (
                      <Box>{data.prevSub}</Box>
                    ))}
                </Box>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Button
            variant="contained"
            sx={{ mt: 2, width: "100px" }}
            color="bfbfbf"
            onClick={() =>
              navigate(
                ABOUT.NOTICE({
                  page: page,
                  limit: limit,
                  search: search,
                  search_mode: search_mode,
                })
              )
            }
          >
            목록
          </Button>
          <Box display={"flex"} mt={2}>
            <Button
              variant="contained"
              sx={{ ml: 2, width: "100px" }}
              onClick={() => navigate(ABOUT.NOTICE_WRITE)}
            >
              수정
            </Button>
            <Button
              variant="contained"
              sx={{ ml: 2, width: "100px" }}
              color="ff8282"
              onClick={deleteData}
            >
              삭제
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
  color: black;
  font-weight: 600;

  :hover {
    .subject {
      text-decoration: underline;
      text-underline-offset: 2px;
    }
  }
`;

const dummy = [
  {
    no: 101,
    memberNo: 1,
    category: "notice",
    subject: "4월 펫밀리 기부내역",
    contents: "4월 많은 분들이 기부해주셨습니다!",
    count: 31,
    postDate: "2023-05-05",
  },
  {
    no: 100,
    memberNo: 1,
    category: "notice",
    subject: "자유게시판 이용 안내",
    contents: "자유게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-05-04",
  },
  {
    no: 99,
    memberNo: 1,
    category: "notice",
    subject: "실종 동물 게시판 이용 안내",
    contents: "실종 동물 게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-05-03",
  },
  {
    no: 98,
    memberNo: 1,
    category: "notice",
    subject: "목격 제보 게시판 이용 안내",
    contents: "목격 제보 게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-05-02",
  },
  {
    no: 97,
    memberNo: 1,
    category: "notice",
    subject: "중고 거래 게시판 이용 안내",
    contents: "중고 거래 게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-05-02",
  },
  {
    no: 96,
    memberNo: 1,
    category: "notice",
    subject: "직거래 사기 주의",
    contents: "직거래시 사기를 조심하세세요!",
    count: 31,
    postDate: "2023-05-01",
  },
  {
    no: 95,
    memberNo: 1,
    category: "notice",
    subject: "사이트 점검 안내",
    contents: "오늘 사이트 점검예정입니다!",
    count: 31,
    postDate: "2023-05-01",
  },
  {
    no: 94,
    memberNo: 1,
    category: "notice",
    subject: "카카오페이 결제 오류 안내",
    contents: "카카오페이 결제 오류가 일시적으로 발생했습니다!",
    count: 31,
    postDate: "2023-05-01",
  },
  {
    no: 93,
    memberNo: 1,
    category: "notice",
    subject: "공지 몇개 더 올리기기",
    contents: "내용 채우기 힘들다...!",
    count: 31,
    postDate: "2023-05-01",
  },
  {
    no: 92,
    memberNo: 1,
    category: "notice",
    subject: "아무거나 공지",
    contents: "이제 뭘 써야 하나...",
    count: 31,
    postDate: "2023-05-01",
  },
  {
    no: 91,
    memberNo: 1,
    category: "notice",
    subject: "복붙 안내",
    contents: "공지 복붙할거임!",
    count: 31,
    postDate: "2023-05-01",
  },
  {
    no: 90,
    memberNo: 1,
    category: "notice",
    subject: "자유게시판 이용 안내",
    contents: "자유게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-05-01",
  },
  {
    no: 89,
    memberNo: 1,
    category: "notice",
    subject: "실종 동물 게시판 이용 안내",
    contents: "실종 동물 게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-04-30",
  },
  {
    no: 88,
    memberNo: 1,
    category: "notice",
    subject: "목격 제보 게시판 이용 안내",
    contents: "목격 제보 게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-04-30",
  },
  {
    no: 87,
    memberNo: 1,
    category: "notice",
    subject: "중고 거래 게시판 이용 안내",
    contents: "중고 거래 게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-04-29",
  },
  {
    no: 86,
    memberNo: 1,
    category: "notice",
    subject: "직거래 사기 주의",
    contents: "직거래시 사기를 조심하세세요!",
    count: 31,
    postDate: "2023-04-29",
  },
  {
    no: 85,
    memberNo: 1,
    category: "notice",
    subject: "사이트 점검 안내",
    contents: "오늘 사이트 점검예정입니다!",
    count: 31,
    postDate: "2023-04-28",
  },
  {
    no: 84,
    memberNo: 1,
    category: "notice",
    subject: "카카오페이 결제 오류 안내",
    contents: "카카오페이 결제 오류가 일시적으로 발생했습니다!",
    count: 31,
    postDate: "2023-04-28",
  },
  {
    no: 83,
    memberNo: 1,
    category: "notice",
    subject: "공지 몇개 더 올리기기",
    contents: "내용 채우기 힘들다...!",
    count: 31,
    postDate: "2023-04-27",
  },
  {
    no: 82,
    memberNo: 1,
    category: "notice",
    subject: "아무거나 공지",
    contents: "이제 뭘 써야 하나...",
    count: 31,
    postDate: "2023-04-27",
  },
  {
    no: 81,
    memberNo: 1,
    category: "notice",
    subject: "복붙 안내",
    contents: "공지 복붙할거임!",
    count: 31,
    postDate: "2023-04-26",
  },
  {
    no: 80,
    memberNo: 1,
    category: "notice",
    subject: "자유게시판 이용 안내",
    contents: "자유게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-04-26",
  },
  {
    no: 79,
    memberNo: 1,
    category: "notice",
    subject: "실종 동물 게시판 이용 안내",
    contents: "실종 동물 게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-04-25",
  },
  {
    no: 78,
    memberNo: 1,
    category: "notice",
    subject: "목격 제보 게시판 이용 안내",
    contents: "목격 제보 게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-04-25",
  },
  {
    no: 77,
    memberNo: 1,
    category: "notice",
    subject: "중고 거래 게시판 이용 안내",
    contents: "중고 거래 게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-04-24",
  },
  {
    no: 76,
    memberNo: 1,
    category: "notice",
    subject: "직거래 사기 주의",
    contents: "직거래시 사기를 조심하세세요!",
    count: 31,
    postDate: "2023-04-24",
  },
  {
    no: 75,
    memberNo: 1,
    category: "notice",
    subject: "사이트 점검 안내",
    contents: "오늘 사이트 점검예정입니다!",
    count: 31,
    postDate: "2023-04-23",
  },
  {
    no: 74,
    memberNo: 1,
    category: "notice",
    subject: "카카오페이 결제 오류 안내",
    contents: "카카오페이 결제 오류가 일시적으로 발생했습니다!",
    count: 31,
    postDate: "2023-04-23",
  },
  {
    no: 73,
    memberNo: 1,
    category: "notice",
    subject: "공지 몇개 더 올리기기",
    contents: "내용 채우기 힘들다...!",
    count: 31,
    postDate: "2023-04-22",
  },
  {
    no: 72,
    memberNo: 1,
    category: "notice",
    subject: "아무거나 공지",
    contents: "이제 뭘 써야 하나...",
    count: 31,
    postDate: "2023-04-22",
  },
  {
    no: 71,
    memberNo: 1,
    category: "notice",
    subject: "복붙 안내",
    contents: "공지 복붙할거임!",
    count: 31,
    postDate: "2023-04-21",
  },
  {
    no: 70,
    memberNo: 1,
    category: "notice",
    subject: "자유게시판 이용 안내",
    contents: "자유게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-04-21",
  },
  {
    no: 69,
    memberNo: 1,
    category: "notice",
    subject: "실종 동물 게시판 이용 안내",
    contents: "실종 동물 게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-04-20",
  },
  {
    no: 68,
    memberNo: 1,
    category: "notice",
    subject: "목격 제보 게시판 이용 안내",
    contents: "목격 제보 게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-04-20",
  },
  {
    no: 67,
    memberNo: 1,
    category: "notice",
    subject: "중고 거래 게시판 이용 안내",
    contents: "중고 거래 게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-04-19",
  },
  {
    no: 66,
    memberNo: 1,
    category: "notice",
    subject: "직거래 사기 주의",
    contents: "직거래시 사기를 조심하세세요!",
    count: 31,
    postDate: "2023-04-19",
  },
  {
    no: 65,
    memberNo: 1,
    category: "notice",
    subject: "사이트 점검 안내",
    contents: "오늘 사이트 점검예정입니다!",
    count: 31,
    postDate: "2023-04-18",
  },
  {
    no: 64,
    memberNo: 1,
    category: "notice",
    subject: "카카오페이 결제 오류 안내",
    contents: "카카오페이 결제 오류가 일시적으로 발생했습니다!",
    count: 31,
    postDate: "2023-04-18",
  },
  {
    no: 63,
    memberNo: 1,
    category: "notice",
    subject: "공지 몇개 더 올리기기",
    contents: "내용 채우기 힘들다...!",
    count: 31,
    postDate: "2023-04-17",
  },
  {
    no: 62,
    memberNo: 1,
    category: "notice",
    subject: "아무거나 공지",
    contents: "이제 뭘 써야 하나...",
    count: 31,
    postDate: "2023-04-17",
  },
  {
    no: 61,
    memberNo: 1,
    category: "notice",
    subject: "복붙 안내",
    contents: "공지 복붙할거임!",
    count: 31,
    postDate: "2023-04-16",
  },
  {
    no: 60,
    memberNo: 1,
    category: "notice",
    subject: "자유게시판 이용 안내",
    contents: "자유게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-04-16",
  },
  {
    no: 59,
    memberNo: 1,
    category: "notice",
    subject: "실종 동물 게시판 이용 안내",
    contents: "실종 동물 게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-04-15",
  },
  {
    no: 58,
    memberNo: 1,
    category: "notice",
    subject: "목격 제보 게시판 이용 안내",
    contents: "목격 제보 게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-04-15",
  },
  {
    no: 57,
    memberNo: 1,
    category: "notice",
    subject: "중고 거래 게시판 이용 안내",
    contents: "중고 거래 게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-04-14",
  },
  {
    no: 56,
    memberNo: 1,
    category: "notice",
    subject: "직거래 사기 주의",
    contents: "직거래시 사기를 조심하세세요!",
    count: 31,
    postDate: "2023-04-14",
  },
  {
    no: 55,
    memberNo: 1,
    category: "notice",
    subject: "사이트 점검 안내",
    contents: "오늘 사이트 점검예정입니다!",
    count: 31,
    postDate: "2023-04-13",
  },
  {
    no: 54,
    memberNo: 1,
    category: "notice",
    subject: "카카오페이 결제 오류 안내",
    contents: "카카오페이 결제 오류가 일시적으로 발생했습니다!",
    count: 31,
    postDate: "2023-04-13",
  },
  {
    no: 53,
    memberNo: 1,
    category: "notice",
    subject: "공지 몇개 더 올리기기",
    contents: "내용 채우기 힘들다...!",
    count: 31,
    postDate: "2023-04-12",
  },
  {
    no: 52,
    memberNo: 1,
    category: "notice",
    subject: "아무거나 공지",
    contents: "이제 뭘 써야 하나...",
    count: 31,
    postDate: "2023-04-12",
  },
  {
    no: 51,
    memberNo: 1,
    category: "notice",
    subject: "복붙 안내",
    contents: "공지 복붙할거임!",
    count: 31,
    postDate: "2023-04-11",
  },
  {
    no: 50,
    memberNo: 1,
    category: "notice",
    subject: "자유게시판 이용 안내",
    contents: "자유게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-04-11",
  },
  {
    no: 49,
    memberNo: 1,
    category: "notice",
    subject: "실종 동물 게시판 이용 안내",
    contents: "실종 동물 게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-04-10",
  },
  {
    no: 48,
    memberNo: 1,
    category: "notice",
    subject: "목격 제보 게시판 이용 안내",
    contents: "목격 제보 게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-04-10",
  },
  {
    no: 47,
    memberNo: 1,
    category: "notice",
    subject: "중고 거래 게시판 이용 안내",
    contents: "중고 거래 게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-04-09",
  },
  {
    no: 46,
    memberNo: 1,
    category: "notice",
    subject: "직거래 사기 주의",
    contents: "직거래시 사기를 조심하세세요!",
    count: 31,
    postDate: "2023-04-09",
  },
  {
    no: 45,
    memberNo: 1,
    category: "notice",
    subject: "사이트 점검 안내",
    contents: "오늘 사이트 점검예정입니다!",
    count: 31,
    postDate: "2023-04-08",
  },
  {
    no: 44,
    memberNo: 1,
    category: "notice",
    subject: "카카오페이 결제 오류 안내",
    contents: "카카오페이 결제 오류가 일시적으로 발생했습니다!",
    count: 31,
    postDate: "2023-04-08",
  },
  {
    no: 43,
    memberNo: 1,
    category: "notice",
    subject: "공지 몇개 더 올리기기",
    contents: "내용 채우기 힘들다...!",
    count: 31,
    postDate: "2023-04-07",
  },
  {
    no: 42,
    memberNo: 1,
    category: "notice",
    subject: "아무거나 공지",
    contents: "이제 뭘 써야 하나...",
    count: 31,
    postDate: "2023-04-07",
  },
  {
    no: 41,
    memberNo: 1,
    category: "notice",
    subject: "복붙 안내",
    contents: "공지 복붙할거임!",
    count: 31,
    postDate: "2023-04-06",
  },
  {
    no: 40,
    memberNo: 1,
    category: "notice",
    subject: "자유게시판 이용 안내",
    contents: "자유게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-04-06",
  },
  {
    no: 39,
    memberNo: 1,
    category: "notice",
    subject: "실종 동물 게시판 이용 안내",
    contents: "실종 동물 게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-04-05",
  },
  {
    no: 38,
    memberNo: 1,
    category: "notice",
    subject: "목격 제보 게시판 이용 안내",
    contents: "목격 제보 게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-04-05",
  },
  {
    no: 37,
    memberNo: 1,
    category: "notice",
    subject: "중고 거래 게시판 이용 안내",
    contents: "중고 거래 게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-04-04",
  },
  {
    no: 36,
    memberNo: 1,
    category: "notice",
    subject: "직거래 사기 주의",
    contents: "직거래시 사기를 조심하세세요!",
    count: 31,
    postDate: "2023-04-04",
  },
  {
    no: 35,
    memberNo: 1,
    category: "notice",
    subject: "사이트 점검 안내",
    contents: "오늘 사이트 점검예정입니다!",
    count: 31,
    postDate: "2023-04-03",
  },
  {
    no: 34,
    memberNo: 1,
    category: "notice",
    subject: "카카오페이 결제 오류 안내",
    contents: "카카오페이 결제 오류가 일시적으로 발생했습니다!",
    count: 31,
    postDate: "2023-04-03",
  },
  {
    no: 33,
    memberNo: 1,
    category: "notice",
    subject: "공지 몇개 더 올리기기",
    contents: "내용 채우기 힘들다...!",
    count: 31,
    postDate: "2023-04-02",
  },
  {
    no: 32,
    memberNo: 1,
    category: "notice",
    subject: "아무거나 공지",
    contents: "이제 뭘 써야 하나...",
    count: 31,
    postDate: "2023-04-02",
  },
  {
    no: 31,
    memberNo: 1,
    category: "notice",
    subject: "복붙 안내",
    contents: "공지 복붙할거임!",
    count: 31,
    postDate: "2023-04-01",
  },
  {
    no: 30,
    memberNo: 1,
    category: "notice",
    subject: "자유게시판 이용 안내",
    contents: "자유게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-04-01",
  },
  {
    no: 29,
    memberNo: 1,
    category: "notice",
    subject: "실종 동물 게시판 이용 안내",
    contents: "실종 동물 게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-03-31",
  },
  {
    no: 28,
    memberNo: 1,
    category: "notice",
    subject: "목격 제보 게시판 이용 안내",
    contents: "목격 제보 게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-03-31",
  },
  {
    no: 27,
    memberNo: 1,
    category: "notice",
    subject: "중고 거래 게시판 이용 안내",
    contents: "중고 거래 게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-03-30",
  },
  {
    no: 26,
    memberNo: 1,
    category: "notice",
    subject: "직거래 사기 주의",
    contents: "직거래시 사기를 조심하세세요!",
    count: 31,
    postDate: "2023-03-30",
  },
  {
    no: 25,
    memberNo: 1,
    category: "notice",
    subject: "사이트 점검 안내",
    contents: "오늘 사이트 점검예정입니다!",
    count: 31,
    postDate: "2023-03-29",
  },
  {
    no: 24,
    memberNo: 1,
    category: "notice",
    subject: "카카오페이 결제 오류 안내",
    contents: "카카오페이 결제 오류가 일시적으로 발생했습니다!",
    count: 31,
    postDate: "2023-03-29",
  },
  {
    no: 23,
    memberNo: 1,
    category: "notice",
    subject: "공지 몇개 더 올리기기",
    contents: "내용 채우기 힘들다...!",
    count: 31,
    postDate: "2023-03-28",
  },
  {
    no: 22,
    memberNo: 1,
    category: "notice",
    subject: "아무거나 공지",
    contents: "이제 뭘 써야 하나...",
    count: 31,
    postDate: "2023-03-28",
  },
  {
    no: 21,
    memberNo: 1,
    category: "notice",
    subject: "복붙 안내",
    contents: "공지 복붙할거임!",
    count: 31,
    postDate: "2023-03-27",
  },
  {
    no: 20,
    memberNo: 1,
    category: "notice",
    subject: "자유게시판 이용 안내",
    contents: "자유게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-03-27",
  },
  {
    no: 19,
    memberNo: 1,
    category: "notice",
    subject: "실종 동물 게시판 이용 안내",
    contents: "실종 동물 게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-03-26",
  },
  {
    no: 18,
    memberNo: 1,
    category: "notice",
    subject: "목격 제보 게시판 이용 안내",
    contents: "목격 제보 게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-03-26",
  },
  {
    no: 17,
    memberNo: 1,
    category: "notice",
    subject: "중고 거래 게시판 이용 안내",
    contents: "중고 거래 게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-03-25",
  },
  {
    no: 16,
    memberNo: 1,
    category: "notice",
    subject: "직거래 사기 주의",
    contents: "직거래시 사기를 조심하세세요!",
    count: 31,
    postDate: "2023-03-25",
  },
  {
    no: 15,
    memberNo: 1,
    category: "notice",
    subject: "사이트 점검 안내",
    contents: "오늘 사이트 점검예정입니다!",
    count: 31,
    postDate: "2023-03-24",
  },
  {
    no: 14,
    memberNo: 1,
    category: "notice",
    subject: "카카오페이 결제 오류 안내",
    contents: "카카오페이 결제 오류가 일시적으로 발생했습니다!",
    count: 31,
    postDate: "2023-03-24",
  },
  {
    no: 13,
    memberNo: 1,
    category: "notice",
    subject: "공지 몇개 더 올리기기",
    contents: "내용 채우기 힘들다...!",
    count: 31,
    postDate: "2023-03-23",
  },
  {
    no: 12,
    memberNo: 1,
    category: "notice",
    subject: "아무거나 공지",
    contents: "이제 뭘 써야 하나...",
    count: 31,
    postDate: "2023-03-23",
  },
  {
    no: 11,
    memberNo: 1,
    category: "notice",
    subject: "복붙 안내",
    contents: "공지 복붙할거임!",
    count: 31,
    postDate: "2023-03-22",
  },
  {
    no: 10,
    memberNo: 1,
    category: "notice",
    subject: "자유게시판 이용 안내",
    contents: "자유게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-03-22",
  },
  {
    no: 9,
    memberNo: 1,
    category: "notice",
    subject: "실종 동물 게시판 이용 안내",
    contents: "실종 동물 게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-03-21",
  },
  {
    no: 8,
    memberNo: 1,
    category: "notice",
    subject: "목격 제보 게시판 이용 안내",
    contents: "목격 제보 게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-03-21",
  },
  {
    no: 7,
    memberNo: 1,
    category: "notice",
    subject: "중고 거래 게시판 이용 안내",
    contents: "중고 거래 게시판을 다음과 같이 사용해주세요!",
    count: 31,
    postDate: "2023-03-20",
  },
  {
    no: 6,
    memberNo: 1,
    category: "notice",
    subject: "직거래 사기 주의",
    contents: "직거래시 사기를 조심하세세요!",
    count: 31,
    postDate: "2023-03-20",
  },
  {
    no: 5,
    memberNo: 1,
    category: "notice",
    subject: "사이트 점검 안내",
    contents: "오늘 사이트 점검예정입니다!",
    count: 31,
    postDate: "2023-03-19",
  },
  {
    no: 4,
    memberNo: 1,
    category: "notice",
    subject: "카카오페이 결제 오류 안내",
    contents: "카카오페이 결제 오류가 일시적으로 발생했습니다!",
    count: 31,
    postDate: "2023-03-19",
  },
  {
    no: 3,
    memberNo: 1,
    category: "notice",
    subject: "공지 몇개 더 올리기기",
    contents: "내용 채우기 힘들다...!",
    count: 31,
    postDate: "2023-03-18",
  },
  {
    no: 2,
    memberNo: 1,
    category: "notice",
    subject: "아무거나 공지",
    contents: "이제 뭘 써야 하나...",
    count: 31,
    postDate: "2023-03-18",
  },
  {
    no: 1,
    memberNo: 1,
    category: "notice",
    subject: "복붙 안내",
    contents: "공지 복붙할거임!",
    count: 31,
    postDate: "2023-03-17",
  },
];

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

export default NoticeDetail;
