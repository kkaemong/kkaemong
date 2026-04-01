export const portfolioData = {
  hero: {
    headline: "사고는 경계 없이 유연하게, 구조는 빈틈 없이 견고하게",
    subTitle: "유연한 사고로 문제를 정의하고, 견고한 구조로 해결책을 제시하는 프론트엔드 개발자입니다. 비전공자로서 SSAFY를 통해 쌓은 폭폭한 기술적 이해도를 바탕으로, 사용자의 문제를 '가치 있는 경험'으로 치환하며 기획의 의도를 코드로 구현해 냅니다.",
    cta: {
      primary: "프로젝트 살펴보기",
      secondary: "GitHub 방문하기",
      githubUrl: "https://github.com/kkaemong"
    }
  },
  about: {
    title: "Flexible & Solid",
    description: "비즈니스의 목적과 기술의 구현 사이의 간극을 좁히는 개발자입니다. 경영학적 관점으로 서비스의 본질을 파악하고, 공학적 설계를 통해 이를 가치 있는 사용자 경험으로 치환합니다. 필리핀에서의 글로벌한 경험과 SSAFY에서의 기술적 성장을 무기로, 어떤 환경에서도 유연하게 소통하며 견고한 프로덕트를 만듭니다.",
    points: [
      {
        title: "비즈니스적 통찰",
        content: "프로덕트의 비즈니스 목적을 깊이 이해하고, 서비스의 성장에 실질적으로 기여할 수 있는\n 기술적 결정을 내립니다."
      },
      {
        title: "구조적 설계",
        content: "백엔드 이해도를 바탕으로 전체 데이터 흐름을 고려하며, 확장 가능하고 유지보수가 쉬운\n 프론트엔드 아키텍처를 설계합니다."
      },
      {
        title: "문화적 유연성",
        content: "다양한 문화권에서의 경험을 바탕으로 기술적, 인간적 소통의 장벽을\n 허물며 팀과 유연하게 협업합니다."
      }
    ]
  },
  skills: {
    frontend: ["React", "TypeScript", "Vue.js", "JavaScript", "HTML5", "Vite", "Zustand", "Next.js"],
    backendAI: ["Python", "Django", "DRF", "PyTorch", "HuggingFace", "LoRA"],
    tools: ["Git", "GitHub", "Figma", "Postman", "Burp Suite"]
  },
  projects: [
    {
      id: "gaesori",
      title: "개소릴레이 (Gaesori Relay)",
      type: "SSAFY 2학기 공통 프로젝트",
      period: "2026.01.12 ~ 2026.02.09",
      tech: ["Vite", "Figma", "React", "TypeScript"],
      role: "Frontend Development",
      description: "여러 플레이어가 실시간으로 턴을 이어가며 하나의 엉뚱하고 재미있는 이야기를 완성하는 웹 기반 멀티플레이어 게임입니다.",
      image: "/gaesorlay.png",
      highlights: [
        "Figma를 활용해 게임 흐름에 맞춘 직관적인 와이어프레임과 UI 구조 직접 설계 및 React 컴포넌트 구현",
        "Zustand 및 WebSocket 연동을 고려하여 역할이 명확하고 Props 구조가 예측 가능한 독립적인 UI 컴포넌트 구축",
        "실시간 게임 특성에 맞춘 화면 전환 흐름과 인터랙션 설계로 사용자의 게임 몰입도 향상"
      ],
      github: "https://github.com/gaesorelay"
    },
    {
      id: "ssaiet",
      title: "SSAIET",
      type: "SSAFY 1학기 최종 프로젝트",
      period: "2025.11. ~ 2025. 12.",
      tech: ["Python", "Django", "DRF", "Vue", "Pinia", "JWT", "SQLite"],
      role: "Full Stack Development",
      description: "점심 선택 기반 개인 맞춤 저녁 추천 & 식단 관리 서비스입니다.",
      image: "/SSAIETMAIN.png",
      highlights: [
        "JWT 기반 인증 구조 구현을 통해 로그인 상태 유지 및 토큰 기반 API 인증 흐름 구성",
        "식단 관리 및 커뮤니티 기능을 제공하는 SPA 웹 서비스 개발",
        "식단 기록 데이터를 조회할 수 있는 캘린더 UI 개발로 월별 식단 기록 확인 기능 구현",
        "게시글·댓글·좋아요 기능이 포함된 커뮤니티 기능 구현",
        "Kakao Map API 연동을 통한 현재 위치 기반 주변 식당 탐색 기능 구현"
      ],
      github: "https://github.com/kkaemong/Final-PJT"
    },
    {
      id: "ai-challenge",
      title: "SSAFY AI Challenge",
      type: "멀티모달 AI 모델 개발",
      period: "2025.10.23 ~ 2025.10.27",
      tech: ["PyTorch", "HuggingFace", "Qwen2.5-VL", "LoRa", "PEFT"],
      role: "이미지/텍스트 동시 이해 모델 개발",
      description: "Qwen2.5-VL 기반 모델링을 통해 이미지와 텍스트를 동시에 이해하고 문제를 해결하는 AI 프로젝트입니다.",
      highlights: [
        "이미지와 텍스트 선택지를 동시에 이해하는 멀티모달 AI 모델 개발",
        "Qwen2.5-VL 기반 Vision-Language 모델을 활용한 4지선다 문제 해결 모델 구축",
        "LoRA 기반 파라미터 효율 미세조정 적용",
        "모델 성능 개선 및 검증을 통한 Accuracy 향상 (0.75 → 0.81)",
        "Mixed Precision(bfloat16) 학습 환경 구성"
      ],
      github: "https://github.com/kkaemong/SSAFY-AI-Challenge"
    },
    {
      id: "hacking",
      title: "Web Hacking Project",
      type: "K-Shield Jr 최종프로젝트",
      period: "2023.10.25 ~ 2023.10.31",
      tech: ["Kali Linux", "Burp Suite", "SQLMap", "OWASP Top 10"],
      role: "웹 애플리케이션 모의 해킹 및 취약점 분석",
      description: "공격자 입장의 취약점 분석을 통해 보안 취약점을 진단하고 대응 방안을 수립한 보안 프로젝트입니다.",
      highlights: [
        "웹 애플리케이션 대상 모의 해킹(Penetration Testing) 및 취약점 분석 수행",
        "Burp Suite를 활용한 HTTP 요청/응답 분석 및 파라미터 변조 테스트 수행",
        "SQLMap을 활용한 SQL Injection 취약점 분석 및 DB 정보 노출 가능성 검증",
        "XSS, Directory Indexing, File Download 취약점 등 OWASP Top 10 기반 보안 취약점 진단",
        "취약점 영향도 분석 후 보안 대응 방안 및 개선 가이드 작성"
      ]
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
  certifications: [
    {
      id: 1,
      title: "정보처리기사 필기",
      date: "2024.02",
      issuer: "한국산업인력공단"
    },
  ],
  contact: {
    email: "junemay31@naver.com",
    blog: "https://velog.io/@junemay31/posts",
    github: "github.com/kkaemong",
    message: "함께 성장하며 빈틈없이 견고한 서비스를 만들어나갈 동료를 기다립니다."
  }
};
