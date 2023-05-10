import { useEffect, useLayoutEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { ADOPT } from "../../constants/PageURL";

const AnimalListNav = () => {
  return (
    <>
      <MyPageNavStyle className="MyPageNav">
        <NavList
          title={"서울특별시"}
          navList={[
            {
              linkName: "서울특별시",
              link: ADOPT.ADOPT,
            },
          ]}
        />
        <NavList
          title={"경기도"}
          navList={[{ linkName: "경기도", link: ADOPT.ANIMAL_LIST("6410000") }]}
        />
        <NavList
          title={"인천"}
          navList={[
            {
              linkName: "인천광역시",
              link: ADOPT.ANIMAL_LIST("6280000"),
            },
          ]}
        />
        <NavList
          title={"강원도"}
          navList={[{ linkName: "강원도", link: ADOPT.ANIMAL_LIST("6420000") }]}
        />
        <NavList
          title={"충청도"}
          navList={[
            { linkName: "충청북도", link: ADOPT.ANIMAL_LIST("6430000") },
            { linkName: "충청남도", link: ADOPT.ANIMAL_LIST("6440000") },
            {
              linkName: "대전광역시",
              link: ADOPT.ANIMAL_LIST("6300000"),
            },
            {
              linkName: "세종특별자치시",
              link: ADOPT.ANIMAL_LIST("5690000"),
            },
          ]}
        />
        <NavList
          title={"전라도"}
          navList={[
            { linkName: "전라북도", link: ADOPT.ANIMAL_LIST("6450000") },
            { linkName: "전라남도", link: ADOPT.ANIMAL_LIST("6460000") },
            {
              linkName: "광주광역시",
              link: ADOPT.ANIMAL_LIST("6290000"),
            },
          ]}
        />
        <NavList
          title={"경상도"}
          navList={[
            { linkName: "경상북도", link: ADOPT.ANIMAL_LIST("6470000") },
            { linkName: "경상남도", link: ADOPT.ANIMAL_LIST("6480000") },
            {
              linkName: "울산광역시",
              link: ADOPT.ANIMAL_LIST("6310000"),
            },
            {
              linkName: "부산광역시",
              link: ADOPT.ANIMAL_LIST("6260000"),
            },
            {
              linkName: "대구광역시",
              link: ADOPT.ANIMAL_LIST("6270000"),
            },
          ]}
        />
        <NavList
          title={"제주도"}
          navList={[
            {
              linkName: "제주특별자치도",
              link: ADOPT.ANIMAL_LIST("6500000"),
            },
          ]}
        />
      </MyPageNavStyle>
      {/* <div>
        {data.length &&
          data.map((item) => (
            <div>
              {item.age}
              <img
                src={item.popfile}
                alt="animal"
                style={{ width: "100px", height: "100px" }}
              />
            </div>
          ))}
      </div> */}
    </>
  );
};

const NavList = ({ title, navList }) => {
  const [selected, setSelected] = useState("");
  const [height, setHeight] = useState(0);
  const [fixed, setFixed] = useState("");
  const location = useLocation();
  const [lastLocation, setLastLocation] = useState("");

  useEffect(() => {
    if (lastLocation !== location.pathname) {
      // 페이지 전환이 발생한 경우
      setFixed("");
      setLastLocation(location.pathname); // 최근 위치 state 갱신신
    } else if (
      lastLocation === location.pathname && // 최근 위치 업데이트 됨
      fixed === "" && // 메뉴 카테고리 고정 초기화 됨
      navList.some((link) => link.link === lastLocation) // 링크들 중에 현재 위치와 일치하는 링크를 찾음
    ) {
      setFixed(title); // state값으로 title을 저장하여 현재 카테고리에 메뉴가 열려있도록 고정 (select값에 상관없이 열려있게 함)
      const ulHeight = ulRef.current.scrollHeight; // 링크들이 들어있는 <ul>의 높이를 구함
      setHeight(ulHeight); // <ul>의 높이를 state로 저장
    }
  }, [location, lastLocation, fixed]);

  const ulRef = useRef(null);

  const HandleMouseOver = () => {
    const ulHeight = ulRef.current.scrollHeight; // useRef를 이용하여 <ul>의 높이를 가져옴
    setHeight(ulHeight); // 가져온 높이를 상태변수에 저장
    setSelected(title); // 해당 메뉴 카테고리가 선택되었음을 state로 저장
  };

  const HandleMouseOut = () => {
    setSelected("");
  };

  return (
    <NavListStyle
      onMouseOver={HandleMouseOver}
      onMouseOut={HandleMouseOut}
      isSelected={selected === title} // 현재 title이 선택되었는지 판단
      isFixed={fixed === title} // 현재 title이 고정되었는지 판단
      height={height} //ref로 구한 <ul>태그의 높이
    >
      <div className="NavTitle">{title}</div>
      <ul ref={ulRef}>
        {navList.map((link, index) => {
          return link.link === location.pathname ? (
            <li key={index}>
              <Link to={link.link} style={{ fontWeight: "bold" }}>
                {link.linkName}
              </Link>
            </li>
          ) : (
            <li key={index}>
              <Link to={link.link}>{link.linkName}</Link>
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
  margin: 40px;

  .NavTitle {
    margin-top: 20px;
  }
`;

const NavListStyle = styled.div`
  width: 160px;
  .NavTitle {
    width: 160px;
    height: 40px;
    // background: rgba(251, 211, 133, 0.58);
    background: #fbd385;
    border: 1px solid #ffbd59;
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
    height: ${(props) =>
      props.isFixed || props.isSelected ? props.height + "px" : 0};
    transition: height 0.5s ease-in-out;
    z-index: -1;
  }

  li {
    height: 40px;
    border-bottom: 2px solid #ffbd59;
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
export default AnimalListNav;
