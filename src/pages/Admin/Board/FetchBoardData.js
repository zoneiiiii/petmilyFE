import axios from "axios";

const setQuery = (props) => {
  const { path, page, rowsPerPage, search, search_mode } = props;
  console.log("query:", path);
  let queryText = path;
  if (page !== undefined) {
    queryText += "?page=" + page;
    if (rowsPerPage) queryText += "&limit=" + rowsPerPage;
    if (search)
      search_mode
        ? (queryText +=
            "&search=" +
            encodeURIComponent(search) +
            "&search_mode=" +
            search_mode)
        : (queryText += "&search=" + encodeURIComponent(search));
  }
  return queryText;
};

export const fetchData = (props) => {
  const { category } = props;

  switch (category) {
    case "공지사항":
      return axios
        .get(setQuery({ ...props, path: "/notice/list" }))
        .then((response) => {
          return customizeData({ category: category, data: response.data });
        });
    case "이벤트":
      return axios
        .get(setQuery({ ...props, path: "/event/list" }))
        .then((response) => {
          return customizeData({ category: category, data: response.data });
        });
    case "입양후기게시판":
      return axios
        .get(setQuery({ ...props, path: "/admin/board/adopt/review/list" }))
        .then((response) => {
          return customizeData({ category: category, data: response.data });
        });
    case "실종동물게시판":
      return axios.get("/board/missing");
    case "목격제보게시판":
      return axios
        .get(setQuery({ ...props, path: "/admin/board/find/list" }))
        .then((response) => {
          return customizeData({ category: category, data: response.data });
        });
    case "자유게시판":
      return axios.get("/board/free");
    case "매매장터":
      return axios.get("/board/flea");
    case "봉사하기":
      return axios.get("/board/volunteer");
    case "봉사후기":
      return axios.get("/donate/volunteer/review");
    default:
      return null;
  }
};

const customizeData = (props) => {
  return {
    category: props.category,
    board:
      props.data.length !== 0 && props.data.content.length !== 0
        ? props.data.content
        : [],
    page:
      props.data.length !== 0 && props.data.content.length !== 0
        ? parseInt(props.data.number)
        : 0,
    totalElements:
      props.data.length !== 0 && props.data.content.length !== 0
        ? parseInt(props.data.totalElements)
        : 0,
  };
};
