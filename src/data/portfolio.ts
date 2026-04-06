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
      { label: "주소지", value: "경기도 남양주시 " },
      { label: "연락처", value: "010-7544-7257" },
      { label: "이메일", value: "junemay31@naver.com" },
      { label: "학력", value: "협성대학교 (경영학과)" }
    ],
    points: [
      {
        title: "유연한 사고",
        content: "프로덕트의 비즈니스 목적을 깊이 이해하고, 서비스의 성장에 실질적으로 기여할 수 있는 \n기술적 결정을 내립니다."
      },
      {
        title: "견고한 설계",
        content: "백엔드 이해도를 바탕으로 전체 데이터 흐름을 고려하며, 확장 가능하고 유지보수가 쉬운 \n프론트엔드 아키텍처를 설계합니다."
      },
      {
        title: "협업의 가치",
        content: "다양한 문화권에서의 경험을 바탕으로 기술적, 인간적 소통의 장벽을 허물며 팀과 유연하게 협업합니다."
      }
    ]
  },
  skills: {
    frontend: [
      { name: "React", level: 90, icon: "react" },
      { name: "TypeScript", level: 85, icon: "typescript" },
      { name: "Vue.js", level: 80, icon: "vuedotjs" },
      { name: "JavaScript", level: 90, icon: "javascript" },
      { name: "HTML5", level: 95, icon: "html5" },
      { name: "Vite", level: 85, icon: "vite" },
      { name: "Zustand", level: 85, icon: "redux" },
      { name: "Next.js", level: 80, icon: "nextdotjs" }
    ],
    backendAI: [
      { name: "Python", level: 65, icon: "python" },
      { name: "Django", level: 60, icon: "django" },
      { name: "DRF", level: 60, icon: "django" },
      { name: "PyTorch", level: 50, icon: "pytorch" },
      { name: "HuggingFace", level: 45, icon: "huggingface" },
      { name: "LoRA", level: 50, icon: "pytorch" }
    ],
    tools: [
      { name: "Git", level: 90, icon: "git" },
      { name: "GitHub", level: 90, icon: "github" },
      { name: "Figma", level: 85, icon: "figma" },
      { name: "Postman", level: 85, icon: "postman" },
      { name: "Burp Suite", level: 70, icon: "burpsuite" }
    ]
  },
  projects: [
    {
      id: "gaesorelay",
      title: "개소릴레이 (gaesorelay)",
      type: "SSAFY 2학기 공통 프로젝트",
      period: "2026.01.12 ~ 2026.02.09",
      tech: ["Vite", "Figma", "React", "TypeScript"],
      role: "Frontend",
      description: "웹소켓 & AI를 활용한 릴레이 스토리텔링 게임",
      image: "/gaesorlay.png",
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
