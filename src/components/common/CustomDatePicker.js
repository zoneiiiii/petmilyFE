import { ThemeProvider, createTheme } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const CustomDatePicker = ({
  label,
  defaultValue,
  value,
  onChange,
  width,
  maxDate,
  minDate,
  sx,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={DatePickerTheme}>
        <DatePicker
          label={label}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          format="YYYY-MM-DD"
          maxDate={maxDate}
          minDate={minDate}
          slotProps={{
            textField: {
              size: "small",
            },
          }}
          sx={{
            mr: 2,
            "& label": {
              // 라벨
              color: "#fbd385",
            },
            "&:hover label": {
              // 마우스 올린 상태의 라벨
              color: "#1976d2",
            },
            // "& label.Mui-focused": { // 클릭한 상태의 라벨
            //   color: "#fbd385",
            // },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                // 평상시의 테두리
                borderColor: "#fbd385",
              },
              "&:hover fieldset": {
                // 마우스 올린 상태의 테두리
                borderColor: "#1976d2",
              },
              // "&.Mui-focused fieldset": { // 클릭된 상태의 테두리
              //   borderColor: "#fbd385",
              // },
            },
            width: { width }, // 간편한 width 설정정
            ...sx, // sx에서 부여한 width의 우선순위가 가장 높음
          }}
        />
      </ThemeProvider>
    </LocalizationProvider>
  );
};

const DatePickerTheme = createTheme({
  palette: {
    // primary: {
    //   main: "#fbd385",
    // },
    secondary: {
      main: "#ff8282",
    },
    text: {
      hint: "#fbd385",
    },
    action: {
      active: "#fbd385",
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
