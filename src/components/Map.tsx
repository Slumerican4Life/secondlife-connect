
import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Navigation, MapPin, Search, Compass, Zap } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Map = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  
  // Mock locations data
  const locations = [
    { id: 1, name: "Crimson Quarter", region: "Bloodhaven", coordinates: "128, 128, 20", population: 42, type: "vampire" },
    { id: 2, name: "Mystic Falls", region: "Shadowmoor", coordinates: "64, 192, 35", population: 28, type: "mixed" },
    { id: 3, name: "Dark Moon Estate", region: "Midnight Hollow", coordinates: "192, 64, 15", population: 15, type: "vampire" },
    { id: 4, name: "Azure Bay", region: "Coastal Isles", coordinates: "220, 180, 10", population: 34, type: "mixed" },
    { id: 5, name: "Emerald Forest", region: "Wildlands", coordinates: "90, 240, 25", population: 22, type: "neutral" }
  ];
  
  type Location = typeof locations[0];

  // Map initialization effect
  useEffect(() => {
    if (mapContainerRef.current) {
      // This would be where we'd initialize a real map library
      // For now we just show our mock map UI
      console.log("Map initialized");
    }
  }, []);

  // Handle search
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    const found = locations.find(
      loc => loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
             loc.region.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (found) {
      setSelectedLocation(found);
      toast({
        title: "Location Found",
        description: `${found.name} located in ${found.region}`,
      });
    } else {
      toast({
        title: "Location Not Found",
        description: "No matching locations were found",
        variant: "destructive"
      });
    }
  };

  // Handle teleport
  const handleTeleport = () => {
    if (!selectedLocation) return;
    
    toast({
      title: "Teleport Initiated",
      description: `Teleporting to ${selectedLocation.name} at ${selectedLocation.coordinates}`,
    });
    
    // In a real app, this would trigger the actual teleport in SecondLife
    console.log(`Teleporting to: ${selectedLocation.coordinates}`);
  };

  // Filter locations based on search
  const filteredLocations = searchQuery.trim() 
    ? locations.filter(loc => 
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        loc.region.toLowerCase().includes(searchQuery.toLowerCase()))
    : locations;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            Virtual World Map & Teleport
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search locations..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch}>Search</Button>
          </div>
          
          {/* Map Visualization */}
          <div 
            ref={mapContainerRef} 
            className="w-full h-64 bg-muted/30 rounded-md border relative overflow-hidden mb-4"
          >
            {/* This would be replaced with an actual map component in production */}
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-0.5">
              {Array(16).fill(0).map((_, i) => (
                <div key={i} className="bg-muted/20 border border-border/10"></div>
              ))}
            </div>
            
            {/* Map Location Pins */}
            {locations.map((loc) => (
              <div 
                key={loc.id}
                className={`absolute w-3 h-3 rounded-full cursor-pointer transition-all hover:scale-150
                  ${loc.type === 'vampire' ? 'bg-red-500' : 
                    loc.type === 'mixed' ? 'bg-purple-500' : 'bg-green-500'}
                  ${selectedLocation?.id === loc.id ? 'ring-2 ring-white' : ''}
                `}
                style={{
                  left: `${parseInt(loc.coordinates.split(',')[0]) / 256 * 100}%`,
                  top: `${parseInt(loc.coordinates.split(',')[1]) / 256 * 100}%`,
                }}
                onClick={() => setSelectedLocation(loc)}
                title={loc.name}
              ></div>
            ))}
            
            {/* Map Controls */}
            <div className="absolute bottom-2 right-2 flex flex-col gap-1">
              <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-background/80">
                <Compass className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-background/80">+</Button>
              <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-background/80">-</Button>
            </div>
          </div>
          
          {/* Location List */}
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((loc) => (
                <div 
                  key={loc.id} 
                  className={`p-2 border rounded-md cursor-pointer hover:bg-accent/50 transition-colors flex justify-between items-center
                    ${selectedLocation?.id === loc.id ? 'bg-accent' : ''}
                  `}
                  onClick={() => setSelectedLocation(loc)}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="font-medium">{loc.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{loc.region}</div>
                  </div>
                  <Badge variant="outline">{loc.population} online</Badge>
                </div>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-4">No locations found</div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm">View Full Map</Button>
          <Button 
            onClick={handleTeleport} 
            disabled={!selectedLocation}
            className="flex items-center gap-2"
          >
            <Zap className="h-4 w-4" />
            Teleport Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Map;
