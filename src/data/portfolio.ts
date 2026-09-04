export interface TroubleShooting {
  title: string;
  problem: string;
  solution: string;
  codeSnippet?: {
    language: string;
    filename: string;
    before?: string;   // 수정 전 코드 (있으면 before/after 2단으로 표시)
    code: string;       // 수정 후 (또는 단일 스니펫)
  };
  imageUrl?: string;
  images?: { src: string; caption?: string; gain?: number }[];   // 증명 이미지·영상 (갤러리) — gain: 영상 음량 배수(기본 3)
  beforeImageUrl?: string;
  afterImageUrl?: string;
  articleUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  type: string;
  period: string;
  tech: string[];
  role?: string;
  description: string;
  impactLine?: string;    // 프로젝트 카드에 노출되는 핵심 임팩트 한 줄
  detailedDescription?: string;
  image?: string;
  video?: string;         // 게임 플레이 영상 (mp4)
  github?: string;
  downloadUrl?: string;   // 플레이 빌드 다운로드 링크 (스탠드얼론 등)
  teamSize?: string;
  award?: string;
  wip?: boolean;          // 개발 중인 프로젝트 (카드/모달에 '개발중' 뱃지 노출)
  challenge?: string[];
  solution?: string[];
  keyResult?: string[];
  troubleshooting?: TroubleShooting[];
}

