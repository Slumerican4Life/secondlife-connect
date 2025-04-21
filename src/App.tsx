
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
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
import SlumericanCorner from "./pages/SlumericanCorner";
import MonetizationDashboard from "./pages/MonetizationDashboard";
import LindenExchange from "./pages/LindenExchange";
import Login from "./pages/Login";
import { useAuth } from "@/contexts/AuthContext";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {/* Protected routes */}
      <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/blood-bank" element={<ProtectedRoute><BloodBank /></ProtectedRoute>} />
      <Route path="/marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
      <Route path="/real-estate" element={<ProtectedRoute><RealEstate /></ProtectedRoute>} />
      <Route path="/dating" element={<ProtectedRoute><Dating /></ProtectedRoute>} />
      <Route path="/clan-portal" element={<ProtectedRoute><ClanPortal /></ProtectedRoute>} />
      <Route path="/royal-portal" element={<ProtectedRoute><RoyalPortal /></ProtectedRoute>} />
      <Route path="/uap-watch" element={<ProtectedRoute><UAPWatch /></ProtectedRoute>} />
      <Route path="/explore" element={<ProtectedRoute><ContentExplore /></ProtectedRoute>} />
      <Route path="/news" element={<ProtectedRoute><News /></ProtectedRoute>} />
      <Route path="/worlds" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
      <Route path="/messages" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
      <Route path="/bookmarks" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
      <Route path="/trending" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
      <Route path="/slumerican" element={<ProtectedRoute><SlumericanCorner /></ProtectedRoute>} />
      <Route path="/monetization" element={<ProtectedRoute><MonetizationDashboard /></ProtectedRoute>} />
      <Route path="/linden-exchange" element={<ProtectedRoute><LindenExchange /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <AppRoutes />
            <AIAssistant />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
