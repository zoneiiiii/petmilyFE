import {
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Modal,
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
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const MyPageAdoptList = () => {
  const [pets, setPets] = useState([]);
  const [isRerendered, setIsRerendered] = useState(false);
  useEffect(() => {
    if (!isRerendered)
      axios
        .get("/mypage/adoptList/getList")
        .then((response) => {
          if (response.data !== null) setPets(response.data);
        })
        .catch((error) => console.error("에러발생:", error))
        .finally(() => setIsRerendered(true));
  }, [isRerendered]);
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
      {pets.length > 0 ? (
        pets.map((pet, index) => {
          return (
            <PetData
              pet={pet}
              pets={pets}
              setPets={setPets}
              key={index}
              setIsRerendered={setIsRerendered}
            />
          );
        })
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            alignContent: "center",
            fontSize: "1.5rem",
            fontWeight: 600,
            height: "400px",
          }}
        >
          입양 내역이 존재하지 않습니다!
        </Box>
      )}
    </ThemeProvider>
  );
};

const PetData = (props) => {
  const { pet, pets, setPets, index, setIsRerendered } = props;
  const [petName, setPetName] = useState(pet.petName ? pet.petName : "");
  const [petImg, setPetImg] = useState(pet.petImg ? pet.petImg : "");
  const [petNameOpen, setPetNameOpen] = useState(false);
  const [petNameAnchorEl, setPetNameAnchorEl] = useState(null);
  const textFieldRef = useRef();
  const fileInputRef = useRef();

  useEffect(() => {
    if (pet) {
      console.log(pet);
      setPetName(pet.petName ? pet.petName : "");
      setPetImg(pet.petImg ? pet.petImg : "");
    }
  }, [pet]);

  const handleOpenNamePopover = (event) => {
    setPetNameAnchorEl(event.currentTarget.parentNode);
    setPetNameOpen(true);
  };

  const changeName = (event) => {
    setPetName(event.target.value);
  };

  const updateName = () => {
    if (petName.length > 0) {
      axios
        .post("/mypage/adoptList/update/name", {
          petNum: pet.petNum,
          petName: petName,
          petImg: pet.petImg,
        })
        .then((response) => {
          const newPets = [...pets];
          newPets[index] = response.data;
          setPets(newPets);
        })
        .catch((error) => console.error("에러발생:", error))
        .finally(() => {
          handleCloseNamePopover();
          setIsRerendered(false);
        });
    }
  };

  const resetPetName = (event) => {
    setPetName("");
    textFieldRef.current.focus();
  };
  const handleCloseNamePopover = () => {
    setPetNameAnchorEl(null);
    setPetNameOpen(false);
  };
  const handleImgUpload = (event) => {
    try {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      axios
        .post("/upload", formData)
        .then((response) => {
          setPetImg(response.data);
          axios
            .post("/mypage/adoptList/update/img", {
              petNum: pet.petNum,
              petName: pet.petName,
              petImg: response.data,
            })
            .then((response2) => {
              const newPets = [...pets];
              newPets[index] = response2.data;
              setPets(newPets);
            })
            .catch((error) => console.error("에러발생:", error));
        })
        .catch((error) => console.error("에러발생:", error))
        .finally(() => {
          setIsRerendered(false);
        });
    } catch (error) {
      console.error("에러발생:", error);
    }
  };

  const imgSize = "200px";
  const id = petNameOpen ? "simple-popover" : undefined;
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell width={imgSize}>
            <Button
              sx={{ m: 0, p: 0, borderRadius: 100 }}
              onClick={() => fileInputRef.current.click()}
            >
              <Avatar
                alt="petProfile"
                src={petImg}
                sx={{ width: imgSize, height: imgSize }}
              />
              <input
                type="file"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleImgUpload}
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
                      <Button onClick={handleOpenNamePopover}>
                        <EditIcon />
                      </Button>
                      <Popover
                        open={petNameOpen}
                        anchorEl={petNameAnchorEl}
                        onClose={handleCloseNamePopover}
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
                                    <CloseIcon color="primary" />
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
                            onClick={handleCloseNamePopover}
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
                    <TableCell sx={tdSx}>
                      {pet.sexCd === "M"
                        ? "수컷"
                        : pet.sexCd === "F"
                        ? "암컷"
                        : "미상"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={thSx}>품종</TableCell>
                    <TableCell sx={tdSx}>{pet.petSpecies}</TableCell>
                    <TableCell sx={thSx}>중성화여부</TableCell>
                    <TableCell sx={tdSx}>
                      {pet.neuterYn === "U" ? "미상" : pet.neuterYn}
                    </TableCell>
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
  fontSize: "0.8rem",
  textAlign: "center",
  fontWeight: 600,
  backgroundColor: "#fbd385",
  borderBottom: "2px solid #ffbd59",
  width: "100px",
};
const tdSx = {
  fontSize: "0.8rem",
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
