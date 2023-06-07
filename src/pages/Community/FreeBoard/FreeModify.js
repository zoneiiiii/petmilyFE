import React, { useEffect, useState } from "react";
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
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { MyCustomUploadAdapterPlugin } from "../../../components/common/UploadAdapter";
import Loading from "../../../components/Loading/LoadingPage";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";
import axios from "axios";
import { COMMUNITY } from "../../../constants/PageURL";

const FreeModify = () => {
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [formAble, setFormAble] = useState(false);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => {
        if (
            title === undefined ||
            title === "" ||
            content === "" ||
            content === undefined
        ) {
            setFormAble(false);
            setOpen(true);
        } else {
            setFormAble(true);
            setOpen(true);
            console.log(title);
            console.log(content);
            document.location.href = "/board/free";
        }
    };
    const handleCancel = () => {
        setTitle("");
        setContent("");
        document.location.href = `/board/free/${id}`;
    };

    // 유효성 검증 상태
    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);

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

        return isError;
    }

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
    const [openModal, setOpenModal] = useState(false); // 모달 상태
    const handleModalClose = () => {
        // 모달닫는 함수
        setOpenModal(false);
        navigate(COMMUNITY.FREE_DETAIL(id));
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
                    `http://localhost:8080/board/free/${id}`
                ); //게시글 Detail 데이터  호출
                const data = response.data;
                setPost(data);
                setTitle(data.freeSubject);
                setContent(data.freeContent);
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
            freeSubject: title,
            freeContent: content,
            imgThumbnail: imageUrl,
            freeDate: isoCurrentDate,
        };

        try {
            await axios.put(`http://localhost:8080/board/free/${id}`, postData, {
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
        <Section className="result">
            <MainContainer className="result-container">
                <ThemeProvider theme={CustomTheme}>
                    <Board>게시글 작성</Board>
                    <Grid sx={{ minWidth: 700, mt: 5, }}>
                        <form onSubmit={handleSubmit}>
                            <div style={{ margin: '50px auto', maxWidth: '720px' }}>
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
                    </Grid>
                </ThemeProvider>
            </MainContainer></Section>
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
    text-align: center;
    margin-top: 50px;
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

const FileContainer = styled.div`
        display: flex;
        gap: 1rem;
        align-items: center;
        margin-bottom: 10px;

        .title {
            font-weight: bold;
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

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;
  align-items: center;
`;

const PreviewWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
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

export default FreeModify;
