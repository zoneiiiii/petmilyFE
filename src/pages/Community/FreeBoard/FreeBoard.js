import * as React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
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
// import TableSortLabel from "@material-ui/core/TableSortLabel";
import { Pagination } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
// import axios from "axios";
import CustomButton from "../../Login/CustomButton";
import { COMMUNITY } from '../../../constants/PageURL';
import SearchBar from "../../../components/common/SearchBar";
import Container from "@mui/material/Container";

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

const SearchContainer = styleds.div`
      float:right;
      margin-bottom: 10px;
      `;

const useStyles = makeStyles({  // 게시글 목록 css
    title: {
        textAlign: "center",
    },

    tablecontainer: {
        maxWidth: 1200,
        minWidth: 900,
        margin: "auto"
    },

    table: {
        margin: "auto",
        maxWidth: 1200,
        minWidth: 700,
        // overflow: "hidden"
    },

    pagination: {
        display: "flex",
        justifyContent: "center",
    },

    write: {
        display: "flex",
        float: "right"
        // display: "flex",
        // justifyContent: "center",
    },

    writelink: {
        textDecoration: "none",
    },
});

function createData(num, subject, writer, views, date) {
    return { num, subject, writer, views, date };
}

const rows = [
    createData('001', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.19'),
    createData('002', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.19'),
    createData('003', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.22'),
    createData('004', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.23'),
    createData('005', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.24'),
    createData('006', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.27'),
    createData('007', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.28'),
    createData('008', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.29'),
    createData('009', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.19'),
    createData('0010', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.19'),
    createData('011', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.22'),
    createData('012', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.23'),
    createData('013', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.24'),
    createData('014', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.27'),
    createData('015', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.28'),
    createData('016', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.29'),
    createData('017', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.19'),
    createData('018', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.19'),
    createData('019', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.22'),
    createData('020', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.23'),
    createData('021', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.24'),
    createData('022', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.27'),
    createData('023', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.28'),
    createData('024', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.29'),
];

export default function CustomizedTables() {
    const classes = useStyles();    // css 적용을 위한 선언문.

    /* sort start */
    // 날짜 sort 기능을 위한 상수 저장 정의
    const [rowData, setRowData] = useState(rows);
    const [orderDirection, setOrderDirection] = useState("asc");

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
        setRowData(sortArray(rows, orderDirection));
        setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
    };
    /* sort end */


    /* pagenation start */
    const [page, setPage] = React.useState(1)
    const rowsPerPage = 10;
    // const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    /* pagenation end */

    /* axios start */
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     axios
    //         .get("https://jsonplaceholder.typicode.com/users")
    //         .then((res) => {
    //             setData(res.data);
    //             console.log("Result:", data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, []);
    /* axios end */

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container sx={{ py: 5, minWidth: 1000 }} maxWidth="lg">
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
                                    <StyledTableCell align="left" sx={{ minWidth: 10, background: '#FBD385' }}>No.</StyledTableCell>
                                    <StyledTableCell align="center" sx={{ minWidth: 700, background: '#FBD385' }}>제목</StyledTableCell>
                                    <StyledTableCell align="right" sx={{ minWidth: 50, background: '#FBD385' }}>작성자</StyledTableCell>
                                    <StyledTableCell align="right" sx={{ minWidth: 50, background: '#FBD385' }}>조회수</StyledTableCell>
                                    <StyledTableCell align="center" sx={{ minWidth: 10, background: '#FBD385' }} onClick={handleSortRequest}>
                                        <TableSortLabel active={false} direction={orderDirection}>
                                            작성일
                                        </TableSortLabel>
                                    </StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                    .slice(
                                        (page - 1) * rowsPerPage,
                                        (page - 1) * rowsPerPage + rowsPerPage
                                    )
                                    .map((rows) => {
                                        return (
                                            <StyledTableRow key={rows.num}>
                                                <StyledTableCell align="center" sx={{ minWidth: 10 }}>
                                                    {rows.num}
                                                </StyledTableCell>
                                                <StyledTableCell align="center" sx={{ minWidth: 300 }}>
                                                    <Link
                                                        to={COMMUNITY.FREE_DETAIL(rows.num)}
                                                        style={{ textDecoration: "none", color: "black" }}
                                                    >
                                                        {rows.subject}
                                                    </Link>
                                                </StyledTableCell>
                                                <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                                                    {rows.writer}
                                                </StyledTableCell>
                                                <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                                                    {rows.views}
                                                </StyledTableCell>
                                                <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                                                    {rows.date}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                            // <StyledTableRow key={row.num}>
                                            //     {columns.map((column) => {
                                            //         const value = row[column.id];
                                            //         return (
                                            //             <StyledTableCell key={column.id} align={column.align}>
                                            //                 <Link
                                            //                     to="/board/free/1"
                                            //                     style={{ textDecoration: "none", color: "black" }}
                                            //                 >
                                            //                     {value}
                                            //                 </Link>
                                            //             </StyledTableCell>
                                            //         );
                                            //     })}
                                            // </StyledTableRow>
                                        );
                                    })}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell /><TableCell /><TableCell /><TableCell />
                                    <TableCell>
                                        <Link className={classes.writelink} to={COMMUNITY.FREE_WRITE}>
                                            <CustomButton label="글쓰기" value="글쓰기">
                                                글쓰기
                                            </CustomButton>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                    <br />
                    <Stack spacing={2} sx={{ mt: 0 }}>
                        <Pagination
                            className={classes.pagination}
                            color="primary"
                            page={page}
                            onChange={handleChangePage}
                            // onChangeRowsPerPage={handleChangeRowsPerPage}
                            component="div"
                            count={Math.ceil(rows.length / rowsPerPage)}
                        />
                    </Stack>
                    <br />
                </Container>
            </ThemeProvider >
        </>


    );
}