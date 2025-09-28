-- Drop the remaining problematic policies
DROP POLICY "Authenticated users can update lessons" ON public.lessons;
DROP POLICY "Authenticated users can delete lessons" ON public.lessons;