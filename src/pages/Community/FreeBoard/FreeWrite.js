import * as React from "react";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import { useRef, useState } from "react";
import CustomButton from "../../Login/CustomButton";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import axios from "axios";

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

const FreeWrite = () => {
    const subjectRef = useRef(null);
    const contentRef = useRef(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [formAble, setFormAble] = useState(false);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => {
        if (
            subjectRef.current.value === undefined ||
            subjectRef.current.value === "" ||
            content === "" ||
            content === undefined
        ) {
            setFormAble(false);
            setOpen(true);
        } else {
            setFormAble(true);
            setOpen(true);
            console.log(subjectRef.current.value);
            console.log(contentRef.current.value);
            document.location.href = "/board/free";
        }
    };
    const handleReset = () => {
        subjectRef.current.value = "";
        setContent("");
        document.location.href = "/board/free";
    };

    // 사진 업로드 미리보기
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

    // 업로드 미리보기 구현
    // const [imageSrc, setImageSrc] = useState(null);

    // const onUpload = (e) => {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);

    //     return new Promise((resolve) => {
    //         reader.onload = () => {
    //             setImageSrc(reader.result || null); // 파일의 컨텐츠
    //             resolve();
    //         };
    //     });
    // }

    const [imageSrcs, setImageSrcs] = useState([]);

    const onUpload = (e) => {
        const files = e.target.files;
        const readers = [];

        for (let i = 0; i < files.length; i++) {
            readers.push(new FileReader());
            readers[i].readAsDataURL(files[i]);
        }

        return new Promise((resolve) => {
            const results = [];
            let count = 0;

            readers.forEach((reader, i) => {
                reader.onload = () => {
                    results[i] = reader.result || null;
                    count++;
                    if (count === files.length) {
                        setImageSrcs(results); // 파일의 컨텐츠
                        resolve();
                    }
                };
            });
        });
    }


    return (
        <Section className="result">
            <MainContainer className="result-container">
                <Board>게시글 작성</Board>
                <Grid sx={{ minWidth: 700, mt: 5, }}>
                    <div style={{ margin: '50px auto', maxWidth: '700px' }}>
                        <InputContainer>
                            <p className="title">제목</p>
                            <input type="text" ref={subjectRef} style={{ width: 700 }} />
                        </InputContainer>
                        <FileContainer>
                            <p className="title">첨부파일</p>
                            <label htmlFor="file">
                                <div className="btn-upload">파일 선택</div>
                            </label>
                            <input type="file" multiple className="file" id="file" />
                        </FileContainer>
                        {/* <FileContainer2>
                            <p className="title">첨부파일</p>
                            <input className="upload-box" value={fileName} placeholder="첨부파일" readOnly />
                            <label htmlFor="file">파일찾기</label>
                            <input className="origin-box" type="file" id="file" onChange={handleChange} />
                        </FileContainer2>

                        <FileContainer3>
                            <input accept="image/*" multiple type="file" onChange={e => onUpload(e)} />
                            <img alt="" width={'40%'} src={imageSrcs} />
                        </FileContainer3> */}

                        {/* <InputContainer>
                        <p className="title">내용</p>
                        <textarea
                            rows={13}
                            style={{ width: 700 }}
                            placeholder="내용을 작성해주세요."
                            ref={contentRef}
                        />
                    </InputContainer> */}
                        <FormRow>
                            <EditorWrapper>
                                <CKEditor
                                    editor={ClassicEditor}
                                    ref={contentRef}
                                    data={content}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setContent(data);
                                    }}
                                    config={{
                                        toolbar: [
                                            "heading",
                                            "|",
                                            "bold",
                                            "italic",
                                            "link",
                                            "bulletedList",
                                            "numberedList",
                                            "|",
                                            "indent",
                                            "outdent",
                                            "|",
                                            "blockQuote",
                                            "insertTable",
                                            "mediaEmbed",
                                            "undo",
                                            "redo",
                                        ],
                                        className: "WriteEditor",
                                        placeholder: "내용을 입력하세요.",
                                    }}
                                />
                            </EditorWrapper>
                        </FormRow>
                        <br />
                        <CustomButton
                            label="취소"
                            value="작성취소"
                            onClick={handleReset}
                        ></CustomButton>
                        <CustomButton label="확인" value="글쓰기" onClick={handleOpen} />
                    </div>

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        {formAble ? (
                            <Alert sx={modalStyle} severity="success">
                                작성 완료!
                            </Alert>
                        ) : (
                            <Alert sx={modalStyle} severity="warning">
                                제목과 내용을 모두 입력해주세요.
                            </Alert>
                        )}
                    </Modal>
                </Grid>
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

const InputContainer = styled.div`
                display: flex;
                gap: 2rem;
                align-items: center;
                margin-bottom: 15px;
                height: 60px;
              
                .title {
                    min-Width: 70px;
                }
                input {
                  height: 30px;
                }
              
                input:hover {
                    outline: none !important;
                border: 2px solid #fbd385;
                }
                input:focus {
                    outline: none !important;
                border: 2px solid #fbd385;
                }
                textarea:hover {
                    outline: none !important;
                border: 2px solid #fbd385;
                }
                textarea:focus {
                    outline: none !important;
                border: 2px solid #fbd385;
                }
                  p {
                      font-weight: bold;
                  color: #474747;
                }
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

const FileContainer2 = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 10px;

    .title {
        font-weight: bold;
        color: #474747;
        margin-right: 50px;
    }

    // 인풋 스타일 변경
    .upload-box {
        display: inline-block;
        height: 40px;
        padding: 0 10px;
        vertical-align: middle;
        border: 1px solid #dddddd;
        width: 55%;
        color: #999999;
    }

    // label 스타일 변경
    label {
        display: flex;
        padding: 12px 20px 12px 20px;
        align-items: center;
        justify-content: center;
        color: #fff;
        background-color: #999999;
        cursor: pointer;
        margin-left: 10px;
    }

    // 기존 요소 숨김 처리
    .origin-box {
        position: absolute;
        width: 0;
        height: 0;
        padding: 0;
        overflow: hidden;
        border: 0;
    }
`

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;
  align-items: center;
`;

const EditorWrapper = styled.div`
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 500px;
    width: 700px;
  }
`;

const FileContainer3 = styled.div``



export default FreeWrite;
