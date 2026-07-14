import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { routes } from "@/data/routes";
import {
  Rocket, Monitor, FolderOpen, RefreshCw, Workflow, Table2,
  Menu, X, ChevronRight, Github
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  rocket: <Rocket size={15} />,
  monitor: <Monitor size={15} />,
  "folder-open": <FolderOpen size={15} />,
  "refresh-cw": <RefreshCw size={15} />,
  workflow: <Workflow size={15} />,
  table: <Table2 size={15} />,
};

export function NavSidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

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

      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-2 mb-1 mt-1">목차</p>
      {routes.map(route => {
        const isActive = location.pathname === route.path;
        return (
          <Link
            key={route.path}
            to={route.path}
            onClick={() => setOpen(false)}
            className={`
              w-full flex items-center gap-2 px-2 py-2 rounded-md text-left text-sm transition-all duration-150
              ${isActive
                ? "bg-accent text-sidebar-primary font-semibold"
                : "text-sidebar-foreground hover:bg-accent/60 hover:text-sidebar-primary-foreground"}
            `}
          >
            <span className={isActive ? "text-primary" : "text-muted-foreground"}>
              {iconMap[route.icon]}
            </span>
            <span className="truncate flex-1">{route.label}</span>
            {isActive && <ChevronRight size={12} className="text-primary shrink-0" />}
          </Link>
        );
      })}
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
