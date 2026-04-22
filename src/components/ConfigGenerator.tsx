import { useState, useCallback, ReactNode } from "react";
import { Copy, Check, Github, RefreshCw, Zap, Triangle } from "lucide-react";
import { InlineCode } from "@/components/DocBlocks";

/* ─────────────────────────────────────────
   타입
───────────────────────────────────────── */
interface ProjectConfig {
  username: string;
  repoName: string;
}

type Framework = "vite" | "next";

type Seg =
  | { t: "normal";    v: string }
  | { t: "highlight"; v: string }  // 주황 — 붙여넣어야 하는 핵심 값
  | { t: "comment";   v: string }  // 회색 주석
  | { t: "key";       v: string }  // 하늘색 JSON/TS 키
  | { t: "added";     v: string }; // 초록 — 새로 추가하는 값

type CodeRow = {
  num?: number | string;
  segs: Seg[];
  addedLine?: boolean;
};

/* ─────────────────────────────────────────
   세그먼트 → JSX
───────────────────────────────────────── */
function renderSeg(s: Seg, i: number): ReactNode {
  switch (s.t) {
    case "highlight": return <span key={i} className="text-amber-300 font-bold bg-amber-400/10 rounded px-0.5">{s.v}</span>;
    case "comment":   return <span key={i} className="text-slate-500 italic">{s.v}</span>;
    case "key":       return <span key={i} className="text-sky-300">{s.v}</span>;
    case "added":     return <span key={i} className="text-emerald-300 font-bold">{s.v}</span>;
    default:          return <span key={i} className="text-slate-300">{s.v}</span>;
  }
}

/* ─────────────────────────────────────────
   헬퍼
───────────────────────────────────────── */
const n = (v: string): Seg => ({ t: "normal",    v });
const h = (v: string): Seg => ({ t: "highlight", v });
const c = (v: string): Seg => ({ t: "comment",   v });
const k = (v: string): Seg => ({ t: "key",       v });
const a = (v: string): Seg => ({ t: "added",     v });

/* ─────────────────────────────────────────
   ① React/Vite 코드 생성
───────────────────────────────────────── */
function makeVitePackageRows(cfg: ProjectConfig): CodeRow[] {
  const homepage = cfg.username && cfg.repoName
    ? `https://${cfg.username}.github.io/${cfg.repoName}/`
    : "https://아이디.github.io/저장소이름/";
  const name = cfg.repoName || "my-project";
  return [
    { num: 1,  segs: [n("{")] },
    { num: 2,  segs: [n("  "), k('"name"'),     n(`: "${name}",`)] },
    { num: 3,  segs: [n("  "), k('"private"'),  n(": true,")] },
    { num: 4,  segs: [n("  "), k('"version"'),  n(': "0.0.0",')] },
    { num: 5,  segs: [n("  "), k('"homepage"'), n(": "), h(`"${homepage}"`), n(",")], addedLine: true },
    { num: 6,  segs: [n("  "), k('"type"'),     n(': "module",')] },
    { num: 7,  segs: [n("  "), k('"scripts"'),  n(": {")] },
    { num: 8,  segs: [n('    '), k('"dev"'),     n(': "vite",')] },
    { num: 9,  segs: [n('    '), k('"build"'),   n(': "tsc && vite build",')] },
    { num: 10, segs: [n('    '), k('"lint"'),    n(': "eslint .",')] },
    { num: 11, segs: [n('    '), k('"preview"'), n(': "vite preview",')] },
    { num: 12, segs: [n('    '), k('"predeploy"'), n(": "), a('"npm run build"'), n(",")], addedLine: true },
    { num: 13, segs: [n('    '), k('"deploy"'),  n(": "), a('"gh-pages -d dist"')], addedLine: true },
    { num: 14, segs: [n("  },")] },
    { num: 15, segs: [n("  "), k('"dependencies"'), n(": {")] },
    { num: 16, segs: [n('    '), k('"react"'),     n(': "^18.3.1",')] },
    { num: 17, segs: [n('    '), k('"react-dom"'), n(': "^18.3.1"')] },
    { num: 18, segs: [n("  },")] },
    { num: 19, segs: [n("  "), k('"devDependencies"'), n(": {")] },
    { num: 20, segs: [n('    '), k('"@vitejs/plugin-react"'), n(': "^4.3.1",')] },
    { num: 21, segs: [n('    '), k('"gh-pages"'), n(": "), a('"^6.1.1"'), n(",")], addedLine: true },
    { num: 22, segs: [n('    '), k('"typescript"'), n(': "^5.5.3",')] },
    { num: 23, segs: [n('    '), k('"vite"'), n(': "^5.4.1"')] },
    { num: 24, segs: [n("  }")] },
    { num: 25, segs: [n("}")] },
  ];
}

