import {
  SectionAnchor, SectionTitle, SubTitle, Para, Callout,
  StepCard, InlineCode, TerminalBlock, CodeBlock, type CodeLine
} from "@/components/DocBlocks";
import { FolderOpen, AlertTriangle } from "lucide-react";

export default function Part2Page() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16 pb-24">
      {/* ── PART 2 ── */}
      <SectionAnchor id="part2-1" />
      <SectionTitle><FolderOpen size={18} className="text-primary" /> PART 2 · 새 폴더(프로젝트)마다 해야 하는 것</SectionTitle>
      <Callout variant="yellow">
        <strong>새 프로젝트 폴더를 만들었다면 아래 6단계를 처음부터 진행하세요.</strong><br />
        C:\a 에서 하던 작업을 C:\b 로 옮겼다면? 아래를 다시 한 번 처음부터 해야 합니다.
      </Callout>

      <SubTitle>2-1. GitHub 저장소(Repository) 만들기</SubTitle>
      <Para>GitHub.com에 로그인 후, 오른쪽 상단 <strong>[+]</strong> 버튼을 눌러 <strong>New repository</strong>를 선택합니다.</Para>
      <StepCard num={1} title="Repository name 입력">
        <p>예: <InlineCode>my-project</InlineCode> — 이 이름이 나중에 사이트 주소의 일부가 됩니다.</p>
        <p className="mt-1">주소 형식: <InlineCode>https://아이디.github.io/my-project/</InlineCode></p>
      </StepCard>
      <StepCard num={2} title="Public으로 설정 후 Create repository 클릭">
        <p>GitHub Pages는 무료 플랜에서 Public 저장소만 지원합니다.</p>
      </StepCard>
      <StepCard num={3} title="저장소 주소 복사">
        <p>생성된 페이지에서 HTTPS 주소를 복사해둡니다.</p>
        <p className="mt-1">예: <InlineCode>https://github.com/honggildong/my-project.git</InlineCode></p>
      </StepCard>

      {/* 2-2 */}
      <SectionAnchor id="part2-2" />
      <SubTitle>2-2. gh-pages 패키지 설치</SubTitle>
      <Para>내 폴더(프로젝트)에 배포 도구를 설치합니다. 반드시 <strong>프로젝트 폴더 안</strong>에서 실행해야 합니다.</Para>
      <TerminalBlock lines={[
        { text: "# 먼저 프로젝트 폴더로 이동", comment: true },
        { text: "cd C:\\my-project" },
        { text: "" },
        { text: "# gh-pages 개발 의존성으로 설치", comment: true },
        { text: "npm install gh-pages --save-dev" },
      ]} />
      <Callout variant="info">
        설치가 끝나면 <InlineCode>node_modules</InlineCode> 폴더와 <InlineCode>package-lock.json</InlineCode> 파일이 생깁니다.<br />
        이것이 "이 폴더만의 도구함"입니다. 다른 폴더와 공유되지 않습니다.
      </Callout>

      {/* 2-3 */}
      <SectionAnchor id="part2-3" />
      <SubTitle>2-3. package.json 수정</SubTitle>
      <Para>배포 주소(<InlineCode>homepage</InlineCode>)와 배포 명령어(deploy script)를 이 폴더의 <InlineCode>package.json</InlineCode>에 추가합니다.</Para>
      
      <Callout variant="yellow">
        <p className="font-semibold mb-2">핵심 포인트 — 노란색 줄 3개만 추가하면 됩니다:</p>
        <p>• <strong>homepage:</strong> <InlineCode>"homepage"</InlineCode> — 내 GitHub 주소로 교체</p>
        <p>• <strong>predeploy:</strong> <InlineCode>"predeploy": "npm run build"</InlineCode> — 배포 전 자동 빌드</p>
        <p>• <strong>deploy:</strong> <InlineCode>"deploy": "gh-pages -d dist"</InlineCode> — 실제 배포 명령어</p>
        <p className="mt-2"><strong>주의:</strong> homepage의 저장소 이름은 GitHub에 만든 저장소 이름과 정확히 일치해야 합니다. 대소문자도 구분합니다.</p>
      </Callout>

      <Callout variant="red">
        <p className="font-semibold mb-2 flex items-center gap-1.5"><AlertTriangle size={14} /> 쉼표(,) 주의 — 가장 흔한 오류입니다!</p>
        <p>JSON은 항목 사이에 쉼표가 있어야 하지만, <strong>마지막 항목 뒤에는 쉼표를 쓰면 안 됩니다.</strong></p>
        <p className="mt-2"><InlineCode>"predeploy"</InlineCode>를 추가하기 전, <strong>바로 위 줄</strong>의 끝에 쉼표가 있는지 확인하세요.</p>
      </Callout>

      {/* 2-4 */}
      <SectionAnchor id="part2-4" />
      <SubTitle>2-4. vite.config.ts 수정</SubTitle>
      <Para>Vite 빌드 시 경로 기준점(<InlineCode>base</InlineCode>)을 저장소 이름으로 설정합니다. 이 설정이 없으면 배포 후 흰 화면만 나옵니다.</Para>
      
      <Callout variant="yellow">
        <p className="font-semibold mb-2">핵심 포인트 — 한 줄만 바꾸면 됩니다:</p>
        <p><InlineCode>base: "/my-project/"</InlineCode> → <InlineCode>base: "/내-저장소-이름/"</InlineCode></p>
        <p className="mt-2"><strong>주의:</strong> 슬래시(<InlineCode>/</InlineCode>)를 앞뒤에 반드시 붙여야 합니다.</p>
      </Callout>

      {/* 2-5 */}
      <SectionAnchor id="part2-5" />
      <SubTitle>2-5. Git 초기화 및 원격 저장소 연결</SubTitle>
      <Para>이 폴더와 GitHub 저장소를 처음으로 연결합니다.</Para>
      <TerminalBlock lines={[
        { text: "# 1. 이 폴더를 Git 관리 폴더로 만들기", comment: true },
        { text: "git init" },
        { text: "" },
        { text: "# 2. GitHub 저장소 주소 연결 (origin이라는 별명으로)", comment: true },
        { text: "git remote add origin https://github.com/아이디/저장소이름.git" },
        { text: "" },
        { text: "# 3. 연결이 잘 됐는지 확인", comment: true },
        { text: "git remote -v" },
      ]} />
      <Callout variant="green">
        <InlineCode>git remote -v</InlineCode> 실행 결과에<br />
        <InlineCode>origin &nbsp;https://github.com/아이디/저장소이름.git (fetch)</InlineCode><br />
        이렇게 나오면 성공입니다.
      </Callout>

      {/* 2-6 */}
      <SectionAnchor id="part2-6" />
      <SubTitle>2-6. 배포 실행 (수정할 때마다 반복)</SubTitle>
      <Para>모든 설정이 끝났다면, 아래 한 줄이 전부입니다. 코드를 수정한 뒤 배포할 때도 이것만 하면 됩니다.</Para>
      <TerminalBlock lines={[{ text: "npm run deploy" }]} />
      <Para>이 명령어 하나가 내부적으로 다음 세 가지를 자동으로 처리합니다:</Para>
      <StepCard num={1} title="빌드 (predeploy)">
        <InlineCode>npm run build</InlineCode>가 자동 실행되어 <InlineCode>dist</InlineCode> 폴더에 배포용 파일이 생성됩니다.
      </StepCard>
      <StepCard num={2} title="gh-pages 브랜치 업로드">
        <InlineCode>dist</InlineCode> 폴더 내용이 GitHub의 <InlineCode>gh-pages</InlineCode> 브랜치로 자동 업로드됩니다.
      </StepCard>
      <StepCard num={3} title="GitHub Pages 자동 배포">
        1~2분 후 <InlineCode>https://아이디.github.io/저장소이름/</InlineCode>에서 사이트를 확인할 수 있습니다.
      </StepCard>
    </div>
  );
}
