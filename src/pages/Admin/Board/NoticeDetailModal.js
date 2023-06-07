import {
  Avatar,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  ThemeProvider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";
import dayjs from "dayjs";
import DOMPurify from "dompurify";
import { useState } from "react";
import NoticeModifyModal from "./NoticeModifyModal";

const pageWidth = "60vw";
const maxPageWidth = "1150px";
const minPageWidth = "790px";

const NoticeDetailModal = (props) => {
  const { board, setReload, setOpenDetailModal } = props;
  const [modifyMode, setModifyMode] = useState(false);

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return modifyMode ? (
    <NoticeModifyModal
      board={board}
      setReload={setReload}
      setModifyMode={setModifyMode}
      setOpenDetailModal={setOpenDetailModal}
    />
  ) : (
    <ThemeProvider theme={CustomTheme}>
      <Box
        width={pageWidth}
        maxWidth={maxPageWidth}
        minWidth={minPageWidth}
        mt={4}
      >
        <Table width={pageWidth}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  borderBottom: "unset",
                  fontSize: "2rem",
                  fontWeight: 600,
                  lineHeight: "2.5rem",
                }}
              >
                {board.subject}
              </TableCell>
            </TableRow>
            <TableRow sx={{ display: "flex" }}>
              <TableCell
                sx={{
                  p: 0,
                  ml: 2,
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid #bfbfbf",
                }}
              >
                <Avatar alt="profile" src={board.memberImg} />
              </TableCell>
              <TableCell
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  fontSize: "1rem",
                }}
              >
                {board.memberNickname}
              </TableCell>
              <TableCell
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <VisibilityIcon
                  color="disabled"
                  sx={{
                    fontSize: "small",
                    alignSelf: "center",
                  }}
                />
                &nbsp;
                {board.count}
              </TableCell>
              <TableCell
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {dayjs(board.postDate).format("YY/MM/DD HH:mm:ss")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Box
                  sx={{
                    borderBottom: "unset",
                    fontSize: "1rem",
                    mb: "200px",
                  }}
                  dangerouslySetInnerHTML={createMarkup(board.content)}
                ></Box>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Button
                    variant="contained"
                    onClick={() => setModifyMode(true)}
                  >
                    수정
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Box>
    </ThemeProvider>
  );
};

export default NoticeDetailModal;
