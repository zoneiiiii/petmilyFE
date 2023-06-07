import { Box, FormControl, MenuItem, Select } from "@mui/material";
import SearchBar from "../../../components/common/SearchBar";
const searchModes = {
  subject_content: "subject_content",
  subject: "subject",
  content: "content",
};

const SearchBox = (props) => {
  const {
    setSearch,
    setPage,
    setSearch_mode,
    SearchbarWidth,
    search,
    search_mode,
    setReload,
  } = props;
  return (
    <Box display={"flex"} justifyContent={"flex-end"}>
      <FormControl size="small" sx={{ mr: 2 }}>
        <Select
          value={search_mode}
          onChange={(event) => setSearch_mode(event.target.value)}
        >
          <MenuItem value={searchModes.subject_content}>제목 + 내용</MenuItem>
          <MenuItem value={searchModes.subject}>제목</MenuItem>
          <MenuItem value={searchModes.content}>내용</MenuItem>
        </Select>
      </FormControl>
      <SearchBar
        setValue={setSearch}
        value={search}
        width={SearchbarWidth}
        onClick={() => {
          setPage(0);
          setReload(true);
        }}
      />
    </Box>
  );
};

export default SearchBox;
