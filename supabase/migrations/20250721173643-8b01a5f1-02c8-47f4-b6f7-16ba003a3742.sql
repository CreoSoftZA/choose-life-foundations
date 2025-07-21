-- Add new profile fields to the profiles table
ALTER TABLE public.profiles 
ADD COLUMN first_name TEXT,
ADD COLUMN last_name TEXT,
ADD COLUMN contact_number TEXT,
ADD COLUMN age INTEGER,
ADD COLUMN marital_status TEXT;

-- Update the handle_new_user function to handle new fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, display_name, first_name, last_name, contact_number, age, marital_status)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    NEW.raw_user_meta_data ->> 'contact_number',
    (NEW.raw_user_meta_data ->> 'age')::INTEGER,
    NEW.raw_user_meta_data ->> 'marital_status'
  );
  RETURN NEW;
END;
$$;