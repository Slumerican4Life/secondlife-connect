
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, ArrowLeft, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface LoginAssistanceProps {
  email: string;
  password: string;
  onReturn: () => void;
  attemptCount: number;
}

const LoginAssistance = ({ email, password, onReturn, attemptCount }: LoginAssistanceProps) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const { signIn } = useAuth();
  
  // Simulate Lyra analyzing the login issue
  useEffect(() => {
    const analyzeIssue = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate analysis based on the email format and password characteristics
      let analysisText = "";
      
      if (!email.includes('@')) {
        analysisText = "The email address you entered is missing the @ symbol. A valid email must include this.";
      } else if (password.length < 6) {
        analysisText = "The password you entered is too short. Passwords must be at least 6 characters.";
      } else if (!/[A-Z]/.test(password)) {
        analysisText = "The password may be missing an uppercase letter.";
      } else if (!/[0-9]/.test(password)) {
        analysisText = "The password may be missing a number.";
      } else {
        analysisText = "I've analyzed your login attempts and detected potential issues. The email/password combination may be incorrect, or your account might not exist yet.";
      }
      
      setAnalysis(analysisText);
      setIsAnalyzing(false);
      
      // Log this assistance event
      console.log(`Lyra provided login assistance for user: ${email}, attempt count: ${attemptCount}`);
      
      // Show toast to indicate the analysis is complete
      toast.info("Login analysis complete", {
        description: "Lyra has identified potential issues with your login"
      });
    };
    
    analyzeIssue();
  }, [email, password, attemptCount]);
  
  const handleCreateAccount = async () => {
    try {
      await signIn(email, password);
      toast.success("Login successful!");
    } catch (error) {
      console.error("Error during assisted login:", error);
      toast.error("Unable to complete assisted login");
    }
  };
  
  return (
    <Card className="border-none bg-black/60 backdrop-blur-xl">
      <CardHeader className="border-b border-virtual-700 bg-virtual-900/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-virtual-500/30 rounded-full animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Brain className="h-6 w-6 text-virtual-300" />
              </div>
            </div>
            <CardTitle className="text-white text-xl">Lyra Login Assistant</CardTitle>
          </div>
          <AlertTriangle className="h-5 w-5 text-amber-400" />
        </div>
        <CardDescription className="text-virtual-300">
          Multiple failed login attempts detected. I'm here to help.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        {isAnalyzing ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 bg-purple-500/10 rounded-full animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Brain className="h-10 w-10 text-virtual-400 animate-float" />
              </div>
              <div className="absolute -inset-4 border-2 border-virtual-400/20 rounded-full animate-spin-slow" />
            </div>
            <p className="mt-4 text-virtual-300">Analyzing login attempts...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-virtual-900/50 border border-virtual-700 rounded-md">
              <h3 className="text-lg font-medium text-white mb-2">Lyra's Analysis</h3>
              <p className="text-virtual-300">{analysis}</p>
            </div>
            
            <div className="p-4 bg-virtual-900/50 border border-virtual-700 rounded-md">
              <h3 className="text-lg font-medium text-white mb-2">Account Information</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-virtual-400">Email</p>
                  <p className="text-white">{email}</p>
                </div>
                <div>
                  <p className="text-sm text-virtual-400">Password</p>
                  <p className="text-white">{password.replace(/./g, '•')}</p>
                </div>
                <div>
                  <p className="text-sm text-virtual-400">Failed Attempts</p>
                  <p className="text-white">{attemptCount}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-virtual-900/50 border border-virtual-700 rounded-md">
              <h3 className="text-lg font-medium text-white mb-2">Recommended Actions</h3>
              <ul className="list-disc list-inside space-y-1 text-virtual-300">
                <li>Double-check email spelling and try again</li>
                <li>Reset your password if you've forgotten it</li>
                <li>Sign up for a new account if you don't have one</li>
                <li>Contact support if you continue experiencing issues</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between border-t border-virtual-700 p-4 bg-virtual-900/50">
        <Button 
          variant="outline" 
          className="border-virtual-500 text-virtual-400"
          onClick={onReturn}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Login
        </Button>
        
        <Button 
          className="bg-virtual-500 hover:bg-virtual-600 text-white"
          onClick={handleCreateAccount}
          disabled={isAnalyzing}
        >
          Try Assisted Login
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginAssistance;
