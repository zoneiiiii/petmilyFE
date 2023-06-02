import { Box, FormControl, MenuItem, Select } from "@mui/material";
import SearchBar from "../../../components/common/SearchBar";

const SearchBox = () => {
  return (
    <Box display={"flex"} justifyContent={"flex-end"}>
      <FormControl size="small" sx={{ mr: 2 }}>
        <Select defaultValue={1}>
          <MenuItem value={1}>제목 + 내용</MenuItem>
          <MenuItem value={2}>제목</MenuItem>
          <MenuItem value={3}>내용</MenuItem>
        </Select>
      </FormControl>
      <SearchBar />
    </Box>
  );
};

export default SearchBox;
