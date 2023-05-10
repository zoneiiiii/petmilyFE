import * as React from "react";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import { useRef, useState } from "react";
import CustomButton from "../../Login/CustomButton";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import { Select, MenuItem } from "@mui/material";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { COMMUNITY } from "../../../constants/PageURL";
import sigungu from "../Missing/sigungu";
// import axios from "axios";

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 50,
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

const MissingWrite = () => {
  const subjectRef = useRef(null);
  const nameRef = useRef(null);
  const locationRef = useRef(null);
  const speciesRef = useRef(null);
  const [location, setLocation] = useState("---");
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [val3, setVal3] = useState("");
  // const { sido, sigugun, dong } = sigungu;
  const { sido = [], sigugun = [], dong = [] } = sigungu;
  const [species, setSpecies] = useState("---");
  const [age, setAge] = useState("---");
  const [gender, setGender] = useState("---");
  const [content, setContent] = useState("");
  const [formAble, setFormAble] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    if (
      subjectRef.current.value === undefined ||
      subjectRef.current.value === "" ||
      content === "" ||
      content === undefined ||
      nameRef.current.value === undefined ||
      nameRef.current.value === "" ||
      locationRef.current.value === undefined ||
      locationRef.current.value === "" ||
      speciesRef.current.value === undefined ||
      speciesRef.current.value === ""
    ) {
      setFormAble(false);
      setOpen(true);
    } else {
      setFormAble(true);
      setOpen(true);
      console.log(subjectRef.current.value);
      console.log(content);
      document.location.href = COMMUNITY.FIND;
    }
  };
  const handleReset = () => {
    subjectRef.current.value = "";
    setContent("");
    document.location.href = COMMUNITY.FIND;
  };

  // 파일첨부 파일명 출력(작동 안함)
  const [fileName, setFileName] = useState('');

  const handleChange = (e) => {
    setFileName(e.target.value);
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
    <>
      <Board>게시글 작성</Board>
      <Grid sx={{ minWidth: 700, mt: 5, mb: 10 }}>
        <div style={{ margin: 'auto', maxWidth: '800px' }}>
          <InputContainer>
            <p className="title">제목</p>
            <input type="text" ref={subjectRef} style={{ width: 700 }} />
          </InputContainer>

          <div style={{ display: "flex", justifyContent: 'space-between' }}>
            <InputContainer>
              <p className="title">상세 지역</p>
              <input type="text" ref={locationRef} style={{ width: 250 }} />
            </InputContainer>
            <InputContainer>
              <p className="title">추정 종</p>
              <input type="text" ref={speciesRef} style={{ width: 250 }} />
            </InputContainer>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <SelectContainer>
              <p className="title">목격 지역</p>

              <div style={{ margin: 'auto' }}>
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
                <select onChange={(e) => setVal3(e.target.value)}>
                  <option value="">선택</option>
                  {dong
                    .filter((el) => el.sido === val1 && el.sigugun === val2)
                    .map((el) => (
                      <option key={el.dong} value={el.dong}>
                        {el.codeNm}
                      </option>
                    ))}
                </select>
              </div>

              {/* <Select
                size="small"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <MenuItem value="---">---</MenuItem>
                <MenuItem value="서울">서울</MenuItem>
              </Select> */}
            </SelectContainer>
            <SelectContainer>
              <p className="title">분류</p>
              <Select
                size="small"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
              >
                <MenuItem value="---">---</MenuItem>
                <MenuItem value="강아지">강아지</MenuItem>
                <MenuItem value="고양이">고양이</MenuItem>
              </Select>
            </SelectContainer>
            <SelectContainer>
              <p className="title">나이</p>
              <Select
                size="small"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                MenuProps={MenuProps}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Placeholder</em>;
                  }

                  return selected;
                }}
              >
                <MenuItem value="---">---</MenuItem>
                {Array.from({ length: 30 }, (_, i) => (
                  <MenuItem key={i} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                ))}
              </Select>
            </SelectContainer>
            <SelectContainer>
              <p className="title">성별</p>
              <Select
                size="small"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value="---">---</MenuItem>
                <MenuItem value="수컷">수컷</MenuItem>
                <MenuItem value="암컷">암컷</MenuItem>
              </Select>
            </SelectContainer>
          </div>


          <div style={{ display: "flex", justifyContent: 'space-between' }}>
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

          </div>

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
          <ButtonBox>
            <CustomButton label="취소" value="작성취소" onClick={handleReset} />
            <CustomButton label="확인" value="글쓰기" onClick={handleOpen} />
          </ButtonBox>
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
      </Grid >
    </>
  );

};

const Board = styled.h1`
                text-align: center;
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
    width: 800px;
  }
`;

const ButtonBox = styled.div`
  margin-bottom: 100px;
`;

const FileContainer3 = styled.div``

export default MissingWrite;
