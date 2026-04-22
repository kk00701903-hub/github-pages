import {
  SectionAnchor, SectionTitle, SubTitle, Para, Callout,
  CodeBlock, TerminalBlock, StepCard, InlineCode, SummaryTable,
  type SummaryRow,
} from "@/components/DocBlocks";
import { ConfigGenerator } from "@/components/ConfigGenerator";
import { Monitor, FolderOpen, AlertTriangle, RefreshCw, Workflow } from "lucide-react";
import { useState, useCallback } from "react";

/* ── YAML 코드블록 헬퍼 ── */
type WRow = { num: number | string; jsx: React.ReactNode; hl?: "add" | "key" | "" };
const yk  = (t: string) => <span className="text-sky-300">{t}</span>;
const yv  = (t: string) => <span className="text-amber-300 font-bold">{t}</span>;
const ya  = (t: string) => <span className="text-emerald-300 font-bold">{t}</span>;
const yn  = (t: string) => <span className="text-slate-300">{t}</span>;

const VITE_WORKFLOW_ROWS: WRow[] = [
  { num:  1, jsx: <>{yk("name")}{yn(": ")}{yv("Deploy to GitHub Pages")}</> },
  { num:  2, jsx: yn("") },
  { num:  3, jsx: <>{yk("on")}{yn(":")}</> },
  { num:  4, jsx: <>{yn("  ")}{yk("push")}{yn(":")}</> },
  { num:  5, jsx: <>{yn("    ")}{yk("branches")}{yn(": [")}{yv("master")}{yn("]")}</> },
  { num:  6, jsx: yn("") },
  { num:  7, jsx: <>{yk("permissions")}{yn(":")}</>, hl: "add" },
  { num:  8, jsx: <>{yn("  ")}{yk("contents")}{yn(": ")}{ya("read")}</>, hl: "add" },
  { num:  9, jsx: <>{yn("  ")}{yk("pages")}{yn(":    ")}{ya("write")}</>, hl: "add" },
  { num: 10, jsx: <>{yn("  ")}{yk("id-token")}{yn(": ")}{ya("write")}</>, hl: "add" },
  { num: 11, jsx: yn("") },
  { num: 12, jsx: <>{yk("concurrency")}{yn(":")} </> },
  { num: 13, jsx: <>{yn("  ")}{yk("group")}{yn(': "pages"')}</> },
  { num: 14, jsx: <>{yn("  ")}{yk("cancel-in-progress")}{yn(": false")}</> },
  { num: 15, jsx: yn("") },
  { num: 16, jsx: <>{yk("jobs")}{yn(":")}</> },
  { num: 17, jsx: <>{yn("  ")}{yk("deploy")}{yn(":")}</> },
  { num: 18, jsx: <>{yn("    ")}{yk("environment")}{yn(":")}</> },
  { num: 19, jsx: <>{yn("      ")}{yk("name")}{yn(": github-pages")}</> },
  { num: 20, jsx: <>{yn("      ")}{yk("url")}{yn(": ${{ steps.deployment.outputs.page_url }}")}</> },
  { num: 21, jsx: <>{yn("    ")}{yk("runs-on")}{yn(": ubuntu-latest")}</> },
  { num: 22, jsx: <>{yn("    ")}{yk("steps")}{yn(":")}</> },
  { num: 23, jsx: <>{yn("      - ")}{yk("name")}{yn(": Checkout")}</> },
  { num: 24, jsx: <>{yn("        ")}{yk("uses")}{yn(": actions/checkout@v4")}</> },
  { num: 25, jsx: yn("") },
  { num: 26, jsx: <>{yn("      - ")}{yk("name")}{yn(": Setup Node")}</> },
  { num: 27, jsx: <>{yn("        ")}{yk("uses")}{yn(": actions/setup-node@v4")}</> },
  { num: 28, jsx: <>{yn("        ")}{yk("with")}{yn(":")}</> },
  { num: 29, jsx: <>{yn("          ")}{yk("node-version")}{yn(": 20")}</> },
  { num: 30, jsx: <>{yn("          ")}{yk("cache")}{yn(": 'npm'")}</> },
  { num: 31, jsx: yn("") },
  { num: 32, jsx: <>{yn("      - ")}{yk("name")}{yn(": Install dependencies")}</> },
  { num: 33, jsx: <>{yn("        ")}{yk("run")}{yn(": npm ci")}</> },
  { num: 34, jsx: yn("") },
  { num: 35, jsx: <>{yn("      - ")}{yk("name")}{yn(": Build")}</> },
  { num: 36, jsx: <>{yn("        ")}{yk("run")}{yn(": npm run build")}</> },
  { num: 37, jsx: yn("") },
  { num: 38, jsx: <>{yn("      - ")}{yk("name")}{yn(": Setup Pages")}</> },
  { num: 39, jsx: <>{yn("        ")}{yk("uses")}{yn(": actions/configure-pages@v5")}</> },
  { num: 40, jsx: yn("") },
  { num: 41, jsx: <>{yn("      - ")}{yk("name")}{yn(": Upload artifact")}</> },
  { num: 42, jsx: <>{yn("        ")}{yk("uses")}{yn(": actions/upload-pages-artifact@v3")}</> },
  { num: 43, jsx: <>{yn("        ")}{yk("with")}{yn(":")}</> },
  { num: 44, jsx: <>{yn("          ")}{yk("path")}{yn(": ")}{yv("'./dist'")}</>, hl: "add" },
  { num: 45, jsx: yn("") },
  { num: 46, jsx: <>{yn("      - ")}{yk("name")}{yn(": Deploy to GitHub Pages")}</> },
  { num: 47, jsx: <>{yn("        ")}{yk("id")}{yn(": deployment")}</> },
  { num: 48, jsx: <>{yn("        ")}{yk("uses")}{yn(": actions/deploy-pages@v4")}</> },
];

