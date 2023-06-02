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
import LoadingPage from "../../components/Loading/LoadingPage";
import dayjs from "dayjs";
import DOMPurify from "dompurify";

const pageWidth = "90%";

const EventDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const no = searchParams.get("no");
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const search = searchParams.get("search");
  const search_mode = searchParams.get("search_mode");

  const [data, setData] = useState({
    no: null,
    imgSrc: "",
    nickname: "",
    subject: "",
    content: "",
    thumbnail: "",
    count: null,
    postDate: "",
    prevNo: null,
    prevSub: "",
    nextNo: null,
    nextSub: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => console.log("re-rendering...", no, page, search));
  useEffect(() => {
    axios
      .get("/event/view?no=" + no)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => console.error("에러발생: ", error))
      .finally(setIsLoading(false));
  }, [no]);

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  const deleteData = () => {
    // db연결 후 삭제 구현
  };

  return isLoading ? (
    <LoadingPage />
  ) : (
    <ThemeProvider theme={CustomTheme}>
      <Box width={pageWidth} mt={4}>
        <Table width={pageWidth}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  borderBottom: "unset",
                  fontSize: "2rem",
                  fontWeight: 600,
                  lineHeight: "2.5rem",
                }}
              >
                {data && data.subject}
              </TableCell>
            </TableRow>
            <TableRow sx={{ display: "flex" }}>
              <TableCell
                sx={{
                  p: 0,
                  ml: 2,
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1rem",
                  flexGrow: 1,
                }}
              >
                <Avatar alt="profile" src={data && data.imgSrc} />
                &nbsp;
                {data && data.nickname}
              </TableCell>
              <TableCell
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 600,
                }}
              >
                행사기간: {data && dayjs(data.startDate).format("YY/MM/DD")} ~{" "}
                {data && data.endDate
                  ? dayjs(data.endDate).format("YY/MM/DD")
                  : ""}
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
                  dangerouslySetInnerHTML={createMarkup(
                    data ? data.content : null
                  )}
                ></Box>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
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
                        to={ABOUT.EVENT_DETAIL({
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
                        to={ABOUT.EVENT_DETAIL({
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
            color="warning"
            onClick={() =>
              navigate(
                ABOUT.EVENT({
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
              onClick={() =>
                navigate(ABOUT.EVENT_WRITE, {
                  state: { data: data, mode: "update" },
                })
              }
            >
              수정
            </Button>
            <Button
              variant="contained"
              sx={{ ml: 2, width: "100px" }}
              color="error"
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

  .subject {
    max-width: 450px;
    text-align: start;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  :hover {
    .subject {
      text-decoration: underline;
      text-underline-offset: 2px;
    }
  }
`;

const dummy = [
  {
    no: 6,
    memberNo: 1,
    category: "event",
    subject: "펫밀리 사용 후기를 남겨주세요!",
    contents: "여러분의 의견이 더 나은 펫밀리를 만듭니다!",
    count: 31,
    postDate: "2023-05-05",
    imgThumbnail: "/images/petmilylogo.png",
  },
  {
    no: 5,
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
    no: 4,
    memberNo: 1,
    category: "event",
    subject: "펫밀리 SHOP 런칭 이벤트",
    contents: "펫밀리 SHOP을 오픈했습니다!! 후기를 작성하시면 1000p를 드립니다",
    count: 34,
    postDate: "2023-04-23",
    imgThumbnail: "/images/petmilylogo.png",
  },
  {
    no: 3,
    memberNo: 1,
    category: "event",
    subject: "SHOP 오픈",
    contents: "펫밀리 shop에서 필요하신 반려용품을 구매할 수 있습니다!",
    count: 36,
    postDate: "2023-04-16",
    imgThumbnail: "/images/petmilylogo.png",
  },
  {
    no: 2,
    memberNo: 1,
    category: "event",
    subject: "커뮤니티 오픈",
    contents:
      "실종 동물 게시판, 목격 제보 게시판, 자유게시판, 매매장터 게시판으로 구성되었습니다. 많은 이용 바랍니다!",
    count: 37,
    postDate: "2023-04-15",
    imgThumbnail: "/images/petmilylogo.png",
  },
  {
    no: 1,
    memberNo: 1,
    category: "event",
    subject: "사이트 런칭 이벤트",
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
  img: "/images/emptyProfile.png",
  role: "admin",
};

export default EventDetail;
