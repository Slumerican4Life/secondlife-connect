
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import UAPWatchMap from "@/components/UAPWatchMap";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Eye, FileText, Users, Book, Globe, AlertTriangle, Calendar, Filter } from "lucide-react";

const UAPWatch: React.FC = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('map');

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
                  <Globe className="h-7 w-7 text-blue-500" /> 
                  UAP Watch Network
                </h1>
                <p className="text-muted-foreground mt-1">
                  Global tracking and analysis of Unidentified Aerial Phenomena
                </p>
              </div>
              <Button className="gap-2">
                <Eye className="h-4 w-4" />
                Report Sighting
              </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="map" className="flex-1 gap-2">
                  <Globe className="h-4 w-4" />
                  Interactive Map
                </TabsTrigger>
                <TabsTrigger value="research" className="flex-1 gap-2">
                  <FileText className="h-4 w-4" />
                  Research
                </TabsTrigger>
                <TabsTrigger value="community" className="flex-1 gap-2">
                  <Users className="h-4 w-4" />
                  Community
                </TabsTrigger>
                <TabsTrigger value="resources" className="flex-1 gap-2">
                  <Book className="h-4 w-4" />
                  Resources
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="map" className="space-y-6">
                <UAPWatchMap />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-blue-500" />
                        Recent Activity
                      </CardTitle>
                      <CardDescription>Latest reported sightings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="pb-2 border-b last:border-0 last:pb-0">
                            <p className="text-sm font-medium">Phoenix, AZ</p>
                            <p className="text-xs text-muted-foreground">April 17, 2025 • 3 witnesses</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                        Activity Alerts
                      </CardTitle>
                      <CardDescription>Unusual patterns detected</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex gap-2 items-center">
                          <Badge className="bg-amber-500">Cluster</Badge>
                          <p className="text-sm">Multiple sightings in Southwest region</p>
                        </div>
                        <div className="flex gap-2 items-center">
                          <Badge className="bg-blue-500">Radar</Badge>
                          <p className="text-sm">Unusual radar signatures detected in Pacific Northwest</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Filter className="h-5 w-5 text-virtual-400" />
                        Data Analysis
                      </CardTitle>
                      <CardDescription>Patterns and correlations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <p className="font-medium">Top sighting types:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Triangular craft (32%)</li>
                          <li>Orbs of light (28%)</li>
                          <li>Disk-shaped objects (17%)</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="research">
                <Card>
                  <CardHeader>
                    <CardTitle>UAP Research Center</CardTitle>
                    <CardDescription>Scientific studies and analysis of UAP phenomena</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Research content will be displayed here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="community">
                <Card>
                  <CardHeader>
                    <CardTitle>UAP Community</CardTitle>
                    <CardDescription>Connect with other researchers and witnesses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Community content will be displayed here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="resources">
                <Card>
                  <CardHeader>
                    <CardTitle>UAP Resources</CardTitle>
                    <CardDescription>Educational materials and reference guides</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Resources content will be displayed here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        {/* Right sidebar - Hidden on mobile */}
        {!isMobile && (
          <div className="w-80 hidden lg:block">
            <div className="p-4 sticky top-[73px]">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">How to Report</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-4">
                  <p>Report any unusual aerial phenomena with as much detail as possible:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                      <span>Note exact time, date, and location</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                      <span>Describe shape, size, movement patterns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                      <span>Upload photos or videos if available</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mt-0.5">4</span>
                      <span>Include witness contact information</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-sm">UAP Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Transmedium</span>
                      <Badge variant="outline">62 reports</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Hypersonic</span>
                      <Badge variant="outline">124 reports</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Ballistic</span>
                      <Badge variant="outline">47 reports</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Stationary</span>
                      <Badge variant="outline">93 reports</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Other</span>
                      <Badge variant="outline">218 reports</Badge>
                    </div>
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

export default UAPWatch;
