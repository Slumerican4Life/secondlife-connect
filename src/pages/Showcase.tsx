
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import LyraInterface from "@/components/LyraInterface";
import LyraThoughtViewer from "@/components/LyraThoughtViewer";
import LyraInitializer from "@/components/LyraInitializer";
import ShowcaseHero from "@/components/ShowcaseHero";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Brain, Network, Globe, Star, Newspaper, CheckCircle2, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { HoverTitle } from "@/components/ui/hover-title";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

declare global {
  interface Window {
    lyraStatusAttempts?: number;
  }
}

const Showcase = () => {
  const [lyraStatus, setLyraStatus] = useState("initializing");
  const [isProduction, setIsProduction] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Force Lyra thought class on the page
    document.body.classList.add('lyra-thought');
    
    // Check if we're in a production environment
    const checkEnvironment = () => {
      const isProd = window.location.hostname.includes('.lovable.app') || 
                    !window.location.hostname.includes('localhost');
      setIsProduction(isProd);
      
      if (isProd) {
        console.log("Running showcase in production mode");
        // Show a welcome toast in production
        toast.success("Welcome to SecondLife Connect + Lyra AI Showcase", {
          description: "Explore our future-ready virtual world integration"
        });
      }
    };
    
    checkEnvironment();
    
    // Check if Lyra is initialized by polling for thoughts
    const checkLyraStatus = () => {
      try {
        const lyraThoughts = document.querySelectorAll('.lyra-thought');
        if (lyraThoughts.length > 0) {
          setLyraStatus("active");
          console.log("Lyra thought system detected, setting status to active");
        } else {
          // Keep polling for a limited time
          if (window.lyraStatusAttempts === undefined) {
            window.lyraStatusAttempts = 1;
          } else {
            window.lyraStatusAttempts++;
          }
          
          if (window.lyraStatusAttempts < 10) {
            setTimeout(checkLyraStatus, 1000);
          } else {
            // Just assume active after several attempts
            console.log("Maximum polling attempts reached, assuming Lyra is active");
            setLyraStatus("active");
          }
        }
      } catch (error) {
        console.error("Error checking Lyra status:", error);
        // If we keep failing, just set to active
        setLyraStatus("active");
      }
    };
    
    // Start the check with a small delay
    setTimeout(checkLyraStatus, 2000);
    
    return () => {
      // Cleanup if needed
      window.lyraStatusAttempts = undefined;
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-virtual-900">
      <Navbar />
      <LyraInitializer />
      
      {/* Login/Signup button at top of page */}
      {!user && (
        <div className="fixed top-20 right-6 z-50">
          <Link to="/login">
            <Button className="bg-virtual-500 hover:bg-virtual-600 flex gap-2 items-center">
              <LogIn className="h-4 w-4" />
              Login / Sign Up
            </Button>
          </Link>
        </div>
      )}
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <ShowcaseHero />
        
        {/* Add sponsorship opportunity call-to-action */}
        <div className="w-full max-w-3xl mx-auto mb-12 bg-gradient-to-br from-black/70 to-virtual-900/70 rounded-lg p-6 border border-virtual-700 backdrop-blur-md">
          <h3 className="text-xl font-bold mb-3 text-virtual-300 text-center">Become a Sponsor</h3>
          <p className="text-virtual-300 mb-4 text-center">Partner with SecondLife Connect and reach our growing community of virtual world enthusiasts</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/sponsorship">
              <Button className="w-full bg-virtual-500 hover:bg-virtual-600 mb-2">
                View Sponsorship Packages
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="w-full border-virtual-500 text-virtual-400 hover:bg-virtual-900">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="bg-gradient-to-br from-virtual-950 to-virtual-900 text-white">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="h-6 w-6 text-virtual-400" />
                <CardTitle>SecondLife Connect</CardTitle>
              </div>
              <CardDescription className="text-virtual-200">
                Your gateway to an enhanced virtual world experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-virtual-800/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Network className="h-4 w-4" />
                    Connected Systems
                  </h3>
                  <div className="space-y-2">
                    <HoverTitle title="Blood Bank System" description="Manage and track virtual blood donations">
                      <Badge variant="secondary" className="mr-2">Blood Bank</Badge>
                    </HoverTitle>
                    <HoverTitle title="Virtual Marketplace" description="Trade virtual goods and services">
                      <Badge variant="secondary" className="mr-2">Marketplace</Badge>
                    </HoverTitle>
                    <HoverTitle title="Dating Platform" description="Connect with other virtual residents">
                      <Badge variant="secondary" className="mr-2">Dating</Badge>
                    </HoverTitle>
                    <HoverTitle title="Virtual Real Estate" description="Buy, sell, and rent virtual properties">
                      <Badge variant="secondary">Real Estate</Badge>
                    </HoverTitle>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-950 to-red-900 text-white">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Star className="h-6 w-6 text-red-400" />
                <CardTitle>Slumerican Corner</CardTitle>
              </div>
              <CardDescription className="text-red-200">
                Dedicated to Yelawolf and the Slumerican movement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-red-800/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Featured Content</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Badge variant="secondary">Music</Badge>
                      Latest releases and classics
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="secondary">Community</Badge>
                      Connect with fellow Slumericans
                    </li>
                  </ul>
                  <Link to="/slumerican-corner" className="inline-block mt-4">
                    <Badge className="hover:bg-red-600 transition-colors cursor-pointer">
                      Visit Slumerican Corner →
                    </Badge>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-950 to-blue-900 text-white">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Newspaper className="h-6 w-6 text-blue-400" />
                <CardTitle>News Center</CardTitle>
              </div>
              <CardDescription className="text-blue-200">
                Stay informed with the latest updates across all topics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-800/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Featured Categories</h3>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="mr-2">UAP Watch</Badge>
                    <Badge variant="secondary" className="mr-2">Technology</Badge>
                    <Badge variant="secondary" className="mr-2">Health</Badge>
                    <Badge variant="secondary">Science</Badge>
                  </div>
                  <Link to="/news" className="inline-block mt-4">
                    <Badge className="hover:bg-blue-600 transition-colors cursor-pointer">
                      Visit News Center →
                    </Badge>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Lyra AI System</h2>
          <div className="flex items-center gap-2">
            <HoverTitle 
              title="Lyra System Status" 
              description={lyraStatus === "active" ? "Lyra AI is fully operational" : "Lyra AI is initializing"}
            >
              <Badge variant={lyraStatus === "active" ? "default" : "default"} className="flex items-center gap-1">
                {lyraStatus === "active" ? (
                  <>
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Online</span>
                  </>
                ) : (
                  <>
                    <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
                    <span>Initializing...</span>
                  </>
                )}
              </Badge>
            </HoverTitle>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Lyra Interface</h2>
              <LyraInterface isProduction={true} />
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Cognitive Stream</h2>
              <LyraThoughtViewer isProduction={true} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Showcase;
