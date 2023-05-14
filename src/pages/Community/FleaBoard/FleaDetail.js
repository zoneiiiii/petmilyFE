import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { COMMUNITY } from '../../../constants/PageURL';
import CustomButton from "../../Login/CustomButton";
import Comment from "../../../components/Comment/Comment";
import Slider from "./Slider";

const FleaDetail = (props) => {
  const Slider1 = 'https://picsum.photos/700/500';
  const Slider2 = 'https://picsum.photos/700/500';
  const Slider3 = 'https://picsum.photos/700/500';
  const carouselImage = [Slider1, Slider2, Slider3];

  const profile = {
    profileImg: "https://picsum.photos/300/300", // 사용자 프로필 이미지
    profileNickname: "Petmilyer", // 사용자 닉네임
    region: "관악구 신림동"
  }

  return (
    <Section className="result">
      <Container className="result-container">
        <article className="content">
          <h1 className="hide">캣타워 팝니다.</h1>
        </article>

        <section className="article-images">
          <h3 className="hide">이미지</h3>
          <Slider images={carouselImage} />
        </section>

        {/* 유저 프로필사진 & 닉네임 */}
        <section className="article-profile">
          <h3 className="hide">프로필</h3>
          <div className="space-between">
            <div style={{ display: 'flex' }}>
              <div className="article-profile-image">
                <img alt="프로필 이미지" src={profile.profileImg} />
              </div>
              <div className="article-profile-left">
                <div className="nickname">{profile.profileNickname}</div>
                <div className="region">{profile.region}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="article-description">
          <h1 property="schema:name" className="article-title" style={{ marginTop: '0px' }}>캣타워 팔아요.</h1>
          <p className="article-category">
            " 반려용품 . "
            <time> 작성시간 </time>
          </p>
          <p property="schema:priceValdUntil" datatype="xsd:date" content="2023-05-11"></p>
          <p className="article-price" property="schema:price" content="50000.0">250,000원</p>

          <div property="schema:description" className="article-detail">
            <p>
              새 캣타워를 구매하게 되어 기존에 쓰던 물건을 팔아요.<br />
              1년 정도 사용했고, 상태는 양호합니다.
            </p>
            <p>
              배달가능합니다.
            </p>

          </div>
          <p className="article-counts"> 관심 17 · 댓글 8 · 조회 31</p>

          <div className="article-btn">
            <Link to={COMMUNITY.FLEA}>
              <CustomButton label="목록으로" value="작성취소" />
            </Link>
          </div>
        </section>

        <section className="comment">
          <Comment />
        </section>

      </Container>

    </Section>
  );
};

const Section = styled.section`
  background: #f8f9fa;
  padding: 30px 0 40px 0;
`

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

  .content {
    margin-top: 60px;
    padding-bottom: 0;
  }

  .hide {
    position: absolute;
    left: -9999px;
    top: -9999px;
  }

  .article-images {
    position: relative;
    width: 729px;
    margin: 0 auto;
  }

  .article-profile {
    width: 677px;
    margin: 0 auto;
    text-decoration: none;
    display: block;
    margin-top: 25px;
    padding-bottom: 23px;
    position: relative;
    border-bottom: 1px solid #e9ecef;
  }

  .article-profile-image {
    display: inline-block;

    img {
      width: 40px;
      height: 40px;
      object-fit: cover;
      -webkit-border-radius: 50%;
    }
  }

  .article-profile-left {
    display: inline-block;
    margin-left: 8px;

    .nickname {
      text-decoration: underline;
      font-size: 15px;
      font-weight: 600;
      line-height: 1.5;
      letter-spacing: -0.6px;
      color: #212529;
    }
    .region {
      font-size: 13px;
      line-height: 1.46;
      letter-spacing: -0.6px;
      color: #212529;
    }
  }

  .space-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .article-description {
    padding: 32px 0;
    width: 677px;
    margin: 10px auto;
    
  }

  .article-title {
    margin-top: 16px;
    font-size: 22px;
    font-weight: 600;
    line-height: 1.5;
    letter-spacing: -0.6px;
  }

  .article-category {
    margin-top: 4px;
    font-size: 13px;
    line-height: 1.46;
    letter-spacing: -0.6px;
    color: #868e96;
  }

  .article-price {
    margin-top: 4px;
    font-size: 17px;
    font-weight: 600;
    line-height: 1.76;
    letter-spacing: -0.6px;
  }

  .article-detail {
    margin-bottom: 16px;
    margin-top: 8px;
  }

  .article-counts {
    font-size: 13px;
    line-height: 1.46;
    letter-spacing: -0.6px;
    color: #868e96;
  }

  .article-btn {
    height: 50px;
    border-bottom: 1px solid #e9ecef;
  }

  .comment {
    width: 700px;
    margin: 0 auto;
  }
`


export default FleaDetail;
