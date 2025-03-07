
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import HomePage from "./pages/HomePage";
import InboxPage from "./pages/InboxPage";
import ReadLaterPage from "./pages/ReadLaterPage";
import ArchivePage from "./pages/ArchivePage";
import ArticleViewPage from "./pages/ArticleViewPage";
import NotFoundPage from "./pages/NotFoundPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <AppLayout>
              <HomePage />
            </AppLayout>
          } />
          <Route path="/inbox" element={
            <AppLayout>
              <InboxPage />
            </AppLayout>
          } />
          <Route path="/later" element={
            <AppLayout>
              <ReadLaterPage />
            </AppLayout>
          } />
          <Route path="/archive" element={
            <AppLayout>
              <ArchivePage />
            </AppLayout>
          } />
          <Route path="/articles/:id" element={
            <AppLayout>
              <ArticleViewPage />
            </AppLayout>
          } />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
