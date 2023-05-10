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
import { ABOUT, ADOPT, MYPAGE } from "../../constants/PageURL";
import styled from "styled-components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  const rowsPerPage = 20;
  const [foundData, setFoundData] = useState(dummy);
  const [pagedData, setPagedData] = useState(dummy.slice(0, 20));

  // 페이지 표시 데이터 갱신
  useEffect(() => {
    setPagedData(
      foundData.slice((nowPage - 1) * rowsPerPage, nowPage * rowsPerPage)
    );
  }, [nowPage, category, foundData]);

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setNowPage(newPage);
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
        >
          <StyledTabs value={category} onChange={handleChangeCategory} centered>
            <Tab label={분류.전체} value={분류.전체} />
            <Tab
              label={분류.계정}
              value={분류.계정}
              sx={{ BorderBottom: "none" }}
            />
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
            page={1}
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
    no: 1,
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
    no: 2,
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
    no: 3,
    category: "입양",
    question: "입양 결과는 어디서 확인하나요?",
    answer: (
      <>
        마이페이지 입양 내역 페이지를 참고 바랍니다!
        <br />
        <br />
        <Link to={MYPAGE.ADOPTLIST}>입양 과정 확인하기</Link>
      </>
    ),
  },
  {
    no: 1,
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
    no: 2,
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
    no: 3,
    category: "입양",
    question: "입양 결과는 어디서 확인하나요?",
    answer: (
      <>
        마이페이지 입양 내역 페이지를 참고 바랍니다!
        <br />
        <br />
        <Link to={MYPAGE.ADOPTLIST}>입양 과정 확인하기</Link>
      </>
    ),
  },
  {
    no: 1,
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
    no: 2,
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
    no: 3,
    category: "입양",
    question: "입양 결과는 어디서 확인하나요?",
    answer: (
      <>
        마이페이지 입양 내역 페이지를 참고 바랍니다!
        <br />
        <br />
        <Link to={MYPAGE.ADOPTLIST}>입양 과정 확인하기</Link>
      </>
    ),
  },
  {
    no: 1,
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
    no: 2,
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
    no: 3,
    category: "입양",
    question: "입양 결과는 어디서 확인하나요?",
    answer: (
      <>
        마이페이지 입양 내역 페이지를 참고 바랍니다!
        <br />
        <br />
        <Link to={MYPAGE.ADOPTLIST}>입양 과정 확인하기</Link>
      </>
    ),
  },
  {
    no: 1,
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
    no: 2,
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
    no: 3,
    category: "입양",
    question: "입양 결과는 어디서 확인하나요?",
    answer: (
      <>
        마이페이지 입양 내역 페이지를 참고 바랍니다!
        <br />
        <br />
        <Link to={MYPAGE.ADOPTLIST}>입양 과정 확인하기</Link>
      </>
    ),
  },
  {
    no: 1,
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
    no: 2,
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
    no: 3,
    category: "입양",
    question: "입양 결과는 어디서 확인하나요?",
    answer: (
      <>
        마이페이지 입양 내역 페이지를 참고 바랍니다!
        <br />
        <br />
        <Link to={MYPAGE.ADOPTLIST}>입양 과정 확인하기</Link>
      </>
    ),
  },
  {
    no: 1,
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
    no: 2,
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
    no: 3,
    category: "입양",
    question: "입양 결과는 어디서 확인하나요?",
    answer: (
      <>
        마이페이지 입양 내역 페이지를 참고 바랍니다!
        <br />
        <br />
        <Link to={MYPAGE.ADOPTLIST}>입양 과정 확인하기</Link>
      </>
    ),
  },
  {
    no: 1,
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
    no: 2,
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
    no: 3,
    category: "입양",
    question: "입양 결과는 어디서 확인하나요?",
    answer: (
      <>
        마이페이지 입양 내역 페이지를 참고 바랍니다!
        <br />
        <br />
        <Link to={MYPAGE.ADOPTLIST}>입양 과정 확인하기</Link>
      </>
    ),
  },
  {
    no: 1,
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
    no: 2,
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
    no: 3,
    category: "입양",
    question: "입양 결과는 어디서 확인하나요?",
    answer: (
      <>
        마이페이지 입양 내역 페이지를 참고 바랍니다!
        <br />
        <br />
        <Link to={MYPAGE.ADOPTLIST}>입양 과정 확인하기</Link>
      </>
    ),
  },
  {
    no: 1,
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
    no: 2,
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
    no: 3,
    category: "입양",
    question: "입양 결과는 어디서 확인하나요?",
    answer: (
      <>
        마이페이지 입양 내역 페이지를 참고 바랍니다!
        <br />
        <br />
        <Link to={MYPAGE.ADOPTLIST}>입양 과정 확인하기</Link>
      </>
    ),
  },
  {
    no: 1,
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
    no: 2,
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
    no: 3,
    category: "입양",
    question: "입양 결과는 어디서 확인하나요?",
    answer: (
      <>
        마이페이지 입양 내역 페이지를 참고 바랍니다!
        <br />
        <br />
        <Link to={MYPAGE.ADOPTLIST}>입양 과정 확인하기</Link>
      </>
    ),
  },
  {
    no: 1,
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
    no: 2,
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
    no: 3,
    category: "입양",
    question: "입양 결과는 어디서 확인하나요?",
    answer: (
      <>
        마이페이지 입양 내역 페이지를 참고 바랍니다!
        <br />
        <br />
        <Link to={MYPAGE.ADOPTLIST}>입양 과정 확인하기</Link>
      </>
    ),
  },
];

export default FAQ;