const NEXT_WORKFLOW_ROWS: WRow[] = [
  { num:  1, jsx: <>{yk("name")}{yn(": ")}{yv("Deploy Next.js to GitHub Pages")}</> },
  { num:  2, jsx: yn("") },
  { num:  3, jsx: <>{yk("on")}{yn(":")}</> },
  { num:  4, jsx: <>{yn("  ")}{yk("push")}{yn(":")}</> },
  { num:  5, jsx: <>{yn("    ")}{yk("branches")}{yn(": [")}{yv("master")}{yn("]")}</> },
  { num:  6, jsx: yn("") },
  { num:  7, jsx: <>{yk("permissions")}{yn(":")}</>, hl: "add" },
  { num:  8, jsx: <>{yn("  ")}{yk("contents")}{yn(": ")}{ya("read")}</>, hl: "add" },
  { num:  9, jsx: <>{yn("  ")}{yk("pages")}{yn(":    ")}{ya("write")}</>, hl: "add" },
  { num: 10, jsx: <>{yn("  ")}{yk("id-token")}{yn(": ")}{ya("write")}</>, hl: "add" },
  { num: 11, jsx: yn("") },
  { num: 12, jsx: <>{yk("concurrency")}{yn(":")}</> },
  { num: 13, jsx: <>{yn("  ")}{yk("group")}{yn(': "pages"')}</> },
  { num: 14, jsx: <>{yn("  ")}{yk("cancel-in-progress")}{yn(": false")}</> },
  { num: 15, jsx: yn("") },
  { num: 16, jsx: <>{yk("jobs")}{yn(":")}</> },
  { num: 17, jsx: <>{yn("  ")}{yk("build")}{yn(":")}</> },
  { num: 18, jsx: <>{yn("    ")}{yk("runs-on")}{yn(": ubuntu-latest")}</> },
  { num: 19, jsx: <>{yn("    ")}{yk("steps")}{yn(":")}</> },
  { num: 20, jsx: <>{yn("      - ")}{yk("name")}{yn(": Checkout")}</> },
  { num: 21, jsx: <>{yn("        ")}{yk("uses")}{yn(": actions/checkout@v4")}</> },
  { num: 22, jsx: yn("") },
  { num: 23, jsx: <>{yn("      - ")}{yk("name")}{yn(": Setup Node")}</> },
  { num: 24, jsx: <>{yn("        ")}{yk("uses")}{yn(": actions/setup-node@v4")}</> },
  { num: 25, jsx: <>{yn("        ")}{yk("with")}{yn(":")}</> },
  { num: 26, jsx: <>{yn("          ")}{yk("node-version")}{yn(": 20")}</> },
  { num: 27, jsx: <>{yn("          ")}{yk("cache")}{yn(": 'npm'")}</> },
  { num: 28, jsx: yn("") },
  { num: 29, jsx: <>{yn("      - ")}{yk("name")}{yn(": Install dependencies")}</> },
  { num: 30, jsx: <>{yn("        ")}{yk("run")}{yn(": npm ci")}</> },
  { num: 31, jsx: yn("") },
  { num: 32, jsx: <>{yn("      - ")}{yk("name")}{yn(": Build with Next.js")}</> },
  { num: 33, jsx: <>{yn("        ")}{yk("run")}{yn(": npm run build")}</> },
  { num: 34, jsx: yn("") },
  { num: 35, jsx: <>{yn("      - ")}{yk("name")}{yn(": Upload artifact")}</> },
  { num: 36, jsx: <>{yn("        ")}{yk("uses")}{yn(": actions/upload-pages-artifact@v3")}</> },
  { num: 37, jsx: <>{yn("        ")}{yk("with")}{yn(":")}</> },
  { num: 38, jsx: <>{yn("          ")}{yk("path")}{yn(": ")}{yv("'./out'")}</>, hl: "add" },
  { num: 39, jsx: yn("") },
  { num: 40, jsx: <>{yn("  ")}{yk("deploy")}{yn(":")}</> },
  { num: 41, jsx: <>{yn("    ")}{yk("environment")}{yn(":")}</> },
  { num: 42, jsx: <>{yn("      ")}{yk("name")}{yn(": github-pages")}</> },
  { num: 43, jsx: <>{yn("      ")}{yk("url")}{yn(": ${{ steps.deployment.outputs.page_url }}")}</> },
  { num: 44, jsx: <>{yn("    ")}{yk("runs-on")}{yn(": ubuntu-latest")}</> },
  { num: 45, jsx: <>{yn("    ")}{yk("needs")}{yn(": build")}</> },
  { num: 46, jsx: <>{yn("    ")}{yk("steps")}{yn(":")}</> },
  { num: 47, jsx: <>{yn("      - ")}{yk("name")}{yn(": Deploy to GitHub Pages")}</> },
  { num: 48, jsx: <>{yn("        ")}{yk("id")}{yn(": deployment")}</> },
  { num: 49, jsx: <>{yn("        ")}{yk("uses")}{yn(": actions/deploy-pages@v4")}</> },
];

const VITE_WORKFLOW_TEXT = `.github/workflows/deploy.yml

name: Deploy to GitHub Pages
on:
  push:
    branches: [master]
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: "pages"
  cancel-in-progress: false
jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`;

const NEXT_WORKFLOW_TEXT = `.github/workflows/deploy.yml

name: Deploy Next.js to GitHub Pages
on:
  push:
    branches: [master]
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: "pages"
  cancel-in-progress: false
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build with Next.js
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './out'
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`;

