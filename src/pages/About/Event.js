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
  TableRow,
  ThemeProvider,
} from "@mui/material";
import SearchBar from "../../components/common/SearchBar";
import { useEffect, useState } from "react";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ABOUT } from "../../constants/PageURL";
import styled from "styled-components";
import VisibilityIcon from "@mui/icons-material/Visibility";

const pageWidth = "100%";
// 검색 방식
const searchModes = {
  subject_contents: "subject_contents",
  subject: "subject",
  contents: "contents",
};

const Event = () => {
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

  useEffect(() => {
    console.log("re-rendering", foundData, searchKeyWord, searchMode);
  });
  // 초기 세팅
  useEffect(() => {
    setNowPage(page ? parseInt(page) : 1);
    setSearchKeyWord(search ? search : "");
    setRowsPerPage(limit ? parseInt(limit) : 10);
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
      ABOUT.EVENT({
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
      ABOUT.EVENT({
        page: nowPage,
        limit: event.target.value,
        search: search,
        search_mode: search_mode,
      })
    );
  };

  // 검색 방식 변경
  const handleChangeSearchMode = (event) => {
    setSearchMode(event.target.value);
  };

  // 검색
  const handleSearch = (value) => {
    setNowPage(1);
    findDataByMode(value, searchMode);
    navigate(
      ABOUT.EVENT({
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
        <Table sx={{ width: pageWidth }}>
          <TableBody>
            {pagedData.map((data, index) => {
              return (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #bfbfbf",
                      borderTop: "1px solid #bfbfbf",
                    }}
                  >
                    <StyledLink
                      to={ABOUT.EVENT_DETAIL({
                        no: data.no,
                        page: nowPage,
                        limit: rowsPerPage,
                        search: searchKeyWord,
                        search_mode: searchMode,
                      })}
                    >
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Box
                          sx={{
                            imgSx,
                          }}
                        >
                          <img
                            alt={data.no}
                            src={data.imgThumbnail}
                            style={{ maxWidth: "180px", maxHeight: "90px" }}
                          />
                        </Box>
                        <Box className="hover" sx={titleSx}>
                          {data.subject}
                        </Box>
                        <Box sx={{ ...tdSx, minWidth: "100px" }}>
                          {member.nickname}
                        </Box>
                        <Box sx={{ ...tdSx, minWidth: "50px" }}>
                          <VisibilityIcon fontSize="small" color="disabled" />
                          &nbsp;
                          {data.count}
                        </Box>
                        <Box sx={{ ...tdSx, minWidth: "90px" }}>
                          {data.postDate}
                        </Box>
                      </Box>
                    </StyledLink>
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
            onClick={() => navigate(ABOUT.EVENT_WRITE)}
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

const imgSx = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignContent: "center",
  width: "180px",
  height: "90px",
};
const tdSx = {
  p: 2,
  fontSize: "1rem",
  fontWeight: 500,
  textAlign: "right",
  alignSelf: "center",
  display: "flex",
  alignContent: "center",
  justifyContent: "flex-end",
};
const titleSx = {
  ...tdSx,
  flexGrow: 1,
  textAlign: "left",
  justifyContent: "left",
  fontSize: "1.2rem",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  :hover {
    .hover {
      text-decoration: underline;
    }
  }
  .hover:visited {
    color: purple;
  }
`;

const dummy = [
  {
    no: 10,
    memberNo: 1,
    category: "event",
    subject: "펫밀리 사용 후기를 남겨주세요!",
    contents: "여러분의 의견이 더 나은 펫밀리를 만듭니다!",
    count: 31,
    postDate: "2023-05-05",
    imgThumbnail: "/images/petmilylogo.png",
  },
  {
    no: 9,
    memberNo: 1,
    category: "event",
    subject: "게시판 이용수칙",
    contents:
      "타 회원에 대한 욕설 비방 등을 금지하고 있으며, 펫밀리는 법규를 준수하는 사이트입니다.",
    writer: "펫밀리",
    count: 32,
    postDate: "2023-04-30",
    imgThumbnail: "/images/petmilylogo.png",
  },
  {
    no: 8,
    memberNo: 1,
    category: "event",
    subject: "봉사 후기 이벤트",
    contents:
      "펫밀리 봉사하기를 통해 봉사를 실천하신 회원분들 대상으로 봉사후기 게시글을 남기면 하나의 계정당 2000p를 드립니다!",
    count: 33,
    postDate: "2023-04-29",
    imgThumbnail: "/images/petmilylogo.png",
  },
  {
    no: 7,
    memberNo: 1,
    category: "event",
    subject: "펫밀리 SHOP 런칭 이벤트",
    contents: "펫밀리 SHOP을 오픈했습니다!! 후기를 작성하시면 1000p를 드립니다",
    count: 34,
    postDate: "2023-04-23",
    imgThumbnail: "/images/petmilylogo.png",
  },
  {
    no: 6,
    memberNo: 1,
    category: "event",
    subject: "후원 안내",
    contents: "후원 탭에서 기부 혹은 봉사 참여하실 수 있습니다.",
    count: 35,
    postDate: "2023-04-22",
    imgThumbnail: "/images/petmilylogo.png",
  },
  {
    no: 5,
    memberNo: 1,
    category: "event",
    subject: "SHOP 오픈",
    contents: "펫밀리 shop에서 필요하신 반려용품을 구매할 수 있습니다!",
    count: 36,
    postDate: "2023-04-16",
    imgThumbnail: "/images/petmilylogo.png",
  },
  {
    no: 4,
    memberNo: 1,
    category: "event",
    subject: "커뮤니티 개설",
    contents:
      "실종 동물 게시판, 목격 제보 게시판, 자유게시판, 매매장터 게시판으로 구성되었습니다.",
    count: 37,
    postDate: "2023-04-15",
    imgThumbnail: "/images/petmilylogo.png",
  },
  {
    no: 3,
    memberNo: 1,
    category: "event",
    subject: "유기동물 입양 신청 안내",
    contents: "입양 탭에서 입양신청서, 체크리스트 등을 작성하실 수 있습니다.",
    count: 38,
    postDate: "2023-04-09",
    imgThumbnail: "/images/petmilylogo.png",
  },
  {
    no: 2,
    memberNo: 1,
    category: "event",
    subject: "사이트 가이드",
    contents:
      "펫밀리 사이트는 크게 소개 - 입양 - 커뮤니티 - SHOP - 후원으로 구성되어 있습니다.",
    count: 39,
    postDate: "2023-04-08",
    imgThumbnail: "/images/petmilylogo.png",
  },
  {
    no: 1,
    memberNo: 1,
    category: "event",
    subject: "사이트 개설 안내",
    contents: "펫밀리 사이트를 런칭하였습니다!",
    count: 40,
    postDate: "2023-04-02",
    imgThumbnail: "/images/petmilylogo.png",
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
  img: "",
  role: "admin",
};

export default Event;
