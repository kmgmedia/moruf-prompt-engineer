import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BookACall from "./pages/BookACall";
import CaseStudyEducational from "./pages/CaseStudyEducational";
import CaseStudyRolePrompting from "./pages/CaseStudyRolePrompting";
import CaseStudyEmotionalAI from "./pages/CaseStudyEmotionalAI";
import CaseStudyAPIIntegration from "./pages/CaseStudyAPIIntegration";
import CaseStudyTeacherAI from "./pages/CaseStudyTeacherAI";
import CaseStudyEcommerceChatbot from "./pages/CaseStudyEcommerceChatbot";
import CaseStudyDashboard from "./pages/CaseStudyDashboard";
import CaseStudySandtonSchool from "./pages/CaseStudySandtonSchool";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="fixed inset-0 -z-50 pointer-events-none">
        <AnimatedBackground opacity={0.5} subtle={true} />
      </div>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/book-call" element={<BookACall />} />
          <Route
            path="/case-study/educational-bots"
            element={<CaseStudyEducational />}
          />
          <Route
            path="/case-study/role-prompting"
            element={<CaseStudyRolePrompting />}
          />
          <Route
            path="/case-study/api-integration"
            element={<CaseStudyAPIIntegration />}
          />
          <Route
            path="/case-study/emotional-ai"
            element={<CaseStudyEmotionalAI />}
          />
          <Route
            path="/case-study/teacher-ai"
            element={<CaseStudyTeacherAI />}
          />
          <Route
            path="/case-study/ecommerce-chatbot"
            element={<CaseStudyEcommerceChatbot />}
          />
          <Route
            path="/case-study/dashboard"
            element={<CaseStudyDashboard />}
          />
          <Route
            path="/case-study/sandton-school"
            element={<CaseStudySandtonSchool />}
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
