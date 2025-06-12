### 🎵 Vibely 프로젝트

----

### 📌 프로젝트 개요
Spotify + Gemini AI 연동 음악 큐레이션 플랫폼
사용자 감정/상황 분석을 통해 AI가 음악 추천 및 플레이리스트 관리를 지원하는 서비스

----

### 📁 디렉토리 구조
```
src/
├── api/                      # API 요청 모듈 (axios 인스턴스, Spotify/Gemini API)
│   ├── axiosInstance.ts
│   ├── spotify.ts
│   └── gemini.ts
│
├── assets/                   # 이미지, 폰트, 아이콘 등 정적 파일
│
├── components/               # UI 컴포넌트
│   ├── ai/                   # AI 음악 추천 챗봇
│   │   ├── AIChat.tsx
│   │   ├── Chat.tsx
│   │   └── Prompt.tsx
│   ├── common/               # 공통/재사용 컴포넌트
│   │   ├── Button.tsx
│   │   ├── Error.tsx
│   │   ├── Header.tsx
│   │   └── PlayerBar.tsx
│   ├── music/                # 앨범/플레이리스트 관련 UI
│   │   ├── Album.tsx
│   │   ├── AlbumList.tsx
│   │   ├── AlbumTrack.tsx
│   │   ├── Playlist.tsx
│   │   └── PlaylistItem.tsx
│
├── hooks/                    # 커스텀 훅
│   ├── useAuth.ts
│   └── useSpotifyId.ts
│
├── layouts/                  # 레이아웃 컴포넌트
│   └── Layout.tsx
│
├── models/                   # 데이터 모델 타입
│   ├── album.model.ts
│   ├── player.model.ts
│   └── playlist.model.ts
│
├── pages/                    # 라우트별 페이지
│   ├── Main.tsx
│   ├── Detail.tsx
│   ├── Callback.tsx
│   └── Landing.tsx
│
├── routes/                   # 라우터 설정
│   └── AppRoutes.tsx
│
├── stores/                   # Zustand 상태 관리
│   └── userStore.ts
│
├── types/                    # 전역 타입 정의
│   └── spotify.d.ts
│
├── utils/                    # 유틸 함수
│   ├── formatDate.ts
│   └── auth.ts
│
├── App.tsx                   # 앱 루트
├── main.tsx                  # 엔트리 포인트
└── index.css                 # Tailwind 포함 전역 스타일
```

----
### 🛠️ 주요 기술 스택

React (컴포넌트 기반 UI)

TypeScript (정적 타입)

Zustand (전역 상태 관리)

Tailwind CSS (유틸리티 퍼스트 스타일링)

@tanstack/react-query (서버 상태/비동기 데이터 관리)

react-router-dom (SPA 라우팅)

axios (API 통신)

react-icons (아이콘)

dotenv (환경변수)

----

### 🧩 주요 프론트엔드 기능
**AI 음악 추천 챗봇
**
- 감정/상황 입력 → Gemini API → Spotify 플레이리스트 추천

  주요 컴포넌트: AIChat.tsx, Chat.tsx, Prompt.tsx

**앨범/플레이리스트 리스트 및 상세
**
- 최신 앨범, 좋아요한 앨범/플레이리스트, 상세 트랙 정보

  주요 컴포넌트: AlbumList.tsx, Playlist.tsx, AlbumTrack.tsx, PlaylistItem.tsx

**음악 플레이어
**
- 재생, 일시정지, 볼륨/시크바, 이전/다음 트랙

주요 컴포넌트: PlayerBar.tsx, 상태 관리: player.model.ts, userStore.ts

**인증 및 사용자 상태
**
- Spotify OAuth 콜백 처리, 로그인 상태 유지

주요 컴포넌트/훅: useAuth.ts, Callback.tsx

**공통 UI/UX
**
- 버튼, 헤더, 에러 처리 등

주요 컴포넌트: Button.tsx, Header.tsx, Error.tsx

----
### 💡 기타 특징
프롬프트 엔지니어링 기반 AI 추천 기능에 집중

고정 요소와 일관된 디자인 설계

SPA 구조와 컴포넌트 재사용성 극대화

----

### 🚀 실행 방법
.env 환경변수 설정

npm install으로 패키지 설치

npm run dev 또는 vite dev로 개발 서버 실행
