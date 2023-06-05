import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import styleds from "styled-components";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { TableHead, TableFooter } from '@material-ui/core';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core';
import TableSortLabel from '@mui/material/TableSortLabel';
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import axios from "axios";
import CustomButton from "../../Login/CustomButton";
import { COMMUNITY } from '../../../constants/PageURL';
import SearchBar from "../../../components/common/SearchBar";
import Container from "@mui/material/Container";
import NotFound from "../../NotFound/NotFound";
import Loading from "../../../components/Loading/LoadingPage";
import { AuthContext } from "../../../contexts/AuthContexts";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";

const theme = createTheme({
    palette: {
        type: "light",
        primary: {
            main: "#FBD385",
        },
    },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.black,
        fontWeight: "bold",
        fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Section = styleds.section`
  background: #f8f9fa;
  padding: 30px 0 40px 0;
`

const MainContainer = styleds.div`
  width: 1008px;
  max-width: 1150px;
  min-width: 790px;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(233, 236, 239);
  border-image: initial;
  margin: 0px auto 20px;
  background: rgb(255, 255, 255);
`

const SearchContainer = styleds.div`
      float:right;
      margin-bottom: 10px;
      `;

const useStyles = makeStyles({  // 게시글 목록 css
    title: {
        textAlign: "center",
    },

    tablecontainer: {
        // maxWidth: 1200,
        minWidth: 700,
        margin: "auto"
    },

    table: {
        margin: "auto",
        // maxWidth: 1200,
        // minWidth: 700,
        // overflow: "hidden"
    },

    content: {
        overflow: "hidden",
        lineHeight: "1.4em",
        height: "1.4em",
        textOverflow: "ellipsis",
    },

    pagination: {
        display: "flex",
        justifyContent: "center",
    },

    write: {
        display: "flex",
        float: "right",
        // display: "flex",
        // justifyContent: "center",
    },

    writelink: {
        textDecoration: "none",
    },

    subject: {
        // fontWeight: "bold",
        fontSize: "0.9rem",
        lineHeight: "1.4em",
        height: "1.4em",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: "2",
        WebkitBoxOrient: "vertical",
    }
});

const FreeBoard = () => {
    const classes = useStyles();    // css 적용을 위한 선언문.

    const [data, setData] = useState([]); // DB 데이터 가져오는 변수
    const [isLoading, setIsLoading] = useState(true); //로딩 상태
    const [rowData, setRowData] = useState(data); // 날짜 sort 기능을 위한 상수 저장 정의
    const [orderDirection, setOrderDirection] = useState("asc");
    const [page, setPage] = useState(1); // 현재 페이지 관리하는 상태 변수
    const itemsPerPage = 10; // 한페이지에 보여줄 페이지의 개수
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const lists = data.slice(startIndex, endIndex); // 현재 페이지에 해당하는 카드 데이터 계산
    const [maxPageNum, setMaxPageNum] = useState(1);
    const { loggedIn } = useContext(AuthContext);

    /* sort start */
    // 날짜 정렬 요청 처리
    const sortArray = (arr, orderBy) => {
        switch (orderBy) {
            case "asc":
            default:
                return arr.sort((a, b) =>
                    a.date > b.date ? 1 : b.date > a.date ? -1 : 0
                );
            case "desc":
                return arr.sort((a, b) =>
                    a.date < b.date ? 1 : b.date < a.date ? -1 : 0
                );
        }
    };

    const handleSortRequest = () => {
        setRowData(sortArray(lists, orderDirection));
        setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
    };
    /* sort end */


    /* pagenation start */
    const handleChange = (event, value) => {
        //페이지 변경 시 호출, 새 페이지의 번호를 value에 저장함.
        setPage(value);
        console.log(data);
    };

    const getPageNum = () => {
        const maxLength = data.length;
        return setMaxPageNum(Math.ceil(maxLength / itemsPerPage));
    }

    useEffect(() => {
        getPageNum();
    });
    /* pagenation end */

    /* axios start */
    useEffect(() => {
        //게시글 목록 호출
        const fetchPost = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/board/free`
                ); //게시글 데이터 호출
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data : ", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPost();
    }, []);
    /* axios end */

    if (isLoading) {
        return <Loading />; // 로딩 중일 때 표시할 컴포넌트
    }

    if (!data) {
        return <NotFound />; //존재하지 않는 번호를 넣었을 때 표시할 컴포넌트
    }

    return (
        <ThemeProvider theme={CustomTheme}>
            <Section className="result">
                <MainContainer className="result-container">

                    <Container sx={{ py: 0, minWidth: 780 }} maxWidth="lg">
                        <h1 className={classes.title}>자유 게시판</h1>
                        <SearchContainer>
                            <SearchBar />
                        </SearchContainer>
                        <TableContainer className={classes.tablecontainer} component={Paper} >

                            <Table aria-label="customized table" className={classes.table}>
                                <TableHead>
                                    {/* <StyledTableRow>
                                    {columns.map((column) => (
                                        <StyledTableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                            onClick={handleSortRequest}
                                        >
                                            {column.label}
                                        </StyledTableCell>
                                    ))}
                                </StyledTableRow> */}
                                    <StyledTableRow>
                                        <StyledTableCell align="center" sx={{ minWidth: 10, background: '#FBD385' }}>No.</StyledTableCell>
                                        <StyledTableCell align="center" sx={{ minWidth: 200, background: '#FBD385' }}>제목</StyledTableCell>
                                        <StyledTableCell align="center" sx={{ minWidth: 40, maxWidth: 40, background: '#FBD385' }}>작성자</StyledTableCell>
                                        <StyledTableCell align="center" sx={{ minWidth: 50, background: '#FBD385' }}>조회수</StyledTableCell>
                                        <StyledTableCell align="center" sx={{ minWidth: 90, background: '#FBD385' }} onClick={handleSortRequest}>
                                            <TableSortLabel active={false} direction={orderDirection}>
                                                작성일
                                            </TableSortLabel>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {lists
                                        .map((list) => {
                                            return (
                                                <StyledTableRow key={list.boardNum} className={classes.content}>
                                                    <StyledTableCell align="center" sx={{ minWidth: 10 }}>
                                                        {list.boardNum}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center" sx={{ minWidth: 300 }}>
                                                        <Link
                                                            to={COMMUNITY.FREE_DETAIL(list.boardNum)}
                                                            className={classes.subject}
                                                            style={{ textDecoration: "none", color: "black" }}
                                                        >
                                                            {list.freeSubject}
                                                        </Link>
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                                                        {list.memberNickName}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                                                        {list.freeCount}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                                                        {list.freeDate}
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            );
                                        })}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell /><TableCell /><TableCell /><TableCell />
                                        <TableCell>
                                            {loggedIn === true ?
                                                <Link className={classes.writelink} to={COMMUNITY.FREE_WRITE}>
                                                    <CustomButton label="글쓰기" value="글쓰기">
                                                        글쓰기
                                                    </CustomButton>
                                                </Link> : <></>
                                            }
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                        <br />
                        <Stack spacing={2} sx={{ mt: 0 }}>
                            <Pagination
                                color="primary"
                                page={page}
                                count={maxPageNum}
                                onChange={handleChange}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: '50px 0 0 0px'
                                }}
                            />
                        </Stack>
                        <br />
                    </Container>
                </MainContainer>
            </Section>
        </ThemeProvider>
    );
};

export default FreeBoard;