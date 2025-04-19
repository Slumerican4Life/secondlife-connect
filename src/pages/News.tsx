import React from 'react';
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { Newspaper, ArrowRight, Globe, Bot, Activity, GraduationCap, Scale, AlertTriangle } from "lucide-react";

const News: React.FC = () => {
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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-2">
                  <Newspaper className="h-7 w-7 text-blue-600" /> 
                  News Center
                </h1>
                <p className="text-muted-foreground mt-1">
                  Latest updates across all topics
                </p>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full mb-6 grid grid-cols-6 md:flex h-auto">
                <TabsTrigger value="all" className="py-2 md:flex-1">All</TabsTrigger>
                <TabsTrigger value="uap" className="py-2 md:flex-1">UAP Watch</TabsTrigger>
                <TabsTrigger value="tech" className="py-2 md:flex-1">Technology</TabsTrigger>
                <TabsTrigger value="health" className="py-2 md:flex-1">Health</TabsTrigger>
                <TabsTrigger value="politics" className="py-2 md:flex-1">Politics</TabsTrigger>
                <TabsTrigger value="science" className="py-2 md:flex-1">Science</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-6">
                {/* Featured story */}
                <Card className="overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-2/5 h-48 md:h-auto bg-muted">
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-muted-foreground">
                        Featured Image
                      </div>
                    </div>
                    <div className="md:w-3/5 p-6">
                      <Badge className="mb-2">Breaking News</Badge>
                      <h2 className="text-2xl font-bold mb-2">Multiple UAP Sightings Reported Across Southwest</h2>
                      <p className="text-muted-foreground mb-4">
                        Federal aviation authorities are investigating reports of unusual aerial phenomena observed by multiple commercial pilots.
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">April 19, 2025 • UAP Watch</span>
                        <Button variant="outline" size="sm" className="gap-1">
                          Read More <ArrowRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
                
                {/* News grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex gap-2 items-center mb-2">
                        <Badge className="bg-purple-500">AI & Quantum</Badge>
                        <span className="text-xs text-muted-foreground">2 hours ago</span>
                      </div>
                      <CardTitle className="text-lg">New AI Research Breakthrough Announced</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        Quantum computing researchers achieve significant milestone in AI processing capabilities, potentially revolutionizing complex calculations.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="link" className="p-0 h-auto flex items-center gap-1">
                        <span className="text-xs">Read Full Article</span>
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex gap-2 items-center mb-2">
                        <Badge className="bg-blue-500">UAP Watch</Badge>
                        <span className="text-xs text-muted-foreground">5 hours ago</span>
                      </div>
                      <CardTitle className="text-lg">Pentagon Releases New UAP Documentation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        The Department of Defense has released previously classified documents related to unexplained aerial phenomena observed by military personnel.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="link" className="p-0 h-auto flex items-center gap-1">
                        <span className="text-xs">Read Full Article</span>
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex gap-2 items-center mb-2">
                        <Badge className="bg-green-500">Health Research</Badge>
                        <span className="text-xs text-muted-foreground">Yesterday</span>
                      </div>
                      <CardTitle className="text-lg">Breakthrough in Cancer Treatment Research</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        Scientists report promising results from clinical trials of a new immunotherapy approach targeting previously resistant forms of cancer.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="link" className="p-0 h-auto flex items-center gap-1">
                        <span className="text-xs">Read Full Article</span>
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl flex items-center gap-2">
                          <Globe className="h-5 w-5 text-blue-500" />
                          UAP & Space
                        </CardTitle>
                        <Button variant="outline" size="sm">View All</Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="pb-3 border-b last:border-0 last:pb-0">
                          <h4 className="font-medium text-sm">New UAP Task Force Established in Europe</h4>
                          <p className="text-xs text-muted-foreground">April 18, 2025</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl flex items-center gap-2">
                          <Bot className="h-5 w-5 text-purple-500" />
                          Technology
                        </CardTitle>
                        <Button variant="outline" size="sm">View All</Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="pb-3 border-b last:border-0 last:pb-0">
                          <h4 className="font-medium text-sm">Quantum Computing Milestone Achieved</h4>
                          <p className="text-xs text-muted-foreground">April 17, 2025</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="uap">
                <Card>
                  <CardHeader className="flex flex-row items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-500" />
                    <div>
                      <CardTitle>UAP Watch News</CardTitle>
                      <CardDescription>Updates on UAP sightings and research</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>UAP specific news will be displayed here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Other tab contents would follow the same pattern */}
            </Tabs>
          </div>
        </main>

        {/* Right sidebar - Hidden on mobile */}
        {!isMobile && (
          <div className="w-80 hidden lg:block">
            <div className="p-4 sticky top-[73px] space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Top Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    <Globe className="h-4 w-4 text-blue-500" />
                    UAP Watch
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    <Bot className="h-4 w-4 text-purple-500" />
                    AI & Quantum
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    <Activity className="h-4 w-4 text-green-500" />
                    Health
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    <Scale className="h-4 w-4 text-red-500" />
                    Politics
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    <GraduationCap className="h-4 w-4 text-amber-500" />
                    Science
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Breaking News</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <p>Senate to vote on new technology regulation bill tomorrow</p>
                  </div>
                  <div className="flex gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <p>Major UAP event reported over Pacific Northwest</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
