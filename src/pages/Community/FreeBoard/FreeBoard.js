import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles, TableFooter, TablePagination } from '@material-ui/core';
import TableSortLabel from "@material-ui/core/TableSortLabel";
import axios from "axios";
import { hover } from '@testing-library/user-event/dist/hover';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
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

function createData(no, title, writer, views, date) {
    return { no, title, writer, views, date };
}

const rows = [
    createData('001', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.19'),
    createData('002', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.19'),
    createData('003', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.22'),
    createData('004', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.23'),
    createData('005', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.24'),
];

const useStyles = makeStyles({  // 게시글 목록 css
    table: {
        margin: "auto",
        maxWidth: 1200,
        minWidth: 700
    },

    sort: {
        color: "black",

    }
});


export default function CustomizedTables() {
    const classes = useStyles();    // css 적용을 위한 선언문.

    /* sort start */
    // 날짜 sort 기능을 위한 상수 저장 정의
    const [rowData, setRowData] = useState(rows);
    const [orderDirection, setOrderDirection] = useState("asc");

    // 정렬 요청 처리
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
    // 페이지 상수 정의
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }
    /* pagenation end */

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

    return (
        <TableContainer component={Paper}>
            <Table aria-label="customized table" className={classes.table}>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>No.</StyledTableCell>
                        <StyledTableCell align="center" style={{ fontSize: 15 }}>제목</StyledTableCell>
                        <StyledTableCell align="right">작성자</StyledTableCell>
                        <StyledTableCell align="right">조회수</StyledTableCell>
                        <StyledTableCell align="right" onClick={handleSortRequest}>
                            <TableSortLabel className={classes.sort} active={false} direction={orderDirection}>
                                작성일
                            </TableSortLabel>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.no}>
                            <StyledTableCell component="th" scope="row">
                                {row.no}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.title}</StyledTableCell>
                            <StyledTableCell align="right">{row.writer}</StyledTableCell>
                            <StyledTableCell align="right">{row.views}</StyledTableCell>
                            <StyledTableCell align="right">{row.date}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            count={rows.length}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
            <br />
        </TableContainer>

    );
}