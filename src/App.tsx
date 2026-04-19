import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import ChatBot from "@/components/ChatBot";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BookACall from "./pages/BookACall";
import CaseStudyTeacherAI from "./pages/CaseStudyTeacherAI";
import CaseStudyEcommerceSalesAutomation from "./pages/CaseStudyEcommerceSalesAutomation";
import CaseStudySandtonSchool from "./pages/CaseStudySandtonSchool";
import CaseStudyDashboard from "./pages/CaseStudyDashboard";
import CaseStudyBywayBackendAPI from "./pages/CaseStudyBywayBackendAPI";
import CaseStudyBYCEcommerce from "./pages/CaseStudyBYCEcommerce";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <div className="fixed inset-0 -z-50 pointer-events-none">
        <AnimatedBackground opacity={0.5} subtle={true} />
      </div>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/book-call" element={<BookACall />} />
          <Route
            path="/case-study/teacher-ai"
            element={<CaseStudyTeacherAI />}
          />
          <Route
            path="/case-study/ecommerce-sales-automation"
            element={<CaseStudyEcommerceSalesAutomation />}
          />
          <Route
            path="/case-study/sandton-school"
            element={<CaseStudySandtonSchool />}
          />
          <Route
            path="/case-study/dashboard"
            element={<CaseStudyDashboard />}
          />
          <Route
            path="/case-study/byway-backend-api"
            element={<CaseStudyBywayBackendAPI />}
          />
          <Route
            path="/case-study/byc-ecommerce"
            element={<CaseStudyBYCEcommerce />}
          />
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatBot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
