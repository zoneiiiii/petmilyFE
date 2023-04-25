import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const ProfileSrc = "/images/emptyProfile.png";
const MyPageNav = () => {
  return (
    <MyPageNavStyle className="MyPageNav">
      <img className="ProfileImg" src={ProfileSrc} alt="profile" />
      <NavList title={"My Page"} navList={["회원 정보", "구매 내역"]} />
      <NavList title={"입양 관리"} navList={["입양 후기", "입양 내역"]} />
      <NavList
        title={"쓴 글 목록"}
        navList={[
          "실종 동물 게시판",
          "목격 제보 게시판",
          "자유게시판",
          "봉사 후기",
          "매매 장터",
        ]}
      />
    </MyPageNavStyle>
  );
};

const NavList = ({ title, navList, isSelected }) => {
  const [selected, setSelected] = useState(1);
  const [height, setHeight] = useState(0);
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
        {navList.map((link, index) => {
          return (
            <li key={index}>
              <Link to="">{link}</Link>
            </li>
          );
        })}
      </ul>
    </NavListStyle>
  );
};

const MyPageNavStyle = styled.div`
  width: 160px;
  text-align: center;

  .NavTitle {
    margin-top: 20px;
  }
`;

const NavListStyle = styled.div`
  width: 160px;
  .NavTitle {
    width: 160px;
    height: 40px;
    background: rgba(251, 211, 133, 0.58);
    border: 1px solid #fbd385;
    font-weight: 400;
    font-size: 18px;
    line-height: 36px;
    z-index: 0;
    cursor: default;
  }

  ul {
    margin: 0px;
    padding: 0px;
    list-style-type: none;
    overflow: hidden;
    height: ${(props) => (props.isSelected === 1 ? props.height + "px" : 0)};
    transition: height 0.5s ease-in-out;
    z-index: -1;
  }

  li {
    height: 40px;
    border-bottom: 1px solid #fbd385;
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  li > a {
    color: black;
    text-decoration: none;
    font-weight: 400;
    font-size: 18px;
  }
`;

export default MyPageNav;
