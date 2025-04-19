
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Info, MapPin, Eye, Calendar, ExternalLink } from 'lucide-react';
import { AgentManager } from '@/lib/agents/AgentManager';

interface UAPSighting {
  id: string;
  date: string;
  location: string;
  description: string;
  coordinates: [number, number];
  source: 'user' | 'mufon' | 'official';
  verified: boolean;
  witnesses: number;
}

const MOCK_SIGHTINGS: UAPSighting[] = [
  {
    id: '1',
    date: '2025-04-15T21:30:00',
    location: 'Phoenix, Arizona',
    description: 'Triangle formation of lights hovering silently for 5 minutes before rapidly ascending.',
    coordinates: [33.4484, -112.0740],
    source: 'user',
    verified: false,
    witnesses: 3
  },
  {
    id: '2',
    date: '2025-04-10T19:15:00',
    location: 'Sedona, Arizona',
    description: 'Disk-shaped object with pulsating lights observed over red rock formations.',
    coordinates: [34.8697, -111.7610],
    source: 'mufon',
    verified: true,
    witnesses: 7
  },
  {
    id: '3',
    date: '2025-04-05T22:45:00',
    location: 'Lake Tahoe, Nevada',
    description: 'Bright orbs moving in formation, changing direction instantaneously.',
    coordinates: [39.0968, -120.0324],
    source: 'mufon',
    verified: true,
    witnesses: 12
  },
  {
    id: '4',
    date: '2025-04-17T03:20:00',
    location: 'Roswell, New Mexico',
    description: 'Cigar-shaped craft observed with unusual atmospheric disturbances.',
    coordinates: [33.3943, -104.5230],
    source: 'official',
    verified: true,
    witnesses: 2
  }
];

const UAPWatchMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedSighting, setSelectedSighting] = useState<UAPSighting | null>(null);
  const [filter, setFilter] = useState<'all' | 'verified' | 'recent'>('all');
  const [sightings, setSightings] = useState<UAPSighting[]>(MOCK_SIGHTINGS);
  
  const filteredSightings = sightings.filter(sighting => {
    if (filter === 'verified') return sighting.verified;
    if (filter === 'recent') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return new Date(sighting.date) >= oneWeekAgo;
    }
    return true;
  });
  
  // This would be replaced with actual map initialization code
  useEffect(() => {
    if (!mapRef.current) return;
    
    console.log('Map would be initialized here with MapBox or Google Maps API');
    console.log('UAP sightings would be plotted with markers');
    
    // In a real implementation, we would initialize the map here
    // and add markers for each sighting
    
    const fetchSightings = async () => {
      // In a real implementation, this would fetch from an API
      console.log('Fetching UAP sightings from API');
      
      // For now, we'll just use our mock data
      setTimeout(() => {
        console.log('Fetched UAP sightings');
      }, 1000);
    };
    
    fetchSightings();
    
    // When connected to Supabase, this would fetch real data
    // const fetchSightingsFromDB = async () => {
    //   try {
    //     const { data, error } = await supabase
    //       .from('uap_sightings')
    //       .select('*');
    //       
    //     if (error) throw error;
    //     setSightings(data);
    //   } catch (error) {
    //     console.error('Error fetching sightings:', error);
    //   }
    // };
    // 
    // fetchSightingsFromDB();
    
  }, []);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getSourceBadge = (source: 'user' | 'mufon' | 'official') => {
    switch (source) {
      case 'user':
        return <Badge variant="outline">User Report</Badge>;
      case 'mufon':
        return <Badge variant="secondary">MUFON Verified</Badge>;
      case 'official':
        return <Badge variant="default" className="bg-blue-500">Official Record</Badge>;
    }
  };
  
  // Function that would handle reporting a new sighting
  const handleReportSighting = () => {
    const agentManager = AgentManager.getInstance();
    const intelligenceAgent = agentManager.getIntelligenceAgent();
    
    intelligenceAgent.processQuery("I want to report a UAP sighting").then(response => {
      console.log("AI response:", response);
      // This would typically open a form or modal for reporting
    });
  };

  return (
    <Card className="w-full shadow-lg border-t-4 border-t-blue-500">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-500" />
              UAP Watch Network
            </CardTitle>
            <CardDescription>
              Real-time tracking and reporting of Unidentified Aerial Phenomena worldwide
            </CardDescription>
          </div>
          <Button onClick={handleReportSighting} size="sm">
            Report Sighting
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="map" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="map" className="flex-1">Map View</TabsTrigger>
            <TabsTrigger value="list" className="flex-1">List View</TabsTrigger>
            <TabsTrigger value="mufon" className="flex-1">MUFON Data</TabsTrigger>
          </TabsList>
          
          <TabsContent value="map">
            <div className="flex space-x-4">
              <div 
                ref={mapRef} 
                className="h-[400px] flex-1 bg-slate-100 dark:bg-slate-800 rounded-lg border flex items-center justify-center text-muted-foreground"
              >
                Map will be displayed here when connected to a map provider
              </div>
              
              <div className="w-1/3 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Filter Sightings</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      size="sm"
                      variant={filter === 'all' ? 'default' : 'outline'}
                      onClick={() => setFilter('all')}
                    >
                      All
                    </Button>
                    <Button 
                      size="sm"
                      variant={filter === 'verified' ? 'default' : 'outline'}
                      onClick={() => setFilter('verified')}
                    >
                      Verified Only
                    </Button>
                    <Button 
                      size="sm"
                      variant={filter === 'recent' ? 'default' : 'outline'}
                      onClick={() => setFilter('recent')}
                    >
                      Last 7 Days
                    </Button>
                  </div>
                </div>
                
                {selectedSighting ? (
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">Sighting Details</h3>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedSighting(null)}
                      >
                        Close
                      </Button>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date & Time:</span>
                        <span className="font-medium flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(selectedSighting.date)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-medium flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {selectedSighting.location}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Source:</span>
                        <span>{getSourceBadge(selectedSighting.source)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Witnesses:</span>
                        <span className="font-medium">{selectedSighting.witnesses}</span>
                      </div>
                    </div>
                    <p className="text-sm border-t pt-2">{selectedSighting.description}</p>
                  </div>
                ) : (
                  <div className="border rounded-lg p-4 flex items-center justify-center h-[200px] text-sm text-muted-foreground">
                    <div className="text-center">
                      <Info className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Select a marker on the map to view details</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="list">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Recent Sightings</h3>
                <span className="text-xs text-muted-foreground">
                  {filteredSightings.length} sightings found
                </span>
              </div>
              
              <div className="space-y-3">
                {filteredSightings.map(sighting => (
                  <div 
                    key={sighting.id}
                    className="border rounded-lg p-3 hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedSighting(sighting)}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{sighting.location}</span>
                      <span className="text-xs text-muted-foreground">{formatDate(sighting.date)}</span>
                    </div>
                    <p className="text-sm line-clamp-2 mt-1">{sighting.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      {getSourceBadge(sighting.source)}
                      <span className="text-xs flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {sighting.witnesses} witnesses
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="mufon">
            <div className="space-y-6">
              <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-medium text-sm">MUFON Integration</h3>
                  <p className="text-xs text-muted-foreground">
                    Data from the Mutual UFO Network (MUFON) is integrated with permission.
                    This includes verified reports that have undergone investigation.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredSightings
                  .filter(s => s.source === 'mufon')
                  .map(sighting => (
                    <div 
                      key={sighting.id}
                      className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedSighting(sighting)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{sighting.location}</h4>
                          <p className="text-xs text-muted-foreground">{formatDate(sighting.date)}</p>
                        </div>
                        <Badge variant="secondary">MUFON Case #{sighting.id}</Badge>
                      </div>
                      <p className="text-sm mt-2">{sighting.description}</p>
                    </div>
                  ))}
              </div>
              
              <div className="flex justify-center">
                <Button variant="outline" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Visit MUFON Official Site
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-3 w-3" />
          <span>All reports are user-submitted unless marked as verified</span>
        </div>
        <Button variant="link" size="sm" className="text-xs h-auto p-0">
          Content Guidelines
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UAPWatchMap;
