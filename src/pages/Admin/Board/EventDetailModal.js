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
import EventModifyModal from "./EventModifyModal";

const pageWidth = "60vw";
const maxPageWidth = "1150px";
const minPageWidth = "790px";

const EventDetailModal = (props) => {
  const { board, setReload, setOpenDetailModal } = props;
  const [modifyMode, setModifyMode] = useState(false);

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return modifyMode ? (
    <EventModifyModal
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
                  fontSize: "1rem",
                  flexGrow: 1,
                }}
              >
                <Avatar alt="profile" src={board.memberImg} />
                &nbsp;
                {board.memberNickname}
              </TableCell>
              <TableCell
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 600,
                }}
              >
                행사기간: {dayjs(board.startDate).format("YY/MM/DD")} ~{" "}
                {board.endDate ? dayjs(board.endDate).format("YY/MM/DD") : ""}
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
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  &lt;썸네일&gt;
                  <Box sx={{}}>
                    {board.imgThumbnail ? (
                      <img
                        alt="thumbnail"
                        width={"150px"}
                        src={board.imgThumbnail}
                      />
                    ) : (
                      "썸네일 없음"
                    )}
                  </Box>
                </Box>
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

export default EventDetailModal;
