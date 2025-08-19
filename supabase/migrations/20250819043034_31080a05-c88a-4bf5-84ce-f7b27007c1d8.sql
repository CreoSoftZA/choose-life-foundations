-- Fix security warnings: Set search_path for functions to prevent injection attacks

-- Fix search_path for handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $function$
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
$function$;

-- Fix search_path for validate_invite_token function
CREATE OR REPLACE FUNCTION public.validate_invite_token(invite_token uuid)
RETURNS TABLE(is_valid boolean, email text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (NOT i.is_used AND i.expires_at > now()) as is_valid,
    i.email
  FROM public.invites i
  WHERE i.token = invite_token;
  
  -- If no invite found, return false
  IF NOT FOUND THEN
    RETURN QUERY SELECT false as is_valid, ''::text as email;
  END IF;
END;
$$;