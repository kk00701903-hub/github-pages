export type NavItem = {
  id: string;
  label: string;
  icon: string;
};

export const navItems: NavItem[] = [
  { id: "intro",        label: "시작하기",            icon: "rocket" },
  { id: "generator",    label: "설정 코드 생성기",     icon: "wand" },
  { id: "concept",      label: "핵심 개념",            icon: "lightbulb" },
  { id: "part1",        label: "PART 1 · 한 번만",     icon: "monitor" },
  { id: "part2-1",      label: "2-1. GitHub 저장소",   icon: "github" },
  { id: "part2-2",      label: "2-2. gh-pages 설치",   icon: "package" },
  { id: "part2-3",      label: "2-3. package.json",    icon: "file-code" },
  { id: "part2-4",      label: "2-4. vite.config.ts",  icon: "settings" },
  { id: "part2-5",      label: "2-5. Git 연결",         icon: "git-branch" },
  { id: "part2-6",      label: "2-6. 배포 실행",          icon: "send" },
  { id: "update",       label: "PART 3 · 수정 후 재배포", icon: "refresh-cw" },
  { id: "update-1",     label: "3-1. 파일 수정",           icon: "edit" },
  { id: "update-2",     label: "3-2. 소스코드 저장(커밋)", icon: "git-commit" },
  { id: "update-3",     label: "3-3. 사이트 재배포",       icon: "upload-cloud" },
  { id: "update-tip",   label: "3-4. 버전 관리 팁",        icon: "tag" },
  { id: "summary",      label: "최종 요약표",              icon: "table" },
  { id: "trouble",      label: "자주 겪는 문제",           icon: "alert-triangle" },
];
