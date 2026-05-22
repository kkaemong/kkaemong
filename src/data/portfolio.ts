export interface Project {
  id: string;
  title: string;
  type: string;
  period: string;
  tech: string[];
  role?: string;
  description: string;
  image?: string;
  highlights: string[];
  github?: string;
  teamSize?: string;
  challenge?: string[];   // 직면한 문제/도전 리스트
  solution?: string[];    // 해결 방법 리스트
  keyResult?: string;   // 핵심 성과 한 줄 (수치 포함)
}

export const portfolioData = {
  hero: {
    headline: "사고는 유연하게, 구조는 견고하게",
    subTitle: "유연한 사고로 문제를 정의하고, 견고한 구조로 가치를 구현하는 개발자 진준영입니다. 비전공자로서 SSAFY를 통해 쌓은 탄탄한 기술적 이해도를 바탕으로, 사용자의 문제를 '가치 있는 경험'으로 치환하며 기획의 의도를 코드로 구현해 냅니다.",
    cta: {
      primary: "프로젝트 살펴보기",
      secondary: "GitHub 방문하기",
      githubUrl: "https://github.com/kkaemong"
    }
  },
  about: {
    title: "사고는 유연하게,\n구조는 견고하게",
    description: "유연한 사고로 문제를 정의하고, 견고한 구조로 가치를 구현하는 개발자입니다. 비전공자로서 SSAFY를 통해 쌓은 탄탄한 기술적 이해도를 바탕으로, 사용자의 문제를 '가치 있는 경험'으로 치환하며 기획의 의도를 코드로 구현해 냅니다.",
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
      { name: "Python", level: 85, icon: "python", description: "주력 개발 언어로 객체 지향 프로그래밍과 효율적인 알고리즘 설계에 능숙하며, 대용량 데이터 처리 및 시스템 자동화 로직 구현이 가능합니다." }
    ],
    project: [
      { name: "React", level: 65, icon: "react", description: "릴레이 스토리텔링 프로젝트(개소릴레이)에서 웹소켓 기반의 실시간 양방향 통신 UI 컴포넌트를 설계하고 이벤트 중심 상태 렌더링을 연동했습니다." },
      { name: "TypeScript", level: 65, icon: "typescript", description: "정적 타입을 활용해 런타임 에러를 방지하고, 인터페이스와 타입을 엄격히 설계하여 대규모 컴포넌트 간 데이터 흐름을 안정적으로 제어했습니다." },
      { name: "Zustand", level: 65, icon: "redux", description: "전역 상태 관리 라이브러리를 도입하여 실시간 게임 내 복잡한 상태 트리(게임 단계, 타이머, 유저 정보)를 효율적으로 분리 및 관리했습니다." },
      { name: "Vite", level: 65, icon: "vite", description: "Vite 기반의 빌드 환경 및 모듈 번들러 설정을 통해 빠른 HMR과 초기 로딩 최적화를 구현하여 프론트엔드 개발 생산성을 높였습니다." },
      { name: "Next.js", level: 60, icon: "nextdotjs", description: "파일 시스템 기반 라우팅 및 SSR/SSG의 하이브리드 렌더링을 설계하고, 웹 표준과 검색엔진 최적화(SEO)가 적용된 포트폴리오 웹사이트를 구축했습니다." },
      { name: "Vue.js", level: 60, icon: "vuedotjs", description: "식단 관리 플랫폼(SSAIET)에서 반응형 상태와 사용자 맞춤형 대시보드 컴포넌트를 설계하여 싱글 페이지 애플리케이션(SPA) 프론트엔드를 연동했습니다." },
      { name: "Django", level: 65, icon: "django", description: "식단 관리 및 커뮤니티 서비스를 위한 REST API 서버를 구축하고, 효율적인 쿼리 최적화를 위한 Django ORM 모델링을 설계했습니다." },
      { name: "DRF", level: 65, icon: "django", description: "Serializer를 설계하여 데이터 직렬화/역직렬화를 효율화하고, JWT 및 토큰 기반의 안전한 사용자 인증·인가 시스템을 구현했습니다." },
      { name: "C#", level: 65, icon: "csharp", description: "러너 금융 게임(자본주 E.T.) 개발 시, 컴포넌트 패턴과 OOP 설계 원칙에 따라 엔티티의 생명주기 및 모듈형 시스템을 제어했습니다." },
      { name: "Unity", level: 65, icon: "unity", description: "Unity 클라이언트 리드로서 Rigidbody2D 기반의 물리 엔진 커스텀 및 동적 맵 제너레이터 등 게임 핵심 로직과 플레이 연출을 완성했습니다." }
    ],
    basic: [
      { name: "HTML5", level: 50, icon: "html5", description: "웹 접근성 지침을 준수하는 시맨틱 마크업을 통해 SEO(검색엔진 최적화)와 크로스 브라우징이 보장되는 견고한 웹 페이지 레이아웃을 구성합니다." },
      { name: "JavaScript", level: 50, icon: "javascript", description: "ES6+ 문법을 기반으로 DOM 직접 제어 및 Axios/Fetch를 이용한 비동기 데이터 통신을 구현하고 비동기 제어 흐름(Promise, async/await)을 신뢰성 있게 구축합니다." },
      { name: "PyTorch", level: 45, icon: "pytorch", description: "멀티모달 AI 프로젝트에서 PyTorch 분산 학습 환경(DDP)과 bfloat16 정밀도(Mixed Precision)를 세팅하여 모델 학습 파이프라인을 가속화했습니다." },
      { name: "HuggingFace", level: 40, icon: "huggingface", description: "사전 학습된 Vision-Language 모델(Qwen2.5-VL)을 기반으로 LoRA(PEFT) 기법을 설계 및 적용하여 고성능 문제 풀이 모델을 Fine-tuning했습니다." }
    ],
    tools: [
      { name: "Git", level: 75, icon: "git", description: "다양한 협업 프로젝트에서 브랜치 전략(Git Flow 등)을 정의하고, 충돌 예방 및 신속한 코드 통합으로 형상 관리 효율을 극대화했습니다." },
      { name: "GitHub", level: 75, icon: "github", description: "Pull Request 기반의 코드 리뷰 문화를 구축하고 Issue와 Milestone 기능을 결합하여 애자일한 프로젝트 스케줄 관리를 리드했습니다." },
      { name: "Postman", level: 45, icon: "postman", description: "서버 통신 전 백엔드 API 응답 페이로드를 조기에 검증하고, 시나리오별 파라미터 테스트를 수행하여 개발 공수를 크게 단축시켰습니다." },
      { name: "Figma", level: 40, icon: "figma", description: "기획 및 디자인 협업 시 컴포넌트 단위의 와이어프레임을 분석하고, 정확한 레이아웃 설계 수치를 추출하여 디자인 의도를 코드로 완벽하게 이식합니다." },
      { name: "Burp Suite", level: 40, icon: "burpsuite", description: "모의 해킹 프로젝트에서 HTTP 패킷을 캡처 및 변조 분석하여 웹 보안 취약점을 진단하고 실질적인 로직 우회 차단 방안을 수립했습니다." }
    ]
  },
  projects: [
    {
      id: "jabonju",
      title: "자본주 E.T. (zabonzooET)",
      type: "SSAFY 2학기 핀테크 부문 특화프로젝트",
      period: "2026.02.16 ~ 2026.04.03",
      tech: ["Unity WebGL", "C#", "Spring Boot", "AWS EC2", "PostgreSQL"],
      role: "Unity 클라이언트 리드 (게임 코어 로직 & 통신 모듈 설계)",
      description: "Unity · Spring Boot · AWS 풀스택 2D 러너 금융 학습 게임 ",
      image: "/jabonju.png",
      challenge: [
        "2D 무한 러너 게임의 핵심 점프 및 충돌 물리 피드백의 완성도 제고 필요",
        "Spring Boot 백엔드와의 실시간 금융 퀴즈 연동 구조 설계 필요"
      ],
      solution: [
        "Rigidbody2D 물리 연산과 Raycast 지면 감지 혼합을 통한 정교한 점프 구현",
        "가변 사운드 피치 및 카메라 셰이크 연출 설계를 통해 조작 타격감 향상",
        "C# UnityWebRequest 기반 커스텀 HTTP 통신 모듈(APIManager.cs) 단독 구축을 통한 백엔드 금융 퀴즈 데이터 실시간 연동"
      ],
      keyResult: "SSAFY 특화 프로젝트 핀테크 트랙 우수상 (2위) 수상 및 게임 코어 씬(Scene) 및 통신 모듈 전체 독자 설계 완료",
      highlights: [
        "Unity를 활용하여 핵심 인게임 씬(Scene)을 구축하고, 중력 적용 및 캐릭터 애니메이션을 구현하여 역동적인 환경 조성",
        "Rigidbody2D 기반의 물리 점프 시스템 및 게임 내 재화(코인) 동적 생성 로직을 설계하여 핵심 게임 루프 완성",
        "커스텀 HTTP 통신 모듈을 단독 설계하여 Spring Boot 백엔드와의 금융 퀴즈 데이터를 연동하고 퀴즈 모달 UI 개발",
        "가변 사운드 피치, 카메라 셰이크 등 디테일한 연출 요소들을 추가하여 사용자의 게임 몰입도 및 타격감 향상"
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
      role: "Frontend",
      description: "웹소켓 & AI를 활용한 릴레이 스토리텔링 게임",
      image: "/gaesorlay.png",
      challenge: [
        "실시간 웹소켓 기반 스토리텔링 게임 환경에서 복잡한 전역 게임 상태를 사용자 화면 전환과 실시간 동기화 필요",
        "다양한 컴포넌트 간 일관성 있는 복사용 UI 컴포넌트 설계 필요"
      ],
      solution: [
        "Figma 와이어프레임 설계를 주도하여 컴포넌트 단위 레이아웃 수치 조기 정의",
        "상태 관리(Zustand) 및 실시간 통신(WebSocket) 연동을 고려하여 역할이 명확하고 Props 구조가 예측 가능한 독립적인 UI 컴포넌트 아키텍처 구축"
      ],
      keyResult: "기획·디자인부터 프론트엔드 구현까지의 파이프라인 주도로 실시간 게임 흐름에 최적화된 사용자 경험(UX) 최적화 달성",
      highlights: [
        "Figma를 활용해 게임 흐름에 맞춘 직관적인 와이어프레임과 UI 구조 직접 설계 및 React 컴포넌트 구현",
        "Zustand 및 WebSocket 연동을 고려하여 역할이 명확하고 Props 구조가 예측 가능한 독립적인 UI 컴포넌트 구축",
        "실시간 게임 특성에 맞춘 화면 전환 흐름과 인터랙션 설계로 사용자의 게임 몰입도 향상"
      ],
      github: "https://github.com/gaesorelay/frontend",
      teamSize: "6명"
    },
    {
      id: "ssaiet",
      title: "SSAIET",
      type: "SSAFY 1학기 최종 프로젝트",
      period: "2025.11. ~ 2025. 12.",
      tech: ["Python", "Django", "DRF", "Vue", "Pinia", "JWT", "SQLite"],
      role: "Full Stack",
      description: "Django와 Vue.js를 활용한 사용자 맞춤형 식단 관리 및 커뮤니티 플랫폼",
      image: "/SSAIETMAIN.png",
      challenge: [
        "2인 팀으로 백엔드와 프론트엔드를 동시에 풀스택 개발해야 하는 타이트한 일정",
        "사용자 식단 데이터 시각화(캘린더), 보안 인증(JWT), 위치 기반 식당 검색 등의 핵심 기능을 짧은 시간 내 안정적으로 동시 구현 필요"
      ],
      solution: [
        "Django REST Framework로 효율적인 데이터 모델링 및 REST API 서버 구축",
        "Vue.js 및 JWT 토큰 기반 로그인 상태 유지 및 토큰 인증 흐름 구성",
        "Kakao Map API 연동을 통한 현재 위치 기반 주변 식당 탐색 기능 구현 및 캘린더 UI로 월별 식단 데이터 시각화"
      ],
      keyResult: "데이터 시각화, 보안 인증, 위치 정보 서비스를 완전히 융합한 사용자 맞춤형 다이어트 관리 풀스택 SPA 플랫폼 구축",
      highlights: [
        "JWT 기반 인증 구조 구현을 통해 로그인 상태 유지 및 토큰 기반 API 인증 흐름 구성",
        "식단 관리 및 커뮤니티 기능을 제공하는 SPA 웹 서비스 개발",
        "식단 기록 데이터를 조회할 수 있는 캘린더 UI 개발로 월별 식단 기록 확인 기능 구현",
        "게시글·댓글·좋아요 기능이 포함된 커뮤니티 기능 구현",
        "Kakao Map API 연동을 통한 현재 위치 기반 주변 식당 탐색 기능 구현"
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
        "Qwen2.5-VL 기반 멀티모달 Vision-Language 모델을 활용하여 이미지와 텍스트 선택지를 동시에 처리해야 하는 한계 봉착",
        "한정된 컴퓨팅 리소스 환경에서 4지선다 문제 해결용 고성능 추론 모델 구축 필요"
      ],
      solution: [
        "LoRA(PEFT) 기법을 설계하여 파라미터 효율적 미세조정(PEFT) 학습 수행",
        "bfloat16 정밀도(Mixed Precision) 환경을 학습 가속 파이프라인으로 최적화 세팅"
      ],
      keyResult: "모델 성능 개선 및 검증을 통해 최종 평가 정확도(Accuracy)를 0.75에서 0.81로 유의미하게 향상시킴",
      highlights: [
        "이미지와 텍스트 선택지를 동시에 이해하는 멀티모달 AI 모델 개발",
        "Qwen2.5-VL 기반 Vision-Language 모델을 활용한 4지선다 문제 해결 모델 구축",
        "LoRA 기반 파라미터 효율 미세조정 적용",
        "모델 성능 개선 및 검증을 통한 Accuracy 향상 (0.75 → 0.81)",
        "Mixed Precision(bfloat16) 학습 환경 구성"
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
      keyResult: "SQL Injection, XSS, 디렉터리 인덱싱 등 5대 보안 취약점 경로를 성공적으로 도출하고 실질적인 보안 대책 권고 가이드 작성 완료",
      highlights: [
        "웹 애플리케이션 대상 모의 해킹(Penetration Testing) 및 취약점 분석 수행",
        "Burp Suite를 활용한 HTTP 요청/응답 분석 및 파라미터 변조 테스트 수행",
        "SQLMap을 활용한 SQL Injection 취약점 분석 및 DB 정보 노출 가능성 검증",
        "XSS, Directory Indexing, File Download 취약점 등 OWASP Top 10 기반 보안 취약점 진단",
        "취약점 영향도 분석 후 보안 대응 방안 및 개선 가이드 작성"
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
      content: "파이썬 트랙 수료 및 프론트엔드 특화 프로젝트 수행 중"
    },
    {
      id: 2,
      title: "협성대학교 경영학 전공",
      period: "2018.03 ~ 2024.08",
      content: "경영 데이터 분석 및 비즈니스 프로세스 설계 학습"
    },
    {
      id: 3,
      title: "제 11기 K-Shield Jr (200H)",
      period: "2023.09 ~ 2023.10",
      content: "실무 중심의 정보보안 및 웹 취약점 분석 과정 수급"
    },
    {
      id: 4,
      title: "Philippines Residency",
      period: "2002 ~ 2009",
      content: "해외 거주를 통한 자유로운 영어 구사 및 문화적 유연성 확보"
    }
  ],
  contact: {
    email: "junemay31@naver.com",
    blog: "https://velog.io/@junemay31/posts",
    github: "github.com/kkaemong",
    message: "함께 성장하며 빈틈없이 견고한 서비스를 만들어나갈 동료를 기다립니다."
  }
};
