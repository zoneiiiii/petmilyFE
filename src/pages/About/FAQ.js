import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Pagination,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  ThemeProvider,
  Typography,
} from "@mui/material";
import SearchBar from "../../components/common/SearchBar";
import { useEffect, useState } from "react";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import { Link, useNavigate } from "react-router-dom";
import {
  ABOUT,
  ADOPT,
  COMMUNITY,
  MYPAGE,
  SHOP,
  SUPPORT,
} from "../../constants/PageURL";
import styled from "styled-components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ACCOUNT } from "../../constants/PageURL";

const pageWidth = "100%";
const 분류 = {
  전체: "전체",
  계정: "계정",
  입양: "입양",
  커뮤니티: "커뮤니티",
  SHOP: "SHOP",
  후원: "후원",
  기타: "기타",
};

const FAQ = () => {
  const navigate = useNavigate();
  const [nowPage, setNowPage] = useState(1);
  const [category, setCategory] = useState(분류.전체);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const rowsPerPage = 10;
  const [foundData, setFoundData] = useState(dummy);
  const [pagedData, setPagedData] = useState(dummy.slice(0, 10));

  // 페이지 표시 데이터 갱신
  useEffect(() => {
    setPagedData(
      foundData.slice((nowPage - 1) * rowsPerPage, nowPage * rowsPerPage)
    );
  }, [nowPage, category, foundData]);

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setNowPage(newPage);
    window.scrollTo(0, 0);
  };
  const handleChangeCategory = (event, newValue) => {
    setCategory(newValue);
    if (newValue === 분류.전체) setFoundData(dummy);
    else setFoundData(dummy.filter((data) => data.category === newValue));
  };

  // 검색
  const handleSearch = (value) => {
    setCategory(분류.전체);
    setSearchKeyWord(value);
    setFoundData(dummy.filter((data) => data.question.includes(value)));
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <Box
        display={"flex"}
        width={pageWidth}
        justifyContent={"center"}
        flexWrap={"wrap"}
      >
        <Box
          width={pageWidth}
          display={"flex"}
          justifyContent={"center"}
          mt={4}
          mb={2}
        >
          <StyledTabs value={category} onChange={handleChangeCategory} centered>
            <Tab label={분류.전체} value={분류.전체} />
            <Tab label={분류.계정} value={분류.계정} />
            <Tab label={분류.입양} value={분류.입양} />
            <Tab label={분류.커뮤니티} value={분류.커뮤니티} />
            <Tab label={분류.SHOP} value={분류.SHOP} />
            <Tab label={분류.후원} value={분류.후원} />
            <Tab label={분류.기타} value={분류.기타} />
          </StyledTabs>
        </Box>
        <Box
          sx={{ width: pageWidth }}
          display={"flex"}
          justifyContent={"space-between"}
          alignContent={"center"}
        >
          <Typography sx={{ paddingBottom: 0, fontWeight: 600, pl: 2 }}>
            총 {foundData.length}건
          </Typography>
          <Box sx={{ pr: 2 }}>
            <SearchBar
              setValue={setSearchKeyWord}
              value={searchKeyWord}
              onClick={handleSearch}
            />
          </Box>
        </Box>
        <Table sx={{ width: "80vw" }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography sx={TitleSx}>{category}</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pagedData.map((faq, index) => {
              return (
                <TableRow key={index}>
                  <TableCell sx={tdSx}>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography
                          fontSize={"1rem"}
                          fontWeight={600}
                          width={"fit-content"}
                          display={"inline"}
                        >
                          [{faq.category}]&nbsp;
                        </Typography>
                        {faq.question}
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>{faq.answer}</Typography>
                      </AccordionDetails>
                    </Accordion>
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
            sx={{ mr: 2, width: "100px" }}
            onClick={() => navigate(MYPAGE.QNA)}
          >
            1:1문의
          </Button>
        </Box>
        <Box width={pageWidth} display={"flex"} justifyContent={"center"} m={2}>
          <Pagination
            count={Math.ceil(foundData.length / rowsPerPage)}
            defaultPage={1}
            page={nowPage}
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

const TitleSx = {
  fontSize: "1.5rem",
  fontWeight: 600,
  textAlign: "center",
  pt: 1,
  pb: 1,
  pl: 2,
  pr: 2,
  backgroundColor: "#fbd385",
  borderRadius: 2,
};
const tdSx = { fontSize: "1rem", fontWeight: 500 };
const StyledTabs = styled(Tabs)({
  ".MuiTab-root": {
    fontSize: "1rem",
    fontWeight: "bold",
    borderBottom: "none",
  },
});

const dummy = [
  {
    no: 15,
    category: "후원",
    question: "기부 내역은 어디서 확인하나요?",
    answer: (
      <>
        기부내역 페이지에서 조회하시면 됩니다.
        <br />
        <br />
        <Link to={SUPPORT.DONATE}>입양 내역 확인하기</Link>
      </>
    ),
  },
  {
    no: 14,
    category: "후원",
    question: "기부는 어디서 하나요?",
    answer: (
      <>
        기부하기 페이지에서 하시면 됩니다.
        <br />
        <br />
        <Link to={SUPPORT.APPLY}>기부 하기</Link>
      </>
    ),
  },
  {
    no: 13,
    category: "후원",
    question: "봉사참여는 어떻게 하나요?",
    answer: (
      <>
        봉사 신청 페이지에서 신청하고싶은 봉사 활동의 게시글에 댓글을 달면
        됩니다.
        <br />
        <br />
        <Link to={SUPPORT.VOLUNTEER_NOTICE}>봉사 참여하러 가기</Link>
      </>
    ),
  },
  {
    no: 12,
    category: "SHOP",
    question: "배송받은 물품에 하자가 있어요.",
    answer: (
      <>
        QNA 게시판을 통해 문의하시면 펫밀리 측에서 회원님의 주문내역을 확인한
        뒤에 조치하겠습니다. 불편을 끼쳐드려 죄송합니다.
        <br />
        <br />
        <Link to={MYPAGE.QNA}>문의하러 가기</Link>
      </>
    ),
  },
  {
    no: 11,
    category: "SHOP",
    question: "어떤 상품들을 판매하나요?",
    answer: (
      <>
        반려동물의 사료, 간식, 외출용품, 목욕/미용제품, 굿즈를 판매하고
        있습니다.
        <br />
        <br />
        <Link to={SHOP.PRODUCT}>SHOP 바로가기</Link>
      </>
    ),
  },
  {
    no: 10,
    category: "SHOP",
    question: "주문한 물품의 구매내역을 조회하고 싶습니다.",
    answer: (
      <>
        마이페이지의 주문내역 페이지에서 조회가능합니다.
        <br />
        <br />
        <Link to={MYPAGE.ORDERLIST}>주문내역 조회 하기</Link>
      </>
    ),
  },
  {
    no: 9,
    category: "커뮤니티",
    question: "자유게시판에서 누군가 저에게 욕설을 했어요.",
    answer: (
      <>
        QNA 게시판을 통해 제보하시면 펫밀리 측에서 해당 게시글과 댓글을 확인 후
        해당 회원에 대해 조치하겠습니다. 불편을 끼쳐드려 죄송합니다.
        <br />
        <br />
        <Link to={MYPAGE.QNA}>제보하러 가기</Link>
      </>
    ),
  },
  {
    no: 8,
    category: "커뮤니티",
    question: "목격 제보 게시판은 어떤 게시판인가요?",
    answer: (
      <>
        목격 제보 게시판은 주인없이 떠도는 반려동물을 발견하면 해당 게시판에
        글을 올려 반려동물 주인이 빨리 찾을 수 있게 하기 위한 게시판입니다.
        <br />
        <br />
        <Link to={COMMUNITY.FIND}>목격 제보 게시판 가기</Link>
      </>
    ),
  },
  {
    no: 7,
    category: "커뮤니티",
    question: "실종 동물 게시판은 어떤 게시판인가요?",
    answer: (
      <>
        회원님의 반려동물을 잃어버리신 경우에 게시글을 올려 다른 회원분들이
        발견하셨을 때 답글을 달아 제보를 할 수 있도록 하는 게시판입니다.
        <br />
        <br />
        <Link to={COMMUNITY.MISSING}>실종 동물 게시판 가기</Link>
      </>
    ),
  },
  {
    no: 6,
    category: "입양",
    question: "입양 결과는 어디서 확인하나요?",
    answer: (
      <>
        마이페이지 입양 내역 페이지를 참고 바랍니다!
        <br />
        <br />
        <Link to={MYPAGE.ADOPTLIST}>입양 내역 확인하기</Link>
      </>
    ),
  },
  {
    no: 5,
    category: "입양",
    question: "입양 과정은 어떻게 되나요?",
    answer: (
      <>
        입양 과정 페이지를 참고 바랍니다!
        <br />
        <br />
        <Link to={ABOUT.ADOPT_PROCESS}>입양 과정 확인하기</Link>
      </>
    ),
  },
  {
    no: 4,
    category: "입양",
    question: "입양신청은 어떻게 하나요?",
    answer: (
      <>
        입양 신청 페이지를 참고 바랍니다!
        <br />
        <br />
        <Link to={ADOPT.APPLICATION}>입양 신청 하러가기</Link>
      </>
    ),
  },
  {
    no: 3,
    category: "계정",
    question: "회원 탈퇴는 어디서 하나요?",
    answer: (
      <>
        QNA 페이지에서 문의하시면 펫밀리측에서 회원탈퇴처리를 도와드리겠습니다!
        <br />
        <br />
        <Link to={MYPAGE.QNA}>QNA 페이지 바로가기</Link>
      </>
    ),
  },
  {
    no: 2,
    category: "계정",
    question: "회원정보를 변경하고 싶어요",
    answer: (
      <>
        회원정보변경 페이지를 참고 바랍니다!
        <br />
        <br />
        <Link to={MYPAGE.MODIFY_INFO}>회원정보 변경하러 가기</Link>
      </>
    ),
  },
  {
    no: 1,
    category: "계정",
    question: "비밀번호를 잊어버렸어요..",
    answer: (
      <>
        비밀번호 변경 페이지에서 변경하시면 됩니다!
        <br />
        <br />
        <Link to={ACCOUNT.FIND_PW}>비밀번호 변경하러가기</Link>
      </>
    ),
  },
];

export default FAQ;
