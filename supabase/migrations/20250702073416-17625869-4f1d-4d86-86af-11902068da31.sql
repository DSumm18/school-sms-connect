
-- Create credit purchases table to track all purchase transactions
CREATE TABLE public.credit_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  app_id UUID REFERENCES public.apps(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  credits_purchased INTEGER NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('card', 'invoice')),
  stripe_payment_intent_id TEXT,
  stripe_invoice_id TEXT,
  invoice_number TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  paid_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create credit balances table to track current balances per school/app
CREATE TABLE public.credit_balances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  app_id UUID REFERENCES public.apps(id) ON DELETE CASCADE,
  credits_available INTEGER NOT NULL DEFAULT 0,
  credits_used INTEGER NOT NULL DEFAULT 0,
  last_updated TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, app_id)
);

-- Create invoices table for invoice-based payments
CREATE TABLE public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  credit_purchase_id UUID REFERENCES public.credit_purchases(id) ON DELETE CASCADE,
  invoice_number TEXT UNIQUE NOT NULL,
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')),
  due_date DATE NOT NULL,
  pdf_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  sent_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ
);

-- Create usage logs table to track credit consumption
CREATE TABLE public.usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  app_id UUID REFERENCES public.apps(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  credits_used INTEGER NOT NULL,
  action_type TEXT NOT NULL,
  action_details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.credit_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for credit_purchases
CREATE POLICY "Users can view their school's credit purchases" ON public.credit_purchases
  FOR SELECT USING (
    school_id IN (
      SELECT school_id FROM user_school_history 
      WHERE user_id = auth.uid() AND is_current = true
    )
  );

CREATE POLICY "Users can create credit purchases for their school" ON public.credit_purchases
  FOR INSERT WITH CHECK (
    school_id IN (
      SELECT school_id FROM user_school_history 
      WHERE user_id = auth.uid() AND is_current = true
    ) AND user_id = auth.uid()
  );

-- RLS Policies for credit_balances
CREATE POLICY "Users can view their school's credit balances" ON public.credit_balances
  FOR SELECT USING (
    school_id IN (
      SELECT school_id FROM user_school_history 
      WHERE user_id = auth.uid() AND is_current = true
    )
  );

-- RLS Policies for invoices
CREATE POLICY "Users can view their school's invoices" ON public.invoices
  FOR SELECT USING (
    school_id IN (
      SELECT school_id FROM user_school_history 
      WHERE user_id = auth.uid() AND is_current = true
    )
  );

-- RLS Policies for usage_logs
CREATE POLICY "Users can view their school's usage logs" ON public.usage_logs
  FOR SELECT USING (
    school_id IN (
      SELECT school_id FROM user_school_history 
      WHERE user_id = auth.uid() AND is_current = true
    )
  );

CREATE POLICY "Users can insert usage logs for their school" ON public.usage_logs
  FOR INSERT WITH CHECK (
    school_id IN (
      SELECT school_id FROM user_school_history 
      WHERE user_id = auth.uid() AND is_current = true
    )
  );

-- Create indexes for performance
CREATE INDEX idx_credit_purchases_school_app ON public.credit_purchases(school_id, app_id);
CREATE INDEX idx_credit_purchases_status ON public.credit_purchases(status);
CREATE INDEX idx_credit_balances_school_app ON public.credit_balances(school_id, app_id);
CREATE INDEX idx_invoices_school_status ON public.invoices(school_id, status);
CREATE INDEX idx_usage_logs_school_app_date ON public.usage_logs(school_id, app_id, created_at);

-- Create function to update credit balances
CREATE OR REPLACE FUNCTION update_credit_balance(
  p_school_id UUID,
  p_app_id UUID,
  p_credits_to_add INTEGER DEFAULT 0,
  p_credits_to_use INTEGER DEFAULT 0
) RETURNS VOID AS $$
BEGIN
  INSERT INTO public.credit_balances (school_id, app_id, credits_available, credits_used)
  VALUES (p_school_id, p_app_id, p_credits_to_add, p_credits_to_use)
  ON CONFLICT (school_id, app_id) 
  DO UPDATE SET
    credits_available = credit_balances.credits_available + p_credits_to_add - p_credits_to_use,
    credits_used = credit_balances.credits_used + p_credits_to_use,
    last_updated = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to generate invoice numbers
CREATE OR REPLACE FUNCTION generate_invoice_number() RETURNS TEXT AS $$
DECLARE
  next_number INTEGER;
  invoice_number TEXT;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(invoice_number FROM 'INV-(\d+)') AS INTEGER)), 0) + 1
  INTO next_number
  FROM public.invoices;
  
  invoice_number := 'INV-' || LPAD(next_number::TEXT, 6, '0');
  RETURN invoice_number;
END;
$$ LANGUAGE plpgsql;
