import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import ChatBot from "@/components/ChatBot";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const BookACall = lazy(() => import("./pages/BookACall"));
const CaseStudyTeacherAI = lazy(() => import("./pages/CaseStudyTeacherAI"));
const CaseStudyTeacherAIAssistant = lazy(
  () => import("./pages/CaseStudyTeacherAIAssistant"),
);
const CaseStudyEcommerceSalesAutomation = lazy(
  () => import("./pages/CaseStudyEcommerceSalesAutomation"),
);
const CaseStudySandtonSchool = lazy(
  () => import("./pages/CaseStudySandtonSchool"),
);
const CaseStudyDashboard = lazy(() => import("./pages/CaseStudyDashboard"));
const CaseStudyBywayBackendAPI = lazy(
  () => import("./pages/CaseStudyBywayBackendAPI"),
);
const CaseStudyBYCEcommerce = lazy(
  () => import("./pages/CaseStudyBYCEcommerce"),
);
const CaseStudyEmotionalAI = lazy(() => import("./pages/CaseStudyEmotionalAI"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center px-4">
    <p className="text-sm text-muted-foreground">Loading...</p>
  </div>
);

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<RouteFallback />}>{element}</Suspense>
);

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
        { path: "/", element: withSuspense(<Index />) },
        { path: "/book-call", element: withSuspense(<BookACall />) },
        {
          path: "/case-study/teacher-ai",
          element: withSuspense(<CaseStudyTeacherAIAssistant />),
        },
        {
          path: "/case-study/intelligent-workflow-systems",
          element: withSuspense(<CaseStudyTeacherAI />),
        },
        {
          path: "/case-study/ai-teaching-assistant-system",
          element: withSuspense(<CaseStudyTeacherAIAssistant />),
        },
        {
          path: "/case-study/ecommerce-sales-automation",
          element: withSuspense(<CaseStudyEcommerceSalesAutomation />),
        },
        {
          path: "/case-study/sandton-school",
          element: withSuspense(<CaseStudySandtonSchool />),
        },
        {
          path: "/case-study/dashboard",
          element: withSuspense(<CaseStudyDashboard />),
        },
        {
          path: "/case-study/byway-backend-api",
          element: withSuspense(<CaseStudyBywayBackendAPI />),
        },
        {
          path: "/case-study/byc-ecommerce",
          element: withSuspense(<CaseStudyBYCEcommerce />),
        },
        {
          path: "/case-study/emotional-ai",
          element: withSuspense(<CaseStudyEmotionalAI />),
        },
        { path: "*", element: withSuspense(<NotFound />) },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_startTransition: true,
    },
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
