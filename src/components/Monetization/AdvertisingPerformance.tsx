
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const advertiserData = [
  { name: 'VirtualFashion', impressions: 12000, clicks: 840, conversion: 126 },
  { name: 'CryptoWallet', impressions: 8500, clicks: 680, conversion: 85 },
  { name: 'AvatarCustom', impressions: 6200, clicks: 496, conversion: 74 },
  { name: 'RealEstate', impressions: 9800, clicks: 784, conversion: 118 }
];

const AdvertisingPerformance = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Advertising Performance</CardTitle>
        <CardDescription>Impressions, clicks, and conversions by advertiser</CardDescription>
      </CardHeader>
      <CardContent style={{ height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={advertiserData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="impressions" fill="#8884d8" />
            <Bar dataKey="clicks" fill="#82ca9d" />
            <Bar dataKey="conversion" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
};

export default AdvertisingPerformance;

