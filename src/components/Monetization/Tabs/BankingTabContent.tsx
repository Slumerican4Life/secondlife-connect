
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { AgentManager } from "@/lib/agents/AgentManager";
import SecureFinancePanel from "@/components/SecureFinancePanel";
import { 
  DollarSign, 
  Building, 
  ArrowRightLeft, 
  Check, 
  AlertCircle, 
  CreditCard, 
  Wallet, 
  BadgeDollarSign, 
  PiggyBank, 
  Bot,
  Lock
} from "lucide-react";

// Sample recent transactions data
const recentTransactions = [
  { id: "TX-98742", date: "2025-04-22", type: "Deposit", amount: "$5,420.00", status: "completed", description: "Subscriber revenue" },
  { id: "TX-98741", date: "2025-04-21", type: "Withdrawal", amount: "$1,200.00", status: "completed", description: "Platform fees" },
  { id: "TX-98738", date: "2025-04-20", type: "Deposit", amount: "$850.00", status: "completed", description: "Marketplace fees" },
  { id: "TX-98735", date: "2025-04-19", type: "Deposit", amount: "$3,210.00", status: "completed", description: "Premium upgrades" },
  { id: "TX-98732", date: "2025-04-18", type: "Withdrawal", amount: "$750.00", status: "processing", description: "Service provider payment" },
];

// Sample payment methods data
const paymentMethods = [
  { id: "pm-1", type: "bank", name: "FirstBank Business", last4: "5678", isDefault: true },
  { id: "pm-2", type: "card", name: "Business Visa", last4: "4321", isDefault: false },
];

