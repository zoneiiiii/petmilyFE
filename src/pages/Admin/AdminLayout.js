import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems } from "./AdminNav";
import { ADMIN, MAIN } from "../../constants/PageURL";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        PETMILY
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme({
  typography: {
    fontFamily: "GmarketSansMedium",
    button: {
      fontWeight: "bold",
    },
  },
});

const pages = [
  { title: "회원관리", path: ADMIN.MEMBER },
  { title: "입양관리", path: ADMIN.ADOPT },
  { title: "대시보드", path: ADMIN.ADMINLAYOUT },
  { title: "1:1문의", path: ADMIN.QNA },
  { title: "상품관리", path: ADMIN.PRODUCT },
  { title: "상품입력", path: ADMIN.PRODUCT_WRITE },
  { title: "주문/배송관리", path: ADMIN.ORDER },
  { title: "기부관리", path: ADMIN.DONATION },
  { title: "게시글관리", path: ADMIN.BOARD },
];

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(true);
  const [title, setTitle] = useState("");
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [openAdminModal, setOpenAdminModal] = useState(false);
  const handleAdminModalClose = () => {
    setOpenAdminModal(false);
    navigate(MAIN);
  };

  useEffect(() => {
    axios
      .get("/admin/check-admin")
      .then((response) => {
        if (!response.data) {
          setOpenAdminModal(true);
        }
      })
      .catch((error) => {
        console.error("에러발생:", error);
        alert("에러발생: " + error);
        navigate(MAIN);
      });
  }, []);

  useEffect(() => {
    const container = document.getElementById("outlet");
    if (container) container.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    setTitle(
      pages.find(
        (page) =>
          pathname === page.path ||
          (page.path !== ADMIN.ADMINLAYOUT && pathname.includes(page.path))
      ).title
    );
  }, [pathname]);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {title}
            </Typography>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <LogoutIcon />
            </Link>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">{mainListItems}</List>
        </Drawer>
        <Box
          id="outlet"
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Outlet />
          <Copyright />
        </Box>
      </Box>
      <Modal
        open={openAdminModal}
        onClose={handleAdminModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Alert
          sx={authModalStyle}
          severity="error"
          onClose={handleAdminModalClose}
        >
          접근 권한이 없습니다!
        </Alert>
      </Modal>
    </ThemeProvider>
  );
};

const authModalStyle = {
  // 모달 스타일
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default Layout;
