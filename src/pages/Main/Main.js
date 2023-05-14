import React from "react";
import CarouselMain from "../../components/Main/Carousel";
import * as S from "./Main.styled";

import Banner1 from "../../assets/images/Main/Banner/Banner1.png";
import Banner2 from "../../assets/images/Main/Banner/Banner2.png";
import Banner3 from "../../assets/images/Main/Banner/Banner3.png";
import Card1 from "../../assets/images/Main/Card/card1.jpg";
import Card2 from "../../assets/images/Main/Card/card2.jpg";
import Card3 from "../../assets/images/Main/Card/card3.jpg";
import Card4 from "../../assets/images/Main/Card/card4.jpg";
import Card5 from "../../assets/images/Main/Card/card5.png";
import MainCard from "../../components/Main/MainCard";

// const image = "https://picsum.photos/1000/400";
const carouselImage = [Banner1, Banner2, Banner3];

const Main = () => {
  return (
    <S.Container>
      <S.CarouselContainer>
        <CarouselMain images={carouselImage} />
      </S.CarouselContainer>
      <S.CardContainer>
        <S.SectionContainer>새로운 가족을 찾아주세요</S.SectionContainer>
        <S.TextContainer>
          보호소에서 기다리고 있는 아이들의 새로운 가족이 되어주세요!
        </S.TextContainer>
        <MainCard image={Card1} buttonText="보호소 둘러보기" link="/adopt/" />
      </S.CardContainer>
      <S.CardContainer2>
        <S.SectionContainer>따뜻한 경험을 공유 해주세요</S.SectionContainer>
        <S.TextContainer>소중한 입양 이야기를 함께 나눠요!</S.TextContainer>
        <MainCard
          image={Card2}
          buttonText="입양 후기 작성하기"
          link="/adopt/review"
        />
      </S.CardContainer2>

      <S.CardContainer>
        <S.SectionContainer>
          안쓰는 물건을 필요한 사람에게 거래하자
        </S.SectionContainer>
        <S.TextContainer>
          안쓰는 물건을 판매하거나 필요한 물건을 저렴하게 구매해보세요!
        </S.TextContainer>
        <MainCard
          image={Card3}
          buttonText="플리마켓 바로가기"
          link="/board/flea"
        />
      </S.CardContainer>

      <S.CardContainer>
        <S.SectionContainer>저희 집 아이를 찾아주세요</S.SectionContainer>
        <S.TextContainer>빠른 발견을 위해 모두의 힘을 모아요</S.TextContainer>
        <MainCard
          image={Card4}
          buttonText="실종 동물 신고하기"
          link="/board/missing"
        />
      </S.CardContainer>

      <S.CardContainer>
        <S.SectionContainer>반려동물 용품은 펫밀리에서</S.SectionContainer>.
        <S.TextContainer>
          아이들의 건강을 생각하는 품질 좋은 용품을 구매해보세요
          <br />
          수익금의 일부는 유기 동물 자선단체에 기부됩니다
        </S.TextContainer>
        <MainCard
          // title="반려동물 먹거리는 펫밀리에서"
          image={Card5}
          buttonText="반려용품 사러가기"
          link="/shop/product"
        />
      </S.CardContainer>
    </S.Container>
  );
};

export default Main;
