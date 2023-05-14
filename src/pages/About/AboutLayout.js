import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ABOUT } from "../../constants/PageURL";
import { Box, Tab, Tabs, Typography, styled } from "@mui/material";
import { startTransition, useEffect, useRef, useState } from "react";
import { ThemeProvider } from "styled-components";
import { CustomTheme } from "../../assets/Theme/CustomTheme";

const AboutLayout = () => {
  // useEffect(() => console.log(setTitle));
  return (
    <ThemeProvider theme={CustomTheme}>
      <Box
        display={"flex"}
        justifyContent={"center"}
        flexWrap={"wrap"}
        alignContent={"space-between"}
      >
        <AboutNav />
        <Box width={"70vw"} display={"flex"} justifyContent={"center"}>
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const pages = [
  { title: "프로젝트 소개", link: ABOUT.ABOUT },
  { title: "입양 절차", link: ABOUT.ADOPT_PROCESS },
  { title: "활동 내역", link: ABOUT.ACTIVITY() },
  { title: "활동 내역", link: ABOUT.ACTIVITY_DETAIL("") },
  { title: "공지사항", link: ABOUT.NOTICE() },
  { title: "공지사항", link: ABOUT.NOTICE_DETAIL() },
  { title: "공지사항", link: ABOUT.NOTICE_WRITE },
  { title: "자주 하는 질문", link: ABOUT.FAQ },
];

const AboutNav = () => {
  const { pathname } = useLocation();
  const TabsRef = useRef();
  const [title, setTitle] = useState(
    pages.find(
      (page) =>
        pathname === page.link ||
        (page.link !== ABOUT.ABOUT && pathname.includes(page.link))
    ).title
  );

  useEffect(() => {
    // pages.forEach((page) => {
    //   console.log(
    //     pathname,
    //     page.link,
    //     pathname === page.link,
    //     page.link !== ABOUT.ABOUT && pathname.includes(page.link)
    //   );
    // });
    setTitle(
      pages.find(
        (page) =>
          pathname === page.link ||
          (page.link !== ABOUT.ABOUT && pathname.includes(page.link))
      ).title
    );
  }, [pathname]);
  const handleChange = (event, newValue) => {
    setTitle(newValue);
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <Box bgcolor={"#f8f8f8"} pt={5} pb={5} width={"100vw"}>
        <Box display={"flex"} justifyContent={"center"}>
          <Typography
            fontSize={"3rem"}
            fontWeight={"bold"}
            fontFamily={"GmarketSansMedium"}
            borderBottom={"3px solid #fbd385"}
            width={"fit-content"}
          >
            {title}
          </Typography>
        </Box>
        <Box m={2}>
          <StyledTabs
            value={title}
            onChange={handleChange}
            centered
            ref={TabsRef}
          >
            <LinkTab
              label="프로젝트 소개"
              value={"프로젝트 소개"}
              link={ABOUT.ABOUT}
            />
            <LinkTab
              label="입양 절차"
              value={"입양 절차"}
              link={ABOUT.ADOPT_PROCESS}
            />
            <LinkTab
              label="활동 내역"
              value={"활동 내역"}
              link={ABOUT.ACTIVITY()}
            />
            <LinkTab
              label="공지사항"
              value={"공지사항"}
              link={ABOUT.NOTICE()}
            />
            <LinkTab
              label="자주 하는 질문"
              value={"자주 하는 질문"}
              link={ABOUT.FAQ}
            />
          </StyledTabs>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const StyledTabs = styled(Tabs)({
  ".MuiTab-root": {
    fontSize: "1.5rem",
    fontWeight: "bold",
    fontFamily: "GmarketSansMedium",
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "#fbd385",
  },
  "& .Mui-selected": {
    color: "#fbd385 !important",
  },
});

function LinkTab(props) {
  const navigate = useNavigate();
  const handleClick = () => {
    startTransition(() => {
      navigate(props.link);
    });
  };
  return (
    <ThemeProvider theme={CustomTheme}>
      <Tab onClick={handleClick} {...props} />
    </ThemeProvider>
  );
}

export default AboutLayout;
