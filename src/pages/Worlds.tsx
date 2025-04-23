
import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Worlds = () => {
  // Sample worlds data - in a real app, this would be fetched from an API
  const featuredWorlds = [
    {
      id: "virtual-berlin",
      name: "Virtual Berlin",
      residents: 1234,
      description: "A digital recreation of Berlin with advanced quantum physics simulation.",
      image: "https://placehold.co/600x400/9b87f5/ffffff?text=Virtual+Berlin"
    },
    {
      id: "fantasy-realm",
      name: "Fantasy Realm",
      residents: 856,
      description: "A medieval fantasy world with magic systems and neuromorphic AI NPCs.",
      image: "https://placehold.co/600x400/8B5CF6/ffffff?text=Fantasy+Realm"
    },
    {
      id: "tokyo-nights",
      name: "Tokyo Nights",
      residents: 2102,
      description: "Cyberpunk-inspired Tokyo with advanced lighting effects and neon aesthetics.",
      image: "https://placehold.co/600x400/7E69AB/ffffff?text=Tokyo+Nights"
    },
    {
      id: "quantum-void",
      name: "Quantum Void",
      residents: 421,
      description: "An abstract quantum environment where physical laws can be manipulated.",
      image: "https://placehold.co/600x400/6A5ACD/ffffff?text=Quantum+Void"
    },
    {
      id: "slumerican-city",
      name: "Slumerican City",
      residents: 897,
      description: "Urban environment inspired by Yelawolf and Slumerican aesthetics.",
      image: "https://placehold.co/600x400/5D478B/ffffff?text=Slumerican+City"
    },
    {
      id: "neo-atlantis",
      name: "Neo Atlantis",
      residents: 1568,
      description: "Underwater city with advanced water physics and marine exploration.",
      image: "https://placehold.co/600x400/4A708B/ffffff?text=Neo+Atlantis"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        
        <main className="flex-1 p-6 max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="mb-8 p-6 bg-gradient-to-r from-virtual-900 to-virtual-800 rounded-lg border border-virtual-700 text-white">
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <Globe className="h-8 w-8 mr-3 text-virtual-400" /> 
              Virtual Worlds
            </h1>
            <p className="text-virtual-300 max-w-3xl mb-4">
              Explore our quantum-powered virtual environments with neuromorphic networking for realistic physics and AI interactions. Each world features advanced simulation capabilities.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-virtual-500 hover:bg-virtual-600">
                Create World
              </Button>
              <Button variant="outline" className="border-virtual-500 text-virtual-400 hover:bg-virtual-800">
                Browse All Worlds
              </Button>
            </div>
          </div>
          
          {/* Featured Worlds Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Users className="h-6 w-6 mr-2 text-virtual-400" />
              Featured Worlds
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredWorlds.map((world) => (
                <Card key={world.id} className="overflow-hidden hover:shadow-lg transition-all border-virtual-200 hover:border-virtual-400">
                  <div className="relative">
                    <img src={world.image} alt={world.name} className="w-full h-48 object-cover" />
                    <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      {world.residents.toLocaleString()}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1">{world.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{world.description}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Globe className="h-4 w-4 mr-2" /> Visit World
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Call to Action - Sponsorship */}
          <div className="p-6 bg-gradient-to-r from-green-900/70 to-green-950/70 rounded-lg border border-green-700/30 mb-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold text-green-300 mb-1">Sponsor a Virtual World</h3>
                <p className="text-green-400 max-w-xl">
                  Feature your brand in one of our virtual worlds and reach thousands of active users daily
                </p>
              </div>
              <Link to="/sponsorship">
                <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
                  View Sponsorship Options
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Worlds;
