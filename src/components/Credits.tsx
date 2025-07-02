import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Zap, TrendingUp, Package, ShoppingCart, FileText, Receipt } from "lucide-react";
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from "@/hooks/useAuth";
import InvoiceManager from "./InvoiceManager";

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_...');

const Credits = () => {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'invoice'>('card');
  const [currentSchoolId, setCurrentSchoolId] = useState<string>('');
  const [smsAppId, setSmsAppId] = useState<string>('');
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Get current user's school and SMS app ID
  useEffect(() => {
    const getCurrentUserSchool = async () => {
      if (!user?.id) return;
      
      console.log("Getting current user school for user:", user.id);
      
      // Get user's current school from user_school_history
      const { data: schoolHistory, error: schoolError } = await supabase
        .from('user_school_history')
        .select('school_id')
        .eq('user_id', user.id)
        .eq('is_current', true)
        .single();
      
      console.log("School history result:", { schoolHistory, schoolError });
      
      if (schoolHistory) {
        setCurrentSchoolId(schoolHistory.school_id);
        console.log("Set current school ID:", schoolHistory.school_id);
      } else {
        console.log("No current school found for user");
        toast({
          title: "School Assignment Required",
          description: "Your account needs to be assigned to a school. Please contact support.",
          variant: "destructive",
        });
      }
    };

    const getSmsApp = async () => {
      const { data: app, error } = await supabase
        .from('apps')
        .select('id')
        .eq('name', 'SMS')
        .single();
      
      console.log("SMS app result:", { app, error });
      
      if (app) {
        setSmsAppId(app.id);
        console.log("Set SMS app ID:", app.id);
      } else {
        console.log("SMS app not found");
      }
    };

    getCurrentUserSchool();
    getSmsApp();
  }, [user?.id, toast]);

  // Fetch credit balances
  const { data: creditBalance } = useQuery({
    queryKey: ['credit-balances', currentSchoolId, smsAppId],
    queryFn: async () => {
      if (!currentSchoolId || !smsAppId) return null;
      
      const { data, error } = await supabase
        .from('credit_balances')
        .select('*')
        .eq('school_id', currentSchoolId)
        .eq('app_id', smsAppId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!currentSchoolId && !!smsAppId,
  });

  // Fetch usage logs for monthly usage
  const { data: monthlyUsage } = useQuery({
    queryKey: ['monthly-usage', currentSchoolId, smsAppId],
    queryFn: async () => {
      if (!currentSchoolId || !smsAppId) return 0;
      
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { data, error } = await supabase
        .from('usage_logs')
        .select('credits_used')
        .eq('school_id', currentSchoolId)
        .eq('app_id', smsAppId)
        .gte('created_at', startOfMonth.toISOString());

      if (error) throw error;
      return data.reduce((sum, log) => sum + log.credits_used, 0);
    },
    enabled: !!currentSchoolId && !!smsAppId,
  });

  const currentCredits = creditBalance?.credits_available || 0;
  const usedCredits = monthlyUsage || 0;
  const estimatedRemaining = usedCredits > 0 ? Math.floor(currentCredits / (usedCredits / 30)) : 999;

  const packages = [
    {
      id: 1,
      name: "Small Pack",
      credits: 1000,
      price: 10,
      pricePerSMS: 0.01,
      popular: false,
      description: "Perfect for occasional messaging"
    },
    {
      id: 2,
      name: "Medium Pack",
      credits: 5000,
      price: 50,
      pricePerSMS: 0.01,
      popular: true,
      description: "Most popular for regular schools"
    },
    {
      id: 3,
      name: "Large Pack",
      credits: 10000,
      price: 100,
      pricePerSMS: 0.01,
      popular: false,
      description: "For busy schools with lots of messaging"
    },
    {
      id: 4,
      name: "Bulk Pack",
      credits: 25000,
      price: 250,
      pricePerSMS: 0.01,
      popular: false,
      description: "Maximum value for large schools"
    }
  ];

  const purchaseMutation = useMutation({
    mutationFn: async ({ packageId, method }: { packageId: number; method: 'card' | 'invoice' }) => {
      console.log("Starting purchase mutation with:", { packageId, method, currentSchoolId, smsAppId, userId: user?.id });
      
      if (!currentSchoolId || !smsAppId || !user?.id) {
        throw new Error('Missing required information: school, app, or user not found');
      }

      const { data, error } = await supabase.functions.invoke('stripe-purchase', {
        body: {
          action: method === 'card' ? 'create_payment_intent' : 'create_invoice',
          packageId,
          schoolId: currentSchoolId,
          appId: smsAppId
        }
      });

      console.log("Stripe purchase function result:", { data, error });

      if (error) throw error;
      return data;
    },
    onSuccess: async (data, variables) => {
      console.log("Purchase mutation success:", { data, variables });
      
      if (variables.method === 'card') {
        const stripe = await stripePromise;
        if (stripe && data.client_secret) {
          const { error } = await stripe.confirmCardPayment(data.client_secret);
          if (error) {
            toast({
              title: "Payment Failed",
              description: error.message,
              variant: "destructive",
            });
          } else {
            toast({
              title: "Payment Successful!",
              description: "Your credits have been added to your account.",
            });
            queryClient.invalidateQueries({ queryKey: ['credit-balances'] });
          }
        }
      } else {
        toast({
          title: "Invoice Created",
          description: `Invoice ${data.invoice_number} has been generated. You can download it below.`,
        });
        queryClient.invalidateQueries({ queryKey: ['invoices'] });
      }
      setSelectedPackage(null);
    },
    onError: (error) => {
      console.error("Purchase mutation error:", error);
      toast({
        title: "Error",
        description: "Failed to process purchase: " + error.message,
        variant: "destructive",
      });
    },
  });

  const handlePurchase = () => {
    console.log("Handle purchase clicked:", { selectedPackage, currentSchoolId, smsAppId, userId: user?.id });
    
    if (!selectedPackage) {
      toast({
        title: "Error",
        description: "Please select a package.",
        variant: "destructive",
      });
      return;
    }

    if (!user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to make a purchase.",
        variant: "destructive",
      });
      return;
    }

    if (!currentSchoolId) {
      toast({
        title: "Error",
        description: "School assignment required. Please contact support.",
        variant: "destructive",
      });
      return;
    }

    if (!smsAppId) {
      toast({
        title: "Error",
        description: "SMS service not available. Please try again later.",
        variant: "destructive",
      });
      return;
    }

    purchaseMutation.mutate({
      packageId: selectedPackage,
      method: paymentMethod
    });
  };

  // Show loading state while getting user school
  if (user && !currentSchoolId && !smsAppId) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your school information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">SMS Credits</h2>
          <p className="text-gray-600">Simple pricing: 1p per SMS. Buy in bulk for less hassle.</p>
        </div>
      </div>

      {/* Current Balance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Current Balance</CardTitle>
            <CreditCard className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{currentCredits.toLocaleString()}</div>
            <p className="text-xs text-blue-600 mt-1">SMS credits available</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Monthly Usage</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{usedCredits.toLocaleString()}</div>
            <p className="text-xs text-green-600 mt-1">SMS sent this month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Estimated Remaining</CardTitle>
            <Zap className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{estimatedRemaining > 999 ? '∞' : estimatedRemaining}</div>
            <p className="text-xs text-orange-600 mt-1">days at current usage</p>
          </CardContent>
        </Card>
      </div>

      {/* Pricing Message */}
      <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-orange-800 mb-2">As close to free as we can make it</h3>
            <p className="text-orange-700">Just 1p per SMS. Buy in bulk to reduce admin hassle and keep your messaging simple.</p>
          </div>
        </CardContent>
      </Card>

      {/* Credit Packages */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Purchase Credits</h3>
        
        {/* Payment Method Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Payment Method</label>
          <div className="flex gap-4">
            <button
              onClick={() => setPaymentMethod('card')}
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg ${
                paymentMethod === 'card' 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <CreditCard className="h-4 w-4" />
              Pay by Card
            </button>
            <button
              onClick={() => setPaymentMethod('invoice')}
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg ${
                paymentMethod === 'invoice' 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <FileText className="h-4 w-4" />
              Pay by Invoice
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={`relative cursor-pointer transition-all ${
                selectedPackage === pkg.id ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
              } ${pkg.popular ? 'border-blue-500' : ''}`}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              {pkg.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center">
                <Package className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <CardTitle className="text-lg">{pkg.name}</CardTitle>
                <p className="text-sm text-gray-600">{pkg.description}</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-gray-900">£{pkg.price}</div>
                <div className="text-sm text-gray-600 mb-2">{pkg.credits.toLocaleString()} SMS credits</div>
                <div className="text-xs text-gray-500 bg-green-50 px-2 py-1 rounded-full inline-block">
                  1p per SMS
                </div>
                <Button 
                  className="w-full mt-4" 
                  variant={selectedPackage === pkg.id ? "default" : "outline"}
                >
                  {paymentMethod === 'card' ? <CreditCard className="mr-2 h-4 w-4" /> : <Receipt className="mr-2 h-4 w-4" />}
                  Select
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedPackage && (
          <Card className="mt-6 border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Ready to purchase?</h4>
                  <p className="text-sm text-gray-600">
                    {packages.find(p => p.id === selectedPackage)?.name} - £{packages.find(p => p.id === selectedPackage)?.price}
                    {paymentMethod === 'invoice' && ' (Invoice will be generated)'}
                  </p>
                </div>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={handlePurchase}
                  disabled={purchaseMutation.isPending}
                >
                  {paymentMethod === 'card' ? <CreditCard className="mr-2 h-4 w-4" /> : <FileText className="mr-2 h-4 w-4" />}
                  {purchaseMutation.isPending 
                    ? 'Processing...' 
                    : paymentMethod === 'card' 
                      ? 'Pay Now' 
                      : 'Generate Invoice'
                  }
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Invoice Manager */}
      {currentSchoolId && (
        <InvoiceManager schoolId={currentSchoolId} />
      )}
    </div>
  );
};

export default Credits;
