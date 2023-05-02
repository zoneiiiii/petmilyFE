import styled from "styled-components";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CustomButton from "../Login/CustomButton";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { MYPAGE } from "../../constants/PageURL";

//제목, 내용, 멤버num, 답변상태, boardid, boardnum, 이미지, 날짜
// const [data, setData] = useState({
//   subject: "",
//   img: "",
//   content: "",
// });
// useEffect(() => {
//   setData({
//     subject: board.subject,
//     img : board.img,
//     content: board.content,
//   });
// }, []);
// const handleDelete = () => {
//   axios
//     .post("/qnaBoardDelete", {
//       num: board.num,
//     })
//     .then((res) => {
//       if (res.data) {
//         alert("삭제완료!");
//         document.location.href = "/member/qnainquiry";
//       }
//     })
//     .catch((e) => {
//       console.error(e);
//     });
// };

const MyPageQnADetail = () => {
  return (
    <>
      <MyPageStyle>
        <div className="navTitle">
          <h5>1:1 문의</h5>
        </div>
      </MyPageStyle>
      <Table sx={{ minWidth: 900, mt: 1 }}>
        <TableHead>
          <TableRow>
            <TableCell colspan={2}></TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ width: 800, fontWeight: "bold" }}>
              환불 문의드립니다.
            </TableCell>
            <TableCell sx={{ color: "lightgray" }}>2023-02-02</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell colspan={2} sx={{ height: 200 }}>
              <img
                src="https://source.unsplash.com/random/?programming"
                alt="img"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto !important",
                  height: "auto",
                }}
              />
              <br />
              상품 상태가 좋지 않아 환불하려고 합니다.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table sx={{ minWidth: 900, mt: 5 }}>
        <TableRow>
          <TableCell colspan={2} sx={{ fontWeight: "bold" }}>
            관리자 답변
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            colspan={2}
            sx={{ height: 100, color: "gray" }}
            align="center"
          >
            답변이 등록되지 않았습니다.
          </TableCell>
        </TableRow>

        <CustomButton label="문의취소" value="작성취소" />
        <Link to={MYPAGE.QNA} style={{ textDecoration: "none" }}>
          <CustomButton label="목록으로" value="1:1문의작성" />
        </Link>
      </Table>
    </>
  );
};
const MyPageStyle = styled.div`
  .navTitle {
    border: 1px solid #fbd385;
    width: 200px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default MyPageQnADetail;
