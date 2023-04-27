import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BROWSER_PATH } from "../../constants/path";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Header = ({ page }) => {

    return (
        <HeaderNavStyle className="headerNav">
            <div className="headerLeft">
                <div className="logo">
                    <Link to='/'>
                        <img alt="petmily icon" src="./../images/petmilylogo.png" />
                    </Link>
                </div>
            </div>
            <NavList
                title={"소개"}
                navList={[
                    { linkName: "공지사항", link: BROWSER_PATH.MYPAGE }, // 페이지 없음
                    { linkName: "프로젝트 소개", link: BROWSER_PATH.MYPAGEORDER }, // 페이지 없음
                    { linkName: "활동내역", link: BROWSER_PATH.MYPAGE }, // 페이지 없음
                    { linkName: "입양절차", link: BROWSER_PATH.MYPAGE }, // 페이지 없음
                ]}
            />
            <NavList
                title={"입양"}
                navList={[
                    { linkName: "보호 동물", link: BROWSER_PATH.MYPAGE }, // 링크없어서 마이페이지로 연결, 페이지 없음
                    { linkName: "입양 후기 게시판", links: BROWSER_PATH.MYPAGE }, // 링크없어서 마이페이지로 연결, 페이지 없음
                    { linkName: "동물 병원 정보", link: BROWSER_PATH.MYPAGE }, // 링크없어서 마이페이지로 연결, 페이지 없음
                    { linkName: "보호소 위치", link: BROWSER_PATH.MYPAGE }, // 링크없어서 마이페이지로 연결, 페이지 없음
                ]}
            />
            <NavList
                title={"커뮤니티"}
                navList={[
                    { linkName: "실종 동물 게시판", link: BROWSER_PATH.MYPAGE }, // 링크없어서 마이페이지로 연결, 페이지 없음
                    { linkName: "목격 제보 게시판", link: BROWSER_PATH.MYPAGE }, // 링크없어서 마이페이지로 연결, 페이지 없음
                    { linkName: "자유게시판", link: BROWSER_PATH.MYPAGE }, // 링크없어서 마이페이지로 연결, 페이지 없음
                    { linkName: "매매 장터", link: BROWSER_PATH.MYPAGE }, // 링크없어서 마이페이지로 연결, 페이지 없음
                ]}
            />
            <NavList
                title={"SHOP"}
                navList={[
                    { linkName: "상품", link: BROWSER_PATH.MYPAGE },
                    { linkName: "장바구니", link: BROWSER_PATH.MYPAGEORDER }, // 페이지 없음
                ]}
            />
            <NavList
                title={"후원"}
                navList={[
                    { linkName: "기부 내역", link: BROWSER_PATH.MYPAGE },
                    { linkName: "봉사하기", link: BROWSER_PATH.MYPAGEORDER }, // 페이지 없음
                    { linkName: "봉사 후기", link: BROWSER_PATH.MYPAGE }, // 링크없어서 마이페이지로 연결, 페이지 없음
                ]}
            />

            <HeadrRight className="headright">
                <Stack className="stack" spacing={2} direction="row" >
                    <Button variant="outlined" size="large"
                        sx={{
                            m: 1,
                            color: '#FFFFFF',
                            background: "#FBD385",
                            borderColor: '#FBD385',
                            ":hover": { borderColor: "#FFBE3F", background: "#FFBE3F" },
                        }}>로그인</Button>
                    <Button variant="outlined" size="large"
                        sx={{
                            m: 1,
                            color: "#FFFFFF",
                            background: "#BFBFBF",
                            borderColor: "#BFBFBF",
                            ":hover": { borderColor: "gray", background: "gray" },
                        }}>회원가입</Button>
                </Stack>
            </HeadrRight>


        </HeaderNavStyle>
    );
};

const NavList = ({ title, navList, isSelected }) => {
    const [selected, setSelected] = useState(1);
    const [height, setHeight] = useState(0);
    const [color, setColor] = useState(0);
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
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 85px;
  text-align: center;
  user-select: none;
  background: rgb(255, 255, 238);
  box-shadow: 0px 2px 0px rgb(167, 165, 165);

  .logo {
    width: 15vw;
    margin-right: 30px
    }

  .NavTitle {
    padding-top: 10px;
  }

  .headerNav {
    left: 0;
    top: 0;
    width: 100%;
    height: 85px;
    backgroundcolor: #FFFFEE;
    box-shadow: 0px 2px 0px rgb(167, 165, 165);
  }
`;

const NavListStyle = styled.div`
  width: 200px;
  .NavTitle {
    width: 100px;
    height: 40px;
    border: 1px solid #fbd385;
    border-radius: 15px 15px / 15px 15px;
    margin: 25px 50px 0;
    font-weight: 550;
    font-size: 17px;
    // line-height: 36px;
    // z-index: 0;
    cursor: default;
  }
  .NavTitle:hover {
    background-color: gold;
  }
// 탭이 선택되어 있을 때 작동.
//   .NavTitle.active {
//     background-color: gold;
//   }
  li:hover {
    background-color: gold;
  }

  ul {
    margin: 0px;
    padding: 0px;
    list-style-type: none;
    overflow: hidden;
    height: ${(props) => (props.isSelected === 1 ? props.height + "px" : 0)};
    transition: height 0.5s ease-in-out;
  }
  li {
    max-width: 400px
    height: 40px;
    border-bottom: 1px solid #fbd385;
    box-shadow: 0px 0.5px 0px rgb(167, 165, 165);
    margin: 15px 0px 5px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  li > a {
    color: black;
    text-decoration: none;
    font-weight: 400;
    font-size: 15px;
  }
`;

const HeadrRight = styled.div`
    .stack {
        width: 20vw;
        margin-left: 100px;
        padding-top: 15px;
        align-items: center;
        justify-content: center;
    }
`;

export default Header;