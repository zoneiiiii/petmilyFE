import {
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
} from "@mui/material";

const _category = {
  none: { value: "", path: "" },
  notice: { value: "공지사항", path: "/notice/list" },
  event: { value: "이벤트", path: "/event/list" },
  adoptReview: { value: "입양후기게시판", path: "/board/review" },
  missing: { value: "실종동물게시판", path: "/board/missing" },
  find: { value: "목격제보게시판", path: "/board/find" },
  free: { value: "자유게시판", path: "/board/free" },
  flea: { value: "매매장터", path: "/board/flea" },
  volunteer: { value: "봉사하기", path: "/board/volunteer" },
  volunteerReview: { value: "봉사후기", path: "/donate/volunteer/review" },
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const BoardCategorySelector = ({ category, setCategory, setBasepath }) => {
  const handleChangeCategory = (event) => {
    setCategory(
      Object.values(_category).find((item) => item.value === event.target.value)
    );
  };
  return (
    <FormControl size="small">
      <InputLabel id="category-label">카테고리</InputLabel>
      <Select
        value={category.value}
        onChange={handleChangeCategory}
        labelId="category-label"
        label="카테고리"
        MenuProps={MenuProps}
        sx={{ width: "160px" }}
      >
        <MenuItem value={""}>선택</MenuItem>
        <ListSubheader>------ 소개 ------</ListSubheader>
        <MenuItem value={_category.notice.value}>
          {_category.notice.value}
        </MenuItem>
        <MenuItem value={_category.event.value}>
          {_category.event.value}
        </MenuItem>
        <ListSubheader>------ 입양 ------</ListSubheader>
        <MenuItem value={_category.adoptReview.value}>
          {_category.adoptReview.value}
        </MenuItem>
        <ListSubheader>---- 커뮤니티 ----</ListSubheader>
        <MenuItem value={_category.missing.value}>
          {_category.missing.value}
        </MenuItem>
        <MenuItem value={_category.find.value}>{_category.find.value}</MenuItem>
        <MenuItem value={_category.free.value}>{_category.free.value}</MenuItem>
        <MenuItem value={_category.flea.value}>{_category.flea.value}</MenuItem>
        <ListSubheader>------ 후원 ------</ListSubheader>
        <MenuItem value={_category.volunteer.value}>
          {_category.volunteer.value}
        </MenuItem>
        <MenuItem value={_category.volunteerReview.value}>
          {_category.volunteerReview.value}
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default BoardCategorySelector;