export const portfolioData = {
  hero: {
    headline: "플레이어가 느끼는\n그 찰나의 순간을,\n코드로 정밀하게 설계합니다",
    subTitle: "조작감, 프레임, 사운드 — 플레이어가 '어색하다'고 느끼는 지점을 코드 레벨에서 추적해 해결합니다.\n\n'작동하는 코드'를 넘어 '몰입되는 플레이 경험'까지 책임지는 게임 클라이언트 개발자 진준영입니다.",
    cta: {
      primary: "대표 프로젝트 보기",
      secondary: "GitHub",
      githubUrl: "https://github.com/kkaemong",
      velogUrl: "https://velog.io/@junemay31/posts"
    }
  },
  about: {
    title: "플레이어에게 보이는 부분을\n인게임 로직부터 연출까지\n직접 짭니다",
    description: "게임을 만들 때 '작동하는가'에서 멈추지 않고, 플레이어가 실제로 느끼는 감각까지 신경 씁니다.\n\n인게임 로직·애니메이션·연출을 직접 구현하며 시스템 전체를 이해하려 하고, 반복되는 부분은 공통 규칙으로 묶어 기획이 바뀌어도 무너지지 않게 만듭니다.\n\n조작감·프레임·사운드가 서로 어긋나는 순간을 그냥 넘기지 않고 코드에서 원인을 찾습니다.",
    personalInfo: [
      { label: "이름", value: "진준영" },
      { label: "생년월일", value: "1999.05.31" },
      { label: "주소지", value: "경기도 남양주시" },
      { label: "연락처", value: "010-7544-7257" },
      { label: "이메일", value: "junemay31@naver.com" },
      { label: "학력", value: "협성대학교 (경영학과)" }
    ],
    points: [
      {
        title: "인게임 로직을 직접 짭니다",
        content: "플레이어·오브젝트·게임 매니저까지, 이미 만들어진 걸 붙이기만 하지 않고 인게임에서 보이는 로직을 직접 구현하며 시스템이 어떻게 도는지 끝까지 파악합니다."
      },
      {
        title: "바뀔 걸 전제로 설계합니다",
        content: "비슷한 오브젝트가 반복되면 공통 인터페이스와 상태머신으로 규격화해, 기획 변경이나 새 요소 추가가 기존 코드를 흔들지 않게 만듭니다."
      },
      {
        title: "감각까지 신경 씁니다",
        content: "조작감·애니메이션 타이밍·사운드가 서로 어긋나지 않도록 하나의 흐름으로 묶어 다룹니다. '이 정도면 됐다'로 넘기지 않고 어색함의 원인을 코드에서 찾습니다."
      }
    ]
  },
  skills: {
    main: [
      {
        name: "C#",
        tag: "주력",
        icon: "csharp",
        description: "Unity 핵심 스크립팅 언어. FSM 상태 관리, 인터페이스 기반 오브젝트 상호작용 설계, 애니메이터 상태 제어를 직접 구현합니다."
      },
      {
        name: "Unity",
        tag: "주력",
        icon: "unity",
        description: "2D/3D 인게임 인터랙션 설계, 애니메이터 상태 제어, 점프·스크롤 등 물리 로직 구현을 직접 담당합니다."
      }
    ],
    sub: [
      {
        name: "Python",
        tag: "보조",
        icon: "python",
        description: "알고리즘 문제 해결과 게임 툴 자동화 스크립트, AI 모델 연동 파이프라인에 적극 활용합니다."
      },
      {
        name: "TypeScript",
        tag: "보조",
        icon: "typescript",
        description: "React 기반 실시간 멀티플레이 웹 게임의 연출 페이즈와 transform 기반 UI 애니메이션을 구현합니다."
      },
      {
        name: "Django",
        tag: "보조",
        icon: "django",
        description: "클라이언트와의 RESTful API 통신 및 JWT 기반 인증 흐름을 직접 설계하고 구축했습니다."
      }
    ],
    exp: [
      {
        name: "PyTorch & LoRA",
        tag: "경험",
        icon: "pytorch",
        description: "단일 24GB GPU 제약에서 LoRA 기법으로 7B 거대 모델을 OOM 없이 파인튜닝하여 정확도 0.75→0.81 달성."
      },
      {
        name: "보안 & 모의해킹",
        tag: "경험",
        icon: "linux",
        description: "OWASP Top 10 기반 K-Shield Jr 수료. 인증 우회, SQL 인젝션 등 4대 취약점 실증 및 보안 리포트 작성."
      }
    ]
  },
  projects: [
    {
      id: "portfolio-game",
      title: "인터랙티브 포트폴리오 게임",
      type: "Unity WebGL 포트폴리오",
      period: "2026.08 ~ (개발중)",
      teamSize: "1인 (개인 프로젝트)",
      tech: ["Unity WebGL", "C#", "Next.js", "React"],
      role: "기획 · Unity 클라이언트 · 웹 연동 전체",
      wip: true,
      description: "Unity 기반 3D 마을 인터랙티브 포트폴리오 게임",
      impactLine: "Unity WebGL 빌드를 Next.js 포트폴리오에 임베드하고, postMessage로 게임 속 부스 도달과 웹 프로젝트 모달을 연동한 인터랙티브 포트폴리오 (개발 중)",
      detailedDescription: "이 포트폴리오 사이트의 '게임으로 보기' 모드입니다. Unity로 만든 3D 마을을 WebGL로 빌드해 사이트에 임베드하고, 캐릭터가 부스에 도달하면 해당 프로젝트 상세가 열리는 인터랙티브 포트폴리오입니다. 맵 디자인·상호작용 다듬기·모바일 대응이 남아 정식 공개 전 개발 중이며, 지금은 시작 화면 미리보기만 공개하고 있습니다.",
      image: "/portfolio-game.png"
    },
    {
      id: "gifted",
      title: "GIFTED",
      type: "Unity 3D 캐주얼 게임",
      period: "2026.04.05 ~ 2026.05.21",
      teamSize: "6인",
      tech: ["Unity", "C#", "FSM", "Interface", "ScriptableObject", "Git"],
      role: "인게임 상호작용 오브젝트 개발 (상자·포장·어항·썰매·디스펜서)",
      description: "Unity 기반 포장 액션 캐주얼 게임",
      impactLine: "임포트 에셋을 규칙과 에디터 툴로 규격화하고, '받을 수 있는 아이템'을 인터페이스 계약으로 통일해 상자·어항·썰매를 한 패턴으로 다룬 포장 액션 게임",
      detailedDescription: "산타와 엘프가 협력해 정해진 시간 안에 선물 주문을 처리하는 Windows 스탠드얼론 포장 액션 캐주얼 게임입니다. 상자에 선물을 담고 규격에 맞는 포장지와 리본으로 포장한 뒤 썰매에 적재해 배송하며, 일반·할로윈·케이크 등 테마별 상자와 어항 같은 특수 용기, 훼방 놓는 쥐 등 다양한 오브젝트가 등장합니다.",
      image: "/Gifted.png",
      downloadUrl: "https://drive.google.com/file/d/1HJR-3l0KuqCQ_fLprLA6EK1T_0ZcS3cR/view",
      keyResult: [
        "썰매 이중 적재·리본 작업대 크기 왜곡·이름 기반 판별 같은 Unity 함정을 플레이테스트에서 하나씩 잡아 수정 — 프레임 타이밍(Destroy), 부모-자식 스케일 상속, 데이터 vs 문자열",
        "상자를 '열림→선물→포장→리본→완성' 상태머신으로 만들고, InsertGift 한 메서드가 아이템 타입 × 현재 상태를 함께 봐 맞는 조합에서만 전이하도록 설계",
        "6인 팀에서 백엔드와 충돌하지 않게 BoxManager의 GetAllBoxData() 함수 하나만 경계로 노출하고, 임포트 에셋은 부모화 규칙 + UV 생성 에디터 툴로 규격화"
      ],
      troubleshooting: [
        {
          title: "썰매 이중 적재 — Destroy를 기다리지 말고 상태로 즉시 락",
          problem: "상자를 썰매에 넣는 순간 빠르게 한 번 더 입력하면 같은 상자가 두 번 적재됐습니다 (점수 2배, 적재 리스트 중복). LoadBox가 '결과 생성 → 제출 → 리스트 추가 → Destroy' 순으로 도는데, Unity의 Destroy는 프레임 끝에 처리되니 그 사이 두 번째 입력이 CanReceiveItem을 그대로 통과했습니다.",
          solution: "LoadBox 진입 첫 줄에서 상자 상태를 즉시 Submitted로 바꾸고 SetActive(false)로 비활성화 — 파괴를 기다리지 않고 상태로 락을 겁니다. CanReceiveItem에도 'Submitted면 거부' 가드를 추가해, 어느 경로로 들어와도 이중 적재가 막히게 했습니다.",
          codeSnippet: {
            filename: "SleighController.cs",
            language: "csharp",
            before: "private void LoadBox(BoxStateController box)\n{\n    var result = new WrappingResult { ... };\n    GameManager.Instance.SubmitResult(result);\n    loadedBoxDataList.Add(box.Data);\n\n    Destroy(box.gameObject);   // 프레임 끝에 파괴 — 그 전에 재입력이 통과함\n}",
            code: "private void LoadBox(BoxStateController box)\n{\n    // 중복 적재 방지: 파괴를 기다리지 않고 상태로 즉시 락\n    box.Data.state = BoxState.Submitted;\n    box.gameObject.SetActive(false);\n\n    var result = new WrappingResult { ... };\n    GameManager.Instance.SubmitResult(result);\n    loadedBoxDataList.Add(box.Data);\n    Destroy(box.gameObject);\n}\n\n// CanReceiveItem 에도 가드\nif (box.Data.state == BoxState.Submitted) return false;"
          }
        },
        {
          title: "리본 작업대에 올리면 상자 크기가 변하는 버그 — 부모 스케일 상속 차단",
          problem: "상자를 리본 작업대에 올리면 크기가 갑자기 커지거나 작아졌습니다. 상자를 작업대 부모의 자식으로 붙였는데(SetParent), 그 부모에 스케일이 걸려 있어 상자가 왜곡을 상속받았습니다. 게다가 '상자가 작업대를 떠났는지'를 부모 비교로 체크해서, 부모가 바뀌는 경우 판정이 깨졌습니다.",
          solution: "상자를 자식으로 넣지 않고 SetParent(null)로 월드 루트에 둔 채 위치만 추적하게 바꿔 부모 스케일 영향을 끊었습니다. 이탈 판정도 '부모가 뭔지(구조)'가 아니라 상자 자신의 IsAtRibbonStation 상태 변수로 바꿔, 부모가 어떻게 되든 안 깨지게 했습니다.",
          codeSnippet: {
            filename: "RibbonStation.cs",
            language: "csharp",
            before: "// 작업대 부모의 자식으로 → 부모 스케일 왜곡을 상속받음\nbox.transform.SetParent(transform.parent, true);\n\n// ...\n\n// 부모 비교로 이탈 체크 — 부모가 바뀌면 깨짐\nif (currentBox.transform.parent != transform.parent)\n    currentBox = null;",
            code: "// 월드 루트로 — 부모 스케일 영향 차단, 위치만 추적\nbox.transform.SetParent(null, true);\n\n// ...\n\n// 상자 자체의 상태 변수로 이탈 체크 — 부모와 무관하게 안정\nif (!currentBox.IsAtRibbonStation)\n    currentBox = null;"
          }
        },
        {
          title: "물고기 종류를 오브젝트 이름이 아니라 데이터로 판별",
          problem: "어항에 물고기를 넣을 때 item.name.Contains(\"2\")로 종류를 판별했습니다. 프리팹 이름이 바뀌거나 Instantiate 시 '(Clone)'이 붙으면 오작동했고, 상자와 어항이 서로 다른 방식으로 종류를 들고 있어 주문 매칭 단계에서 어긋났습니다.",
          solution: "이름 기반 판별을 전부 제거하고 아이템의 고유 designIndex(데이터)만 쓰도록 통일했습니다. 넣은 물고기 종류에 맞춰 어항 자체의 데이터도 갱신하고, 상자도 InsertGift 시점에 선물의 designIndex를 상자 데이터로 복사하게 해서, 이후 주문 매칭이 한 값만 보면 되도록 했습니다.",
          codeSnippet: {
            filename: "FishBowlController.cs",
            language: "csharp",
            before: "int fishIndex = 0;\nif (item.name.Contains(\"2\")) fishIndex = 1;              // 이름 문자열로 판별\nif (identifier.designIndex > 0) fishIndex = identifier.designIndex;",
            code: "// 이름 기반 제거 — 아이템의 고유 인덱스(데이터)만 사용\nint fishIndex = identifier.designIndex;\n\nhasFish = true;\nactiveFishIndex = fishIndex;\nbowlIdentifier.designIndex = fishIndex;   // 어항 데이터도 함께 갱신"
          }
        },
        {
          title: "상자 상태머신 — 포장 단계에서 모델 스케일이 튀는 버그 + 다중 타입 단일 진입",
          problem: "상자를 열림→선물→포장→리본→완성으로 만드는데, 각 단계에서 받을 수 있는 아이템(선물만/포장지만/리본만)이 다르고, 포장 단계로 넘어가며 모델을 새로 만들 때 스케일이 강제로 1이 돼서 상자 크기가 튀었습니다. 또 프리팹이 재활성화되면 ApplyTemplate이 다시 돌아 모델이 중복 생성됐습니다.",
          solution: "InsertGift 한 메서드가 아이템 타입과 현재 BoxState를 함께 봐 맞는 조합에서만 SetState로 전이하도록 했습니다(포장지는 상자 그룹까지 일치해야 함). 모델 인스턴스의 스케일은 강제로 1로 두지 않고 프리팹 원본 스케일을 쓰게 고쳤고, 이미 생성된 모델이 있으면(openedBox != null) ApplyTemplate을 다시 돌리지 않게 가드를 넣었습니다.",
          images: [
            { src: "/Gifted/normalbox.png", caption: "기본맵 박스" },
            { src: "/Gifted/halloweenbox.png", caption: "할로윈 박스" },
            { src: "/Gifted/cakebox.png", caption: "케이크 박스" },
            { src: "/Gifted/icebowl.png", caption: "얼음맵 어항" }
          ],
          codeSnippet: {
            filename: "BoxStateController.cs",
            language: "csharp",
            before: "// 모델 인스턴스 스케일을 강제로 1 — 프리팹 원본 크기 무시\ninstance.transform.localScale = Vector3.one;\n\n// 재활성화될 때마다 무조건 다시 생성\nif (visualTemplate != null) ApplyTemplate();",
            code: "// 프리팹 원본 스케일 유지 — 상자 크기가 안 튐\ninstance.transform.localScale = prefab.transform.localScale;\n\n// 이미 만들어진 모델이 있으면 재생성 안 함\nif (visualTemplate != null && openedBox == null) ApplyTemplate();\n\n// InsertGift — 아이템 타입 × 현재 상태가 맞을 때만 전이\nif (id.ItemType == BoxItemType.WrappingPaper && state == ClosedWithGift\n    && id.wrappingGroup == allowedWrappingGroup)   { SetWrappedDesign(id.designIndex); }\nelse if (id.ItemType == BoxItemType.Ribbon && state == Wrapped)  { Finish(); }\nelse if (state == EmptyOpened)  { containedItemType = id.ItemType; SetState(ClosedWithGift); }"
          }
        }
      ]
    },
    {
      id: "zabonzooet",
      title: "자본주 E.T.",
      type: "Unity 2D 러너 금융 게임",
      period: "2026.02.16 ~ 2026.04.03",
      teamSize: "6인",
      tech: ["Unity WebGL", "C#", "FSM", "Animator", "Coroutine"],
      role: "Unity 인게임 플레이 단독 개발 (플레이어·스폰·퀴즈 연동·애니메이션)",
      description: "Unity 2D 러너 금융 학습 게임",
      impactLine: "게임 속도를 값 하나(globalSpeed)로 통제해 정지·감속·난이도를 한 곳에서 다루고, 코인·장애물 스포너가 서로 양보하게 만들어 러너 감각을 완성 — 핀테크 트랙 우수상 수상",
      award: "우수상",
      detailedDescription: "지구에 불시착한 외계인 E.T.가 1980·2000·2020년대 대한민국 경제 격변기를 달리며 시대별 금융 상식을 배우는 2D 러너 게임입니다. 달리는 중 등장하는 속보 퀴즈를 맞히면 무적 방어막을 얻고, 코인을 모으며 700m 결승선에 도달하면 클리어됩니다. SSAFY 특화 프로젝트 핀테크 트랙 우수상 수상작입니다.",
      image: "/jabonju.png",
      video: "/zabonzooET/gameplay.mp4",
      github: "https://github.com/kkaemong/zabonzooET",
      keyResult: [
        "게임의 '속도감'을 static globalSpeed 값 하나로 모으고, 배경·코인·장애물·캐릭터 애니메이션 배속이 전부 이 값을 따르게 설계 — 퀴즈 정지도, 완주 시 시네마틱 감속도, 난이도 곡선도 이 한 값만 조절하면 됨",
        "'달리는 화면이 산만하다'는 피드백을, 코인·장애물 스포너가 static 플래그로 서로의 상태를 알고 겹치지 않게 양보하는 방식으로 해결 (+ 코인은 점프 사거리 안 높이로만 스폰)"
      ],
      troubleshooting: [
        {
          title: "게임 전체 속도를 값 하나(globalSpeed)로 — 퀴즈 정지도 이 값을 0으로",
          problem: "이동 거리에 맞춰 속보 퀴즈를 띄우고, 퀴즈를 푸는 동안 게임을 멈춰야 했습니다. 그런데 배경·코인·장애물·플레이어가 각자 속도를 관리하다 보니 정지시켜도 배경만 멈추고 캐릭터는 계속 달리는 식으로 어긋났고, 퀴즈 팝업이 갑자기 튀어나오는 것도 러닝 흐름을 끊었습니다.",
          solution: "static globalSpeed 하나로 모든 스크롤을 통제하는 구조를 만들고, currentDifficultySpeed를 프레임마다 올려 난이도 곡선을 잡았습니다. 퀴즈는 팝업을 바로 띄우지 않고 화면 밖에서 병사를 스폰해 '달려오는 걸 보고' 부딪히면 시작되게 바꿨고(예외 시 팝업 폴백), 시작 순간 globalSpeed와 캐릭터 Animator.speed를 함께 0으로 묶어 화면 전체를 한 번에 정지시켰습니다. 정답을 맞히면 TriggerQuizInvincibility로 일정 시간 무적 방어막을 부여하고 게임을 재개했습니다.",
          images: [
            { src: "/zabonzooET/quiz.mp4", caption: "퀴즈 병사 만남 → 팝업 + 게임 전체 정지 → 정답 시 방어막(무적)" }
          ],
          codeSnippet: {
            filename: "GameManager.cs",
            language: "csharp",
            code: "void Update()\n{\n    if (isGameOver) { globalSpeed = 0f; return; }\n\n    // 난이도 곡선: 정지·부스트 중이 아닐 때만 목표 속도를 서서히 올림\n    if (!IsGamePaused && boostCoroutine == null)\n    {\n        if (currentDifficultySpeed < maxSpeed)\n            currentDifficultySpeed += accelerationRate * Time.deltaTime;\n        globalSpeed = currentDifficultySpeed;   // 모든 스크롤이 이 값 하나를 따름\n    }\n\n    if (!IsGamePaused && globalSpeed > 0)\n    {\n        distanceTraveled += globalSpeed * Time.deltaTime;\n\n        // 이동 거리가 목표에 닿으면 퀴즈 병사 스폰 -> QuizManager 호출\n        if (quizCount < 3 && distanceTraveled >= nextQuizDistance)\n            TriggerBreakingNews();\n    }\n}"
          }
        },
        {
          title: "1·2단 점프가 같은 모션 + 착지 코루틴이 점프 애니메이션을 덮어쓰는 버그",
          problem: "점프 로직을 처음 짰을 때는 몇 단 점프든 Animator state를 1로만 바꿔서 더블 점프가 눈에 티가 안 났고, 착지 코루틴(PlayLandingAnimation)이 0.2초 뒤 무조건 state를 0으로 되돌려서 — 착지 모션이 도는 도중 다시 점프하면 살아남은 코루틴이 점프 모션을 덮어썼습니다.",
          solution: "1단·2단을 state 1·3으로 분리하고 점프 힘도 14f / 10f로 나눴습니다(2단은 약하게 — 공중 컨트롤 여지). 착지 코루틴은 Coroutine 핸들로 들고 있다가 새 점프가 시작되면 StopCoroutine으로 취소하고, 코루틴 끝에서도 jumpCount == 0(정말 땅에 있을 때)만 달리기로 복귀하게 가드했습니다. 바닥 감지도 Raycast → RaycastAll로 바꿔 코인·장애물 콜라이더에 가려 Ground를 놓치는 경우를 없앴습니다. 애니메이션 클립과 Animator 컨트롤러는 3개 시대에 걸쳐 직접 제작해 player.cs에서 일괄 제어했고, 피격 시엔 blink 코루틴 + CameraShake로 타격 피드백을 줬습니다.",
          images: [
            { src: "/zabonzooET/doublejump.mp4", caption: "1단 → 2단 점프 → 착지, 피격 시 blink + 카메라 흔들림", gain: 1.4 }
          ],
          codeSnippet: {
            filename: "player.cs",
            language: "csharp",
            before: "void Jump()\n{\n    rb.linearVelocity = new Vector2(rb.linearVelocity.x, jumpForce);  // 1·2단 같은 힘\n    jumpCount++;\n    anim.SetInteger(\"state\", 1);          // 몇 단이든 무조건 1 — 더블 점프가 안 보임\n}\n\nIEnumerator PlayLandingAnimation()\n{\n    anim.SetInteger(\"state\", 2);\n    yield return new WaitForSeconds(0.2f);\n    anim.SetInteger(\"state\", 0);          // 무조건 복귀 — 착지 중 재점프하면 점프 모션을 덮어씀\n}",
            code: "private Coroutine landingCoroutine;\n\nvoid Jump()\n{\n    float force = (jumpCount == 0) ? firstJumpForce : secondJumpForce;  // 2단은 더 약하게\n    rb.linearVelocity = new Vector2(rb.linearVelocity.x, force);\n    jumpCount++;\n\n    if (landingCoroutine != null) { StopCoroutine(landingCoroutine); landingCoroutine = null; }\n\n    if (jumpCount == 1)      anim.SetInteger(\"state\", 1);  // 1단 점프\n    else if (jumpCount == 2) anim.SetInteger(\"state\", 3);  // 2단 점프\n}\n\nIEnumerator PlayLandingAnimation()\n{\n    anim.SetInteger(\"state\", 2);\n    yield return new WaitForSeconds(0.2f);\n    if (jumpCount == 0) anim.SetInteger(\"state\", 0);  // 아직 공중이면 복귀 안 함\n}"
          }
        },
        {
          title: "러너 화면 가독성 — 스폰 우선순위(코인은 양보, 퀴즈 병사는 자리를 밀어냄)",
          problem: "코인·장애물·퀴즈 병사가 각자 랜덤 위치·시점에 스폰되다 보니 서로 겹쳐 나와 화면이 어지럽고, 코인이 점프로 닿을 수 없는 높이에 뜨기도 했습니다. 그렇다고 무조건 겹치면 안 뽑으면, 게임 진행에 필수인 퀴즈 병사가 안 나오는 경우가 생겼습니다.",
          solution: "스폰 우선순위를 정했습니다. 코인은 쿠키런식 버스트로 묶고 점프 사거리(maxYLimit) 안 높이로만 스폰하며, 장애물이 방금(1.5초 내) 나왔으면 코인 타이머를 멈추고 OverlapBox로 겹침을 검사해 겹치면 건너뜁니다. 반대로 퀴즈 병사는 필수라서, 자리에 코인·장애물이 있으면 그걸 Destroy하고 자리를 확보합니다. 장애물 간격은 목표 거리에 다가갈수록 Mathf.Lerp로 촘촘해지는 밀도 커브를 적용했습니다.",
          codeSnippet: {
            filename: "SoldierSpawner.cs / CoinSpawner.cs",
            language: "csharp",
            code: "// 코인: 겹치면 양보 (건너뜀)\nif (Time.time - spawner.lastObstacleSpawnTime < 1.5f) return;\nif (Physics2D.OverlapBox(pos, checkBoxSize, 0f, avoidLayer)) return;\nSpawnCoinSequence();   // 버스트 — 점프 사거리(maxYLimit) 안 높이로만\n\n// 퀴즈 병사: 필수라서 자리를 밀어냄\npublic void SpawnQuizSoldier()\n{\n    foreach (var h in Physics2D.OverlapBoxAll(pos, checkBoxSize, 0f))\n    {\n        var n = h.gameObject.name.ToLower();\n        if (n.Contains(\"coin\") || n.Contains(\"disturb\") || n.Contains(\"obstacle\"))\n            Destroy(h.gameObject);   // 자리 확보 — 퀴즈는 무조건 나와야 함\n    }\n    Instantiate(soldierPrefabs[Random.Range(0, soldierPrefabs.Length)], pos, Quaternion.identity);\n}"
          }
        },
        {
          title: "완주 감속 — 배경과 다리 애니메이션을 같은 곡선으로 함께 늦춤",
          problem: "700m 완주 순간 globalSpeed를 0으로 만들면 화면이 뚝 멈춰 몰입이 확 깨졌습니다.",
          solution: "완주 시 SlowDownAndClearGame 코루틴이 globalSpeed와 캐릭터 Animator.speed를 1.5초간 함께 Mathf.Lerp로 0에 수렴시켜 자동차 브레이크 같은 감속 연출을 만들었습니다. 감속 시작 시 모든 스포너를 미리 꺼 새 장애물이 안 튀어나오게 했습니다.",
          images: [
            { src: "/zabonzooET/ending.mp4", caption: "700m 완주 → globalSpeed·캐릭터 애니메이션을 함께 Lerp 감속" }
          ],
          codeSnippet: {
            filename: "GameManager.cs",
            language: "csharp",
            code: "IEnumerator SlowDownAndClearGame()\n{\n    float duration = 1.5f;\n    float startSpeed = globalSpeed;\n    float elapsed = 0f;\n\n    Animator pAnim = FindObjectOfType<player>()?.GetComponent<Animator>();\n\n    // 감속 중 새 장애물이 튀어나오지 않게 스포너를 미리 끔\n    foreach (GameObject o in FindObjectsOfType<GameObject>())\n        if (o.name.ToLower().Contains(\"spawn\")) o.SetActive(false);\n\n    while (elapsed < duration)\n    {\n        elapsed += Time.deltaTime;\n        float t = elapsed / duration;\n\n        // 배경 스크롤과 다리 애니메이션 배속을 함께 선형 감속\n        globalSpeed = Mathf.Lerp(startSpeed, 0f, t);\n        if (pAnim != null) pAnim.speed = Mathf.Lerp(1f, 0f, t);\n\n        yield return null;\n    }\n\n    globalSpeed = 0f;\n    isGameOver = true;\n    ShowVictoryPanel();\n}"
          }
        }
      ]
    },
    {
      id: "gaesorelay",
      title: "개소릴레이 (Gaesorelay)",
      type: "React 실시간 웹소켓 게임",
      period: "2026.01.12 ~ 2026.02.09",
      teamSize: "6인",
      tech: ["React", "TypeScript", "Zustand", "Vite", "Figma"],
      role: "Front-End · UI 디자인",
      description: "웹소켓 & AI를 활용한 릴레이 스토리텔링 게임",
      impactLine: "Figma 기본 디자인부터 방 만들기·로비·연출 페이즈 UI까지 직접 디자인·구현하고, 결과 발표를 상태 기반 다단계 애니메이션으로 연출한 실시간 멀티플레이 웹 게임",
      detailedDescription: "유저들이 랜덤한 이미지를 보고 즉흥적으로 스토리를 이어 적으며 기상천외한 동화책을 만들어가는 실시간 멀티플레이 웹 게임입니다. 두 팀으로 나뉘어 제한 시간 내에 창의적인 문장을 작성하며 릴레이 스토리 대결을 펼칩니다. 게임이 종료되면 AI 및 관객 심사위원의 평가를 통해 승패가 결정되며, 예측할 수 없는 유쾌한 결말을 함께 즐길 수 있습니다.",
      image: "/gaesorlay.png",
      github: "https://github.com/gaesorelay/frontend",
      keyResult: [
        "Figma로 전체 화면 기본 디자인을 잡고, 인트로·방 만들기·로비·채팅과 카드 리빌 → 심사위원 셔플 → 결과 발표로 이어지는 연출 페이즈를 직접 디자인하고 컴포넌트로 구현",
        "결과 발표를 introPhase 상태값으로 단계화하고, 카드 리빌 씬은 서버 데이터가 없어도 랜덤 폴백으로 돌아가게 설계 — 데이터 유무와 무관하게 연출이 끊기지 않음"
      ],
      troubleshooting: [
        {
          title: "정보를 한꺼번에 쏟지 않고 — 상태값으로 단계를 나눠 시선 유도",
          problem: "게임 종료 후 관객 점수·AI 심사평·합산·승자를 한 화면에 다 보여주니 밋밋하고, 무엇을 먼저 봐야 할지 헷갈렸습니다. 처음엔 3단계로만 끊고 마지막에 점수·승자를 한꺼번에 세팅했는데도 여전히 정보가 몰려 보였고, setTimeout을 정리하지 않아 도중에 화면을 벗어나면 콜백이 남았습니다.",
          solution: "introPhase를 7단계로 잘게 나눠 관객 점수(A/B) → 1차 합산 게이지 → AI 심사(A/B) → 최종 합산·승자 순으로 setTimeout 전개하고, 타이머는 배열로 묶어 언마운트 시 전부 clearTimeout 했습니다. 등장 애니메이션은 transform: scale()/translateX() 키프레임에 요소 인덱스별 animation-delay를 줘 한꺼번에 몰리지 않고 순차로 나타나게 했고, 배경 파티클 배열은 slice(-20)으로 상한을 둬 무한히 쌓이지 않게 했습니다.",
          images: [
            { src: "/gaesorelay/judge-result.gif", caption: "관객 점수 → AI 심사위원 → 최종 합산 순차 발표" }
          ],
          codeSnippet: {
            filename: "JudgeResultPhase.tsx",
            language: "typescript",
            before: "// 초기 — 3단계, 마지막에 점수·승자를 한꺼번에 세팅, 타이머 정리 없음\nuseEffect(() => {\n  setTimeout(() => setIntroPhase(2), 3000);\n  setTimeout(() => setIntroPhase(3), 8500);\n  setTimeout(() => {\n    setIntroPhase(4);\n    setScoreA(...); setScoreB(...); setFinalMent(...);   // 관객·AI·합산·승자 동시\n  }, 14000);\n}, []);",
            code: "// 개선 — 7단계로 분리 + 언마운트 시 타이머 전부 정리\nuseEffect(() => {\n  const timers = [\n    setTimeout(() => setIntroPhase(2), 2000),   // 관객 점수 A\n    setTimeout(() => setIntroPhase(3), 6000),   // 관객 점수 B\n    setTimeout(() => setIntroPhase(4), 10000),  // 1차 합산 게이지\n    setTimeout(() => setIntroPhase(5), 17000),  // AI 심사 A\n    setTimeout(() => setIntroPhase(6), 22000),  // AI 심사 B\n    setTimeout(() => setIntroPhase(7), 27000),  // 최종 합산 게이지\n    setTimeout(() => { setIntroPhase(8); pickWinnerMent(); }, 34000),\n  ];\n  return () => timers.forEach(clearTimeout);   // 중간 이탈 시 콜백 누수 방지\n}, [totalA, totalB]);\n\n// 요소 인덱스별 delay로 한꺼번에 안 몰리게 순차 등장\n{judges.map((j, i) => (\n  <img key={j.id} src={j.profile}\n       style={{ animation: `elastic-zoomies 0.5s ${i * 0.1}s both` }} />\n))}"
          }
        },
        {
          title: "카드 리빌 씬 — 6장은 진짜, 34장은 눈속임, 서버 데이터 없으면 랜덤 폴백",
          problem: "40장 카드가 섞였다가 6장이 뽑히는 연출을 만들어야 했는데, 뽑히는 6장만 실제 라운드 데이터(카드·심사위원)와 이어져야 하고, 서버 응답이 늦거나 비어도 씬이 멈추면 안 됐습니다.",
          solution: "useMemo로 40장 카드 데이터를 한 번만 만들되 앞 6장만 서버의 cardIds·judges와 매핑하고 나머지 34장은 더미로 채웠습니다. 서버 judges가 6명 미만이면 Set으로 중복 없는 랜덤 강아지 ID를 채워 넣어, 데이터가 없어도 셔플 연출은 그대로 돌아가게 했습니다. scatter 좌표(랜덤 위치·회전)도 useMemo 안에서 한 번만 계산해 리렌더마다 카드가 다시 흩어지지 않게 했습니다.",
          codeSnippet: {
            filename: "CardShufflePhase.tsx",
            language: "typescript",
            code: "const cardsData = useMemo(() => {\n  const targetCardIds = roundData?.cardIds ?? [];\n\n  // 서버 심사위원이 6명 미만이면 중복 없는 랜덤 ID로 채움 (씬이 멈추지 않게)\n  let targetJudgeIds: number[] = [];\n  if (roundData?.judges && roundData.judges.length >= TARGET_COUNT) {\n    targetJudgeIds = roundData.judges.map(j => j.id);\n  } else {\n    const ids = new Set<number>();\n    while (ids.size < TARGET_COUNT) ids.add(randomAvatarId());\n    targetJudgeIds = [...ids];\n  }\n\n  return Array.from({ length: TOTAL_CARDS }).map((_, i) => ({\n    isTarget: i < TARGET_COUNT,   // 앞 6장만 진짜\n    front: getCardImage(targetCardIds[i % TARGET_COUNT]),\n    back:  getAvatarSrc(i < TARGET_COUNT ? targetJudgeIds[i] : randomAvatarId()),\n    scatterX: (Math.random() - 0.5) * 1400,   // 한 번만 계산 — 리렌더에도 안 흩어짐\n    scatterY: (Math.random() - 0.5) * 900,\n  }));\n}, [roundData]);"
          }
        },
        {
          title: "Figma 시안을 반응형 게임 UI로 구현 (방 만들기 · 로비)",
          problem: "Figma에서 잡은 방 만들기·대기실 화면을 실제 컴포넌트로 옮기면서, 소켓으로 실시간 들어오는 유저 목록·팀 배정·방장 여부·준비 상태를 UI에 자연스럽게 반영해야 했습니다.",
          solution: "시안의 레이아웃·타이포(눈누 귀염발랄체)·색을 CSS Module로 옮기고, 소켓 상태를 조건부 렌더링으로 붙였습니다. 방 만들기 페이지는 초안 → 2차 보완 → 구현으로 다듬었고, 로비는 팀 슬롯·강퇴·준비 표시가 한눈에 들어오도록 전면 재배치했습니다.",
          images: [
            { src: "/gaesorelay/create-room.gif", caption: "방 만들기 페이지" },
            { src: "/gaesorelay/lobby.gif", caption: "대기실 (로비) — 팀 배정·준비 상태" }
          ]
        },
        {
          title: "컴포넌트마다 Audio 객체 만들지 않고 — 전역 스토어 하나 + 라우트 인지",
          problem: "메인·로비·프로필 등 페이지마다 BGM·효과음을 넣었는데, React SPA라 라우트가 바뀔 때마다 Audio 객체가 새로 생성돼 소리가 겹치고, 브라우저 자동재생 정책 때문에 재생이 막혔습니다.",
          solution: "Zustand + sessionStorage로 useAudioStore(뮤트 상태 유지)를 만들고, 화면에 안 보이는 BGMPlayer 컴포넌트가 단일 Audio 인스턴스를 관리하도록 했습니다. useLocation으로 경로를 감지해 /gameroom 진입 시 공용 BGM을 멈추고 나오면 재개하며, 최초 클릭 이벤트로 자동재생 정책을 우회했습니다.",
          codeSnippet: {
            filename: "BGMPlayer.tsx",
            language: "tsx",
            code: "export default function BGMPlayer() {\n  const { isMuted } = useAudioStore();\n  const location = useLocation();\n  const audioRef = useRef<HTMLAudioElement | null>(null);\n\n  // 단일 Audio 인스턴스 + 자동재생 정책 우회 (최초 클릭)\n  useEffect(() => {\n    const audio = new Audio(bgmMp3);\n    audio.loop = true;\n    audioRef.current = audio;\n    const start = () => { if (!isMuted) audio.play().catch(() => {}); };\n    document.addEventListener('click', start, { once: true });\n    return () => { audio.pause(); document.removeEventListener('click', start); };\n  }, []);\n\n  // 경로 감지 — 게임방에선 공용 BGM 정지, 나오면 재개\n  useEffect(() => {\n    const audio = audioRef.current;\n    if (!audio) return;\n    if (location.pathname.startsWith('/gameroom')) audio.pause();\n    else if (!isMuted && audio.paused) audio.play().catch(() => {});\n  }, [location.pathname, isMuted]);\n\n  return null; // UI 없음\n}"
          }
        }
      ]
    }
  ],
  experience: [
    {
      id: 1,
      title: "SSAFY AI 아카데미 14기",
      period: "2025.07 ~ 2026.06",
      content: "Python 트랙 수료 및 게임 클라이언트/웹 부문 프로젝트 전 과정 이수 완료"
    },
    {
      id: 2,
      title: "협성대학교 경영학 전공",
      period: "2018.03 ~ 2024.08",
      content: "경영 데이터 분석 및 비즈니스 통계 이론 이수"
    },
    {
      id: 3,
      title: "제 11기 K-Shield Jr 정보보안 과정",
      period: "2023.09 ~ 2023.10",
      content: "웹 취약점 진단 및 모의 해킹 실무 교육 수료"
    },
    {
      id: 4,
      title: "Philippines Residency",
      period: "2002 ~ 2009",
      content: "7년 해외 거주 및 영어 커뮤니케이션 가능"
    }
  ],
  contact: {
    email: "junemay31@naver.com",
    blog: "https://velog.io/@junemay31/posts",
    github: "github.com/kkaemong",
    message: "플레이어가 몰입할 수 있는 게임을 함께 만들어갈 팀을 찾고 있습니다."
  },
  certifications: []
};
