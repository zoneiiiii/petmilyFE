import {
  Box,
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ThemeProvider,
} from "@mui/material";
import { SearchBar } from "../../components/common/SearchBar";
import { useEffect, useState } from "react";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ABOUT } from "../../constants/PageURL";
import styled from "styled-components";

const Activity = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const search = searchParams.get("search");

  const navigate = useNavigate();
  // const { page } = useParams();
  const [nowPage, setNowPage] = useState(page ? parseInt(page) : 1);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(limit ? parseInt(limit) : 20);
  const [foundData, setFoundData] = useState(
    search
      ? dummy.filter(
          (activity) =>
            activity.subject.includes(search) ||
            activity.contents.includes(search) ||
            activity.writer.includes(search)
        )
      : dummy
  );
  const [pagedData, setPagedData] = useState(
    foundData.slice((nowPage - 1) * rowsPerPage, nowPage * rowsPerPage)
  );
  const handleChangePage = (event, newPage) => {
    console.log(newPage);

    navigate(ABOUT.ACTIVITY(newPage));
  };
  useEffect(() => {
    console.log(foundData);
    if (page && nowPage !== parseInt(page)) {
      setNowPage(parseInt(page));
      setPagedData(
        foundData.slice(
          (parseInt(page) - 1) * rowsPerPage,
          parseInt(page) * rowsPerPage
        )
      );
    }
    console.log("page:", page, "nowPage:", nowPage, "limitedData:", pagedData);
  }, [page, nowPage, pagedData, foundData]);

  // // const handleChangeRowsPerPage = (event) => {
  // //   setRowsPerPage(parseInt(event.target.value, 10));
  // // };

  const handleSearch = (value) => {
    console.log(value);

    dummy.map(
      (activity, index) =>
        activity.subject.includes(value) ||
        activity.contents.includes(value) ||
        activity.writer.includes(value)
    );
    navigate(ABOUT.ACTIVITY(1, value));
    // setFoundData(
    //   dummy.filter(
    //     (activity) =>
    //       activity.subject.includes(value) ||
    //       activity.contents.includes(value) ||
    //       activity.writer.includes(value)
    //   )
    // );
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <Box
        display={"flex"}
        width={"100vw"}
        justifyContent={"center"}
        flexWrap={"wrap"}
      >
        <Box width={"80vw"} display={"flex"} justifyContent={"flex-end"} m={2}>
          <SearchBar
            setValue={setSearchKeyWord}
            value={searchKeyWord}
            onClick={handleSearch}
          />
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
            {pagedData.map((activity, index) => {
              return (
                <TableRow key={index}>
                  <TableCell sx={tdSx}>{activity.no}</TableCell>
                  <TableCell
                    sx={{
                      ...tdSx,
                      textAlign: "left",
                      width: "50vw",
                    }}
                  >
                    <StyledLink to={ABOUT.ACTIVITY_DETAIL(activity.no)}>
                      {activity.subject}
                    </StyledLink>
                  </TableCell>
                  <TableCell sx={tdSx}>{activity.writer}</TableCell>
                  <TableCell sx={tdSx}>{activity.count}</TableCell>
                  <TableCell sx={tdSx}>{activity.postData}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Box width={"80vw"} display={"flex"} justifyContent={"flex-end"} mt={2}>
          <Button
            variant="contained"
            sx={{ mr: 3, width: "100px" }}
            onClick={() => navigate(ABOUT.ACTIVITY_WRITE)}
          >
            글쓰기
          </Button>
        </Box>
        <Box width={"80vw"} display={"flex"} justifyContent={"center"} m={2}>
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

const TableSx = { width: "80vw" };
const thSx = { fontSize: "1rem", fontWeight: 600, textAlign: "center" };
const tdSx = { fontSize: "1rem", fontWeight: 500, textAlign: "center" };
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
    no: "001",
    subject: "유기동물 구조활동",
    writer: "펫밀리",
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

export default Activity;
