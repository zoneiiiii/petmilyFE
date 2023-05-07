import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { CustomTheme } from "../../assets/Theme/CustomTheme";

const SearchBar = () => {
  return (
    <ThemeProvider theme={CustomTheme}>
      <Box>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="fbd385" />
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
          }}
        />
        <Button
          variant="contained"
          theme={CustomTheme}
          color="fbd385"
          style={{ marginLeft: "10px" }}
        >
          검색
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default SearchBar;