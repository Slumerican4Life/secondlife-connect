
import { Globe, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const WorldsWidget = () => {
  const popularWorlds = [
    {
      name: "Virtual Berlin",
      residents: 1234,
      image: "https://placehold.co/300x200/9b87f5/ffffff?text=Virtual+Berlin"
    },
    {
      name: "Fantasy Realm",
      residents: 856,
      image: "https://placehold.co/300x200/8B5CF6/ffffff?text=Fantasy+Realm"
    },
    {
      name: "Tokyo Nights",
      residents: 2102,
      image: "https://placehold.co/300x200/7E69AB/ffffff?text=Tokyo+Nights"
    }
  ];

  return (
    <div className="mb-6 px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Globe className="h-5 w-5 text-virtual-400" />
          Popular Worlds
        </h2>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {popularWorlds.map((world) => (
          <Card key={world.name} className="overflow-hidden hover:shadow-lg transition-shadow">
            <img src={world.image} alt={world.name} className="w-full h-32 object-cover" />
            <CardContent className="p-3">
              <h3 className="font-medium">{world.name}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Users className="h-4 w-4" />
                {world.residents.toLocaleString()} residents
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorldsWidget;
