
import { Heart, Droplet, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BloodDollCardProps {
  name: string;
  type: string;
  location: string;
  image: string;
  status: "available" | "meeting" | "resting" | "hunting";
  level: string;
  isMaster?: boolean;
}

const BloodDollCard = ({ name, type, location, image, status, level, isMaster = false }: BloodDollCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "available": return "bg-green-500";
      case "meeting": return "bg-amber-500";
      case "resting": return "bg-blue-500";
      case "hunting": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <div className="absolute top-2 right-2 z-10">
          <Badge variant={isMaster ? "destructive" : "secondary"} className="capitalize">
            {isMaster ? "Master" : "Doll"}
          </Badge>
        </div>
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover object-center" 
          />
        </div>
      </div>
      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <Droplet className="h-3 w-3 mr-1 fill-red-600 text-white" />
              <span>{type}</span>
            </div>
          </div>
          <div className={`h-3 w-3 rounded-full ${getStatusColor()}`} />
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{location}</span>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          <span className="capitalize">{status}</span>
          <span className="mx-2">•</span>
          <span>{level}</span>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-0">
        <Button variant="ghost" size="sm">
          <Heart className="h-4 w-4 mr-1" />
          Favorite
        </Button>
        <Button size="sm" variant="default" className="bg-red-600 hover:bg-red-700 text-white">
          Contact
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BloodDollCard;
