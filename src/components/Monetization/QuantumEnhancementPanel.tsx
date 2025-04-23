
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Zap, TrendingUp, DollarSign } from "lucide-react";

interface QuantumEnhancementPanelProps {
  onEnableQuantumOptimization: () => void;
  isOptimizing: boolean;
}

const QuantumEnhancementPanel = ({ onEnableQuantumOptimization, isOptimizing }: QuantumEnhancementPanelProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Quantum Enhancement</CardTitle>
          <span className="bg-virtual-600 rounded px-2 py-0.5 text-xs text-white">NEW</span>
        </div>
        <CardDescription>AI-powered revenue generation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Activate quantum-inspired revenue optimization algorithms to maximize your monetization potential automatically.
          </p>
          <div className="flex items-center p-3 bg-virtual-50 dark:bg-virtual-900/20 rounded-md">
            <Brain className="h-10 w-10 text-virtual-600 mr-3" />
            <div>
              <p className="text-sm font-medium">Automated Revenue System</p>
              <p className="text-xs text-muted-foreground">AI-driven revenue generation using quantum algorithms</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-virtual-600 hover:bg-virtual-700"
          onClick={onEnableQuantumOptimization}
          disabled={isOptimizing}
        >
          {isOptimizing ? (
            <>
              <Zap className="mr-2 h-4 w-4 animate-pulse" /> Initializing...
            </>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" /> Enable Quantum Optimization
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuantumEnhancementPanel;

