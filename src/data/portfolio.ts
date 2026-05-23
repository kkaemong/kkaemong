export interface Project {
  id: string;
  title: string;
  type: string;
  period: string;
  tech: string[];
  role?: string;
  description: string;
  image?: string;
  github?: string;
  teamSize?: string;
  challenge?: string[];   // 직면한 문제/도전 리스트
  solution?: string[];    // 해결 방법 리스트
  keyResult?: string[];   // 핵심 성과 리스트
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
      id: "jabonju",
      title: "자본주 E.T. (zabonzooET)",
      type: "SSAFY 2학기 핀테크 부문 특화프로젝트",
      period: "2026.02.16 ~ 2026.04.03",
      tech: ["Unity WebGL", "C#", "Spring Boot", "AWS EC2", "PostgreSQL"],
      role: "Unity 클라이언트 개발",
      description: "Unity · Spring Boot · AWS 풀스택 2D 러너 금융 학습 게임",
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
  }
};
