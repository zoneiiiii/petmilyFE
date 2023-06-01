import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import PetsIcon from "@mui/icons-material/Pets";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import { ADMIN } from "../../constants/PageURL";
import { Link } from "react-router-dom";

export const mainListItems = (
  <React.Fragment>
    {/* 대시보드 */}
    <Link to="/a" style={{ textDecoration: "none", color: "black" }}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="대시보드" />
      </ListItemButton>
    </Link>
    {/* 회원관리 */}
    <Link to={ADMIN.MEMBER} style={{ textDecoration: "none", color: "black" }}>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="회원관리" />
      </ListItemButton>
    </Link>
    {/* 입양관리 */}
    <Link to={ADMIN.ADOPT} style={{ textDecoration: "none", color: "black" }}>
      <ListItemButton>
        <ListItemIcon>
          <PetsIcon />
        </ListItemIcon>
        <ListItemText primary="입양관리" />
      </ListItemButton>
    </Link>
    {/* 게시글관리 */}
    <Link to={ADMIN.BOARD} style={{ textDecoration: "none", color: "black" }}>
      <ListItemButton>
        <ListItemIcon>
          <NoteAltIcon />
        </ListItemIcon>
        <ListItemText primary="게시글관리" />
      </ListItemButton>
    </Link>
    {/* 주문/배송관리 */}
    <Link to={ADMIN.ORDER} style={{ textDecoration: "none", color: "black" }}>
      <ListItemButton>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="주문/배송관리" />
      </ListItemButton>
    </Link>
    {/* 상품관리 */}
    <Link to={ADMIN.PRODUCT} style={{ textDecoration: "none", color: "black" }}>
      <ListItemButton>
        <ListItemIcon>
          <CardGiftcardIcon />
        </ListItemIcon>
        <ListItemText primary="상품관리" />
      </ListItemButton>
    </Link>
    {/* 1:1문의 */}
    <Link to={ADMIN.QNA} style={{ textDecoration: "none", color: "black" }}>
      <ListItemButton>
        <ListItemIcon>
          <HelpCenterIcon />
        </ListItemIcon>
        <ListItemText primary="1:1문의" />
      </ListItemButton>
    </Link>
    <Link
      to={ADMIN.DONATION}
      style={{ textDecoration: "none", color: "black" }}
    >
      <ListItemButton>
        <ListItemIcon>
          <VolunteerActivismOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="기부관리" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

//Report
// export const secondaryListItems = (
//   <React.Fragment>
//     <ListSubheader component="div" inset>
//       Saved reports
//     </ListSubheader>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItemButton>
//   </React.Fragment>
// );
