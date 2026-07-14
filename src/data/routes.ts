export type RouteItem = {
  path: string;
  label: string;
  icon: string;
  description?: string;
};

export const routes: RouteItem[] = [
  { 
    path: "/", 
    label: "시작하기", 
    icon: "rocket",
    description: "GitHub Pages 배포 가이드 소개 및 설정 코드 생성기"
  },
  { 
    path: "/part1", 
    label: "PART 1 · 한 번만", 
    icon: "monitor",
    description: "컴퓨터에 딱 한 번만 하는 설정 (Node.js, Git)"
  },
  { 
    path: "/part2", 
    label: "PART 2 · 새 폴더마다", 
    icon: "folder-open",
    description: "새 프로젝트마다 반복해야 하는 설정"
  },
  { 
    path: "/part3", 
    label: "PART 3 · 수정 후 재배포", 
    icon: "refresh-cw",
    description: "파일 수정 후 재배포하는 방법"
  },
  { 
    path: "/part4", 
    label: "PART 4 · CI/CD 자동화", 
    icon: "workflow",
    description: "GitHub Actions로 자동 배포 설정"
  },
  { 
    path: "/summary", 
    label: "요약 & 문제해결", 
    icon: "table",
    description: "최종 요약표 및 자주 겪는 문제"
  },
];
