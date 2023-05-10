import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BROWSER_PATH } from "../../constants/path";
import HeaderRight from "./HeaderRight";
import {
  ABOUT,
  ADOPT,
  COMMUNITY,
  MYPAGE,
  SHOP,
  SUPPORT,
} from "../../constants/PageURL";

const Header = ({ page }) => {
  return (
    <HeaderNavStyle className="headerNav">
      <div className="headerLeft">
        <div className="logo">
          <Link to="/">
            <img alt="petmily icon" src="/images/petmilylogo.png" />
          </Link>
        </div>
      </div>
      <Section className="section">
        <NavList
          title={"소개"}
          navList={[
            { linkName: "프로젝트 소개", link: ABOUT.ABOUT },
            { linkName: "입양절차", link: ABOUT.ADOPT_PROCESS },
            { linkName: "활동내역", link: ABOUT.ACTIVITY() },
            { linkName: "공지사항", link: ABOUT.NOTICE() },
            { linkName: "자주 묻는 질문", link: ABOUT.FAQ },
            { linkName: "마이페이지", link: MYPAGE.INFO }, // 임시로 확인하기 편하게 추가(이후 삭제)
          ]}
        />
        <NavList
          title={"입양"}
          navList={[
            { linkName: "보호 동물", link: ADOPT.ANIMAL_LIST },
            { linkName: "입양 후기 게시판", link: ADOPT.REVIEW },
            { linkName: "동물 병원 정보", link: ADOPT.HOSPITAL_LOCATION },
            { linkName: "보호소 위치", link: ADOPT.SHELTER_LOCATION },
          ]}
        />
        <NavList
          title={"커뮤니티"}
          navList={[
            { linkName: "실종 동물 게시판", link: COMMUNITY.MISSING },
            { linkName: "목격 제보 게시판", link: COMMUNITY.FIND },
            { linkName: "자유게시판", link: COMMUNITY.FREE },
            { linkName: "매매 장터", link: COMMUNITY.FLEA },
          ]}
        />
        <NavList
          title={"SHOP"}
          navList={[
            { linkName: "상품", link: SHOP.PRODUCT },
            { linkName: "장바구니", link: SHOP.CART },
          ]}
        />
        <NavList
          title={"후원"}
          navList={[
            { linkName: "기부 내역", link: SUPPORT.DONATE },
            { linkName: "기부하기", link: SUPPORT.APPLY },
            { linkName: "봉사하기", link: SUPPORT.VOLUNTEER_NOTICE },
            { linkName: "봉사 후기", link: SUPPORT.VOLUNTEER_REVIEW },
          ]}
        />
        <HeaderRight />
      </Section>
    </HeaderNavStyle>
  );
};

const NavList = ({ title, navList, isSelected }) => {
  const [selected, setSelected] = useState(1);
  const [height, setHeight] = useState(0);
  // const [color, setColor] = useState(0);
  const ulRef = useRef(null);

  const HandleMouseOver = () => {
    const ulHeight = ulRef.current.scrollHeight;
    setHeight(ulHeight);
    setSelected(1);
  };

  return (
    <NavListStyle
      onMouseOver={HandleMouseOver}
      onMouseOut={() => setSelected(0)}
      isSelected={selected}
      height={height}
    >
      <div className="NavTitle">{title}</div>
      <ul ref={ulRef}>
        {navList.map((links, index) => {
          return (
            <li key={index}>
              <Link to={links.link}>{links.linkName}</Link>
            </li>
          );
        })}
      </ul>
    </NavListStyle>
  );
};

const HeaderNavStyle = styled.div`
  position: fixed;
  display: flex;
  left: 0;
  top: 0;
  width: 100%;
  height: 85px;
  text-align: center;
  user-select: none;
  background: rgb(255, 255, 238);
  box-shadow: 0px 2px 0px rgb(167, 165, 165);
  z-index: 1000;

  .logo {
    width: 15vw;
    min-width: 200px;
    margin-right: 30px;
    margin-top: 5px;
    object-fit: cover;
  }

  .NavTitle {
    padding: 10px 0 0 0;
  }
`;

const Section = styled.div`
  display: flex;
`;

const NavListStyle = styled.div`
  width: 12vw;
  .NavTitle {
    width: 11vw;
    height: 30px;
    margin: 25px auto 10px auto;
    font-weight: 550;
    font-size: 1.2rem;
    cursor: default;
    white-space:nowrap;
  }
  .NavTitle:hover {
    background-color: #E8E8E8;
    border: 1px solid #E8E8E8;
    border-radius: 15px 15px / 15px 15px;
  }

  li:hover {
    background-color: #E8E8E8;
  }

  ul {
    margin: auto;
    padding-left: 0px;
    list-style-type: none;
    overflow: hidden;
    height: ${(props) => (props.isSelected === 1 ? props.height + "px" : 0)};
    transition: height 0.5s ease-in-out;
    background-color: #FFFFEE;
    border: 2px solid #E8E8E8;
  }
  li {
    min-width: 300px
    height: 40px;
    margin: 20px 0px 5px 0px;
    padding-bottom: 5px;
    border-bottom: 1px solid #fbd385;
    box-shadow: 0px 0.5px 0px rgb(167, 165, 165);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px 15px / 7px 7px;
    // border: 2px ridge #E8E8E8;
  }
  li > a {
    color: black;
    text-decoration: none;
    font-weight: 400;
    font-size: 1.1rem;
  }
`;

export default Header;
