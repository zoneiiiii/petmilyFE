import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { COMMUNITY } from '../../../constants/PageURL';
import CustomButton from "../../Login/CustomButton";
import Comment from "../../../components/Comment/Comment";

const FleaDetail = () => {
  return (
    <Section className="result">
      <Container className="result-container">
        <div className="articles-wrap">
          <p className="article-kind">중고장터 세부 페이지</p>
        </div>

        <Head>
          <hr />
          <p className="title">...</p>
          <div className="subtitle">
            <p className="name">작성자: ...</p>
            <p className="date">...</p>
            <p className="cnt">조회수: ...</p>
            <p className="comment">댓글: ...</p>
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
            <p>...</p>
            <p>...</p>
            <p>...</p>
            <p>...</p>
            <p>...</p>
          </div>
          <Link to={COMMUNITY.FLEA} style={{ textDecoration: "none" }}>
            <CustomButton label="돌아가기" value="작성취소" />
          </Link>
        </Body>


        <Comments>
          <hr />
          <p className="comment">댓글</p>
          <Comment />
        </Comments>

        <div className="write-item">
          <Link to={COMMUNITY.FLEA} style={{ textDecoration: "none" }}>
            <CustomButton label="돌아가기" value="작성취소" />
          </Link>
        </div>
      </Container>
    </Section >
  );
};

const Section = styled.section`
    // margin-top: 24px;
    background: #f8f9fa;
    padding: 30px 0 40px 0;
`;

const Container = styled.div`
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
  
  .articles-wrap {
      padding: 0px 40px;
  }

  .article-kind {
    font-weight: 600;
    color: rgb(33, 37, 41);
    font-size: 40px;
    margin: 20px 0 40px 0;
  }
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

export default FleaDetail;
