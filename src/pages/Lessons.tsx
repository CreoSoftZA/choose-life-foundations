
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import LessonCard from "@/components/LessonCard";
import { lessons } from "@/data/lessons";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const Lessons = () => {
  const { user } = useAuth();
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchCompletedLessons = async () => {
      if (user) {
        const { data } = await supabase
          .from('lesson_progress')
          .select('lesson_id')
          .eq('user_id', user.id);
        
        if (data) {
          setCompletedLessons(new Set(data.map(item => item.lesson_id)));
        }
      }
    };

    fetchCompletedLessons();
  }, [user]);

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        {/* Header */}
        <section className="pt-28 pb-12 md:pt-36 md:pb-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
                  All Lessons
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
                  Strong Foundations
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Eleven essential lessons designed to build a solid spiritual foundation and help you grow in your relationship with Christ.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Lessons Grid */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {lessons.map((lesson, index) => (
                <LessonCard 
                  key={lesson.id} 
                  lesson={lesson} 
                  index={index} 
                  isCompleted={completedLessons.has(lesson.id.toString())}
                />
              ))}
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Lessons;
