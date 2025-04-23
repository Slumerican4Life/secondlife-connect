
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Sample data for the advertising performance chart
const adRevenueData = [
  { month: 'Jan', revenue: 2100 },
  { month: 'Feb', revenue: 2400 },
  { month: 'Mar', revenue: 3200 },
  { month: 'Apr', revenue: 4100 },
  { month: 'May', revenue: 4800 },
  { month: 'Jun', revenue: 5200 },
  { month: 'Jul', revenue: 6100 },
  { month: 'Aug', revenue: 5800 },
  { month: 'Sep', revenue: 6500 },
  { month: 'Oct', revenue: 7200 },
  { month: 'Nov', revenue: 8100 },
  { month: 'Dec', revenue: 9200 }
];

const AdvertisingPerformance = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Advertising Revenue</CardTitle>
        <CardDescription>
          Monthly advertising income for the past year
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={adRevenueData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
            <Legend />
            <Bar dataKey="revenue" name="Ad Revenue ($)" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AdvertisingPerformance;
