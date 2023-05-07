import styled from "styled-components";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CustomButton from "../Login/CustomButton";
import Grid from "@mui/material/Grid";
import { Link, useParams } from "react-router-dom";
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
  const { id } = useParams();
  const [qnaData, setQnaData] = useState(dummy);

  useEffect(() => {
    setQnaData(dummy.filter((data) => data.num === parseInt(id))[0]);
  }, [id]);

  return (
    <>
      <MyPageStyle>
        <div className="navTitle">
          <h5>1:1 문의</h5>
        </div>
      </MyPageStyle>
      <Grid style={{ width: 1000 }}>
        <Table sx={{ minWidth: 900, width: 1000, mt: 1 }}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}></TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: 850, fontWeight: "bold" }}>
                {qnaData.subject}
              </TableCell>
              <TableCell sx={{ color: "lightgray" }}>{qnaData.date}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2} sx={{ height: 200 }}>
                {qnaData.img}
                <br />
                {qnaData.content}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Table sx={{ minWidth: 900, width: 1000, mt: 5 }}>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2} sx={{ fontWeight: "bold" }}>
                관리자 답변
              </TableCell>
            </TableRow>
            <TableRow>
              {qnaData.qnaStatus === "진행중" ? (
                <TableCell
                  colSpan={2}
                  sx={{ height: 100, color: "gray" }}
                  align="center"
                >
                  답변이 등록되지 않았습니다.
                </TableCell>
              ) : (
                <TableCell
                  colSpan={2}
                  sx={{ height: 100, color: "gray" }}
                  align="center"
                >
                  관리자의 답변~~
                </TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
        <CustomButton label="문의취소" value="작성취소" />
        <Link to={MYPAGE.QNA} style={{ textDecoration: "none" }}>
          <CustomButton label="목록으로" value="1:1문의작성" />
        </Link>
      </Grid>
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

const dummy = [
  {
    num: 7,
    img: (
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
    ),
    subject: "환불 문의드립니다.",
    content: "상품에 하자가 있어 환불 문의드립니다.",
    date: "2023-02-02",
    qnaStatus: "진행중",
  },
  {
    num: 6,
    img: (
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
    ),
    subject: "환불 문의드립니다.",
    content: "환불하고 싶어요.",
    date: "2023-02-02",
    qnaStatus: "진행중",
  },
  {
    num: 5,
    img: (
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
    ),
    subject: "환불 문의드립니다.",
    content: "배송이 너무 늦네요. 환불하고 싶어요.",
    date: "2023-02-02",
    qnaStatus: "진행중",
  },
  {
    num: 4,
    img: (
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
    ),
    subject: "환불 문의드립니다.",
    content: "환불하면 적립금은 어떻게 되나요?",
    date: "2023-02-02",
    qnaStatus: "진행중",
  },
  {
    num: 3,
    img: (
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
    ),
    subject: "환불 문의드립니다.",
    content: "상품에 하자가 있어 환불 문의드립니다.",
    date: "2023-02-02",
    qnaStatus: "진행중",
  },
  {
    num: 2,
    img: (
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
    ),
    subject: "입양 절차 문의드립니다.",
    content: "보호소 매칭이 어떻게 되는건가요?",
    date: "2023-02-02",
    qnaStatus: "답변완료",
  },
  {
    num: 1,
    img: (
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
    ),
    subject: "배송 문의드립니다.",
    content: "이번주에 꼭 필요한 물품인데 배송 언제쯤 올까요?",
    date: "2023-02-02",
    qnaStatus: "답변완료",
  },
];
export default MyPageQnADetail;
