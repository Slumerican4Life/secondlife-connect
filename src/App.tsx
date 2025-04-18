
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import BloodMarket from "./pages/BloodMarket";
import Marketplace from "./pages/Marketplace";
import RealEstate from "./pages/RealEstate";
import Dating from "./pages/Dating";
import ClanPortal from "./pages/ClanPortal";
import AIAssistant from "./components/AIAssistant";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/blood-market" element={<BloodMarket />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/real-estate" element={<RealEstate />} />
          <Route path="/dating" element={<Dating />} />
          <Route path="/clan-portal" element={<ClanPortal />} />
          {/* These routes will be implemented later */}
          <Route path="/explore" element={<NotFound />} />
          <Route path="/worlds" element={<NotFound />} />
          <Route path="/notifications" element={<NotFound />} />
          <Route path="/messages" element={<NotFound />} />
          <Route path="/bookmarks" element={<NotFound />} />
          <Route path="/trending" element={<NotFound />} />
          <Route path="/settings" element={<NotFound />} />
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <AIAssistant />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
