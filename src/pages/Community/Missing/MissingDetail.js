import styled from "styled-components";
import * as React from "react";
import Comment from "../../../components/Comment/Comment";
import { Link } from "react-router-dom";
// import axios from "axios";
// import { useEffect, useState } from "react";
import CustomButton from "../../Login/CustomButton";
import { COMMUNITY } from "../../../constants/PageURL";
// import { COMMENT_KEYS } from "@babel/types";
// import { COMMUNITY } from "../../../constants/PageURL";

const FreeDetail = () => {
  return (
    <Container>
      <Top>실종 동물 게시판</Top>
      <Head>
        <hr />
        <p className="title">골든 리트리버 똘이를 찾습니다.</p>
        <div className="subtitle">
          <p className="name">똘이 엄마</p>
          <p className="date">23.04.19 15:00:27</p>
          <p className="cnt">조회수: 31</p>
          <p className="comment">댓글: 3</p>
        </div>
        <hr /><br />
      </Head>
      <Body>
        <img
          src="http://placeimg.com/300/300/animals/sepia"
          alt="img"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto !important",
            height: "auto",
          }}
        />
        <div>
          <br />
          문을 열어놓은 사이에 똘이가 나가버렸어요ㅠㅠ
          똘이를 보신 분들은 010-1234-5925로 연락 부탁드리겠습니다ㅠㅠㅠ
          사례금은 부족하지 않게 드리겠습니다ㅠㅠㅠ
        </div>
        <Link to={COMMUNITY.FREE} style={{ textDecoration: "none" }}>
          <CustomButton label="돌아가기" value="작성취소" />
        </Link>
      </Body>


      <Comments>
        <hr />
        <p className="comment">댓글</p>
        <Comment />
      </Comments>
    </Container>
  );
}

const Container = styled.div`
max-width: 65vw;
margin: auto;
`;

const Top = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2rem;
`;

const Head = styled.div`

    .title {
        font-size: 1.5rem;
        font-weight: bold;
    }

    .subtitle {
        display: flex;
    flex-wrap: wrap;
    .name {
        width: 10%;
    }
    .date {
        width: 70%;
    }
    .cnt {
        text-align: right;
        width: 15%;
    }
    .comment {
        text-align: right;
        width: 5%;
    }
`;

const Body = styled.div`
    margin: auto;
`;

const Comments = styled.div`
    margin: 150px auto 20px auto;
    max-width: 70vw;
    font-size: 2rem;
    font-weight: 700;
`;


//data : board_num,member_num,board_id,free_subject,free_content,
// free_count,free_img,free_date
const dummy = [
  {
    board_num: 1,
    member: "똘이엄마",
    free_count: "31",
    free_subject: "똘이를 찾았습니다ㅠㅠ",
    free_content: "도와주셔서 감사합니다ㅠㅠㅠ",
    free_date: "2023-04-30",
    free_img: "../../../../public/images/petmilyIcon.png"
  }];

export default FreeDetail;