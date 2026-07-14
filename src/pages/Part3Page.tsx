import {
  SectionAnchor, SectionTitle, SubTitle, Para, Callout,
  StepCard, InlineCode, TerminalBlock
} from "@/components/DocBlocks";
import { RefreshCw, Edit, GitCommit, UploadCloud, Tag } from "lucide-react";

export default function Part3Page() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16 pb-24">
      {/* ══════════════════════════════════════
          PART 3 · 수정 후 재배포
      ══════════════════════════════════════ */}
      <SectionAnchor id="update" />
      <SectionTitle>
        <RefreshCw size={18} className="text-primary" /> PART 3 · 파일 수정 후 재배포하기
      </SectionTitle>

      {/* 전체 흐름 요약 카드 */}
      <div className="my-6 sm:my-8 rounded-xl border-2 border-border overflow-hidden shadow-lg">
        <div className="bg-muted/50 px-5 sm:px-6 py-4 border-b border-border">
          <p className="text-sm font-bold text-foreground uppercase tracking-wide">수정 → 배포 전체 흐름 한눈에 보기</p>
        </div>
        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-border">
          {[
            { step: "1", icon: "✏️", label: "파일 수정",      desc: "VS Code 등으로 src 폴더 안 파일 편집" },
            { step: "2", icon: "💾", label: "커밋 (선택)",     desc: "git add → commit으로 이력 저장" },
            { step: "3", icon: "🚀", label: "npm run deploy", desc: "한 줄로 빌드 + GitHub Pages 배포" },
            { step: "4", icon: "✅", label: "사이트 확인",     desc: "1~2분 뒤 브라우저에서 반영 확인" },
          ].map(item => (
            <div key={item.step} className="flex-1 px-5 py-6 text-center">
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="text-sm font-bold text-foreground mb-1">{item.label}</p>
              <p className="text-xs text-muted-foreground leading-snug">{item.desc}</p>
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
      <SubTitle><Edit size={16} className="inline text-primary" /> 3-1. 파일 수정하기</SubTitle>
      <Para>
        수정 대상은 <InlineCode>src/</InlineCode> 폴더 안의 파일들입니다.
        VS Code, Cursor 등 에디터로 원하는 파일을 열고 수정 후 저장합니다.
      </Para>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 my-6">
        {[
          { file: "src/App.tsx",         desc: "앱의 최상위 컴포넌트 — 라우팅, 전체 구조 변경" },
          { file: "src/pages/Home.tsx",  desc: "메인 페이지 내용 수정" },
          { file: "src/components/",     desc: "재사용 컴포넌트 수정/추가" },
          { file: "src/index.css",       desc: "전체 스타일 · 테마 색상 변경" },
          { file: "public/",             desc: "이미지, 파비콘 등 정적 파일 교체" },
          { file: "package.json",        desc: "패키지 추가·삭제 시만 수정 (배포 설정 건드리지 않도록 주의)" },
        ].map(item => (
          <div key={item.file} className="flex gap-3 p-4 bg-muted/30 rounded-lg border border-border shadow-sm">
            <code className="text-xs font-mono text-primary shrink-0 mt-0.5 font-semibold">{item.file}</code>
            <p className="text-sm text-muted-foreground leading-snug">{item.desc}</p>
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
      <SubTitle><GitCommit size={16} className="inline text-primary" /> 3-2. 소스코드 저장 — git commit (선택 권장)</SubTitle>
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
      <SubTitle><UploadCloud size={16} className="inline text-primary" /> 3-3. 사이트 재배포 — npm run deploy</SubTitle>
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
      <SubTitle><Tag size={16} className="inline text-primary" /> 3-4. 버전 관리 팁</SubTitle>

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
    </div>
  );
}
