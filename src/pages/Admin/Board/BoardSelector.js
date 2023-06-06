import {
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
} from "@mui/material";

// const _category = {
//   none: { value: "", path: "" },
//   notice: { value: "공지사항", path: "/notice/list" },
//   eventBoard: { value: "이벤트", path: "/event/list" },
//   adoptReview: { value: "입양후기게시판", path: "/board/review" },
//   missing: { value: "실종동물게시판", path: "/board/missing" },
//   find: { value: "목격제보게시판", path: "/board/find" },
//   free: { value: "자유게시판", path: "/board/free" },
//   flea: { value: "매매장터", path: "/board/flea" },
//   volunteer: { value: "봉사하기", path: "/board/volunteer" },
//   volunteerReview: { value: "봉사후기", path: "/donate/volunteer/review" },
// };

const boardNames = {
  none: "",
  notice: "공지사항",
  eventBoard: "이벤트",
  adoptReview: "입양후기게시판",
  missing: "실종동물게시판",
  find: "목격제보게시판",
  free: "자유게시판",
  flea: "매매장터",
  volunteer: "봉사하기",
  volunteerReview: "봉사후기",
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

const BoardSelector = ({ boardName, setBoardName, initOption, setReload }) => {
  const handleChangeBoardName = (event) => {
    setBoardName(
      Object.values(boardNames).find((item) => item === event.target.value)
    );
    initOption();
  };
  return (
    <FormControl size="small">
      <InputLabel id="boardName-label">게시판명</InputLabel>
      <Select
        defaultValue={boardNames.none}
        value={boardName}
        onChange={handleChangeBoardName}
        labelId="boardName-label"
        label="게시판명"
        MenuProps={MenuProps}
        sx={{ width: "160px" }}
      >
        <MenuItem value={boardNames.none}>선택</MenuItem>
        <ListSubheader>------ 소개 ------</ListSubheader>
        <MenuItem value={boardNames.notice}>{boardNames.notice}</MenuItem>
        <MenuItem value={boardNames.eventBoard}>
          {boardNames.eventBoard}
        </MenuItem>
        <ListSubheader>------ 입양 ------</ListSubheader>
        <MenuItem value={boardNames.adoptReview}>
          {boardNames.adoptReview}
        </MenuItem>
        <ListSubheader>---- 커뮤니티 ----</ListSubheader>
        <MenuItem value={boardNames.missing}>{boardNames.missing}</MenuItem>
        <MenuItem value={boardNames.find}>{boardNames.find}</MenuItem>
        <MenuItem value={boardNames.free}>{boardNames.free}</MenuItem>
        <MenuItem value={boardNames.flea}>{boardNames.flea}</MenuItem>
        <ListSubheader>------ 후원 ------</ListSubheader>
        <MenuItem value={boardNames.volunteer}>{boardNames.volunteer}</MenuItem>
        <MenuItem value={boardNames.volunteerReview}>
          {boardNames.volunteerReview}
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default BoardSelector;
