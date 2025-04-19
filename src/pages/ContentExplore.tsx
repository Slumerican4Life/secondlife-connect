
import React from 'react';
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ContentExplorer from "@/components/ContentExplorer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Compass } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="all">All Topics</TabsTrigger>
                <TabsTrigger value="paranormal">Paranormal & Spiritual</TabsTrigger>
                <TabsTrigger value="science">Science & Tech</TabsTrigger>
                <TabsTrigger value="current">News & Current Events</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <ContentExplorer />
              </TabsContent>
              
              <TabsContent value="paranormal">
                <Card className="bg-muted/40 border-violet-500/20 mb-6">
                  <CardHeader>
                    <CardTitle>Paranormal & Spiritual Content</CardTitle>
                    <CardDescription>
                      Explore supernatural phenomena, spiritual practices, and unexplained mysteries
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ContentExplorer 
                      filter={(section) => {
                        const topics = ['paranormal', 'spiritual', 'astrology', 'ancient-news', 'conspiracy', 'uap-watch'];
                        return topics.includes(section.id);
                      }} 
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="science">
                <Card className="bg-muted/40 border-cyan-500/20 mb-6">
                  <CardHeader>
                    <CardTitle>Science & Technology</CardTitle>
                    <CardDescription>
                      Discover the latest in AI, quantum physics, astronomy, and medical research
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ContentExplorer 
                      filter={(section) => {
                        const topics = ['ai-tech', 'quantum-physics', 'astronomy', 'advanced-tech', 'space', 'science', 'health'];
                        return topics.includes(section.id);
                      }} 
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="current">
                <Card className="bg-muted/40 border-blue-500/20 mb-6">
                  <CardHeader>
                    <CardTitle>News & Current Events</CardTitle>
                    <CardDescription>
                      Stay informed with the latest news, politics, and accountability reports
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ContentExplorer 
                      filter={(section) => {
                        const topics = ['news', 'politics', 'police-watch', 'events'];
                        return topics.includes(section.id);
                      }} 
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
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
