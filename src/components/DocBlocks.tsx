import { ReactNode } from "react";
import { CheckCircle2, XCircle, RefreshCw } from "lucide-react";

/* ──────────────────────────────────────────
   공통 UI 블록들
────────────────────────────────────────── */

export function SectionAnchor({ id }: { id: string }) {
  return <span id={id} className="block" style={{ scrollMarginTop: "2rem" }} />;
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-xl font-bold text-foreground mt-12 mb-4 pb-3 border-b border-border flex items-center gap-2">
      {children}
    </h2>
  );
}

export function SubTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-base font-semibold text-foreground mt-8 mb-3">{children}</h3>
  );
}

export function Para({ children }: { children: ReactNode }) {
  return <p className="text-sm text-muted-foreground leading-relaxed mb-3">{children}</p>;
}

export function Callout({
  children, variant = "info"
}: { children: ReactNode; variant?: "info" | "green" | "yellow" | "red" }) {
  const styles = {
    info:    "border-primary/40 bg-accent/40 text-accent-foreground",
    green:   "border-green-500/40 bg-green-50 text-green-900",
    yellow:  "border-amber-400/40 bg-amber-50 text-amber-900",
    red:     "border-destructive/40 bg-red-50 text-red-900",
  };
  return (
    <div className={`border-l-4 rounded-r-lg p-4 my-4 text-sm leading-relaxed ${styles[variant]}`}>
      {children}
    </div>
  );
}

export function CodeBlock({ lines }: { lines: CodeLine[] }) {
  return (
    <div className="rounded-lg overflow-hidden my-4 border border-border text-[13px] font-mono">
      <div className="bg-[oklch(0.14_0.01_220)] text-slate-300 overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className={line.highlight ? "bg-amber-500/10" : ""}>
                <td className="select-none text-right pr-4 pl-4 py-0.5 text-slate-600 w-8 text-xs border-r border-slate-700/50">
                  {line.num ?? ""}
                </td>
                <td className="pl-4 pr-4 py-0.5 whitespace-pre">
                  {line.highlight
                    ? <span className="text-amber-300">{line.text}</span>
                    : line.comment
                    ? <span className="text-slate-500">{line.text}</span>
                    : <span>{line.text}</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export type CodeLine = {
  num?: number | string;
  text: string;
  highlight?: boolean;
  comment?: boolean;
};

export function TerminalBlock({ lines }: { lines: TerminalLine[] }) {
  return (
    <div className="rounded-lg overflow-hidden my-4 bg-[oklch(0.12_0.01_220)] border border-slate-700/50">
      <div className="flex items-center gap-1.5 px-4 py-2 border-b border-slate-700/50">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        <span className="ml-2 text-[11px] text-slate-500 font-mono">Terminal</span>
      </div>
      <div className="p-4 font-mono text-[13px] space-y-0.5 overflow-x-auto">
        {lines.map((l, i) => (
          <div key={i}>
            {l.comment
              ? <span className="text-slate-500">{l.text}</span>
              : l.success
              ? <span className="text-green-400">{l.text}</span>
              : <span className="text-slate-200">{l.text}</span>
            }
          </div>
        ))}
      </div>
    </div>
  );
}

export type TerminalLine = { text: string; comment?: boolean; success?: boolean };

export function StepCard({
  num, title, children
}: { num: number; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 mb-6">
      <div className="shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center mt-0.5 shadow-sm">
        {num}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
        <div className="text-sm text-muted-foreground leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="bg-muted text-pink-700 font-mono text-[12px] px-1.5 py-0.5 rounded">
      {children}
    </code>
  );
}

/* Summary table row types */
export type SummaryRow = {
  task: string;
  redo: "no" | "yes" | "always";
  reason: string;
};

export function SummaryTable({ rows }: { rows: SummaryRow[] }) {
  const badge = (r: SummaryRow["redo"]) => {
    if (r === "no")     return <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-800 border border-green-200"><XCircle size={11} />안 함</span>;
    if (r === "yes")    return <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200"><RefreshCw size={11} />다시 함</span>;
    return <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200"><CheckCircle2 size={11} />항상 함</span>;
  };
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-[oklch(0.24_0.015_220)] text-white">
            <th className="text-left px-4 py-3 font-semibold rounded-tl-lg">작업 내용</th>
            <th className="text-left px-4 py-3 font-semibold">C:\b 에서 다시?</th>
            <th className="text-left px-4 py-3 font-semibold rounded-tr-lg">이유</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`border-b border-border ${i % 2 === 1 ? "bg-muted/40" : ""}`}>
              <td className="px-4 py-3 font-mono text-xs text-foreground">{row.task}</td>
              <td className="px-4 py-3">{badge(row.redo)}</td>
              <td className="px-4 py-3 text-muted-foreground text-xs">{row.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
