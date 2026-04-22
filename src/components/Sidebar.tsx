import { useState } from "react";
import { navItems } from "@/data/docs";
import {
  Rocket, Lightbulb, Monitor, Github, Package,
  FileCode, Settings, GitBranch, Send, Table2,
  AlertTriangle, Menu, X, ChevronRight, Wand2,
  RefreshCw, Edit, GitCommit, UploadCloud, Tag,
  Workflow, GitCompare, FileCode2, ShieldCheck, CheckCircle
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  rocket:           <Rocket size={15} />,
  wand:             <Wand2 size={15} />,
  lightbulb:        <Lightbulb size={15} />,
  monitor:          <Monitor size={15} />,
  github:           <Github size={15} />,
  package:          <Package size={15} />,
  "file-code":      <FileCode size={15} />,
  settings:         <Settings size={15} />,
  "git-branch":     <GitBranch size={15} />,
  send:             <Send size={15} />,
  "refresh-cw":     <RefreshCw size={15} />,
  edit:             <Edit size={15} />,
  "git-commit":     <GitCommit size={15} />,
  "upload-cloud":   <UploadCloud size={15} />,
  tag:              <Tag size={15} />,
  workflow:         <Workflow size={15} />,
  "git-compare":    <GitCompare size={15} />,
  "file-code-2":    <FileCode2 size={15} />,
  "shield-check":   <ShieldCheck size={15} />,
  "check-circle":   <CheckCircle size={15} />,
  table:            <Table2 size={15} />,
  "alert-triangle": <AlertTriangle size={15} />,
};

interface SidebarProps {
  activeId: string;
  onNavigate: (id: string) => void;
}

export function Sidebar({ activeId, onNavigate }: SidebarProps) {
  const [open, setOpen] = useState(false);

  const handleClick = (id: string) => {
    onNavigate(id);
    setOpen(false);
  };

  const SidebarContent = () => (
    <nav className="flex flex-col gap-0.5 p-3">
      {/* Logo */}
      <div className="mb-4 px-2 py-3 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <Github size={14} className="text-primary-foreground" />
          </div>
          <div>
            <p className="text-xs font-bold text-sidebar-foreground leading-tight">GitHub Pages</p>
            <p className="text-[10px] text-muted-foreground leading-tight">배포 가이드</p>
          </div>
        </div>
      </div>

      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-2 mb-1 mt-1">개요</p>
      {navItems.slice(0, 3).map(item => (
        <NavBtn key={item.id} item={item} active={activeId === item.id} onClick={handleClick} />
      ))}

      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-2 mb-1 mt-3">한 번만 하면 됨</p>
      {navItems.slice(3, 4).map(item => (
        <NavBtn key={item.id} item={item} active={activeId === item.id} onClick={handleClick} />
      ))}

      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-2 mb-1 mt-3">새 폴더마다 반복</p>
      {navItems.slice(4, 10).map(item => (
        <NavBtn key={item.id} item={item} active={activeId === item.id} onClick={handleClick} indent />
      ))}

      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-2 mb-1 mt-3">수정 후 재배포</p>
      {navItems.slice(10, 11).map(item => (
        <NavBtn key={item.id} item={item} active={activeId === item.id} onClick={handleClick} />
      ))}
      {navItems.slice(11, 15).map(item => (
        <NavBtn key={item.id} item={item} active={activeId === item.id} onClick={handleClick} indent />
      ))}

      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-2 mb-1 mt-3">CI/CD 자동화</p>
      {navItems.slice(15, 16).map(item => (
        <NavBtn key={item.id} item={item} active={activeId === item.id} onClick={handleClick} />
      ))}
      {navItems.slice(16, 20).map(item => (
        <NavBtn key={item.id} item={item} active={activeId === item.id} onClick={handleClick} indent />
      ))}

      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-2 mb-1 mt-3">참고</p>
      {navItems.slice(20).map(item => (
        <NavBtn key={item.id} item={item} active={activeId === item.id} onClick={handleClick} />
      ))}
    </nav>
  );

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 lg:hidden w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-lg"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {open && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />
      )}

      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border overflow-y-auto transition-transform duration-300 lg:hidden ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <SidebarContent />
      </aside>

      <aside className="hidden lg:block w-64 shrink-0 sticky top-0 h-screen overflow-y-auto bg-sidebar border-r border-sidebar-border">
        <SidebarContent />
      </aside>
    </>
  );
}

function NavBtn({ item, active, onClick, indent = false }: {
  item: { id: string; label: string; icon: string };
  active: boolean;
  onClick: (id: string) => void;
  indent?: boolean;
}) {
  return (
    <button
      onClick={() => onClick(item.id)}
      className={`
        w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left text-sm transition-all duration-150
        ${indent ? "pl-4" : ""}
        ${active
          ? "bg-accent text-sidebar-primary font-semibold"
          : "text-sidebar-foreground hover:bg-accent/60 hover:text-sidebar-primary-foreground"}
      `}
    >
      <span className={active ? "text-primary" : "text-muted-foreground"}>
        {iconMap[item.icon]}
      </span>
      <span className="truncate">{item.label}</span>
      {active && <ChevronRight size={12} className="ml-auto text-primary shrink-0" />}
    </button>
  );
}
