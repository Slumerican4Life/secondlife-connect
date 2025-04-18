
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
  Droplets,
  Crown,
  ShoppingBag,
  Building,
  Users,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
}

const NavItem = ({ icon: Icon, label, href, active }: NavItemProps) => (
  <Link 
    to={href} 
    className={cn(
      buttonVariants({ variant: active ? "default" : "ghost" }),
      "w-full justify-start gap-3 rounded-full",
      active && "bg-virtual-300 text-white hover:bg-virtual-400 hover:text-white"
    )}
  >
    <Icon size={20} />
    <span className="hidden lg:inline-block">{label}</span>
  </Link>
);

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="h-full py-4 hidden sm:flex flex-col border-r">
      <div className="px-3 py-2">
        <Link to="/" className="flex items-center gap-2 px-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-virtual-300 to-virtual-400 flex items-center justify-center">
            <span className="text-white font-semibold">S</span>
          </div>
          <h1 className="text-xl font-bold gradient-text hidden lg:inline-block">Secondlife Connect</h1>
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
          icon={Droplets} 
          label="Blood Sanctuary" 
          href="/blood-sanctuary" 
          active={currentPath === "/blood-sanctuary"}
        />
        <NavItem 
          icon={Users} 
          label="Blood Dolls" 
          href="/blood-dolls" 
          active={currentPath === "/blood-dolls"}
        />
        <NavItem 
          icon={Crown} 
          label="Clan Hierarchy" 
          href="/clan-hierarchy" 
          active={currentPath === "/clan-hierarchy"}
        />
        <NavItem 
          icon={Building} 
          label="Virtual Lands" 
          href="/virtual-lands" 
          active={currentPath === "/virtual-lands"}
        />
        <NavItem 
          icon={ShoppingBag} 
          label="Marketplace" 
          href="/marketplace" 
          active={currentPath === "/marketplace"}
        />
        <NavItem 
          icon={Calendar} 
          label="Events" 
          href="/events" 
          active={currentPath === "/events"}
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
          icon={Settings} 
          label="Settings" 
          href="/settings" 
          active={currentPath === "/settings"}
        />
      </div>
    </div>
  );
};

export default Sidebar;