const BankingTabContent = () => {
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawMethod, setWithdrawMethod] = useState("");
  
  const { toast } = useToast();
  const agentManager = AgentManager.getInstance();

  // Handle adding a new payment method
  const handleAddPaymentMethod = () => {
    if (!bankName || !accountNumber || !routingNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill out all fields to add a payment method.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would call an API to add the payment method
    toast({
      title: "Payment Method Added",
      description: "Your new payment method has been added successfully.",
      variant: "default",
    });
    
    // Reset form and close it
    setBankName("");
    setAccountNumber("");
    setRoutingNumber("");
    setIsAddingPayment(false);
  };

  // Handle withdrawal request
  const handleWithdraw = () => {
    if (!withdrawAmount || !withdrawMethod) {
      toast({
        title: "Missing Information",
        description: "Please enter an amount and select a payment method.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would call an API to process the withdrawal
    toast({
      title: "Withdrawal Initiated",
      description: `Your withdrawal of $${withdrawAmount} has been initiated and is being processed.`,
      variant: "default",
    });
    
    // Reset form and close it
    setWithdrawAmount("");
    setWithdrawMethod("");
    setIsWithdrawing(false);
  };

  // Run banking optimization with AI
  const runBankingOptimization = async () => {
    try {
      const monetizationAgent = agentManager.getMonetizationAgent();
      const response = await monetizationAgent.processQuery("optimize banking and payment flows");
      const responseData = JSON.parse(response);
      
      if (responseData?.success) {
        toast({
          title: "Banking Optimization Complete",
          description: "AI has generated recommendations for optimizing your banking setup.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error running banking optimization:", error);
      toast({
        title: "Optimization Error",
        description: "Could not complete banking optimization.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Available Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">$42,580.25</span>
              <Badge variant="outline" className="text-green-500 border-green-200">
                Ready to withdraw
              </Badge>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button onClick={() => setIsWithdrawing(true)} className="w-full" size="sm">
              <Wallet className="mr-2 h-4 w-4" />
              Withdraw Funds
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">$3,850.00</span>
              <Badge variant="outline" className="text-amber-500 border-amber-200">
                Processing
              </Badge>
            </div>
          </CardContent>
          <CardFooter className="pt-0 text-xs text-muted-foreground">
            Funds will be available in 2-3 business days
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Next Payout</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">April 30, 2025</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0 text-xs text-muted-foreground">
            Estimated amount: $5,200.00
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              View your recent deposits and withdrawals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-medium">{tx.id}</TableCell>
                    <TableCell>{tx.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {tx.type === "Deposit" ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400">Deposit</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">Withdrawal</Badge>
                        )}
                        <span className="ml-2">{tx.description}</span>
                      </div>
                    </TableCell>
                    <TableCell className={tx.type === "Deposit" ? "text-green-600 dark:text-green-400" : "text-blue-600 dark:text-blue-400"}>
                      {tx.type === "Deposit" ? "+" : "-"}{tx.amount}
                    </TableCell>
                    <TableCell>
                      {tx.status === "completed" ? (
                        <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                          <Check className="h-4 w-4" />
                          <span>Completed</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                          <AlertCircle className="h-4 w-4" />
                          <span>Processing</span>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              Export Transactions
            </Button>
            <Button variant="link" size="sm" className="text-muted-foreground">
              View All Transactions
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>
              Manage your connected payment accounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="border rounded-md p-3 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    {method.type === "bank" ? (
                      <Building className="h-5 w-5 text-primary" />
                    ) : (
                      <CreditCard className="h-5 w-5 text-primary" />
                    )}
                    <div>
                      <div className="font-medium">{method.name}</div>
                      <div className="text-xs text-muted-foreground">•••• {method.last4}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {method.isDefault && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400">
                        Default
                      </Badge>
                    )}
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {!isAddingPayment ? (
              <Button className="w-full" variant="outline" onClick={() => setIsAddingPayment(true)}>
                <PiggyBank className="mr-2 h-4 w-4" />
                Add Payment Method
              </Button>
            ) : (
              <div className="space-y-3 border rounded-md p-3 bg-muted/50">
                <h4 className="font-medium">Add Bank Account</h4>
                <div>
                  <label className="text-sm font-medium block mb-1">Bank Name</label>
                  <Input 
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="Enter bank name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Account Number</label>
                  <Input 
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="Enter account number"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Routing Number</label>
                  <Input 
                    value={routingNumber}
                    onChange={(e) => setRoutingNumber(e.target.value)}
                    placeholder="Enter routing number"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" onClick={() => setIsAddingPayment(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddPaymentMethod}>
                    Add Bank Account
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Banking Settings</CardTitle>
            <CardDescription>
              Configure payout schedule and options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Payout Schedule</h3>
              <Select defaultValue="monthly">
                <SelectTrigger>
                  <SelectValue placeholder="Select payout frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Minimum Payout Amount</h3>
              <Select defaultValue="100">
                <SelectTrigger>
                  <SelectValue placeholder="Select minimum amount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50">$50</SelectItem>
                  <SelectItem value="100">$100</SelectItem>
                  <SelectItem value="500">$500</SelectItem>
                  <SelectItem value="1000">$1,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="pt-2">
              <Button variant="outline" className="w-full" onClick={runBankingOptimization}>
                <Bot className="mr-2 h-4 w-4" />
                Run AI Banking Optimization
              </Button>
            </div>
            
            <div className="border rounded-md p-3 bg-muted/50 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-medium">Security Settings</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Enhanced security protections are enabled for your financial transactions.
              </p>
              <Button variant="link" className="p-0 h-auto" size="sm">
                View Security Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <SecureFinancePanel userId="user-123" />
      
      {isWithdrawing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Withdraw Funds</CardTitle>
              <CardDescription>Transfer funds to your connected payment method</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">Amount</label>
                <div className="flex">
                  <span className="flex items-center border border-r-0 rounded-l-md px-3 bg-muted">$</span>
                  <Input 
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="rounded-l-none"
                    placeholder="Enter amount"
                    type="number"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Payment Method</label>
                <Select value={withdrawMethod} onValueChange={setWithdrawMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map(method => (
                      <SelectItem key={method.id} value={method.id}>
                        {method.name} (•••• {method.last4})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="p-3 border rounded-md bg-amber-50 dark:bg-amber-950/20 text-sm">
                <p className="font-medium">Withdrawal Notes</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Processing time: 2-5 business days</li>
                  <li>Fee: 1.5% (min $1.00)</li>
                  <li>Daily maximum: $50,000</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setIsWithdrawing(false)}>
                Cancel
              </Button>
              <Button onClick={handleWithdraw}>
                Confirm Withdrawal
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BankingTabContent;
