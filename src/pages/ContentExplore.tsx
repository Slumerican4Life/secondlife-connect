
import React from 'react';
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ContentExplorer from "@/components/ContentExplorer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Compass } from "lucide-react";

const ContentExplore: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        {/* Sidebar - Hidden on mobile */}
        <div className="w-16 lg:w-64 hidden sm:block">
          <div className="sticky top-[73px] h-[calc(100vh-73px)]">
            <Sidebar />
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 border-x border-border/80">
          <div className="py-6 space-y-8 px-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Compass className="h-7 w-7 text-virtual-400" /> 
                Explore Content
              </h1>
              <p className="text-muted-foreground mt-1">
                Discover all the specialized content sections available
              </p>
            </div>

            <ContentExplorer />
          </div>
        </main>

        {/* Right sidebar - Hidden on mobile */}
        {!isMobile && (
          <div className="w-80 hidden lg:block">
            {/* Right sidebar content would go here */}
            <div className="p-4"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentExplore;
