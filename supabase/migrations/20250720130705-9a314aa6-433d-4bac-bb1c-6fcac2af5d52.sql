-- Fix lesson_progress table to use text instead of uuid for lesson_id
-- since lessons use numeric IDs converted to strings

ALTER TABLE public.lesson_progress 
ALTER COLUMN lesson_id TYPE TEXT;