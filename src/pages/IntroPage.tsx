import { SectionAnchor, SectionTitle, Para, Callout } from "@/components/DocBlocks";
import { ConfigGenerator } from "@/components/ConfigGenerator";
import { Monitor, FolderOpen } from "lucide-react";

export default function IntroPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16 pb-24">
      {/* ── 시작하기 ── */}
      <SectionAnchor id="intro" />
      <div className="mb-12 sm:mb-16">
        <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary bg-accent px-4 py-2 rounded-full mb-6 shadow-sm">
          GitHub Pages 배포 가이드
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-5">
          처음 해도 OK<br />
          <span className="text-primary">GitHub 페이지 배포</span> 완전 가이드
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-4xl">
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
        <p className="font-semibold mb-2 text-lg">비유로 이해하기</p>
        <p className="text-base">Node.js와 Git 설치는 <strong>내 방에 전동 드릴을 사는 것</strong>입니다.<br />
        한 번 사면 어느 집(폴더)에 가도 가져다 쓸 수 있죠.</p>
        <p className="mt-3 text-base">반면 npm install, git init 등은 <strong>각 공사 현장(폴더)마다 자재를 주문하는 것</strong>입니다.<br />
        공사 현장이 바뀌면 자재도 새로 주문해야 합니다.</p>
      </Callout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 my-6 sm:my-8">
        <div className="border-2 border-green-300 rounded-xl p-5 sm:p-6 bg-green-50 shadow-md">
          <p className="text-sm font-bold text-green-700 uppercase tracking-wide mb-4 flex items-center gap-2">
            <Monitor size={16} /> 컴퓨터에 딱 한 번만
          </p>
          <ul className="space-y-2 text-base text-green-900">
            <li>• Node.js 설치</li>
            <li>• Git 설치</li>
            <li>• Git 이름/이메일 전역 설정</li>
          </ul>
        </div>
        <div className="border-2 border-blue-300 rounded-xl p-5 sm:p-6 bg-blue-50 shadow-md">
          <p className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-4 flex items-center gap-2">
            <FolderOpen size={16} /> 새 폴더마다 다시 해야 함
          </p>
          <ul className="space-y-2 text-base text-blue-900">
            <li>• npm install gh-pages</li>
            <li>• package.json 수정</li>
            <li>• vite.config.ts 수정</li>
            <li>• git init / remote add</li>
            <li>• npm run deploy</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
