import { createTheme } from "@mui/material";

export const CustomTheme = createTheme({
  typography: {
    fontFamily: "GmarketSansMedium",
    // 다른 폰트 스타일 속성도 추가할 수 있습니다.
  },
  palette: {
    primary: {
      main: "#FBD385",
      contrastText: "#fff",
    },
    fbd385: {
      main: "#FBD385",
      contrastText: "#fff",
    },
    ffbd59: {
      main: "#ffbd59",
      contrastText: "#fff",
    },
    bfbfbf: {
      main: "#BFBFBF",
      contrastText: "#fff",
    },
    ff8282: {
      main: "#FF8282",
      contrastText: "#fff",
    },
    ffd99f: {
      main: "#FFD99F",
      contrastText: "#fff",
    },
    ffffee: {
      main: "#FFFFEE",
      contrastText: "#fff",
    },
    f5f5ed: {
      main: "#F5F5ED",
      contrastText: "#fff",
    },
    text: {
      main: "#FBD385",
    },
    textField: {
      main: "#ffd99f",
      hover: "#fbd385",
      active: "#fbd385",
    },
    action: {
      active: "#fbd385",
      disabled: "#bfbfbf", // disabled 상태일 때 적용할 색상
      // hover: "#fbd385",
      // hoverOpacity: 0.8,
      // selected: "blue",
      // selectedOpacity: 0.8,
      // disabled: "#fbd385",
      // disabledBackground: "#fbd385",
      // disabledOpacity: 0.3,
      // focus: "#fbd385",
      // focusOpacity: 0.8,
      // activatedOpacity: 0.8,
    },
    divider: "#fbd385",
    actionDisabled: "#fbd385",
  },
});
