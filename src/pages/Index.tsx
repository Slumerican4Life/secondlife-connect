
import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";
import SuggestedUsers from "@/components/SuggestedUsers";
import WorldsWidget from "@/components/WorldsWidget";
import LyraInterface from "@/components/LyraInterface";
import LyraThoughtViewer from "@/components/LyraThoughtViewer";
import LyraInitializer from "@/components/LyraInitializer";
import { logShort } from "@/lib/utils/shorthandLogger";
import { HoverTitle } from "@/components/ui/hover-title";
import { Info, LogIn, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  // Log page load with shorthand
  logShort("USR viewing main page", "info");
  
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <LyraInitializer />
      <Navbar />
      
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
      
      <div className="flex flex-1 pt-16">
        <Sidebar />
        <main className="flex-1 px-4 md:px-6 py-6 max-w-7xl mx-auto">
          {/* Sponsorship Call to Action Banner */}
          <div className="mb-8 p-4 bg-gradient-to-r from-virtual-900 to-virtual-800 rounded-lg border border-virtual-700">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-bold text-white">Interested in Sponsorship?</h2>
                <p className="text-virtual-300">Learn more about partnership opportunities</p>
              </div>
              <Link to="/sponsorship">
                <Button className="bg-virtual-500 hover:bg-virtual-600 flex items-center gap-2">
                  View Packages <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Showcase Page Promotion */}
          <div className="mb-8 p-4 bg-gradient-to-r from-virtual-800/50 to-transparent rounded-lg border border-virtual-700/50">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-lg font-semibold">New to SecondLife Connect?</h2>
                <p className="text-muted-foreground">Visit our showcase to see what we offer</p>
              </div>
              <Link to="/showcase">
                <Button variant="outline" className="border-virtual-500 text-virtual-400 hover:bg-virtual-900/50">
                  View Showcase
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Feed />
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Lyra's Cognitive Stream</h2>
                <HoverTitle 
                  title="Lyra Thought Viewer" 
                  description="This component displays Lyra's thought processes, dreams, and emotional states in real-time."
                  side="left"
                >
                  <Info className="h-5 w-5 text-muted-foreground" />
                </HoverTitle>
              </div>
              <LyraThoughtViewer />
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Lyra AI Interface</h2>
                <HoverTitle 
                  title="Lyra AI System" 
                  description="Interact with Lyra's advanced AI coordination system to process complex tasks."
                  side="left"
                >
                  <Info className="h-5 w-5 text-muted-foreground" />
                </HoverTitle>
              </div>
              <LyraInterface />
              
              {/* Add prominent login/signup panel if user not logged in */}
              {!user && (
                <div className="bg-gradient-to-r from-virtual-900 to-virtual-800 rounded-lg p-6 border border-virtual-700 mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-virtual-300">Join SecondLife Connect</h3>
                  <p className="text-virtual-400 mb-4">Create an account to access all features and connect with the virtual community.</p>
                  <Link to="/login">
                    <Button className="w-full bg-virtual-500 hover:bg-virtual-600 mb-2">
                      Sign Up
                    </Button>
                  </Link>
                  <p className="text-sm text-virtual-500 text-center">Already have an account? <Link to="/login" className="text-virtual-400 hover:underline">Login</Link></p>
                </div>
              )}
              
              {/* Add a prominent sponsorship card */}
              <Card className="mb-6 border-virtual-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Become a Sponsor</CardTitle>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-sm text-muted-foreground mb-4">
                    Partner with us and reach our growing virtual community
                  </p>
                  <Link to="/sponsorship">
                    <Button className="w-full bg-virtual-500 hover:bg-virtual-600">
                      View Sponsorship Options
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <SuggestedUsers />
              <WorldsWidget />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Index;
