import {
  SectionAnchor, SectionTitle, SubTitle, Para, Callout,
  InlineCode, TerminalBlock
} from "@/components/DocBlocks";
import { Workflow, GitCompare, FileCode2, ShieldCheck, CheckCircle } from "lucide-react";

export default function Part4Page() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16 pb-24">
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
      <SubTitle><GitCompare size={16} className="inline text-primary" /> 4-1. 수동 배포 vs GitHub Actions 자동 배포 비교</SubTitle>

      <div className="overflow-x-auto my-4 rounded-xl border border-border shadow-lg">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[oklch(0.24_0.015_220)] text-white">
              <th className="text-left px-4 py-3 font-semibold rounded-tl-lg">항목</th>
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
      <SubTitle><FileCode2 size={16} className="inline text-primary" /> 4-2. workflow 파일 만들기</SubTitle>
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
        아래는 React + Vite 프로젝트용 workflow 예제입니다.
      </Callout>

      {/* Workflow 예제 */}
      <div className="my-6 p-4 bg-muted/30 rounded-xl border border-border">
        <p className="text-sm font-semibold text-foreground mb-3">.github/workflows/deploy.yml (React + Vite용)</p>
        <pre className="text-xs overflow-x-auto bg-[oklch(0.12_0.01_220)] text-slate-300 p-4 rounded-lg font-mono">
{`name: Deploy to GitHub Pages

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
        uses: actions/deploy-pages@v4`}
        </pre>
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
      <SubTitle><ShieldCheck size={16} className="inline text-primary" /> 4-3. GitHub 저장소 Pages 소스 변경</SubTitle>
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
      <SubTitle><CheckCircle size={16} className="inline text-primary" /> 4-4. 배포 확인하기</SubTitle>
      <Para>설정이 완료되면 main 브랜치에 push할 때마다 자동으로 배포됩니다.</Para>

      <TerminalBlock lines={[
        { text: "# 파일 수정 후 커밋 & push만 하면 자동 배포!", comment: true },
        { text: "git add ." },
        { text: 'git commit -m "기능 추가"' },
        { text: "git push origin master" },
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
    </div>
  );
}
