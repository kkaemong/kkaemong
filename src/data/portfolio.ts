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
  github?: string;
  teamSize?: string;
  award?: string;
  challenge?: string[];
  solution?: string[];
  keyResult?: string[];
  learned?: string[];     // 이 프로젝트에서 배운 것
  troubleshooting?: TroubleShooting[];
}

export const portfolioData = {
  hero: {
    headline: "플레이어가 느끼는 그 순간을,\n코드로 설계합니다",
    subTitle: "조작감이 어색하거나 사운드가 끊길 때,\n그 불편함을 코드 레벨에서 추적하고 해결합니다.\n\n단순히 '작동하는 코드'를 넘어,\n'플레이어가 몰입하는 코드'를 만드는 것에 집착합니다.",
    cta: {
      primary: "프로젝트 살펴보기",
      secondary: "GitHub 방문하기",
      githubUrl: "https://github.com/kkaemong"
    }
  },
  about: {
    title: "당연함을 지키기 위해\n보이지 않는 곳을 다듬습니다",
    description: "찰나의 끊김과 미세한 어색함을 방치하지 않습니다.\n\n유저의 시선이 닿지 않는 코드 깊은 곳을 파고들어 원인을 해결하고, 기획 변화에도 무너지지 않는 단단한 뼈대를 고민하는 클라이언트 개발자입니다.",
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
        title: "유연하고 단단한 설계",
        content: "IInteractable 인터페이스로 결합도를 낮춰, 잦은 기획 변경과 에셋 추가에도 흔들리지 않는 뼈대를 구축합니다."
      },
      {
        title: "수치로 깎아낸 조작감",
        content: "FSM으로 복잡한 행동을 제어하고, Lerp 감속과 사운드 동기화를 통해 눈과 귀가 일치하는 타격감을 구현합니다."
      },
      {
        title: "끊김 없는 프레임 최적화",
        content: "오브젝트 풀링을 적극 활용하여, 잦은 객체 생성과 파괴로 인한 GC 스파이크 및 프레임 저하를 원천 차단합니다."
      }
    ]
  },
  skills: {
    main: [
      {
        name: "C#",
        tag: "주력",
        icon: "csharp",
        description: "Unity 핵심 스크립팅 언어. FSM 상태 관리, 제네릭 기반 오브젝트 풀링, 비동기 서버 통신 모듈을 직접 설계합니다."
      },
      {
        name: "Unity",
        tag: "주력",
        icon: "unity",
        description: "2D/3D 인게임 인터랙션 설계, 애니메이터 FSM 제어, 물리 로직 구현 및 프레임 최적화를 총괄합니다."
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
        description: "웹소켓 실시간 멀티플레이어 게임의 클라이언트 상태 파이프라인 및 GPU 가속 UI 애니메이션을 설계합니다."
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
      id: "gifted",
      title: "GIFTED",
      type: "SSAFY 2학기 자율 프로젝트",
      period: "2026.04.05 ~ 2026.05.21",
      teamSize: "6인",
      tech: ["Unity WebGL", "C#", "FSM", "Object Pooling", "Git", "GitHub"],
      role: "Unity 클라이언트 오브젝트 & 상호작용 로직 개발",
      description: "Unity 기반 포장 액션 캐주얼 액션 게임",
      impactLine: "IInteractable 인터페이스로 크기·Pivot이 다른 3D 에셋의 상호작용을 규격화하고, 오브젝트 풀링으로 GC 스파이크를 원천 차단한 포장 액션 게임",
      detailedDescription: "물건의 특성과 규격에 맞추어 상자를 포장하고 적재하는 WebGL 포장 액션 게임입니다. 외부 에셋을 임포트하여 게임 로직에 맞게 가공하고 최적화하는 과정을 전담했습니다. 크기(Scale)와 높이(Pivot)가 다른 다양한 3D 에셋들을 게임 내에서 일관성 있게 상호작용할 수 있도록 부모-자식(Parent-Child) 계층 구조화로 규격화하고, 객체 생성 부하를 줄이는 오브젝트 풀링(Object Pooling) 아키텍처를 도입하여 WebGL 환경에서의 프레임 드랍을 완벽하게 방어했습니다.",
      image: "/Gifted.png",
      github: "https://github.com/gifted-hamyeonham/gifted",
      keyResult: [
        "IInteractable 인터페이스를 12개 이상 핵심 클래스에 적용하여, 에셋 스토어 에셋의 Pivot이나 Scale이 달라도 동일한 상호작용 로직(Interact())이 동작하도록 규격화",
        "ObjectPool<T> 제네릭 풀링 도입으로 매 프레임 발생하던 Instantiate/Destroy GC 가메모리 할당을 0으로 수렴시켜 WebGL 60fps 안정화"
      ],
      learned: [
        "인터페이스는 단순 코드 구조를 넘어, '어떤 물체든 동일하게 다룰 수 있어야 한다'는 설계 철학에서 나온다는 것을 체감했습니다.",
        "GC 스파이크를 잡아보는 과정에서, 메모리 할당 시점과 해제 시점을 설계 수준에서 통제하는 것이 성능의 핵심임을 직접 배웠습니다."
      ],
      troubleshooting: [
        {
          title: "다양한 외부 에셋 Transform 불일치 규격화 및 IInteractable 캡슐화",
          problem: "에셋 스토어 등에서 가져온 외부 에셋들은 크기, 높이(Pivot), 회전 기준점이 제각각 달랐습니다. 이를 그대로 게임 씬에 배치할 경우 캐릭터가 상호작용할 때 높낮이가 안 맞거나 물리 충돌 판정이 어색해지는 치명적인 UI/UX 저하 문제가 발생했습니다.",
          solution: "모든 외부 에셋을 직접 씬에 노출하지 않고, 공통 규격의 '빈 부모 오브젝트(Parent Transform)'로 래핑하는 계층화(Hierarchy) 작업을 수행했습니다. 부모 객체에 콜라이더와 로직(IInteractable 인터페이스)을 부착하고, 자식 객체인 외부 에셋은 부모에 맞춰 스케일 및 위치 보정만 진행하여 완벽한 상호작용 시스템을 규격화했습니다.",
          codeSnippet: {
            filename: "InteractableWrapper.cs",
            language: "csharp",
            code: "public class InteractableWrapper : MonoBehaviour, IInteractable\n{\n    [Header(\"Child Asset Transform 보정 (Inspector)\")]\n    [SerializeField] private Transform visualAsset;\n    \n    // 부모 객체에서 일관된 충돌 판정 및 상호작용 처리\n    public void Interact(PlayerController player)\n    {\n        // 자식 에셋의 Scale이나 Pivot에 구애받지 않는 안전한 로직\n        Debug.Log($\"{gameObject.name} 상호작용 실행\");\n        \n        // 오브젝트 풀에서 꺼낸 이펙트 실행 등\n        EffectManager.Instance.PlayEffect(transform.position);\n    }\n}"
          }
        },
        {
          title: "제네릭(Generic) 기반 오브젝트 풀링(Object Pooling) 메모리 최적화",
          problem: "멀티플레이 캐주얼 게임 특성상 수많은 선물 상자와 아이템이 실시간으로 생성(Instantiate)되고 파괴(Destroy)되었습니다. 이로 인해 메모리 가비지 컬렉션(GC) 스파이크가 발생하면서 WebGL 환경에서 화면이 간헐적으로 뚝뚝 끊기는 심각한 프레임 드랍(Frame Drop) 현상이 발생했습니다.",
          solution: "객체 생성/파괴로 인한 메모리 할당 부하를 원천 차단하기 위해, 제네릭 타입 <T>를 활용한 범용 ObjectPool 매니저를 구현했습니다. 게임 시작 시 필요한 수량의 오브젝트를 Queue에 미리 생성(Instantiate)해두고 비활성화(SetActive(false)) 시킨 뒤, 필요할 때마다 꺼내 쓰고 다시 반납하는 구조를 설계하여 런타임 메모리 누수를 잡고 안정적인 60fps 방어에 성공했습니다.",
          codeSnippet: {
            filename: "ObjectPoolManager.cs",
            language: "csharp",
            code: "public class ObjectPoolManager<T> where T : MonoBehaviour\n{\n    private Queue<T> poolQueue = new Queue<T>();\n    private T prefab;\n\n    // 💡 객체를 미리 생성하여 Queue에 보관 (메모리 풀링)\n    public void Initialize(int count, T prefabToPool)\n    {\n        prefab = prefabToPool;\n        for (int i = 0; i < count; i++)\n        {\n            T obj = Object.Instantiate(prefab);\n            obj.gameObject.SetActive(false);\n            poolQueue.Enqueue(obj);\n        }\n    }\n\n    // 💡 Instantiate 대신 Queue에서 꺼내서 재사용 (GC 스파이크 차단)\n    public T GetObject()\n    {\n        if (poolQueue.Count > 0)\n        {\n            T obj = poolQueue.Dequeue();\n            obj.gameObject.SetActive(true);\n            return obj;\n        }\n        return Object.Instantiate(prefab); // 큐 부족 시 비상 생성\n    }\n\n    // 💡 Destroy 대신 Queue로 반납\n    public void ReturnObject(T obj)\n    {\n        obj.gameObject.SetActive(false);\n        poolQueue.Enqueue(obj);\n    }\n}"
          }
        }
      ]
    },
    {
      id: "zabonzooet",
      title: "자본주 E.T.",
      type: "SSAFY 2학기 특화 프로젝트 (핀테크 트랙)",
      period: "2026.02.16 ~ 2026.04.03",
      teamSize: "6인",
      tech: ["Unity WebGL", "C#", "FSM", "REST API"],
      role: "Unity 인게임 클라이언트 총괄",
      description: "Unity · Spring Boot · AWS 풀스택 2D 러너 금융 학습 게임",
      impactLine: "Unity 인게임 C# 클라이언트를 단독 총괄하고, Lerp 감속·사운드 Pitch 동기화로 조작감을 완성하여 핀테크 트랙 우수상 수상",
      award: "우수상",
      detailedDescription: "지구에 불시착한 E.T.가 시대별 대한민국 경제 격변기를 직접 달리며 겪는 2D 러너 게임입니다. Unity 인게임 클라이언트 개발을 총괄하여 1980/2000/2020년대 배경 씬(Scene)을 분할 구축하고, 캐릭터의 점프 물리 로직(Rigidbody2D)부터 사운드/피격 이펙트, 그리고 애니메이션 상태 머신(Animator) 제어까지 게임에 필요한 핵심 인게임 C# 엔진을 전부 단독으로 설계했습니다. 추가로 Spring Boot 서버와의 데이터 연동을 위한 커스텀 통신 모듈을 구축하여 클라이언트 아키텍처의 완성도를 높였습니다.",
      image: "/jabonju.png",
      github: "https://github.com/kkaemong/zabonzooET",
      keyResult: [
        "FSM state 0~4 명확 분리 및 Pitch = globalSpeed/5f 실시간 동기화로 조작감을 완성하여 핀테크 트랙 우수상 수상",
        "파편화된 UnityWebRequest 코드를 Generic<T> + Action 콜백 APIManager 단일 클래스로 통합하여 비동기 타이밍 오류 구조적 해소"
      ],
      learned: [
        "FSM을 명확히 설계하지 않으면 애니메이션 상태가 꼬이는 것은 시간의 문제가 아니라 설계의 문제임을 실무로 체득했습니다.",
        "사운드 Pitch를 속도에 동기화하는 수준의 세밀한 튜닝이 플레이어의 몰입감에 직접적으로 영향을 준다는 것을 체감했습니다. '조작감'은 시각만이 아니라 청각과 함께 설계해야 한다는 교훈이었습니다.",
        "Generic 타입과 Action 델리게이트를 결합하면 다양한 데이터 모델을 하나의 통신 시스템으로 안전하게 처리할 수 있다는 것을 이 프로젝트에서 노득했습니다."
      ],
      troubleshooting: [
        {
          title: "백엔드 실시간 연동을 위한 Generic APIManager 캡슐화",
          problem: "Spring Boot 백엔드에서 퀴즈 데이터나 유저 정보를 받아와야 했습니다. 유니티의 기본 HTTP 호출인 UnityWebRequest 코드가 여러 스크립트에 파편화되어 작성되면서, 코드가 길어지고 비동기 타이밍 오류 디버깅이 매우 어려워졌습니다.",
          solution: "모든 HTTP 통신 레이어를 단일 APIManager 클래스로 분리하고, 어떠한 형태의 데이터 모델(JSON)이라도 유연하게 역직렬화(Deserialize)하여 반환할 수 있도록 Generic <T> 타입과 C# Action 델리게이트 콜백을 결합한 통합 통신 모듈을 설계했습니다.",
          codeSnippet: {
            filename: "APIManager.cs",
            language: "csharp",
            code: "public class APIManager : MonoBehaviour\n{\n    // Generic을 활용한 범용 비동기 HTTP GET 요청 래퍼\n    public IEnumerator GetRequest<T>(string endpoint, Action<T> onSuccess, Action<string> onError)\n    {\n        using (UnityWebRequest webRequest = UnityWebRequest.Get(BASE_URL + endpoint))\n        {\n            yield return webRequest.SendWebRequest();\n\n            if (webRequest.result == UnityWebRequest.Result.Success)\n            {\n                string jsonResponse = webRequest.downloadHandler.text;\n                T data = JsonUtility.FromJson<T>(jsonResponse);\n                onSuccess?.Invoke(data);\n            }\n            else\n            {\n                onError?.Invoke(webRequest.error);\n            }\n        }\n    }\n}"
          }
        },
        {
          title: "Mathf.Lerp 및 Coroutine을 활용한 게임 물리/애니메이션 동적 제어",
          problem: "플레이어가 목표 거리(700m)에 도달했을 때 게임이 냅다 정지해버리면 몰입감이 심하게 깨지는 문제가 있었습니다. 또한 퀴즈 정답 시 획득하는 부스터 구간에서도 속도가 뚝뚝 끊기듯 변하여 러너 게임 특유의 속도감을 온전히 살리지 못했습니다.",
          solution: "Unity Coroutine과 Mathf.Lerp(선형 보간) 수학 함수를 결합하여 프레임 단위의 부드러운 감속/가속 시스템을 구축했습니다. 특히 완주 시 호출되는 SlowDownAndClearGame() 코루틴에서 배경 스크롤 속도(globalSpeed)와 캐릭터의 다리 움직임(Animator.speed) 비율을 일치시켜 서서히 0으로 수렴하게 만듦으로써, 자동차가 브레이크를 밟듯 자연스러운 시네마틱 연출을 완성했습니다.",
          codeSnippet: {
            filename: "GameManager.cs",
            language: "csharp",
            code: "IEnumerator SlowDownAndClearGame()\n{\n    float slowDownDuration = 1.5f;\n    float currentStartSpeed = globalSpeed;\n    float elapsed = 0f;\n\n    while (elapsed < slowDownDuration)\n    {\n        elapsed += Time.deltaTime;\n        float t = elapsed / slowDownDuration;\n\n        // 💡 배경 스크롤 속도와 캐릭터 달리기 애니메이션 배속을 동시에 선형 보간(Lerp)\n        globalSpeed = Mathf.Lerp(currentStartSpeed, 0f, t);\n        if (pAnim != null) pAnim.speed = Mathf.Lerp(1f, 0f, t);\n\n        yield return null;\n    }\n    \n    globalSpeed = 0f; // 완전 정지\n}"
          }
        },
        {
          title: "조작감 극대화를 위한 상태 머신(Animator) 및 동적 사운드 튜닝",
          problem: "다중 점프 시 애니메이션 트리거(Trigger)가 중첩되어 꼬이는 버그가 잦았습니다. 또한, 주행 속도가 점차 빨라짐에도 발소리 템포가 똑같아 속도감이 떨어지고 밋밋하다는 피드백이 있었습니다.",
          solution: "Trigger 대신 SetInteger로 0(Run), 1(1단 점프), 3(2단 점프) 상태 번호를 명확하게 매핑하여 애니메이션 충돌을 원천 차단했습니다. 또한 Update 루프 내에서 글로벌 속도(globalSpeed) 비율을 계산해 AudioSource의 Pitch(음높이 및 재생 속도) 값을 즉각적으로 조절함으로써, 캐릭터가 빨라질수록 발소리도 빠르고 높아지도록 청각적 타격감을 동기화했습니다.",
          codeSnippet: {
            filename: "player.cs",
            language: "csharp",
            code: "// 💡 1. 달리는 속도에 비례하여 발소리(Pitch) 동적 상승\nbool isRunning = (jumpCount == 0 && !GameManager.isGameOver && GameManager.globalSpeed > 0f);\nif (isRunning)\n{\n    float speedRatio = GameManager.globalSpeed / 5f;\n    GameManager.Instance.runSource.pitch = speedRatio * GameManager.Instance.runSoundSpeedMultiplier;\n}\n\n// 💡 2. Trigger 대신 Integer로 명확한 점프 애니메이션 상태 제어\nvoid Jump()\n{\n    float force = (jumpCount == 0) ? firstJumpForce : secondJumpForce;\n    rb.linearVelocity = new Vector2(rb.linearVelocity.x, force);\n    jumpCount++;\n\n    if (jumpCount == 1) anim.SetInteger(\"state\", 1);\n    else if (jumpCount == 2) anim.SetInteger(\"state\", 3);\n}"
          }
        }
      ]
    },
    {
      id: "gaesorelay",
      title: "개소릴레이 (Gaesorelay)",
      type: "SSAFY 2학기 공통 프로젝트",
      period: "2026.01.12 ~ 2026.02.09",
      teamSize: "6인",
      tech: ["React", "TypeScript", "Zustand", "Vite", "Framer Motion"],
      role: "Front-End",
      description: "웹소켓 & AI를 활용한 릴레이 스토리텔링 게임",
      impactLine: "웹소켓 실시간 멀티플레이 게임에서 Zustand 오디오 크로스페이드와 GPU 가속 UI로 끊김 없는 60fps 클라이언트 경험 구현",
      detailedDescription: "유저들이 랜덤한 이미지를 보고 즉흥적으로 스토리를 이어 적으며 기상천외한 동화책을 만들어가는 실시간 멀티플레이 웹 게임입니다. 두 팀으로 나뉘어 제한 시간 내에 창의적인 문장을 작성하며 릴레이 스토리 대결을 펼칩니다. 게임이 종료되면 AI 및 관객 심사위원의 평가를 통해 승패가 결정되며, 예측할 수 없는 유쾌한 결말을 함께 즐길 수 있습니다.",
      image: "/gaesorlay.png",
      github: "https://github.com/kkaemong/gaesorelay",
      keyResult: [
        "Zustand 기반 전역 Audio/BGM 상태 파이프라인을 구축하여 라우트 전환 시에도 끊김 없는 페이드(Fade) 트랜지션 달성",
        "다이내믹 투표 모달 및 실시간 타이머에 CSS GPU 하드웨어 가속을 적용하여 리플로우(Reflow) 없는 60fps 애니메이션 달성",
        "Framer Motion과 CSS 3D Transform(rotateY)을 적극 활용하여 로비 및 카드 추첨 씬의 입체적인 화면 전환 UI 구축"
      ],
      troubleshooting: [
        {
          title: "Zustand 전역 상태 기반 BGM/SFX 파이프라인 및 페이드(Fade) 트랜지션 구축",
          problem: "게임 몰입감을 위해 메인, 로비, 결과창 등 페이즈별 브금(BGM)과 효과음(SFX)을 적용했습니다. 그러나 React SPA 특성상 라우트가 이동할 때마다 오디오가 뚝뚝 끊기거나, 브라우저의 엄격한 오디오 자동재생(Autoplay) 정책으로 인해 소리가 재생되지 않고 겹치는 버그가 발생했습니다.",
          solution: "단순히 컴포넌트 내부에 Audio 객체를 선언하는 대신, Zustand와 sessionStorage를 활용해 useAudioStore 전역 오디오 상태를 설계했습니다. 특히 페이지 전환 시 음악이 부자연스럽게 끊기지 않도록, setInterval을 활용해 볼륨을 50ms마다 서서히 조절하는 크로스 페이드 인/아웃(Fade in/out) 로직을 직접 구현하여 압도적인 오디오 UX를 달성했습니다.",
          codeSnippet: {
            filename: "useAudioStore.ts",
            language: "typescript",
            code: "      stopBGM: (callback) => {\n        const { bgmAudio, fadeInterval } = get();\n        if (fadeInterval) clearInterval(fadeInterval);\n        if (!bgmAudio) return callback?.();\n\n        let vol = bgmAudio.volume;\n        // ⭐️ 곡이 전환될 때 뚝 끊기지 않도록 부드러운 페이드 아웃(Fade-out) 적용\n        const interval = window.setInterval(() => {\n          vol -= 0.05;\n          if (vol <= 0) {\n            bgmAudio.pause();\n            clearInterval(interval);\n            if (callback) callback(); // 완전히 꺼지면 다음 BGM 자연스럽게 재생\n          } else {\n            bgmAudio.volume = Math.max(0, vol);\n          }\n        }, 50);\n        set({ fadeInterval: interval });\n      },"
          }
        },
        {
          title: "CSS 레이아웃 리플로우(Reflow) 방어 및 타이머 애니메이션 최적화",
          problem: "제가 담당한 심사 결과 페이지에서, 게임 종료 후 대량의 데이터(팀별 스토리, AI 심사평, 실시간 투표 상태)가 한 번에 렌더링될 때 복잡한 타이머 애니메이션과 DOM 업데이트가 충돌하면서 심각한 레이아웃 리플로우(Reflow) 및 렌더링 버벅임 현상이 발생했습니다.",
          solution: "리플로우를 유발하는 기하학적 속성 대신, GPU 하드웨어 가속을 온전히 지원하는 transform: translate3d() 속성으로 타이머와 모달의 위치 이동 애니메이션을 전면 수정했습니다. 추가로 will-change 속성을 부여해 브라우저 엔진에 렌더링 힌트를 제공함으로써 페인팅 부하를 최소화하고 부드러운 60fps 애니메이션을 확보했습니다.",
          codeSnippet: {
            filename: "JudgeResultPhase.css",
            language: "css",
            code: "/* ✅ Reflow(레이아웃 재계산)를 유발하지 않는 GPU 가속 기반 애니메이션 최적화 */\n@keyframes elastic-zoomies {\n  0% { transform: scale(0); opacity: 0; }\n  60% { transform: scale(1.1); opacity: 1; }\n  100% { transform: scale(1); opacity: 1; }\n}\n\n@keyframes slide-in-right {\n  0% { transform: translateX(100%) scale(0.5); opacity: 0; }\n  100% { transform: translateX(0) scale(1); opacity: 1; }\n}\n\n.judge-card-mini {\n  /* will-change로 브라우저 엔진에 렌더링 힌트 제공 */\n  will-change: transform, opacity;\n  animation: elastic-zoomies 0.5s both;\n}"
          }
        }
      ]
    },
    {
      id: "ssaiet",
      title: "SSAIET",
      type: "SSAFY 1학기 최종 프로젝트",
      period: "2025.12.01 ~ 2025.12.26",
      teamSize: "2인",
      tech: ["Vue.js", "Pinia", "Python", "Django DRF", "JWT", "Kakao Map API"],
      role: "FE/BE 풀스택 개발 (회원, 커뮤니티, 카카오맵)",
      description: "Django와 Vue.js를 활용한 사용자 맞춤형 식단 관리 및 커뮤니티 플랫폼",
      impactLine: "JWT 인증 파이프라인 설계로 IDOR 취약점을 원천 방어하고, 카카오맵 SDK 비동기 메모리 누수를 직접 해결한 헬스케어 서비스",
      detailedDescription: "SSAFY 멀티캠퍼스 교육생들이 당일 섭취한 점심(20층 식단 API) 칼로리를 기반으로 저녁 식단을 추천/설계해주는 개인 맞춤형 헬스케어 서비스입니다. Vue.js를 활용하여 전체적인 초록색 톤앤매너와 브랜드 UI를 기획/구현했으며, Kakao Map API를 연동해 주변 건강 식당 탐색 기능을 개발했습니다. 백엔드(Django)에서는 회원 도메인과 커뮤니티를 전담 구축하고 전체 시스템의 JWT 인증 및 권한(Authorization) 흐름을 상세하게 설계했습니다.",
      image: "/SSAIETMAIN.png",
      github: "https://github.com/kkaemong/SSAIET",
      keyResult: [
        "보안 규격(JWT)에 기반한 강력한 사용자 인증-인가 체계를 서버 중심 설계로 구축하여 데이터 권한 상승 취약점(IDOR) 원천 방어",
        "다형성 관계의 중첩 데이터 구조(Nested JSON)를 안정적으로 생성/수정하기 위해 커스텀 Writable Serializer 파이프라인 구현",
        "SPA 특유의 SDK 비동기 로딩 레이스 컨디션 해결 및 가비지 컬렉션 강제를 통해 브라우저 메모리 누수 방어"
      ],
      troubleshooting: [
        {
          title: "JWT 인증 파이프라인 흐름 제어 및 권한 우회(IDOR) 차단",
          problem: "사용자가 회원가입을 마치면 곧바로 신체 구조(키, 몸무게 등)를 입력하는 온보딩 페이지로 넘어가야 했으나, 토큰만 발급된 채 메인화면으로 우회되는 흐름 에러가 발생했습니다. 또한, 단순 API 파라미터만 변조하면 다른 유저의 신체 정보나 게시글까지 수정할 수 있는 IDOR(수직/수평 권한 상승) 취약점이 확인되었습니다.",
          solution: "클라이언트 단(Vue)에서는 Pinia와 Router Guard를 연동하여 '프로필 미완성 상태'인 유저는 무조건 온보딩으로 강제 이동되도록 인증 흐름을 재설계했습니다. 서버 단(Django)에서는 파라미터가 아닌, 검증된 JWT 토큰 내부의 request.user 객체를 추출하여 수정하려는 데이터의 소유권(Owner ID)과 교차 검증하는 시큐어 코딩을 전면 도입했습니다.",
          codeSnippet: {
            filename: "views.py",
            language: "python",
            code: "from rest_framework.permissions import IsAuthenticated\nfrom rest_framework.response import Response\nfrom rest_framework.decorators import api_view, permission_classes\n\n@api_view(['PUT'])\n@permission_classes([IsAuthenticated])\ndef update_body_info(request):\n    # JWT 토큰을 통해 무결성이 검증된 request.user 객체를 신뢰 객체로 사용\n    user = request.user\n    \n    # 클라이언트가 보낸 Body ID 파라미터에 의존하지 않고, 직접 접속된 user 인스턴스를 업데이트 (IDOR 방어)\n    user.height = request.data.get('height')\n    user.weight = request.data.get('weight')\n    user.save()\n    \n    return Response({\"message\": \"신체 정보가 안전하게 업데이트되었습니다.\", \"user_id\": user.id})"
          }
        },
        {
          title: "다형성(Polymorphic) 관계의 Writable Nested Serializer 오버라이딩",
          problem: "커뮤니티 게시글 등록 시 식당추천, 변화후기 등 카테고리별로 상이한 상세 정보가 하위 JSON 데이터 형태로 인입되었습니다. 그러나 DRF의 기본 ModelSerializer는 이와 같이 계층화된 중첩(Nested) 객체를 자동으로 생성해주지 못하고 TypeError를 던지며 등록에 실패하는 구조적 한계가 발생했습니다.",
          solution: "CommunityPostSerializer 내부의 create()와 update() 라이프사이클 메서드를 직접 커스텀 오버라이딩하여 해결했습니다. 상위 데이터 세이브 전, dict.pop() 메서드로 중첩 상세 데이터(restaurant_info, review_info)를 안전하게 추출하여 은닉했습니다. 부모 게시글이 트랜잭션으로 안전하게 저장된 것을 보장한 뒤, 분기 처리를 통해 생성된 ID와 연동되는 하위 자식 테이블 레코드를 수동으로 삽입하는 시큐어 파이프라인을 구축했습니다.",
          codeSnippet: {
            filename: "serializers.py",
            language: "python",
            code: "class CommunityPostSerializer(serializers.ModelSerializer):\n    # ... 상세 Nested Serializer 관계 설정 완료 ...\n\n    def create(self, validated_data):\n        # ❌ TypeError 방지를 위해 중첩된 하위 상세 데이터들을 먼저 pop 처리\n        restaurant_data = validated_data.pop('restaurant_info', None)\n        review_data = validated_data.pop('review_info', None)\n        \n        # ✅ 부모 엔티티(CommunityPost) 먼저 트랜잭션 세이브\n        post = CommunityPost.objects.create(**validated_data)\n        \n        # ✅ 카테고리 분기에 맞추어 하위 자식 테이블에 데이터 적재 완료\n        if post.category == 'RESTAURANT' and restaurant_data:\n            RestaurantRecommendation.objects.create(post=post, **restaurant_data)\n        elif post.category == 'REVIEW' and review_data:\n            ChangeReview.objects.create(post=post, **review_data)\n            \n        return post"
          }
        },
        {
          title: "SPA 환경의 카카오맵 비동기 렌더링 동기화 및 메모리 누수 방어",
          problem: "단일 페이지 애플리케이션(SPA) 구조에서 브라우저가 외부 Kakao Map SDK 스크립트를 다운로드하기 전에 Vue 컴포넌트가 마운트되면서 'kakao is not defined' 런타임 에러가 발생하는 비동기 동기화 병목이 발생했습니다. 또한, 지도 검색 및 카테고리 갱신 시 기존 지도 상의 마커(Marker) 객체들이 DOM 및 그래픽 버퍼(VRAM)에서 적절히 회수되지 않고 쌓이는 메모리 누수(Memory Leak) 현상이 존재했습니다.",
          solution: "index.html에 무조건 스크립트를 올리지 않고, KakaoMap 컴포넌트 마운트(onMounted) 훅 시점에 동적으로 script 요소를 생성하고 로드하는 방식으로 최적화했습니다. 스크립트 쿼리에 autoload=false를 장착하여 로드가 끝난 시점의 onload 콜백에서 window.kakao.maps.load()를 안전하게 실행해 동기화 꼬임 현상을 차단했습니다. 또한 마커를 갱신할 때마다 기존 마커 배열을 순회하며 setMap(null)을 호출해 브라우저 가비지 컬렉터(GC)를 유도하여 메모리 누수를 완전히 방지했습니다.",
          codeSnippet: {
            filename: "KakaoMap.vue",
            language: "javascript",
            code: "// ❌ 마커 리렌더링 시 기존 GPU 버퍼 비우기 (Garbage Collection 강제)\nconst clearMarkers = () => {\n  markers.forEach(m => m.setMap(null));\n  markers = [];\n};\n\n// ✅ Vue 라이프사이클 마운트 훅에서 비동기 SDK 스크립트 완벽 동기화\nonMounted(() => {\n  const script = document.createElement(\"script\");\n  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&autoload=false&libraries=services`;\n  \n  script.onload = () => {\n    // 브라우저에 SDK 완벽 주입을 보장한 뒤 맵 생성 트리거\n    window.kakao.maps.load(() => {\n      map = new kakao.maps.Map(document.getElementById(\"map\"), {\n        center: new kakao.maps.LatLng(CAMPUS.lat, CAMPUS.lng),\n        level: 3\n      });\n      ps = new kakao.maps.services.Places(map);\n      filterByCategory(\"FD6\"); # 초기 리스트 렌더링\n    });\n  };\n  document.head.appendChild(script);\n});"
          }
        }
      ]
    },
    {
      id: "aichallenge",
      title: "SSAFY AI Challenge",
      type: "SSAFY 교내 경진대회",
      period: "2026.04.15 ~ 2026.04.18",
      teamSize: "4인",
      tech: ["Python", "PyTorch", "LLM", "VLM", "PEFT", "LoRA"],
      role: "이미지/텍스트 동시 이해 모델 개발",
      description: "Qwen2.5-VL 기반 모델링을 통해\n이미지와 텍스트를 동시에 이해하고 문제를 해결하는 AI 프로젝트",
      impactLine: "단일 24GB GPU 제약에서 LoRA 도입으로 7B 모델 OOM 없이 파인튜닝, 정확도 0.75 → 0.81 달성한 4일 해커톤",
      detailedDescription: "주어진 컴퓨팅 자원 내에서 오픈소스 거대 언어 모델(LLM)과 비전 언어 모델(VLM)을 타겟 도메인에 맞게 파인튜닝하는 해커톤 프로젝트입니다. 단일 24GB GPU라는 하드웨어적 한계를 극복하기 위해 파라미터 효율적 튜닝(PEFT)과 LoRA(Low-Rank Adaptation) 기법을 도입했으며, 베이스라인 코드의 메모리 병목을 분석하고 최적화하는 엔지니어링에 매진했습니다. 이를 통해 훈련 안정성을 확보하여 성공적인 실험 결과를 도출하고 주도적으로 팀 발표를 이끌었습니다.",
      image: "/AIchallange.png",
      github: "https://github.com/kkaemong/SSAFY-AI-Challenge",
      keyResult: [
        "LoRA 파라미터 0.1% 압축 기법을 도입하여, 하드웨어 제약(24GB 단일 GPU) 속에서도 OOM 없이 7B 규모 거대 모델의 안정적인 파인튜닝 완수",
        "배치 사이즈, 스케줄러, 혼합 정밀도 등 훈련 루프 전반을 직접 최적화하여 4일이라는 짧은 기한 내에 최종 모델 정확도를 0.75에서 0.81로 성공적으로 향상시킴"
      ],
      troubleshooting: [
        {
          title: "파라미터 효율적 튜닝 (LoRA 도입)",
          problem: "제공된 베이스라인 코드 그대로 LLM 모델 전체를 튜닝(Full Fine-Tuning)하려고 시도했으나, GPU 메모리(VRAM) 한계를 견디지 못하고 계속해서 CUDA Out of Memory 에러가 발생하며 훈련 프로세스가 강제 종료되었습니다.",
          solution: "제한된 자원에서 학습을 우회 성공시키기 위해 PEFT 라이브러리의 LoRA 기법을 코드에 접목시켰습니다. 기학습된 무거운 메인 파라미터 텐서는 동결 처리하고 핵심 어텐션 큐 어댑터만 새롭게 업데이트하도록 코드를 Develop했습니다. 이를 통해 역전파 시 훈련 파라미터 비중을 0.1% 수준으로 대폭 낮추고 OOM 없이 모델 튜닝을 성사시켰습니다.",
          codeSnippet: {
            filename: "train_lora.py",
            language: "python",
            code: "# ❌ [변경 전] 무거운 7B 파라미터 전체 풀-튜닝 시도 (OOM 발생)\nmodel = AutoModelForCausalLM.from_pretrained(\"Qwen/Qwen2.5-VL\")\noptimizer = torch.optim.AdamW(model.parameters(), lr=1e-4)\n\n# ✅ [변경 후] PEFT & LoRA 도입: 훈련 파라미터 0.1% 압축\nfrom peft import LoraConfig, get_peft_model\n\npeft_config = LoraConfig(\n    r=8,\n    lora_alpha=32,\n    target_modules=[\"q_proj\", \"v_proj\"], # 핵심 Attention 모듈 타겟팅\n    lora_dropout=0.05,\n    bias=\"none\",\n    task_type=\"CAUSAL_LM\"\n)\n\n# 기존 모델 아키텍처에 경량화 어댑터 장착\nmodel = get_peft_model(base_model, peft_config)"
          }
        },
        {
          title: "DataLoader 병목 최적화 및 OOM 방어",
          problem: "거대한 모델 파라미터로 인해 batch_size=2에서도 즉각적인 OOM이 발생하고, num_workers=2 세팅 시 멀티프로세싱 충돌이 발생",
          solution: "물리적 배치 사이즈를 1로 줄이고 워커를 0으로 세팅하여 메모리 초과 및 충돌을 원천 차단하는 안정적인 학습 환경 구축",
          codeSnippet: {
            filename: "train_loader.py",
            language: "python",
            code: "# ❌ [변경 전] 물리적 배치 2 및 멀티프로세싱 유지 (즉각적 OOM 및 데드락 발생)\ntrain_loader = DataLoader(train_ds, batch_size=2, num_workers=2, pin_memory=True)\nvalid_loader = DataLoader(valid_ds, batch_size=2, num_workers=2, pin_memory=True)\n\n# ✅ [변경 후] 물리적 배치 최소화 및 워커 비활성화 (학습 환경 안정화)\ntrain_loader = DataLoader(train_ds, batch_size=1, num_workers=0)\nvalid_loader = DataLoader(valid_ds, batch_size=1, num_workers=0)"
          }
        },
        {
          title: "학습 안정화 및 하이퍼파라미터 사이클 최적화",
          problem: "fp16 사용 시 Loss NaN 발생, 양자화(8bit) 옵티마이저 충돌, 그리고 에포크 2 및 웜업 10%로 인한 학습 시간 지연",
          solution: "bfloat16 스케일러로 안정성을 확보하고, 에포크(2→1), 웜업(10%→3%), GRAD_ACCUM(8→4)을 깎아내어 기한 내 가장 최적화된 사이클 도출",
          codeSnippet: {
            filename: "train_loop.py",
            language: "python",
            code: "# ❌ [변경 전] 불안정한 하이퍼파라미터 및 비효율적 스케줄링 (Loss NaN 발생)\nGRAD_ACCUM = 8\noptimizer = bnb.optim.AdamW8bit(model.parameters(), lr=5e-5, weight_decay=0.01)\nscheduler = get_linear_schedule_with_warmup(optimizer, int(steps*0.1), steps)\n\nfor epoch in range(2):\n    # fp16의 좁은 표현 범위로 인한 오버플로우 발생\n    with torch.cuda.amp.autocast(dtype=torch.float16):\n        ...\n\n# ✅ [변경 후] 수렴 속도 극대화 및 bfloat16 스케일링 (학습 안정화 완료)\nGRAD_ACCUM = 4\noptimizer = torch.optim.AdamW(model.parameters(), lr=1e-4)\nscheduler = get_linear_schedule_with_warmup(optimizer, int(steps*0.03), steps)\n\nfor epoch in range(1):\n    # 더 넓은 지수부를 가진 bf16으로 전환하여 에러 방어\n    with torch.cuda.amp.autocast(dtype=torch.bfloat16):\n        ..."
          },
          imageUrl: "https://github.com/user-attachments/assets/0bfa916b-c680-4c27-90bd-93eed793dcfd"
        }
      ]
    },
    {
      id: "webhacking",
      title: "Web Hacking Project",
      type: "K-Shield Jr 11기 프로젝트",
      period: "2023.10.02 ~ 2023.10.31",
      teamSize: "6인",
      tech: ["Burp Suite", "SQLMap", "OWASP TOP 10", "보안 & 모의해킹"],
      role: "웹 애플리케이션 모의 해킹 및 취약점 분석",
      description: "취약점 분석을 통해 보안 취약점을 진단하고 대응 방안을 수립한 보안 프로젝트",
      impactLine: "OWASP Top 10 기반 모의 침투로 인증 우회·SQL 인젝션 등 4대 취약점을 실증하고 보안 권고 리포트를 작성한 K-Shield Jr 프로젝트",
      detailedDescription: "제공된 보안 취약 웹사이트를 대상으로 OWASP TOP 10 기반의 체계적인 모의 침투를 수행한 실무 정보보안 프로젝트입니다. Burp Suite와 SQLMap을 활용하여 팀원들과 공격 범위를 세분화하고, 불충분한 인증(2FA 우회), 대량 문자열 삽입에 의한 버퍼 오버플로우, SQL 인젝션 등을 집요하게 식별했습니다. 도출된 취약점의 공격 시나리오를 구체화하고 즉각적인 보안 패치 권고사항을 담은 종합 리포트를 작성했습니다.",
      image: "/kshield.png",
      github: "https://github.com/kkaemong/Web-Hacking-Pjt",
      keyResult: [
        "OWASP TOP 10 기반 모의 침투를 통해, 시스템의 인증/인가 로직 전반을 무력화하는 4대 핵심 보안 결함 완벽 증명",
        "모의 해킹 결과 및 취약점별 보안 권고사항을 문서화한 종합 진단 리포트 작성"
      ],
      troubleshooting: [
        {
          title: "관리자 계정 해시 복호화 및 평문 크래킹 성공",
          problem: "취약 타겟 사이트에서 관리자 해시값을 탈취하는 데 성공했으나, 일반적인 Brute Force 공격으로는 복호화 시간이 기하급수적으로 길어져 더 깊은 경로로의 침투가 완전히 정체되었습니다.",
          solution: "DB 테이블(hm_admin_tb)에서 추출한 MD5 해시 데이터(8d38...)를 복호화 툴에 대입해 'kisec123!@'라는 평문 패스워드를 알아내는 해킹 시연 과정을 레포트에 기록했습니다.",
          imageUrl: "/관리자 계정 복호화.png"
        },
        {
          title: "비정상 입력값에 의한 로그인 인증 강제 우회 (버퍼 오버플로우)",
          problem: "탈취한 계정 정보 없이도, 로그인 폼의 입력값 검증 부재를 악용한 SQL 인젝션 우회나 버퍼 오버플로우 공격이 가능한지 검증해야 했습니다.",
          solution: "이메일 필드에 특수기호(')가 포함된 대량의 문자열을 전송했을 때, 서버가 '로그인 되었습니다'라며 인증을 강제 통과시키는 결함을 시연하고 레포트에 기록했습니다.",
          imageUrl: "/버퍼 오버 플로우.png"
        },
        {
          title: "비밀번호 복잡도 검증 부재 및 약한 문자열 강도 입증",
          problem: "사용자 계정 탈취를 예방하기 위한 기본적인 패스워드 복잡도(Complexity) 검증 로직이 서버에 제대로 구현되어 있는지 진단해야 했습니다.",
          solution: "비밀번호 변경 시 단 4자리 숫자('1234')만 입력했음에도 '회원정보를 수정하였습니다'라며 서버가 승인해버리는 심각한 정책 부재를 확인하고 레포트에 기록했습니다.",
          imageUrl: "/약한 문자열 강도.png"
        },
        {
          title: "타사(Naver) 인증 로직 비교를 통한 보안 아키텍처 제안",
          problem: "OWASP 보안 진단 가이드라인에 따라, '나의 강의실'이나 '회원정보 수정' 등 민감한 권한이 요구되는 페이지 접근 시 세션 재검증 로직이 안전하게 구현되어 있는지 평가해야 했습니다.",
          solution: "네이버(NAVER)의 2단계 인증 프롬프트를 모범 사례로 가져와, 타겟 사이트의 결함 화면과 비교 분석하여 세션 재검증 패치 권고사항을 레포트에 기록했습니다.",
          imageUrl: "/불충분한 인증2.png"
        }
      ]
    }
  ],
  experience: [
    {
      id: 1,
      title: "SSAFY AI 아카데미 14기",
      period: "2025.07 ~ 현재",
      content: "Python 트랙 수료 및 웹/게임 부문 프로젝트 개발"
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
    message: "함께 성장하며 빈틈없이 견고한 서비스를 만들어나갈 동료를 기다립니다."
  },
  certifications: []
};
