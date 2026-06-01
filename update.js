const fs = require('fs');

const projects = [
    {
      id: "gifted",
      title: "GIFTED",
      type: "SSAFY 2학기 자율 프로젝트",
      period: "2026.04.05 ~ 2026.05.21 (자체 추가 개발 진행 중)",
      tech: ["Unity WebGL", "C#", "FSM", "Object Pooling", "Git", "GitHub"],
      role: "Unity 클라이언트 오브젝트 & 상호작용 개발",
      description: "Unity 기반 멀티플레이어 포장 액션 캐주얼 게임",
      detailedDescription: "물건의 특성과 규격에 맞추어 상자를 포장하고 적재하는 멀티플레이어 웹 게임입니다. 에셋을 임포트하여 게임 로직에 맞게 가공하고 최적화하는 과정을 전담했습니다. 각각 크기(Scale)와 높이(Pivot)가 다른 다양한 외부 3D 에셋들을 게임 내에서 일관성 있게 상호작용할 수 있도록 부모-자식(Parent-Child) 계층 구조화로 규격화하는 아키텍처 작업에 집중했습니다.",
      image: "/Gifted.png",
      github: "https://github.com/gifted-hamyeonham/gifted",
      challenge: [
        "다양한 외부 3D/2D 에셋들의 Transform(크기, 기준점) 불일치로 인한 조작감 저하 및 물리 충돌 오류",
        "다수의 동적 오브젝트 상호작용 시 메모리 병목 및 가비지 컬렉션(GC) 프레임 드랍 발생"
      ],
      solution: [
        "상호작용 외부 에셋을 공통된 빈 부모 오브젝트 안에 래핑하여 논리적인 높이와 기준점을 규격화",
        "제네릭 기반 오브젝트 풀링(Object Pooling)을 모듈화하여 객체 생성/소멸 부하를 최소화하고 60fps 달성"
      ],
      keyResult: [
        "에셋 규격화 및 IInteractable 인터페이스 도입으로 기획 변경에 유연한 컴포넌트 아키텍처 확보",
        "메모리 누수 차단 및 게임 성능 최적화 달성"
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
        }
      ]
    },
    {
      id: "zabonzooet",
      title: "자본주 E.T.",
      type: "SSAFY 2학기 특화 프로젝트 (핀테크 트랙)",
      period: "2026.02.16 ~ 2026.04.03",
      tech: ["Unity WebGL", "C#", "Spring Boot", "PostgreSQL", "AWS EC2"],
      role: "Unity 클라이언트 게임 로직 및 애니메이션 전담",
      description: "시대별 경제 격변을 체험하는 2D 러너 금융 학습 게임 (우수상 수상)",
      detailedDescription: "지구에 불시착한 E.T.가 1980년대부터 2020년대까지 대한민국 경제 격변기를 직접 달리며 겪는 2D 러너 게임입니다. Unity 클라이언트를 맡아 캐릭터의 점프 기믹, 코인 획득 물리 연산, 그리고 타격감(카메라 연출)을 정교하게 튜닝했습니다. 또한, Spring Boot 백엔드와의 실시간 데이터(퀴즈) 통신을 위한 캡슐화 모듈을 직접 구현하여 사용자에게 직관적이고 몰입감 높은 플레이 경험을 제공했습니다.",
      image: "/ZabonzooET.png",
      github: "https://github.com/kkaemong/zabonzooET",
      challenge: [
        "플랫포머 게임 특유의 밋밋한 점프 물리 적용 한계 및 타격감(카메라 셰이크, 사운드 피치) 연출 부족",
        "웹(WebGL) 클라이언트 환경에서 Spring Boot 서버의 퀴즈 데이터를 실시간 비동기 호출 시 발생하는 잦은 통신 에러"
      ],
      solution: [
        "Rigidbody2D 물리 연산과 Raycast 지면 감지를 혼합하여 1단/2단 점프를 개선하고 주행 속도에 비례한 오디오 피치 적용",
        "Unity WebRequest를 캡슐화한 제네릭 기반 APIManager를 설계하여 콜백 패턴으로 유연하게 백엔드와 연동"
      ],
      keyResult: [
        "역동적 연출로 게임성 극대화 및 SSAFY 핀테크 트랙 2위 우수상 수상",
        "비동기 통신 에러율 감소 및 프론트-백 연동 아키텍처 안정화"
      ],
      troubleshooting: [
        {
          title: "백엔드 실시간 연동을 위한 Generic APIManager 캡슐화",
          problem: "Spring Boot 백엔드에서 퀴즈 데이터나 유저 정보를 받아와야 했습니다. 유니티의 HTTP 호출인 UnityWebRequest 코드가 여러 스크립트에 파편화되어 작성되면서, 코드가 길어지고 오류 디버깅이 매우 어려워지는 스파게티 코드가 되었습니다.",
          solution: "모든 HTTP 통신 레이어를 단일 APIManager 클래스로 분리하고, 어떠한 형태의 데이터 모델(JSON)이라도 유연하게 역직렬화(Deserialize)하여 반환할 수 있도록 Generic <T> 타입과 C# Action 델리게이트 콜백을 결합한 통합 통신 모듈을 설계했습니다.",
          codeSnippet: {
            filename: "APIManager.cs",
            language: "csharp",
            code: "public class APIManager : MonoBehaviour\n{\n    // Generic을 활용한 범용 비동기 HTTP GET 요청 래퍼\n    public IEnumerator GetRequest<T>(string endpoint, Action<T> onSuccess, Action<string> onError)\n    {\n        using (UnityWebRequest webRequest = UnityWebRequest.Get(BASE_URL + endpoint))\n        {\n            yield return webRequest.SendWebRequest();\n\n            if (webRequest.result == UnityWebRequest.Result.Success)\n            {\n                string jsonResponse = webRequest.downloadHandler.text;\n                T data = JsonUtility.FromJson<T>(jsonResponse);\n                onSuccess?.Invoke(data);\n            }\n            else\n            {\n                onError?.Invoke(webRequest.error);\n            }\n        }\n    }\n}"
          }
        }
      ]
    },
    {
      id: "gaesorelay",
      title: "개소릴레이 (Gaesorelay)",
      type: "SSAFY 공통 프로젝트",
      period: "2026.01.12 ~ 2026.02.09",
      tech: ["React", "TypeScript", "Zustand", "Socket.IO", "Vite"],
      role: "프론트엔드 UI/UX 설계 및 상태 렌더링",
      description: "실시간 웹소켓 기반 릴레이 스토리보드 멀티플레이어 게임",
      detailedDescription: "유저들이 랜덤한 이미지를 보고 즉흥적으로 스토리를 이어 적으며 기상천외한 동화책을 만들어가는 실시간 멀티플레이 웹 게임입니다. 방 만들기, 프로필 설정, 카드 및 심사위원 추첨 페이지, 최종 심사 결과 페이지의 UI/UX 렌더링을 담당했습니다. 프론트엔드 2인이 협업하는 환경에서 복잡한 소켓 이벤트 상태를 Zustand로 구독하고, 모두를 만족시키는 디자인 톤앤매너를 도출하기 위해 코드 리뷰와 잦은 UI 뷰 동기화 작업을 거쳤습니다.",
      image: "/gaesorelay.png",
      github: "https://github.com/kkaemong/gaesorelay",
      challenge: [
        "기획 요구사항에 따른 프론트엔드 담당자 간의 UI 톤앤매너(디자인) 불일치 및 재사용성 문제",
        "실시간 턴제 타이머와 결과 투표 애니메이션 레이아웃 리플로우(Reflow)로 인한 렌더링 병목 현상"
      ],
      solution: [
        "Figma 디자인 시스템을 기반으로 공통 레이아웃을 컴포넌트화하고 잦은 크로스 브라우징 피드백 진행",
        "CSS의 GPU 가속(will-change, translateZ) 속성을 활용하여 화려한 결과 투표 타이머 UI 애니메이션을 부드럽게 최적화"
      ],
      keyResult: [
        "실시간 소켓 게임 결과 및 다이내믹 투표 모달의 끊김 없는 렌더링 구현",
        "팀 단위 프론트엔드 협업과 상태 관리 패턴(Zustand) 활용 역량 강화"
      ],
      troubleshooting: [
        {
          title: "팀 단위 프론트엔드 UI/UX 톤앤매너 동기화 및 전역 상태 렌더링",
          problem: "프론트엔드를 담당하는 2명의 개발자가 각기 다른 페이지(방 설정, 게임 결과 등)를 구현하다 보니 레이아웃 규격이나 톤앤매너가 불일치하는 현상이 자주 발생했습니다. 개개인의 디자인 취향이 달라 완벽한 합의점을 찾기 힘든 과정이었습니다.",
          solution: "최소한의 일관성을 유지하기 위해 공통 디자인 토큰(색상, 여백, 타이포그래피)을 설정하고 이를 ResultCard 같은 공통 컴포넌트로 묶었습니다. 게임 종료 후 서버 소켓에서 최종 결과(스토리)를 수신하면, 이 공통 컴포넌트를 사용해 Zustand 스토어 데이터를 통일감 있게 반복 렌더링함으로써 시각적 안정감을 확보했습니다.",
          codeSnippet: {
            filename: "ResultPage.tsx",
            language: "typescript",
            code: "import { useGameState } from '@/store/useGameState';\nimport { ResultCard } from '@/components/ui';\n\nexport default function ResultPage() {\n  // Zustand 전역 상태를 구독하여 소켓에서 내려주는 최종 결과를 렌더링\n  const { teamAStory, teamBStory, winner } = useGameState();\n\n  return (\n    <div className=\"flex flex-col items-center justify-center p-8\">\n      <h1 className=\"text-4xl font-bold animate-bounce text-slate-800\">\n        {winner === 'DRAW' ? '무승부!' : `${winner}팀 승리!`}\n      </h1>\n      \n      {/* 공통 컴포넌트를 활용한 레이아웃 재사용으로 UI 일관성 유지 */}\n      <div className=\"flex gap-8 mt-12 w-full max-w-4xl\">\n        <ResultCard team=\"A\" story={teamAStory} isWinner={winner === 'A'} />\n        <ResultCard team=\"B\" story={teamBStory} isWinner={winner === 'B'} />\n      </div>\n    </div>\n  );\n}"
          }
        }
      ]
    },
    {
      id: "ssaiet",
      title: "SSAIET",
      type: "SSAFY 1학기 최종 프로젝트",
      period: "2025.11 ~ 2025.12",
      tech: ["Vue.js", "Pinia", "Python", "Django DRF", "JWT", "Kakao Map API"],
      role: "FE/BE 풀스택 개발 (회원, 커뮤니티, 카카오맵)",
      description: "점심 선택 기반 개인 맞춤 저녁 추천 & 식단 관리 서비스",
      detailedDescription: "직장인들이 점심으로 섭취한 칼로리를 기반으로 저녁 식단을 설계해주는 헬스케어 플랫폼입니다. Vue.js를 활용하여 전체적인 초록색 톤앤매너와 브랜드 UI를 기획/구현했으며, Kakao Map API를 연동해 주변 건강 식당 탐색 기능을 개발했습니다. 백엔드(Django)에서는 회원 도메인과 커뮤니티, 캘린더를 전담 구축하고 전체 시스템의 JWT 인증 및 권한(Authorization) 흐름을 상세하게 설계했습니다.",
      image: "/SSAIETMAIN.png",
      github: "https://github.com/kkaemong/SSAIET",
      challenge: [
        "회원가입 직후 필수 정보(신체 구조) 입력 화면으로 리다이렉트되지 않고 온보딩 단계가 무시되는 흐름 버그",
        "JWT 인증 통과 후 인가(Authorization) 누락으로 발생한 다른 사용자 데이터 변조(IDOR) 치명적 취약점"
      ],
      solution: [
        "Vue-Router의 Navigation Guard와 Pinia 스토어를 결합하여 미입력 유저의 온보딩 흐름 강제 리다이렉트 처리",
        "Django DRF의 IsAuthenticated 퍼미션 검사와 request.user 기반 데이터 소유권 교차 검증 로직 도입"
      ],
      keyResult: [
        "보안 취약점 및 권한 탈취 위협이 없는 견고한 사용자 인증-인가 인프라 구축",
        "지도 API 연동을 통한 사용자 편의성 강화"
      ],
      troubleshooting: [
        {
          title: "JWT 인증 파이프라인 흐름 제어 및 권한 우회(IDOR) 차단",
          problem: "사용자가 회원가입을 마치면 곧바로 신체 구조(키, 몸무게 등)를 입력하는 온보딩 페이지로 넘어가야 했으나, 토큰만 발급된 채 메인화면으로 우회되는 흐름 에러가 발생했습니다. 또한, 단순 API 파라미터만 변조하면 다른 유저의 신체 정보나 게시글까지 수정할 수 있는 IDOR(수직/수평 권한 상승) 취약점이 확인되었습니다.",
          solution: "클라이언트 단(Vue)에서는 Pinia와 Router Guard를 연동하여 '프로필 미완성 상태'인 유저는 무조건 온보딩으로 강제 이동되도록 재설계했습니다. 서버 단(Django)에서는 파라미터가 아닌, 검증된 JWT 토큰 내부의 request.user 객체를 추출하여 수정하려는 데이터의 소유권(Owner ID)과 교차 검증하는 시큐어 코딩을 전면 도입했습니다.",
          codeSnippet: {
            filename: "views.py",
            language: "python",
            code: "from rest_framework.permissions import IsAuthenticated\nfrom rest_framework.response import Response\nfrom rest_framework.decorators import api_view, permission_classes\n\n@api_view(['PUT'])\n@permission_classes([IsAuthenticated])\ndef update_body_info(request):\n    # JWT 토큰을 통해 무결성이 검증된 request.user 객체를 신뢰 객체로 사용\n    user = request.user\n    \n    # 클라이언트가 보낸 Body ID 파라미터에 의존하지 않고, 직접 접속된 user 인스턴스를 업데이트 (IDOR 방어)\n    user.height = request.data.get('height')\n    user.weight = request.data.get('weight')\n    user.save()\n    \n    return Response({\"message\": \"신체 정보가 안전하게 업데이트되었습니다.\", \"user_id\": user.id})"
          }
        }
      ]
    },
    {
      id: "aichallenge",
      title: "SSAFY AI Challenge",
      type: "SSAFY 교내 경진대회",
      period: "2026.04",
      tech: ["Python", "PyTorch", "LLM", "VLM", "PEFT", "LoRA"],
      role: "딥러닝 파라미터 튜닝 및 모델 최적화",
      description: "제한된 인프라 내 대규모 비전/언어 모델 튜닝 및 성능 고도화",
      detailedDescription: "주어진 컴퓨팅 자원 내에서 오픈소스 거대 언어 모델(LLM)과 비전 언어 모델(VLM)을 특정 목적에 맞게 파인튜닝하는 해커톤 대회였습니다. 제공된 베이스라인 코드를 완전히 재설계하기보다는, 한정된 GPU에서 최대의 성능을 끌어내기 위해 파라미터 효율적 튜닝(PEFT)과 LoRA(Low-Rank Adaptation) 기법을 접목하여 기존 코드를 발전시키는(Develop) 엔지니어링 작업에 매진했습니다. 최종 실험 결과를 도출하여 주도적으로 팀 발표를 이끌었습니다.",
      image: "/aichallenge.jpg",
      github: "https://github.com/kkaemong/SSAFY-AI-Challenge",
      challenge: [
        "단일 24GB VRAM GPU 환경에서 7B 규모 이상의 거대 모델 가중치를 학습시킬 때 지속적으로 발생하는 메모리 초과(OOM) 현상"
      ],
      solution: [
        "사전 학습된 모델 가중치를 동결(Freeze)하고 어텐션 레이어 중 핵심 모듈(q_proj, v_proj)에만 LoRA 어댑터를 부착하여 연산량 최적화"
      ],
      keyResult: [
        "GPU 메모리 점유율을 획기적으로 낮춰 다운 없이 안정적인 파인튜닝 프로세스 완수",
        "최신 PEFT 모델 튜닝 기법에 대한 실무 적용 역량 입증"
      ],
      troubleshooting: [
        {
          title: "제한된 VRAM 환경에서의 모델 파라미터 효율적 튜닝 (LoRA)",
          problem: "제공된 베이스라인 코드 그대로 LLM 모델 전체를 튜닝(Full Fine-Tuning)하려고 시도했으나, GPU 메모리(VRAM) 한계를 견디지 못하고 계속해서 CUDA Out of Memory 에러가 뿜어지며 훈련 프로세스가 강제 종료되었습니다.",
          solution: "제한된 자원에서 학습을 성공시키기 위해 PEFT 라이브러리의 LoRA 기법을 코드에 접목시켰습니다. 기학습된 무거운 메인 파라미터 텐서는 동결 처리하고 핵심 어텐션 큐 어댑터만 새롭게 업데이트하도록 코드를 Develop했습니다. 이를 통해 역전파 시 훈련 파라미터 비중을 0.1% 수준으로 대폭 낮추고 OOM 없이 모델 튜닝을 성사시켰습니다.",
          codeSnippet: {
            filename: "train_lora.py",
            language: "python",
            code: "from peft import LoraConfig, get_peft_model\n\n# 베이스라인 모델에서 전체 파라미터 업데이트를 방지하고 LoRA 어댑터만 부착 설정\npeft_config = LoraConfig(\n    r=8,\n    lora_alpha=32,\n    target_modules=[\"q_proj\", \"v_proj\"], # Attention 모듈만 가볍게 타겟팅\n    lora_dropout=0.05,\n    bias=\"none\",\n    task_type=\"CAUSAL_LM\"\n)\n\n# 기존 모델 아키텍처에 PEFT 설정 덮어씌우기\nmodel = get_peft_model(base_model, peft_config)\nmodel.print_trainable_parameters() \n# 콘솔 결과: trainable params가 전체의 약 0.1%로 메모리 부하 획기적 감소"
          }
        }
      ]
    },
    {
      id: "webhacking",
      title: "Web Hacking Project",
      type: "K-Shield Jr 11기 프로젝트",
      period: "2023.10",
      tech: ["Burp Suite", "SQLMap", "OWASP TOP 10", "Network Security"],
      role: "모의 해킹 취약점 진단 및 시나리오 평가",
      description: "정보보호센터 대상 웹 서비스 취약점 진단 및 보안 대책 수립",
      detailedDescription: "제공된 보안 취약 웹사이트를 대상으로 OWASP TOP 10 기반의 체계적인 모의 침투를 수행한 실무 정보보안 프로젝트입니다. Burp Suite와 SQLMap을 활용하여 팀원들과 공격 범위를 세분화하고, 불충분한 인증(2FA 우회), 대량 문자열 삽입에 의한 버퍼 오버플로우, SQL 인젝션 등을 집요하게 식별했습니다. 도출된 취약점의 공격 시나리오를 구체화하고 즉각적인 보안 패치 권고사항을 담은 종합 리포트를 작성했습니다.",
      image: "/webhacking.jpg",
      github: "https://github.com/kkaemong/Web-Hacking-Pjt",
      challenge: [
        "정보 수집 시 관리자 권한(ID/PW 해시) 탈취 후, 평문 복호화 시간이 장기화되어 침투 시나리오 전개가 중단됨",
        "프록시 툴을 이용한 2차 인증 패킷 변조 우회 문제 및 폼 입력값 검증 부재 증명"
      ],
      solution: [
        "외부 전문 암호 복호화 웹사이트를 전략적으로 활용하여 관리자 해시 텍스트를 단기간에 평문으로 강제 크래킹 성공",
        "Burp Suite를 통해 인증 성공(200 OK) 패킷으로 변조하여 서버 단 2FA를 우회하고 로그인 창 버퍼 오버플로우 취약점을 시연"
      ],
      keyResult: [
        "서버 측의 인가 검증 누락(Broken Access Control)을 악용한 치명적인 우회 침투 증명",
        "실무 수준의 웹 취약점 진단 가이드 및 모의 해킹 결과 보안 대응책(Report) 작성 완료"
      ],
      troubleshooting: [
        {
          title: "불충분한 인증 통제 및 로그인 버퍼 오버플로우 취약점 시연",
          problem: "취약 타겟 사이트에서 해시값을 탈취하는 데 성공했으나 Brute Force 방식으로는 복호화가 장기화되어 침투가 정체되었습니다. 또한, 패스워드 변경 과정에서 정상 인증 우회가 가능한지, 대량의 텍스트 공격에 서버 인증 로직이 무력화되는지 명확히 증명해야 했습니다.",
          solution: "해시값은 외부 암호 복호화 툴을 활용하여 신속하게 평문으로 복원했습니다. 이어 로그인 폼에 비정상적으로 긴 문자열을 전송했을 때 버퍼 오버플로우 에러가 발생하며 예외 처리 누락으로 인해 강제로 인증이 뚫려버리는 치명적 로직 결함을 입증했습니다. 나아가, Burp Suite 캡처를 통해 2차 인증(2FA) 응답 패킷의 상태 코드를 조작함으로써 서버 측 검증 부재를 악용한 '불충분한 인증' 취약점을 리포트로 완벽히 도출했습니다.",
          codeSnippet: {
            filename: "Hacking_Report.md",
            language: "markdown",
            code: "### 🚨 취약점 분석: 불충분한 인증 및 로그인 버퍼 오버플로우 시나리오\n\n1. **비정상 입력 테스트 (Buffer Overflow):**\n   - 로그인 폼 `password` 필드에 무작위 문자열을 10,000번 이상 반복 삽입하여 POST 요청 전송.\n   - DBMS 오류 유발과 동시에 서버 측 예외 처리(Exception Handling) 누락으로 세션 쿠키가 강제 발급되는 우회 결함 입증.\n\n2. **2차 인증 우회 (Broken Authentication):**\n   - Burp Suite 프록시 캡처를 통해 `/api/verify_2fa` 응답 패킷의 상태 코드를 `HTTP/1.1 401 Unauthorized`에서 `HTTP/1.1 200 OK` 및 `\"success\": true` 로 강제 변조.\n   - 서버 단 API에 패킷 무결성 2차 검증 로직이 부재하여 관리자 권한 취득 및 대시보드 진입 뚫림 현상 확인."
          }
        }
      ]
    }
  ];

const content = fs.readFileSync('src/data/portfolio.ts', 'utf8');
const startIndex = content.indexOf('  projects: [');
const endIndex = content.indexOf('  experience: [');

const beforeProjects = content.substring(0, startIndex);
const afterProjects = content.substring(endIndex);

// Generate a valid string for portfolio.ts
const stringifiedProjects = JSON.stringify(projects, null, 4)
  .replace(/"([^"]+)":/g, '$1:') // Remove quotes from keys
  .replace(/"/g, "'") // Convert to single quotes inside TS logic? No, leave as is, just stringify
  ; 

// Let's just cleanly stringify and replace double quotes with nothing for keys, but wait, JSON.stringify keeps double quotes on everything. TS supports double quotes.
// To make it look like a TS file, we can just dump JSON.stringify.
const newContent = beforeProjects + "  projects: " + JSON.stringify(projects, null, 4) + ",\n" + afterProjects;

fs.writeFileSync('src/data/portfolio.ts', newContent);
console.log("Successfully updated portfolio.ts with pure JS objects!");
