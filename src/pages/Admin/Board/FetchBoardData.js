import axios from "axios";
import { ABOUT, ADOPT, COMMUNITY, SUPPORT } from "../../../constants/PageURL";
import { Route } from "react-router-dom";
import NoticeDetail from "../../About/NoticeDetail";

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

// 데이터 불러오기
export const fetchData = (props) => {
  const { boardName, setData, setReload } = props;

  switch (boardName) {
    case "공지사항":
      return axios
        .get(setQuery({ ...props, path: "/admin/board/notice/list" }))
        .then((response) => {
          setData(customizeData({ boardName: boardName, data: response.data }));
        })
        .then(() => {
          setReload(false);
        })
        .catch((error) => console.error("에러발생:", error));
    case "이벤트":
      return axios
        .get(setQuery({ ...props, path: "/admin/board/event/list" }))
        .then((response) => {
          setData(customizeData({ boardName: boardName, data: response.data }));
        })
        .then(() => {
          setReload(false);
        })
        .catch((error) => console.error("에러발생:", error));
    case "입양후기게시판":
      return axios
        .get(setQuery({ ...props, path: "/admin/board/adoptReview/list" }))
        .then((response) => {
          setData(customizeData({ boardName: boardName, data: response.data }));
        })
        .then(() => {
          setReload(false);
        })
        .catch((error) => console.error("에러발생:", error));
    case "실종동물게시판":
      return axios
        .get(setQuery({ ...props, path: "/admin/board/missing/list" }))
        .then((response) => {
          setData(customizeData({ boardName: boardName, data: response.data }));
        })
        .then(() => {
          setReload(false);
        })
        .catch((error) => console.error("에러발생:", error));
    case "목격제보게시판":
      return axios
        .get(setQuery({ ...props, path: "/admin/board/find/list" }))
        .then((response) => {
          setData(customizeData({ boardName: boardName, data: response.data }));
        })
        .then(() => {
          setReload(false);
        })
        .catch((error) => console.error("에러발생:", error));
    case "자유게시판":
      return axios
        .get(setQuery({ ...props, path: "/admin/board/free/list" }))
        .then((response) => {
          setData(customizeData({ boardName: boardName, data: response.data }));
        })
        .then(() => {
          setReload(false);
        })
        .catch((error) => console.error("에러발생:", error));
    case "매매장터":
      return axios
        .get(setQuery({ ...props, path: "/admin/board/flea/list" }))
        .then((response) => {
          setData(customizeData({ boardName: boardName, data: response.data }));
        })
        .then(() => {
          setReload(false);
        })
        .catch((error) => console.error("에러발생:", error));
    case "봉사하기":
      return axios
        .get(setQuery({ ...props, path: "/admin/board/volunteer/list" }))
        .then((response) => {
          setData(customizeData({ boardName: boardName, data: response.data }));
        })
        .then(() => {
          setReload(false);
        })
        .catch((error) => console.error("에러발생:", error));
    case "봉사후기":
      return axios
        .get(setQuery({ ...props, path: "/admin/board/volunteerReview/list" }))
        .then((response) => {
          setData(customizeData({ boardName: boardName, data: response.data }));
        })
        .then(() => {
          setReload(false);
        })
        .catch((error) => console.error("에러발생:", error));
    default:
      return new Promise((resolve, reject) => {
        resolve();
      })
        .then(() => {
          setData(customizeData({ boardName: boardName, data: [] }));
        })
        .then(() => {
          setReload(false);
        });
  }
};

// 데이터 가공
const customizeData = (props) => {
  return {
    boardName: props.boardName,
    board:
      props.data.length !== 0 && props.data.content.length !== 0
        ? props.data.content
        : [],
    page:
      props.data.length !== 0 && props.data.content.length !== 0
        ? parseInt(props.data.number)
        : 0,
    rowsPerPage:
      props.data.length !== 0 && props.data.content.length !== 0
        ? parseInt(props.data.size)
        : 0,
    totalElements:
      props.data.length !== 0 && props.data.content.length !== 0
        ? parseInt(props.data.totalElements)
        : 0,
  };
};

