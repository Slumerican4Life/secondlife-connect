
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import RevenueOverview from "@/components/Monetization/RevenueOverview";
import QuantumEnhancementPanel from "@/components/Monetization/QuantumEnhancementPanel";

interface RevenueTabContentProps {
  isOptimizing: boolean;
  onEnableQuantumOptimization: () => void;
}

const RevenueTabContent = ({ isOptimizing, onEnableQuantumOptimization }: RevenueTabContentProps) => {
  return (
    <div className="space-y-6">
      <RevenueOverview />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Distribution</CardTitle>
            <CardDescription>Percentage by revenue stream</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground italic">Revenue Distribution Chart would be here</p>
          </CardContent>
        </Card>
        <QuantumEnhancementPanel
          onEnableQuantumOptimization={onEnableQuantumOptimization}
          isOptimizing={isOptimizing}
        />
      </div>
    </div>
  );
};

export default RevenueTabContent;
