
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/blood-sanctuary" element={<NotFound />} />
            <Route path="/blood-dolls" element={<NotFound />} />
            <Route path="/clan-hierarchy" element={<NotFound />} />
            <Route path="/virtual-lands" element={<NotFound />} />
            <Route path="/marketplace" element={<NotFound />} />
            <Route path="/events" element={<NotFound />} />
            <Route path="/explore" element={<NotFound />} />
            <Route path="/worlds" element={<NotFound />} />
            <Route path="/notifications" element={<NotFound />} />
            <Route path="/messages" element={<NotFound />} />
            <Route path="/bookmarks" element={<NotFound />} />
            <Route path="/trending" element={<NotFound />} />
            <Route path="/settings" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
