
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { lessons } from "@/data/lessons";
import { type Lesson as LessonType } from "@/data/lessons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const Lesson = () => {
  const { slug } = useParams<{ slug: string }>();
  const [lesson, setLesson] = useState<LessonType | null>(null);
  const [nextLesson, setNextLesson] = useState<LessonType | null>(null);
  const [prevLesson, setPrevLesson] = useState<LessonType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
      }
      
      setIsLoading(false);
    }
  }, [slug]);

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
                  
                  {nextLesson ? (
                    <Link
                      to={`/lessons/${nextLesson.slug}`}
                      className="flex items-center justify-center sm:justify-end gap-2 px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors w-full sm:w-auto"
                    >
                      <span>Next: {nextLesson.title}</span>
                      <ChevronRight size={16} />
                    </Link>
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
