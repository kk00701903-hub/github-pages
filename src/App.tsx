import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavSidebar } from "@/components/NavSidebar";
import IntroPage from "@/pages/IntroPage";
import Part1Page from "@/pages/Part1Page";
import Part2Page from "@/pages/Part2Page";
import Part3Page from "@/pages/Part3Page";
import Part4Page from "@/pages/Part4Page";
import SummaryPage from "@/pages/SummaryPage";

export default function App() {
  return (
    <BrowserRouter basename="/github-pages">
      <div className="flex min-h-screen bg-background">
        <NavSidebar />
        <main className="flex-1 overflow-y-auto lg:ml-0">
          <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/part1" element={<Part1Page />} />
            <Route path="/part2" element={<Part2Page />} />
            <Route path="/part3" element={<Part3Page />} />
            <Route path="/part4" element={<Part4Page />} />
            <Route path="/summary" element={<SummaryPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
