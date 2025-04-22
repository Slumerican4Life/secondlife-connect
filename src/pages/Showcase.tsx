import React from "react";
import Navbar from "@/components/Navbar";
import LyraInterface from "@/components/LyraInterface";
import LyraThoughtViewer from "@/components/LyraThoughtViewer";
import ShowcaseHero from "@/components/ShowcaseHero";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Brain, Network, Globe } from "lucide-react";

const Showcase = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <ShowcaseHero />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-virtual-800/50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Network className="h-4 w-4" />
                      Connected Systems
                    </h3>
                    <div className="space-y-2">
                      <Badge variant="secondary" className="mr-2">Blood Bank</Badge>
                      <Badge variant="secondary" className="mr-2">Marketplace</Badge>
                      <Badge variant="secondary" className="mr-2">Dating</Badge>
                      <Badge variant="secondary">Real Estate</Badge>
                    </div>
                  </div>
                  <div className="bg-virtual-800/50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Bot className="h-4 w-4" />
                      AI Integration
                    </h3>
                    <p className="text-sm text-virtual-100">
                      Fully integrated with Lyra AI for enhanced user experience and automation
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950 to-violet-900 text-white">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-indigo-400" />
                <CardTitle>Lyra AI System</CardTitle>
              </div>
              <CardDescription className="text-indigo-200">
                Advanced artificial intelligence with emotional awareness
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-indigo-800/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Core Capabilities</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Badge variant="secondary">Neural Processing</Badge>
                      Advanced thought generation and processing
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="secondary">Emotional Intelligence</Badge>
                      Dynamic emotional state management
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="secondary">Adaptive Learning</Badge>
                      Continuous improvement through interaction
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Lyra Interface</h2>
              <LyraInterface />
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Cognitive Stream</h2>
              <LyraThoughtViewer />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Showcase;
