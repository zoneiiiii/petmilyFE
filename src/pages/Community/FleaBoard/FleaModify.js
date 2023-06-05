import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
    ThemeProvider,
    TextField,
    Typography,
    ToggleButtonGroup,
    ToggleButton,
    FormControl,
    FormHelperText,
    Button,
    Modal,
    Alert,
    Select, MenuItem
} from "@mui/material";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";
import { makeStyles } from '@material-ui/core/styles';
import { COMMUNITY } from "../../../constants/PageURL";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { MyCustomUploadAdapterPlugin } from "../../../components/common/UploadAdapter";
import Loading from "../../../components/Loading/LoadingPage";
import axios from "axios";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 150,
        },
    },
};

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 300,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const categories = [
    '전자제품',
    '가구/인테리어',
    '의류/잡화',
    '스포츠/레저',
    '게임/취미',
    '반려동물용품',
    '자동차용품',
    '기타',
];

const FleaWrite = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const [title, setTitle] = useState(""); // 상품명
    const [cost, setCost] = useState(""); // 상품 가격
    const [content, setContent] = useState(""); // 상품 설명
    const [selectedCategory, setSelectedCategory] = useState('');  // 상품 카테고리
    const [selectedStatus, setSelectedStatus] = useState(""); // 거래 완료 여부
    const [img, setImg] = useState("")  // 이미지 첨부
    const [Thumbnail, setThumbnail] = useState("");

    const handleReset = () => {
        setTitle("");
        setContent("");
        setCost("");
        document.location.href = COMMUNITY.FLEA_DETAIL(id);
    };

    // 유효성 검증 상태
    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);
    const [costError, setCostError] = useState(false);
    const [selectedCategoryError, setSelectedCategoryError] = useState(false);
    const [selectedStatusError, setSelectedStatusError] = useState(false);
    const [imgError, setImgError] = useState(false);

    const validate = () => {
        let isError = false;
        if (title === "") {
            setTitleError(true);
            isError = true;
        }
        if (content === "") {
            setContentError(true);
            isError = true;
        }
        if (cost === "") {
            setCostError(true);
            isError = true;
        }
        if (selectedCategory === "") {
            setSelectedCategoryError(true);
            isError = true;
        }
        if (selectedStatus === "") {
            setSelectedStatusError(true);
            isError = true;
        }
        // if (img === "") {
        //   setImgError(true);
        //   isError = true;
        // }

        return isError;
    }

    const [openModal, setOpenModal] = useState(false); // 모달 상태
    const handleModalClose = () => {
        // 모달닫는 함수
        setOpenModal(false);
        navigate(COMMUNITY.FLEA_DETAIL(id));
    };

    // 사진 미리보기
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewUrl(event.target.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("/upload", formData);
            const imageUrl = response.data;
            // setUploadedImageUrl(imageUrl);
            return imageUrl;
        } catch (error) {
            console.error("이미지 업로드 실패 : ", error);
            return null;
        }
    };

    //게시글 Detail 호출
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/board/flea/${id}`
                ); //게시글 Detail 데이터  호출
                const data = response.data;
                setPost(data);
                setTitle(data.boardSubject);
                setContent(data.boardContent);
                setCost(data.boardCost);
                setSelectedCategory(data.boardCategory);
                setSelectedStatus(data.boardStatus ? "판매중" : "판매완료");
                setThumbnail(data.imgThumbnail);
            } catch (error) {
                console.error("Error fetching data : ", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isError = validate();
        if (isError) return;
        const currentDate = new Date();
        const isoCurrentDate = new Date(
            currentDate.getTime() + 9 * 60 * 60 * 1000
        ).toISOString();
        let imageUrl = "https://via.placeholder.com/150";

        if (file) {
            const uploadedUrl = await uploadImage(file);
            if (uploadedUrl) {
                imageUrl = uploadedUrl;
            }
        }

        const postData = {
            boardSubject: title,
            boardContent: content,
            boardCost: cost,
            boardCategory: selectedCategory,
            boardStatus: selectedStatus === "판매중" ? 1 : 0,
            imgThumbnail: imageUrl,
            boardDate: isoCurrentDate,
        };

        try {
            await axios.put(`http://localhost:8080/board/flea/${id}`, postData, {
                withCredentials: true,
            });
            setOpenModal(true);
            setTimeout(() => {
                handleModalClose();
            }, 1000);
        } catch (error) {
            console.error("데이터 전송 실패 : ", error);
        }
    };

    if (isLoading) {
        return <Loading />; // 로딩 중일 때 표시할 컴포넌트
    }

    return (
        <ThemeProvider theme={CustomTheme}>
            <Section className="result">
                <MainContainer className="result-container">
                    <TitleContainer>
                        <Title> 상품 등록 </Title>
                        <Typography variant="subtitle3">중고 장터 게시판</Typography>
                    </TitleContainer>
                    <Container>
                        <FormWrapper>
                            <form onSubmit={handleSubmit}>
                                <FormRowWithError>
                                    <FormRow>
                                        <TextField
                                            label="제목"
                                            value={title}
                                            size="small"
                                            fullWidth
                                            onChange={(e) => {
                                                setTitleError(false);
                                                setTitle(e.target.value);
                                            }}
                                        />
                                    </FormRow>
                                    <ErrorMsg>
                                        <FormHelperText sx={{ color: "red", fontSize: "15px" }}>
                                            {titleError ? "제목을 입력해 주세요." : null}
                                        </FormHelperText>
                                    </ErrorMsg>
                                </FormRowWithError>

                                <FormRowWithError>
                                    <FormRow2>
                                        <TextField
                                            label="가격"
                                            value={cost}
                                            size="small"
                                            sx={{ marginRight: '50px', width: '300px' }}
                                            inputProps={{ maxLength: 8, inputMode: 'numeric', pattern: '[0-9]' }}
                                            type="text"
                                            onChange={(e) => {
                                                setCostError(false);
                                                setCost(e.target.value);
                                            }}
                                        />
                                    </FormRow2>
                                    <ErrorMsg>
                                        <FormHelperText sx={{ color: "red", fontSize: "15px" }}>
                                            {costError ? "가격을 입력해 주세요." : null}
                                        </FormHelperText>
                                    </ErrorMsg>
                                </FormRowWithError>

                                <FormRow3>
                                    <ImageWrapper>
                                        <span>대표 이미지</span>
                                        <CommonSpace />
                                        <CommonButton component="label">
                                            사진 업로드
                                            <input type="file" hidden onChange={handleFileChange} className="file" id="file" />
                                        </CommonButton>
                                    </ImageWrapper>

                                    <CategoryWrapper id="category-select-label">카테고리
                                        <Select
                                            labelId="category-select-label"
                                            id="category-select"
                                            value={selectedCategory}
                                            onChange={(e) => {
                                                setSelectedCategoryError(false);
                                                setSelectedCategory(e.target.value);
                                            }}
                                            sx={{ margin: '10px 0 10px 10px', height: '40px' }}
                                            MenuProps={MenuProps}
                                        >
                                            {categories.map((category) => (
                                                <MenuItem key={category} value={category}>
                                                    {category}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </CategoryWrapper>

                                    <StatusWrapper>
                                        판매상태
                                        <CommonSpace />
                                        <FormControl>
                                            <ToggleButtonGroup
                                                size="small"
                                                value={selectedStatus}
                                                exclusive
                                                onChange={(e, value) => {
                                                    setSelectedStatusError(false);
                                                    setSelectedStatus(value);
                                                }}
                                            >
                                                <ToggleButton
                                                    value="판매중"
                                                    sx={{
                                                        width: "80px",
                                                        "&.Mui-selected": {
                                                            backgroundColor: "#fbd385",
                                                            color: "#fff",
                                                        },
                                                        "&.Mui-selected:hover": {
                                                            backgroundColor: "#ffbe3f",
                                                            color: "#fff",
                                                        },
                                                    }}
                                                >
                                                    판매중
                                                </ToggleButton>
                                                <ToggleButton
                                                    value="판매완료"
                                                    sx={{
                                                        width: "80px",
                                                        "&.Mui-selected": {
                                                            backgroundColor: "#bfbfbf",
                                                            color: "#fff",
                                                        },
                                                        "&.Mui-selected:hover": {
                                                            backgroundColor: "#b2b0b0",
                                                            color: "#fff",
                                                        },
                                                    }}
                                                >
                                                    판매완료
                                                </ToggleButton>
                                            </ToggleButtonGroup>
                                        </FormControl>
                                    </StatusWrapper>
                                </FormRow3>
                                <FormRow2>
                                    <ErrorMsg>
                                        <FormHelperText sx={{ color: "red", fontSize: "15px" }}>
                                            {imgError ? "대표 이미지를 첨부해주세요" : null}
                                        </FormHelperText>
                                    </ErrorMsg>
                                    <ErrorMsg>
                                        <FormHelperText sx={{ color: "red", fontSize: "15px" }}>
                                            {selectedCategoryError ? "카테고리를 선택해 주세요." : null}
                                        </FormHelperText>
                                    </ErrorMsg>
                                    <ErrorMsg>
                                        <FormHelperText sx={{ color: "red", fontSize: "15px" }}>
                                            {selectedStatusError ? "판매 여부를 선택해주세요." : null}
                                        </FormHelperText>
                                    </ErrorMsg>
                                </FormRow2>

                                <FormRow>
                                    {previewUrl && (
                                        <PreviewWrapper>
                                            <img
                                                src={previewUrl}
                                                alt="미리보기"
                                                style={{ width: "150px" }}
                                            />
                                        </PreviewWrapper>
                                    )}
                                </FormRow>

                                <FormRowWithError>
                                    <EditorWrapper>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={content}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setContent(data);
                                                setContentError(false);
                                            }}
                                            config={{
                                                className: "WriteEditor",
                                                placeholder: "내용을 입력하세요.",
                                                extraPlugins: [MyCustomUploadAdapterPlugin],
                                            }}
                                        />
                                    </EditorWrapper>
                                    <ErrorMsg>
                                        <FormHelperText sx={{ color: "red", fontSize: "15px" }}>
                                            {contentError ? "내용을 입력해 주세요." : null}
                                        </FormHelperText>
                                    </ErrorMsg>
                                </FormRowWithError>

                                <ButtonsContainer>
                                    <WriteButton
                                        type="submit"
                                        onClick={handleSubmit}
                                        variant="contained"
                                    >글쓰기
                                    </WriteButton>
                                    <ButtonsSpace />

                                    <ResetButton
                                        variant="contained"
                                        onClick={handleReset}
                                    >취소
                                    </ResetButton>

                                </ButtonsContainer>
                            </form>
                            <Modal
                                open={openModal}
                                onClose={handleModalClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Alert sx={modalStyle} severity="success">
                                    작성 완료!
                                </Alert>
                            </Modal>

                        </FormWrapper>
                    </Container>
                </MainContainer>
            </Section >
        </ThemeProvider>
    );
};

const Section = styled.section`
  background: #f8f9fa;
  padding: 30px 0 40px 0;
`

const MainContainer = styled.div`
  width: 60vw;
  // width: 1150px;
  max-width: 1150px;
  min-width: 790px;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(233, 236, 239);
  border-image: initial;
  margin: 0px auto 20px;
  background: rgb(255, 255, 255);
`

const TitleContainer = styled.div`
  margin-top: 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
`;

const Container = styled.div`
  margin-top: 3vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormRow = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 16px;
  align-items: center;
`;

const FormRow2 = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;
`;

const FormRow3 = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;
  align-items: center;
`;

const ButtonGroup = styled.div`
  font-size: 0.8rem;
  color: gray;
  margin-left: auto;
  margin-right: 5px;
  margin-top: 10px;
  margin-bottom: 100px;
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 40px;
  
`

const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
`;

const PreviewWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
`;

const CommonButton = styled(Button)`
  && {
    color: #fff;
    background-color: #fbd385;
    width: auto;
    &:hover {
      background-color: #facc73;
    }
  }
`;

const EditorWrapper = styled.div`
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 500px;
    width: 700px;
  }
`;

const FormRowWithError = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 16px;
    align-items: center;
`;

const ErrorMsg = styled.div`
  width: 100%;
  margin-left: 10px;
`;

const ButtonsContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  min-width: 700px;
  display: flex;
  justify-content: flex-end;
`;

const WriteButton = styled(Button)`
  && {
    color: #fff;
    background-color: #fbd385;
    width: auto;
    height: 30px;
    margin-top: 10px;
    margin-left: auto;
    &:hover {
      background-color: #ffbe3f;
    }
  }
`;

const CommonSpace = styled.div`
  width: 10px;
  height: auto;
  display: inline-block;
`;

const ButtonsSpace = styled.div`
  width: 5px;
  height: auto;
  display: inline-block;
`;

const ResetButton = styled(Button)`
&& {
    color: #fff;
    background-color: #bfbfbf;
    width: auto;
    height: 30px;
    margin-top: 10px;
    &:hover {
      background-color: #b2b0b0;
    }
  }
`;


export default FleaWrite;
