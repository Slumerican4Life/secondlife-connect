
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Marketplace from "./pages/Marketplace";
import Worlds from "./pages/Worlds";
import Dating from "./pages/Dating";
import BloodBank from "./pages/BloodBank";
import RealEstate from "./pages/RealEstate";
import RoyalPortal from "./pages/RoyalPortal";
import ClanPortal from "./pages/ClanPortal";
import Showcase from "./pages/Showcase";
import Sponsorship from "./pages/Sponsorship";
import NotFound from "./pages/NotFound";
import RevenueOptimizer from "./pages/RevenueOptimizer";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./contexts/AuthContext";
import AIAssistant from "./components/AIAssistant";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/worlds" element={<Worlds />} />
          <Route path="/dating" element={<Dating />} />
          <Route path="/blood-bank" element={<BloodBank />} />
          <Route path="/real-estate" element={<RealEstate />} />
          <Route path="/royal-portal" element={<RoyalPortal />} />
          <Route path="/clan-portal" element={<ClanPortal />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/sponsorship" element={<Sponsorship />} />
          <Route path="/revenue-optimizer" element={<RevenueOptimizer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <AIAssistant />
      </Router>
    </AuthProvider>
  );
};

export default App;
