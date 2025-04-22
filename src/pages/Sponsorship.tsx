
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, ArrowRight, Building, DollarSign, Users } from "lucide-react";
import { AIAdvertisingAgent } from "@/lib/agents/AIAdvertisingAgent";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import LyraInitializer from "@/components/LyraInitializer";
import { toast } from "sonner";
import { logShort } from "@/lib/utils/shorthandLogger";

interface SponsorshipTier {
  name: string;
  price: string;
  features: string[];
  highlight?: boolean;
}

const tiers: SponsorshipTier[] = [
  {
    name: "Starter",
    price: "$500/month",
    features: [
      "Basic brand visibility",
      "Standard ad placement",
      "Monthly analytics",
      "Email support"
    ]
  },
  {
    name: "Growth",
    price: "$2,000/month",
    features: [
      "Enhanced brand visibility",
      "Premium ad placement",
      "Weekly analytics",
      "Priority support",
      "Custom branding options",
      "Event sponsorship"
    ],
    highlight: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Maximum brand visibility",
      "Premium ad placement",
      "Real-time analytics",
      "24/7 dedicated support",
      "Custom branding solutions",
      "Event sponsorship",
      "API access",
      "Custom integration options"
    ]
  }
];

export default function Sponsorship() {
  const [potentialSponsors, setPotentialSponsors] = useState<any[]>([]);
  const adAgent = new AIAdvertisingAgent();

  useEffect(() => {
    // Log page visit
    logShort("Sponsor page visited", "info");
    
    // Show welcome toast
    toast.success("Welcome to the Sponsorship Page!", {
      description: "Explore partnership opportunities with SecondLife Connect"
    });
    
    // Fetch potential sponsors on component mount
    const fetchSponsors = async () => {
      try {
        const response = await adAgent.processQuery("get_potential_sponsors");
        const data = JSON.parse(response);
        if (data.success) {
          setPotentialSponsors(data.data.potentialAdvertisers || []);
        } else {
          // Provide fallback data if API call fails
          setPotentialSponsors([
            { name: "Tech Innovations Inc", industry: "Technology", budget: 25000 },
            { name: "Virtual Realities Co", industry: "Virtual Reality", budget: 15000 },
            { name: "Digital Gaming Network", industry: "Gaming", budget: 30000 },
            { name: "Future Worlds LLC", industry: "Entertainment", budget: 20000 }
          ]);
        }
      } catch (error) {
        console.error("Error fetching sponsors:", error);
        // Set fallback data
        setPotentialSponsors([
          { name: "Tech Innovations Inc", industry: "Technology", budget: 25000 },
          { name: "Virtual Realities Co", industry: "Virtual Reality", budget: 15000 },
          { name: "Digital Gaming Network", industry: "Gaming", budget: 30000 },
          { name: "Future Worlds LLC", industry: "Entertainment", budget: 20000 }
        ]);
      }
    };
    
    fetchSponsors();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <LyraInitializer />
      <Navbar />
      
      <main className="flex-1 container mx-auto py-8 space-y-8 px-4">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Sponsorship Opportunities</h1>
          <p className="text-xl text-muted-foreground">
            Connect with our engaged community and grow your brand
          </p>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>AI-Powered Sponsorship Matching</AlertTitle>
          <AlertDescription>
            Our AI system automatically matches you with relevant sponsors based on your audience demographics and engagement metrics.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card key={tier.name} className={`${tier.highlight ? 'border-primary shadow-lg' : ''}`}>
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription className="text-xl font-bold">{tier.price}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold">Potential Sponsors</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Active Sponsors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  {potentialSponsors.map((sponsor, i) => (
                    <div key={i} className="flex items-start gap-4 py-4 border-b last:border-0">
                      <Building className="h-5 w-5 mt-1" />
                      <div>
                        <h3 className="font-medium">{sponsor.name}</h3>
                        <p className="text-sm text-muted-foreground">{sponsor.industry}</p>
                        <p className="text-sm">Budget: ${sponsor.budget.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Contact Sponsorship Team</CardTitle>
                <CardDescription>
                  Get personalized sponsorship packages tailored to your needs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">Schedule a Call</Button>
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground">
                    Want to see more of our platform first?
                  </p>
                  <Link to="/showcase">
                    <Button variant="outline" className="mt-2 w-full">
                      Visit Showcase Page
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-virtual-900 to-virtual-800 rounded-lg p-6 border border-virtual-700">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to become a sponsor?</h2>
          <p className="text-virtual-300 mb-6">Join our growing list of partners and reach our engaged community of virtual world enthusiasts.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-virtual-500 hover:bg-virtual-600">
              Contact Us Now
            </Button>
            <Link to="/showcase">
              <Button variant="outline" className="border-virtual-500 text-virtual-400 hover:bg-virtual-900/50">
                See More Examples
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
