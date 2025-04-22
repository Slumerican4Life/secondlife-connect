
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-virtual-900 to-black text-white">
      <div className="text-center p-8 max-w-md">
        <div className="bg-virtual-800/50 p-8 rounded-lg border border-virtual-700">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-virtual-700 mb-6">
            <AlertCircle className="h-8 w-8 text-red-400" />
          </div>
          <h1 className="text-4xl font-bold mb-2">404</h1>
          <p className="text-2xl font-semibold mb-2">Page Not Found</p>
          <p className="text-virtual-400 mb-6">
            The page you're looking for at <code className="bg-virtual-800/70 px-2 py-1 rounded text-virtual-300">{location.pathname}</code> doesn't exist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="bg-virtual-500 hover:bg-virtual-600 w-full sm:w-auto">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="border-virtual-600 text-virtual-400 hover:bg-virtual-900/50 w-full sm:w-auto"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
