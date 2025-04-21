
import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";
import SuggestedUsers from "@/components/SuggestedUsers";
import WorldsWidget from "@/components/WorldsWidget";
import LyraInterface from "@/components/LyraInterface";
import LyraThoughtViewer from "@/components/LyraThoughtViewer";
import { logShort } from "@/lib/utils/shorthandLogger";

const Index = () => {
  // Log page load with shorthand
  logShort("USR viewing main page", "info");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        <main className="flex-1 px-4 md:px-6 py-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Feed />
              <LyraThoughtViewer />
            </div>
            <div className="space-y-6">
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