function makeViteConfigRows(cfg: ProjectConfig): CodeRow[] {
  const base = cfg.repoName ? `/${cfg.repoName}/` : "/저장소이름/";
  return [
    { num: 1, segs: [n("import { defineConfig } from "), n("'vite'")] },
    { num: 2, segs: [n("import react from "), n("'@vitejs/plugin-react'")] },
    { num: 3, segs: [] },
    { num: 4, segs: [c("// https://vitejs.dev/config/")] },
    { num: 5, segs: [n("export default defineConfig({")] },
    { num: 6, segs: [n("  plugins: [react()],")] },
    { num: 7, segs: [n("  "), k("base"), n(": "), h(`'${base}'`), n(",")], addedLine: true },
    { num: 8, segs: [n("})")] },
  ];
}

/* ─────────────────────────────────────────
   ② Next.js 코드 생성
───────────────────────────────────────── */
function makeNextPackageRows(cfg: ProjectConfig): CodeRow[] {
  const homepage = cfg.username && cfg.repoName
    ? `https://${cfg.username}.github.io/${cfg.repoName}/`
    : "https://아이디.github.io/저장소이름/";
  const name = cfg.repoName || "my-project";
  return [
    { num: 1,  segs: [n("{")] },
    { num: 2,  segs: [n("  "), k('"name"'),    n(`: "${name}",`)] },
    { num: 3,  segs: [n("  "), k('"version"'), n(': "0.0.0",')] },
    { num: 4,  segs: [n("  "), k('"homepage"'), n(": "), h(`"${homepage}"`), n(",")], addedLine: true },
    { num: 5,  segs: [n("  "), k('"scripts"'), n(": {")] },
    { num: 6,  segs: [n('    '), k('"dev"'),   n(': "next dev",')] },
    { num: 7,  segs: [n('    '), k('"build"'), n(': "next build",')] },
    { num: 8,  segs: [n('    '), k('"start"'), n(': "next start",')] },
    { num: 9,  segs: [n('    '), k('"lint"'),  n(': "next lint",')] },
    { num: 10, segs: [n('    '), k('"predeploy"'), n(": "), a('"next build && node -e \\"require(\'fs\').writeFileSync(\'out/.nojekyll\',\'\')\\"" '), n(",")], addedLine: true },
    { num: 11, segs: [n('    '), k('"deploy"'), n(": "), a('"gh-pages -d out --dotfiles"')], addedLine: true },
    { num: 12, segs: [n("  },")] },
    { num: 13, segs: [n("  "), k('"dependencies"'), n(": {")] },
    { num: 14, segs: [n('    '), k('"next"'),      n(': "^14.2.0",')] },
    { num: 15, segs: [n('    '), k('"react"'),     n(': "^18.3.1",')] },
    { num: 16, segs: [n('    '), k('"react-dom"'), n(': "^18.3.1"')] },
    { num: 17, segs: [n("  },")] },
    { num: 18, segs: [n("  "), k('"devDependencies"'), n(": {")] },
    { num: 19, segs: [n('    '), k('"@types/node"'),      n(': "^20.0.0",')] },
    { num: 20, segs: [n('    '), k('"@types/react"'),     n(': "^18.3.3",')] },
    { num: 21, segs: [n('    '), k('"@types/react-dom"'), n(': "^18.3.0",')] },
    { num: 22, segs: [n('    '), k('"gh-pages"'), n(": "), a('"^6.1.1"'), n(",")], addedLine: true },
    { num: 23, segs: [n('    '), k('"typescript"'), n(': "^5.5.3"')] },
    { num: 24, segs: [n("  }")] },
    { num: 25, segs: [n("}")] },
  ];
}

