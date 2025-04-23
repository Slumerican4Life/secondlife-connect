
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { 
  HomeIcon, UsersIcon, GlobeIcon, HeartIcon, ShoppingBagIcon, 
  BuildingIcon, ShieldIcon, UsersRoundIcon, DropletIcon, 
  BrainCircuitIcon, DollarSignIcon, Settings2Icon, TrendingUpIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { currentUser } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const navigation = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Profiles", href: "/profile", icon: UsersIcon },
    { name: "Virtual Worlds", href: "/worlds", icon: GlobeIcon },
    { name: "Dating", href: "/dating", icon: HeartIcon },
    { name: "Blood Bank", href: "/blood-bank", icon: DropletIcon },
    { name: "Marketplace", href: "/marketplace", icon: ShoppingBagIcon },
    { name: "Real Estate", href: "/real-estate", icon: BuildingIcon },
    { name: "Royal Portal", href: "/royal-portal", icon: ShieldIcon },
    { name: "Clans", href: "/clan-portal", icon: UsersRoundIcon },
  ];

  const premiumLinks = [
    { name: "AI Showcase", href: "/showcase", icon: BrainCircuitIcon },
    { name: "Sponsorship", href: "/sponsorship", icon: DollarSignIcon },
    { name: "Revenue Optimizer", href: "/revenue-optimizer", icon: Settings2Icon },
    { name: "Monetization", href: "/monetization", icon: TrendingUpIcon, new: true }
  ];
  
  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:pt-16 lg:pb-4 lg:bg-background/95 backdrop-blur-sm">
      <div className="flex flex-col flex-grow gap-y-5 overflow-y-auto px-3">
        <div className="p-4">
          <Link to="/profile" className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-virtual-300">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-bold">{currentUser.name}</div>
              <div className="text-sm text-muted-foreground">@{currentUser.username}</div>
            </div>
          </Link>
        </div>
        
        <nav className="flex-1 space-y-2">
          {navigation.map((item) => (
            <Link key={item.name} to={item.href}>
              <Button
                variant={location.pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  location.pathname === item.href && "bg-virtual-100"
                )}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Button>
            </Link>
          ))}
          
          <Separator className="my-3" />
          
          <div className="py-2">
            <h3 className="px-3 text-sm font-medium text-muted-foreground">
              Premium Features
            </h3>
          </div>
          
          {premiumLinks.map((item) => (
            <Link key={item.name} to={item.href}>
              <Button
                variant={location.pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  location.pathname === item.href && "bg-virtual-100"
                )}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
                {item.new && (
                  <Badge className="ml-2 bg-green-500 text-white text-xs">NEW</Badge>
                )}
              </Button>
            </Link>
          ))}
        </nav>
        
        <div className="p-4">
          <div className="rounded-lg bg-gradient-to-br from-green-800/20 to-green-900/30 border border-green-700/30 p-3">
            <h3 className="font-semibold text-green-400 flex items-center">
              <DollarSignIcon className="h-4 w-4 mr-1" />
              Monetization Hub
            </h3>
            <p className="text-xs text-green-300 mt-1">
              Use our quantum system to optimize your revenue streams
            </p>
            <Link to="/revenue-optimizer">
              <Button className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white text-xs h-8">
                Open Revenue Optimizer
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
