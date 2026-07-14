import {
  SectionAnchor, SectionTitle, Para, Callout,
  StepCard, InlineCode, TerminalBlock
} from "@/components/DocBlocks";
import { Monitor } from "lucide-react";

export default function Part1Page() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16 pb-24">
      {/* ── PART 1 ── */}
      <SectionAnchor id="part1" />
      <SectionTitle><Monitor size={18} className="text-primary" /> PART 1 · 컴퓨터에 딱 한 번만 하는 것</SectionTitle>
      <Callout variant="green">
        아래 3가지는 <strong>이미 하셨다면 절대 다시 할 필요 없습니다.</strong><br />
        새 프로젝트 폴더를 만들어도 이 작업은 그대로 유효합니다.
      </Callout>

      <StepCard num={1} title="Node.js 설치">
        <p>Node.js는 JavaScript를 내 컴퓨터에서 실행하게 해주는 프로그램입니다. npm(패키지 관리자)도 함께 설치됩니다.</p>
        <p className="mt-2">공식 사이트 <strong>nodejs.org</strong>에서 LTS 버전을 받아 설치 후 확인:</p>
        <TerminalBlock lines={[
          { text: "node -v    # 예: v20.11.0 이 나오면 성공", comment: false },
          { text: "npm  -v    # 예: 10.2.4  이 나오면 성공", comment: false },
        ]} />
      </StepCard>

      <StepCard num={2} title="Git 설치">
        <p>Git은 코드 변경 이력을 관리하고 GitHub에 업로드할 수 있게 해주는 프로그램입니다.</p>
        <p className="mt-2"><strong>git-scm.com</strong>에서 Windows용 Git을 받아 설치 후 확인:</p>
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
    </div>
  );
}
