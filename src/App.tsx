import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { initGA, trackPageView } from "@/lib/analytics";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import ExperiencePage from "./pages/ExperiencePage";
import WorkPage from "./pages/WorkPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const RouteTracker = (): null => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(`${location.pathname}${location.search}`);
  }, [location]);

  return null;
};

const App = () => {
  useEffect(() => {
    initGA();
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <RouteTracker />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/work" element={<WorkPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
