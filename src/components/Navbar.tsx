import { Link } from "react-router-dom";
import { Bell, Home, MessageSquare, Moon, Search, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { currentUser } from "@/data/mockData";
import { useTheme } from "@/components/theme-provider";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-virtual-300 to-virtual-400 flex items-center justify-center">
            <span className="text-white font-semibold">W</span>
          </div>
          <h1 className="text-xl font-bold gradient-text">WorldWeave</h1>
        </Link>

        <div className="hidden md:block w-1/3">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8 bg-muted/50"
            />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <Link to="/">
              <Home className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <Link to="/profile">
              <Avatar className="h-8 w-8 border-2 border-virtual-300">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback className="bg-virtual-200">
                  {currentUser.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
