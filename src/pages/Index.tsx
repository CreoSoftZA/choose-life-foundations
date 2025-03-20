
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Heart, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { lessons } from "@/data/lessons";
import LessonCard from "@/components/LessonCard";

const Index = () => {
  const navigate = useNavigate();
  const featuredLessons = lessons.slice(0, 3);

  const features = [
    {
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      title: "Biblical Foundation",
      description: "Lessons based directly on Scripture to build a solid foundation for your faith."
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Spiritual Growth",
      description: "Practical teachings that help you grow in your relationship with God and others."
    },
    {
      icon: <Heart className="h-6 w-6 text-primary" />,
      title: "Life Application",
      description: "Learn how to apply biblical principles to your everyday life and decisions."
    }
  ];

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative pt-28 pb-20 md:pt-36 md:pb-24 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 right-0 w-2/3 h-96 bg-blue-100/30 rounded-full blur-3xl transform translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-2/3 h-96 bg-blue-100/20 rounded-full blur-3xl transform -translate-x-1/3" />
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-6">
                  Choose Life Church
                </span>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-gray-900 mb-6">
                  Strong Foundations for Your Faith Journey
                </h1>
                
                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  Eleven essential lessons designed to build a solid spiritual foundation and help you grow in your relationship with Christ.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={() => navigate('/lessons')}
                    className="px-6 py-3 bg-primary text-white font-medium rounded-md shadow-sm hover:bg-primary/90 transition-all duration-300 hover:shadow focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                  >
                    <span className="flex items-center gap-2">
                      Start Learning
                      <ArrowRight size={16} />
                    </span>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                Build Your Life on Truth
              </h2>
              <p className="text-lg text-gray-600">
                Discover the foundational truths of Christianity through our carefully designed lessons.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-elegant border border-gray-100"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-serif font-medium mb-2 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Lessons Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                Begin Your Journey
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Explore our most fundamental lessons to start building your spiritual foundation.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredLessons.map((lesson, index) => (
                <LessonCard key={lesson.id} lesson={lesson} index={index} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <button 
                onClick={() => navigate('/lessons')}
                className="px-6 py-3 bg-white text-primary font-medium rounded-md border border-gray-200 shadow-sm hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
              >
                <span className="flex items-center gap-2">
                  View All Lessons
                  <ArrowRight size={16} />
                </span>
              </button>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary/90 to-primary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                Ready to Deepen Your Faith?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join thousands of believers who have strengthened their spiritual foundation through these lessons.
              </p>
              <button 
                onClick={() => navigate('/lessons')}
                className="px-8 py-4 bg-white text-primary font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-primary"
              >
                <span className="flex items-center gap-2">
                  Start Your First Lesson
                  <ArrowRight size={16} />
                </span>
              </button>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
