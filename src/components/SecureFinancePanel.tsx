
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSafety } from "@/hooks/useSafety";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  AlertCircle,
  CheckCircle2,
  Lock,
  CreditCard,
  Building,
  Key,
  Shield
} from "lucide-react";

// Define form schema with validation
const bankingFormSchema = z.object({
  accountName: z.string().min(2, { message: "Account name is required" }),
  accountNumber: z.string()
    .min(8, { message: "Account number must be at least 8 characters" })
    .max(17, { message: "Account number must not exceed 17 characters" }),
  routingNumber: z.string()
    .length(9, { message: "Routing number must be exactly 9 digits" })
    .regex(/^\d+$/, { message: "Routing number must contain only digits" }),
  bankName: z.string().min(2, { message: "Bank name is required" }),
  apiKey: z.string().optional(),
  apiSecret: z.string().optional(),
});

type BankingFormValues = z.infer<typeof bankingFormSchema>;

export default function SecureFinancePanel({ userId }: { userId?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [integrations, setIntegrations] = useState<string[]>([]);
  const { isAuthorized, encryptionOptions, storeEncryptedData } = useSafety(userId);

  // Initialize form with default values
  const form = useForm<BankingFormValues>({
    resolver: zodResolver(bankingFormSchema),
    defaultValues: {
      accountName: "",
      accountNumber: "",
      routingNumber: "",
      bankName: "",
      apiKey: "",
      apiSecret: "",
    },
  });

  const onSubmit = async (data: BankingFormValues) => {
    if (!userId) {
      toast.error("You must be logged in to save financial information");
      return;
    }

    if (!isAuthorized) {
      toast.error("You are not authorized to store financial information");
      return;
    }

    setIsSubmitting(true);

    try {
      // Store encrypted banking information
      const stored = await storeEncryptedData("banking_info", data);
      
      if (stored) {
        toast.success("Banking information securely stored");
        
        // Update list of active integrations
        setIntegrations(prev => [...prev, data.bankName]);
      } else {
        toast.error("Failed to store banking information");
      }
    } catch (error) {
      console.error("Error storing banking information:", error);
      toast.error("An error occurred while storing your information");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Building className="h-6 w-6 text-primary" />
          <CardTitle>Financial Integration Panel</CardTitle>
        </div>
        <CardDescription>
          Securely connect your financial accounts and payment services
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {!userId ? (
          <div className="flex items-center justify-center p-6 border border-dashed rounded-md">
            <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
            <p>You must be logged in to access financial integrations</p>
          </div>
        ) : (
          <>
            <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-md border border-amber-200 dark:border-amber-800">
              <div className="flex items-start space-x-2">
                <Shield className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800 dark:text-amber-300">Security Notice</h4>
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    Your financial information is encrypted using {encryptionOptions.encryptionLevel}-level encryption.
                    We recommend using test accounts during development.
                  </p>
                </div>
              </div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="bankName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Example Bank" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="accountName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="accountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="123456789" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormDescription className="text-xs">
                          Your account number is securely encrypted
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="routingNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Routing Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="123456789" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-base font-semibold flex items-center">
                    <Key className="h-4 w-4 mr-2" />
                    API Integration Keys
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="apiKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>API Key</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="pk_test_..." className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormDescription className="text-xs">
                            For payment processor integration (optional)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="apiSecret"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>API Secret</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input 
                                type="password" 
                                placeholder="sk_test_..." 
                                className="pl-10" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormDescription className="text-xs">
                            Keep this secret and secure (optional)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Securing Your Data..." : "Securely Save Financial Information"}
                </Button>
              </form>
            </Form>
          </>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col items-start border-t pt-4">
        <h4 className="text-sm font-semibold mb-2">Active Integrations</h4>
        {integrations.length > 0 ? (
          <ul className="w-full space-y-2">
            {integrations.map((integration, index) => (
              <li 
                key={index}
                className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-100 dark:border-green-900"
              >
                <div className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                  <span>{integration}</span>
                </div>
                <span className="text-xs text-green-600 dark:text-green-400">Connected</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No active financial integrations</p>
        )}
      </CardFooter>
    </Card>
  );
}
