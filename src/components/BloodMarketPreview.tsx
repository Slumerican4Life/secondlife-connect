
import { Droplet, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const BloodMarketPreview = () => {
  const dolls = [
    {
      name: "Lillith",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      type: "O Negative"
    },
    {
      name: "Viktor",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      type: "AB Positive"
    },
    {
      name: "Elena",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80",
      type: "A Negative"
    }
  ];

  return (
    <div className="mb-6 px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Droplet className="h-5 w-5 text-red-600" />
          Blood Bank Donors Available
        </h2>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/blood-bank" className="flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {dolls.map((doll) => (
          <Link to="/blood-bank" key={doll.name}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                <img src={doll.image} alt={doll.name} className="w-full h-40 object-cover" />
                <div className="absolute bottom-0 left-0 p-3 text-white">
                  <h3 className="font-medium">{doll.name}</h3>
                  <p className="text-sm flex items-center gap-1 text-white/80">
                    <Droplet className="h-3 w-3 fill-red-600 text-white" />
                    {doll.type}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BloodMarketPreview;
