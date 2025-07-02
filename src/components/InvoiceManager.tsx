
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Download, Eye, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface Invoice {
  id: string;
  invoice_number: string;
  amount: number;
  status: string;
  due_date: string;
  created_at: string;
  pdf_url?: string;
  credit_purchases: {
    credits_purchased: number;
    app_id: string;
    apps: {
      name: string;
    };
  };
}

const InvoiceManager = ({ schoolId }: { schoolId: string }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: invoices, isLoading } = useQuery({
    queryKey: ['invoices', schoolId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          credit_purchases (
            credits_purchased,
            app_id,
            apps (name)
          )
        `)
        .eq('school_id', schoolId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Invoice[];
    },
  });

  const confirmPaymentMutation = useMutation({
    mutationFn: async ({ invoiceId, purchaseId }: { invoiceId: string; purchaseId: string }) => {
      const { data, error } = await supabase.functions.invoke('stripe-purchase', {
        body: {
          action: 'confirm_payment',
          purchaseId,
          invoiceId,
          adminConfirmation: true
        }
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Payment Confirmed",
        description: "Credits have been added to your account.",
      });
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['credit-balances'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to confirm payment: " + error.message,
        variant: "destructive",
      });
    },
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { variant: "secondary" as const, icon: Clock, text: "Draft" },
      sent: { variant: "default" as const, icon: Eye, text: "Sent" },
      paid: { variant: "default" as const, icon: CheckCircle, text: "Paid" },
      overdue: { variant: "destructive" as const, icon: AlertCircle, text: "Overdue" }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  if (isLoading) {
    return <div>Loading invoices...</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Invoices & Payments</h3>
      
      {invoices?.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-gray-500">
            No invoices found
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {invoices?.map((invoice) => (
            <Card key={invoice.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      Invoice {invoice.invoice_number}
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      {invoice.credit_purchases?.credits_purchased.toLocaleString()} credits for {invoice.credit_purchases?.apps?.name}
                    </p>
                  </div>
                  {getStatusBadge(invoice.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Amount</p>
                    <p className="font-semibold">£{invoice.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Due Date</p>
                    <p className="font-semibold">
                      {new Date(invoice.due_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Created</p>
                    <p className="font-semibold">
                      {new Date(invoice.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Credits</p>
                    <p className="font-semibold">
                      {invoice.credit_purchases?.credits_purchased?.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {invoice.pdf_url && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={invoice.pdf_url} target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </a>
                    </Button>
                  )}
                  
                  {invoice.status === 'sent' && (
                    <Button
                      size="sm"
                      onClick={() => confirmPaymentMutation.mutate({
                        invoiceId: invoice.id,
                        purchaseId: invoice.credit_purchases?.app_id || ''
                      })}
                      disabled={confirmPaymentMutation.isPending}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Confirm Payment
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvoiceManager;
