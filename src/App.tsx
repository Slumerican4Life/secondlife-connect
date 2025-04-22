
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Showcase from "@/pages/Showcase";
import Profile from "@/pages/Profile";
import ContentExplore from "@/pages/ContentExplore";
import BloodBank from "@/pages/BloodBank";
import BloodMarket from "@/pages/BloodMarket";
import ClanPortal from "@/pages/ClanPortal";
import Dating from "@/pages/Dating";
import LindenExchange from "@/pages/LindenExchange";
import Marketplace from "@/pages/Marketplace";
import MonetizationDashboard from "@/pages/MonetizationDashboard";
import News from "@/pages/News";
import RealEstate from "@/pages/RealEstate";
import RoyalPortal from "@/pages/RoyalPortal";
import SlumericanCorner from "@/pages/SlumericanCorner";
import Sponsorship from "@/pages/Sponsorship";
import UAPWatch from "@/pages/UAPWatch";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import LyraAssistButton from "@/components/LyraAssistButton";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            {/* Public routes that don't require authentication */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/showcase" element={<Showcase />} />
            <Route path="/sponsorship" element={<Sponsorship />} />
            <Route path="/slumerican-corner" element={<SlumericanCorner />} />
            <Route path="/news" element={<News />} />
            <Route path="/uap-watch" element={<UAPWatch />} />
            
            {/* These routes will still be accessible but may have limited functionality for non-authenticated users */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/explore" element={<ContentExplore />} />
            <Route path="/bloodbank" element={<BloodBank />} />
            <Route path="/bloodmarket" element={<BloodMarket />} />
            <Route path="/clan-portal" element={<ClanPortal />} />
            <Route path="/dating" element={<Dating />} />
            <Route path="/linden-exchange" element={<LindenExchange />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/monetization" element={<MonetizationDashboard />} />
            <Route path="/real-estate" element={<RealEstate />} />
            <Route path="/royal-portal" element={<RoyalPortal />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          {/* Lyra is always available system-wide */}
          <LyraAssistButton />
          
          <Toaster />
          <SonnerToaster position="top-center" />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
