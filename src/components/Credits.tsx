
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Zap, TrendingUp, Package, ShoppingCart } from "lucide-react";

const Credits = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const currentCredits = 3750;
  const monthlyUsage = 1250;
  const estimatedRemaining = 45; // days

  const packages = [
    {
      id: 1,
      name: "Starter Pack",
      credits: 1000,
      price: 25,
      pricePerSMS: 0.025,
      popular: false,
      description: "Perfect for small schools"
    },
    {
      id: 2,
      name: "Standard Pack",
      credits: 5000,
      price: 115,
      pricePerSMS: 0.023,
      popular: true,
      description: "Most popular choice"
    },
    {
      id: 3,
      name: "Professional Pack",
      credits: 10000,
      price: 200,
      pricePerSMS: 0.020,
      popular: false,
      description: "For large schools"
    },
    {
      id: 4,
      name: "Enterprise Pack",
      credits: 25000,
      price: 450,
      pricePerSMS: 0.018,
      popular: false,
      description: "Multi-academy trusts"
    }
  ];

  const usageHistory = [
    { month: "December 2024", sent: 1250, cost: 28.75 },
    { month: "November 2024", sent: 1180, cost: 27.14 },
    { month: "October 2024", sent: 980, cost: 22.54 },
    { month: "September 2024", sent: 1450, cost: 33.35 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">SMS Credits</h2>
          <p className="text-gray-600">Purchase and manage your SMS credits</p>
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
            <div className="text-2xl font-bold text-green-900">{monthlyUsage.toLocaleString()}</div>
            <p className="text-xs text-green-600 mt-1">SMS sent this month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Estimated Remaining</CardTitle>
            <Zap className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{estimatedRemaining}</div>
            <p className="text-xs text-orange-600 mt-1">days at current usage</p>
          </CardContent>
        </Card>
      </div>

      {/* Credit Packages */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Purchase Credits</h3>
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
                <div className="text-xs text-gray-500">£{pkg.pricePerSMS.toFixed(3)} per SMS</div>
                <Button 
                  className="w-full mt-4" 
                  variant={selectedPackage === pkg.id ? "default" : "outline"}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
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
                  </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Purchase Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Usage History */}
      <Card>
        <CardHeader>
          <CardTitle>Usage History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {usageHistory.map((month, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{month.month}</div>
                  <div className="text-sm text-gray-600">{month.sent.toLocaleString()} SMS sent</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">£{month.cost.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">Total cost</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Credits;
