
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Droplet } from 'lucide-react';
import { BloodDollStatus } from '@/types/blood-bank';

export interface BloodDollCardProps {
  name: string;
  image: string;
  bloodType: string;
  rarity: string;
  status: BloodDollStatus;
  price: number;
  age: number;
  lastFed: string;
}

const BloodDollCard: React.FC<BloodDollCardProps> = ({
  name,
  image,
  bloodType,
  rarity,
  status,
  price,
  age,
  lastFed
}) => {
  const getStatusColor = (status: BloodDollStatus) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'resting':
        return 'bg-amber-500';
      case 'meeting':
        return 'bg-blue-500';
      case 'hunting':
        return 'bg-red-500';
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2 flex gap-2">
          <Badge variant="secondary" className="bg-black/70 text-white border-none">
            {rarity}
          </Badge>
          <div className={`w-3 h-3 rounded-full ${getStatusColor(status)} mt-1`} />
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>{name}</span>
          <Badge variant="outline" className="ml-2">
            <Droplet className="h-3 w-3 mr-1" />
            {bloodType}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Age</span>
            <span>{age} years</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Last Fed</span>
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {lastFed}
            </span>
          </div>
          <div className="flex flex-col col-span-2">
            <span className="text-muted-foreground">Status</span>
            <span className="capitalize">{status}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <span className="font-medium text-lg">L$ {price}</span>
        </div>
        <Button size="sm">Book Now</Button>
      </CardFooter>
    </Card>
  );
};

export default BloodDollCard;
