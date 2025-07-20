-- First, drop the foreign key constraint if it exists
ALTER TABLE public.lesson_progress 
DROP CONSTRAINT IF EXISTS lesson_progress_lesson_id_fkey;

-- Change lesson_id column from uuid to text to match lessons data structure
ALTER TABLE public.lesson_progress 
ALTER COLUMN lesson_id TYPE TEXT;