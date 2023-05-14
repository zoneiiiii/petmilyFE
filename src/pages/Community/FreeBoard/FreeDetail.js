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
        <Section className="result">
            <MainContainer className="result-container">
                <Container>
                    <Top>자유게시판</Top>
                    <Head>
                        <hr />
                        <p className="title">똘이를 찾았습니다ㅠㅠ</p>
                        <div className="subtitle">
                            <p className="name">똘이 엄마</p>
                            <p className="date">23.04.19 15:00:27</p>
                            <p className="cnt">조회수: 31 · 댓글: 3</p>
                        </div>
                        <hr /><br />
                    </Head>
                    <Body>
                        <img
                            src="https://image.dongascience.com/Photo/2022/06/6982fdc1054c503af88bdefeeb7c8fa8.jpg"
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
                            도와주셔서 감사합니다ㅠㅠㅠ
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
            </MainContainer>
        </Section>
    );
}

const Section = styled.section`
  background: #f8f9fa;
  padding: 30px 0 40px 0;
`

const MainContainer = styled.div`
  width: 60vw;
  // width: 1150px;
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

const Container = styled.div`
margin: 0 30px;
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
        width: 15%;
    }
    .date {
        width: 65%;
    }
    .cnt {
        text-align: right;
        width: 20%;
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