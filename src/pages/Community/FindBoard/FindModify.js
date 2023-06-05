import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
    ThemeProvider,
    TextField,
    Grid,
    Modal,
    Alert,
    FormHelperText,
    Button
} from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { MyCustomUploadAdapterPlugin } from "../../../components/common/UploadAdapter";
import { COMMUNITY } from "../../../constants/PageURL";
import Loading from "../../../components/Loading/LoadingPage";
import hangjungdong from "../Missing/hangjungdong";
import axios from "axios";

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 100,
        },
    },
};

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

const FindModify = () => {
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [species, setSpecies] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [location, setLocation] = useState("");

    /* 지역 SELECT START */
    const { sido, sigugun, dong } = hangjungdong;
    const [val1, setVal1] = useState("");
    const [val2, setVal2] = useState("");
    const [val3, setVal3] = useState("");

    useEffect(() => {
        const sidoObj = hangjungdong.sido.find(i => i.sido === val1);
        const sidoCodeNm = sidoObj ? sidoObj.codeNm : null; // sidoObj가 존재하면 codeNm을, 존재하지 않으면 null을 반환
        const sigugunObj = hangjungdong.sigugun.find(i => i.sigugun === val2 && i.sido === val1);
        const sigugunCodeNm = sigugunObj ? sigugunObj.codeNm : null; // sigugunObj 존재하면 codeNm을, 존재하지 않으면 null을 반환
        const dongObj = hangjungdong.dong.find(i => i.dong === val3 && i.sigugun === val2 && i.sido === val1);
        const dongCodeNm = dongObj ? dongObj.codeNm : null; // dongObj 존재하면 codeNm을, 존재하지 않으면 null을 반환
        setLocation(sidoCodeNm + " " + sigugunCodeNm + " " + dongCodeNm);
        console.log("시 선택:", location);  // 테스트용(삭제)

    }, [val1, val2, val3, location]);
    /* 지역 SELECT END */

    const handleCancel = () => {
        setTitle("");
        setContent("");
        document.location.href = `/board/find/${id}`;
    };

    // 유효성 검증 상태
    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);
    const [speciesError, setSpeciesError] = useState(false);
    const [locationError, setLocationError] = useState(false);
    const [ageError, setAgeError] = useState(false);
    const [genderError, setGenderError] = useState(false);
    const [Thumbnail, setThumbnail] = useState("");

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
        if (species === "") {
            setSpeciesError(true);
            isError = true;
        }
        if (location === "" || location.includes(null)) {
            setLocationError(true);
            isError = true;
        }
        if (age === "") {
            setAgeError(true);
            isError = true;
        }
        if (gender === "") {
            setGenderError(true);
            isError = true;
        }

        return isError;
    }

    const [openModal, setOpenModal] = useState(false); // 모달 상태
    const handleModalClose = () => {
        // 모달닫는 함수
        setOpenModal(false);
        navigate(COMMUNITY.FIND_DETAIL(id));
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
                    `http://localhost:8080/board/find/${id}`
                ); //게시글 Detail 데이터  호출
                const data = response.data;
                setPost(data);
                setTitle(data.boardSubject);
                setContent(data.boardContent);
                setSpecies(data.boardSpecies);
                setLocation(data.boardLocation);
                setAge(data.boardAge);
                setGender(data.boardGender);
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
        let imageUrl = Thumbnail;

        if (file) {
            const uploadedUrl = await uploadImage(file);
            if (uploadedUrl) {
                imageUrl = uploadedUrl;
            }
        }

        const postData = {
            boardSubject: title,
            boardContent: content,
            boardSpecies: species,
            boardLocation: location,
            boardAge: age,
            boardGender: gender,
            imgThumbnail: imageUrl,
            boardDate: isoCurrentDate,
        };

        try {
            await axios.put(`http://localhost:8080/board/find/${id}`, postData, {
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
                    <Board>게시글 작성</Board>
                    <Grid sx={{ minWidth: 700, mt: 5, mb: 10 }}>
                        <form onSubmit={handleSubmit}>
                            <div style={{ margin: 'auto', maxWidth: '700px' }}>
                                <FormRowWithError>
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
                                    <ErrorMsg>
                                        <FormHelperText sx={{ color: "red", fontSize: "15px" }}>
                                            {titleError ? "제목을 입력해 주세요." : null}
                                        </FormHelperText>
                                    </ErrorMsg>
                                </FormRowWithError>

                                <div style={{ display: "flex", justifyContent: 'space-between' }}>
                                    <FormRowWithError>
                                        <TextField
                                            label="세부 종"
                                            value={species}
                                            size="small"
                                            fullWidth
                                            onChange={(e) => {
                                                setSpeciesError(false);
                                                setSpecies(e.target.value);
                                            }}
                                        />
                                        <ErrorMsg>
                                            <FormHelperText sx={{ color: "red", fontSize: "15px" }}>
                                                {speciesError ? "세부 종을 입력해 주세요." : null}
                                            </FormHelperText>
                                        </ErrorMsg>
                                    </FormRowWithError>
                                </div>

                                <FormRow>
                                    <SelectContainer>
                                        <p className="title">목격 지역</p>
                                        <nav id="hot-articles-navigation" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
                                            {/* <h1>{`${val1}-${val2}-${val3}`}</h1> */}
                                            <select onChange={(e) => setVal1(e.target.value)}>
                                                <option value="">선택</option>
                                                {sido.map((el) => (
                                                    <option key={el.sido} value={el.sido}>
                                                        {el.codeNm}
                                                    </option>
                                                ))}
                                            </select>
                                            <select onChange={(e) => setVal2(e.target.value)}>
                                                <option value="">선택</option>
                                                {sigugun
                                                    .filter((el) => el.sido === val1)
                                                    .map((el) => (
                                                        <option key={el.sigugun} value={el.sigugun}>
                                                            {el.codeNm}
                                                        </option>
                                                    ))}
                                            </select>
                                            <select onChange={(e) => {
                                                setVal3(e.target.value);
                                                setLocationError(false);
                                            }} >
                                                <option value="">선택</option>
                                                {dong
                                                    .filter((el) => el.sido === val1 && el.sigugun === val2)
                                                    .map((el) => (
                                                        <option key={el.dong} value={el.dong}>
                                                            {el.codeNm}
                                                        </option>
                                                    ))}
                                            </select>
                                        </nav>
                                    </SelectContainer>
                                </FormRow>
                                <FormRow>
                                    <ErrorMsg>
                                        <FormHelperText sx={{ color: "red", fontSize: "15px" }}>
                                            {locationError ? "지역을 선택해 주세요." : null}
                                        </FormHelperText>
                                    </ErrorMsg>
                                </FormRow>

                                <FormRow2>
                                    <SelectContainer>
                                        <p className="title">나이</p>
                                        <Select
                                            label="나이"
                                            size="small"
                                            value={age}
                                            onChange={(e) => {
                                                setAgeError(false);
                                                setAge(e.target.value);
                                            }}
                                            MenuProps={MenuProps}
                                            renderValue={(selected) => {
                                                if (selected.length === 0) {
                                                    return <em>Placeholder</em>;
                                                }

                                                return selected;
                                            }}
                                        >
                                            {Array.from({ length: 30 }, (_, i) => (
                                                <MenuItem key={i} value={i + 1}>
                                                    {i + 1}살
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <CommonSpace />
                                        <p className="title">성별</p>
                                        <Select
                                            label="성별"
                                            size="small"
                                            value={gender}
                                            onChange={(e) => {
                                                setGenderError(false);
                                                setGender(e.target.value);
                                            }}
                                        >
                                            <MenuItem value="수컷">수컷</MenuItem>
                                            <MenuItem value="암컷">암컷</MenuItem>
                                        </Select>
                                    </SelectContainer>
                                </FormRow2>
                                <FormRow>
                                    <ErrorMsg>
                                        <FormHelperText sx={{ color: "red", fontSize: "15px" }}>
                                            {ageError ? "나이를 선택해 주세요." : null}
                                        </FormHelperText>
                                    </ErrorMsg>
                                    <ErrorMsg>
                                        <FormHelperText sx={{ color: "red", fontSize: "15px" }}>
                                            {genderError ? "성별을 선택해 주세요." : null}
                                        </FormHelperText>
                                    </ErrorMsg>
                                </FormRow>

                                <FormRow>
                                    <FileContainer>
                                        <p className="title">대표 이미지</p>
                                        <label htmlFor="file">
                                            <div className="btn-upload">파일 선택</div>
                                        </label>
                                        <input type="file" hidden onChange={handleFileChange} className="file" id="file" />
                                    </FileContainer>
                                </FormRow>
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

                                <br />
                                <br />
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
                                        onClick={handleCancel}
                                    >취소
                                    </ResetButton>

                                </ButtonsContainer>
                            </div>

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
                        </form>
                    </Grid >
                </MainContainer>
            </Section>
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

const Board = styled.h1`
      margin-top: 2vw;
      text-align: center;
    `;

const FormRow = styled.div`
      display: flex;
      justify-content: space-between;
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

const PreviewWrapper = styled.div`
      display: flex;
      align-items: center;
      margin-left: 16px;
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

const SelectContainer = styled.div`
                    display: flex;
                    gap: 1rem;
                    align-items: flex;
                    margin-bottom: 10px;
                    p {
                      font-weight: bold;
                      color: #474747;
                    }
                  `

const FileContainer = styled.div`
          display: flex;
          gap: 1rem;
          align-items: center;
          margin-bottom: 10px;
    
          .title {
            font - weight: bold;
          color: #474747;
          margin-right: 50px;
    }
    
          .btn-upload {
            width: 150px;
          height: 30px;
          background: #ffffff;
          border: 1px solid #000000;
          border-radius: 10px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          &:hover {
            background: #fbd385;
          border: 1px solid #fbd385;
          color: #fff;
        }
    }
          .file {
            display: none;
    }
          `;


const EditorWrapper = styled.div`
          .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
            min-height: 500px;
          width: 700px;
      }
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
              background-color: #AF935D;
            }
          }
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
              background-color: #858585;
            }
          }
        `;

const CommonSpace = styled.div`
      width: 230px;
      height: auto;
      display: inline-block;
    `;



export default FindModify;
