import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  ThemeProvider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import { useEffect, useRef, useState } from "react";

const SearchBar = ({ setValue, value, onClick, sx, width }) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleClick = () => {
    if (onClick) onClick(value);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };
  const inputRef = useRef();
  const resetValue = (event) => {
    setValue("");
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <Box display={"flex"}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          value={value}
          inputRef={inputRef}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="fbd385" />
              </InputAdornment>
            ),
            endAdornment: value && (
              <InputAdornment position="end">
                <IconButton onClick={resetValue}>
                  <CloseIcon color="fbd385" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            mr: 2,
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
            width: width,
            ...sx,
          }}
        />
        <Button
          variant="contained"
          style={{ marginLeft: "10px" }}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
        >
          검색
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default SearchBar;
