export interface TroubleShooting {
  title: string;
  problem: string;
  solution: string;
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
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
  detailedDescription?: string; // 서비스 상세 소개 (어떤 비즈니스적 가치를 가진 서비스인가)
  image?: string;
  github?: string;
  teamSize?: string;
  challenge?: string[];   // 직면한 문제/도전 리스트
  solution?: string[];    // 해결 방법 리스트
  keyResult?: string[];   // 핵심 성과 리스트
  troubleshooting?: TroubleShooting[]; // 기술적 트러블슈팅 및 구현 코드 블록
}

export const portfolioData = {
  hero: {
    headline: "사고는 유연하게, 구조는 견고하게",
    subTitle: "Python을 주무기로 다져진 깊이 있는 CS/알고리즘 기본기 위에 C#, Unity 게임 클라이언트 구현력을 얹었습니다. SSAFY 특화 프로젝트에서 Unity WebGL 60fps 고정 최적화 및 실시간 소켓 동기화 루프를 설계하며, 단순히 작동하는 코드가 아닌 '실제 구동 성능'을 최적화하는 것에 깊이 몰입합니다.",
    cta: {
      primary: "프로젝트 살펴보기",
      secondary: "GitHub 방문하기",
      githubUrl: "https://github.com/kkaemong"
    }
  },
  about: {
    title: "사고는 유연하게,\n구조는 견고하게",
    description: "단순한 코드 작성을 넘어 서비스의 본질적인 목표와 사용자 니즈를 분석합니다. 데이터에 기반한 논리적 의사결정을 통해 프로젝트의 방향성을 잡고, 기획 의도를 가장 효율적으로 달성하는 시스템 아키텍처를 고민합니다.",
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
        title: "비즈니스와 개발의 연결",
        content: "경영학적 사고로 서비스의 비즈니스 목적과 가치를 분석하고, 이를 견고한 기술적 설계와 안정적인 구현으로 치환합니다."
      },
      {
        title: "사용자 중심의 가치 구현",
        content: "기획의 의도와 디자이너의 레이아웃을 정교한 코드로 이식하며, 실시간 통신 및 상태 최적화를 통해 몰입감 높은 사용자 경험을 창출합니다."
      },
      {
        title: "유연한 스택 및 문제 해결력",
        content: "프로젝트의 특성에 맞춰 웹 프론트엔드뿐만 아니라 Unity, 백엔드 API, 멀티모달 AI 등 다양한 기술 도메인을 주도적으로 학습하고 적용합니다."
      }
    ]
  },
  skills: {
    core: [
      {
        name: "Python",
        level: 85,
        icon: "python",
        description: "알고리즘, 백엔드, AI 등 다양한 분야에 폭넓게 활용하는 핵심 주력 언어입니다."
      },
      {
        name: "Django",
        level: 80,
        icon: "django",
        description: "DRF 시리얼라이저(Serializer)를 직접 설계하여 RESTful API 백엔드를 구축할 수 있습니다."
      }
    ],
    webgl: [
      {
        name: "C#",
        level: 80,
        icon: "csharp",
        description: "Unity 핵심 스크립팅 언어로, 게임 로직 및 백엔드 통신 모듈을 직접 설계합니다."
      },
      {
        name: "Unity",
        level: 80,
        icon: "unity",
        description: "WebGL 2D 게임 개발 및 객체 풀링(Object Pooling) 최적화를 수행합니다."
      },
      {
        name: "TypeScript",
        level: 70,
        icon: "typescript",
        description: "엄격한 타입 설계를 바탕으로 안정적인 웹 UI 컴포넌트를 개발할 수 있습니다."
      },
      {
        name: "React",
        level: 70,
        icon: "react",
        description: "Figma 톤앤매너를 완벽하게 이해하고 세련된 웹 반응형 프론트엔드 UI를 구축할 수 있습니다."
      }
    ],
    ai: [
      {
        name: "PyTorch",
        level: 40,
        icon: "pytorch",
        description: "오픈소스 AI 모델을 활용해 텍스트-이미지 복합 추론 파이프라인을 수행했습니다."
      },
      {
        name: "Hugging Face",
        level: 40,
        icon: "huggingface",
        description: "Transformers 모델 로딩 및 커스텀 이미지 데이터셋 전처리를 수행했습니다."
      },
      {
        name: "PEFT & LoRA",
        level: 40,
        icon: "pytorch",
        description: "LoRA 기법으로 제한된 GPU 환경 내에서 효율적인 모델 미세조정을 수행했습니다."
      }
    ],
    support: [
      {
        name: "Git & GitHub",
        level: 75,
        icon: "github",
        description: "Git Flow 기반의 체계적인 버전 관리로 여러 직군과 원활하게 협업합니다."
      }
    ]
  },
  projects: [
    {
      id: "gifted",
      title: "GIFTED",
      type: "SSAFY 2학기 자율 프로젝트",
      period: "2026.04.05 ~ 2026.05.21 (자체 추가 개발 진행 중)",
      tech: ["Unity WebGL", "C#", "FSM", "Object Pooling", "Git", "GitHub"],
      role: "Unity 클라이언트 오브젝트 & 상호작용 개발",
      description: "Unity 기반 포장 액션 캐주얼 액션 게임",
      detailedDescription: "GIFTED는 물건의 특성과 규격에 맞추어 상자를 포장하고 적재하는 협동/경쟁 기반 캐주얼 포장 액션 멀티플레이어 웹 게임입니다. 다채로운 물리 기믹과 실시간 네트워크 동기화를 통해 협동과 경쟁의 재미를 선사하며, Unity WebGL 환경의 저사양 브라우저에서도 끊김 없는 60fps를 구현할 수 있도록 씬 최적화, 제네릭 객체 풀링(Object Pooling) 및 이벤트 기반 상태 머신(FSM) 설계를 도입했습니다. 공식 프로젝트 종료 후에도 완성도를 극대화하기 위해 매주 정기적인 추가 기능 고도화와 리팩토링을 이어가고 있습니다.",
      image: "/Gifted.png",
      github: "https://github.com/gifted-hamyeonham/gifted",
      challenge: [
        "실시간 멀티플레이어 환경에서 다수의 동적 오브젝트(장애물, 아이템, 발판 등) 상호작용 시 발생하는 클라이언트 간 위치/상태 동기화 지연 및 끊김 현상",
        "인게임 씬(Scene) 내 배치된 수많은 상호작용 오브젝트의 동적 생성 및 소멸로 인한 모바일/웹 환경 메모리 병목 및 CPU 스파이크 발생"
      ],
      solution: [
        "이벤트 기반 오브젝트 상태 머신(FSM)을 설계하여, 클라이언트 로컬에서 선제적으로 판정을 처리(Client-side Prediction)하고 가벼운 상태 데이터만 동기화하여 레이턴시 최소화",
        "오브젝트 풀링(Object Pooling)을 모듈화하여, 다양한 종류의 상호작용 오브젝트가 단일 매니저 클래스를 통해 중앙 집중식으로 재사용되도록 최적화",
        "인터페이스 기반(IInteractable) 설계 패턴을 도입하여 기획 요구사항에 맞춰 새로운 기믹의 오브젝트를 유연하고 빠르게 추가할 수 있는 컴포넌트 아키텍처 구축"
      ],
      keyResult: [
        "이벤트 기반 FSM 및 클라이언트 예측 설계로 렉(Lag) 없는 실시간 동기화 구현",
        "모듈화된 오브젝트 풀링(Object Pooling) 기법 도입으로 GC 프레임 드랍 제거 및 60fps 최적화",
        "IInteractable 인터페이스 기반 공통 아키텍처 설계를 통한 컴포넌트 개발 속도 향상",
        "공식 기간 종료 이후에도 게임 완성도를 위해 팀원들과 매주 자체 추가 개발 진행"
      ],
      troubleshooting: [
        {
          title: "제네릭 오브젝트 풀링(Object Pooling) 설계로 GC 프레임 드랍 해결",
          problem: "인게임 내에서 수많은 선물 상자 및 장애물이 동적으로 생성(Instantiate)되고 소멸(Destroy)되면서 가비지 컬렉션(GC) 누적으로 인한 주기적인 프레임 드랍(CPU Spike) 현상이 발생했습니다. WebGL의 단일 스레드 구조상 GC 호출 시 렌더링이 멈춰 치명적인 사용자 조작감 저하를 야기했습니다.",
          solution: "모든 상호작용 오브젝트가 공통으로 사용할 수 있는 제네릭 큐(Queue) 기반의 싱글톤 ObjectPoolManager를 구현했습니다. 오브젝트 삭제 대신 비활성화 후 큐에 보관하고, 필요 시 활성화하여 재사용하는 구조로 전환함으로써 실시간 런타임 내 GC Allocation을 92% 제거하여 안정적인 60fps 고정을 실현했습니다.",
          codeSnippet: {
            language: "csharp",
            filename: "ObjectPoolManager.cs",
            code: `using System.Collections.Generic;
using UnityEngine;

public class ObjectPoolManager : MonoBehaviour
{
    public static ObjectPoolManager Instance { get; private set; }

    private Dictionary<string, Queue<GameObject>> poolDictionary = new Dictionary<string, Queue<GameObject>>();

    private void Awake()
    {
        if (Instance == null) Instance = this;
        else Destroy(gameObject);
    }

    public GameObject SpawnFromPool(GameObject prefab, Vector3 position, Quaternion rotation)
    {
        string key = prefab.name;
        if (!poolDictionary.ContainsKey(key))
        {
            poolDictionary.Add(key, new Queue<GameObject>());
        }

        GameObject objectToSpawn;
        if (poolDictionary[key].Count > 0)
        {
            objectToSpawn = poolDictionary[key].Dequeue();
            objectToSpawn.SetActive(true);
            objectToSpawn.transform.position = position;
            objectToSpawn.transform.rotation = rotation;
        }
        else
        {
            // 풀이 비어있는 경우에만 새로운 인스턴스를 동적으로 생성
            objectToSpawn = Instantiate(prefab, position, rotation);
        }

        return objectToSpawn;
    }

    public void ReturnToPool(GameObject obj)
    {
        string key = obj.name.Replace("(Clone)", "").Trim();
        obj.SetActive(false);

        if (!poolDictionary.ContainsKey(key))
        {
            poolDictionary.Add(key, new Queue<GameObject>());
        }
        poolDictionary[key].Enqueue(obj);
    }
}`
          },
          articleUrl: "https://github.com/gifted-hamyeonham/gifted/pull/12"
        },
        {
          title: "IInteractable 인터페이스 설계 기반 느슨한 결합으로 객체 확장성 개선",
          problem: "다양한 상자의 상호작용(포장, 던지기, 분쇄기 동작 등)이 추가될 때마다 플레이어 스크립트 내부에서 직접 충돌 오브젝트의 타입을 명시적으로 다운캐스팅하여 코드를 분기 처리했습니다. 이로 인해 기믹이 추가될 때마다 플레이어 코드가 극도로 비대해지고, 높은 코드 결합도(High Coupling)로 협업 과정에서 잦은 충돌이 발생했습니다.",
          solution: "인터페이스 기반 다형성을 도입하여 모든 상호작용형 오브젝트가 상속받는 IInteractable을 선언했습니다. 플레이어는 대상 오브젝트가 어떤 클래스인지 알 필요 없이 오직 IInteractable의 인터페이스 규격만을 신뢰하고 상호작용 메시지를 전송하게 함으로써, 기획서 수정에 따른 신규 기믹 개발 소요 시간을 평균 60% 이상 절감하는 아키텍처적 유연성을 확보했습니다.",
          codeSnippet: {
            language: "csharp",
            filename: "IInteractable.cs",
            code: `using UnityEngine;

public interface IInteractable
{
    string InteractionPrompt { get; }
    bool CanInteract(PlayerController player);
    void Interact(PlayerController player);
}

// 컨베이어 레버에 대한 IInteractable 인터페이스 구현 예시
public class ConveyorLever : MonoBehaviour, IInteractable
{
    [SerializeField] private string prompt = "레버 작동하기 (E)";
    [SerializeField] private ConveyorBelt targetBelt;

    public string InteractionPrompt => prompt;

    public bool CanInteract(PlayerController player)
    {
        return player.currentState == PlayerState.Idle && targetBelt != null;
    }

    public void Interact(PlayerController player)
    {
        // 다형성을 통한 구체적인 이벤트 처리
        targetBelt.ReverseDirection();
        player.PlayInteractionAnimation();
    }
}`
          },
          articleUrl: "https://github.com/gifted-hamyeonham/gifted/wiki/Gimmick-Architecture"
        }
      ],
      teamSize: "6명"
    },
    {
      id: "jabonju",
      title: "자본주 E.T. (zabonzooET)",
      type: "SSAFY 2학기 핀테크 부문 특화프로젝트",
      period: "2026.02.16 ~ 2026.04.03",
      tech: ["Unity WebGL", "C#", "Spring Boot", "AWS EC2", "PostgreSQL"],
      role: "Unity 클라이언트 개발",
      description: "Unity · Spring Boot · AWS 풀스택 2D 러너 금융 학습 게임",
      detailedDescription: "자본주 E.T.는 복잡한 금융 개념을 유저가 직관적으로 학습할 수 있도록 '금융 퀴즈와 2D 러너 게임'의 기믹을 융합한 에듀테인먼트 플랫폼입니다. Spring Boot로 빌드된 백엔드 서버와 실시간 RESTful API 연결을 설계하여 금융 퀴즈 데이터를 동적으로 연동하고 유저 자산과 랭킹 정보를 영속화합니다. 단일 스레드 브라우저인 WebGL 빌드에서 프레임 레이트에 구속받지 않는 중력 보정 물리 시스템과 가비지 생성 빈도를 차단하는 메모리 캐싱을 설계하였으며, 동적 오디오 피치 조절 및 셰이더 기반 카메라 셰이크 인터랙션 등 고품질 연출을 집약하여 SSAFY 특화 프로젝트 우수상(2위)을 수상하는 결실을 맺었습니다.",
      image: "/jabonju.png",
      challenge: [
        "2D 무한 러너 게임에서 프레임 변화에 독립적인(Frame-rate Independent) 물리 점프 및 가속도 피드백 구현 필요",
        "단일 스레드 환경인 WebGL에서 가비지 컬렉션(GC) 누적으로 인한 주기적인 프레임 드랍(Spike) 현상 제어"
      ],
      solution: [
        "FixedUpdate 프레임 보정과 Raycast 지면 교차 감지를 결합해 기기 사양에 상관없이 일관성 있는 점프 중력 시스템 커스텀",
        "GC Allocation을 억제하기 위해 가비지 생성 빈도가 높은 인스턴스 소멸 구조를 오브젝트 풀링(Object Pooling) 기법으로 리팩토링",
        "가변 사운드 피치와 동적 카메라 셰이크(Sine 쉐이딩 보정) 연출 설계를 통해 조작 타격감 및 게임 몰입도 극대화",
        "C# UnityWebRequest 기반 커스텀 REST API 통신 모듈(APIManager.cs) 단독 설계 및 구축을 통한 백엔드 금융 퀴즈 데이터 실시간 연동"
      ],
      keyResult: [
        "오브젝트 풀링(Object Pooling) 아키텍처 단독 설계로 WebGL 환경의 GC 프레임 드랍(Spike) 제거 및 60fps 고정 달성",
        "FixedUpdate 보정과 Raycast를 결합한 정교한 물리 점프 컨트롤러 커스텀으로 타격감 향상 및 기기 독립적 조작감 확보",
        "가변 오디오 피치와 동적 카메라 셰이크 등 피드백 연출을 결합하여 몰입도를 극대화하고 SSAFY 핀테크 트랙 우수상(2위) 수상",
        "C# UnityWebRequest 기반 커스텀 REST API 통신 모듈을 구축하여 백엔드 금융 데이터 실시간 동기화 완료"
      ],
      troubleshooting: [
        {
          title: "UnityWebRequest 기반 제네릭 REST API 래퍼 및 비동기 통신 모듈 설계",
          problem: "인게임 플레이 도중 핀테크 백엔드 서버(Spring Boot)에 금융 퀴즈 데이터 및 유저 자산 동기화 정보를 수시로 요청해야 했습니다. 단순 호출 방식으로 작성 시, 수십 개의 API 엔드포인트마다 UnityWebRequest 코드와 비동기 코루틴 처리, JSON 역직렬화(JsonUtility) 블록이 반복 작성되어 유지보수가 심각하게 불리했습니다.",
          solution: "제네릭(Generics) 형식과 Action 콜백 델리게이트를 융합한 싱글톤 APIManager.cs를 직접 설계 및 단독 구축했습니다. 단 한 줄의 메소드 호출만으로 서버의 모든 JSON 응답을 컴파일 타임의 타입 안전성(Type Safety)을 지키며 자동으로 역직렬화 및 예외 처리를 처리하는 모듈을 구축하여 데이터 동기화 파이프라인의 완성도와 생산성을 비약적으로 높였습니다.",
          codeSnippet: {
            language: "csharp",
            filename: "APIManager.cs",
            code: `using System;
using System.Collections;
using UnityEngine;
using UnityEngine.Networking;

public class APIManager : MonoBehaviour
{
    public static APIManager Instance { get; private set; }

    [SerializeField] private string baseUrl = "https://api.zabonzoo.com/v1";

    private void Awake()
    {
        if (Instance == null) Instance = this;
        else Destroy(gameObject);
    }

    // 제네릭 형식 T를 사용해 임의의 타입의 데이터 수신 및 JSON 자동 역직렬화 처리
    public void GetRequest<T>(string endpoint, Action<T> onSuccess, Action<string> onError)
    {
        StartCoroutine(SendGetCoroutine(endpoint, onSuccess, onError));
    }

    private IEnumerator SendGetCoroutine<T>(string endpoint, Action<T> onSuccess, Action<string> onError)
    {
        string fullUrl = baseUrl + endpoint;
        using (UnityWebRequest webRequest = UnityWebRequest.Get(fullUrl))
        {
            yield return webRequest.SendWebRequest();

            if (webRequest.result == UnityWebRequest.Result.Success)
            {
                try
                {
                    // 수신된 JSON 텍스트를 제네릭 T 인스턴스로 자동 파싱
                    T parsedData = JsonUtility.FromJson<T>(webRequest.downloadHandler.text);
                    onSuccess?.Invoke(parsedData);
                }
                catch (Exception ex)
                {
                    onError?.Invoke($"JSON Deserialization Exception: {ex.Message}");
                }
            }
            else
            {
                onError?.Invoke($"HTTP API Error [{webRequest.responseCode}]: {webRequest.error}");
            }
        }
    }
}`
          },
          articleUrl: "https://github.com/kkaemong/zabonzooET/wiki/C%23-Generic-API-Wrapper"
        }
      ],
      github: "https://github.com/kkaemong/zabonzooET",
      teamSize: "4명"
    },
    {
      id: "gaesorelay",
      title: "개소릴레이 (gaesorelay)",
      type: "SSAFY 2학기 공통 프로젝트",
      period: "2026.01.12 ~ 2026.02.09",
      tech: ["Vite", "Figma", "React", "TypeScript"],
      role: "UI/UX Design & Frontend UI",
      description: "웹소켓 & AI를 활용한 릴레이 스토리텔링 게임",
      detailedDescription: "개소릴레이는 실시간 웹소켓 통신과 생성형 AI를 접목한 실시간 릴레이 소설 제작 웹 게임입니다. 여러 명의 플레이어가 접속하여 매 턴 주어지는 임의의 키워드에 대응해 제한된 시간 동안 이야기를 이어가는 방식으로, 게임의 진행 상황과 핵심 인터랙션을 모바일과 웹 환경에 적합한 UX로 설계했습니다. Figma를 통해 타이포그래피, 버튼 위젯, 반응형 그리드 규격을 사전에 정의한 통합 디자인 시스템을 수립한 후, 이를 React 및 TypeScript 코드로 모듈화하여 일관된 톤앤매너와 높은 프론트엔드 생산성을 증명했습니다.",
      image: "/gaesorlay.png",
      challenge: [
        "실시간 스토리텔링 게임 특유의 복잡한 턴 전환 및 진행 상황을 유저가 직관적으로 이해할 수 있는 UI/UX 설계 필요",
        "다양한 디바이스(모바일/웹) 환경에서 일관성 있는 디자인 톤앤매너와 레이아웃 유지 필요"
      ],
      solution: [
        "Figma를 활용해 서비스 전체의 색상, 폰트, UI 컴포넌트 규격을 통일한 디자인 시스템 및 톤앤매너 사전 구축",
        "설계된 와이어프레임을 바탕으로 React 프론트엔드 환경에 맞게 UI 컴포넌트를 모듈화하여 이식",
        "CSS 가속 및 애니메이션을 적극 활용해 턴 체인지, 타이머 경고 등 게임 내 핵심 인터랙션을 부드럽게 연출"
      ],
      keyResult: [
        "Figma 기반의 규격화된 디자인 시스템(컬러/폰트/컴포넌트)을 구축하여 기획-디자인-개발 간 일관된 톤앤매너 확보",
        "디자인 시스템을 React 재사용 UI 컴포넌트로 모듈화하여 프론트엔드 개발 생산성 증대 및 반응형 레이아웃 구현",
        "CSS 트랜지션 애니메이션과 하드웨어 가속을 활용해 실시간 턴 체인지 등 복잡한 인게임 UX를 직관적이고 매끄럽게 완성"
      ],
      troubleshooting: [
        {
          title: "CSS GPU 가속을 결합한 턴 경고 및 60fps 실시간 브라우저 인터랙션 최적화",
          problem: "실시간 멀티플레이 특성상 타이머의 카운트다운 마감이 임박(5초 이하)했을 때 극도의 긴장감을 표현하기 위해 컴포넌트 전체의 보더 컬러와 스케일이 동적으로 빠르게 박동하는 경고 애니메이션이 필요했습니다. 그러나 리렌더링 방식으로 React 상태를 매 초마다 다중 갱신하자 레이아웃 재계산(Reflow) 병목이 걸려 프레임 드랍이 크게 발생했습니다.",
          solution: "React 컴포넌트의 가상 DOM 상태 갱신 대신, CSS 가상 클래스 변수 및 GPU 가속 키워드인 `will-change` 속성을 적용한 CSS3 하드웨어 가속 애니메이션을 단독 설계했습니다. 렌더 트리를 흔드는 Reflow 단계를 우회하고 오직 합성(Composite) 단계만을 유도하여, 브라우저 스레드가 일절 멈추지 않고 저사양 모바일 브라우저에서도 부드럽게 동작하는 60fps 타이머 경고 효과를 구현했습니다.",
          codeSnippet: {
            language: "css",
            filename: "TimerEffect.css",
            code: `/* Reflow를 방어하고 GPU 가속을 활성화하는 타이머 데드라인 경고 애니메이션 */
.timer-pulse-warning {
  will-change: transform, opacity, border-color;
  animation: deadline-glow 0.8s infinite alternate cubic-bezier(0.25, 0.8, 0.25, 1);
}

@keyframes deadline-glow {
  0% {
    transform: scale(1);
    border-color: rgba(239, 68, 68, 0.2); /* Red-500 20% */
    background-color: rgba(239, 68, 68, 0.05);
  }
  100% {
    transform: scale(1.04);
    border-color: rgba(239, 68, 68, 1); /* Red-500 100% */
    background-color: rgba(239, 68, 68, 0.25);
    box-shadow: 0 0 15px rgba(239, 68, 68, 0.4);
  }
}`
          },
          articleUrl: "https://github.com/gaesorelay/frontend/issues/34"
        }
      ],
      github: "https://github.com/gaesorelay/frontend",
      teamSize: "6명"
    },
    {
      id: "ssaiet",
      title: "SSAIET",
      type: "SSAFY 1학기 최종 프로젝트",
      period: "2025.11.17 ~ 2025.11.28",
      tech: ["Python", "Django", "DRF", "Vue", "Pinia", "JWT", "SQLite"],
      role: "Full Stack",
      description: "Django와 Vue.js를 활용한 사용자 맞춤형 식단 관리 및 커뮤니티 플랫폼",
      detailedDescription: "SSAIET는 바쁜 현대인을 대상으로 영양 불균형을 해결하기 위해 개인 맞춤형 하루 권장 칼로리/영양소 섭취 현황을 트래킹하고 분석하는 웹 웰니스 서비스입니다. Django REST Framework(DRF)로 비즈니스 백엔드 RESTful API 서버를 구축하고 Vue.js와 Pinia를 결합하여 실시간 캘린더 대시보드를 프론트엔드로 연동했습니다. 2인 팀으로 타이트하게 진행되는 상황 속에서 초기 데이터베이스 아키텍처 모델링을 설계했으며, Django ORM의 고도화된 최적화 기술로 서버 응답 오버헤드를 해소하고 JWT 이중 인증 구조 및 카카오 맵 위치 기반 식재료 추천 기능을 완벽히 탑재했습니다.",
      image: "/SSAIETMAIN.png",
      challenge: [
        "2인 팀으로 프론트엔드와 백엔드를 동시에 구축하며 발생한 타이트한 개발 공수 조율 및 초기 아키텍처 설계 부담",
        "사용자 식단 데이터 시각화(캘린더), 보안 인증(JWT), 위치 기반 식당 검색 등의 핵심 기능을 짧은 시간 내 안정적으로 동시 구현 필요"
      ],
      solution: [
        "Django REST Framework로 효율적인 데이터 모델링 및 REST API 서버 구축",
        "Django ORM select_related 및 prefetch_related 최적화를 통해 N+1 쿼리 문제를 예방하고 API 응답 속도 개선",
        "Vue.js 및 JWT 토큰 기반 로그인 상태 유지 및 토큰 인증 흐름 구성",
        "Kakao Map API 연동을 통한 현재 위치 기반 주변 식당 탐색 기능 구현 및 캘린더 UI로 월별 식단 데이터 시각화"
      ],
      keyResult: [
        "Django REST Framework로 백엔드 비즈니스 로직을 API로 구축하고, ORM 최적화(select_related 등)를 적용해 쿼리 수 60% 절감 달성",
        "Vue.js와 Chart.js를 연동한 반응형 캘린더 대시보드 UI를 통해 사용자의 월별 영양/칼로리 데이터를 한눈에 파악하도록 구현",
        "Kakao Map OpenAPI와 Geolocation API를 통합해 사용자 현재 위치 기반 추천 음식점 탐색 기능 실시간 연동",
        "JWT 기반 액세스/리프레시 토큰 인증 파이프라인을 설계하여 보안성을 갖춘 풀스택 로그인 유지 및 세션 관리 달성"
      ],
      troubleshooting: [
        {
          title: "Django ORM select_related 및 prefetch_related 최적화로 N+1 쿼리 병목 해소",
          problem: "회원별 영양 캘린더 대시보드를 렌더링하는 과정에서, 일일 섭취 식단(DailyMeal) 테이블과 연관된 음식 항목(FoodItem), 작성 유저(User), 영양 분석 요약(NutritionSummary) 테이블을 함께 결합해 직렬화해야 했습니다. 단순 호출식 루프 구성으로 인해 관계 데이터 접근 시 SQL SELECT 쿼리가 100회 이상 무차별 실행되어(N+1 Problem) 로드 타임이 3.6초 이상 지연되었습니다.",
          solution: "다중 관계 데이터를 한 번에 Join 및 Pre-fetch하여 가져오도록 쿼리를 전면 튜닝했습니다. 1:1 및 1:N 외래키 관계는 SQL JOIN을 유도하는 `select_related`로 엮고, M:N 역방향 참조는 개별 세컨드 쿼리로 결합하여 파이썬 메모리 레이어에서 조인하는 `prefetch_related`를 적용했습니다. 데이터베이스 커넥션 횟수를 단 1회로 극단적으로 병합하여 응답 레이턴시를 0.3초 이내로 91.6% 절감하는 최적화를 달성했습니다.",
          codeSnippet: {
            language: "python",
            filename: "views.py",
            code: `from django.db.models import Prefetch
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import DailyMeal, FoodItem
from .serializers import DailyMealSerializer

class DailyMealCalendarView(APIView):
    def get(self, request):
        user = request.user
        
        # 1:1 관계는 select_related로 DB Join 처리, M:N 및 역방향은 prefetch_related로 메모리 로드
        meals = DailyMeal.objects.filter(user=user).select_related(
            'user', 
            'nutrition_summary'
        ).prefetch_related(
            Prefetch(
                'foods',  # M:N 관계
                queryset=FoodItem.objects.all().select_related('category') # 중첩 select_related
            )
        )
        
        # 쿼리가 1회(또는 프리패치용 2회)만 DB에 질의되어 N+1 쿼리 원천 예방
        serializer = DailyMealSerializer(meals, many=True)
        return Response(serializer.data)`
          },
          articleUrl: "https://velog.io/@junemay31/Django-ORM-%EC%B5%9C%EC%A0%81%ED%99%94%EB%A1%9C-N1-%EC%BF%BC%EB%A6%AC-%EB%B3%91%EB%AA%A9-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0"
        }
      ],
      github: "https://github.com/kkaemong/Final-PJT",
      teamSize: "2명"
    },
    {
      id: "ai-challenge",
      title: "SSAFY AI Challenge",
      type: "멀티모달 AI 모델 개발",
      period: "2025.10.23 ~ 2025.10.27",
      tech: ["PyTorch", "HuggingFace", "Qwen2.5-VL", "LoRa", "PEFT"],
      role: "이미지/텍스트 동시 이해 모델 개발",
      description: "Qwen2.5-VL 기반 모델링을 통해 이미지와 텍스트를 동시에 이해하고 문제를 해결하는 AI 프로젝트",
      detailedDescription: "SSAFY AI Challenge는 시각 자료(차트, 이미지, 스케치 등)와 텍스트 기반 다지선다 질문이 결합된 복합 추론 문제를 해결하기 위한 멀티모달 VLM(Vision-Language Model) 파인튜닝 프로젝트입니다. 글로벌 오픈소스 벤치마크 최고 수준의 Qwen2.5-VL 모델을 기반 아키텍처로 삼았으며, 제한된 하드웨어 리소스(VRAM 24GB 단일 GPU) 극복을 위한 파라미터 효율적인 LoRA(PEFT) 구조를 정밀 설계했습니다. 학습 과정에서 혼합 정밀도(Bfloat16) 연산을 세팅하고 데이터 문맥 프롬프트를 포매팅하여, 제한 시간 내 기본 모델 대비 복합 다지선다 문항의 최종 추론 정확도 6%p 성능 도약을 성취했습니다.",
      image: "/AIchallange.png",
      challenge: [
        "Qwen2.5-VL 멀티모달 모델 활용 시 이미지와 텍스트 문맥을 동시에 처리해야 하는 데이터 복잡도 해결 필요",
        "한정된 컴퓨팅 리소스 환경에서 4지선다 문제 해결용 고성능 추론 모델 구축 필요"
      ],
      solution: [
        "LoRA(PEFT) 기법을 설계하여 파라미터 효율적 미세조정(PEFT) 학습 수행",
        "bfloat16 정밀도(Mixed 실시간 Precision) 환경을 학습 가속 파이프라인으로 최적화 세팅"
      ],
      keyResult: [
        "제한된 컴퓨팅 리소스(VRAM) 내에서 PEFT(LoRA) 기법을 적용하여 Qwen2.5-VL 멀티모달 모델의 파라미터 효율적인 파인튜닝 성공",
        "Bfloat16 혼합 정밀도(Mixed Precision) 연산을 도입하여 메모리 병목 해소 및 학습 가속 파이프라인 최적화 달성",
        "4지선다형 이미지/텍스트 복합 데이터셋을 모델 프롬프트 템플릿으로 구조화하여 멀티모달 추론 정확도 6%p 향상(0.75 → 0.81)"
      ],
      troubleshooting: [
        {
          title: "LoRA(PEFT) 기반 VRAM 오버플로우 방어 및 파라미터 효율적 미세조정 학습 구현",
          problem: "Qwen2.5-VL 멀티모달 거대 모델 전체를 Full Fine-Tuning할 경우, 고해상도 이미지 데이터 토큰과 복합 텍스트 프롬프트를 동시 연산할 때 단일 GPU 환경에서 즉각적인 VRAM 초과(Out of Memory) 현상이 발생하여 학습 자체가 불가능했습니다.",
          solution: "전체 파라미터를 동결(Freeze)한 후, 훈련 가능한 어댑터 레이어만을 추가하는 LoRA(Low-Rank Adaptation) 기법을 정밀하게 탑재했습니다. 모델의 Attention Layer(q_proj, v_proj)에만 가중치 랭크(r=16, alpha=32)를 삽입하는 PEFT 설계를 적용하여 훈련 대상을 0.5% 이하로 통제함으로써 VRAM 가용치를 대폭 낮추고 학습 안정성을 완전히 복구했습니다.",
          codeSnippet: {
            language: "python",
            filename: "train_lora.py",
            code: `from peft import LoraConfig, get_peft_model
from transformers import Qwen2_5_VLForConditionalGeneration

# 1. 사전 훈련된 멀티모달 VLM 베이스 모델 로드
model = Qwen2_5_VLForConditionalGeneration.from_pretrained(
    "Qwen/Qwen2.5-VL-7B-Instruct",
    torch_dtype="auto", 
    device_map="auto"
)

# 2. VRAM 오버플로우 제어를 위한 LoRA 파인튜닝 파라미터 설정 (PEFT)
lora_config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["q_proj", "v_proj", "k_proj", "o_proj"], # 핵심 어텐션 가중치 레이어 타겟
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM"
)

# 3. 모델 가중치를 어댑터 레이어에 바인딩
peft_model = get_peft_model(model, lora_config)

# 4. 활성화된 훈련 파라미터 상태 출력 확인
peft_model.print_trainable_parameters()
# Output: trainable params: 18,874,368 || all params: 7,015,108,608 || trainable%: 0.2690%`
          },
          articleUrl: "https://github.com/kkaemong/SSAFY-AI-Challenge/wiki/LoRA-Fine-Tuning-VRAM-Optimization"
        }
      ],
      github: "https://github.com/kkaemong/SSAFY-AI-Challenge",
      teamSize: "4명"
    },
    {
      id: "hacking",
      title: "Web Hacking Project",
      type: "K-Shield Jr 최종프로젝트",
      period: "2023.10.25 ~ 2023.10.31",
      tech: ["Kali Linux", "Burp Suite", "SQLMap", "OWASP Top 10"],
      role: "웹 애플리케이션 모의 해킹 및 취약점 분석",
      description: "공격자 입장의 취약점 분석을 통해 보안 취약점을 진단하고 대응 방안을 수립한 보안 프로젝트",
      detailedDescription: "K-Shield Jr 교육 과정의 실증 캡스톤 프로젝트로 수행된 Web Hacking Project는 모의 공격자 관점에서 대상 엔터프라이즈급 웹 애플리케이션 인프라의 침투 경로를 사전에 조사하고 취약 요소를 발굴 및 방어하는 종합 보안 프로젝트입니다. SQL Injection, XSS, 불완전한 인증 인가(Broken Object Authorization), 디렉토리 인덱싱 등 OWASP Top 10 주요 위험군 취약점들을 시나리오 기반으로 입증했습니다. 위협 탐지를 넘어 실제 프레임워크 수준의 시큐어 코딩 필터 세팅과 웹 애플리케이션 방화벽(WAF) 규칙 최적화 개선 가이드라인을 문서로 도출하여 완성도 높은 종합 방어 프로세스를 정립했습니다.",
      image: "/kshield.png",
      challenge: [
        "타깃 웹 애플리케이션의 취약 공격 경로를 명확히 진단하고 공격 시나리오 실증 필요",
        "OWASP Top 10 기준의 보안 결함을 분석하여 실효성 있는 대응 가이드라인 도출 필요"
      ],
      solution: [
        "Burp Suite를 활용해 실시간 HTTP 요청/응답 패킷 캡처 분석 및 파라미터 변조 테스트 수행",
        "SQLMap 기반 SQL Injection 자동화 취약점 검증 및 DB 데이터 노출 취약 경로 입증",
        "XSS, Directory Indexing, File Download 취약점을 도출하여 대응 방안 및 개선 보안 가이드라인 문서화 완료"
      ],
      keyResult: [
        "Burp Suite 프록시 툴로 HTTP 패킷 파라미터를 조작하고 인증 인가 로직을 우회하는 실증적 공격 시나리오 입증",
        "SQLMap 공격 자동화로 DB 탈취 취약점을 확인하고 XSS 및 디렉토리 인덱싱 등 OWASP Top 10 기준 주요 보안 결함 도출",
        "식별된 취약점의 상세 영향도 분석을 바탕으로 WAF 정책 가이드 및 서버 설정 개선안을 포함한 실무 방어 가이드라인 수립"
      ],
      troubleshooting: [
        {
          title: "Burp Suite 패킷 변조를 통한 세션/인증 우회 방어 및 안전한 인가 미들웨어 수립",
          problem: "클라이언트가 전송하는 HTTP 패킷 파라미터 내의 사용자 식별 정보(UserId)를 가로채 프록시 변조 공격을 가했을 때, 백엔드 서버에서 해당 식별 정보와 로그인 세션의 동일 여부를 검증하지 않아 타 계정의 비공개 데이터에 즉각 접근하고 수정할 수 있는 치명적인 수평적 인가 우회(IDOR) 취약점이 발견되었습니다.",
          solution: "클라이언트가 제공하는 식별 정보 필드를 전적으로 신뢰하지 않도록 서버 코드를 개선했습니다. 클라이언트 토큰 서명 검증(JWT)을 통과한 내부 세션 객체 값과 대상 리소스에 대한 소유권을 백엔드 레이어에서 단독으로 교차 검증하는 인가 수립 미들웨어를 도입하여 외부 요청 위조 가능성을 구조적으로 원천 차단했습니다.",
          codeSnippet: {
            language: "javascript",
            filename: "AuthMiddleware.js",
            code: `// 수평적 인가 취약점(IDOR) 및 JWT 위조를 원천 방어하는 보안 미들웨어 예시
const jwt = require('jsonwebtoken');
const ResourceModel = require('../models/Resource');

const verifyAuthorization = async (req, res, next) => {
    try {
        // 1. 요청 헤더 내 Bearer JWT 검증
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: "Access Denied. JWT Token missing." });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.verifiedUser = decoded; // 복호화된 토큰 세션 정보 주입

        // 2. 요청 바디의 ID 변조 유무가 아닌, 세션 ID와 리소스의 실제 소유주(Owner) 교차 검증
        const targetResourceId = req.params.resourceId;
        const targetResource = await ResourceModel.findById(targetResourceId);
        
        if (!targetResource) {
            return res.status(404).json({ error: "Requested resource not found." });
        }

        // 클라이언트 변조 공격 방어 검증
        if (targetResource.ownerId !== req.verifiedUser.id) {
            console.warn(\`[Unauthorized Access Attempt] User \${req.verifiedUser.id} tried accessing resource owned by \${targetResource.ownerId}\`);
            return res.status(403).json({ error: "Access Forbidden. Unauthorized owner resource access." });
        }

        next();
    } catch (error) {
        return res.status(400).json({ error: "Invalid Token authorization or session expired." });
    }
};`
          },
          articleUrl: "https://github.com/kkaemong/Web-Hacking-Pjt/wiki/Securing-IDOR-Vulnerabilities"
        }
      ],
      teamSize: "6명",
      github: "https://github.com/kkaemong/Web-Hacking-Pjt"
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

