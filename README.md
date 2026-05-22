# 👨‍💻 진준영 (kkaemong) - Software Engineer

<div align="center">
  <h2>💡 사고는 유연하게, 구조는 견고하게</h2>
  <p>단순한 코드 작성을 넘어 비즈니스의 비전과 사용자 가치를 정밀하게 코드로 이식하는 융합형 소프트웨어 엔지니어 <b>진준영</b>입니다.</p>
  <p>비전공자로서 SSAFY를 거쳐 다져진 탄탄한 CS 및 알고리즘 깊이를 바탕으로 기획의 의도를 가장 견고하고 효율적인 아키텍처로 구현하며,<br>프레임 병목 해결과 메모리 누수 방지 등 눈에 보이지 않는 '실제 구동 성능'까지 집요하게 튜닝하며 개발의 가치를 더합니다.</p>
</div>

---

## 🛠 Tech Stack

### 🎮 Real-time Client & WebGL
![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white)
![Unity](https://img.shields.io/badge/Unity-222C37?style=for-the-badge&logo=unity&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

### 🐍 Core Backend & Deep Learning
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![DRF](https://img.shields.io/badge/DRF-EE4C2C?style=for-the-badge&logo=django&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)
![HuggingFace](https://img.shields.io/badge/HuggingFace-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)

### 🔧 Collaboration & DevOps
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

---

## 🚀 Projects & Key Outcomes

* **🎮 [자본주 E.T. (zabonzooET)](https://github.com/kkaemong/zabonzooET)**
  * **WebGL 기반 2D 러너 금융 학습 게임 클라이언트 개발** (`C#` / `Unity` / `Spring Boot` / `AWS`)
  * 🏆 **SSAFY 특화 프로젝트 핀테크 트랙 우수상 (2위) 수상**
  * 💡 *단일 스레드 WebGL 빌드 환경에서 객체 풀링(Object Pooling) 시스템 설계로 GC 메모리 최적화 및 60fps 고정*
  * 💡 *FixedUpdate 물리 주기 기반의 2D 점프 컨트롤러 구현 및 Raycast 지면 감지 지터링 감쇠 최적화*
  * 💡 *C# `UnityWebRequest` 기반 커스텀 REST API 통신 모듈(APIManager.cs) 설계로 백엔드 퀴즈 실시간 동기화*

* **💬 [개소릴레이 (gaesorelay)](https://github.com/gaesorelay/frontend)**
  * **실시간 멀티플레이 릴레이 스토리 웹 게임 서비스** (`React` / `TypeScript` / `Zustand` / `Vite` / `WebSocket`)
  * 💡 *Zustand를 활용해 전역 게임 타이머 및 턴 전환 상태 머신을 메모리 상에서 완벽히 격리*
  * 💡 *소켓 패킷 폭증 시 뷰 렌더링 렉을 방지하기 위해 React.memo 및 useCallback 기반 렌더링 스코프 정밀 최적화*
  * 💡 *TypeScript 기반의 엄격한 데이터 패킷 Props 모델링 설계로 실시간 런타임 안정성 보장*

* **🍳 [SSAIET (개인 맞춤형 식단 관리)](https://github.com/kkaemong/Final-PJT)**
  * **사용자 맞춤형 점심 기반 저녁 추천 및 커뮤니티 플랫폼** (`Vue.js` / `Django` / `DRF` / `SQLite`)
  * 💡 *Django REST Framework(DRF) API 서버 단독 데이터 모델링 설계 및 RESTful 규격 정비*
  * 💡 *Django ORM의 `select_related` 및 `prefetch_related` 캐싱 조인 최적화를 통한 N+1 쿼리 해소 및 응답 지연 해결*

* **🧠 [SSAFY AI Challenge](https://github.com/kkaemong/SSAFY-AI-Challenge)**
  * **4지선다형 Vision-Language 문제 해결 멀티모달 AI 모델 구축** (`PyTorch` / `Hugging Face` / `Qwen2.5-VL` / `LoRA`)
  * 💡 *Qwen2.5-VL 이미지-텍스트 복합 추론 파이프라인 설계로 **최종 추론 정확도(Accuracy) 6%p 향상** 달성*
  * 💡 *PEFT(LoRA) 기법 가중치 어댑터 세팅 및 bfloat16 정밀도 가속 최적화로 1대 GPU 극도의 한계 인프라 극복*

* **🛡️ Web Hacking Project (K-Shield Jr)**
  * **OWASP Top 10 기반 웹 애플리케이션 모의 해킹 및 취약점 분석** (`Burp Suite` / `SQLMap` / `Kali Linux`)
  * 💡 *Burp Suite 프록시 패킷 변조 및 실시간 세션 변조 우회 모의 해킹 공격 시나리오 실증*
  * 💡 *SQLMap을 활용한 데이터베이스 자동 점검 검증 및 XSS, Directory Indexing 대응 방어 가이드라인 수립*

---

## 🎓 Education & Credentials
- **🏫 SSAFY AI 아카데미 14기** | Python 트랙 과정을 통한 CS 기본기 학습 및 웹/게임 클라이언트 부문 프로젝트 수행 (2025.07 ~ 현재)
- **🏫 협성대학교 경영학 전공** | 경영 데이터 분석 및 비즈니스 통계 이론 이수 (2018.03 ~ 2024.08)
- **🛡️ 과학기술정보통신부 제 11기 K-Shield Jr** | 실무 중심의 정보보안 및 웹 취약점 진단 과정 200시간 수료 (2023.09 ~ 2023.10)
- **🌴 Philippines Residency** | 7년 해외 거주를 통한 자연스러운 영어 회화 및 글로벌 커뮤니케이션 역량 확보 (2002 ~ 2009)

---

## 📫 Contact
* 📧 Email: **junemay31@naver.com**
* 📝 Blog: **[Velog](https://velog.io/@junemay31/posts)**
* 💻 GitHub: **[github.com/kkaemong](https://github.com/kkaemong)**