function makeNextConfigRows(cfg: ProjectConfig): CodeRow[] {
  const basePath    = cfg.repoName ? `/${cfg.repoName}` : "/저장소이름";
  const assetPrefix = cfg.repoName ? `/${cfg.repoName}/` : "/저장소이름/";
  return [
    { num: 1,  segs: [n("import type { NextConfig } from "), n("'next'")] },
    { num: 2,  segs: [] },
    { num: 3,  segs: [n("const nextConfig: NextConfig = {")] },
    { num: 4,  segs: [c("  // 정적 HTML 파일로 내보내기 (GitHub Pages 필수)"), ] },
    { num: 5,  segs: [n("  "), k("output"), n(": "), a("'export'"), n(",")], addedLine: true },
    { num: 6,  segs: [] },
    { num: 7,  segs: [c("  // 저장소 이름을 경로 앞에 붙임")] },
    { num: 8,  segs: [n("  "), k("basePath"), n(": "), h(`'${basePath}'`), n(",")], addedLine: true },
    { num: 9,  segs: [n("  "), k("assetPrefix"), n(": "), h(`'${assetPrefix}'`), n(",")], addedLine: true },
    { num: 10, segs: [] },
    { num: 11, segs: [c("  // Next.js Image 최적화는 정적 내보내기에서 미지원")]},
    { num: 12, segs: [n("  "), k("images"), n(": {")], addedLine: true },
    { num: 13, segs: [n("    "), k("unoptimized"), n(": "), a("true"), n(",")], addedLine: true },
    { num: 14, segs: [n("  },")], addedLine: true },
    { num: 15, segs: [n("}")] },
    { num: 16, segs: [] },
    { num: 17, segs: [n("export default nextConfig")] },
  ];
}

/* ─────────────────────────────────────────
   Git 명령어 (공통)
───────────────────────────────────────── */
function makeGitRows(cfg: ProjectConfig, fw: Framework): CodeRow[] {
  const remote = cfg.username && cfg.repoName
    ? `https://github.com/${cfg.username}/${cfg.repoName}.git`
    : "https://github.com/아이디/저장소이름.git";
  const outDir = fw === "next" ? "out" : "dist";
  const ready  = cfg.username !== "" && cfg.repoName !== "";
  return [
    { num: 1,  segs: [c("# 1. 프로젝트 폴더로 이동")] },
    { num: 2,  segs: [n("cd "), h("C:\\내-프로젝트-폴더")] },
    { num: 3,  segs: [] },
    { num: 4,  segs: [c("# 2. gh-pages 설치")] },
    { num: 5,  segs: [n("npm install gh-pages --save-dev")] },
    { num: 6,  segs: [] },
    { num: 7,  segs: [c("# 3. Git 초기화 및 원격 저장소 연결")] },
    { num: 8,  segs: [n("git init")] },
    { num: 9,  segs: [n("git remote add origin "), h(remote)], addedLine: ready },
    { num: 10, segs: [] },
    { num: 11, segs: [c("# 4. 배포 실행 (gh-pages가 " + outDir + "/ 폴더를 업로드)")] },
    { num: 12, segs: [n("npm run deploy")] },
  ];
}

/* ─────────────────────────────────────────
   순수 텍스트 추출 (복사용)
───────────────────────────────────────── */
function rowsToText(rows: CodeRow[]): string {
  return rows.map(r => r.segs.map(s => s.v).join("")).join("\n");
}

