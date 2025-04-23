
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

export const RevenueCards = () => {
  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold">$24,560</span>
            <Badge variant="outline" className="text-green-500 border-green-200">
              <TrendingUp className="h-3 w-3 mr-1" /> +15%
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Active Subscribers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold">1,248</span>
            <Badge variant="outline" className="text-green-500 border-green-200">
              <TrendingUp className="h-3 w-3 mr-1" /> +8%
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Ad Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold">$8,245</span>
            <Badge variant="outline" className="text-green-500 border-green-200">
              <TrendingUp className="h-3 w-3 mr-1" /> +12%
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold">5.8%</span>
            <Badge variant="outline" className="text-green-500 border-green-200">
              <TrendingUp className="h-3 w-3 mr-1" /> +2.1%
            </Badge>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

