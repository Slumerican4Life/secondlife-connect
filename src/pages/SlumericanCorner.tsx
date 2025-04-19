
import React from 'react';
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Music, Users, Newspaper } from "lucide-react";

const SlumericanCorner: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <div className="w-16 lg:w-64 hidden sm:block">
          <div className="sticky top-[73px] h-[calc(100vh-73px)]">
            <Sidebar />
          </div>
        </div>

        <main className="flex-1 border-x border-border/80">
          <div className="py-6 space-y-8 px-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Star className="h-7 w-7 text-red-500" />
                Slumerican Corner
              </h1>
              <p className="text-muted-foreground mt-1">
                Dedicated to Yelawolf and the Slumerican movement
              </p>
            </div>

            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="music">Music</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
                <TabsTrigger value="news">News</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Michael Wayne Atha (Yelawolf)</CardTitle>
                    <CardDescription>Artist, Entrepreneur, and Slumerican Founder</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      Born in Gadsden, Alabama, Yelawolf has become one of the most influential
                      figures in modern hip-hop, known for his unique style blending southern rap,
                      rock, and country influences.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Slumerican Movement</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">
                            More than music - it's a lifestyle and culture representing pride in
                            roots and authenticity.
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Legacy</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">
                            Inspiring generations through music, fashion, and entrepreneurship.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="music" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Discography Highlights</CardTitle>
                    <CardDescription>Essential albums and tracks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Album list would go here */}
                      <p className="text-muted-foreground">
                        Content coming soon...
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="community" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Slumerican Community</CardTitle>
                    <CardDescription>Connect with fellow fans</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Community content would go here */}
                      <p className="text-muted-foreground">
                        Community features coming soon...
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="news" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Latest Updates</CardTitle>
                    <CardDescription>News and announcements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* News content would go here */}
                      <p className="text-muted-foreground">
                        News feed coming soon...
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        {!isMobile && (
          <div className="w-80 hidden lg:block">
            <div className="p-4 sticky top-[73px]">
              {/* Right sidebar content */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlumericanCorner;
