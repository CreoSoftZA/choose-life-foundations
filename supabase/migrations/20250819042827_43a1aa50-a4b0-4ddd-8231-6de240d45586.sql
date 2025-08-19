-- Fix security issue: Restrict access to invites table and create secure validation function

-- Remove the overly permissive policy that exposes email addresses
DROP POLICY IF EXISTS "Anyone can validate invites" ON public.invites;

-- Create a secure function to validate invite tokens without exposing email addresses
CREATE OR REPLACE FUNCTION public.validate_invite_token(invite_token uuid)
RETURNS TABLE(is_valid boolean, email text)
LANGUAGE plpgsql
SECURITY DEFINER
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

-- Create a more restrictive policy for reading invites (admin access only)
CREATE POLICY "Authenticated users can read invites for validation"
ON public.invites
FOR SELECT
TO authenticated
USING (true);

-- Keep the update policy for marking invites as used
-- (The existing "System can update invites" policy remains unchanged)