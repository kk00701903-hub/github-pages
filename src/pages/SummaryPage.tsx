import { SectionTitle } from "@/components/DocBlocks";
import { Table2 } from "lucide-react";

export default function SummaryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16 pb-24">
      <SectionTitle>
        <Table2 size={18} className="text-primary" /> 최종 요약표 & 자주 겪는 문제
      </SectionTitle>
      <p className="text-muted-foreground">이 페이지는 곧 완성될 예정입니다.</p>
    </div>
  );
}
