import {
  SectionAnchor, SectionTitle, SubTitle, Callout,
  InlineCode, SummaryTable, type SummaryRow
} from "@/components/DocBlocks";
import { Table2, AlertTriangle } from "lucide-react";

export default function SummaryPage() {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16 pb-24">
      {/* ── 요약표 ── */}
      <SectionAnchor id="summary" />
      <SectionTitle><Table2 size={18} className="text-primary" /> 최종 요약표 — C:\a 에서 C:\b 로 옮길 때</SectionTitle>
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

      <SubTitle>GitHub Pages에서 CSS가 안 보여요</SubTitle>
      <Callout variant="yellow">
        <p><strong>원인:</strong> <InlineCode>base</InlineCode> 설정이 잘못되었거나 누락되었습니다.</p>
        <p className="mt-1"><strong>해결:</strong> <InlineCode>vite.config.ts</InlineCode>에서 <InlineCode>base: '/저장소이름/'</InlineCode>이 올바르게 설정되었는지 확인하세요.</p>
      </Callout>

      <SubTitle>로컬에서는 되는데 배포하면 안 돼요</SubTitle>
      <Callout variant="yellow">
        <p><strong>원인:</strong> 환경 변수나 경로 설정이 로컬과 프로덕션에서 다릅니다.</p>
        <p className="mt-1"><strong>확인사항:</strong></p>
        <p className="mt-1">1. <InlineCode>base</InlineCode> 설정이 올바른지 확인</p>
        <p>2. 환경 변수가 프로덕션에서도 제공되는지 확인</p>
        <p>3. 브라우저 개발자 도구 Console에서 에러 메시지 확인</p>
      </Callout>

      <div className="mt-16 pt-8 border-t border-border text-center text-xs text-muted-foreground">
        GitHub Pages 배포 매뉴얼 (초보자용) &nbsp;·&nbsp; React + Vite + gh-pages 기준
      </div>
    </div>
  );
}
