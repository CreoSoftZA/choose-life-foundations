
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { lessons } from "@/data/lessons";
import { type Lesson as LessonType } from "@/data/lessons";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const Lesson = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [lesson, setLesson] = useState<LessonType | null>(null);
  const [nextLesson, setNextLesson] = useState<LessonType | null>(null);
  const [prevLesson, setPrevLesson] = useState<LessonType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isMarking, setIsMarking] = useState(false);

  useEffect(() => {
    const loadLessonAndProgress = async () => {
      if (slug) {
        setIsLoading(true);
        const foundLesson = lessons.find((l) => l.slug === slug);
        
        if (foundLesson) {
          setLesson(foundLesson);
          
          // Find next lesson
          const nextIndex = foundLesson.id < lessons.length ? foundLesson.id : null;
          setNextLesson(nextIndex ? lessons.find((l) => l.id === nextIndex + 1) || null : null);
          
          // Find previous lesson
          const prevIndex = foundLesson.id > 1 ? foundLesson.id - 2 : null;
          setPrevLesson(prevIndex !== null ? lessons.find((l) => l.id === prevIndex + 1) || null : null);
          
          // Check if lesson is completed by current user
          if (user) {
            const { data } = await supabase
              .from('lesson_progress')
              .select('id')
              .eq('user_id', user.id)
              .eq('lesson_id', foundLesson.id.toString())
              .maybeSingle();
            
            setIsCompleted(!!data);
          }
        }
        
        setIsLoading(false);
      }
    };

    loadLessonAndProgress();
  }, [slug, user]);

  const handleMarkComplete = async () => {
    if (!user || !lesson || isCompleted) return;
    
    setIsMarking(true);
    try {
      const { error } = await supabase
        .from('lesson_progress')
        .insert({
          user_id: user.id,
          lesson_id: lesson.id.toString(),
        });

      if (error) throw error;

      setIsCompleted(true);
      toast({
        title: "Lesson completed!",
        description: `You've successfully completed "${lesson.title}".`,
      });
    } catch (error) {
      console.error('Error marking lesson as complete:', error);
      toast({
        title: "Error",
        description: "Failed to mark lesson as complete. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsMarking(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-gentle">Loading lesson...</div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-serif font-medium mb-4">Lesson not found</h2>
        <Link to="/lessons" className="text-primary hover:underline">
          Back to Lessons
        </Link>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <article className="flex-grow pt-28 pb-16 md:pt-32 md:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-8"
              >
                <div className="flex items-center mb-6">
                  <Link 
                    to="/lessons"
                    className="flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    <ChevronLeft size={16} className="mr-1" />
                    <span>Back to All Lessons</span>
                  </Link>
                </div>
                
                <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
                  Lesson {lesson.id}
                </span>
                
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                  {lesson.title}
                </h1>
                
                <p className="text-lg text-gray-600 mb-8">
                  {lesson.description}
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="prose prose-blue max-w-none"
                dangerouslySetInnerHTML={{ __html: lesson.content }}
              />
              
              {user && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="mt-8 flex justify-center"
                >
                  <Button
                    onClick={handleMarkComplete}
                    disabled={isCompleted || isMarking}
                    variant={isCompleted ? "secondary" : "default"}
                    className="flex items-center gap-2"
                  >
                    <Check size={16} />
                    {isCompleted ? "Completed" : isMarking ? "Marking..." : "Mark as Complete"}
                  </Button>
                </motion.div>
              )}
              
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  {prevLesson ? (
                    <Link
                      to={`/lessons/${prevLesson.slug}`}
                      className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors w-full sm:w-auto"
                    >
                      <ChevronLeft size={16} />
                      <span>Previous: {prevLesson.title}</span>
                    </Link>
                  ) : (
                    <div></div>
                  )}
                  
                  {isCompleted && nextLesson ? (
                    <Link
                      to={`/lessons/${nextLesson.slug}`}
                      className="flex items-center justify-center sm:justify-end gap-2 px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors w-full sm:w-auto"
                    >
                      <span>Next: {nextLesson.title}</span>
                      <ChevronRight size={16} />
                    </Link>
                  ) : !isCompleted ? (
                    <div className="flex items-center justify-center text-gray-400 text-sm w-full sm:w-auto">
                      Complete this lesson to unlock the next one
                    </div>
                  ) : (
                    <Link
                      to="/lessons"
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors w-full sm:w-auto"
                    >
                      <span>Back to All Lessons</span>
                      <ChevronRight size={16} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Lesson;
