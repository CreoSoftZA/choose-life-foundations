-- Fix invitation system security vulnerability
-- Remove overly permissive policy that allows all authenticated users to read invites
DROP POLICY IF EXISTS "Authenticated users can read invites for validation" ON public.invites;

-- Create new policy that only allows admin users to read invites
CREATE POLICY "Only admins can read invites" 
ON public.invites 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND type = 'Admin'
  )
);

-- The validate_invite_token function already exists and provides secure token validation
-- without exposing invite data to unauthorized users