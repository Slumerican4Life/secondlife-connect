
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles } from "lucide-react";

const ShowcaseHero = () => {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-xl mb-8">
      {/* Background gradient overlay with more vibrant colors */}
      <div className="absolute inset-0 bg-gradient-to-b from-virtual-900/95 via-virtual-800/90 to-virtual-700/85 z-10" />
      
      {/* Hero background pattern */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#D946EF_0%,_transparent_35%),radial-gradient(circle_at_bottom_left,_#1EAEDB_0%,_transparent_35%)] opacity-20 z-0"
      />

      {/* Avatar images positioned across the hero */}
      <div className="absolute inset-0 z-20">
        {/* First avatar group */}
        <div className="absolute left-[15%] bottom-[20%] transform -translate-x-1/2">
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 bg-pink-500/20 rounded-full animate-pulse" />
            <img
              src="/placeholder.svg"
              alt="Virtual Avatar 1"
              className="w-48 h-48 rounded-full border-4 border-pink-500/50 object-cover"
            />
          </div>
        </div>

        {/* Lyra visualization in the center */}
        <div className="absolute left-1/2 bottom-[30%] transform -translate-x-1/2">
          <div className="relative w-64 h-64">
            <div className="absolute inset-0 bg-purple-500/20 rounded-full animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Brain className="w-32 h-32 text-purple-400 animate-float" />
            </div>
            <div className="absolute -inset-4 border-2 border-purple-500/30 rounded-full animate-spin-slow" />
            <div className="absolute -inset-8 border-2 border-purple-400/20 rounded-full animate-reverse-spin" />
          </div>
        </div>

        {/* Second avatar group */}
        <div className="absolute right-[15%] bottom-[25%] transform translate-x-1/2">
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse" />
            <img
              src="/placeholder.svg"
              alt="Virtual Avatar 2"
              className="w-48 h-48 rounded-full border-4 border-blue-500/50 object-cover"
            />
          </div>
        </div>
      </div>

      {/* Content overlay with enhanced colors */}
      <div className="relative z-30 h-full flex flex-col items-center justify-center text-white px-4">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" className="bg-virtual-900/50 border-purple-400 px-4 py-1">
            <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
            Future of Virtual Life
          </Badge>
        </div>
        <h1 className="text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
          SecondLife Connect + Lyra AI
        </h1>
        <p className="text-xl text-purple-100 text-center max-w-2xl">
          Experience the seamless fusion of virtual worlds and advanced artificial intelligence,
          creating a new dimension of digital existence
        </p>
      </div>
    </div>
  );
};

export default ShowcaseHero;
