
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const revenueData = [
  { name: 'Jan', premium: 4000, advertising: 2400, marketplace: 1800, virtual: 1200 },
  { name: 'Feb', premium: 4200, advertising: 2100, marketplace: 2000, virtual: 1500 },
  { name: 'Mar', premium: 5000, advertising: 2400, marketplace: 2200, virtual: 1300 },
  { name: 'Apr', premium: 5800, advertising: 2800, marketplace: 2500, virtual: 1700 },
  { name: 'May', premium: 6000, advertising: 3000, marketplace: 2800, virtual: 2000 },
  { name: 'Jun', premium: 6500, advertising: 3200, marketplace: 3000, virtual: 2500 }
];

const RevenueOverview = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>Monthly revenue breakdown by category</CardDescription>
      </CardHeader>
      <CardContent className="px-1" style={{ height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="premium" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="advertising" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            <Area type="monotone" dataKey="marketplace" stackId="1" stroke="#ffc658" fill="#ffc658" />
            <Area type="monotone" dataKey="virtual" stackId="1" stroke="#ff8042" fill="#ff8042" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
};

export default RevenueOverview;

