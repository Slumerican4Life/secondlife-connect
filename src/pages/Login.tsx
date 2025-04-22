
import { useState, useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, Lock, Mail, UserPlus, AlertCircle } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user, signIn, signUp } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    // Unified redirect handling logic for both development and production
    const handleShowcaseRedirect = () => {
      try {
        // Get information about environment and user's history
        const hostname = window.location.hostname;
        const params = new URLSearchParams(window.location.search);
        const isShowcaseRedirect = params.get('from') === 'showcase';
        
        // Use the same environment detection logic as LyraInitializer
        const isProduction = hostname.includes('.lovable.app') || 
                           hostname.includes('.dev') || 
                           (!hostname.includes('localhost') && !hostname.includes('127.0.0.1'));
                           
        const isFirstVisit = !sessionStorage.getItem('visited');
        
        console.log(`Login page loaded. Production: ${isProduction}, First visit: ${isFirstVisit}, Showcase redirect: ${isShowcaseRedirect}, Hostname: ${hostname}`);
        
        // Redirect to showcase in these scenarios:
        // 1. Explicit showcase redirect parameter
        // 2. First-time visitor to the production site
        if (isShowcaseRedirect || (isProduction && isFirstVisit)) {
          // Mark that the user has visited before (to prevent redirect loops)
          sessionStorage.setItem('visited', 'true');
          console.log("Redirecting to showcase page");
          
          // Redirect with a slight delay to ensure session storage is set
          setTimeout(() => {
            window.location.href = '/showcase';
          }, 100);
        }
      } catch (error) {
        console.error("Error handling showcase redirect:", error);
      }
    };
    
    // Run redirect logic immediately
    handleShowcaseRedirect();
  }, [location]);
  
  // If already logged in, redirect to home
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      
      // Display user-friendly error message
      if (error.message === 'Failed to fetch') {
        setErrorMessage("Network error. Please check your internet connection and try again.");
        toast.error("Network error connecting to authentication service");
      } else {
        setErrorMessage(error.message || "Authentication failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black to-gray-900 p-4">
      <div className="w-full max-w-md">
        {/* Logo and branding */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white">SecondLife Connect</h1>
          <p className="mt-2 text-gray-300">Unleash your virtual existence</p>
        </div>
        
        {/* Login/Signup card */}
        <Card className="border-none bg-black/60 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-white">
              {isLogin ? "Welcome Back" : "Join the Community"}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? "Sign in to continue your virtual journey" 
                : "Create an account to start your adventure"}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-900/40 border border-red-700 rounded-md flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <span className="text-sm text-red-200">{errorMessage}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-virtual-500 hover:bg-virtual-600" 
                disabled={loading}
              >
                {loading ? (
                  "Processing..."
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  <div className="flex items-center">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create Account
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center">
              {isLogin ? (
                <p>
                  Don't have an account?{" "}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-virtual-400 hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-virtual-400 hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
            
            <div className="text-xs text-center text-muted-foreground">
              By continuing, you agree to our{" "}
              <Link to="/terms" className="hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
              .
            </div>
          </CardFooter>
        </Card>
        
        {/* Feature highlight */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="rounded-lg bg-black/40 p-4 text-center backdrop-blur-sm">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-virtual-900/50">
              <Lock className="h-5 w-5 text-virtual-400" />
            </div>
            <h3 className="text-sm font-medium text-white">Secure</h3>
            <p className="mt-1 text-xs text-gray-400">Advanced protection</p>
          </div>
          
          <div className="rounded-lg bg-black/40 p-4 text-center backdrop-blur-sm">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-virtual-900/50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-virtual-400"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <circle cx="10" cy="13" r="2" />
                <path d="m20 17-1.09-1.09a2 2 0 0 0-2.82 0L10 22" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-white">Immersive</h3>
            <p className="mt-1 text-xs text-gray-400">Rich experiences</p>
          </div>
          
          <div className="rounded-lg bg-black/40 p-4 text-center backdrop-blur-sm">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-virtual-900/50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-virtual-400"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m4.93 4.93 4.24 4.24" />
                <path d="m14.83 9.17 4.24-4.24" />
                <path d="m14.83 14.83 4.24 4.24" />
                <path d="m9.17 14.83-4.24 4.24" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-white">AI-Powered</h3>
            <p className="mt-1 text-xs text-gray-400">Intelligent assistance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
