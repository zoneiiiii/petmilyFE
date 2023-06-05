import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Select,
  MenuItem,
  ThemeProvider,
} from "@mui/material";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar } from "@mui/material";
import styled from "styled-components";
import LoadingPage from "../../../components/Loading/LoadingPage";

const UserImg = styled(Avatar)`
  && {
    margin-right: 8px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 10px;
  }
`;

const AdminMember = () => {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalMembers, setTotalMembers] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);
      const response = await axios.get("/members", {
        params: {
          page: page,
          size: rowsPerPage,
        },
      });
      setMembers(response.data.content);
      const memberCountResponse = await axios.get("/members/count");
      setTotalMembers(memberCountResponse.data);
      setIsLoading(false);
    };
    fetchMembers();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteMember = async (memberNum) => {
    try {
      await axios.delete(`/members/${memberNum}`);
      // 회원 데이터 삭제 후 목록을 다시 불러옴
      const response = await axios.get("/members", {
        params: {
          page: page,
          size: rowsPerPage,
        },
      });
      setMembers(response.data.content);
      const memberCountResponse = await axios.get("/members/count");
      setTotalMembers(memberCountResponse.data);
    } catch (error) {
      console.error("회원 삭제 실패:", error);
    }
  };

  const handleDeleteButtonClick = (memberNum) => {
    if (window.confirm("정말로 회원을 삭제하시겠습니까?")) {
      handleDeleteMember(memberNum);
      alert("회원 삭제가 완료되었습니다.");
    }
  };

  const handleRoleChange = (memberNum, newRole) => {
    if (window.confirm("멤버 권한을 수정하시겠습니까?")) {
      axios
        .put(`/updateRole/${memberNum}`, { memberRole: newRole })
        .then((response) => {
          window.alert("권한이 수정 되었습니다");
          return axios.get("/members", {
            //수정 후 다시 데이터 가져옴.
            params: {
              page: page,
              size: rowsPerPage,
            },
          });
        })
        .then((response) => {
          setMembers(response.data.content);
        })
        .catch((error) => {
          console.error("There was an error!", error);
          window.alert("수정 실패");
        });
    }
  };

  if (isLoading) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  } else {
    return (
      <ThemeProvider theme={CustomTheme}>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Paper
            sx={{
              p: 1,
              mb: 2,
              fontWeight: "bold",
              textAlign: "center",
              height: "57px",
              lineHeight: "46px",
            }}
          >
            총 회원수 : {totalMembers} 명
          </Paper>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    대표이미지
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    ID
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    닉네임
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Email
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    이름
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    성별
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    생년월일
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    유저 권한
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    관리
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members.map((member) => {
                  return (
                    <TableRow key={member.memberNum}>
                      <TableCell>
                        {<UserImg src={member.memberImg} />}{" "}
                      </TableCell>
                      <TableCell align="center">{member.memberId}</TableCell>
                      <TableCell align="center">
                        {member.memberNickname}
                      </TableCell>
                      <TableCell align="center">{member.memberEmail}</TableCell>
                      <TableCell align="center">{member.memberName}</TableCell>
                      <TableCell align="center">
                        {member.memberGender}
                      </TableCell>
                      <TableCell align="center">{member.memberBirth}</TableCell>
                      <TableCell align="center">
                        <Select
                          sx={{
                            fontSize: "13px",
                            width: "100px",
                            height: "40px",
                          }}
                          value={member.memberRole}
                          onChange={(e) =>
                            handleRoleChange(member.memberNum, e.target.value)
                          }
                        >
                          <MenuItem sx={{ fontSize: "13px" }} value={"Admin"}>
                            Admin
                          </MenuItem>
                          <MenuItem sx={{ fontSize: "13px" }} value={"User"}>
                            User
                          </MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="ff8282"
                          size="small"
                          onClick={() =>
                            handleDeleteButtonClick(member.memberNum)
                          }
                        >
                          삭제
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <Box sx={{ p: 2, display: "flex", justifyContent: "right" }}>
              <TablePagination
                component="div"
                count={totalMembers}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </Paper>
        </Container>
      </ThemeProvider>
    );
  }
};

export default AdminMember;
