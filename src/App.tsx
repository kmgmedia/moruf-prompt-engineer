import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import ChatBot from "@/components/ChatBot";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BookACall from "./pages/BookACall";
import CaseStudyTeacherAI from "./pages/CaseStudyTeacherAI";
import CaseStudyTeacherAIAssistant from "./pages/CaseStudyTeacherAIAssistant";
import CaseStudyEcommerceSalesAutomation from "./pages/CaseStudyEcommerceSalesAutomation";
import CaseStudySandtonSchool from "./pages/CaseStudySandtonSchool";
import CaseStudyDashboard from "./pages/CaseStudyDashboard";
import CaseStudyBywayBackendAPI from "./pages/CaseStudyBywayBackendAPI";
import CaseStudyBYCEcommerce from "./pages/CaseStudyBYCEcommerce";
import CaseStudyEmotionalAI from "./pages/CaseStudyEmotionalAI";

const queryClient = new QueryClient();

const Root = () => (
  <>
    <ScrollToTop />
    <Outlet />
    <ChatBot />
  </>
);

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "/", element: <Index /> },
        { path: "/book-call", element: <BookACall /> },
        {
          path: "/case-study/teacher-ai",
          element: <CaseStudyTeacherAIAssistant />,
        },
        {
          path: "/case-study/intelligent-workflow-systems",
          element: <CaseStudyTeacherAI />,
        },
        {
          path: "/case-study/ai-teaching-assistant-system",
          element: <CaseStudyTeacherAIAssistant />,
        },
        {
          path: "/case-study/ecommerce-sales-automation",
          element: <CaseStudyEcommerceSalesAutomation />,
        },
        {
          path: "/case-study/sandton-school",
          element: <CaseStudySandtonSchool />,
        },
        { path: "/case-study/dashboard", element: <CaseStudyDashboard /> },
        {
          path: "/case-study/byway-backend-api",
          element: <CaseStudyBywayBackendAPI />,
        },
        {
          path: "/case-study/byc-ecommerce",
          element: <CaseStudyBYCEcommerce />,
        },
        { path: "/case-study/emotional-ai", element: <CaseStudyEmotionalAI /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  {
    future: { v7_relativeSplatPath: true },
  },
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <div className="fixed inset-0 -z-50 pointer-events-none">
        <AnimatedBackground opacity={0.5} subtle={true} />
      </div>
      <RouterProvider router={router} />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
