import { Link } from "react-router-dom";
import { 
  Home, 
  Search, 
  Bell, 
  MessageSquare, 
  Bookmark, 
  User, 
  Settings,
  Globe, 
  Sparkles,
  Droplet,
  Store,
  Building,
  Heart,
  Shield,
  Crown,
  Navigation,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  highlight?: "red" | "purple" | "gold";
}

const NavItem = ({ icon: Icon, label, href, active, highlight }: NavItemProps) => (
  <Link 
    to={href} 
    className={cn(
      buttonVariants({ variant: active ? "default" : "ghost" }),
      "w-full justify-start gap-3 rounded-full",
      active && "bg-virtual-300 text-white hover:bg-virtual-400 hover:text-white",
      highlight === "red" && active && "bg-red-600 hover:bg-red-700",
      highlight === "gold" && active && "bg-amber-600 hover:bg-amber-700",
      highlight === "red" && !active && "text-red-600",
      highlight === "gold" && !active && "text-amber-600"
    )}
  >
    <Icon size={20} />
    <span className="hidden lg:inline-block">{label}</span>
  </Link>
);

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="sm:hidden fixed top-4 left-4 z-50">
          <button className={cn(
            buttonVariants({ variant: "outline" }), 
            "p-2 rounded-full"
          )}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 overflow-y-auto">
          <div className="flex flex-col h-full space-y-2">
            <NavItem 
              icon={Home} 
              label="Home" 
              href="/" 
              active={currentPath === "/"}
            />
            <NavItem 
              icon={Search} 
              label="Explore" 
              href="/explore" 
              active={currentPath === "/explore"}
            />
            <NavItem 
              icon={Globe} 
              label="Virtual Worlds" 
              href="/worlds" 
              active={currentPath === "/worlds"}
            />
            <NavItem 
              icon={Droplet} 
              label="Blood Bank" 
              href="/blood-bank" 
              active={currentPath === "/blood-bank"}
              highlight="red"
            />
            <NavItem 
              icon={Store} 
              label="Marketplace" 
              href="/marketplace" 
              active={currentPath === "/marketplace"}
            />
            <NavItem 
              icon={Building} 
              label="Real Estate" 
              href="/real-estate" 
              active={currentPath === "/real-estate"}
            />
            <NavItem 
              icon={Heart} 
              label="Dating" 
              href="/dating" 
              active={currentPath === "/dating"}
            />
            <NavItem 
              icon={Shield} 
              label="Clan Portal" 
              href="/clan-portal" 
              active={currentPath === "/clan-portal"}
            />
            <NavItem 
              icon={Navigation} 
              label="Map & Teleport" 
              href="/royal-portal?tab=teleport" 
              active={currentPath === "/royal-portal" && location.search.includes("teleport")}
              highlight="gold"
            />
            <NavItem 
              icon={Bell} 
              label="Notifications" 
              href="/notifications" 
              active={currentPath === "/notifications"}
            />
            <NavItem 
              icon={MessageSquare} 
              label="Messages" 
              href="/messages" 
              active={currentPath === "/messages"}
            />
            <NavItem 
              icon={Bookmark} 
              label="Bookmarks" 
              href="/bookmarks" 
              active={currentPath === "/bookmarks"}
            />
            <NavItem 
              icon={Sparkles} 
              label="Trending" 
              href="/trending" 
              active={currentPath === "/trending"}
            />
            <NavItem 
              icon={User} 
              label="Profile" 
              href="/profile" 
              active={currentPath === "/profile"}
            />
            <NavItem 
              icon={Crown} 
              label="Royal Portal" 
              href="/royal-portal" 
              active={currentPath === "/royal-portal" && !location.search.includes("teleport")}
              highlight="gold"
            />
            <NavItem 
              icon={Settings} 
              label="Settings" 
              href="/settings" 
              active={currentPath === "/settings"}
            />
          </div>
        </SheetContent>
      </Sheet>

      <div className="h-full py-4 hidden sm:flex flex-col border-r">
        <div className="px-3 py-2">
          <Link to="/" className="flex items-center gap-2 px-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-virtual-300 to-virtual-400 flex items-center justify-center">
              <span className="text-white font-semibold">S</span>
            </div>
            <h1 className="text-xl font-bold gradient-text hidden lg:inline-block">SecondLife Connect</h1>
          </Link>
        </div>
        
        <div className="flex-1 px-3 py-6 space-y-1">
          <NavItem 
            icon={Home} 
            label="Home" 
            href="/" 
            active={currentPath === "/"}
          />
          <NavItem 
            icon={Search} 
            label="Explore" 
            href="/explore" 
            active={currentPath === "/explore"}
          />
          <NavItem 
            icon={Globe} 
            label="Virtual Worlds" 
            href="/worlds" 
            active={currentPath === "/worlds"}
          />
          <NavItem 
            icon={Droplet} 
            label="Blood Bank" 
            href="/blood-bank" 
            active={currentPath === "/blood-bank"}
            highlight="red"
          />
          <NavItem 
            icon={Store} 
            label="Marketplace" 
            href="/marketplace" 
            active={currentPath === "/marketplace"}
          />
          <NavItem 
            icon={Building} 
            label="Real Estate" 
            href="/real-estate" 
            active={currentPath === "/real-estate"}
          />
          <NavItem 
            icon={Heart} 
            label="Dating" 
            href="/dating" 
            active={currentPath === "/dating"}
          />
          <NavItem 
            icon={Shield} 
            label="Clan Portal" 
            href="/clan-portal" 
            active={currentPath === "/clan-portal"}
          />
          <NavItem 
            icon={Navigation} 
            label="Map & Teleport" 
            href="/royal-portal?tab=teleport" 
            active={currentPath === "/royal-portal" && location.search.includes("teleport")}
            highlight="gold"
          />
          <NavItem 
            icon={Bell} 
            label="Notifications" 
            href="/notifications" 
            active={currentPath === "/notifications"}
          />
          <NavItem 
            icon={MessageSquare} 
            label="Messages" 
            href="/messages" 
            active={currentPath === "/messages"}
          />
          <NavItem 
            icon={Bookmark} 
            label="Bookmarks" 
            href="/bookmarks" 
            active={currentPath === "/bookmarks"}
          />
          <NavItem 
            icon={Sparkles} 
            label="Trending" 
            href="/trending" 
            active={currentPath === "/trending"}
          />
          <NavItem 
            icon={User} 
            label="Profile" 
            href="/profile" 
            active={currentPath === "/profile"}
          />
          <NavItem 
            icon={Crown} 
            label="Royal Portal" 
            href="/royal-portal" 
            active={currentPath === "/royal-portal" && !location.search.includes("teleport")}
            highlight="gold"
          />
          <NavItem 
            icon={Settings} 
            label="Settings" 
            href="/settings" 
            active={currentPath === "/settings"}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