/* ─────────────────────────────────────────
   범례
───────────────────────────────────────── */
function Legend() {
  return (
    <div className="flex flex-wrap gap-3 px-4 py-2.5 border-t border-slate-700/40 bg-[oklch(0.16_0.01_220)]">
      <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
        <span className="inline-block w-2.5 h-2.5 rounded-sm bg-amber-400/80" />
        붙여넣기 핵심 값
      </span>
      <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
        <span className="inline-block w-2.5 h-2.5 rounded-sm bg-emerald-500/70" />
        새로 추가하는 줄
      </span>
      <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
        <span className="inline-block w-2.5 h-2.5 rounded-sm bg-sky-500/50" />
        키(key) 이름
      </span>
      <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
        <span className="inline-block w-2.5 h-2.5 rounded-sm bg-slate-600" />
        수정하지 않는 줄
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────
   복사 버튼
───────────────────────────────────────── */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);
  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md transition-all duration-200
        ${copied
          ? "bg-green-500/20 text-green-400 border border-green-500/30"
          : "bg-slate-700/60 text-slate-300 border border-slate-600/50 hover:bg-slate-600/60 hover:text-white"
        }`}
    >
      {copied ? <><Check size={12} />복사됨</> : <><Copy size={12} />복사</>}
    </button>
  );
}

/* ─────────────────────────────────────────
   코드 패널
───────────────────────────────────────── */
function CodePanel({ label, rows }: { label: string; rows: CodeRow[] }) {
  const plainText = rowsToText(rows);
  return (
    <div className="rounded-xl overflow-hidden border border-slate-700/50">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[oklch(0.18_0.01_220)] border-b border-slate-700/50">
        <span className="font-mono text-xs text-slate-400 font-semibold">{label}</span>
        <CopyButton text={plainText} />
      </div>
      <div className="bg-[oklch(0.12_0.01_220)] overflow-x-auto">
        <table className="w-full border-collapse text-[13px] font-mono">
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className={row.addedLine
                  ? "bg-emerald-500/10 border-l-2 border-emerald-400/60"
                  : "border-l-2 border-transparent"
                }
              >
                <td className="select-none text-right pr-3 pl-4 py-[3px] text-slate-600 w-8 text-xs align-top border-r border-slate-700/30 shrink-0">
                  {row.num ?? ""}
                </td>
                <td className="pl-4 pr-4 py-[3px] whitespace-pre leading-relaxed">
                  {row.segs.length === 0
                    ? <span>&nbsp;</span>
                    : row.segs.map((s, si) => renderSeg(s, si))
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Legend />
    </div>
  );
}

/* ─────────────────────────────────────────
   탭 정의
───────────────────────────────────────── */
type ViteTabId = "package" | "vite" | "git";
type NextTabId = "package" | "next-config" | "git";
type TabId = ViteTabId | NextTabId;

const VITE_TABS: { id: ViteTabId; label: string }[] = [
  { id: "package", label: "package.json" },
  { id: "vite",    label: "vite.config.ts" },
  { id: "git",     label: "Git 명령어" },
];
const NEXT_TABS: { id: NextTabId; label: string }[] = [
  { id: "package",     label: "package.json" },
  { id: "next-config", label: "next.config.ts" },
  { id: "git",         label: "Git 명령어" },
];

/* ─────────────────────────────────────────
   Next.js 전용 주의 배너
───────────────────────────────────────── */
function NextjsNotice() {
  return (
    <div className="mx-4 mb-0 mt-4 rounded-xl border border-amber-400/30 bg-amber-500/5 p-4 text-xs leading-relaxed text-amber-800">
      <p className="font-bold mb-2 flex items-center gap-1.5">
        <Triangle size={12} className="fill-amber-500 text-amber-500" />
        Next.js + GitHub Pages 주의사항
      </p>
      <ul className="space-y-1.5 list-disc list-inside text-amber-900/80">
        <li><InlineCode>output: 'export'</InlineCode> 설정 시 Next.js 서버 기능(API Routes, SSR)은 사용 불가 — <strong>정적 사이트만</strong> 배포됩니다.</li>
        <li><InlineCode>_next/</InlineCode> 폴더가 GitHub Pages의 Jekyll 처리를 받지 않도록 <InlineCode>out/.nojekyll</InlineCode> 파일이 자동 생성됩니다.</li>
        <li>배포 폴더는 <InlineCode>out/</InlineCode>입니다 (Vite는 <InlineCode>dist/</InlineCode>).</li>
        <li><InlineCode>next/image</InlineCode> 컴포넌트는 <InlineCode>unoptimized: true</InlineCode> 설정이 필수입니다.</li>
      </ul>
    </div>
  );
}

/* ─────────────────────────────────────────
   메인 컴포넌트
───────────────────────────────────────── */
export function ConfigGenerator() {
  const [username,   setUsername]   = useState("");
  const [repoName,   setRepoName]   = useState("");
  const [framework,  setFramework]  = useState<Framework>("vite");
  const [activeTab,  setActiveTab]  = useState<TabId>("package");

  const cfg: ProjectConfig = { username: username.trim(), repoName: repoName.trim() };
  const isReady = cfg.username !== "" && cfg.repoName !== "";

  /* 프레임워크 전환 시 탭 초기화 */
  const switchFramework = (fw: Framework) => {
    setFramework(fw);
    setActiveTab("package");
  };

  /* 탭별 CodeRow 맵 */
  const viteRows: Record<ViteTabId, CodeRow[]> = {
    package: makeVitePackageRows(cfg),
    vite:    makeViteConfigRows(cfg),
    git:     makeGitRows(cfg, "vite"),
  };
  const nextRows: Record<NextTabId, CodeRow[]> = {
    package:     makeNextPackageRows(cfg),
    "next-config": makeNextConfigRows(cfg),
    git:         makeGitRows(cfg, "next"),
  };

  const currentRows: CodeRow[] =
    framework === "vite"
      ? viteRows[activeTab as ViteTabId] ?? []
      : nextRows[activeTab as NextTabId] ?? [];

  const currentTabs = framework === "vite" ? VITE_TABS : NEXT_TABS;
  const currentLabel = currentTabs.find(t => t.id === activeTab)?.label ?? "";

  /* 보조 안내 텍스트 */
  const hintMap: Partial<Record<TabId, ReactNode>> = {
    package: framework === "vite"
      ? <><InlineCode>homepage</InlineCode> · <InlineCode>predeploy</InlineCode> · <InlineCode>deploy</InlineCode> · <InlineCode>gh-pages</InlineCode> — 초록 줄 4개가 추가·수정됩니다.</>
      : <><InlineCode>homepage</InlineCode> · <InlineCode>predeploy</InlineCode> · <InlineCode>deploy</InlineCode> · <InlineCode>gh-pages</InlineCode> — 초록 줄 4개가 추가·수정됩니다. Next.js는 배포 폴더가 <InlineCode>out/</InlineCode>입니다.</>,
    vite:          <><InlineCode>base</InlineCode> 값 1줄만 저장소 이름으로 바꾸면 됩니다.</>,
    "next-config": <><InlineCode>basePath</InlineCode> · <InlineCode>assetPrefix</InlineCode> — 주황 값 2곳을 저장소 이름으로 교체하세요. <InlineCode>output</InlineCode> · <InlineCode>images</InlineCode> 설정은 그대로 유지합니다.</>,
    git:           <>주황 값 2곳 — 폴더 경로와 원격 저장소 URL을 실제 내 값으로 교체하세요.</>,
  };

  return (
    <div className="my-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-accent/30 to-background overflow-hidden shadow-sm">

      {/* 헤더 */}
      <div className="px-5 py-4 border-b border-border bg-accent/20">
        <div className="flex items-center gap-2 mb-1">
          <Github size={16} className="text-primary" />
          <span className="font-bold text-foreground text-sm">내 프로젝트 설정 코드 생성기</span>
        </div>
        <p className="text-xs text-muted-foreground">
          GitHub 아이디와 저장소 이름을 입력하면 바로 복사해서 쓸 수 있는 코드를 만들어 드립니다.
        </p>
      </div>

      {/* 프레임워크 선택 */}
      <div className="px-5 pt-4 pb-0">
        <p className="text-xs font-semibold text-foreground mb-2">프레임워크 선택</p>
        <div className="flex gap-2">
          <button
            onClick={() => switchFramework("vite")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all duration-150
              ${framework === "vite"
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-background border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
          >
            <Zap size={14} />
            React + Vite
          </button>
          <button
            onClick={() => switchFramework("next")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all duration-150
              ${framework === "next"
                ? "bg-foreground text-background border-foreground shadow-sm"
                : "bg-background border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
              }`}
          >
            <Triangle size={14} />
            Next.js
          </button>
        </div>
      </div>

      {/* Next.js 주의사항 배너 */}
      {framework === "next" && <NextjsNotice />}

      {/* 입력 폼 */}
      <div className="px-5 py-4 border-b border-border mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              GitHub 아이디 (username)
            </label>
            <div className="flex items-center gap-2 bg-background border border-border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary/40 transition-all">
              <span className="text-muted-foreground text-xs font-mono">github.com/</span>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="honggildong"
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/50 font-mono"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              저장소 이름 (repository name)
            </label>
            <div className="flex items-center gap-2 bg-background border border-border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary/40 transition-all">
              <span className="text-muted-foreground text-xs font-mono">/</span>
              <input
                type="text"
                value={repoName}
                onChange={e => setRepoName(e.target.value)}
                placeholder="my-project"
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/50 font-mono"
              />
            </div>
          </div>
        </div>

        {isReady ? (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-xs text-green-800 font-semibold mb-1">배포 후 사이트 주소:</p>
            <a
              href={`https://${cfg.username}.github.io/${cfg.repoName}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-primary hover:underline break-all"
            >
              https://{cfg.username}.github.io/{cfg.repoName}/
            </a>
          </div>
        ) : (
          <div className="mt-3 p-3 bg-muted/50 border border-border rounded-lg flex items-center gap-2">
            <RefreshCw size={13} className="text-muted-foreground" />
            <p className="text-xs text-muted-foreground">아이디와 저장소 이름을 입력하면 코드가 자동으로 완성됩니다.</p>
          </div>
        )}
      </div>

      {/* 탭 */}
      <div className="flex border-b border-border bg-muted/30">
        {currentTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-xs font-semibold font-mono transition-all duration-150 border-b-2
              ${activeTab === tab.id
                ? "border-primary text-primary bg-background"
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 코드 출력 */}
      <div className="p-4">
        <CodePanel label={currentLabel} rows={currentRows} />
        {hintMap[activeTab] && (
          <p className="mt-2 text-xs text-muted-foreground">
            {hintMap[activeTab]}
          </p>
        )}
      </div>
    </div>
  );
}
