
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  Legend
} from "recharts";
import { 
  TrendingUp, 
  DollarSign, 
  CreditCard,
  ArrowRight,
  ArrowDownCircle,
  ArrowUpCircle,
  History,
  BarChart2,
  RefreshCcw,
  Wallet,
  Clock 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AgentManager } from "@/lib/agents/AgentManager";
import { toast } from "@/components/ui/use-toast";
import { useSafety } from "@/hooks/useSafety";

// Mock exchange rate history data
const rateHistoryData = [
  { date: '2025-03-20', rate: 247, volume: 52000 },
  { date: '2025-03-21', rate: 249, volume: 48000 },
  { date: '2025-03-22', rate: 251, volume: 51000 },
  { date: '2025-03-23', rate: 248, volume: 49000 },
  { date: '2025-03-24', rate: 247, volume: 53000 },
  { date: '2025-03-25', rate: 246, volume: 55000 },
  { date: '2025-03-26', rate: 248, volume: 57000 },
  { date: '2025-03-27', rate: 249, volume: 59000 },
  { date: '2025-03-28', rate: 251, volume: 62000 },
  { date: '2025-03-29', rate: 252, volume: 60000 },
  { date: '2025-03-30', rate: 250, volume: 58000 },
  { date: '2025-04-01', rate: 251, volume: 61000 },
  { date: '2025-04-02', rate: 252, volume: 63000 },
  { date: '2025-04-03', rate: 254, volume: 64000 },
  { date: '2025-04-04', rate: 253, volume: 59000 },
  { date: '2025-04-05', rate: 255, volume: 57000 },
  { date: '2025-04-06', rate: 254, volume: 56000 },
  { date: '2025-04-07', rate: 252, volume: 58000 },
  { date: '2025-04-08', rate: 250, volume: 61000 },
  { date: '2025-04-09', rate: 249, volume: 63000 },
  { date: '2025-04-10', rate: 251, volume: 65000 },
  { date: '2025-04-11', rate: 253, volume: 67000 },
  { date: '2025-04-12', rate: 250, volume: 64000 },
  { date: '2025-04-13', rate: 249, volume: 62000 },
  { date: '2025-04-14', rate: 248, volume: 60000 },
  { date: '2025-04-15', rate: 250, volume: 59000 },
  { date: '2025-04-16', rate: 252, volume: 63000 },
  { date: '2025-04-17', rate: 253, volume: 65000 },
  { date: '2025-04-18', rate: 252, volume: 64000 },
  { date: '2025-04-19', rate: 250, volume: 62000 },
];

// Recent transactions mock data
const recentTransactions = [
  { id: 'TX-5932', type: 'purchase', amount: 'L$5,000', cost: '$20.00', date: '2025-04-19', status: 'completed' },
  { id: 'TX-5878', type: 'sale', amount: 'L$1,250', cost: '$5.00', date: '2025-04-17', status: 'completed' },
  { id: 'TX-5843', type: 'purchase', amount: 'L$2,500', cost: '$10.00', date: '2025-04-15', status: 'completed' },
  { id: 'TX-5791', type: 'transfer_out', amount: 'L$500', recipient: 'AvatarUser42', date: '2025-04-12', status: 'completed' },
  { id: 'TX-5746', type: 'purchase', amount: 'L$10,000', cost: '$38.50', date: '2025-04-10', status: 'completed' }
];

