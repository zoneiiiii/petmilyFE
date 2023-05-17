import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ThemeProvider,
} from "@mui/material";
import SearchBar from "../../components/common/SearchBar";
import { useEffect, useState } from "react";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ABOUT } from "../../constants/PageURL";
import styled from "styled-components";

const pageWidth = "100%";
// 검색 방식
const searchModes = {
  subject_contents: "subject_contents",
  subject: "subject",
  contents: "contents",
};
const Notice = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const search = searchParams.get("search");
  const search_mode = searchParams.get("search_mode");

  const navigate = useNavigate();
  const [nowPage, setNowPage] = useState(1);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [searchMode, setSearchMode] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [foundData, setFoundData] = useState(dummy);
  const [pagedData, setPagedData] = useState(dummy.slice(0, 20));

  // 초기 세팅
  useEffect(() => {
    setNowPage(page ? parseInt(page) : 1);
    setSearchKeyWord(search ? search : "");
    setRowsPerPage(limit ? parseInt(limit) : 20);
    setSearchMode(search_mode ? search_mode : searchModes.subject_contents);
    search && findDataByMode(search, search_mode);
  }, [limit, page, search]);

  // 페이지 표시 데이터 갱신
  useEffect(() => {
    setPagedData(
      foundData.slice((nowPage - 1) * rowsPerPage, nowPage * rowsPerPage)
    );
  }, [nowPage, rowsPerPage, foundData]);

  const handleChangePage = (event, newPage) => {
    navigate(
      ABOUT.NOTICE({
        page: newPage,
        limit: limit,
        search: search,
        search_mode: search_mode,
      })
    );
  };

  // 페이지 표시 데이터수 변경
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    navigate(
      ABOUT.NOTICE({
        page: nowPage,
        limit: event.target.value,
        search: search,
        search_mode: search_mode,
      })
    );
  };

  // 검색 방식 변경
  const handleChangeSearchMode = (event) => {
    console.log(event.target.value);
    setSearchMode(event.target.value);
  };

  // 검색
  const handleSearch = (value) => {
    setNowPage(1);
    findDataByMode(value, searchMode);
    navigate(
      ABOUT.NOTICE({
        page: 1,
        limit: rowsPerPage,
        search: value,
        search_mode: searchMode,
      })
    );
  };

  // 검색 방식 설정
  function findDataByMode(value, searchMode) {
    switch (searchMode) {
      case searchModes.subject_contents:
        setFoundData(
          dummy.filter(
            (data) =>
              data.subject.includes(value) || data.contents.includes(value)
          )
        );
        break;
      case searchModes.subject:
        setFoundData(dummy.filter((data) => data.subject.includes(value)));
        break;
      case searchModes.contents:
        setFoundData(dummy.filter((data) => data.contents.includes(value)));
        break;
      default:
    }
  }

  return (
    <ThemeProvider theme={CustomTheme}>
      <Box width={pageWidth}>
        <Box
          width={pageWidth}
          display={"flex"}
          justifyContent={"space-between"}
          mt={2}
          mb={2}
        >
          <FormControl sx={FormControlSx} size="small" color="text">
            <Select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
              <MenuItem value={10}>10개</MenuItem>
              <MenuItem value={20}>20개</MenuItem>
              <MenuItem value={50}>50개</MenuItem>
              <MenuItem value={100}>100개</MenuItem>
            </Select>
          </FormControl>
          <Box display={"flex"} justifyContent={"flex-end"}>
            <FormControl sx={FormControlSx} size="small">
              <Select
                defaultValue={searchModes.subject_contents}
                onChange={handleChangeSearchMode}
              >
                <MenuItem value={searchModes.subject_contents}>
                  제목 + 내용
                </MenuItem>
                <MenuItem value={searchModes.subject}>제목</MenuItem>
                <MenuItem value={searchModes.contents}>내용</MenuItem>
              </Select>
            </FormControl>
            <SearchBar
              setValue={setSearchKeyWord}
              value={searchKeyWord}
              onClick={handleSearch}
            />
          </Box>
        </Box>
        <Table sx={TableSx}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#fbd385" }}>
              <TableCell sx={thSx}>No.</TableCell>
              <TableCell sx={thSx}>제목</TableCell>
              <TableCell sx={thSx}>작성자</TableCell>
              <TableCell sx={thSx}>조회수</TableCell>
              <TableCell sx={thSx}>작성일자</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pagedData.map((notice, index) => {
              return (
                <TableRow key={index}>
                  <TableCell sx={{ ...tdSx, minWidth: "40px" }}>
                    {notice.no}
                  </TableCell>
                  <TableCell
                    sx={{
                      ...tdSx,
                      textAlign: "left",
                      width: "60%",
                    }}
                  >
                    <StyledLink
                      to={ABOUT.NOTICE_DETAIL({
                        no: notice.no,
                        page: nowPage,
                        limit: rowsPerPage,
                        search: searchKeyWord,
                        search_mode: searchMode,
                      })}
                    >
                      {notice.subject}
                    </StyledLink>
                  </TableCell>
                  <TableCell
                    sx={{ ...tdSx, width: "100px", justifySelf: "end" }}
                  >
                    {notice.writer}
                  </TableCell>
                  <TableCell
                    sx={{ ...tdSx, width: "50px", justifySelf: "end" }}
                  >
                    {notice.count}
                  </TableCell>
                  <TableCell
                    sx={{ ...tdSx, width: "110px", justifySelf: "end" }}
                  >
                    {notice.postData}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Box
          width={pageWidth}
          display={"flex"}
          justifyContent={"flex-end"}
          mt={2}
        >
          <Button
            variant="contained"
            sx={{ mr: 3, width: "100px" }}
            onClick={() => navigate(ABOUT.NOTICE_WRITE)}
          >
            글쓰기
          </Button>
        </Box>
        <Box width={pageWidth} display={"flex"} justifyContent={"center"} m={2}>
          <Pagination
            count={Math.ceil(foundData.length / rowsPerPage)}
            defaultPage={page ? parseInt(page) : 1}
            page={page ? parseInt(page) : 1}
            color="fbd385"
            showFirstButton
            showLastButton
            onChange={handleChangePage}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const FormControlSx = {
  mr: 2,
  minWidth: 120,
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      // 평상시의 테두리
      borderColor: "#fbd385",
    },
    "&:hover fieldset": {
      // 마우스 올린 상태의 테두리
      borderColor: "#1976d2",
    },
    // "&.Mui-focused fieldset": { // 클릭된 상태의 테두리
    //   borderColor: "#fbd385",
    // },
  },
};

const TableSx = { width: pageWidth };
const thSx = { fontSize: "1rem", fontWeight: 600, textAlign: "center" };
const tdSx = {
  fontSize: "1rem",
  fontWeight: 500,
  textAlign: "center",
};
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  :hover {
    text-decoration: underline;
  }
  :visited {
    color: purple;
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
const dummy2 = [
  {
    no: "001",
    subject: "유기동물 구조활동",
    writer: "펫밀리펫밀리",
    count: 31,
    postData: "2023-05-05",
    contents: "유기동물을 열심히 구조했습니다!",
  },
  {
    no: "002",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 32,
    postData: "2023-04-30",
    contents: "유기동물을 열심히 산책했습니다!",
  },
  {
    no: "003",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 33,
    postData: "2023-04-29",
    contents: "유기동물을 열심히 밥줬습니다!",
  },
  {
    no: "004",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 34,
    postData: "2023-04-23",
    contents: "유기동물을 열심히 케어했습니다!",
  },
  {
    no: "005",
    subject: "유기동물 구조활동",
    writer: "산책왕",
    count: 35,
    postData: "2023-04-22",
    contents: "유기동물을 열심히 훈련했습니다!",
  },
  {
    no: "006",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 36,
    postData: "2023-04-16",
    contents: "유기동물을 열심히 보살폈습니다!",
  },
  {
    no: "007",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 37,
    postData: "2023-04-15",
    contents: "유기동물을 열심히 치료했습니다!",
  },
  {
    no: "008",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 38,
    postData: "2023-04-09",
    contents: "유기동물을 열심히 분양했습니다!",
  },
  {
    no: "009",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 39,
    postData: "2023-04-08",
    contents: "유기동물을 열심히 놀아주었습니다!",
  },
  {
    no: "010",
    subject: "유기동물 산책활동",
    writer: "펫밀리",
    count: 40,
    postData: "2023-04-02",
    contents: "유기동물을 열심히 챙겨줬습니다!",
  },
  {
    no: "011",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 31,
    postData: "2023-05-05",
    contents: "유기동물을 열심히 구조했습니다!",
  },
  {
    no: "012",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 32,
    postData: "2023-04-30",
    contents: "유기동물을 열심히 산책했습니다!",
  },
  {
    no: "013",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 33,
    postData: "2023-04-29",
    contents: "유기동물을 열심히 밥줬습니다!",
  },
  {
    no: "014",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 34,
    postData: "2023-04-23",
    contents: "유기동물을 열심히 케어했습니다!",
  },
  {
    no: "015",
    subject: "유기동물 구조활동",
    writer: "산책왕",
    count: 35,
    postData: "2023-04-22",
    contents: "유기동물을 열심히 훈련했습니다!",
  },
  {
    no: "016",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 36,
    postData: "2023-04-16",
    contents: "유기동물을 열심히 보살폈습니다!",
  },
  {
    no: "017",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 37,
    postData: "2023-04-15",
    contents: "유기동물을 열심히 치료했습니다!",
  },
  {
    no: "018",
    subject: "유기동물 구조활동",
    writer: "산책왕",
    count: 38,
    postData: "2023-04-09",
    contents: "유기동물을 열심히 분양했습니다!",
  },
  {
    no: "019",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 39,
    postData: "2023-04-08",
    contents: "유기동물을 열심히 놀아주었습니다!",
  },
  {
    no: "020",
    subject: "유기동물 산책활동",
    writer: "펫밀리",
    count: 40,
    postData: "2023-04-02",
    contents: "유기동물을 열심히 챙겨줬습니다!",
  },
  {
    no: "021",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 31,
    postData: "2023-05-05",
    contents: "유기동물을 열심히 구조했습니다!",
  },
  {
    no: "022",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 32,
    postData: "2023-04-30",
    contents: "유기동물을 열심히 산책했습니다!",
  },
  {
    no: "023",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 33,
    postData: "2023-04-29",
    contents: "유기동물을 열심히 밥줬습니다!",
  },
  {
    no: "024",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 34,
    postData: "2023-04-23",
    contents: "유기동물을 열심히 케어했습니다!",
  },
  {
    no: "025",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 35,
    postData: "2023-04-22",
    contents: "유기동물을 열심히 훈련했습니다!",
  },
  {
    no: "026",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 36,
    postData: "2023-04-16",
    contents: "유기동물을 열심히 보살폈습니다!",
  },
  {
    no: "027",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 37,
    postData: "2023-04-15",
    contents: "유기동물을 열심히 치료했습니다!",
  },
  {
    no: "028",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 38,
    postData: "2023-04-09",
    contents: "유기동물을 열심히 분양했습니다!",
  },
  {
    no: "029",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 39,
    postData: "2023-04-08",
    contents: "유기동물을 열심히 놀아주었습니다!",
  },
  {
    no: "030",
    subject: "유기동물 산책활동",
    writer: "펫밀리",
    count: 40,
    postData: "2023-04-02",
    contents: "유기동물을 열심히 챙겨줬습니다!",
  },
  {
    no: "031",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 31,
    postData: "2023-05-05",
    contents: "유기동물을 열심히 구조했습니다!",
  },
  {
    no: "032",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 32,
    postData: "2023-04-30",
    contents: "유기동물을 열심히 산책했습니다!",
  },
  {
    no: "033",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 33,
    postData: "2023-04-29",
    contents: "유기동물을 열심히 밥줬습니다!",
  },
  {
    no: "034",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 34,
    postData: "2023-04-23",
    contents: "유기동물을 열심히 케어했습니다!",
  },
  {
    no: "035",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 35,
    postData: "2023-04-22",
    contents: "유기동물을 열심히 훈련했습니다!",
  },
  {
    no: "036",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 36,
    postData: "2023-04-16",
    contents: "유기동물을 열심히 보살폈습니다!",
  },
  {
    no: "037",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 37,
    postData: "2023-04-15",
    contents: "유기동물을 열심히 치료했습니다!",
  },
  {
    no: "038",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 38,
    postData: "2023-04-09",
    contents: "유기동물을 열심히 분양했습니다!",
  },
  {
    no: "039",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 39,
    postData: "2023-04-08",
    contents: "유기동물을 열심히 놀아주었습니다!",
  },
  {
    no: "040",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 40,
    postData: "2023-04-02",
    contents: "유기동물을 열심히 챙겨줬습니다!",
  },
  {
    no: "041",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 31,
    postData: "2023-05-05",
    contents: "유기동물을 열심히 구조했습니다!",
  },
  {
    no: "042",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 32,
    postData: "2023-04-30",
    contents: "유기동물을 열심히 산책했습니다!",
  },
  {
    no: "043",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 33,
    postData: "2023-04-29",
    contents: "유기동물을 열심히 밥줬습니다!",
  },
  {
    no: "044",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 34,
    postData: "2023-04-23",
    contents: "유기동물을 열심히 케어했습니다!",
  },
  {
    no: "045",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 35,
    postData: "2023-04-22",
    contents: "유기동물을 열심히 훈련했습니다!",
  },
  {
    no: "046",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 36,
    postData: "2023-04-16",
    contents: "유기동물을 열심히 보살폈습니다!",
  },
  {
    no: "047",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 37,
    postData: "2023-04-15",
    contents: "유기동물을 열심히 치료했습니다!",
  },
  {
    no: "048",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 38,
    postData: "2023-04-09",
    contents: "유기동물을 열심히 분양했습니다!",
  },
  {
    no: "049",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 39,
    postData: "2023-04-08",
    contents: "유기동물을 열심히 놀아주었습니다!",
  },
  {
    no: "050",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 40,
    postData: "2023-04-02",
    contents: "유기동물을 열심히 챙겨줬습니다!",
  },
  {
    no: "051",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 31,
    postData: "2023-05-05",
    contents: "유기동물을 열심히 구조했습니다!",
  },
  {
    no: "052",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 32,
    postData: "2023-04-30",
    contents: "유기동물을 열심히 산책했습니다!",
  },
  {
    no: "053",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 33,
    postData: "2023-04-29",
    contents: "유기동물을 열심히 밥줬습니다!",
  },
  {
    no: "054",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 34,
    postData: "2023-04-23",
    contents: "유기동물을 열심히 케어했습니다!",
  },
  {
    no: "055",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 35,
    postData: "2023-04-22",
    contents: "유기동물을 열심히 훈련했습니다!",
  },
  {
    no: "056",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 36,
    postData: "2023-04-16",
    contents: "유기동물을 열심히 보살폈습니다!",
  },
  {
    no: "057",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 37,
    postData: "2023-04-15",
    contents: "유기동물을 열심히 치료했습니다!",
  },
  {
    no: "058",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 38,
    postData: "2023-04-09",
    contents: "유기동물을 열심히 분양했습니다!",
  },
  {
    no: "059",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 39,
    postData: "2023-04-08",
    contents: "유기동물을 열심히 놀아주었습니다!",
  },
  {
    no: "060",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 40,
    postData: "2023-04-02",
    contents: "유기동물을 열심히 챙겨줬습니다!",
  },
  {
    no: "061",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 31,
    postData: "2023-05-05",
    contents: "유기동물을 열심히 구조했습니다!",
  },
  {
    no: "062",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 32,
    postData: "2023-04-30",
    contents: "유기동물을 열심히 산책했습니다!",
  },
  {
    no: "063",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 33,
    postData: "2023-04-29",
    contents: "유기동물을 열심히 밥줬습니다!",
  },
  {
    no: "064",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 34,
    postData: "2023-04-23",
    contents: "유기동물을 열심히 케어했습니다!",
  },
  {
    no: "065",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 35,
    postData: "2023-04-22",
    contents: "유기동물을 열심히 훈련했습니다!",
  },
  {
    no: "066",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 36,
    postData: "2023-04-16",
    contents: "유기동물을 열심히 보살폈습니다!",
  },
  {
    no: "067",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 37,
    postData: "2023-04-15",
    contents: "유기동물을 열심히 치료했습니다!",
  },
  {
    no: "068",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 38,
    postData: "2023-04-09",
    contents: "유기동물을 열심히 분양했습니다!",
  },
  {
    no: "069",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 39,
    postData: "2023-04-08",
    contents: "유기동물을 열심히 놀아주었습니다!",
  },
  {
    no: "070",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 40,
    postData: "2023-04-02",
    contents: "유기동물을 열심히 챙겨줬습니다!",
  },
  {
    no: "071",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 31,
    postData: "2023-05-05",
    contents: "유기동물을 열심히 구조했습니다!",
  },
  {
    no: "072",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 32,
    postData: "2023-04-30",
    contents: "유기동물을 열심히 산책했습니다!",
  },
  {
    no: "073",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 33,
    postData: "2023-04-29",
    contents: "유기동물을 열심히 밥줬습니다!",
  },
  {
    no: "074",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 34,
    postData: "2023-04-23",
    contents: "유기동물을 열심히 케어했습니다!",
  },
  {
    no: "075",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 35,
    postData: "2023-04-22",
    contents: "유기동물을 열심히 훈련했습니다!",
  },
  {
    no: "076",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 36,
    postData: "2023-04-16",
    contents: "유기동물을 열심히 보살폈습니다!",
  },
  {
    no: "077",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 37,
    postData: "2023-04-15",
    contents: "유기동물을 열심히 치료했습니다!",
  },
  {
    no: "078",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 38,
    postData: "2023-04-09",
    contents: "유기동물을 열심히 분양했습니다!",
  },
  {
    no: "079",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 39,
    postData: "2023-04-08",
    contents: "유기동물을 열심히 놀아주었습니다!",
  },
  {
    no: "080",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 40,
    postData: "2023-04-02",
    contents: "유기동물을 열심히 챙겨줬습니다!",
  },
  {
    no: "081",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 31,
    postData: "2023-05-05",
    contents: "유기동물을 열심히 구조했습니다!",
  },
  {
    no: "082",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 32,
    postData: "2023-04-30",
    contents: "유기동물을 열심히 산책했습니다!",
  },
  {
    no: "083",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 33,
    postData: "2023-04-29",
    contents: "유기동물을 열심히 밥줬습니다!",
  },
  {
    no: "084",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 34,
    postData: "2023-04-23",
    contents: "유기동물을 열심히 케어했습니다!",
  },
  {
    no: "085",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 35,
    postData: "2023-04-22",
    contents: "유기동물을 열심히 훈련했습니다!",
  },
  {
    no: "086",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 36,
    postData: "2023-04-16",
    contents: "유기동물을 열심히 보살폈습니다!",
  },
  {
    no: "087",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 37,
    postData: "2023-04-15",
    contents: "유기동물을 열심히 치료했습니다!",
  },
  {
    no: "088",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 38,
    postData: "2023-04-09",
    contents: "유기동물을 열심히 분양했습니다!",
  },
  {
    no: "089",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 39,
    postData: "2023-04-08",
    contents: "유기동물을 열심히 놀아주었습니다!",
  },
  {
    no: "090",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 40,
    postData: "2023-04-02",
    contents: "유기동물을 열심히 챙겨줬습니다!",
  },
  {
    no: "091",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 31,
    postData: "2023-05-05",
    contents: "유기동물을 열심히 구조했습니다!",
  },
  {
    no: "092",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 32,
    postData: "2023-04-30",
    contents: "유기동물을 열심히 산책했습니다!",
  },
  {
    no: "093",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 33,
    postData: "2023-04-29",
    contents: "유기동물을 열심히 밥줬습니다!",
  },
  {
    no: "094",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 34,
    postData: "2023-04-23",
    contents: "유기동물을 열심히 케어했습니다!",
  },
  {
    no: "095",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 35,
    postData: "2023-04-22",
    contents: "유기동물을 열심히 훈련했습니다!",
  },
  {
    no: "096",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 36,
    postData: "2023-04-16",
    contents: "유기동물을 열심히 보살폈습니다!",
  },
  {
    no: "097",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 37,
    postData: "2023-04-15",
    contents: "유기동물을 열심히 치료했습니다!",
  },
  {
    no: "098",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 38,
    postData: "2023-04-09",
    contents: "유기동물을 열심히 분양했습니다!",
  },
  {
    no: "099",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 39,
    postData: "2023-04-08",
    contents: "유기동물을 열심히 놀아주었습니다!",
  },
  {
    no: "100",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 40,
    postData: "2023-04-02",
    contents: "유기동물을 열심히 챙겨줬습니다!",
  },
  {
    no: "101",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 31,
    postData: "2023-05-05",
    contents: "유기동물을 열심히 구조했습니다!",
  },
  {
    no: "102",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 32,
    postData: "2023-04-30",
    contents: "유기동물을 열심히 산책했습니다!",
  },
  {
    no: "103",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 33,
    postData: "2023-04-29",
    contents: "유기동물을 열심히 밥줬습니다!",
  },
  {
    no: "104",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 34,
    postData: "2023-04-23",
    contents: "유기동물을 열심히 케어했습니다!",
  },
  {
    no: "105",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 35,
    postData: "2023-04-22",
    contents: "유기동물을 열심히 훈련했습니다!",
  },
  {
    no: "106",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 36,
    postData: "2023-04-16",
    contents: "유기동물을 열심히 보살폈습니다!",
  },
  {
    no: "107",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 37,
    postData: "2023-04-15",
    contents: "유기동물을 열심히 치료했습니다!",
  },
  {
    no: "108",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 38,
    postData: "2023-04-09",
    contents: "유기동물을 열심히 분양했습니다!",
  },
  {
    no: "109",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 39,
    postData: "2023-04-08",
    contents: "유기동물을 열심히 놀아주었습니다!",
  },
  {
    no: "110",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 40,
    postData: "2023-04-02",
    contents: "유기동물을 열심히 챙겨줬습니다!",
  },
  {
    no: "111",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
    count: 41,
    postData: "2023-04-02",
    contents: "유기동물을 열심히 챙겨줬습니다!",
  },
];

export default Notice;
