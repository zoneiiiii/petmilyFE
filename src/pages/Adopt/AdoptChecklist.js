import "./Checklist.css";
function AdoptChecklist() {
  const iconStyle = {
    display: "flex",
    textAlign: "center",
    alignItems: "center",
  };
  const imgStyle = { width: "40px", height: "40px", marginRight: "10px" };
  const checkBoxStyle = { width: "25px", height: "25px", marginRight: "10px" };
  const checkListContents = [
    { contents: "급여중인 사료" },
    { contents: "좋아하는 음식과 싫어하는 음식" },
    { contents: "다른 개들과 잘 어울리는 편인지 (개의 경우)" },
    { contents: "배변은 어디서, 어떻게 봤는지, 배변 횟수" },
    { contents: "알레르기 여부" },
    { contents: "특이 병력" },
    { contents: "예방접종 여부" },
    { contents: "마이크로칩 등록 여부" },
    { contents: "(부모견을 알 수 있는 경우) 성격 및 병력" },
    {
      contents: "보호소 안 주변에서 병에 강아지 유무",
    },
    { contents: "그외 특이사항" },
  ];
  const checkListContents2 = [
    { contents: "배변패드" },
    { contents: "배변용 모래" },
    { contents: "침대 쿠션" },
    { contents: "밥그릇과 물그릇" },
    { contents: "먹던 사료(사료가 바뀌면 설사를 할 수 있어요!)" },
    { contents: "간식" },
    { contents: "아이가 이곳에 오기 전 쓰던 물품" },
    { contents: "장난감" },
    { contents: "리드줄 / 가슴줄" },
    {
      contents: "목욕용품과 빗",
    },
    { contents: "이동가방 (켄넬 등)" },
  ];

  return (
    <div
      style={{
        textAlign: "center",

        display: "flex",
        flexDirection: "column",
        width: "70%",
        margin: "0 auto",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            alt="check_mark"
            style={{ width: "50px", height: "50px", marginRight: "10px" }}
            src="./../images/check-mark.png"
          />
          <h1>입양 체크리스트</h1>
        </div>
        <p>반려 동물과 끝까지 함께하는 것은 그 만큼 큰 책임이 따릅니다</p>
        <p>
          아이들이 같은 아픔을 겪지 않게 필수 지식 및 체크리스트를 확인해 주세요
        </p>
      </div>
      <div
        style={{
          textAlign: "left",
        }}
      >
        <h2
          style={{
            borderStyle: "solid",
            borderWidth: "1px 0px 1px 0px",
            height: "50px",
            display: "flex",
            alignItems: "center",
          }}
        >
          필수 지식
        </h2>
        <h2>1. 거주 환경</h2>
        <h3
          style={{
            backgroundColor: "#F5F5ED",
            height: "50px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "5px",
          }}
        >
          혼자 살 경우
        </h3>
        <p>
          1. 당신이 실질적으로 반려 동물과 함께 할 수 있는 시간은 어느정도
          되나요?(나의 스케줄 고려)
        </p>
        <p>
          2. 반려동물은 정기적인 산책과 놀이가 꼭 필요합니다! 당신은 산책 또는
          놀이를 함께 할 수 있나요?
        </p>
        <p>3. 당신은 강아지, 고양이의 알레르기 반응은 없으신가요?</p>
        <h3
          style={{
            backgroundColor: "#F5F5ED",
            height: "50px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "5px",
          }}
        >
          가족 혹은 동거인과 살 경우
        </h3>
        <p>
          1. (결혼 준비중인 경우) 당신의 배우자가 강아지, 고양이 털에 민감하거나
          알러지 반응은 없으신가요?
        </p>
        <p>2. 당신 외에 강아지를 돌볼 가족이나 동거인이 있나요?</p>
        <h2>2. 경제적 여유</h2>
        <p>
          1. 한달 또는 1년 간 내 반려동물에게 드는 비용이 어느정도인지, 자신의
          수입과 비교하여 생가해 보셨나요?
        </p>
        <p>2. 내 반려동물의 건강을 위한 지출에 대비가 가능하신가요?</p>
        <p>3. 내 반려동물의 마지막 순간까지 지켜봐 주실 수 있나요?</p>
        <h2>3. 견종 선택</h2>
        <h3> 입양 전</h3>
        <p id="content">
          ∙ 자신에게 맞는 반려동물의 종을 찾은 후 해당 종에 대해 미리 공부하기
        </p>
        <p id="content">
          ∙ 반려인의 생활 패턴과 성격, 환경 등에 잘 맞는 반려동물 알아보기
        </p>
        <h2>4. 구체적 준비</h2>
        <h3> 준비사항</h3>
        <p>
          배변패드, 배변용 모래, 침대쿠션, 밥그릇, 물그릇, 이전에 먹던 사료,
          약간의 간식, 이전에 쓰던 물품, 장난감, 리드줄, 목욕용품, 빗, 이동가방
        </p>

        <p>첫 대면시</p>
        <h3>∙ 강아지</h3>
        <p id="content">∙ 반려견의 이름을 부르며 몸을 낮춘다</p>
        <p id="content">∙ 조심스럽게 손을 내밀어 냄새를 맡게 한다.</p>
        <p id="content">∙ 반려견의 턱 아래를 부드럽게 만져준다.</p>
        <h3>∙ 고양이</h3>
        <p id="content"> ∙ 반려묘가 먼저 다가오기 기다린다.</p>
        <p id="content">
          ∙ 자세를 낮추고 접근하고 첫 만남에는 눈을 똑바로 마주치지 않는다.
        </p>
        <p id="content">
          ∙ 손 냄새를 맡게 하고, 코를 살짝 만져 코 인사를 한다.
        </p>

        <h3>반려동물 등록</h3>
        <p id="content">
          ∙ 시장·군수·구청장이 대행업체로 지정한 동물병원을 방문해 신청서 작성
          후 수수료를 납부한다.
        </p>
        <p id="content">
          ∙ 해당 동물의 소유권을 취득한 날 또는 소유 동물이 등록대상동물이 된
          날로부터 30일 이내 동물등록 신청서를 시장·군수·구청장에게 제출한다.
        </p>
        <h2
          style={{
            borderStyle: "solid",
            borderWidth: "1px 0px 1px 0px",
            height: "50px",
            display: "flex",
            alignItems: "center",
          }}
        >
          심화 지식
        </h2>
        <h3>사료 선택</h3>
        <p>
          내 반려동물의 열령, 발육, 영양상태, 건강 및 식습관 등을 충분히
          고려해서, 아이에 맞는 사료를 선택해야 합니다.
        </p>
        <p>
          사료를 구입하기 전, 인터넷 또는 가까운 펫샵에서 여러 종류의 샘플
          사료를 구입하고 여러 차레 나누어 먹어보는게 좋습니다.
        </p>
        <br />
        <p>
          그리하여, 가장 기호도가 높고 배변에도 문제 없는 사료를 최종 선택하시면
          됩니다.
        </p>

        <p>
          사료 등급은 미국 동물 사료검사 협회 ‘AAFOO’에서 정한 등급을 많이
          따르는 추세입니다.
        </p>
        <br />
        <p>좋은 순서대로 나열하면 아래와 같습니다.</p>

        <p style={{ fontWeight: "bold" }}>
          [ 유기농 {">"} 사료 {">"} 홀리 스틱 {">"} 슈퍼 프리미엄 {">"} 프리미엄{" "}
          {">"} 마트 제품 ]
        </p>
        <br />
        <h3>반려동물이 피해야 하는 음식 리스트</h3>
        <h4>강아지</h4>
        <p id="content">
          ∙ 초콜릿, 시트러스계 오일 추출물, 아보카도, 포도, 견과류 및
          마카다미아, 버섯, 양파, 파 마늘
        </p>
        <h4>고양이</h4>
        <p id="content"> ∙ 초콜릿, 날생선, 유제품, 카페인, 견과류</p>
        <br />
        <h3>반려동물 목욕 시 주의 사항 </h3>
        <h4>목욕물의 온도</h4>
        <p id="content">
          ∙ 팔뚝으로 물 온도를 미지근하게 맞춰 조절해주는 것이 좋습니다.
        </p>

        <h4>샤워기의 수압</h4>
        <p id="content">
          ∙ 샤워기의 소리와 센 수압은 반려동물을 겁먹게 할 수 있으므로 보호자의
          손등으로 한번 막아 간접적으로 닿도록 하는 것이 좋습니다.
        </p>

        <h4>반려동물용 샴푸 또는 비누 사용</h4>

        <h4>잦은 목욕 금지</h4>
        <p id="content">
          ∙ 너무 잦은 목욕을 시키면 반려동물의 피부 유막을 없애기 때문에 오히려
          피부 자극을 유발합니다.
        </p>
        <p id="content">
          ∙ 건강한 반려견의 경우 3주 ~ 한달에 한번 목욕을 시키는 것이 좋습니다.
        </p>
        <p id="content">
          ∙ 고양이는 스스로 그루밍을 하여 오염물질을 제거하기 때문에 굳이 목욕을
          시키지 않아도 된다고 권고하는 경우도 있습니다.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "50%" }}>
            <div style={iconStyle}>
              <img
                alt="list-status"
                style={imgStyle}
                src="./../images/list-status.png"
              />
              <h3>내 반려동물 정보 질문 체크리스트</h3>
            </div>
            <div id="checklist">
              {checkListContents.map((array) => (
                <div style={iconStyle}>
                  <img
                    alt="Checkbox"
                    style={checkBoxStyle}
                    src="./../images/Checkbox.png"
                  />
                  <p>{array.contents}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ width: "50%" }}>
            <div style={iconStyle}>
              <img
                alt="account-edit"
                style={imgStyle}
                src="./../images/account-edit.png"
              />

              <h3>반려동물이 집에 오기 전 준비사항</h3>
            </div>
            <div id="checklist">
              {checkListContents2.map((array) => (
                <div style={iconStyle}>
                  <img
                    alt="Checkbox"
                    style={checkBoxStyle}
                    src="./../images/Checkbox.png"
                  />
                  <p>{array.contents}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdoptChecklist;
