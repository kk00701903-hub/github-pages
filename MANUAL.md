# 프로젝트 매뉴얼

## 목차
1. [프로젝트 소개](#프로젝트-소개)
2. [기술 스택](#기술-스택)
3. [시작하기](#시작하기)
4. [프로젝트 구조](#프로젝트-구조)
5. [개발 가이드](#개발-가이드)
6. [API 연동](#api-연동)
7. [배포](#배포)
8. [트러블슈팅](#트러블슈팅)

---

## 프로젝트 소개

Vite + React + TypeScript 기반의 모던 웹 애플리케이션입니다. Shadcn UI 컴포넌트 라이브러리와 Tailwind CSS를 사용하여 빠르고 효율적인 UI 개발을 지원합니다.

### 주요 특징
- ⚡ Vite를 통한 빠른 개발 환경
- 🎨 Shadcn UI + Tailwind CSS 기반 디자인 시스템
- 🔒 TypeScript를 통한 타입 안정성
- 🌐 React Router를 통한 클라이언트 사이드 라우팅
- 📦 Zustand를 통한 상태 관리
- 🔄 TanStack Query를 통한 서버 상태 관리
- 🎭 Framer Motion을 통한 애니메이션

---

## 기술 스택

### 핵심 기술
- **프레임워크**: React 18.3.1
- **빌드 도구**: Vite 5.4.1
- **언어**: TypeScript 5.5.3
- **스타일링**: Tailwind CSS 4.0.0
- **UI 라이브러리**: Shadcn UI (Radix UI 기반)

### 주요 라이브러리
- **라우팅**: React Router DOM 6.26.2
- **상태 관리**: Zustand 5.0.9
- **서버 상태**: TanStack Query 5.56.2
- **폼 관리**: React Hook Form 7.53.0 + Zod 3.23.8
- **HTTP 클라이언트**: Axios 1.13.2
- **백엔드**: Supabase 2.55.0
- **애니메이션**: Framer Motion 11.15.0
- **차트**: Recharts 2.12.7
- **아이콘**: Lucide React 0.462.0, React Icons 5.4.0

---

## 시작하기

### 필수 요구사항
- Node.js 18.x 이상
- npm 또는 pnpm

### 설치 및 실행

1. **의존성 설치**
```bash
npm install
# 또는
pnpm install
```

2. **개발 서버 실행**
```bash
npm run dev
```
개발 서버는 `http://localhost:5173`에서 실행됩니다.

3. **프로덕션 빌드**
```bash
npm run build
```

4. **빌드 미리보기**
```bash
npm run preview
```

### 추가 스크립트

- `npm run build:dev` - 개발 모드로 빌드 (소스맵 포함)
- `npm run build:map` - 소스맵을 포함한 프로덕션 빌드
- `npm run lint` - ESLint 검사
- `npm run preview:dev` - 개발 빌드 후 미리보기
- `npm run test:edge-functions` - Supabase Edge Functions 테스트

---

## 프로젝트 구조

```
.
├── public/                 # 정적 파일
├── src/
│   ├── api/               # API 관련 파일
│   │   └── demo.ts       # API 예제
│   ├── components/        # 공통 컴포넌트
│   │   └── ui/           # Shadcn UI 컴포넌트
│   ├── pages/            # 페이지 컴포넌트
│   │   └── [page-name]/
│   │       ├── Index.tsx         # 페이지 진입점
│   │       ├── components/       # 페이지별 컴포넌트
│   │       ├── hooks/           # 페이지별 커스텀 훅
│   │       └── stores/          # 페이지별 상태 관리
│   ├── hooks/            # 전역 커스텀 훅
│   ├── stores/           # 전역 상태 관리
│   ├── utils/            # 유틸리티 함수
│   ├── types/            # TypeScript 타입 정의
│   ├── App.tsx           # 메인 앱 컴포넌트 (라우팅 설정)
│   ├── main.tsx          # 앱 진입점
│   └── index.css         # 전역 스타일
├── supabase/             # Supabase 설정
│   └── edge_function/    # Edge Functions
├── .github/              # GitHub 설정
├── examples/             # 예제 코드
├── dist/                 # 빌드 출력 디렉토리
├── package.json          # 프로젝트 메타데이터 및 의존성
├── vite.config.ts        # Vite 설정
├── tsconfig.json         # TypeScript 설정
├── tailwind.config.ts    # Tailwind CSS 설정
└── components.json       # Shadcn UI 설정
```

---

## 개발 가이드

### 1. 테마 및 스타일 설정

프로젝트 시작 시 사용자 요구사항에 따라 테마를 설정합니다.

**수정 파일:**
- `src/index.css` - CSS 변수 및 전역 스타일
- `tailwind.config.ts` - Tailwind 테마 설정

```css
/* src/index.css 예시 */
:root {
  --primary: 220 90% 56%;
  --secondary: 220 14% 96%;
  /* ... 기타 색상 변수 */
}
```

### 2. 페이지 생성 워크플로우

#### 2.1 페이지 분석
사용자 요구사항을 기반으로 필요한 페이지를 정리합니다.

#### 2.2 페이지 구조 생성
```bash
src/pages/[page-name]/
├── Index.tsx              # 페이지 진입점
├── components/            # 페이지 전용 컴포넌트 (필요시)
├── hooks/                # 페이지 전용 훅 (필요시)
└── stores/               # 페이지 전용 상태 (필요시)
```

#### 2.3 라우팅 설정
`src/App.tsx`에서 라우트를 추가합니다.

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/Index';
import AboutPage from './pages/about/Index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### 3. 컴포넌트 개발 가이드

#### 3.1 단순한 페이지
기능이 단순한 경우 `Index.tsx`에서 모두 처리합니다.

```tsx
// src/pages/simple/Index.tsx
export default function SimplePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Simple Page</h1>
    </div>
  );
}
```

#### 3.2 복잡한 페이지
기능이 복잡한 경우 컴포넌트, 훅, 상태를 분리합니다.

```tsx
// src/pages/complex/Index.tsx
import { UserList } from './components/UserList';
import { useUsers } from './hooks/useUsers';

export default function ComplexPage() {
  const { users, loading } = useUsers();
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Complex Page</h1>
      <UserList users={users} loading={loading} />
    </div>
  );
}
```

```tsx
// src/pages/complex/hooks/useUsers.ts
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '@/api/users';

export function useUsers() {
  const { data: users, isLoading: loading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
  
  return { users: users ?? [], loading };
}
```

### 4. 상태 관리

#### 4.1 Zustand 스토어 생성
복잡한 상태 관리가 필요한 경우 Zustand를 사용합니다.

```tsx
// src/stores/userStore.ts
import { create } from 'zustand';

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
```

### 5. 코드 품질 검사

개발 완료 후 반드시 다음 명령어를 실행하여 검사합니다.

```bash
# 의존성 설치 확인
pnpm install

# ESLint 검사
npm run lint

# TypeScript 타입 검사
npx tsc --noEmit -p tsconfig.app.json --strict
```

발견된 문제를 모두 수정한 후 커밋합니다.

---

## API 연동

### 1. API 파일 생성

새로운 API 엔드포인트를 추가할 때는 `src/api/` 디렉토리에 파일을 생성합니다.

```tsx
// src/api/users.ts
import axios from 'axios';

// 타입 정의
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
}

// API 함수
export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axios.get('/api/users');
  return data;
};

export const createUser = async (userData: CreateUserRequest): Promise<User> => {
  const { data } = await axios.post('/api/users', userData);
  return data;
};
```

### 2. Supabase 연동

Supabase를 사용하는 경우 클라이언트를 먼저 설정합니다.

```tsx
// src/api/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

```tsx
// src/api/posts.ts
import { supabase } from './supabase';

export interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export const fetchPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
};

export const createPost = async (post: Omit<Post, 'id' | 'created_at'>): Promise<Post> => {
  const { data, error } = await supabase
    .from('posts')
    .insert([post])
    .select()
    .single();
    
  if (error) throw error;
  return data;
};
```

### 3. React Query 사용

```tsx
// src/pages/posts/Index.tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, createPost, type Post } from '@/api/posts';

export default function PostsPage() {
  const queryClient = useQueryClient();
  
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
  
  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
  
  // ... 컴포넌트 렌더링
}
```

### 4. 타입 안정성 유지

- API 파일에서 타입을 정의하고 export합니다.
- 타입 변경 시 모든 사용처를 확인합니다.
- 가능한 한 기존 타입 수정을 피하고, 새로운 타입을 생성합니다.

---

## 배포

### GitHub Pages 배포

이 프로젝트는 GitHub Pages로 배포되도록 설정되어 있습니다.

**배포 URL**: https://kk00701903-hub.github.io/github-pages/

#### 배포 방법

1. **빌드 실행**
```bash
npm run build
```

2. **GitHub Actions를 통한 자동 배포**
- `.github/workflows/` 디렉토리에 워크플로우 설정
- main 브랜치에 push 시 자동 배포

3. **수동 배포 (gh-pages 사용)**
```bash
npm install -g gh-pages
gh-pages -d dist
```

### 환경 변수 설정

배포 환경에서 필요한 환경 변수를 설정합니다.

```env
# .env.production
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_API_BASE_URL=your-api-base-url
```

---

## 트러블슈팅

### 일반적인 문제

#### 1. 빌드 실패
```bash
# 캐시 삭제 후 재빌드
rm -rf node_modules dist
npm install
npm run build
```

#### 2. TypeScript 오류
```bash
# tsconfig 확인
npx tsc --noEmit -p tsconfig.app.json --strict
```

#### 3. ESLint 오류
```bash
# 자동 수정 시도
npm run lint -- --fix
```

#### 4. 의존성 충돌
```bash
# package-lock.json 삭제 후 재설치
rm package-lock.json
npm install
```

### Vite 관련

#### HMR이 작동하지 않을 때
```ts
// vite.config.ts
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
  },
});
```

#### 환경 변수가 인식되지 않을 때
- 환경 변수는 반드시 `VITE_` 접두사로 시작해야 합니다.
- 개발 서버를 재시작합니다.

### Supabase 관련

#### 인증 오류
- Supabase 프로젝트 설정에서 Anon Key를 확인합니다.
- 환경 변수가 올바르게 설정되었는지 확인합니다.

#### RLS (Row Level Security) 오류
- Supabase 대시보드에서 테이블의 RLS 정책을 확인합니다.
- 필요한 권한이 설정되어 있는지 확인합니다.

---

## 참고 자료

- [Vite 공식 문서](https://vitejs.dev/)
- [React 공식 문서](https://react.dev/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase 문서](https://supabase.com/docs)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zustand](https://github.com/pmndrs/zustand)

---

## 기여 가이드

프로젝트에 기여하고 싶으신 경우:

1. 이슈를 생성하여 논의합니다.
2. Fork 후 feature 브랜치를 생성합니다.
3. 코드를 작성하고 테스트합니다.
4. Pull Request를 생성합니다.

### 커밋 메시지 규칙

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅, 세미콜론 누락 등
refactor: 코드 리팩토링
test: 테스트 코드 추가
chore: 빌드 작업, 패키지 매니저 설정 등
```

---

## 라이선스

이 프로젝트의 라이선스 정보를 여기에 추가하세요.

---

## 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.