function CicdCopyBtn({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(async () => {
    const text = id === "vite-workflow" ? VITE_WORKFLOW_TEXT : NEXT_WORKFLOW_TEXT;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [id]);
  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md transition-all duration-200
        ${copied
          ? "bg-green-500/20 text-green-400 border border-green-500/30"
          : "bg-slate-700/60 text-slate-300 border border-slate-600/50 hover:bg-slate-600/60 hover:text-white"
        }`}
    >
      {copied ? "✓ 복사됨" : "복사"}
    </button>
  );
}

export default function DocContent() {
  const summaryRows: SummaryRow[] = [
    { task: "Node.js / Git 프로그램 설치",       redo: "no",     reason: "컴퓨터 시스템에 이미 설치됨" },
    { task: "Git 이름/이메일 전역 설정",          redo: "no",     reason: "컴퓨터 전체(Global) 설정임" },
    { task: "npm install gh-pages",              redo: "yes",    reason: "폴더마다 node_modules를 따로 가짐" },
    { task: "package.json 수정 (homepage)",      redo: "yes",    reason: "프로젝트마다 이름과 주소가 다름" },
    { task: "vite.config.ts 수정 (base)",        redo: "yes",    reason: "프로젝트마다 경로 기준점이 다름" },
    { task: "git init / git remote add",         redo: "yes",    reason: "새 폴더를 새 창고에 연결해야 함" },
    { task: "npm run deploy",                    redo: "always", reason: "수정사항을 반영할 때 쓰는 유일한 버튼" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 pb-24">

      {/* ── 시작하기 ── */}
      <SectionAnchor id="intro" />
      <div className="mb-10">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary bg-accent px-3 py-1 rounded-full mb-4">
          GitHub Pages 배포 가이드
        </span>
        <h1 className="text-3xl font-bold text-foreground leading-tight mb-3">
          처음 해도 OK<br />
          <span className="text-primary">GitHub 페이지 배포</span> 완전 가이드
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          React + Vite 프로젝트를 GitHub Pages에 올리는 전체 과정을<br />
          <strong className="text-foreground">"한 번만 하면 되는 것"</strong>과{" "}
          <strong className="text-foreground">"새 폴더마다 해야 하는 것"</strong>으로 나눠 설명합니다.
        </p>
      </div>

      {/* ── 설정 생성기 ── */}
      <SectionAnchor id="generator" />
      <ConfigGenerator />

      {/* ── 핵심 개념 ── */}
      <SectionAnchor id="concept" />
      <SectionTitle>핵심 개념 — 먼저 이것만 이해하세요</SectionTitle>
      <Callout variant="info">
        <p className="font-semibold mb-1">비유로 이해하기</p>
        <p>Node.js와 Git 설치는 <strong>내 방에 전동 드릴을 사는 것</strong>입니다.<br />
        한 번 사면 어느 집(폴더)에 가도 가져다 쓸 수 있죠.</p>
        <p className="mt-2">반면 npm install, git init 등은 <strong>각 공사 현장(폴더)마다 자재를 주문하는 것</strong>입니다.<br />
        공사 현장이 바뀌면 자재도 새로 주문해야 합니다.</p>
      </Callout>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
        <div className="border border-green-200 rounded-xl p-4 bg-green-50">
          <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-3 flex items-center gap-1.5">
            <Monitor size={13} /> 컴퓨터에 딱 한 번만
          </p>
          <ul className="space-y-1.5 text-sm text-green-900">
            <li>• Node.js 설치</li>
            <li>• Git 설치</li>
            <li>• Git 이름/이메일 전역 설정</li>
          </ul>
        </div>
        <div className="border border-blue-200 rounded-xl p-4 bg-blue-50">
          <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-3 flex items-center gap-1.5">
            <FolderOpen size={13} /> 새 폴더마다 다시 해야 함
          </p>
          <ul className="space-y-1.5 text-sm text-blue-900">
            <li>• npm install gh-pages</li>
            <li>• package.json 수정</li>
            <li>• vite.config.ts 수정</li>
            <li>• git init / remote add</li>
            <li>• npm run deploy</li>
          </ul>
        </div>
      </div>

      {/* ── PART 1 ── */}
      <SectionAnchor id="part1" />
      <SectionTitle><Monitor size={18} className="text-primary" /> PART 1 · 컴퓨터에 딱 한 번만 하는 것</SectionTitle>
      <Callout variant="green">
        아래 3가지는 <strong>이미 하셨다면 절대 다시 할 필요 없습니다.</strong><br />
        새 프로젝트 폴더를 만들어도 이 작업은 그대로 유효합니다.
      </Callout>

      <StepCard num={1} title="Node.js 설치">
        <p>Node.js는 JavaScript를 내 컴퓨터에서 실행하게 해주는 프로그램입니다. npm(패키지 관리자)도 함께 설치됩니다.</p>
        <p className="mt-1">공식 사이트 <strong>nodejs.org</strong>에서 LTS 버전을 받아 설치 후 확인:</p>
        <TerminalBlock lines={[
          { text: "node -v    # 예: v20.11.0 이 나오면 성공", comment: false },
          { text: "npm  -v    # 예: 10.2.4  이 나오면 성공", comment: false },
        ]} />
      </StepCard>

      <StepCard num={2} title="Git 설치">
        <p>Git은 코드 변경 이력을 관리하고 GitHub에 업로드할 수 있게 해주는 프로그램입니다.</p>
        <p className="mt-1"><strong>git-scm.com</strong>에서 Windows용 Git을 받아 설치 후 확인:</p>
        <TerminalBlock lines={[
          { text: "git --version    # 예: git version 2.43.0.windows.1" },
        ]} />
      </StepCard>

      <StepCard num={3} title="Git 사용자 이름 / 이메일 전역 설정">
        <p>"이 컴퓨터에서 커밋하는 사람은 나입니다"라고 전체 컴퓨터에 한 번 등록하는 작업입니다.<br />
        <InlineCode>--global</InlineCode> 옵션 덕분에 폴더가 달라져도 이 설정은 계속 유효합니다.</p>
        <TerminalBlock lines={[
          { text: 'git config --global user.name  "홍길동"' },
          { text: 'git config --global user.email "honggildong@example.com"' },
          { text: "" },
          { text: "# 올바르게 저장됐는지 확인", comment: true },
          { text: "git config --global --list" },
        ]} />
      </StepCard>

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
        { text: "cd C:\\b" },
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
      <CodeBlock lines={[
        { num: 1,  text: "{" },
        { num: 2,  text: '  "name": "vite_react_shadcn_ts",' },
        { num: 3,  text: '  "private": true,' },
        { num: 4,  text: '  "version": "0.0.0",' },
        { num: 5,  text: '  "homepage": "https://kk00701903-hub.github.io/chinese-exam/",', highlight: true },
        { num: 6,  text: '  "type": "module",' },
        { num: 7,  text: '  "scripts": {' },
        { num: 8,  text: '    "dev": "VITE_ENABLE_ROUTE_MESSAGING=true vite",' },
        { num: 9,  text: '    "build": "vite build",' },
        { num: 10, text: '    "build:dev": "... vite build --mode development --sourcemap",' },
        { num: 11, text: '    "build:map": "... vite build --sourcemap",' },
        { num: 12, text: '    "lint": "eslint .",' },
        { num: 13, text: '    "preview": "vite preview",' },
        { num: 14, text: '    "preview:dev": "npm run build:dev && npm run preview",' },
        { num: 15, text: '    "test:edge-functions": "cd supabase/edge_function && deno task test",' },
        { num: 16, text: '    "predeploy": "npm run build",', highlight: true },
        { num: 17, text: '    "deploy": "gh-pages -d dist"', highlight: true },
        { num: 18, text: '  },' },
        { num: 19, text: '  "dependencies": {' },
        { num: 20, text: '    "@hookform/resolvers": "^3.9.0",' },
        { num: 21, text: '    "@iconify/react": "^6.0.2",' },
        { num: 22, text: '    "@radix-ui/react-accordion": "^1.2.0",' },
        { num: 23, text: '    "@radix-ui/react-alert-dialog": "^1.1.1",' },
        { num: 24, text: '    "@radix-ui/react-aspect-ratio": "^1.1.0",' },
        { num: 25, text: '    "@radix-ui/react-avatar": "^1.1.0",' },
        { num: 26, text: '    "@radix-ui/react-checkbox": "^1.1.1",' },
        { num: 27, text: '    "@radix-ui/react-collapsible": "^1.1.0",' },
        { num: 28, text: '    "@radix-ui/react-context-menu": "^2.2.1",' },
        { num: 29, text: '    "@radix-ui/react-dialog": "^1.1.2",' },
        { num: 30, text: '    "@radix-ui/react-dropdown-menu": "^2.1.1",' },
        { num: 31, text: '    "@radix-ui/react-hover-card": "^1.1.1",' },
        { num: 32, text: '    "@radix-ui/react-label": "^2.1.0",' },
        { num: 33, text: '    "@radix-ui/react-menubar": "^1.1.1",' },
        { num: "",  text: '    ...' },
        { num: "",  text: '  }' },
        { num: "",  text: '}' },
      ]} />

      <Callout variant="yellow">
        <p className="font-semibold mb-2">핵심 포인트 — 노란색 줄 3개만 추가하면 됩니다:</p>
        <p>• <strong>5번 줄:</strong> <InlineCode>"homepage"</InlineCode> — 내 GitHub 주소로 교체</p>
        <p>• <strong>16번 줄:</strong> <InlineCode>"predeploy"</InlineCode> — 배포 전 자동 빌드</p>
        <p>• <strong>17번 줄:</strong> <InlineCode>"deploy"</InlineCode> — 실제 배포 명령어</p>
        <p className="mt-2"><strong>주의:</strong> homepage의 저장소 이름은 GitHub에 만든 저장소 이름과 정확히 일치해야 합니다. 대소문자도 구분합니다.</p>
      </Callout>

      <Callout variant="red">
        <p className="font-semibold mb-2 flex items-center gap-1.5"><AlertTriangle size={14} /> 쉼표(,) 주의 — 가장 흔한 오류입니다!</p>
        <p>JSON은 항목 사이에 쉼표가 있어야 하지만, <strong>마지막 항목 뒤에는 쉼표를 쓰면 안 됩니다.</strong></p>
        <p className="mt-2"><InlineCode>"predeploy"</InlineCode>를 추가하기 전, <strong>바로 위 줄(15번)</strong>의 끝에 쉼표가 있는지 확인하세요.</p>
        <div className="mt-3 space-y-2">
          <div>
            <p className="text-xs text-red-600 font-semibold mb-1">잘못된 예 — 15번 줄 끝에 쉼표 없음 → 오류 발생</p>
            <div className="bg-red-100 border border-red-200 rounded-lg p-3 font-mono text-xs text-red-800 leading-relaxed">
              <div>15 &nbsp;"test:edge-functions": "... deno task test" &nbsp;<strong>← 쉼표 없음!</strong></div>
              <div>16 &nbsp;"predeploy": "npm run build",</div>
            </div>
          </div>
          <div>
            <p className="text-xs text-green-700 font-semibold mb-1">올바른 예 — 15번 줄 끝에 쉼표 있음 → 정상</p>
            <div className="bg-green-100 border border-green-200 rounded-lg p-3 font-mono text-xs text-green-900 leading-relaxed">
              <div>15 &nbsp;"test:edge-functions": "... deno task test"<strong>,</strong></div>
              <div>16 &nbsp;"predeploy": "npm run build",</div>
              <div>17 &nbsp;"deploy": "gh-pages -d dist" &nbsp;<strong>← 맨 마지막은 쉼표 없음</strong></div>
            </div>
          </div>
        </div>
        <p className="mt-3 text-sm">즉, <strong>내가 추가하는 줄의 바로 위 줄</strong>에 쉼표가 있어야 하고,<br />
        <InlineCode>"deploy"</InlineCode>처럼 <strong>scripts 블록의 맨 마지막 줄</strong>에는 쉼표를 쓰지 않습니다.</p>
      </Callout>

      {/* 2-4 */}
      <SectionAnchor id="part2-4" />
      <SubTitle>2-4. vite.config.ts 수정</SubTitle>
      <Para>Vite 빌드 시 경로 기준점(<InlineCode>base</InlineCode>)을 저장소 이름으로 설정합니다. 이 설정이 없으면 배포 후 흰 화면만 나옵니다.</Para>
      <CodeBlock lines={[
        { num: 208, text: "// https://vitejs.dev/config/", comment: true },
        { num: 209, text: "export default defineConfig(({ mode }) => {" },
        { num: 210, text: "  return {" },
        { num: 211, text: '    base: "/chinese-exam/",', highlight: true },
        { num: 212, text: "    server: {" },
        { num: 213, text: '      host: "::",' },
        { num: 214, text: "      port: 8080," },
        { num: 215, text: "    }," },
        { num: 216, text: "    plugins: [" },
        { num: 217, text: "      tailwindcss()," },
        { num: 218, text: "      react()," },
        { num: 219, text: "      mode === 'development' &&" },
        { num: 220, text: "      componentTagger()," },
        { num: 221, text: "      cdnPrefixImages()," },
        { num: 222, text: "    ].filter(Boolean)," },
        { num: 223, text: "    resolve: {" },
        { num: 224, text: "      alias: {" },
        { num: 225, text: '        "@": path.resolve(__dirname, "./src"),' },
        { num: 226, text: '        // Proxy react-router-dom to our wrapper', comment: true },
        { num: 227, text: '        "react-router-dom": path.resolve(__dirname, "./src/lib/react-router-dom"),' },
        { num: 228, text: '        // Original react-router-dom under a different name', comment: true },
        { num: 229, text: '        "react-router-dom-original": "react-router-dom",' },
        { num: 230, text: "      }," },
        { num: 231, text: "    }," },
        { num: 232, text: "    define: {" },
        { num: 233, text: "      // Define environment variables for build-time configuration", comment: true },
        { num: 234, text: "      // In production, false by default unless explicitly set", comment: true },
        { num: 235, text: "      // In development and test, true by default", comment: true },
        { num: 236, text: "      ROUTE_MESSAGING_ENABLED: JSON.stringify( ... )," },
        { num: "", text: "      ..." },
        { num: "", text: "    };" },
        { num: "", text: "  });" },
      ]} />
      <Callout variant="yellow">
        <p className="font-semibold mb-2">핵심 포인트 — 211번 줄 딱 한 줄만 바꾸면 됩니다:</p>
        <p><InlineCode>base: "/chinese-exam/"</InlineCode> → <InlineCode>base: "/내-저장소-이름/"</InlineCode></p>
        <p className="mt-2"><strong>주의:</strong> 슬래시(<InlineCode>/</InlineCode>)를 앞뒤에 반드시 붙여야 합니다.</p>
      </Callout>
      <Callout variant="info">
        <p className="font-semibold mb-1">예시 세트 — 저장소 이름이 <InlineCode>my-project</InlineCode>이면:</p>
        <p>• package.json → <InlineCode>"homepage": "https://아이디.github.io/my-project/"</InlineCode></p>
        <p>• vite.config.ts → <InlineCode>base: "/my-project/"</InlineCode></p>
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

      {/* ══════════════════════════════════════
          PART 3 · 수정 후 재배포
      ══════════════════════════════════════ */}
      <SectionAnchor id="update" />
      <SectionTitle>
        <RefreshCw size={18} className="text-primary" /> PART 3 · 파일 수정 후 재배포하기
      </SectionTitle>

      {/* 전체 흐름 요약 카드 */}
      <div className="my-4 rounded-xl border border-border overflow-hidden">
        <div className="bg-muted/50 px-4 py-3 border-b border-border">
          <p className="text-xs font-bold text-foreground uppercase tracking-wide">수정 → 배포 전체 흐름 한눈에 보기</p>
        </div>
        <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-border">
          {[
            { step: "1", icon: "✏️", label: "파일 수정",      desc: "VS Code 등으로 src 폴더 안 파일 편집" },
            { step: "2", icon: "💾", label: "커밋 (선택)",     desc: "git add → commit으로 이력 저장" },
            { step: "3", icon: "🚀", label: "npm run deploy", desc: "한 줄로 빌드 + GitHub Pages 배포" },
            { step: "4", icon: "✅", label: "사이트 확인",     desc: "1~2분 뒤 브라우저에서 반영 확인" },
          ].map(item => (
            <div key={item.step} className="flex-1 px-4 py-4 text-center">
              <div className="text-xl mb-1">{item.icon}</div>
              <p className="text-xs font-bold text-foreground mb-0.5">{item.label}</p>
              <p className="text-[11px] text-muted-foreground leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Callout variant="info">
        <strong>핵심 원칙:</strong> PART 2 설정은 <strong>딱 한 번</strong>만 합니다.<br />
        그 이후 파일을 고칠 때는 <strong>① 수정 → ② 커밋(선택) → ③ npm run deploy</strong> 세 단계만 반복하면 됩니다.
      </Callout>

      {/* 3-1 파일 수정 */}
      <SectionAnchor id="update-1" />
      <SubTitle>3-1. 파일 수정하기</SubTitle>
      <Para>
        수정 대상은 <InlineCode>src/</InlineCode> 폴더 안의 파일들입니다.
        VS Code, Cursor 등 에디터로 원하는 파일을 열고 수정 후 저장합니다.
      </Para>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        {[
          { file: "src/App.tsx",         desc: "앱의 최상위 컴포넌트 — 라우팅, 전체 구조 변경" },
          { file: "src/pages/Home.tsx",  desc: "메인 페이지 내용 수정" },
          { file: "src/components/",     desc: "재사용 컴포넌트 수정/추가" },
          { file: "src/index.css",       desc: "전체 스타일 · 테마 색상 변경" },
          { file: "public/",             desc: "이미지, 파비콘 등 정적 파일 교체" },
          { file: "package.json",        desc: "패키지 추가·삭제 시만 수정 (배포 설정 건드리지 않도록 주의)" },
        ].map(item => (
          <div key={item.file} className="flex gap-3 p-3 bg-muted/30 rounded-lg border border-border">
            <code className="text-[11px] font-mono text-primary shrink-0 mt-0.5">{item.file}</code>
            <p className="text-[12px] text-muted-foreground leading-snug">{item.desc}</p>
          </div>
        ))}
      </div>

      <Callout variant="yellow">
        <strong>주의:</strong> <InlineCode>package.json</InlineCode>의 <InlineCode>homepage</InlineCode>,{" "}
        <InlineCode>predeploy</InlineCode>, <InlineCode>deploy</InlineCode> 항목과{" "}
        <InlineCode>vite.config.ts</InlineCode>의 <InlineCode>base</InlineCode> 값은{" "}
        <strong>배포 설정이므로 건드리지 마세요.</strong> 처음 설정한 그대로 두면 됩니다.
      </Callout>

      {/* 3-2 커밋 */}
      <SectionAnchor id="update-2" />
      <SubTitle>3-2. 소스코드 저장 — git commit (선택 권장)</SubTitle>
      <Para>
        <InlineCode>npm run deploy</InlineCode>만 해도 사이트는 배포됩니다.
        그러나 <strong>커밋을 함께 하면</strong> 언제 무엇을 바꿨는지 이력이 남아 실수로 코드를 망쳐도 되돌릴 수 있습니다.
      </Para>

      <div className="my-4 rounded-xl border border-border overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
          <div className="p-4">
            <p className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1 inline-block mb-3">커밋 없이 배포만 할 때</p>
            <TerminalBlock lines={[
              { text: "# 그냥 배포만 실행", comment: true },
              { text: "npm run deploy" },
            ]} />
            <p className="text-xs text-muted-foreground mt-2">사이트는 업데이트되지만 소스코드 이력은 남지 않습니다.</p>
          </div>
          <div className="p-4">
            <p className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 rounded px-2 py-1 inline-block mb-3">커밋 후 배포 (권장)</p>
            <TerminalBlock lines={[
              { text: "# 1. 변경된 파일 전체 스테이징", comment: true },
              { text: "git add ." },
              { text: "" },
              { text: "# 2. 커밋 메시지 작성 후 저장", comment: true },
              { text: 'git commit -m "버튼 색상 변경"' },
              { text: "" },
              { text: "# 3. GitHub에 소스코드 푸시", comment: true },
              { text: "git push origin main" },
              { text: "" },
              { text: "# 4. 사이트 배포", comment: true },
              { text: "npm run deploy" },
            ]} />
          </div>
        </div>
      </div>

      <Callout variant="info">
        <p className="font-semibold mb-2">커밋 메시지 작성 팁</p>
        <div className="space-y-1 font-mono text-xs">
          <p><span className="text-green-700 font-bold">좋은 예</span> &nbsp;"헤더 로고 이미지 교체"</p>
          <p><span className="text-green-700 font-bold">좋은 예</span> &nbsp;"모바일 레이아웃 반응형 수정"</p>
          <p><span className="text-green-700 font-bold">좋은 예</span> &nbsp;"v1.2 — 상품 목록 페이지 추가"</p>
          <p className="mt-2"><span className="text-red-600 font-bold">나쁜 예</span> &nbsp;"수정"</p>
          <p><span className="text-red-600 font-bold">나쁜 예</span> &nbsp;"asdfgh"</p>
        </div>
      </Callout>

      {/* 3-3 재배포 */}
      <SectionAnchor id="update-3" />
      <SubTitle>3-3. 사이트 재배포 — npm run deploy</SubTitle>
      <Para>
        소스코드 수정이 끝났으면 아래 명령어 하나로 배포합니다.
        이 명령어는 <strong>처음이든 100번째든 항상 동일</strong>합니다.
      </Para>

      <TerminalBlock lines={[
        { text: "# 프로젝트 폴더 안에서 실행", comment: true },
        { text: "npm run deploy" },
        { text: "" },
        { text: "# 아래처럼 나오면 성공!", comment: true },
        { text: "Published", success: true },
      ]} />

      <div className="my-4 rounded-xl border border-green-200 bg-green-50 p-4">
        <p className="text-xs font-bold text-green-800 mb-3">배포 성공 시 내부 동작 순서</p>
        <div className="space-y-2">
          {[
            { n: 1, text: "predeploy 실행 → npm run build → dist/ 폴더 생성" },
            { n: 2, text: "gh-pages가 dist/ 내용을 gh-pages 브랜치에 자동 push" },
            { n: 3, text: "GitHub Actions가 감지하여 Pages 서버 자동 갱신" },
            { n: 4, text: "1~2분 후 사이트 주소에서 변경 내용 확인 가능" },
          ].map(item => (
            <div key={item.n} className="flex items-start gap-2.5">
              <span className="shrink-0 w-5 h-5 rounded-full bg-green-500 text-white text-[10px] font-bold flex items-center justify-center mt-0.5">{item.n}</span>
              <p className="text-xs text-green-900 leading-snug">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <Callout variant="yellow">
        <strong>브라우저 캐시 주의:</strong> 배포가 완료됐는데 사이트에 변경이 안 보일 때는{" "}
        <InlineCode>Ctrl + Shift + R</InlineCode> (강력 새로고침)을 눌러보세요.
        브라우저가 이전 버전을 캐시하고 있는 경우입니다.
      </Callout>

      {/* 3-4 버전 관리 팁 */}
      <SectionAnchor id="update-tip" />
      <SubTitle>3-4. 버전 관리 팁</SubTitle>

      <Para>프로젝트가 커질수록 아래 습관이 큰 도움이 됩니다.</Para>

      <div className="space-y-3 my-4">
        {[
          {
            title: "package.json 버전 올리기",
            badge: "권장",
            badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
            content: (
              <div>
                <p className="text-xs text-muted-foreground mb-2">배포할 때마다 <InlineCode>package.json</InlineCode>의 <InlineCode>version</InlineCode> 값을 올려두면 "이 버전이 언제 나왔는지" 추적하기 쉽습니다.</p>
                <TerminalBlock lines={[
                  { text: '# package.json의 "version" 필드를 수동으로 올리거나', comment: true },
                  { text: "npm version patch   # 0.0.1 → 0.0.2  (버그 수정)", comment: false },
                  { text: "npm version minor   # 0.0.2 → 0.1.0  (기능 추가)", comment: false },
                  { text: "npm version major   # 0.1.0 → 1.0.0  (대규모 변경)", comment: false },
                ]} />
              </div>
            ),
          },
          {
            title: "브랜치로 개발 / 배포 분리하기",
            badge: "고급",
            badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
            content: (
              <div>
                <p className="text-xs text-muted-foreground mb-2">
                  <InlineCode>main</InlineCode> 브랜치는 완성된 코드만 유지하고, 새 기능은 별도 브랜치에서 작업한 뒤 병합하는 방식을 추천합니다.
                </p>
                <TerminalBlock lines={[
                  { text: "# 새 기능 개발 시", comment: true },
                  { text: "git checkout -b feature/new-page" },
                  { text: "" },
                  { text: "# ... 작업 후 커밋 ...", comment: true },
                  { text: "" },
                  { text: "# main에 병합", comment: true },
                  { text: "git checkout main" },
                  { text: "git merge feature/new-page" },
                  { text: "" },
                  { text: "# 배포", comment: true },
                  { text: "npm run deploy" },
                ]} />
              </div>
            ),
          },
          {
            title: "잘못 배포했을 때 되돌리기",
            badge: "긴급",
            badgeColor: "bg-red-100 text-red-800 border-red-200",
            content: (
              <div>
                <p className="text-xs text-muted-foreground mb-2">
                  실수로 잘못된 코드를 배포했다면 이전 커밋으로 되돌린 뒤 다시 배포합니다.
                </p>
                <TerminalBlock lines={[
                  { text: "# 최근 커밋 목록 확인", comment: true },
                  { text: "git log --oneline -5" },
                  { text: "" },
                  { text: "# 특정 커밋으로 되돌리기 (안전한 방식)", comment: true },
                  { text: "git revert HEAD" },
                  { text: "" },
                  { text: "# 다시 배포", comment: true },
                  { text: "npm run deploy" },
                ]} />
                <p className="text-xs text-muted-foreground mt-2">
                  <InlineCode>git revert</InlineCode>는 이전 커밋을 지우지 않고 되돌리는 커밋을 새로 추가하므로 안전합니다.
                </p>
              </div>
            ),
          },
        ].map(item => (
          <div key={item.title} className="rounded-xl border border-border overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-muted/30 border-b border-border">
              <p className="text-sm font-semibold text-foreground">{item.title}</p>
              <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>{item.badge}</span>
            </div>
            <div className="px-4 py-3">{item.content}</div>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════
          PART 4 · GitHub Actions CI/CD 자동화
      ══════════════════════════════════════ */}
      <SectionAnchor id="cicd" />
      <SectionTitle>
        <Workflow size={18} className="text-primary" /> PART 4 · GitHub Actions CI/CD 자동화
      </SectionTitle>

      <Callout variant="info">
        <p className="font-semibold mb-1">CI/CD란?</p>
        <p><strong>CI(Continuous Integration)</strong>: 코드를 push할 때마다 자동으로 빌드·테스트</p>
        <p className="mt-1"><strong>CD(Continuous Deployment)</strong>: 빌드가 성공하면 자동으로 배포</p>
        <p className="mt-2">즉, 코드를 push하면 <strong>빌드 → 배포가 자동</strong>으로 이루어집니다. 로컬에서 <InlineCode>npm run deploy</InlineCode>를 직접 실행할 필요가 없습니다.</p>
      </Callout>

      {/* 4-1. 비교 */}
      <SectionAnchor id="cicd-1" />
      <SubTitle>4-1. 수동 배포 vs GitHub Actions 자동 배포 비교</SubTitle>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[oklch(0.24_0.015_220)] text-white">
              <th className="text-left px-4 py-3 font-semibold">항목</th>
              <th className="text-left px-4 py-3 font-semibold text-amber-300">수동 (npm run deploy)</th>
              <th className="text-left px-4 py-3 font-semibold text-emerald-300 rounded-tr-lg">자동 (GitHub Actions)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["배포 방법",       "로컬에서 직접 명령어 실행",     "push만 하면 자동 실행"],
              ["환경 의존성",     "내 PC에 Node.js 필수",          "GitHub 서버에서 실행 (PC 불필요)"],
              ["팀 협업",        "각자 배포 권한 필요",            "push 권한만 있으면 자동 배포"],
              ["실수 가능성",    "빌드 전 배포, 잘못된 브랜치 배포 가능", "조건 설정으로 실수 방지"],
              ["배포 이력",      "로컬 터미널에서만 확인",         "GitHub Actions 탭에서 전체 이력 조회"],
              ["설정 난이도",    "쉬움 (초기 설정만)",             "YAML 파일 1개 작성 필요"],
            ].map(([item, manual, auto], i) => (
              <tr key={i} className={`border-b border-border ${i % 2 === 1 ? "bg-muted/40" : ""}`}>
                <td className="px-4 py-2.5 font-semibold text-foreground text-xs">{item}</td>
                <td className="px-4 py-2.5 text-xs text-muted-foreground">{manual}</td>
                <td className="px-4 py-2.5 text-xs text-green-700 font-medium">{auto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 4-2. workflow 파일 */}
      <SectionAnchor id="cicd-2" />
      <SubTitle>4-2. workflow 파일 만들기</SubTitle>
      <Para>
        프로젝트 루트에 아래 경로로 파일을 생성합니다.
        폴더가 없으면 직접 만들어야 합니다.
      </Para>
      <TerminalBlock lines={[
        { text: "# 폴더 생성 후 파일 생성", comment: true },
        { text: "mkdir -p .github/workflows" },
        { text: "# .github/workflows/deploy.yml  ← 이 파일을 만들면 됩니다", comment: true },
      ]} />

      <Callout variant="info">
        <strong>파일 경로:</strong> <InlineCode>.github/workflows/deploy.yml</InlineCode><br />
        탭을 눌러 React/Vite와 Next.js 각각의 workflow 코드를 확인하세요.
      </Callout>

      {/* Vite workflow */}
      <p className="text-xs font-bold text-foreground mt-5 mb-2 flex items-center gap-2">
        <span className="inline-flex items-center gap-1 bg-primary/10 text-primary border border-primary/20 rounded px-2 py-0.5 font-mono text-[11px]">⚡ React + Vite</span>
        .github/workflows/deploy.yml
      </p>
      <div className="rounded-xl overflow-hidden border border-slate-700/50 my-2">
        <div className="flex items-center justify-between px-4 py-2 bg-[oklch(0.18_0.01_220)] border-b border-slate-700/50">
          <span className="font-mono text-xs text-slate-400">.github/workflows/deploy.yml</span>
          <CicdCopyBtn id="vite-workflow" />
        </div>
        <div className="bg-[oklch(0.12_0.01_220)] overflow-x-auto">
          <table className="w-full border-collapse text-[13px] font-mono">
            <tbody>
              {VITE_WORKFLOW_ROWS.map((row, i) => (
                <tr key={i} className={row.hl === "add" ? "bg-emerald-500/10 border-l-2 border-emerald-400/60" : row.hl === "key" ? "bg-sky-500/5 border-l-2 border-transparent" : "border-l-2 border-transparent"}>
                  <td className="select-none text-right pr-3 pl-4 py-[2px] text-slate-600 w-8 text-xs align-top border-r border-slate-700/30">{row.num}</td>
                  <td className="pl-4 pr-4 py-[2px] whitespace-pre leading-relaxed">{row.jsx}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Next.js workflow */}
      <p className="text-xs font-bold text-foreground mt-6 mb-2 flex items-center gap-2">
        <span className="inline-flex items-center gap-1 bg-foreground/10 text-foreground border border-foreground/20 rounded px-2 py-0.5 font-mono text-[11px]">▲ Next.js</span>
        .github/workflows/deploy.yml
      </p>
      <div className="rounded-xl overflow-hidden border border-slate-700/50 my-2">
        <div className="flex items-center justify-between px-4 py-2 bg-[oklch(0.18_0.01_220)] border-b border-slate-700/50">
          <span className="font-mono text-xs text-slate-400">.github/workflows/deploy.yml</span>
          <CicdCopyBtn id="next-workflow" />
        </div>
        <div className="bg-[oklch(0.12_0.01_220)] overflow-x-auto">
          <table className="w-full border-collapse text-[13px] font-mono">
            <tbody>
              {NEXT_WORKFLOW_ROWS.map((row, i) => (
                <tr key={i} className={row.hl === "add" ? "bg-emerald-500/10 border-l-2 border-emerald-400/60" : "border-l-2 border-transparent"}>
                  <td className="select-none text-right pr-3 pl-4 py-[2px] text-slate-600 w-8 text-xs align-top border-r border-slate-700/30">{row.num}</td>
                  <td className="pl-4 pr-4 py-[2px] whitespace-pre leading-relaxed">{row.jsx}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-3 p-3 rounded-lg bg-muted/30 border border-border text-xs text-muted-foreground leading-relaxed">
        <p className="font-semibold text-foreground mb-1">핵심 흐름 설명</p>
        <p>• <InlineCode>on: push: branches: [master]</InlineCode> — master 브랜치에 push될 때만 실행</p>
        <p>• <InlineCode>permissions</InlineCode> — GitHub Pages 쓰기 권한 부여 (필수)</p>
        <p>• <InlineCode>actions/checkout@v4</InlineCode> — 저장소 코드 가져오기</p>
        <p>• <InlineCode>actions/setup-node@v4</InlineCode> — Node.js 환경 구성</p>
        <p>• <InlineCode>npm ci</InlineCode> — <InlineCode>npm install</InlineCode>보다 빠르고 정확한 CI 전용 설치 명령</p>
        <p>• <InlineCode>upload-pages-artifact</InlineCode> — 빌드 결과물을 GitHub에 업로드</p>
        <p>• <InlineCode>deploy-pages</InlineCode> — GitHub Pages에 실제 배포</p>
      </div>

      {/* 4-3. GitHub 설정 */}
      <SectionAnchor id="cicd-3" />
      <SubTitle>4-3. GitHub 저장소 Pages 소스 변경</SubTitle>
      <Para>
        기존 <InlineCode>gh-pages</InlineCode> 브랜치 방식에서 <strong>GitHub Actions</strong> 방식으로 변경해야 합니다.
        이 설정을 안 하면 workflow가 실행돼도 사이트가 안 바뀝니다.
      </Para>

      <div className="space-y-3 my-4">
        {[
          { n: 1, title: "저장소 Settings 탭 클릭", desc: "GitHub 저장소 페이지 상단 메뉴에서 Settings를 클릭합니다." },
          { n: 2, title: "왼쪽 메뉴 → Pages 클릭", desc: "왼쪽 사이드바 Code and automation 섹션 아래의 Pages를 클릭합니다." },
          { n: 3, title: "Build and deployment → Source 변경", desc: <>Source 항목을 <InlineCode>Deploy from a branch</InlineCode>에서 <strong className="text-primary">GitHub Actions</strong>로 변경합니다.</> },
          { n: 4, title: "저장", desc: "변경 후 자동으로 저장됩니다. 별도의 Save 버튼은 없습니다." },
        ].map(item => (
          <div key={item.n} className="flex gap-3 p-3.5 bg-muted/30 rounded-xl border border-border">
            <span className="shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center mt-0.5">{item.n}</span>
            <div>
              <p className="font-semibold text-foreground text-sm mb-0.5">{item.title}</p>
              <p className="text-xs text-muted-foreground leading-snug">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <Callout variant="yellow">
        <strong>주의:</strong> 기존에 <InlineCode>gh-pages</InlineCode> 브랜치로 배포하고 있었다면,
        Source를 GitHub Actions로 바꾸는 순간부터 gh-pages 브랜치는 무시됩니다.
        <InlineCode>npm run deploy</InlineCode>와 GitHub Actions를 동시에 쓰지 마세요.
      </Callout>

      {/* 4-4. 확인 */}
      <SectionAnchor id="cicd-4" />
      <SubTitle>4-4. 배포 확인하기</SubTitle>
      <Para>설정이 완료되면 main 브랜치에 push할 때마다 자동으로 배포됩니다.</Para>

      <TerminalBlock lines={[
        { text: "# 파일 수정 후 커밋 & push만 하면 자동 배포!", comment: true },
        { text: "git add ." },
        { text: 'git commit -m "기능 추가"' },
        { text: "git push origin main" },
        { text: "" },
        { text: "# → GitHub Actions가 자동으로 빌드 & 배포 시작", comment: true },
        { text: "# → 저장소 Actions 탭에서 진행 상태 실시간 확인 가능", comment: true },
      ]} />

      <div className="my-4 rounded-xl border border-green-200 bg-green-50 p-4">
        <p className="text-xs font-bold text-green-800 mb-3">Actions 탭에서 배포 확인하는 법</p>
        <div className="space-y-2">
          {[
            { n: 1, t: "GitHub 저장소 페이지 상단 Actions 탭 클릭" },
            { n: 2, t: "가장 최근 workflow run을 클릭 (주황색 → 진행 중 / 초록색 → 성공 / 빨간색 → 실패)" },
            { n: 3, t: "deploy job 클릭 → 각 step별 로그 확인 가능" },
            { n: 4, t: "성공 시 1~2분 후 사이트에 반영" },
          ].map(item => (
            <div key={item.n} className="flex items-start gap-2.5">
              <span className="shrink-0 w-5 h-5 rounded-full bg-green-500 text-white text-[10px] font-bold flex items-center justify-center mt-0.5">{item.n}</span>
              <p className="text-xs text-green-900 leading-snug">{item.t}</p>
            </div>
          ))}
        </div>
      </div>

      <Callout variant="red">
        <p className="font-semibold mb-2 flex items-center gap-1.5">Actions 빌드 실패 시 확인 순서</p>
        <p>① Actions 탭 → 실패한 run 클릭 → 빨간 step 클릭 → 에러 로그 확인</p>
        <p className="mt-1">② 가장 흔한 원인: <InlineCode>next.config.ts</InlineCode>의 <InlineCode>basePath</InlineCode> 누락, <InlineCode>package.json</InlineCode> 의존성 누락, 빌드 오류</p>
        <p className="mt-1">③ 수정 후 다시 push하면 자동으로 재실행됩니다.</p>
      </Callout>

      {/* ── 요약표 ── */}
      <SectionAnchor id="summary" />
      <SectionTitle>최종 요약표 — C:\a 에서 C:\b 로 옮길 때</SectionTitle>
      <SummaryTable rows={summaryRows} />

      {/* ── 트러블슈팅 ── */}
      <SectionAnchor id="trouble" />
      <SectionTitle><AlertTriangle size={18} className="text-amber-500" /> 자주 겪는 문제</SectionTitle>

      <SubTitle>배포 후 사이트가 흰 화면만 나와요</SubTitle>
      <Callout variant="yellow">
        <p><strong>원인:</strong> <InlineCode>vite.config.ts</InlineCode>의 <InlineCode>base</InlineCode> 값이 저장소 이름과 다릅니다.</p>
        <p className="mt-1"><strong>해결:</strong> <InlineCode>base: '/저장소이름/'</InlineCode>을 정확히 입력하고 <InlineCode>npm run deploy</InlineCode>를 다시 실행하세요.</p>
      </Callout>

      <SubTitle>npm run deploy 시 "remote: Permission denied" 오류</SubTitle>
      <Callout variant="yellow">
        <p><strong>원인:</strong> GitHub 인증이 안 되어 있습니다.</p>
        <p className="mt-1"><strong>해결:</strong> GitHub에서 <strong>Personal Access Token</strong>을 발급받아 비밀번호 대신 입력하거나, SSH Key를 등록하는 방식을 사용하세요.</p>
      </Callout>

      <SubTitle>git init 후 push가 안 돼요</SubTitle>
      <Callout variant="yellow">
        <p><strong>원인:</strong> <InlineCode>git remote add</InlineCode>를 빠뜨렸을 가능성이 높습니다.</p>
        <p className="mt-1"><strong>확인:</strong> <InlineCode>git remote -v</InlineCode>를 실행해 origin 주소가 나오는지 확인하세요.</p>
      </Callout>

      <SubTitle>배포 주소가 404 오류가 나요</SubTitle>
      <Callout variant="yellow">
        <p><strong>원인 1:</strong> 배포 직후 1~2분이 지나지 않았습니다. 조금 기다려보세요.</p>
        <p className="mt-1"><strong>원인 2:</strong> GitHub 저장소의 <strong>Settings → Pages</strong> 메뉴에서 Branch가 <InlineCode>gh-pages</InlineCode>로 설정되어 있는지 확인하세요.</p>
      </Callout>

      <div className="mt-16 pt-8 border-t border-border text-center text-xs text-muted-foreground">
        GitHub Pages 배포 매뉴얼 (초보자용) &nbsp;·&nbsp; React + Vite + gh-pages 기준
      </div>
    </div>
  );
}
