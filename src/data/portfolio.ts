export interface TroubleShooting {
  title: string;
  problem: string;
  solution: string;
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
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
      role: "Unity 클라이언트 오브젝트 & 상호작용 로직 개발",
      description: "Unity 기반 포장 액션 캐주얼 게임",
      impactLine: "임포트 3D 에셋을 부모화해 Pivot·Scale을 규격화하고, 상자의 포장 공정을 상태머신 + 공통 인터페이스로 설계한 포장 액션 게임",
      detailedDescription: "산타와 엘프가 협력해 정해진 시간 안에 선물 주문을 처리하는 Windows 스탠드얼론 포장 액션 캐주얼 게임입니다. 상자에 선물을 담고 규격에 맞는 포장지와 리본으로 포장한 뒤 썰매에 적재해 배송하며, 일반·할로윈·케이크 등 테마별 상자와 어항 같은 특수 용기, 훼방 놓는 쥐 등 다양한 오브젝트가 등장합니다.",
      image: "/Gifted.png",
      downloadUrl: "https://drive.google.com/file/d/1HJR-3l0KuqCQ_fLprLA6EK1T_0ZcS3cR/view",
      keyResult: [
        "임포트 3D 에셋을 빈 부모 오브젝트로 래핑하고 자식 Transform만 보정해, Pivot·Scale이 달라도 충돌·상호작용 판정이 일관되게 동작하도록 규격화",
        "포장 공정(열림→선물→포장→리본→완성)을 BoxState 상태머신으로 분리하고 IInteractable·IItemReceiver·IHoldInteractable로 구현해, 썰매·디스펜서도 동일 패턴으로 확장"
      ],
      troubleshooting: [
        {
          title: "임포트 3D 에셋의 Pivot·Scale 불일치를 부모 오브젝트로 규격화",
          problem: "임포트한 외부 3D 에셋들은 크기(Scale)와 피벗(Pivot) 기준이 제각각이라, 씬에 그대로 두면 캐릭터가 상호작용할 때 높이가 안 맞고 충돌 판정이 어긋났습니다.",
          solution: "에셋을 씬에 직접 두지 않고 공통 규격의 빈 부모 오브젝트로 감싼 뒤(부모화), 자식 에셋은 부모 기준에 맞춰 Scale·위치만 보정했습니다. devil_doll도 real_devildoll 부모를 만들어 캐릭터 눈높이와 상호작용 범위에 맞게 조절했습니다. 콜라이더와 상호작용 컴포넌트는 부모에 붙이고 자식 모델의 스크립트는 제거해, 자식 에셋의 Transform이 무엇이든 충돌·상호작용 판정이 흔들리지 않게 했습니다.",
          beforeImageUrl: "/gifted-asset-before.png",
          afterImageUrl: "/gifted-asset-after.png",
          codeSnippet: {
            filename: "BoxStateController.cs",
            language: "csharp",
            code: "// 임포트한 모델 프리팹을 부모(this)의 자식으로 붙이고,\n// 자식에 딸려온 스크립트는 전부 제거 — 부모만 로직·충돌 판정을 책임진다\nprivate GameObject InstantiateModel(GameObject prefab, string name)\n{\n    if (prefab == null) return null;\n    GameObject instance = Instantiate(prefab, transform);\n    instance.name = name;\n\n    // 외부 에셋에 붙어 있던 컴포넌트가 상호작용을 방해하지 않도록 정리\n    MonoBehaviour[] scripts = instance.GetComponentsInChildren<MonoBehaviour>(true);\n    foreach (var script in scripts)\n        if (Application.isPlaying) Destroy(script); else DestroyImmediate(script);\n\n    return instance;\n}"
          }
        },
        {
          title: "상자 포장 공정을 상태머신 + ScriptableObject 템플릿으로 통합",
          problem: "상자는 열림→선물→포장→리본→완성까지 여러 단계를 거치고, 단계마다 받을 수 있는 아이템(선물·포장지·리본)과 가능한 상호작용이 달랐습니다. 게다가 일반·할로윈·케이크 등 상자 종류마다 비주얼과 허용 포장지가 달라 조건 분기가 빠르게 얽혔습니다.",
          solution: "단계를 BoxState enum으로 분리하고, '이 상태에서 이 아이템을 받을 수 있는가'를 IItemReceiver·IHoldInteractable 계약으로 통일했습니다. 상태별 모델(열림/닫힘/포장·완성 각 3종)은 BoxVisualTemplate(ScriptableObject)로 주입해 상자 3종을 컴포넌트 하나로 처리하고, WrappingGroup enum으로 상자별 허용 포장지를 제한했습니다. 어항은 별도 FishBowlController지만 같은 상호작용 컴포넌트(Grabbable·InteractHighlight·BoxItemIdentifier)를 그대로 재사용했습니다.",
          images: [
            { src: "/Gifted/normalbox.png", caption: "기본맵 박스" },
            { src: "/Gifted/halloweenbox.png", caption: "할로윈 박스" },
            { src: "/Gifted/cakebox.png", caption: "케이크 박스" },
            { src: "/Gifted/icebowl.png", caption: "얼음맵 박스" }
          ],
          codeSnippet: {
            filename: "BoxStateController.cs",
            language: "csharp",
            code: "public class BoxStateController : MonoBehaviour,\n    IInteractable, IItemReceiver, IHoldInteractable, IRatTarget\n{\n    public enum BoxState\n    {\n        EmptyOpened,      // 빈 상자 (선물 넣기 가능)\n        ClosedWithGift,   // 선물 들어있음 (포장 전)\n        Wrapped,          // 포장지 씌움 (마무리 전)\n        Finished,         // 최종 완성 (리본 등 완료)\n        Submitted         // 썰매 적재 완료 (상호작용 불가)\n    }\n\n    // 현재 상태에서 이 아이템을 받을 수 있는지 인터페이스 계약으로 판단\n    public bool CanReceiveItem(GameObject item)\n    {\n        var identifier = item.GetComponent<BoxItemIdentifier>();\n        if (identifier == null) return false;\n\n        if (identifier.ItemType == BoxItemType.WrappingPaper)\n            return CanWrap && (identifier.wrappingGroup == allowedWrappingGroup);\n        else if (identifier.ItemType == BoxItemType.Ribbon)\n            return CanFinish;\n        else if (identifier.ItemType == BoxItemType.Box)\n            return false;\n\n        return CanInsertGift;\n    }\n}"
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
      role: "Unity 인게임 플레이 개발 (단독)",
      description: "Unity 2D 러너 금융 학습 게임",
      impactLine: "플레이어·스폰·애니메이션·퀴즈 연동까지 인게임 전체를 단독 구현하고, 상태머신·속도 동기화·스폰 밸런싱으로 러너 감각을 완성해 핀테크 트랙 우수상 수상",
      award: "우수상",
      detailedDescription: "지구에 불시착한 외계인 E.T.가 1980·2000·2020년대 대한민국 경제 격변기를 달리며 시대별 금융 상식을 배우는 2D 러너 게임입니다. 달리는 중 등장하는 속보 퀴즈를 맞히면 무적 방어막을 얻고, 코인을 모으며 700m 결승선에 도달하면 클리어됩니다. SSAFY 특화 프로젝트 핀테크 트랙 우수상 수상작입니다.",
      image: "/jabonju.png",
      video: "/zabonzooET/gameplay.mp4",
      github: "https://github.com/kkaemong/zabonzooET",
      keyResult: [
        "player.cs·GameManager.cs·QuizManager.cs와 모든 스포너를 직접 작성하고 3개 시대 애니메이터를 제작 — 사용자에게 보이는 인게임 플레이 전체를 단독 구현",
        "'장애물이 겹쳐 어지럽다'는 플레이테스트 피드백을 OverlapBox 스폰 가드 + 거리 기반 밀도 커브로 해결, 핀테크 트랙 우수상 수상"
      ],
      troubleshooting: [
        {
          title: "거리 기반 퀴즈 트리거 → 게임 전체 정지 & 정답 시 방어막",
          problem: "이동 거리에 맞춰 속보 퀴즈를 띄우고, 퀴즈를 푸는 동안 게임을 멈춰야 했습니다. 그런데 배경·코인·장애물·플레이어가 각자 속도를 관리하다 보니 정지시켜도 배경만 멈추고 캐릭터는 계속 달리는 식으로 어긋났습니다.",
          solution: "static globalSpeed 하나로 모든 스크롤을 통제하는 구조를 만들고, currentDifficultySpeed를 프레임마다 올려 난이도 곡선을 잡았습니다. distanceTraveled가 목표 거리에 닿으면 퀴즈 병사를 스폰하고 QuizManager.ShowQuiz()를 호출하며, 이때 globalSpeed와 캐릭터 Animator.speed를 함께 0으로 묶어 화면 전체를 한 번에 정지시켰습니다. 정답을 맞히면 TriggerQuizInvincibility로 일정 시간 무적 방어막을 부여하고 게임을 재개했습니다.",
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
          title: "다중 점프 애니메이션 꼬임을 정수 상태값으로 해결 + 속도 비례 발소리 Pitch",
          problem: "2단 점프 시 Trigger가 중첩돼 점프·착지 애니메이션이 꼬였습니다. 또 주행 속도가 빨라져도 발소리 템포가 그대로여서 속도감이 밋밋하다는 피드백이 있었습니다.",
          solution: "Trigger 대신 SetInteger(\"state\", n)으로 0 달리기 / 1 1단점프 / 2 착지 / 3 2단점프 / 4 사망을 명확히 매핑해 상태 충돌을 원천 차단했습니다. 플레이어·적·장애물·코인의 애니메이션 클립과 Animator 컨트롤러는 3개 시대에 걸쳐 직접 제작해 player.cs에서 일괄 제어했고, Update에서 speedRatio = globalSpeed / 5f로 발소리 Pitch를 실시간 조절했습니다. 피격 시엔 blink 코루틴 + CameraShake + 파티클로 타격 피드백을 줬습니다.",
          images: [
            { src: "/zabonzooET/doublejump.mp4", caption: "1단 → 2단 점프 → 착지, 피격 시 blink + 카메라 흔들림", gain: 1.4 }
          ],
          codeSnippet: {
            filename: "player.cs",
            language: "csharp",
            code: "// 달리는 속도에 비례해 발소리 Pitch 실시간 조절 (기본속도 5f 기준)\nfloat speedRatio = GameManager.globalSpeed / 5f;\nrunSource.pitch = speedRatio * runSoundSpeedMultiplier;\n\n// Trigger 대신 정수 상태값 — 중첩돼도 마지막 값만 유효\nvoid Jump()\n{\n    float force = (jumpCount == 0) ? firstJumpForce : secondJumpForce;\n    rb.linearVelocity = new Vector2(rb.linearVelocity.x, force);\n    jumpCount++;\n\n    if (jumpCount == 1)      anim.SetInteger(\"state\", 1);  // 1단 점프\n    else if (jumpCount == 2) anim.SetInteger(\"state\", 3);  // 2단 점프\n}\n\nIEnumerator PlayLandingAnimation()\n{\n    anim.SetInteger(\"state\", 2);              // 착지\n    yield return new WaitForSeconds(0.2f);\n    if (jumpCount == 0) anim.SetInteger(\"state\", 0);  // 달리기로 복귀\n}"
          }
        },
        {
          title: "완주 시 게임을 뚝 끊지 않고 '브레이크 밟듯' 감속 (SlowDownAndClearGame)",
          problem: "700m 완주 순간 globalSpeed를 0으로 만들면 화면이 뚝 멈춰 몰입이 확 깨졌습니다. 초기 빌드에선 장애물·코인이 겹쳐 스폰돼 산만하다는 피드백도 있었습니다.",
          solution: "완주 시 SlowDownAndClearGame 코루틴이 globalSpeed와 캐릭터 Animator.speed를 1.5초간 함께 Mathf.Lerp로 0에 수렴시켜 자동차 브레이크 같은 감속 연출을 만들었습니다. 감속 시작 시 스포너를 미리 꺼 새 장애물이 안 튀어나오게 했고, 평상시 스폰도 Physics2D.OverlapBox로 코인·장애물 겹침을 막고 거리 기반으로 밀도를 조절했습니다.",
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
        "Figma로 전체 화면 기본 디자인을 잡고, 방 만들기·인트로·로비·채팅 UI와 카드 셔플 → 심사위원 셔플 → 결과 발표 연출 페이즈를 직접 컴포넌트로 구현 (JudgeResultPhase 900줄, JudgeShufflePhase 900줄, CardShufflePhase 500줄)",
        "결과 발표를 introPhase 상태값으로 7단계 전개하고, transform 기반 키프레임(elastic-zoomies·slide-in·stamp-slam)을 요소마다 다른 delay로 재생해 관객 점수 → 심사평 → 합산 → 승자 순으로 시선 유도"
      ],
      troubleshooting: [
        {
          title: "결과 발표 화면을 introPhase 상태값으로 7단계 전개 (JudgeResultPhase)",
          problem: "게임 종료 후 팀별 관객 점수·AI 심사평·1차 합산·최종 승자를 한 화면에 쏟아내니 밋밋하고, 무엇을 먼저 봐야 할지 헷갈렸습니다.",
          solution: "900줄 컴포넌트에서 introPhase useState를 1~7로 두고 setTimeout으로 단계를 전개했습니다. A팀 관객 점수(2) → B팀 관객 점수(3) → 1차 합산(4) → A팀 AI 심사(5) → B팀 AI 심사(6) → 최종 합산·승자(7). 각 단계에서 점수 카운트업과 요소 등장을 트리거하고, 등장 애니메이션은 transform: scale()/translateX() 키프레임에 요소 인덱스별 animation-delay를 줘 한꺼번에 몰리지 않게 순차 재생했습니다.",
          images: [
            { src: "/gaesorelay/judge-result.gif", caption: "관객 점수 → AI 심사위원 → 최종 합산 순차 발표" }
          ],
          codeSnippet: {
            filename: "JudgeResultPhase.tsx",
            language: "typescript",
            code: "const [introPhase, setIntroPhase] = useState(1);\n\nuseEffect(() => {\n  // 발표를 7단계로 전개 — 각 단계에서 점수 카운트업·요소 등장을 트리거\n  const timers = [\n    setTimeout(() => setIntroPhase(2), 0),      // A팀 관객 점수\n    setTimeout(() => setIntroPhase(3), 5000),   // B팀 관객 점수\n    setTimeout(() => setIntroPhase(4), 10000),  // 1차 합산\n    setTimeout(() => setIntroPhase(5), 16000),  // A팀 AI 심사\n    setTimeout(() => setIntroPhase(6), 27000),  // B팀 AI 심사\n    setTimeout(() => setIntroPhase(7), 38000),  // 최종 합산 · 승자\n  ];\n  return () => timers.forEach(clearTimeout);\n}, []);\n\n// 등장 애니메이션은 transform 키프레임 + 인덱스별 delay로 순차화\n{judges.map((j, i) => (\n  <img key={j.id} src={j.profile}\n       style={{ animation: `elastic-zoomies 0.5s ${i * 0.1}s both` }} />\n))}"
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
          title: "Zustand 전역 오디오 스토어 + 라우트 인지 BGMPlayer",
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
