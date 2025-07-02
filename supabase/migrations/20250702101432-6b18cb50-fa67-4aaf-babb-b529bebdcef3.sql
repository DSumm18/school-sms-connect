
-- Create profiles table to store user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  job_title TEXT,
  department TEXT,
  role TEXT DEFAULT 'user',
  avatar_url TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to call the function
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to automatically assign users to schools based on email domain
CREATE OR REPLACE FUNCTION public.assign_user_to_school_by_email()
RETURNS TRIGGER AS $$
DECLARE
  user_domain TEXT;
  matching_school_id UUID;
BEGIN
  -- Extract domain from email
  user_domain := split_part(NEW.email, '@', 2);
  
  -- Find school with matching domain (google_domain_suffix or email domain)
  SELECT id INTO matching_school_id
  FROM public.schools
  WHERE 
    google_domain_suffix = user_domain 
    OR estates_email LIKE '%' || user_domain
  LIMIT 1;
  
  -- If school found, create user_school_history record
  IF matching_school_id IS NOT NULL THEN
    INSERT INTO public.user_school_history (user_id, school_id, role, start_date, is_current)
    VALUES (NEW.id, matching_school_id, 'user', CURRENT_DATE, true);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for school assignment
CREATE OR REPLACE TRIGGER on_profile_created_assign_school
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.assign_user_to_school_by_email();

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create indexes for performance
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_schools_domain_lookup ON public.schools(google_domain_suffix) WHERE google_domain_suffix IS NOT NULL;