// 글 작성 페이지로 이동
export const writePath = (boardName) => {
  switch (boardName) {
    case "공지사항":
      return ABOUT.NOTICE_WRITE;
    case "이벤트":
      return ABOUT.EVENT_WRITE;
    case "입양후기게시판":
      return ADOPT.REVIEW_WRITE;
    case "실종동물게시판":
      return COMMUNITY.MISSING_WRITE;
    case "목격제보게시판":
      return COMMUNITY.FIND_WRITE;
    case "자유게시판":
      return COMMUNITY.FREE_WRITE;
    case "매매장터":
      return COMMUNITY.FLEA_WRITE;
    case "봉사하기":
      return SUPPORT.VOLUNTEER_NOTICE_WRITE;
    case "봉사후기":
      return SUPPORT.VOLUNTEER_REVIEW_WRITE;
    default:
      return "#";
  }
};

export const detailPath = (boardName, boardNum) => {
  switch (boardName) {
    case "공지사항":
      return ABOUT.NOTICE_DETAIL(boardNum);
    case "이벤트":
      return ABOUT.EVENT_DETAIL(boardNum);
    case "입양후기게시판":
      return ADOPT.REVIEW_DETAIL(boardNum);
    case "실종동물게시판":
      return COMMUNITY.MISSING_DETAIL(boardNum);
    case "목격제보게시판":
      return COMMUNITY.FIND_DETAIL(boardNum);
    case "자유게시판":
      return COMMUNITY.FREE_DETAIL(boardNum);
    case "매매장터":
      return COMMUNITY.FLEA_DETAIL(boardNum);
    case "봉사하기":
      return SUPPORT.VOLUNTEER_NOTICE_DETAIL(boardNum);
    case "봉사후기":
      return SUPPORT.VOLUNTEER_REVIEW_DETAIL(boardNum);
    default:
      return "#";
  }
};

export const modifyPath = (boardName, boardNum) => {
  switch (boardName) {
    case "공지사항":
      return ABOUT.NOTICE_WRITE(boardNum);
    case "이벤트":
      return ABOUT.EVENT_DETAIL(boardNum);
    case "입양후기게시판":
      return ADOPT.REVIEW_DETAIL(boardNum);
    case "실종동물게시판":
      return COMMUNITY.MISSING_DETAIL(boardNum);
    case "목격제보게시판":
      return COMMUNITY.FIND_DETAIL(boardNum);
    case "자유게시판":
      return COMMUNITY.FREE_DETAIL(boardNum);
    case "매매장터":
      return COMMUNITY.FLEA_DETAIL(boardNum);
    case "봉사하기":
      return SUPPORT.VOLUNTEER_NOTICE_DETAIL(boardNum);
    case "봉사후기":
      return SUPPORT.VOLUNTEER_REVIEW_DETAIL(boardNum);
    default:
      return "#";
  }
};

export const deleteData = (props) => {
  const { boardName, boardNums } = props;
  console.log("deleteData:", boardName, boardNums);
  switch (boardName) {
    case "공지사항":
      return axios.delete("/admin/board/notice/delete", {
        data: { boardNums: boardNums },
      });
    case "이벤트":
      return axios.delete("/admin/board/event/delete", {
        data: { boardNums: boardNums },
      });
    case "입양후기게시판":
      return axios.delete("/admin/board/adoptReview/delete", {
        data: { boardNums: boardNums },
      });
    case "실종동물게시판":
      return axios.delete("/admin/board/missing/delete", {
        data: { boardNums: boardNums },
      });
    case "목격제보게시판":
      return axios.delete("/admin/board/find/delete", {
        data: { boardNums: boardNums },
      });
    case "자유게시판":
      return axios.delete("/admin/board/free/delete", {
        data: { boardNums: boardNums },
      });
    case "매매장터":
      return axios.delete("/admin/board/flea/delete", {
        data: { boardNums: boardNums },
      });
    case "봉사하기":
      return axios.delete("/admin/board/volunteer/delete", {
        data: { boardNums: boardNums },
      });
    case "봉사후기":
      return axios.delete("/admin/board/volunteerReview/delete", {
        data: { boardNums: boardNums },
      });
    default:
      return new Promise((resolve, reject) => {
        resolve();
      });
  }
};