const LindenExchange = () => {
  const isMobile = useIsMobile();
  const userId = "user-123"; // This would come from authentication context in a real app
  const { storeEncryptedData, retrieveEncryptedData } = useSafety(userId);
  const agentManager = AgentManager.getInstance();
  const lindenAgent = agentManager.getLindenAgent();
  
  const [currentTab, setCurrentTab] = useState("exchange");
  const [purchaseAmount, setPurchaseAmount] = useState(5000);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState("L$12,548");
  
  const handlePurchase = async () => {
    setIsLoading(true);
    
    // Determine final purchase amount
    const finalAmount = showCustomAmount ? parseInt(customAmount) : purchaseAmount;
    
    if (finalAmount <= 0 || isNaN(finalAmount)) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid purchase amount.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    try {
      // In a real app, this would call the actual purchase API
      // For this demo, we use the agent's method
      const result = await lindenAgent.purchaseLindens(finalAmount, paymentMethod, userId);
      
      // Store the transaction securely
      await storeEncryptedData('linden_transaction', {
        transactionId: result.transactionId,
        amount: finalAmount,
        paymentMethod,
        timestamp: new Date().toISOString()
      });
      
      // Show success message
      toast({
        title: "Purchase Successful",
        description: `You have successfully purchased L$${finalAmount.toLocaleString()}.`,
        variant: "default",
      });
      
      // Update wallet balance (in a real app, this would be fetched from the backend)
      const newBalanceValue = 12548 + finalAmount;
      setWalletBalance(`L$${newBalanceValue.toLocaleString()}`);
      
    } catch (error) {
      console.error("Error purchasing Linden Dollars:", error);
      toast({
        title: "Purchase Failed",
        description: "There was an error processing your transaction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <div className="w-16 lg:w-64 hidden sm:block">
          <div className="sticky top-[73px] h-[calc(100vh-73px)]">
            <Sidebar />
          </div>
        </div>

        <main className="flex-1 border-x border-border/80 overflow-y-auto">
          <div className="py-6 px-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold flex items-center">
                  <DollarSign className="h-6 w-6 mr-2 text-blue-500" />
                  Linden Dollar Exchange
                </h1>
                <p className="text-muted-foreground">
                  Buy, sell, and manage your Linden Dollars
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RefreshCcw className="h-4 w-4" />
                  <span className="hidden sm:inline">Refresh Rate</span>
                </Button>
                <Button 
                  variant="default" 
                  className="bg-gradient-to-r from-blue-500 to-blue-700"
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Virtual Wallet
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Current Exchange Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold">L$250 = $1 USD</span>
                    <Badge variant="outline" className="text-green-500 border-green-200">
                      <TrendingUp className="h-3 w-3 mr-1" /> Stable
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Your Wallet Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold">{walletBalance}</span>
                    <Badge variant="outline">≈ $50.19 USD</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">24h Trading Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold">L$15.2M</span>
                    <Badge variant="outline" className="text-green-500 border-green-200">
                      <TrendingUp className="h-3 w-3 mr-1" /> +8.3%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">30-Day Price Change</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold">+1.2%</span>
                    <Badge variant="outline" className="text-green-500 border-green-200">
                      <TrendingUp className="h-3 w-3 mr-1" /> Bullish
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="exchange" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span className="hidden sm:inline">Buy & Sell</span>
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <History className="h-4 w-4" />
                  <span className="hidden sm:inline">Transaction History</span>
                </TabsTrigger>
                <TabsTrigger value="market" className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Market Data</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="exchange" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Buy Linden Dollars</CardTitle>
                      <CardDescription>
                        Current rate: L$250 = $1 USD
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Select Package</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          <Button 
                            variant={purchaseAmount === 1000 && !showCustomAmount ? "default" : "outline"}
                            onClick={() => { setPurchaseAmount(1000); setShowCustomAmount(false); }}
                            className="flex-col h-auto py-3"
                          >
                            <span className="font-bold">L$1,000</span>
                            <span className="text-xs">$4.00</span>
                          </Button>
                          <Button 
                            variant={purchaseAmount === 2500 && !showCustomAmount ? "default" : "outline"}
                            onClick={() => { setPurchaseAmount(2500); setShowCustomAmount(false); }}
                            className="flex-col h-auto py-3"
                          >
                            <span className="font-bold">L$2,500</span>
                            <span className="text-xs">$9.50</span>
                            <span className="text-xs text-green-500">+50 bonus</span>
                          </Button>
                          <Button 
                            variant={purchaseAmount === 5000 && !showCustomAmount ? "default" : "outline"}
                            onClick={() => { setPurchaseAmount(5000); setShowCustomAmount(false); }}
                            className="flex-col h-auto py-3"
                          >
                            <span className="font-bold">L$5,000</span>
                            <span className="text-xs">$18.50</span>
                            <span className="text-xs text-green-500">+125 bonus</span>
                          </Button>
                          <Button 
                            variant={purchaseAmount === 10000 && !showCustomAmount ? "default" : "outline"}
                            onClick={() => { setPurchaseAmount(10000); setShowCustomAmount(false); }}
                            className="flex-col h-auto py-3"
                          >
                            <span className="font-bold">L$10,000</span>
                            <span className="text-xs">$35.00</span>
                            <span className="text-xs text-green-500">+300 bonus</span>
                          </Button>
                          <Button 
                            variant={purchaseAmount === 25000 && !showCustomAmount ? "default" : "outline"}
                            onClick={() => { setPurchaseAmount(25000); setShowCustomAmount(false); }}
                            className="flex-col h-auto py-3"
                          >
                            <span className="font-bold">L$25,000</span>
                            <span className="text-xs">$85.00</span>
                            <span className="text-xs text-green-500">+875 bonus</span>
                          </Button>
                          <Button 
                            variant={showCustomAmount ? "default" : "outline"}
                            onClick={() => setShowCustomAmount(true)}
                            className="flex-col h-auto py-3"
                          >
                            <span className="font-bold">Custom</span>
                            <span className="text-xs">Any amount</span>
                          </Button>
                        </div>
                      </div>
                      
                      {showCustomAmount && (
                        <div>
                          <label className="block text-sm font-medium mb-2">Enter Linden Dollar Amount</label>
                          <div className="flex gap-2">
                            <span className="flex items-center bg-muted px-3 rounded-l-md border border-r-0">L$</span>
                            <Input
                              type="number"
                              value={customAmount}
                              onChange={(e) => setCustomAmount(e.target.value)}
                              placeholder="Enter amount"
                              className="flex-1"
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            ${(parseInt(customAmount || "0") / 250).toFixed(2)} USD at current exchange rate
                          </p>
                        </div>
                      )}
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Payment Method</label>
                        <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="card">Credit/Debit Card</SelectItem>
                            <SelectItem value="paypal">PayPal</SelectItem>
                            <SelectItem value="bank">Bank Transfer</SelectItem>
                            <SelectItem value="crypto">Cryptocurrency</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        size="lg"
                        disabled={isLoading}
                        onClick={handlePurchase}
                      >
                        {isLoading ? "Processing..." : "Purchase Linden Dollars"}
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Sell Linden Dollars</CardTitle>
                      <CardDescription>
                        Convert your Linden Dollars back to USD
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Amount to Sell</label>
                        <div className="flex gap-2">
                          <span className="flex items-center bg-muted px-3 rounded-l-md border border-r-0">L$</span>
                          <Input
                            type="number"
                            placeholder="Enter amount"
                            className="flex-1"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Current rate: L$250 = $1 USD (minus 3% processing fee)
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Payout Method</label>
                        <Select defaultValue="bank">
                          <SelectTrigger>
                            <SelectValue placeholder="Select payout method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bank">Bank Account</SelectItem>
                            <SelectItem value="paypal">PayPal</SelectItem>
                            <SelectItem value="credit">Store Credit</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" size="lg">
                        Sell Linden Dollars
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="history" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>
                      Recent Linden Dollar transactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 rounded-md border overflow-hidden">
                      {recentTransactions.map((tx, i) => (
                        <div key={tx.id} 
                          className={`flex justify-between items-center p-3 hover:bg-muted/50 text-sm 
                          ${i !== recentTransactions.length - 1 ? 'border-b' : ''}`}
                        >
                          <div className="flex items-center gap-3">
                            {tx.type === 'purchase' ? (
                              <ArrowDownCircle className="h-5 w-5 text-green-500" />
                            ) : tx.type === 'sale' ? (
                              <ArrowUpCircle className="h-5 w-5 text-blue-500" />
                            ) : (
                              <ArrowRight className="h-5 w-5 text-amber-500" />
                            )}
                            <div>
                              <p className="font-medium">
                                {tx.type === 'purchase' ? 'Purchased' : 
                                 tx.type === 'sale' ? 'Sold' : 'Transferred'} {tx.amount}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {tx.date} · {tx.id}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            {tx.cost && <p className="font-medium">{tx.cost}</p>}
                            {tx.recipient && <p className="font-medium">To: {tx.recipient}</p>}
                            <Badge variant="outline" className="text-xs">
                              {tx.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button variant="outline" size="sm">
                      View Complete History <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="market" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Exchange Rate History</CardTitle>
                    <CardDescription>
                      Linden Dollar to USD exchange rate over the last 30 days
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={rateHistoryData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="date" 
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) => value.split('-').slice(1).join('/')}
                          />
                          <YAxis 
                            tick={{ fontSize: 12 }}
                            domain={['dataMin - 5', 'dataMax + 5']}
                          />
                          <RechartsTooltip 
                            formatter={(value) => [`L$${value} = $1`, 'Exchange Rate']}
                            labelFormatter={(label) => `Date: ${label}`}
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="rate" 
                            stroke="#3b82f6" 
                            name="L$ per USD"
                            dot={false}
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Trading Volume</CardTitle>
                    <CardDescription>
                      Daily Linden Dollar trading volume
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={rateHistoryData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="date" 
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) => value.split('-').slice(1).join('/')}
                          />
                          <YAxis 
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                          />
                          <RechartsTooltip 
                            formatter={(value) => [`L$${value.toLocaleString()}`, 'Volume']}
                            labelFormatter={(label) => `Date: ${label}`}
                          />
                          <Legend />
                          <Bar 
                            dataKey="volume" 
                            fill="#3b82f6" 
                            name="Trading Volume"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        {!isMobile && (
          <div className="w-80 hidden lg:block">
            <div className="p-4 sticky top-[73px]">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Exchange Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Best Time to Buy</p>
                      <p className="text-xs text-muted-foreground">
                        Linden Dollar rates are typically lower on Tuesdays and Wednesdays.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Bulk Purchases</p>
                      <p className="text-xs text-muted-foreground">
                        Buy in larger amounts to take advantage of bonus Linden Dollars.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                      <Wallet className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Payment Methods</p>
                      <p className="text-xs text-muted-foreground">
                        Credit card and PayPal purchases are processed instantly. Bank transfers may take 1-3 days.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Market Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Daily Volume</span>
                    <span className="font-medium">L$62M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">30-Day High</span>
                    <span className="font-medium">L$255 = $1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">30-Day Low</span>
                    <span className="font-medium">L$246 = $1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Traders</span>
                    <span className="font-medium">58.2K</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LindenExchange;
