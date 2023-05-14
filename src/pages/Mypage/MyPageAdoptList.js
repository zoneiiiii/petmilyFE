import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import { useRef, useState } from "react";

const MyPageAdoptList = () => {
  return (
    <ThemeProvider theme={CustomTheme}>
      <Typography
        className="myOrderListTitle"
        sx={titleSx}
        border={3}
        borderColor="#ffbd59"
        mb={4}
      >
        입양 내역
      </Typography>
      {pets.map((pet, index) => {
        return <PetData pet={pet} key={index} />;
      })}
    </ThemeProvider>
  );
};

const PetData = (props) => {
  const [pet, setPet] = useState(props.pet);
  const [petName, setPetName] = useState(pet.petName);
  const [petImg, setPetImg] = useState(pet.petImg);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const textFieldRef = useRef();
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget.parentNode);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  const changeName = (event) => {
    setPetName(event.target.value);
  };
  const resetPetName = (event) => {
    setPetName("");
    textFieldRef.current.focus();
  };
  const updateName = () => {
    if (petName.length > 0) setPet({ ...pet, petName: petName });
    //axios써서 데이터 db에 업데이트 필요
    handleClose();
  };
  const changeImg = () => {};

  const imgSize = "200px";
  const id = open ? "simple-popover" : undefined;
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell width={imgSize}>
            <Button sx={{ m: 0, p: 0, borderRadius: 100 }} onClick={changeImg}>
              <Avatar
                alt="petProfile"
                src={petImg}
                sx={{ width: imgSize, height: imgSize }}
              />
            </Button>
          </TableCell>
          <TableCell>
            <Box>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={PetNameSx} colSpan={4}>
                      {pet.petName}
                      <Button onClick={handleOpen}>
                        <EditIcon />
                      </Button>
                      <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        slotProps={{
                          backdrop: {
                            style: {
                              backdropFilter: "blur(4px)", // 배경 효과 설정
                              backgroundColor: "rgba(0, 0, 0, 0.3)", // 투명한 배경색 설정
                              border: "none", // 테두리 제거
                            },
                          },
                        }}
                      >
                        <Box m={1}>
                          <TextField
                            size="small"
                            label="이름"
                            value={petName}
                            inputRef={textFieldRef}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton onClick={resetPetName}>
                                    <CloseIcon color="fbd385" />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            onChange={changeName}
                          />
                          &nbsp;
                          <Button
                            variant="contained"
                            sx={{ height: "40px" }}
                            onClick={updateName}
                          >
                            수정
                          </Button>
                          &nbsp;
                          <Button
                            variant="contained"
                            sx={{ height: "40px" }}
                            onClick={handleClose}
                          >
                            취소
                          </Button>
                        </Box>
                      </Popover>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={thSx}>나이</TableCell>
                    <TableCell sx={tdSx}>{pet.petAge} 살</TableCell>
                    <TableCell sx={thSx}>성별</TableCell>
                    <TableCell sx={tdSx}>{pet.petSex}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={thSx}>분류</TableCell>
                    <TableCell sx={tdSx}>{pet.category}</TableCell>
                    <TableCell sx={thSx}>세부 종</TableCell>
                    <TableCell sx={tdSx}>{pet.petSpecies}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={thSx}>신청일자</TableCell>
                    <TableCell sx={tdSx}>{pet.applicationDate}</TableCell>
                    <TableCell sx={thSx}>승인일자</TableCell>
                    <TableCell sx={tdSx}>{pet.approvedDate}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={thSx}>관할 보호소</TableCell>
                    <TableCell sx={tdSx}>{pet.shelterName}</TableCell>
                    <TableCell sx={thSx}>보호소 연락처</TableCell>
                    <TableCell sx={tdSx}>{pet.shelterTel}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={thSx}>보호소 주소</TableCell>
                    <TableCell sx={tdSx} colSpan={3}>
                      {pet.shelterAddr}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

const titleSx = {
  width: "200px",
  textAlign: "center",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "1.5rem",
  lineHeight: "50px",
};

const PetNameSx = {
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "1.5rem",
  lineHeight: "50px",
  border: "none",
};
const thSx = {
  fontSize: "1rem",
  textAlign: "center",
  fontWeight: 600,
  backgroundColor: "#fbd385",
  borderBottom: "2px solid #ffbd59",
  width: "100px",
};
const tdSx = {
  fontSize: "1rem",
  fontWeight: 600,
  borderBottom: "2px solid #ffbd59",
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  // bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  // p: 4,
};

const pets = [
  {
    petNum: 1,
    petName: "20230404123456",
    petAge: 2,
    petImg: "/images/AdoptedDog.png",
    petSpecies: "리트리버",
    shelterName: "행복 보호소",
    shelterTel: "02-123-4567",
    shelterAddr: "서울특별시 강남구 선릉로 428",
    shelterDate: "2022-04-04",
    // db에 없는 부분
    petSex: "암컷",
    category: "강아지",
    applicationDate: "2023-04-29",
    approvedDate: "2023-05-01",
  },
  {
    petNum: 2,
    petName: "20230404123458",
    petAge: 3,
    petImg: "/images/AdoptedCat.png",
    petSpecies: "아메리칸 밥테일",
    shelterName: "멀캠 보호소",
    shelterTel: "02-765-4321",
    shelterAddr: "서울특별시 강남구 선릉로 428",
    shelterDate: "2023-04-04",
    // db에 없는 부분
    petSex: "수컷",
    category: "고양이",
    applicationDate: "2023-05-04",
    approvedDate: "2023-05-08",
  },
];

export default MyPageAdoptList;
