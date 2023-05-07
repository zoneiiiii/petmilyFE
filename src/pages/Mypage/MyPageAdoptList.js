import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { CustomTheme } from "../../assets/Theme/CustomTheme";

const MyPageAdoptList = () => {
  const imgSize = "200px";
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
        return (
          <Table key={index}>
            <TableHead></TableHead>
            <TableBody>
              <TableRow>
                <TableCell width={imgSize}>
                  <Avatar
                    alt="NoImg"
                    src={pet.petImg}
                    sx={{ width: imgSize, height: imgSize }}
                  />
                </TableCell>
                <TableCell>
                  <Box ml={4}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={PetNameSx}>{pet.petName}</TableCell>
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
      })}
    </ThemeProvider>
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
  fontWeight: 600,
  backgroundColor: "#fbd385",
  borderBottom: "2px solid #ffbd59",
  width: "min-content",
};
const tdSx = {
  fontSize: "1rem",
  fontWeight: 600,
  borderBottom: "2px solid #ffbd59",
};

const pets = [
  {
    petNum: 1,
    petName: "뽀삐",
    petAge: 2,
    petImg: "/images/AdoptedDog.png",
    petSpecies: "리트리버",
    shelterName: "행복 보호소",
    shelterTel: "02-123-4567",
    shelterAddr: "서울특별시 강남구 선릉로 428",
    shelterDate: "2022-04-04",
  },
  {
    petNum: 2,
    petName: "냥아치",
    petAge: 3,
    petImg: "/images/AdoptedCat.png",
    petSpecies: "아메리칸 밥테일",
    shelterName: "멀캠 보호소",
    shelterTel: "02-765-4321",
    shelterAddr: "서울특별시 강남구 선릉로 428",
    shelterDate: "2023-04-04",
  },
];

export default MyPageAdoptList;
