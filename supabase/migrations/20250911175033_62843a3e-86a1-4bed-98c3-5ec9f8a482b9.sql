-- First, just drop the problematic policies one by one
DROP POLICY "Authenticated users can create lessons" ON public.lessons;