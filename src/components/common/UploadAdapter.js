import axios from "axios";

export class MyUploadAdapter {
  //이미지를 서버에 업로드하는 로직
  constructor(loader) {
    this.source = axios.CancelToken.source(); //axios의 요청 취소 함수
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const data = new FormData();
          data.append("file", file);
          axios
            .post("/upload", data)
            .then((response) => {
              if (response.data) {
                resolve({ default: response.data });
              } else {
                reject("업로드에 실패하였습니다.");
              }
            })
            .catch((error) => {
              reject("업로드에 실패하였습니다.");
              console.error(error);
            });
        })
    );
  }

  abort() {
    //업로드 취소 시 호출되는 메서드
    this.source.cancel();
  }
}

export function MyCustomUploadAdapterPlugin(editor) {
  //CKEditor어뎁터에 서버 업로드 함수 연결하는 역할
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}
