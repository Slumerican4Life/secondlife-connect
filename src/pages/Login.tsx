import { useState, useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, Lock, Mail, UserPlus, AlertCircle } from "lucide-react";
import LoginAssistance from "@/components/LoginAssistance";
import LyraAssistButton from "@/components/LyraAssistButton";
import { AIAuthAgent } from "@/lib/agents/AIAuthAgent";

const authAgent = new AIAuthAgent();

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAssistance, setShowAssistance] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const { user, signIn, signUp } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    const handleShowcaseRedirect = () => {
      try {
        const hostname = window.location.hostname;
        const params = new URLSearchParams(window.location.search);
        const isShowcaseRedirect = params.get('from') === 'showcase';
        
        const isProduction = hostname.includes('.lovable.app') || 
                           hostname.includes('.dev') || 
                           (!hostname.includes('localhost') && !hostname.includes('127.0.0.1'));
                           
        const isFirstVisit = !sessionStorage.getItem('visited');
        
        console.log(`Login page loaded. Production: ${isProduction}, First visit: ${isFirstVisit}, Showcase redirect: ${isShowcaseRedirect}, Hostname: ${hostname}`);
        
        if (isShowcaseRedirect || (isProduction && isFirstVisit)) {
          sessionStorage.setItem('visited', 'true');
          console.log("Redirecting to showcase page");
          
          setTimeout(() => {
            window.location.href = '/showcase';
          }, 100);
        }
      } catch (error) {
        console.error("Error handling showcase redirect:", error);
      }
    };
    
    handleShowcaseRedirect();
  }, [location]);
  
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    
    try {
      if (isLogin) {
        console.log("Attempting login with:", email);
        await signIn(email, password);
      } else {
        // This is signup mode
        console.log("Attempting to sign up with:", email);
        await signUp(email, password);
        toast.success("Account created! You can now log in.");
        setIsLogin(true); // Switch to login view after successful signup
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      
      if (isLogin) {
        const currentAttempts = authAgent.getAttemptCount(email) + 1;
        const maxAttemptsReached = authAgent.trackLoginAttempt(email, false);
        setAttempts(currentAttempts);
        
        if (maxAttemptsReached) {
          setShowAssistance(true);
          toast.warning(`Multiple login failures detected`, {
            description: "Lyra Assistant has been activated to help you"
          });
        }
      }
      
      if (error.message === 'Failed to fetch') {
        setErrorMessage("Network error. Please check your internet connection and try again.");
      } else {
        setErrorMessage(error.message || "Authentication failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  const returnToLogin = () => {
    setShowAssistance(false);
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-virtual-900 via-virtual-800 to-virtual-700 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 bg-purple-500/20 rounded-full animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-12 h-12 text-virtual-300 animate-float"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <circle cx="10" cy="13" r="2" />
                  <path d="m20 17-1.09-1.09a2 2 0 0 0-2.82 0L10 22" />
                </svg>
              </div>
              <div className="absolute -inset-4 border-2 border-virtual-400/30 rounded-full animate-spin-slow" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-virtual-300 to-virtual-400">
            SecondLife Connect
          </h1>
          <p className="mt-2 text-virtual-300">Powered by Lyra AI</p>
        </div>
        
        {showAssistance ? (
          <LoginAssistance 
            email={email} 
            password={password} 
            onReturn={returnToLogin}
            attemptCount={attempts}
          />
        ) : (
          <Card className="border-none bg-black/60 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-white">
                {isLogin ? "Welcome Back" : "Create Your Account"}
              </CardTitle>
              <CardDescription className="text-virtual-300">
                {isLogin 
                  ? "Sign in to continue your journey" 
                  : "Join SecondLife Connect today"}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {errorMessage && (
                <div className="mb-4 p-3 bg-red-900/40 border border-red-700 rounded-md flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-red-200">{errorMessage}</span>
                </div>
              )}
              
              <div className="flex justify-center space-x-4 mb-6">
                <Button
                  type="button"
                  variant={isLogin ? "default" : "ghost"}
                  onClick={() => {
                    setIsLogin(true);
                    setErrorMessage("");
                  }}
                  className="flex-1"
                >
                  Login
                </Button>
                <Button
                  type="button"
                  variant={!isLogin ? "default" : "ghost"}
                  onClick={() => {
                    setIsLogin(false);
                    setErrorMessage("");
                  }}
                  className="flex-1"
                >
                  Sign Up
                </Button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-virtual-400" />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-virtual-900/50 border-virtual-700 text-white placeholder:text-virtual-500"
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
                      className="pl-10 pr-10 bg-virtual-900/50 border-virtual-700 text-white placeholder:text-virtual-500"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-virtual-400"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-virtual-400">
                    {isLogin ? "" : "Password must be at least 6 characters"}
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-virtual-500 hover:bg-virtual-600 text-white" 
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
                  <p className="text-virtual-300">
                    New to SecondLife Connect?{" "}
                    <button
                      onClick={() => {
                        setIsLogin(false);
                        setErrorMessage("");
                      }}
                      className="text-virtual-400 hover:underline font-semibold"
                    >
                      Create an account
                    </button>
                  </p>
                ) : (
                  <p className="text-virtual-300">
                    Already have an account?{" "}
                    <button
                      onClick={() => {
                        setIsLogin(true);
                        setErrorMessage("");
                      }}
                      className="text-virtual-400 hover:underline font-semibold"
                    >
                      Sign in here
                    </button>
                  </p>
                )}
              </div>
              
              <div className="text-xs text-center text-virtual-400">
                By continuing, you agree to our{" "}
                <Link to="/terms" className="hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </div>
            </CardFooter>
          </Card>
        )}
        
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
