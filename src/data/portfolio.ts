export const portfolioData = {
  hero: {
    headline: "비즈니스 가치를 이해하고, 코드로 문제를 해결하는 개발자 진준영(kkaemong) 입니다.",
    subTitle: "경영학적 사고방식을 바탕으로 사용자의 니즈를 파악하고, React와 TypeScript를 활용해 직관적이고 안정적인 웹 서비스를 구축합니다. 사용자에게 실질적인 가치를 전달하는 프로덕트를 만드는 데 집중합니다.",
    cta: {
      primary: "프로젝트 살펴보기",
      secondary: "GitHub 방문하기",
      githubUrl: "https://github.com/kkaemong"
    }
  },
  about: {
    title: "나의 경쟁력",
    description: "경영학 전공 지식을 살려 단순한 코딩을 넘어 서비스의 목적과 사용자 경험(UX)을 깊이 고민합니다. 유연한 기술 습득력으로 웹 프론트엔드부터 Unity, AI까지 필요한 기술을 주저 없이 학습하고 적용합니다.",
    points: [
      {
        title: "비즈니스와 개발의 연결",
        content: "경영학적 사고로 서비스의 목적과 비즈니스 가치를 분석하여 최적의 기술적 솔루션을 제안합니다."
      },
      {
        title: "끊임없는 성장과 증명",
        content: "꾸준한 알고리즘 문제 해결과 자격증 취득(정보처리기사 예정, OPIc IH 목표)을 통해 실력을 검증합니다."
      },
      {
        title: "유연한 기술 습득력",
        content: "프로젝트 필요에 따라 React, Unity, AI 모델링 등 다양한 기술을 빠르게 습득하여 성과를 냅니다."
      }
    ]
  },
  skills: {
    core: ["React", "TypeScript", "Next.js", "JavaScript", "Vue.js", "Pinia", "Zustand"],
    others: ["Unity", "C#", "Python", "PyTorch", "Django", "Socket.IO"],
    tools: ["Git", "GitHub", "Figma", "Burp Suite", "SQLMap"]
  },
  projects: [
    {
      id: "gaesori",
      title: "개소리 릴레이 (Gaesori Relay)",
      type: "Team Project (SSAFY 프론트엔드 특화)",
      period: "2026.01 ~ 2026.02",
      tech: ["React", "TypeScript", "Zustand", "Socket.IO", "Vite"],
      role: "UI/UX 설계 및 프론트엔드 핵심 컴포넌트 개발",
      description: "실시간 멀티플레이어 릴레이 스토리 게임으로, 사용자 간의 즉각적인 인터랙션과 재미를 강조한 서비스입니다.",
      highlights: [
        "컴포넌트 재사용성을 고려한 프론트엔드 아키텍처 설계",
        "사용자 경험 향상을 위한 인터랙티브 UI 구현 및 상태 관리 최적화",
        "Socket.IO를 활용한 실시간 게임 동기화 로직 구현"
      ],
      github: "https://github.com/kkaemong"
    },
    {
      id: "ssaiet",
      title: "SSAIET",
      type: "Team Project (Fullstack)",
      period: "2025.11 ~ 2025.12",
      tech: ["Vue.js", "Pinia", "Django", "JWT", "Kakao Map API"],
      role: "웹 서비스 전반 기능 구현 및 커뮤니티 로직 설계",
      description: "점심 선택 기반 개인 맞춤 저녁 추천 및 식단 관리 서비스입니다.",
      highlights: [
        "Kakao Map API 연동을 통한 주변 식당 탐색 기능 구현",
        "JWT 인증 및 권한 구조 설계를 통한 보안 강화 (IDOR 취약점 해결)",
        "사용자 식단 데이터와 커뮤니티 상호작용을 연결하는 비즈니스 로직 구현"
      ],
      github: "https://github.com/kkaemong"
    },
    {
      id: "jabonju",
      title: "자본주 E.T. (Jabonju E.T.)",
      type: "Personal Project",
      period: "2026.03 ~ 진행 중",
      tech: ["Unity", "C#"],
      role: "1인 개발 (기획, 에셋, 로직 구현)",
      description: "새로운 엔진인 Unity를 학습하여 제작한 런닝 게임입니다.",
      highlights: [
        "Unity 엔진을 스스로 학습하여 게임 로직 및 스크립트 구현",
        "에셋 적용 및 트러블슈팅을 통한 주도적 학습 능력 증명",
        "게임 기획부터 개발까지 1인 전 과정 수행"
      ]
    },
    {
      id: "ai-challenge",
      title: "SSAFY AI Challenge",
      type: "AI Model Development",
      period: "2025.10",
      tech: ["Python", "PyTorch", "Qwen2.5-VL", "LoRA"],
      role: "멀티모달 AI 모델 개발 참여",
      description: "이미지 기반 4지선다형 문제 해결을 위한 멀티모달 AI 모델 개발 프로젝트입니다.",
      highlights: [
        "Qwen2.5-VL 모델을 기반으로 한 멀티모달 문제 해결 파이프라인 구축",
        "모델 정확도를 기존 0.75에서 0.81까지 향상 (하이퍼파라미터 최적화)",
        "LoRA 및 Quantization 기술을 활용한 효율적인 모델 학습 경험"
      ]
    }
  ],
  experience: [
    {
      title: "SSAFY (삼성청년SW아카데미)",
      content: "소프트웨어 개발 인재 양성 과정 수료 (프론트엔드, AI, 핀테크 실무 프로젝트 수행)"
    },
    {
      title: "K-Shield Jr.",
      content: "실무 중심의 정보보안 교육 과정 수료 (웹 취약점 진단 및 모의해킹 경험)"
    },
    {
      title: "협성대학교",
      content: "경영학 학사 졸업 (비즈니스적 가치와 UX에 대한 깊은 이해)"
    }
  ],
  contact: {
    email: "kkaemong@example.com",
    github: "github.com/kkaemong",
    message: "함께 일하고 싶은 동료, 비즈니스 성장에 기여하는 개발자가 되겠습니다."
  }
};
