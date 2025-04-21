
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
import { Info } from "lucide-react";

const Index = () => {
  // Log page load with shorthand
  logShort("USR viewing main page", "info");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <LyraInitializer />
      <Navbar />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        <main className="flex-1 px-4 md:px-6 py-6 max-w-7xl mx-auto">
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
              <SuggestedUsers />
              <WorldsWidget />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
