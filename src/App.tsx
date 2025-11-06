import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CaseStudyEducational from "./pages/CaseStudyEducational";
import CaseStudyRolePrompting from "./pages/CaseStudyRolePrompting";
import CaseStudyEmotionalAI from "./pages/CaseStudyEmotionalAI";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/case-study/educational-bots" element={<CaseStudyEducational />} />
          <Route path="/case-study/role-prompting" element={<CaseStudyRolePrompting />} />
          <Route path="/case-study/emotional-ai" element={<CaseStudyEmotionalAI />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
