import { useState, useEffect, useCallback } from "react";
import { Sidebar } from "@/components/Sidebar";
import Home from "@/pages/Home";
import { navItems } from "@/data/docs";

export default function App() {
  const [activeId, setActiveId] = useState("intro");

  // Intersection observer — highlight sidebar item as user scrolls
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const handleNavigate = useCallback((id: string) => {
    setActiveId(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeId={activeId} onNavigate={handleNavigate} />
      <main className="flex-1 overflow-y-auto">
        <Home />
      </main>
    </div>
  );
}
