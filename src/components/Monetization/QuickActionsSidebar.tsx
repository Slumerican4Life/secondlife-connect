
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  CreditCard,
  ShoppingBag,
  Brain
} from "lucide-react";

interface QuickActionsSidebarProps {
  onSetTab: (tab: string) => void;
}

const QuickActionsSidebar = ({ onSetTab }: QuickActionsSidebarProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button variant="outline" className="w-full justify-start">
          <TrendingUp className="mr-2 h-4 w-4" />
          Run Revenue Analysis
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <CreditCard className="mr-2 h-4 w-4" />
          View Payment Settings
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <ShoppingBag className="mr-2 h-4 w-4" />
          Marketplace Settings
        </Button>
        <Button variant="outline" className="w-full justify-start" onClick={() => onSetTab("automated")}>
          <Brain className="mr-2 h-4 w-4 text-virtual-600" />
          Automated Revenue
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActionsSidebar;

