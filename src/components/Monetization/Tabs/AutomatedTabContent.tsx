
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AutomatedRevenuePanel from "@/components/AutomatedRevenuePanel";
import { Brain, DollarSign, TrendingUp } from "lucide-react";

const AutomatedTabContent = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <AutomatedRevenuePanel />
      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
          <CardDescription>Quantum-inspired automated revenue generation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">
            The Automated Revenue System uses advanced quantum-inspired algorithms to analyze multiple revenue streams and provide optimized monetization strategies for your platform.
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-virtual-100 dark:bg-virtual-900/30 p-2 rounded-full">
                <Brain className="h-4 w-4 text-virtual-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Quantum-Inspired Optimization</p>
                <p className="text-xs text-muted-foreground">Analyzes thousands of potential revenue combinations</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-virtual-100 dark:bg-virtual-900/30 p-2 rounded-full">
                <TrendingUp className="h-4 w-4 text-virtual-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Automated Implementation</p>
                <p className="text-xs text-muted-foreground">Implements strategies with minimal human intervention</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-virtual-100 dark:bg-virtual-900/30 p-2 rounded-full">
                <DollarSign className="h-4 w-4 text-virtual-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Continuous Optimization</p>
                <p className="text-xs text-muted-foreground">Learns and adapts revenue strategies in real-time</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">The automated system evaluates market conditions, user behavior, and competitive analysis to generate optimal revenue strategies.</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AutomatedTabContent;
