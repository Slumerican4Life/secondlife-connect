
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import BloodBank from "./pages/BloodBank";
import Marketplace from "./pages/Marketplace";
import RealEstate from "./pages/RealEstate";
import Dating from "./pages/Dating";
import ClanPortal from "./pages/ClanPortal";
import RoyalPortal from "./pages/RoyalPortal";
import UAPWatch from "./pages/UAPWatch";
import ContentExplore from "./pages/ContentExplore";
import News from "./pages/News";
import AIAssistant from "./components/AIAssistant";
import { AuthProvider } from "@/contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/blood-bank" element={<BloodBank />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/real-estate" element={<RealEstate />} />
            <Route path="/dating" element={<Dating />} />
            <Route path="/clan-portal" element={<ClanPortal />} />
            <Route path="/royal-portal" element={<RoyalPortal />} />
            <Route path="/uap-watch" element={<UAPWatch />} />
            <Route path="/explore" element={<ContentExplore />} />
            <Route path="/news" element={<News />} />
            <Route path="/worlds" element={<NotFound />} />
            <Route path="/notifications" element={<NotFound />} />
            <Route path="/messages" element={<NotFound />} />
            <Route path="/bookmarks" element={<NotFound />} />
            <Route path="/trending" element={<NotFound />} />
            <Route path="/settings" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <AIAssistant />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
