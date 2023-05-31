import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Grid from "@mui/material/Grid";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { tableCellClasses } from "@mui/material/TableCell";
import { Pagination } from "@mui/material";
import Stack from "@mui/material/Stack";
import CustomButton from "../../Login/CustomButton";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { ADMIN, MYPAGE } from "../../../constants/PageURL";
import { ThemeProvider, Typography } from "@mui/material";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContexts";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // "td,th": {
  //   border: "1px solid lightgray",
  // },
}));

const AdminAdopt = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState([]);
  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    axios
      .all([
        axios.get("http://localhost:8080/adopt/counts"),
        axios.get("http://localhost:8080/adopt/list"),
      ])
      .then(
        axios.spread((countsResponse, listResponse) => {
          setCount(countsResponse.data);
          setData(listResponse.data);
        })
      )
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleOnClick = (adoptNum, adopt) => {
    navigate(ADMIN.ADMIN_ADOPT(adoptNum), {
      state: {
        adoptNum: adopt.adoptNum,
        petName: adopt.petName,
        adopterAddr: adopt.adopterAddr,
        adopterEmail: adopt.adopterEmail,
        adopterName: adopt.adopterName,
        adopterTel: adopt.adopterTel,
        adoptState: adopt.adoptState,
        adopterBirth: adopt.adopterBirth,
      },
    });
  };
  return (
    <ThemeProvider theme={CustomTheme}>
      <div
        style={{
          // textAlign: "center",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "50px auto",
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          fontWeight="bold"
          fontSize="40px"
          sx={{ marginBttom: "20px" }}
        >
          입양 현황
        </Typography>
        <Grid sx={{ width: "940px", height: "20px" }}>
          <Table
            sx={{
              mt: 10,
              border: "1px solid lightgray",
            }}
            aria-label="caption table"
            overflow="hidden"
          >
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                  신청 : {count.totalCount}
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                  대기 : {count.waitingCount}
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                  입양완료 : {count.successCount}
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                  입양반려 : {count.failCount}
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
          </Table>
        </Grid>
        {data.length === 0 ? (
          <Grid sx={{ width: "940px", height: "50vh" }}>
            <Table
              sx={{
                mt: 15,
                border: "1px solid lightgray",
              }}
              aria-label="caption table"
              overflow="hidden"
            >
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell
                    colSpan={4}
                    align="center"
                    sx={{ height: 250 }}
                  >
                    입양 신청 내역이 없습니다.
                  </StyledTableCell>
                </StyledTableRow>
              </TableHead>
            </Table>
          </Grid>
        ) : (
          <Grid sx={{ width: "940px", height: "50vh" }}>
            <Table
              sx={{
                mt: 15,
                border: "1px solid lightgray",
              }}
              aria-label="caption table"
              overflow="hidden"
            >
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell align="center" sx={{ minWidth: 10 }}>
                    No.
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                    입양자 이름
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                    동물고유번호
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                    신청일자
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                    입양상태
                  </StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(
                    (page - 1) * rowsPerPage,
                    (page - 1) * rowsPerPage + rowsPerPage
                  )
                  .map((adopt) => (
                    <StyledTableRow
                      key={adopt.adoptNum}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleOnClick(adopt.adoptNum, adopt)}
                    >
                      <StyledTableCell align="center" sx={{ minWidth: 10 }}>
                        {adopt.adoptNum}
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                        {adopt.adopterName}
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                        {adopt.petName}
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ minWidth: 30 }}>
                        {adopt.adoptDate.substring(0, 10)}
                      </StyledTableCell>
                      {adopt.adoptState === "wait" ? (
                        <StyledTableCell
                          align="center"
                          sx={{
                            minWidth: 10,
                            color: "darkgray",
                          }}
                        >
                          대기중
                        </StyledTableCell>
                      ) : adopt.adoptState === "success" ? (
                        <StyledTableCell
                          align="center"
                          sx={{
                            minWidth: 10,
                            color: "blue",
                          }}
                        >
                          입양승인
                        </StyledTableCell>
                      ) : (
                        <StyledTableCell
                          align="center"
                          sx={{
                            minWidth: 10,
                            color: "red",
                          }}
                        >
                          입양반려
                        </StyledTableCell>
                      )}
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>

            <Stack spacing={2} sx={{ mt: 5 }}>
              <Pagination
                color="primary"
                page={page}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
                onChange={handleChangePage}
                component="div"
                count={Math.ceil(data.length / rowsPerPage)}
              />
            </Stack>
          </Grid>
        )}
      </div>
    </ThemeProvider>
  );
};

const titleSx = {
  width: "200px",
  textAlign: "center",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "1.5rem",
  lineHeight: "50px",
};

export default AdminAdopt;
