
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles } from "lucide-react";
import { HoverTitle } from "@/components/ui/hover-title";

const ShowcaseHero = () => {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-xl mb-8">
      {/* Background with enhanced contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-virtual-900/95 via-virtual-800/90 to-virtual-700/85 z-10" />
      
      {/* Enhanced contrast background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#D946EF_0%,_transparent_35%),radial-gradient(circle_at_bottom_left,_#1EAEDB_0%,_transparent_35%)] opacity-30 z-0" />

      {/* Lyra visualization in center */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <HoverTitle 
          title="Lyra AI Core"
          description="Advanced AI system powering SecondLife Connect"
        >
          <div className="relative w-64 h-64">
            <div className="absolute inset-0 bg-virtual-400/20 rounded-full animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Brain className="w-32 h-32 text-virtual-300 animate-float" />
            </div>
            <div className="absolute -inset-4 border-2 border-virtual-400/30 rounded-full animate-spin-slow" />
            <div className="absolute -inset-8 border-2 border-virtual-300/20 rounded-full animate-reverse-spin" />
          </div>
        </HoverTitle>
      </div>

      {/* Content overlay with enhanced contrast */}
      <div className="relative z-30 h-full flex flex-col items-center justify-center text-white px-4">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" className="bg-virtual-900/50 border-virtual-400 px-4 py-1">
            <Sparkles className="w-4 h-4 mr-2 text-virtual-300" />
            Powered by Lyra AI
          </Badge>
        </div>
        <h1 className="text-5xl font-bold text-center mb-4 gradient-text">
          SecondLife Connect
        </h1>
        <p className="text-xl text-virtual-300 text-center max-w-2xl">
          Experience the next evolution of virtual worlds with advanced AI integration
        </p>
      </div>
    </div>
  );
};

export default ShowcaseHero;
