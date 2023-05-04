import * as React from "react";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import { useRef, useState } from "react";
import CustomButton from "../../Login/CustomButton";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { left } from "@popperjs/core";
import { padding } from "@mui/system";

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
    const [formAble, setFormAble] = useState(false);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => {
        if (
            subjectRef.current.value === undefined ||
            subjectRef.current.value === "" ||
            contentRef.current.value === undefined ||
            contentRef.current.value === ""
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
        contentRef.current.value = "";
        document.location.href = "/board/free";
    };

    return (
        <>
            <Board>게시글 작성</Board>
            <Grid sx={{ minWidth: 700, mt: 5, }}>
                <div style={{ margin: 'auto 30vw', maxWidth: '800px' }}>
                    <InputContainer>
                        <p className="title">제목</p>
                        <input type="text" ref={subjectRef} style={{ width: 700 }} />
                    </InputContainer>
                    <FileContainer>
                        <p className="title">첨부파일</p>
                        <label for="file">
                            <div class="btn-upload">파일 선택</div>
                        </label>
                        <input type="file" multiple className="file" id="file" />
                    </FileContainer>
                    <InputContainer>
                        <p className="title">내용</p>
                        <textarea
                            rows={13}
                            style={{ width: 700 }}
                            placeholder="내용을 작성해주세요."
                            ref={contentRef}
                        />
                    </InputContainer>
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
        </>
    );
};
const Board = styled.h1`
    text-align: center;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 3rem;
  align-items: flex;
  margin-bottom: 10px;

  .title {
    min-Width: 70px;
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
    margin-right: 40px;
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

export default FreeWrite;
