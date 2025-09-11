-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can create lessons" ON public.lessons;
DROP POLICY IF EXISTS "Authenticated users can update lessons" ON public.lessons;
DROP POLICY IF EXISTS "Authenticated users can delete lessons" ON public.lessons;

-- Keep the read policy as is (all authenticated users can read lessons)
-- "Authenticated users can read all lessons" policy remains unchanged

-- Create admin-only policies for lesson modification
CREATE POLICY "Only admins can create lessons" 
ON public.lessons 
FOR INSERT 
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND type = 'Admin'
  )
);

CREATE POLICY "Only admins can update lessons" 
ON public.lessons 
FOR UPDATE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND type = 'Admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND type = 'Admin'
  )
);

CREATE POLICY "Only admins can delete lessons" 
ON public.lessons 
FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND type = 'Admin'
  )
);