import styled from "styled-components";

const WriteStyle = {
  Section: styled.section`
    background: #f8f9fa;
    padding: 30px 0 40px 0;
  `,

  MainContainer: styled.div`
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
  `,
  Board: styled.h1`
    margin-top: 2vw;
    text-align: center;
  `,

  TitleContainer: styled.div`
    margin-top: 2vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  Title: styled.h1`
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2rem;
  `,

  Container: styled.div`
    margin-top: 3vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  FormWrapper: styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  FormRow: styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 16px;
    align-items: center;
  `,
  FormRowAddr: styled.div`
    display: flex;
    width: 100%;
    align-items: center;
  `,

  FormRowWithError: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 16px;
    align-items: center;
  `,

  FormRow2: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 16px;
  `,

  ErrorMsg: styled.div`
    width: 100%;
    margin-left: 10px;
  `,

  ButtonGroup: styled.div`
    font-size: 0.8rem;
    color: gray;
    margin-left: auto;
    margin-right: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
  `,

  ImageWrapper: styled.div`
    display: flex;
    align-items: center;
  `,

  StatusWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-grow: 1;
  `,

  PreviewWrapper: styled.div`
    display: flex;
    align-items: center;
    margin-left: 16px;
  `,

  ButtonSpace: styled.div`
    width: 4px;
    height: auto;
    display: inline-block;
  `,

  CommonSpace: styled.div`
    width: 10px;
    height: auto;
    display: inline-block;
  `,

  EditorWrapper: styled.div`
    .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
      min-height: 500px;
      width: 700px;
    }

    .ck.ck-editor__editable:not(.ck-editor__nested-editable):focus {
      border-color: #fbd385;
    }
  `,

  modalStyle: {
    // 모달 스타일
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  },
};

export default WriteStyle;
